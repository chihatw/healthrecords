'use client';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useOptimistic } from 'react';
import { WorkoutRecord } from '../schema';
import { removeWorkoutRecord } from '../services/actions';
import { serializeDateArray } from '../services/utils';

type Props = { records: WorkoutRecord[] };

const RecordList = ({ records }: Props) => {
  const [optimisticRecords, removeRecord] = useOptimistic<
    WorkoutRecord[],
    string
  >(
    records.sort(
      (a, b) => serializeDateArray(b.date) - serializeDateArray(a.date)
    ),
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
            {`${record.date[0]}/${record.date[1]}/${record.date[2]}`}
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
