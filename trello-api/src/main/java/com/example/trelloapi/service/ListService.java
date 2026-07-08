package com.example.trelloapi.service;

import com.example.trelloapi.dto.CardDto;
import com.example.trelloapi.dto.ListDto;
import com.example.trelloapi.dto.request.ReorderItem;
import com.example.trelloapi.entity.Board;
import com.example.trelloapi.entity.BoardList;
import com.example.trelloapi.repository.BoardListRepository;
import com.example.trelloapi.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListService {

    private final BoardListRepository boardListRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public ListDto createList(String title) {
        Board board = boardRepository.findAll().stream()
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Board not found"));

        BoardList list = new BoardList();
        list.setBoard(board);
        list.setTitle(title);
        list.setPosition(board.getLists().size());
        return toDto(boardListRepository.save(list));
    }

    @Transactional
    public ListDto updateTitle(UUID id, String title) {
        BoardList list = boardListRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("List not found: " + id));
        list.setTitle(title);
        return toDto(boardListRepository.save(list));
    }

    @Transactional
    public void deleteList(UUID id) {
        boardListRepository.deleteById(id);
    }

    @Transactional
    public void reorderLists(List<ReorderItem> items) {
        items.forEach(item -> {
            BoardList list = boardListRepository.findById(item.id())
                .orElseThrow(() -> new RuntimeException("List not found: " + item.id()));
            list.setPosition(item.position());
            boardListRepository.save(list);
        });
    }

    private ListDto toDto(BoardList list) {
        return new ListDto(
            list.getId(),
            list.getBoard().getId(),
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
        );
    }
}
