package com.tetradev.yaquedo.client.exception;

import com.tetradev.yaquedo.shared.exception.BusinessRuleException;

public class ClienteYaExisteException extends BusinessRuleException {
    public ClienteYaExisteException() {
        super("el usuario ya tiene un perfil de cliente");
    }
}
