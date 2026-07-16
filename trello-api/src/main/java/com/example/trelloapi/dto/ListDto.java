package com.example.trelloapi.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record ListDto(
    UUID id,
    UUID boardId,
    String title,
    int position,
    List<CardDto> cards,
    LocalDateTime createdAt,
    LocalDateTime updatedAt) {}
