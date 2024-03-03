'use client';
import { useOptimistic } from 'react';
import { Todo } from '..';
import RemoveButton from './RemoveButton';

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const [optimisticTodos, removeTodo] = useOptimistic<Todo[], string>(
    todos,
    (state, id) => state.filter((todo) => todo.id !== id)
  );
  return (
    <div className='w-full max-w-sm space-y-4'>
      <div className='text-center text-2xl font-extrabold'>TodoList</div>
      <div className='space-y-2'>
        {optimisticTodos.map((todo) => (
          <div
            key={todo.id}
            className='flex h-12 items-center justify-between rounded-lg bg-white pl-4 font-extralight shadow-lg'
          >
            <div>{todo.title}</div>
            <RemoveButton todo={todo} handleRemove={removeTodo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
