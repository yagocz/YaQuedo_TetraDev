package com.tetradev.yaquedo.request.exception;

import com.tetradev.yaquedo.shared.exception.BusinessRuleException;

public class ResenaYaExisteException extends BusinessRuleException {
    public ResenaYaExisteException() {
        super("esta solicitud ya tiene una resena registrada");
    }
}
