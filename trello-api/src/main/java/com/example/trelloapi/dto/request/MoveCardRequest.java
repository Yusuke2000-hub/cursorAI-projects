package com.example.trelloapi.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record MoveCardRequest(
    @NotNull UUID listId,
    @Min(0) int position
) {}
