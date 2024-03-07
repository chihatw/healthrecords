import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccountKey = process.env.NEXT_FIREBASE_SERVICE_ACCOUNT_KEY!;
const cleaned = serviceAccountKey
  .replace(/\\n/g, '\n') // <- これがなかったら、Failed to parse private key
  .replace(/[\u0000-\u001F]+/g, ''); // <- これがなかったら、Bad control character in string literal

const serviceAccount = JSON.parse(cleaned);

// https://github.com/nodejs/help/issues/4115
const private_key = serviceAccount.private_key
  .replace('-----BEGIN PRIVATE KEY-----', '')
  .replace('-----END PRIVATE KEY-----', '');

serviceAccount.private_key = `
-----BEGIN PRIVATE KEY-----
${private_key}
-----END PRIVATE KEY-----
  `;

// https://zenn.dev/mktu/articles/55b3bfee839cfc
const app = !getApps()[0]
  ? initializeApp({
      credential: cert(serviceAccount),
    })
  : getApps()[0];

export const authAdmin = getAuth(app);
export const dbAdmin = getFirestore(app);
