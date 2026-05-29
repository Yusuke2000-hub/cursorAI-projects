import { useState, useRef, useEffect } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Card } from '../Card/Card';
import type { List as ListType } from '../../types';
import styles from './List.module.css';

type Props = {
  list: ListType;
  index: number;
  onUpdateTitle: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onAddCard: (listId: string, title: string) => void;
  onUpdateCard: (listId: string, cardId: string, title: string) => void;
  onDeleteCard: (listId: string, cardId: string) => void;
};

export function List({ list, index, onUpdateTitle, onDelete, onAddCard, onUpdateCard, onDeleteCard }: Props) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(list.title);
  const [addingCard, setAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);
  const cardInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editingTitle) titleInputRef.current?.select();
  }, [editingTitle]);

  useEffect(() => {
    if (addingCard) cardInputRef.current?.focus();
  }, [addingCard]);

  function commitTitle() {
    const trimmed = titleDraft.trim();
    if (trimmed && trimmed !== list.title) onUpdateTitle(list.id, trimmed);
    else setTitleDraft(list.title);
    setEditingTitle(false);
  }

  function handleTitleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') commitTitle();
    if (e.key === 'Escape') { setTitleDraft(list.title); setEditingTitle(false); }
  }

  function submitCard() {
    const trimmed = newCardTitle.trim();
    if (trimmed) {
      onAddCard(list.id, trimmed);
      setNewCardTitle('');
    }
  }

  function handleCardKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitCard(); }
    if (e.key === 'Escape') { setNewCardTitle(''); setAddingCard(false); }
  }

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`${styles.list} ${snapshot.isDragging ? styles.dragging : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className={styles.header} {...provided.dragHandleProps}>
            {editingTitle ? (
              <input
                ref={titleInputRef}
                className={styles.titleInput}
                value={titleDraft}
                onChange={e => setTitleDraft(e.target.value)}
                onBlur={commitTitle}
                onKeyDown={handleTitleKeyDown}
              />
            ) : (
              <h3 className={styles.title} onClick={() => setEditingTitle(true)}>
                {list.title}
              </h3>
            )}
            <button className={styles.deleteBtn} onClick={() => onDelete(list.id)} title="リストを削除">×</button>
          </div>

          <Droppable droppableId={list.id} type="card">
            {(dropProvided, dropSnapshot) => (
              <div
                className={`${styles.cards} ${dropSnapshot.isDraggingOver ? styles.over : ''}`}
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
              >
                {list.cards.map((card, i) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={i}
                    onUpdate={(cardId, title) => onUpdateCard(list.id, cardId, title)}
                    onDelete={(cardId) => onDeleteCard(list.id, cardId)}
                  />
                ))}
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>

          {addingCard ? (
            <div className={styles.addCardForm}>
              <textarea
                ref={cardInputRef}
                className={styles.cardInput}
                placeholder="カードのタイトルを入力..."
                value={newCardTitle}
                onChange={e => setNewCardTitle(e.target.value)}
                onKeyDown={handleCardKeyDown}
                rows={2}
              />
              <div className={styles.formActions}>
                <button className={styles.addBtn} onClick={submitCard}>カードを追加</button>
                <button className={styles.cancelBtn} onClick={() => { setNewCardTitle(''); setAddingCard(false); }}>×</button>
              </div>
            </div>
          ) : (
            <button className={styles.addCardTrigger} onClick={() => setAddingCard(true)}>
              + カードを追加
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
}
