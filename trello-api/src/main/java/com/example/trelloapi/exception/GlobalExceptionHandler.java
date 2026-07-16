package com.example.trelloapi.exception;

import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public Map<String, Object> handleResourceNotFound(ResourceNotFoundException ex) {
    return Map.of(
        "status",
        404,
        "error",
        "Not Found",
        "message",
        ex.getMessage(),
        "timestamp",
        LocalDateTime.now().toString());
  }
}
