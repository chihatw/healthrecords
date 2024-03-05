export interface WorkoutRecord {
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
  date: Date;
}
