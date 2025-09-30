import { useJobContext } from '../context/JobContext';

const FilterPanel = () => {
  const { filters, updateFilters, clearFilters, getActiveFilterCount, categories, locations } = useJobContext();

  const experienceLevels = [
    { value: '', label: 'All Levels' },
    { value: 'entry', label: '🌱 Entry Level' },
    { value: 'mid', label: '🚀 Mid Level' },
    { value: 'senior', label: '⭐ Senior Level' },
  ];

  const activeCount = getActiveFilterCount();

  return (
    <div className="glass-effect rounded-2xl p-6 mb-8 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Filter Jobs</h2>
        </div>
        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Clear All ({activeCount})</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
            <span className="text-lg">📂</span>
            <span>Category</span>
          </label>
          <select
            value={filters.category}
            onChange={(e) => updateFilters({ category: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-blue-300"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
            <span className="text-lg">📍</span>
            <span>Location</span>
          </label>
          <select
            value={filters.location}
            onChange={(e) => updateFilters({ location: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-blue-300"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level Filter */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
            <span className="text-lg">💼</span>
            <span>Experience Level</span>
          </label>
          <select
            value={filters.experience_level}
            onChange={(e) => updateFilters({ experience_level: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-blue-300"
          >
            {experienceLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;