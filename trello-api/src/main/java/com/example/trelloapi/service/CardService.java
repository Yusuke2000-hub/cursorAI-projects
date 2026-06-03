package com.example.trelloapi.service;

import com.example.trelloapi.dto.CardDto;
import com.example.trelloapi.entity.BoardList;
import com.example.trelloapi.entity.Card;
import com.example.trelloapi.repository.BoardListRepository;
import com.example.trelloapi.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;
    private final BoardListRepository boardListRepository;

    @Transactional
    public CardDto createCard(UUID listId, String title) {
        BoardList list = boardListRepository.findById(listId)
            .orElseThrow(() -> new RuntimeException("List not found: " + listId));

        Card card = new Card();
        card.setBoardList(list);
        card.setTitle(title);
        card.setPosition(list.getCards().size());
        return toDto(cardRepository.save(card));
    }

    @Transactional
    public CardDto updateTitle(UUID id, String title) {
        Card card = cardRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Card not found: " + id));
        card.setTitle(title);
        return toDto(cardRepository.save(card));
    }

    @Transactional
    public void deleteCard(UUID id) {
        cardRepository.deleteById(id);
    }

    @Transactional
    public CardDto moveCard(UUID id, UUID listId, int position) {
        Card card = cardRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Card not found: " + id));
        BoardList newList = boardListRepository.findById(listId)
            .orElseThrow(() -> new RuntimeException("List not found: " + listId));
        card.setBoardList(newList);
        card.setPosition(position);
        return toDto(cardRepository.save(card));
    }

    private CardDto toDto(Card card) {
        return new CardDto(
            card.getId(),
            card.getBoardList().getId(),
            card.getTitle(),
            card.getPosition(),
            card.getCreatedAt(),
            card.getUpdatedAt()
        );
    }
}
