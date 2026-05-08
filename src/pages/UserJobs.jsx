import '../App.css'
import '../signup.css'
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSavedJobs } from '../utils/GetSavedJobs';
import JobCard from '../components/JobCard';
import { EmptyState, LoadingState } from '../components/LoadingState';

function UserJobs() {
  const { user, loading: authLoading  } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user?.uid) {
      setLoading(false);
      return;
    }


//   console.log('Fetching saved jobs for:', user.uid);

  getSavedJobs(user.uid)
    .then(jobs => {
    //   console.log('Saved jobs returned:', jobs);
      setSavedJobs(jobs);
    })
    .catch(err => console.error('Fetch error:', err))
    .finally(() => setLoading(false));
   }, [user?.uid]);
        if (authLoading || loading) return <LoadingState />;
        if (!user) return <EmptyState icon="🔒" message="Please log in to view your saved jobs." />;
        if (!savedJobs.length) return <EmptyState icon="🔖" message="No saved jobs yet. Start saving jobs you like!" />;


  return (
      <div className="page">
        <div className="panel-right">
  <div className="saved-jobs-card">
      <div className="job-list">
        <div className="job-list">
        {savedJobs.map(job => (
            <JobCard
            key={job.job_id}
            job={job}
            jobSource={[]}
            jobType={[]}
            workSetup={[]}
            />
        ))}
        </div>
        </div>
        </div>
    </div>
     </div>
  );
}

export default UserJobs;