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
      date,
    };
    records.push(record);
  });

  const sorted = records.sort(
    (a, b) => serializeDateArray(a.date) - serializeDateArray(b.date)
  );

  return sorted;
}

export function serializeDateArray(array: [number, number, number]): number {
  return array[0] * 1000 + array[1] * 100 + array[2];
}
