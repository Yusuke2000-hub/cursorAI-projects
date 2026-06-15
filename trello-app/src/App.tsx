import { useEffect, useState } from 'react';
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

  useEffect(() => {
    fetch('http://localhost:8080/api/boards')
      .then((res) => res.json())
      .then((data: ApiBoard[]) => {
        console.log('GET /api/boards:', data);
        setApiBoards(data);
      })
      .catch((err) => {
        console.error('boards取得エラー:', err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
      </div>
      <Board board={board} onUpdateBoard={setBoard} />
    </div>
  );
}

export default App;
