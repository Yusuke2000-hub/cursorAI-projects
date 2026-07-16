package com.example.trelloapi.repository;

import com.example.trelloapi.entity.Card;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, UUID> {
  List<Card> findByBoardListIdOrderByPositionAsc(UUID listId);
}
