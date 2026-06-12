package com.tetradev.yaquedo.auth.exception;

import com.tetradev.yaquedo.shared.exception.UnauthorizedException;

public class InvalidCredentialsException extends UnauthorizedException {
    public InvalidCredentialsException() {
        super("credenciales invalidas");
    }
}
