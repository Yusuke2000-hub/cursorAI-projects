import { useCallback, useEffect, useState } from 'react';
import { Board } from './components/Board/Board';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Board as BoardType } from './types';

type ApiBoard = {
  id: string;
  title: string;
  position: number;
  lists: BoardType['lists'];
  createdAt: string;
  updatedAt: string;
};

const DEFAULT_BOARD: BoardType = {
  id: 'default-board',
  title: 'マイボード',
  lists: [
    {
      id: 'list-todo',
      title: 'To Do',
      cards: [
        { id: 'card-1', title: 'タスクのサンプル 1', createdAt: new Date().toISOString() },
        { id: 'card-2', title: 'タスクのサンプル 2', createdAt: new Date().toISOString() },
      ],
    },
    {
      id: 'list-doing',
      title: '進行中',
      cards: [
        { id: 'card-3', title: '作業中のタスク', createdAt: new Date().toISOString() },
      ],
    },
    {
      id: 'list-done',
      title: '完了',
      cards: [],
    },
  ],
};

function App() {
  const [board, setBoard] = useLocalStorage<BoardType>('trello-board', DEFAULT_BOARD);
  const [apiBoards, setApiBoards] = useState<ApiBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchBoards = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('http://localhost:8080/api/boards');
      const data: ApiBoard[] = await res.json();
      console.log('GET /api/boards:', data);
      setApiBoards(data);
      if (data.length > 0) {
        setBoard(prev => ({ ...prev, id: data[0].id, title: data[0].title }));
      }
    } catch (err) {
      console.error('boards取得エラー:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [setBoard]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBoards();
  }, [fetchBoards]);

  const handleDeleteBoard = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/boards/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('ボード削除に失敗しました');
      await fetchBoards();
    } catch (err) {
      console.error('boards削除エラー:', err);
      setError(true);
    }
  };

  const handleCreateBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = newBoardTitle.trim();
    if (!title) return;

    setCreating(true);
    try {
      const res = await fetch('http://localhost:8080/api/boards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('ボード作成に失敗しました');
      setNewBoardTitle('');
      await fetchBoards();
    } catch (err) {
      console.error('boards作成エラー:', err);
      setError(true);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div style={{ padding: '8px 16px', background: '#0052cc', color: '#fff' }}>
        {loading && <span>読み込み中...</span>}
        {!loading && error && <span>データの取得に失敗しました</span>}
        {!loading && !error && (
          <span>
            ボード一覧：{apiBoards.map((b) => b.title).join('、')}
          </span>
        )}
        <form onSubmit={handleCreateBoard} style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            placeholder="新しいボード名"
            disabled={creating}
            style={{ padding: '4px 8px', borderRadius: '4px', border: 'none' }}
          />
          <button type="submit" disabled={creating || !newBoardTitle.trim()}>
            {creating ? '追加中...' : 'ボードを追加'}
          </button>
        </form>
      </div>
      <Board board={board} onUpdateBoard={setBoard} onDeleteBoard={handleDeleteBoard} />
    </div>
  );
}

export default App;
