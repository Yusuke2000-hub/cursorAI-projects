package com.example.trelloapi.repository;

import com.example.trelloapi.entity.BoardList;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardListRepository extends JpaRepository<BoardList, UUID> {
  List<BoardList> findByBoardIdOrderByPositionAsc(UUID boardId);
}
