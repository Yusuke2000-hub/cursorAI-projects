package com.example.trelloapi.controller;

import com.example.trelloapi.dto.ListDto;
import com.example.trelloapi.dto.request.ReorderItem;
import com.example.trelloapi.dto.request.TitleRequest;
import com.example.trelloapi.service.ListService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/lists")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ListController {

    private final ListService listService;

    @PostMapping
    public ResponseEntity<ListDto> createList(@Valid @RequestBody TitleRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(listService.createList(request.title()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListDto> updateList(@PathVariable UUID id, @Valid @RequestBody TitleRequest request) {
        return ResponseEntity.ok(listService.updateTitle(id, request.title()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteList(@PathVariable UUID id) {
        listService.deleteList(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/reorder")
    public ResponseEntity<Void> reorderLists(@Valid @RequestBody List<ReorderItem> items) {
        listService.reorderLists(items);
        return ResponseEntity.ok().build();
    }
}
