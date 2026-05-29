import { Board } from './components/Board/Board';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Board as BoardType } from './types';

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

  return <Board board={board} onUpdateBoard={setBoard} />;
}

export default App;
