import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// import { } from 'firebase/<service>';

import { firebaseConfig } from './config.js'

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
