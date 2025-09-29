import { useJobContext } from '../context/JobContext';

const FilterPanel = () => {
  const { filters, updateFilters, clearFilters, getActiveFilterCount, categories, locations } = useJobContext();

  const experienceLevels = [
    { value: '', label: 'All Levels' },
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
  ];

  const activeCount = getActiveFilterCount();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-blue-700 font-medium transition-colors duration-200"
            aria-label={`Clear all ${activeCount} active filters`}
          >
            Clear All ({activeCount})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) => updateFilters({ category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            id="location-filter"
            value={filters.location}
            onChange={(e) => updateFilters({ location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            aria-label="Filter by location"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="experience-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            id="experience-filter"
            value={filters.experience_level}
            onChange={(e) => updateFilters({ experience_level: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            aria-label="Filter by experience level"
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