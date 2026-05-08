import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export async function getSavedJobs(uid) {
  const ref = collection(db, 'users', uid, 'savedJobs');
  const q = query(ref, orderBy('savedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data());
}