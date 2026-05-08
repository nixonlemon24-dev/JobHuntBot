import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';

export function useSavedJobs() {
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) { setLoading(false); return; }

    const ref = collection(db, 'users', user.uid, 'savedJobs');
    const unsub = onSnapshot(ref, (snap) => {
      setSavedJobIds(new Set(snap.docs.map((d) => d.id)));
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const toggleSave = async (job) => {  
    const user = auth.currentUser;
    if (!user) return;

    const jobId = job.job_id || job.job_apply_link; 
    const ref = doc(db, 'users', user.uid, 'savedJobs', jobId);

    if (savedJobIds.has(jobId)) {
      await deleteDoc(ref);  
    } else {
      await setDoc(ref, {
        ...job,
        savedAt: new Date().toISOString(),
      });
    }
  };

  return { savedJobIds, toggleSave, loading };
}