export interface WorkoutRecord {
  id: string;
  temperature: number;
  wakeup: [number, number]; // [h, m]
  distance: number; // m
  calories: number;
  bpm_avg: number;
  bpm_max: number;
  vo2_max: [number, number]; //[m,s]
  anaerobic: [number, number]; //[m,s]
  aerobic: [number, number]; //[m,s]
  intensive: [number, number]; //[m,s]
  light: [number, number]; //[m,s]
  relax: [number, number]; //[m,s]
  date: [number, number, number]; // [y,m,d]
}
export type WorkoutRecord_createRecord = Omit<WorkoutRecord, 'id' | 'date'> & {
  date: [number, number, number];
  createdAt: number;
};

export interface RecordFormState {
  temperature: number;
  wakeup: number;
  distance: number;
  calories: number;
  bpm_avg: number;
  bpm_max: number;
  vo2_max: number;
  anaerobic: number;
  aerobic: number;
  intensive: number;
  light: number;
  relax: number;
  disabled: boolean;
  errMsg: string;
  y: number;
  m: number;
  d: number;
}
