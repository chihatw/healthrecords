'use server';

import { dbAdmin } from '@/firebase/admin';
import { COLLECTIONS } from '@/firebase/constants';
import { revalidatePath } from 'next/cache';
import { RecordFormState } from '../schema';
import { buildWorkoutRecord_createRecord } from './utils';

export async function addWorkoutRecord(
  state: RecordFormState
): Promise<string> {
  console.log('@@');
  const record = buildWorkoutRecord_createRecord(state);
  try {
    await dbAdmin.collection(COLLECTIONS.records).add(record);
    revalidatePath('/');
    revalidatePath('/raw');
    return '';
  } catch (error) {
    console.log(error);
    return 'cannot add record';
  }
}

export async function removeWorkoutRecord(id: string) {
  await dbAdmin.collection(COLLECTIONS.records).doc(id).delete();
  revalidatePath('/');
  revalidatePath('/raw');
}
