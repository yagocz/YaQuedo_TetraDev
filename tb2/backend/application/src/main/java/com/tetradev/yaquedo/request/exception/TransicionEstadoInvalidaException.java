package com.tetradev.yaquedo.request.exception;

import com.tetradev.yaquedo.request.model.EstadoSolicitud;
import com.tetradev.yaquedo.shared.exception.BusinessRuleException;

public class TransicionEstadoInvalidaException extends BusinessRuleException {
    public TransicionEstadoInvalidaException(EstadoSolicitud actual, EstadoSolicitud destino) {
        super("transicion invalida: " + actual + " no puede pasar a " + destino);
    }
}
