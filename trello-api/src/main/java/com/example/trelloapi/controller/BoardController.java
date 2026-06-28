package com.example.trelloapi.controller;

import com.example.trelloapi.dto.BoardDto;
import com.example.trelloapi.dto.request.TitleRequest;
import com.example.trelloapi.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    // 全件取得
    @GetMapping
    public List<BoardDto> getBoards() {
        return boardService.getAllBoards();
    }

    // 新規作成
    @PostMapping
    public ResponseEntity<BoardDto> createBoard(@Valid @RequestBody TitleRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(boardService.createBoard(request.title()));
    }

    // ID指定で1件取得
    @GetMapping("/{id}")
    public BoardDto getBoardById(@PathVariable UUID id) {
        return boardService.getBoardById(id);
    }

    // ID指定で更新
    @PutMapping("/{id}")
    public ResponseEntity<BoardDto> updateBoard(@PathVariable UUID id, @Valid @RequestBody TitleRequest request) {
        return ResponseEntity.ok(boardService.updateBoard(id, request.title()));
    }

    // ID指定で削除
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable UUID id) {
        boardService.deleteBoard(id);
        return ResponseEntity.noContent().build();
    }
}