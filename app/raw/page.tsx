import RecordForm from '@/features/workout/components/RecordForm';
import RecordList from '@/features/workout/components/RecordList';

import { getWorkoutRecords } from '@/features/workout/services/server';

type Props = {};

const RawPage = async (props: Props) => {
  const records = await getWorkoutRecords();
  return (
    <div className='max-w-lg mx-auto pt-10 space-y-10'>
      <RecordForm />
      <RecordList records={records} />
    </div>
  );
};

export default RawPage;
