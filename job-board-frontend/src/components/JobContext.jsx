import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchJobs, fetchCategories, fetchLocations } from '../services/api';

const JobContext = createContext();

// Default sample jobs
const DEFAULT_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    description: 'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building responsive web applications using React and modern JavaScript.',
    requirements: '• 5+ years of experience with React\n• Strong TypeScript knowledge\n• Experience with modern CSS frameworks\n• Understanding of web performance optimization\n• Excellent problem-solving skills',
    responsibilities: '• Build and maintain web applications\n• Collaborate with designers and backend developers\n• Write clean, maintainable code\n• Participate in code reviews\n• Mentor junior developers',
    benefits: '• Competitive salary\n• Health insurance\n• 401k matching\n• Flexible work hours\n• Remote work options\n• Professional development budget',
    category: 1,
    category_name: 'Technology',
    location: 1,
    location_name: 'San Francisco, CA',
    experience_level: 'senior',
    salary: 120000,
    job_type: 'Full-time',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'Design Studio',
    description: 'Join our creative team as a UX/UI Designer. Create beautiful and intuitive user experiences for web and mobile applications.',
    requirements: '• 3+ years of design experience\n• Proficiency in Figma and Adobe Creative Suite\n• Strong portfolio demonstrating UX/UI work\n• Understanding of design systems\n• Excellent communication skills',
    responsibilities: '• Design user interfaces for web and mobile\n• Create wireframes and prototypes\n• Conduct user research\n• Collaborate with developers\n• Maintain design systems',
    benefits: '• Creative work environment\n• Latest design tools\n• Flexible schedule\n• Health benefits\n• Stock options',
    category: 2,
    category_name: 'Design',
    location: 2,
    location_name: 'New York, NY',
    experience_level: 'mid',
    salary: 85000,
    job_type: 'Full-time',
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    description: 'Looking for a versatile Full Stack Developer who can work on both frontend and backend. Experience with Node.js, React, and databases required.',
    requirements: '• 3+ years full stack development\n• React and Node.js expertise\n• Database design experience\n• API development skills\n• Agile methodology experience',
    responsibilities: '• Develop full stack features\n• Design and implement APIs\n• Database optimization\n• Code reviews and testing\n• Sprint planning participation',
    benefits: '• Startup equity\n• Remote work\n• Learning budget\n• Health insurance\n• Unlimited PTO',
    category: 1,
    category_name: 'Technology',
    location: 3,
    location_name: 'Remote',
    experience_level: 'mid',
    salary: 95000,
    job_type: 'Full-time',
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Marketing Manager',
    company: 'Brand Solutions',
    description: 'Lead our marketing team and develop strategies to increase brand awareness. Experience in digital marketing and social media required.',
    requirements: '• 5+ years marketing experience\n• Digital marketing expertise\n• Team leadership skills\n• Analytics and data-driven\n• Budget management',
    responsibilities: '• Develop marketing strategies\n• Manage marketing team\n• Campaign planning and execution\n• ROI analysis\n• Stakeholder communication',
    benefits: '• Competitive compensation\n• Performance bonuses\n• Health and dental\n• Professional development\n• Work-life balance',
    category: 3,
    category_name: 'Marketing',
    location: 4,
    location_name: 'Los Angeles, CA',
    experience_level: 'senior',
    salary: 90000,
    job_type: 'Full-time',
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    title: 'Junior Software Engineer',
    company: 'CodeWorks',
    description: 'Great opportunity for entry-level developers to grow their skills. Work with experienced mentors on exciting projects.',
    requirements: '• Bachelor\'s degree in CS or related field\n• Basic programming knowledge\n• Eagerness to learn\n• Problem-solving skills\n• Team player',
    responsibilities: '• Write and test code\n• Learn from senior developers\n• Participate in code reviews\n• Debug applications\n• Contribute to team projects',
    benefits: '• Mentorship program\n• Learning resources\n• Health insurance\n• Casual environment\n• Growth opportunities',
    category: 1,
    category_name: 'Technology',
    location: 5,
    location_name: 'Austin, TX',
    experience_level: 'entry',
    salary: 65000,
    job_type: 'Full-time',
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    title: 'Product Manager',
    company: 'InnovateTech',
    description: 'Drive product strategy and roadmap for our flagship products. Work closely with engineering and design teams.',
    requirements: '• 5+ years product management\n• Technical background preferred\n• Strategic thinking\n• Data analysis skills\n• Excellent communication',
    responsibilities: '• Define product vision\n• Manage product roadmap\n• Prioritize features\n• Work with cross-functional teams\n• Analyze product metrics',
    benefits: '• Executive compensation\n• Stock options\n• Flexible hours\n• Premium health coverage\n• Professional development',
    category: 4,
    category_name: 'Management',
    location: 6,
    location_name: 'Seattle, WA',
    experience_level: 'senior',
    salary: 130000,
    job_type: 'Full-time',
    created_at: new Date().toISOString(),
  },
  {
    id: 7,
    title: 'Data Scientist',
    company: 'Analytics Pro',
    description: 'Analyze large datasets and build machine learning models. Strong Python and statistics background required.',
    requirements: '• Master\'s degree in related field\n• Python and R proficiency\n• Machine learning expertise\n• Statistical analysis skills\n• SQL knowledge',
    responsibilities: '• Build ML models\n• Analyze complex datasets\n• Create data visualizations\n• Present findings to stakeholders\n• Collaborate with engineers',
    benefits: '• Competitive salary\n• Research budget\n• Conference attendance\n• Flexible remote work\n• Health benefits',
    category: 1,
    category_name: 'Technology',
    location: 7,
    location_name: 'Boston, MA',
    experience_level: 'mid',
    salary: 110000,
    job_type: 'Full-time',
    created_at: new Date().toISOString(),
  },
  {
    id: 8,
    title: 'Content Writer',
    company: 'Media Hub',
    description: 'Create engaging content for our blog, social media, and marketing materials. SEO knowledge is a plus.',
    requirements: '• 2+ years writing experience\n• SEO knowledge\n• Creative mindset\n• Research skills\n• Attention to detail',
    responsibilities: '• Write blog posts and articles\n• Create social media content\n• Optimize content for SEO\n• Collaborate with marketing team\n• Edit and proofread',
    benefits: '• Creative freedom\n• Flexible schedule\n• Remote work options\n• Health insurance\n• Writing tools provided',
    category: 3,
    category_name: 'Marketing',
    location: 3,
    location_name: 'Remote',
    experience_level: 'entry',
    salary: 55000,
    job_type: 'Full-time',
    created_at: new Date().toISOString(),
  },
  {
    id: 9,
    title: 'DevOps Engineer',
    company: 'CloudSystems',
    description: 'Manage and optimize our cloud infrastructure. Experience with AWS, Docker, and Kubernetes required.',
    requirements: '• 4+ years DevOps experience\n• AWS certification preferred\n• Docker and Kubernetes expertise\n• CI/CD pipeline knowledge\n• Scripting skills',
    responsibilities: '• Manage cloud infrastructure\n• Implement CI/CD pipelines\n• Monitor system performance\n• Automate deployment processes\n• Ensure system security',
    benefits: '• Top-tier compensation\n• Latest technology stack\n• Certification sponsorship\n• Health and wellness\n• Remote-first culture',
    category: 1,
    category_name: 'Technology',
    location: 2,
    location_name: 'New York, NY',
    experience_level: 'senior',
    salary: 125000,
    job_type: 'Full-time',
    created_at: new Date().toISOString(),
  },
];

const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Technology' },
  { id: 2, name: 'Design' },
  { id: 3, name: 'Marketing' },
  { id: 4, name: 'Management' },
  { id: 5, name: 'Sales' },
];

const DEFAULT_LOCATIONS = [
  { id: 1, name: 'San Francisco, CA' },
  { id: 2, name: 'New York, NY' },
  { id: 3, name: 'Remote' },
  { id: 4, name: 'Los Angeles, CA' },
  { id: 5, name: 'Austin, TX' },
  { id: 6, name: 'Seattle, WA' },
  { id: 7, name: 'Boston, MA' },
];

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(DEFAULT_JOBS);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [locations, setLocations] = useState(DEFAULT_LOCATIONS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    experience_level: '',
  });

  // Try to fetch from API, fallback to defaults
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [categoriesData, locationsData] = await Promise.all([
          fetchCategories(),
          fetchLocations(),
        ]);
        setCategories(categoriesData);
        setLocations(locationsData);
      } catch (error) {
        console.log('Using default categories and locations');
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
    } catch (error) {
      console.log('API unavailable, using default jobs');
      // Filter default jobs based on filters
      let filteredJobs = [...DEFAULT_JOBS];
      
      if (filters.category) {
        filteredJobs = filteredJobs.filter(job => job.category === parseInt(filters.category));
      }
      if (filters.location) {
        filteredJobs = filteredJobs.filter(job => job.location === parseInt(filters.location));
      }
      if (filters.experience_level) {
        filteredJobs = filteredJobs.filter(job => job.experience_level === filters.experience_level);
      }
      
      setJobs(filteredJobs);
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