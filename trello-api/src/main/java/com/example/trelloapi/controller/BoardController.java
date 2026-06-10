package com.example.trelloapi.controller;

import com.example.trelloapi.dto.BoardDto;
import com.example.trelloapi.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    // ID指定で1件取得
    @GetMapping("/{id}")
    public BoardDto getBoardById(@PathVariable UUID id) {
        return boardService.getBoardById(id);
    }
}