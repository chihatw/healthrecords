'use client';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useOptimistic } from 'react';
import { WorkoutRecord } from '../schema';
import { removeWorkoutRecord } from '../services/actions';

type Props = { records: WorkoutRecord[] };

const RecordList = ({ records }: Props) => {
  const [optimisticRecords, removeRecord] = useOptimistic<
    WorkoutRecord[],
    string
  >(
    records.sort((a, b) => b.date.getTime() - a.date.getTime()),
    (state, id) => state.filter((record) => record.id !== id)
  );

  const action = async (id: string) => {
    removeRecord(id);
    await removeWorkoutRecord(id);
  };

  return (
    <div className='max-w-sm mx-auto pb-20 space-y-2'>
      {optimisticRecords.map((record) => (
        <div
          key={record.id}
          className='grid grid-cols-[1fr,auto] items-center bg-white/60 rounded pl-4 pr-2'
        >
          <div className='text-sm'>
            {`${record.date.getFullYear()}/${
              record.date.getMonth() + 1
            }/${record.date.getDate()}`}
          </div>
          <form action={() => action(record.id)}>
            <Button variant={'ghost'} size={'icon'} type='submit'>
              <Trash2 />
            </Button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default RecordList;
