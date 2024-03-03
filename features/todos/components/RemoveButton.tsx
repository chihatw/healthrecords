'use client';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

import { Todo } from '../schema';
import { removeTodo } from '../services/actions';

const RemoveButton = ({
  todo,
  handleRemove,
}: {
  todo: Todo;
  handleRemove: (id: string) => void;
}) => {
  return (
    <form
      action={() => {
        handleRemove(todo.id);
        removeTodo(todo.id);
      }}
    >
      <Button type='submit' size='icon' variant='ghost'>
        <Trash2 size={20} />
      </Button>
    </form>
  );
};

export default RemoveButton;
