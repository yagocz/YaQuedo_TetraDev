package com.tetradev.yaquedo.booking.infrastructure.persistence;

import com.tetradev.yaquedo.booking.domain.ServiceRequest;
import com.tetradev.yaquedo.booking.domain.ServiceRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, UUID> {
    List<ServiceRequest> findByCustomerIdOrderByCreatedAtDesc(UUID customerId);
    List<ServiceRequest> findByWorkerIdOrderByCreatedAtDesc(UUID workerId);
    List<ServiceRequest> findByWorkerIdAndStatusOrderByCreatedAtDesc(UUID workerId, ServiceRequestStatus status);
    long countByWorkerIdAndStatusIn(UUID workerId, List<ServiceRequestStatus> statuses);
}
