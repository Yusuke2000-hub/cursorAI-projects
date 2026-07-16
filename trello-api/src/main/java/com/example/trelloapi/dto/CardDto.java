package com.example.trelloapi.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record CardDto(
    UUID id,
    UUID listId,
    String title,
    int position,
    LocalDateTime createdAt,
    LocalDateTime updatedAt) {}
