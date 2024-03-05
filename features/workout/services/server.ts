import { dbAdmin } from '@/firebase/admin';
import { COLLECTIONS } from '@/firebase/constants';
import { WorkoutRecord } from '../schema';

export async function getWorkoutRecords() {
  const snapshot = await dbAdmin.collection(COLLECTIONS.records).get();
  const records: WorkoutRecord[] = [];
  snapshot.forEach((doc) => {
    const {
      temperature,
      wakeup,
      distance,
      calories,
      bpm_avg,
      bpm_max,
      vo2_max,
      anaerobic,
      aerobic,
      intensive,
      light,
      relax,
      date,
    } = doc.data();
    const record: WorkoutRecord = {
      id: doc.id,
      temperature,
      wakeup,
      distance,
      calories,
      bpm_avg,
      bpm_max,
      vo2_max,
      anaerobic,
      aerobic,
      intensive,
      light,
      relax,
      date: new Date(`${date[0]}/${date[1]}/${date[2]}`),
    };
    records.push(record);
  });

  return records;
}
