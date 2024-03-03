'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { nanoid } from 'nanoid';

import { useSession } from 'next-auth/react';
import { useMemo, useRef, useState, useTransition } from 'react';
import { addTodo } from '../services/actions';

type Props = {
  disabled: boolean;
  errMsg: string;
  title: string;
};

const INITIAL_STATE: Props = {
  disabled: true,
  errMsg: '',
  title: '',
};

const TodoForm = () => {
  const form = useRef<null | HTMLFormElement>(null);
  const { data } = useSession();
  const uid = useMemo(() => data?.user?.id || '', [data]);
  const [props, setProps] = useState(INITIAL_STATE);
  const [isPending, startTransaction] = useTransition();

  const handleChange = () => {
    if (!form.current) return;
    const formData = new FormData(form.current);
    const title = formData.get('title')?.toString() || '';
    const disabled = !title;
    setProps({ disabled, title, errMsg: '' });
  };

  const action = (formData: FormData) => {
    startTransaction(async () => {
      let newMessage = '';
      try {
        const title = String(formData.get('title'));
        const errMsg = await addTodo({ title, id: nanoid(), uid });
        if (errMsg) throw errMsg;
        setProps((prev) => ({ ...prev, title: '', disabled: true }));
        form.current!.reset();
      } catch (error) {
        newMessage = error as string;
        setProps((prev) => ({ ...prev, errMsg: newMessage }));
      }
    });
  };

  return (
    <form
      ref={form}
      className='grid gap-4'
      action={action}
      onChange={handleChange}
    >
      <Input placeholder='title' name='title' />

      <Button type='submit' disabled={props.disabled || isPending}>
        {props.title ? 'Create a new Todo' : 'Please enter title'}
        {isPending ? <Loader2 className='animate-spin' /> : null}
      </Button>
      {props.errMsg ? (
        <div className='text-red-500 text-xs'>{props.errMsg}</div>
      ) : null}
    </form>
  );
};

export default TodoForm;
