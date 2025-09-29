import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchJobs, fetchCategories, fetchLocations } from '../services/api';

const JobContext = createContext();

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    experience_level: '',
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [categoriesData, locationsData] = await Promise.all([
          fetchCategories(),
          fetchLocations(),
        ]);
        setCategories(categoriesData);
        setLocations(locationsData);
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };
    fetchFilterOptions();
  }, []);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJobs(filters);
      setJobs(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      experience_level: '',
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter((value) => value !== '').length;
  };

  const value = {
    jobs,
    categories,
    locations,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    getActiveFilterCount,
    refreshJobs: loadJobs,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};