export const normalizeJob = (job, index) => ({
  job_id: job.job_id ?? index,
  job_title: job.job_title ?? job.title ?? "",
  employer_name: job.employer_name ?? job.company ?? "",
  job_city: job.job_city ?? job.location ?? "",
  job_employment_type: job.job_employment_type ?? job.employment_type ?? "",
  job_is_remote: job.job_is_remote ?? job.remote ?? false,
  job_min_salary: job.job_min_salary ?? 0,
  job_max_salary: job.job_max_salary ?? 0,
  job_description: job.job_description ?? job.description ?? "",
  job_apply_link: job.job_apply_link ?? job.apply_link ?? "",
  job_posted_at: job.job_posted_at ?? job.posted ?? null,
});