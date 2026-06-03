package com.example.trelloapi.service;

import com.example.trelloapi.dto.BoardDto;
import com.example.trelloapi.dto.CardDto;
import com.example.trelloapi.dto.ListDto;
import com.example.trelloapi.entity.Board;
import com.example.trelloapi.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    @Transactional(readOnly = true)
    public BoardDto getDefaultBoard() {
        Board board = boardRepository.findAll().stream()
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Board not found"));
        return toDto(board);
    }

    @Transactional
    public BoardDto updateTitle(String title) {
        Board board = boardRepository.findAll().stream()
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Board not found"));
        board.setTitle(title);
        return toDto(boardRepository.save(board));
    }

    public BoardDto toDto(Board board) {
        return new BoardDto(
            board.getId(),
            board.getTitle(),
            board.getPosition(),
            board.getLists().stream()
                .map(list -> new ListDto(
                    list.getId(),
                    board.getId(),
                    list.getTitle(),
                    list.getPosition(),
                    list.getCards().stream()
                        .map(card -> new CardDto(
                            card.getId(),
                            list.getId(),
                            card.getTitle(),
                            card.getPosition(),
                            card.getCreatedAt(),
                            card.getUpdatedAt()
                        ))
                        .collect(Collectors.toList()),
                    list.getCreatedAt(),
                    list.getUpdatedAt()
                ))
                .collect(Collectors.toList()),
            board.getCreatedAt(),
            board.getUpdatedAt()
        );
    }
}
