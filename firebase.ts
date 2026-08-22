import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp({
  ...firebaseConfig,
  projectId: firebaseConfig.projectId,
});

// Pass the databaseId if available
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const getBooksCollection = () => collection(db, 'books');
export const getScholarshipsCollection = () => collection(db, 'scholarships');
export const getVolunteerSessionsCollection = () => collection(db, 'volunteer_sessions');
