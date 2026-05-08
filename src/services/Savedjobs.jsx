
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'; // adjust path to your firebase config

/**
 * Check if a job is saved for the current user.
 * @param {string} uid - Firebase user ID from AuthContext
 * @param {string} jobId
 * @returns {Promise<boolean>}
 */



export async function isJobSaved(uid, jobId) {
  const ref = doc(db, 'users', uid, 'savedJobs', String(jobId));
  const snap = await getDoc(ref);
  return snap.exists();
}

/**
 * Toggle save/unsave a job for the current user.
 * @param {string} uid - Firebase user ID from AuthContext
 * @param {object} job - Full job object
 * @returns {Promise<boolean>} - true if job was just saved, false if removed
 */
export async function toggleSaveJob(uid, job) {
  const ref = doc(db, 'users', uid, 'savedJobs', String(job.job_id));
  const snap = await getDoc(ref);

  if (snap.exists()) {
    await deleteDoc(ref);
    return false; // check if unsaved
  } else {
    await setDoc(ref, {
      job_id: job.job_id,
      job_title: job.job_title,
      employer_name: job.employer_name,
      employer_logo: job.employer_logo ?? null,
      job_city: job.job_city ?? null,
      job_country: job.job_country ?? null,
      job_is_remote: job.job_is_remote ?? false,
      job_employment_type: job.job_employment_type ?? null,
      job_min_salary: job.job_min_salary ?? null,
      job_max_salary: job.job_max_salary ?? null,
      job_description: job.job_description ?? null,
      job_apply_link:  job.job_apply_link ?? null,
      job_publisher: job.job_publisher ?? null,
      job_posted_at_datetime_utc: job.job_posted_at_datetime_utc ?? null,
      savedAt: new Date().toISOString(),
    });
    return true; 
  }
}

