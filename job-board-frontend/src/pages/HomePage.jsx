import FilterPanel from '../components/FilterPanel';
import JobList from '../components/JobList';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600">
            Browse through thousands of job opportunities and find the perfect match for your career.
          </p>
        </div>

        <FilterPanel />
        <JobList />
      </div>
    </div>
  );
};

export default HomePage;