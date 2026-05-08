// src/components/JobCard.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SaveIcon, ApplyIcon} from './UserIcons';

function getInitials(name) {
  if (!name) return '??';
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function timeAgo(dateStr) {
  if (!dateStr) return 'Recently posted';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

function getSource(url = '', publisher = '', jobSource = []) {
  const u = url.toLowerCase();
  const p = publisher.toLowerCase();
  const isLinkedIn  = u.includes('linkedin')  || p.includes('linkedin');
  const isIndeed    = u.includes('indeed')    || p.includes('indeed');
  const isJobStreet = u.includes('jobstreet') || p.includes('jobstreet');

  if (isLinkedIn)  return { cls: 'linkedin',  label: 'LinkedIn',    active: jobSource.includes('linkedin') };
  if (isIndeed)    return { cls: 'indeed',    label: 'Indeed PH',   active: jobSource.includes('indeed') };
  if (isJobStreet) return { cls: 'jobstreet', label: 'JobStreet',   active: jobSource.includes('jobstreet') };
  return { cls: 'other', label: publisher || 'Job Board' };
}

function JobCard({ job, userInput, jobSource, jobType, workSetup, index, savedJobIds = new Set(), toggleSave }) {
  const [animating, setAnimating] = useState(false);

  const source  = getSource(job.job_apply_link, job.job_publisher, jobSource);
  const isTop   = index === 0;
  const emptype = job.job_employment_type?.toLowerCase() || '';

  if (jobSource.length > 0 && !source.active) return null;
  if (jobType.length > 0 && !jobType.includes(emptype)) return null;
  if (workSetup.length > 0 && !workSetup.includes(job.job_is_remote ? 'remote' : 'onsite')) return null;

  const salary = job.job_min_salary && job.job_max_salary
    ? `₱${Number(job.job_min_salary).toLocaleString()} – ₱${Number(job.job_max_salary).toLocaleString()}/mo`
    : null;

  const isRemote = job.job_is_remote;

  // ✅ Stable job ID
  const jobId = job.job_id || job.job_apply_link;
  const isSaved = savedJobIds.has(jobId);

  const handleSave = async () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
    await toggleSave(job);
  };

  return (
    <div className="job-card">
      <div className="job-card-top">
        <div className="job-info">
          <div className="job-title">{job.job_title || 'Job Opening'}</div>
          <div className="company-name">
            <strong>{job.employer_name || 'Company'}</strong>
            {job.job_city    ? ` · ${job.job_city}`   : ''}
            {job.job_country ? `, ${job.job_country}` : ''}
          </div>
          <div className="job-meta">
            {isRemote
              ? <span className="meta-tag remote">🏠 Remote</span>
              : <span className="meta-tag onsite">🏢 On-site</span>
            }
            {job.job_employment_type && (
              <span className="meta-tag">{job.job_employment_type}</span>
            )}
            {salary && <span className="meta-tag salary">{salary}</span>}
            {job.job_required_experience?.required_experience_in_months && (
              <span className="meta-tag">
                {Math.floor(job.job_required_experience.required_experience_in_months / 12)}+ yrs exp
              </span>
            )}
          </div>
        </div>

        {/* ✅ Save Button — wired up */}
        <button
          className={`job-save ${isSaved ? 'saved' : ''} ${animating ? 'pop' : ''}`}
          title={isSaved ? 'Unsave job' : 'Save job'}
          onClick={handleSave}
        >
          <SaveIcon filled={isSaved} />
        </button>
      </div>

      <p className="job-desc">
        {(job.job_description || 'No description available.').slice(0, 220)}...
      </p>

      <div className="job-footer">
        <div className="job-source">
          <span className="job-date">· {timeAgo(job.job_posted_at_datetime_utc)}</span>
        </div>
        <a className="apply-btn" href={job.job_apply_link} target="_blank" rel="noopener noreferrer">
          Apply Now
          <ApplyIcon /> 
        </a>
      </div>
    </div>
  );
}

export default JobCard;