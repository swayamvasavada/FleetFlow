package com.FleetFlow.exception;

public class ResourceNotFoundExcepiton extends Exception {

    private static final long serialVersionUID = 1L;

    public ResourceNotFoundExcepiton(String errorMessage) {
        super(errorMessage);
    }
}