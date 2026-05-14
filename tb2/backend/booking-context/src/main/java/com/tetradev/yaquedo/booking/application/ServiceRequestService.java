package com.tetradev.yaquedo.booking.application;

import com.tetradev.yaquedo.booking.domain.ServiceRequest;
import com.tetradev.yaquedo.booking.domain.ServiceRequestStatus;
import com.tetradev.yaquedo.booking.domain.Urgency;
import com.tetradev.yaquedo.booking.infrastructure.persistence.ServiceRequestRepository;
import com.tetradev.yaquedo.shared.exception.BusinessRuleException;
import com.tetradev.yaquedo.shared.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ServiceRequestService {

    private static final int MAX_OPEN_REQUESTS_PER_WORKER = 3;
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final String ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    private final ServiceRequestRepository repository;

    public ServiceRequestService(ServiceRequestRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public ServiceRequest create(UUID customerId, UUID workerId, UUID categoryId,
                                 UUID districtId, String description, Urgency urgency) {
        long open = repository.countByWorkerIdAndStatusIn(
                workerId, List.of(ServiceRequestStatus.PENDING, ServiceRequestStatus.ACCEPTED));
        if (open >= MAX_OPEN_REQUESTS_PER_WORKER) {
            throw new BusinessRuleException("WORKER_OVERLOADED",
                    "El trabajador tiene 3 solicitudes activas; intente con otro técnico");
        }
        ServiceRequest sr = new ServiceRequest(customerId, workerId, categoryId, districtId, description, urgency);
        return repository.save(sr);
    }

    @Transactional(readOnly = true)
    public ServiceRequest findById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceRequest", id));
    }

    @Transactional(readOnly = true)
    public List<ServiceRequest> findMyRequestsAsCustomer(UUID customerId) {
        return repository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    @Transactional(readOnly = true)
    public List<ServiceRequest> findInboxForWorker(UUID workerId) {
        return repository.findByWorkerIdOrderByCreatedAtDesc(workerId);
    }

    @Transactional
    public ServiceRequest accept(UUID id, UUID actingWorkerId, BigDecimal agreedAmount) {
        ServiceRequest sr = findById(id);
        if (!sr.getWorkerId().equals(actingWorkerId)) {
            throw new BusinessRuleException("NOT_REQUEST_OWNER",
                    "Solo el trabajador receptor puede aceptar esta solicitud");
        }
        if (agreedAmount == null || agreedAmount.signum() <= 0) {
            throw new BusinessRuleException("INVALID_AMOUNT",
                    "El monto acordado debe ser mayor a 0");
        }
        sr.accept(agreedAmount);
        return repository.save(sr);
    }

    @Transactional
    public ServiceRequest reject(UUID id, UUID actingWorkerId, String reason) {
        ServiceRequest sr = findById(id);
        if (!sr.getWorkerId().equals(actingWorkerId)) {
            throw new BusinessRuleException("NOT_REQUEST_OWNER",
                    "Solo el trabajador receptor puede rechazar esta solicitud");
        }
        sr.reject(reason);
        return repository.save(sr);
    }

    @Transactional
    public ServiceRequest schedule(UUID id, UUID actingCustomerId, LocalDateTime when) {
        ServiceRequest sr = findById(id);
        if (!sr.getCustomerId().equals(actingCustomerId)) {
            throw new BusinessRuleException("NOT_REQUEST_OWNER",
                    "Solo el cliente solicitante puede agendar el servicio");
        }
        sr.schedule(when, generateConfirmationCode());
        return repository.save(sr);
    }

    @Transactional
    public ServiceRequest confirm(UUID id, UUID actingCustomerId) {
        ServiceRequest sr = findById(id);
        if (!sr.getCustomerId().equals(actingCustomerId)) {
            throw new BusinessRuleException("NOT_REQUEST_OWNER",
                    "Solo el cliente solicitante puede confirmar la contratación");
        }
        sr.confirm();
        return repository.save(sr);
    }

    @Transactional
    public ServiceRequest complete(UUID id, UUID actingWorkerId) {
        ServiceRequest sr = findById(id);
        if (!sr.getWorkerId().equals(actingWorkerId)) {
            throw new BusinessRuleException("NOT_REQUEST_OWNER",
                    "Solo el trabajador asignado puede marcar el servicio como completado");
        }
        sr.complete();
        return repository.save(sr);
    }

    private String generateConfirmationCode() {
        StringBuilder sb = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            sb.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
        }
        return sb.toString();
    }
}
