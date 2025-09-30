import { useJobContext } from '../context/JobContext';
import JobCard from './JobCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const JobList = () => {
  const { jobs, loading, error, refreshJobs } = useJobContext();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refreshJobs} />;

  if (jobs.length === 0) {
    return (
      <div className="text-center py-20 glass-effect rounded-3xl animate-fade-in">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
          <button
            onClick={refreshJobs}
            className="btn-secondary"
          >
            Refresh Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600 font-medium" role="status">
          <span className="gradient-text font-bold text-lg">{jobs.length}</span> job{jobs.length !== 1 ? 's' : ''} found
        </p>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-white rounded-lg transition-colors duration-200 glass-effect">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button className="p-2 hover:bg-white rounded-lg transition-colors duration-200 glass-effect">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div
            key={job.id}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="animate-slide-up"
          >
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;