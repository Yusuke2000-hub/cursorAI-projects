import { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd';
import { List } from '../List/List';
import type { Board as BoardType } from '../../types';
import styles from './Board.module.css';

type Props = {
  board: BoardType;
  onUpdateBoard: (board: BoardType) => void;
};

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function Board({ board, onUpdateBoard }: Props) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(board.title);
  const [addingList, setAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);
  const listInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTitle) titleInputRef.current?.select();
  }, [editingTitle]);

  useEffect(() => {
    if (addingList) listInputRef.current?.focus();
  }, [addingList]);

  async function commitBoardTitle() {
    const trimmed = titleDraft.trim();
    if (!trimmed) {
      setTitleDraft(board.title);
      setEditingTitle(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/boards/${board.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: trimmed }),
      });
      if (res.ok) {
        onUpdateBoard({ ...board, title: trimmed });
      } else {
        console.error('ボードタイトル更新エラー:', res.status, res.statusText);
      }
    } catch (err) {
      console.error('ボードタイトル更新エラー:', err);
    }
    setEditingTitle(false);
  }

  function addList() {
    const trimmed = newListTitle.trim();
    if (!trimmed) return;
    const newList = { id: generateId(), title: trimmed, cards: [] };
    onUpdateBoard({ ...board, lists: [...board.lists, newList] });
    setNewListTitle('');
  }

  function updateListTitle(listId: string, title: string) {
    onUpdateBoard({
      ...board,
      lists: board.lists.map(l => l.id === listId ? { ...l, title } : l),
    });
  }

  function deleteList(listId: string) {
    onUpdateBoard({ ...board, lists: board.lists.filter(l => l.id !== listId) });
  }

  function addCard(listId: string, title: string) {
    const card = { id: generateId(), title, createdAt: new Date().toISOString() };
    onUpdateBoard({
      ...board,
      lists: board.lists.map(l => l.id === listId ? { ...l, cards: [...l.cards, card] } : l),
    });
  }

  function updateCard(listId: string, cardId: string, title: string) {
    onUpdateBoard({
      ...board,
      lists: board.lists.map(l =>
        l.id === listId
          ? { ...l, cards: l.cards.map(c => c.id === cardId ? { ...c, title } : c) }
          : l
      ),
    });
  }

  function deleteCard(listId: string, cardId: string) {
    onUpdateBoard({
      ...board,
      lists: board.lists.map(l =>
        l.id === listId ? { ...l, cards: l.cards.filter(c => c.id !== cardId) } : l
      ),
    });
  }

  function onDragEnd(result: DropResult) {
    const { source, destination, type } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (type === 'list') {
      const lists = [...board.lists];
      const [moved] = lists.splice(source.index, 1);
      lists.splice(destination.index, 0, moved);
      onUpdateBoard({ ...board, lists });
      return;
    }

    // card movement
    const srcList = board.lists.find(l => l.id === source.droppableId)!;
    const dstList = board.lists.find(l => l.id === destination.droppableId)!;
    const srcCards = [...srcList.cards];
    const [movedCard] = srcCards.splice(source.index, 1);

    if (srcList.id === dstList.id) {
      srcCards.splice(destination.index, 0, movedCard);
      onUpdateBoard({
        ...board,
        lists: board.lists.map(l => l.id === srcList.id ? { ...l, cards: srcCards } : l),
      });
    } else {
      const dstCards = [...dstList.cards];
      dstCards.splice(destination.index, 0, movedCard);
      onUpdateBoard({
        ...board,
        lists: board.lists.map(l => {
          if (l.id === srcList.id) return { ...l, cards: srcCards };
          if (l.id === dstList.id) return { ...l, cards: dstCards };
          return l;
        }),
      });
    }
  }

  return (
    <div className={styles.board}>
      <header className={styles.header}>
        {editingTitle ? (
          <input
            ref={titleInputRef}
            className={styles.titleInput}
            value={titleDraft}
            onChange={e => setTitleDraft(e.target.value)}
            onBlur={commitBoardTitle}
            onKeyDown={e => {
              if (e.key === 'Enter') commitBoardTitle();
              if (e.key === 'Escape') { setTitleDraft(board.title); setEditingTitle(false); }
            }}
          />
        ) : (
          <h1 className={styles.title} onClick={() => setEditingTitle(true)}>
            {board.title}
          </h1>
        )}
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided) => (
            <div
              className={styles.lists}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {board.lists.map((list, i) => (
                <List
                  key={list.id}
                  list={list}
                  index={i}
                  onUpdateTitle={updateListTitle}
                  onDelete={deleteList}
                  onAddCard={addCard}
                  onUpdateCard={updateCard}
                  onDeleteCard={deleteCard}
                />
              ))}
              {provided.placeholder}

              <div className={styles.addListWrapper}>
                {addingList ? (
                  <div className={styles.addListForm}>
                    <input
                      ref={listInputRef}
                      className={styles.listInput}
                      placeholder="リストのタイトルを入力..."
                      value={newListTitle}
                      onChange={e => setNewListTitle(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') { addList(); }
                        if (e.key === 'Escape') { setNewListTitle(''); setAddingList(false); }
                      }}
                    />
                    <div className={styles.formActions}>
                      <button className={styles.addBtn} onClick={addList}>リストを追加</button>
                      <button className={styles.cancelBtn} onClick={() => { setNewListTitle(''); setAddingList(false); }}>×</button>
                    </div>
                  </div>
                ) : (
                  <button className={styles.addListTrigger} onClick={() => setAddingList(true)}>
                    + リストを追加
                  </button>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
