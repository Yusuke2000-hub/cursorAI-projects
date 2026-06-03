package com.example.trelloapi.controller;

import com.example.trelloapi.dto.BoardDto;
import com.example.trelloapi.dto.request.TitleRequest;
import com.example.trelloapi.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/board")
    public ResponseEntity<BoardDto> getBoard() {
        return ResponseEntity.ok(boardService.getDefaultBoard());
    }

    @PatchMapping("/board")
    public ResponseEntity<BoardDto> updateBoardTitle(@Valid @RequestBody TitleRequest request) {
        return ResponseEntity.ok(boardService.updateTitle(request.title()));
    }
}
