import FilterPanel from '../components/FilterPanel';
import JobList from '../components/JobList';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              <span className="gradient-text">Discover</span> Your Next
              <br />
              <span className="gradient-text">Career Move</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore thousands of job opportunities with all the information you need. 
              Your dream job is waiting for you! 🚀
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto glass-effect rounded-2xl p-3 animate-slide-up">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-transparent focus:border-blue-500 focus:outline-none bg-white"
                  />
                </div>
                <div className="flex-1 relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="City or remote"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-transparent focus:border-blue-500 focus:outline-none bg-white"
                  />
                </div>
                <button className="btn-primary whitespace-nowrap px-8">
                  Search Jobs
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: '10K+', label: 'Active Jobs' },
                { number: '5K+', label: 'Companies' },
                { number: '50K+', label: 'Happy Candidates' },
                { number: '95%', label: 'Success Rate' },
              ].map((stat, index) => (
                <div key={index} className="glass-effect rounded-2xl p-6 transform hover:scale-105 transition-transform duration-200">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Job Openings</h2>
          <p className="text-gray-600">Find the perfect job that matches your skills and interests</p>
        </div>
        
        <FilterPanel />
        <JobList />
      </div>
    </div>
  );
};

export default HomePage;