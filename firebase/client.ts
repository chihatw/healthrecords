import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebase_config = process.env.NEXT_PUBLIC_FIREBASE_CONFIG!;

const firebaseConfig = JSON.parse(firebase_config);

// Initialize Firebase
const app = getApps()?.length ? getApps()[0] : initializeApp(firebaseConfig);

export const authClient = getAuth(app);

// debug
// const isDev = process.env.NODE_ENV === 'development';
// if (isDev) {
//   connectAuthEmulator(authClient, 'http://127.0.0.1:9099');
//   // https://firebase.google.com/docs/emulator-suite/connect_firestore?hl=ja#web-modular-api
//   // connectFirestoreEmulator(dbClient, "127.0.0.1", 8080);
// }
