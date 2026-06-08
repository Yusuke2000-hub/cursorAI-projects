package com.example.trelloapi.controller;

import com.example.trelloapi.dto.BoardDto;
import com.example.trelloapi.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping
    public List<BoardDto> getBoards() {
        return boardService.getAllBoards();
    }
}
