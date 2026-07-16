package com.example.trelloapi.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record BoardDto(
    UUID id,
    String title,
    int position,
    List<ListDto> lists,
    LocalDateTime createdAt,
    LocalDateTime updatedAt) {}
