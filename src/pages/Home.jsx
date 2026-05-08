import { useState, useRef, useEffect, useCallback, useMemo  } from 'react';
import JobCard from '../components/JobCard'; // 
import { fetchJobsFromRapid } from "../api/JobApi";
import { useSavedJobs } from '../hooks/useSavedJobs';
import { EmptyState, LoadingState } from '../components/LoadingState';

export default function Home() {
  //Query states
  const [userInput, setUserInput] = useState(''); // Search query
  const [location, setLocation] = useState('Philippines');  // Location query

  //Data states
  const [jobs, setJobs]         = useState([]); 
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [page, setPage]         = useState(1);
  const [hasMore, setHasMore]   = useState(false);
  const [searched, setSearched] = useState(false);


  //Filters
  const [sortOrder, setSortOrder] = useState('default');
  const [jobSource, setJobSource] = useState([]);
  const [workSetup, setWorkSetup] = useState([]); 
  const [employmentType, setEmploymentType] = useState([]);
  const [datePosted, setDatePosted] = useState('3days');

  //Saved jobs
  const { savedJobIds, toggleSave } = useSavedJobs();

  const dateOptions = [
  { label: 'Anytime',      value: 'all' },
  { label: 'Last 24 hours', value: 'today' },
  { label: 'Last 3 days',  value: '3days' },
  { label: 'Last 7 days',  value: 'week' },
  ];

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setPage(1);
    try {
      const realJobs = await fetchJobsFromRapid(userInput, location, 1, datePosted);
      setJobs(realJobs);
      setHasMore(realJobs.length === 10);
      setSearched(true);
    } catch (err) {
      setError("Server is not running.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchJobsFromRapid(userInput, location, next, datePosted).then((raw) => {
      setJobs(prev => [...prev, ...raw]);
      setHasMore(raw.length === 10);
    }).catch(() => setError("Failed to load more jobs."));
  };

  const sortedJobs = useMemo(() => {
    const jobsCopy = [...jobs];
    switch (sortOrder) {
      case "asc":
        return jobsCopy.sort((a, b) => a.job_title.localeCompare(b.job_title));
      case "desc":
        return jobsCopy.sort((a, b) => b.job_title.localeCompare(a.job_title));
      case "date":
        return jobsCopy.sort((a, b) => new Date(b.job_posted_at) - new Date(a.job_posted_at));
      default:
        return jobsCopy;
    }
  }, [jobs, sortOrder]);


// const handleSearch = async () => {
//   const realJobs = await fetchJobsFromRapid(userInput, location, page, datePosted);
//   // const filtered = await filterJobsWithAI(userInput, location);
//   setJobs(realJobs);
// };


  // const sendMessage = async () => {
  //   if (!input.trim()) return;
  //   setInput("");
  //   setLoading(true);
  //   try {
  //     const raw = await fetchJobsFromAI(input, jobs);
  //     setJobs(raw.map(normalizeJob));
  //     setError(null);
  //   } catch (err) {
  //     setError(err.message || "Failed to send message.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchJobs = useCallback(async (q, loc, pg, append = false) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const raw = await fetchJobsFromRapid(q, loc, pg, datePosted);
  //     const normalized = raw.map(normalizeJob);
  //     setJobs(prev => append ? [...prev, ...normalized] : normalized);
  //     setHasMore(raw.length === 10);
  //     setSearched(true);
  //     // setLastQuery(q);
  //   } catch (err) {
  //     setError("Server is not running.");
  //   } finally {
  //     setError("");
  //     setLoading(false);
  //   }
  // }, [datePosted]);

  // useEffect(() => {
  // fetchJobs("", "Philippines", 1);
  // }, [fetchJobs]);

  


  // const handleLoadMore = () => {
  //   const next = page + 1;
  //   setPage(next);
  //   // fetchJobs(query, location, next, true);
  //   fetchJobs(userInput, location, next, true);
  // };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

 
  const handleTag = (tag) => {
    setQuery(tag);
    setPage(1);
    setJobs([]);
    fetchJobs(tag, location, 1, false);
  };

  const toggleSource = (source) => {
  setJobSource(prev => prev.includes(source)? prev.filter(s => s !== source)  : [...prev, source]
  );};

  const toggleEmploymentType = (type) => {
    setEmploymentType(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };
 const toggleWorkSetup = (setup) => {
    setWorkSetup(prev => prev.includes(setup) ? prev.filter(s => s !== setup) : [...prev, setup]);
  };


  

 return (
<div>


<section className="hero">
  <div className="hero-inner">
    <h1 className="hero-title">Find Your Next<br/><em>Opportunity</em></h1>
  <div className="job-src">
    <span className="job-src-label">Indeed</span>
    <span className="job-src-label">JobStreet</span>
    <span className="job-src-label">LinkedIn</span>
    <span className="job-src-label">+ more boards</span>
  </div>
     
  <div className="search-bar">
    <input className="search-input" type="text" placeholder="e.g. Web Developer, Virtual Assistant, Any Job..." value = {userInput} onChange={(e) => setUserInput(e.target.value)} />
    <div className="field-divider"></div>
    <input className="location-input" type="text" placeholder="Location" value="Philippines" onChange={(e) => setLocation(e.target.value)}/>
    <button className="search-btn" onClick={handleSearch} disabled={loading}>{loading ? 'Loading...' : 'Search'} </button>
  </div>

  </div>
</section>



<div className="body-grid">
  <aside className="filter-panel">
    <p className="panel-title">Refine Results</p>

  <div className="filter-group">
    <p className="filter-group-label"> Job Source
    <a href="#" onClick={() => setJobSource(['indeed', 'jobstreet', 'linkedin', 'other'])}> Select all </a> </p>

    <div className="source-toggle">
        <div className={`source-chip ${jobSource.includes('indeed') ? 'active' : ''}`} onClick={() => toggleSource('indeed')}> Indeed </div>
        <div className={`source-chip ${jobSource.includes('jobstreet') ? 'active' : ''}`} onClick={() => toggleSource('jobstreet')}>JobStreet</div>
        <div className={`source-chip ${jobSource.includes('linkedin') ? 'active' : ''}`} onClick={() => toggleSource('linkedin')}> LinkedIn</div>
        <div className={`source-chip ${jobSource.includes('other') ? 'active' : ''}`} onClick={() => toggleSource('other')}> Other Source </div>
    </div>

  </div>

    <div className="divider-h"></div>

    <div className="filter-group">
      <p className="filter-group-label">Work Setup</p>
      <label className="check-item">
        <input type="checkbox" checked={workSetup.includes('remote')} onChange={() => toggleWorkSetup('remote')}/>
        <span className="check-label" c>Remote / WFH</span>
        <span className="check-count">0</span>
      </label>
      <label className="check-item">
        <input type="checkbox" checked={workSetup.includes('hybrid')} onChange={() => toggleWorkSetup('hybrid')}/>
        <span className="check-label">Hybrid</span>
        <span className="check-count">{jobs.filter(job => job.workSetup === 'hybrid').length}</span>
        {/*{(Array.isArray(jobs) ? jobs : []).filter(job => job.workSetup === 'hybrid').length} */}
      </label>
      <label className="check-item">
           <input type="checkbox" checked={workSetup.includes('onsite')} onChange={() => toggleWorkSetup('onsite')}/>
        <span className="check-label">On-site</span>
        <span className="check-count">{jobs.filter(job => job.workSetup === 'onsite').length}</span>
      </label>
    </div>

    <div className="filter-group">
      <p className="filter-group-label">Employment Type</p>

       <label className="check-item">
        <input type="checkbox" checked={employmentType.includes('full-time')}onChange={() => toggleEmploymentType('full-time')}/>
        <span className="check-label">Full-time</span>
        <span className="check-count">{jobs.filter(job => job.job_employment_type === 'Full-Time').length}</span>
      </label>
       <label className="check-item">
        <input type="checkbox" checked={employmentType.includes('part-time')} onChange={() => toggleEmploymentType('part-time')} />
        <span className="check-label">Part-time</span>
        <span className="check-count">0</span>
      </label>

       <label className="check-item">
        <input type="checkbox" checked={employmentType.includes('contract')} onChange={() => toggleEmploymentType('contract')} />
        <span className="check-label">Contract</span>
        <span className="check-count">0</span>
      </label>

      <label className="check-item">
        <input type="checkbox"checked={employmentType.includes('freelance')}onChange={() => toggleEmploymentType('freelance')} />
        <span className="check-label">Freelance</span>
        <span className="check-count">0</span>
      </label>

    </div>

  <div className="filter-group">
    <p className="filter-group-label">Date Posted</p>
    {dateOptions.map(option => (
      <label key={option.value} className="check-item">
        <input
          type="radio"
          name="date"
          value={option.value}
          checked={datePosted === option.value}
          onChange={() => setDatePosted(option.value)}
        />
        <span className="check-label">{option.label}</span>
      </label>
    ))}
  </div>
  </aside>

  <main className="results-panel">
    <div className="results-header">
      {jobs.length > 0 && (
        <p className="results-count">Showing <strong>{jobs.length.toLocaleString()} jobs</strong> for {userInput} in {location}</p>
      )}
      <div className="sort-row"> 
        <span className="sort-label">Sort:</span>
        <select className="sort-sel"  value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Default</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
          <option value="date">Date Posted</option>
        </select>
      </div>
    </div>
      

   {/* Job Modal */}
 <div className="job-list">
  {loading ? ( <LoadingState />) :
   error ? (<EmptyState icon="⚠️" message={error} />) : sortedJobs.length === 0 ? (
   <EmptyState icon="🔍" message="No jobs found. Try a different keyword." />) : (
    sortedJobs.map((job, index) => (
      <JobCard
        key={job.job_id || index}
        job={job}
        jobSource={jobSource}
        jobType={employmentType}
        workSetup={workSetup}
        userInput={userInput}
        index={index}
        savedJobIds={savedJobIds}
        toggleSave={toggleSave}
      />
    ))
  )}
</div>

  { jobs.length.toLocaleString() > 0 &&
  <div className="load-more">
      <button className="load-more-btn" onClick={handleLoadMore}>Load More Jobs </button>
  </div>
  }
  </main>


  <aside className="ai-panel">
  </aside>
</div>
</div>
    )
}





