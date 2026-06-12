package com.tetradev.yaquedo.auth.exception;

import com.tetradev.yaquedo.shared.exception.BusinessRuleException;

public class EmailAlreadyExistsException extends BusinessRuleException {
    public EmailAlreadyExistsException(String email) {
        super("el email " + email + " ya esta registrado");
    }
}
