package com.example.trelloapi.controller;

import com.example.trelloapi.dto.CardDto;
import com.example.trelloapi.dto.request.CreateCardRequest;
import com.example.trelloapi.dto.request.MoveCardRequest;
import com.example.trelloapi.dto.request.TitleRequest;
import com.example.trelloapi.service.CardService;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CardController {

  private final CardService cardService;

  @PostMapping
  public ResponseEntity<CardDto> createCard(@Valid @RequestBody CreateCardRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(cardService.createCard(request.listId(), request.title()));
  }

  @PutMapping("/{id}")
  public ResponseEntity<CardDto> updateCard(
      @PathVariable UUID id, @Valid @RequestBody TitleRequest request) {
    return ResponseEntity.ok(cardService.updateTitle(id, request.title()));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCard(@PathVariable UUID id) {
    cardService.deleteCard(id);
    return ResponseEntity.noContent().build();
  }

  @PatchMapping("/{id}/move")
  public ResponseEntity<CardDto> moveCard(
      @PathVariable UUID id, @Valid @RequestBody MoveCardRequest request) {
    return ResponseEntity.ok(cardService.moveCard(id, request.listId(), request.position()));
  }
}
