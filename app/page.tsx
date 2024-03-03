import { auth } from '@/auth';
import { Todo, TodoForm, TodoList } from '@/features/todos';
import { dbAdmin } from '@/firebase/admin';
import { COLLECTIONS } from '@/firebase/constants';

export default async function Home() {
  const session = await auth();
  const uid = session?.user?.id || '';

  const snapshot = await dbAdmin
    .collection(COLLECTIONS.todos)
    .where('uid', '==', uid)
    .get();
  const todos: Todo[] = [];

  snapshot.forEach((doc) => {
    const { title, uid } = doc.data();
    const todo: Todo = { id: doc.id, title, uid };
    todos.push(todo);
  });
  return (
    <main className='mx-auto w-full  max-w-md space-y-4 pb-40 pt-10'>
      <div className='grid  place-items-center gap-y-8 '>
        <div className='w-full max-w-sm space-y-6'>
          <TodoList todos={todos} />
          <TodoForm />
        </div>
      </div>
    </main>
  );
}
