package com.example.trelloapi.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record ReorderItem(@NotNull UUID id, @Min(0) int position) {}
