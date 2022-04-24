package com.example.demo.exception;

public class CameraNotFoundException extends RuntimeException  {
    public CameraNotFoundException(String s) {
        super(s);
    }
}
