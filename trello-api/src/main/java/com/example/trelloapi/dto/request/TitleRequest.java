package com.example.trelloapi.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TitleRequest(@NotBlank @Size(max = 500) String title) {}
