import { useState, useRef, useEffect } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import type { Card as CardType } from '../../types';
import styles from './Card.module.css';

type Props = {
  card: CardType;
  index: number;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

export function Card({ card, index, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(card.title);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function commit() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== card.title) onUpdate(card.id, trimmed);
    else setDraft(card.title);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commit(); }
    if (e.key === 'Escape') { setDraft(card.title); setEditing(false); }
  }

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`${styles.card} ${snapshot.isDragging ? styles.dragging : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {editing ? (
            <textarea
              ref={inputRef}
              className={styles.textarea}
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onBlur={commit}
              onKeyDown={handleKeyDown}
              rows={2}
            />
          ) : (
            <span className={styles.title} onClick={() => setEditing(true)}>
              {card.title}
            </span>
          )}
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(card.id)}
            title="カードを削除"
          >
            ×
          </button>
        </div>
      )}
    </Draggable>
  );
}
