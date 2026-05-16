package com.tetradev.yaquedo.worker.exception;

import com.tetradev.yaquedo.shared.exception.BusinessRuleException;

public class TrabajadorYaExisteException extends BusinessRuleException {
    public TrabajadorYaExisteException() {
        super("el usuario ya tiene un perfil de trabajador");
    }
}
