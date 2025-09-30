import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJobById } from '../services/api';
import ApplicationForm from '../components/ApplicationForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

// Import default jobs from context for fallback
const DEFAULT_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    description: 'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building responsive web applications using React and modern JavaScript.',
    requirements: '• 5+ years of experience with React\n• Strong TypeScript knowledge\n• Experience with modern CSS frameworks\n• Understanding of web performance optimization\n• Excellent problem-solving skills',
    responsibilities: '• Build and maintain web applications\n• Collaborate with designers and backend developers\n• Write clean, maintainable code\n• Participate in code reviews\n• Mentor junior developers',
    benefits: '• Competitive salary\n• Health insurance\n• 401k matching\n• Flexible work hours\n• Remote work options\n• Professional development budget',
    category_name: 'Technology',
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
    category_name: 'Design',
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
    category_name: 'Technology',
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
    category_name: 'Marketing',
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
    category_name: 'Technology',
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
    category_name: 'Management',
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
    category_name: 'Technology',
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
    category_name: 'Marketing',
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
    category_name: 'Technology',
    location_name: 'New York, NY',
    experience_level: 'senior',
    salary: 125000,
    job_type: 'Full-time',
    created_at: new Date().toISOString(),
  },
];

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchJobById(id);
        setJob(data);
      } catch (error) {
        // Fallback to default jobs
        const defaultJob = DEFAULT_JOBS.find(j => j.id === parseInt(id));
        if (defaultJob) {
          setJob(defaultJob);
        } else {
          setError('Job not found');
        }
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id]);

  const handleApplicationSuccess = () => {
    setShowApplicationForm(false);
    setApplicationSuccess(true);
    setTimeout(() => {
      setApplicationSuccess(false);
    }, 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <ErrorMessage message={error} />
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Job Listings
          </button>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors duration-200 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Jobs</span>
        </button>

        {/* Success Message */}
        {applicationSuccess && (
          <div className="mb-6 glass-effect rounded-2xl p-4 border-2 border-green-200 animate-slide-up">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-green-800 font-bold">Application Submitted!</h3>
                <p className="text-green-700">We'll review your application and get back to you soon. 🎉</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="glass-effect rounded-3xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-3xl font-bold border-2 border-white/30 flex-shrink-0">
                  {job.company?.charAt(0) || 'J'}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{job.title}</h1>
                  <p className="text-xl text-blue-100 font-medium">{job.company}</p>
                </div>
              </div>
              {job.salary && (
                <div className="text-right bg-white/20 backdrop-blur-lg px-6 py-4 rounded-2xl border-2 border-white/30">
                  <div className="text-3xl font-bold">${(job.salary / 1000).toFixed(0)}k</div>
                  <p className="text-sm text-blue-100">per year</p>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-6">
              {job.category_name && (
                <span className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/20 backdrop-blur-lg border-2 border-white/30">
                  📂 {job.category_name}
                </span>
              )}
              {job.location_name && (
                <span className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/20 backdrop-blur-lg border-2 border-white/30">
                  📍 {job.location_name}
                </span>
              )}
              {job.experience_level && (
                <span className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/20 backdrop-blur-lg border-2 border-white/30">
                  💼 {job.experience_level.charAt(0).toUpperCase() + job.experience_level.slice(1)} Level
                </span>
              )}
              {job.job_type && (
                <span className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/20 backdrop-blur-lg border-2 border-white/30">
                  ⏰ {job.job_type}
                </span>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            {/* Description */}
            {job.description && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <span className="text-3xl">📋</span>
                  <span>Job Description</span>
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-100">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
                </div>
              </section>
            )}

            {/* Requirements */}
            {job.requirements && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <span className="text-3xl">✅</span>
                  <span>Requirements</span>
                </h2>
                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-100">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.requirements}</p>
                </div>
              </section>
            )}

            {/* Responsibilities */}
            {job.responsibilities && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <span className="text-3xl">🎯</span>
                  <span>Responsibilities</span>
                </h2>
                <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-100">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
                </div>
              </section>
            )}

            {/* Benefits */}
            {job.benefits && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <span className="text-3xl">🎁</span>
                  <span>Benefits</span>
                  </h2>
                <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-100">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.benefits}</p>
                </div>
              </section>
            )}

            {/* Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2 border-gray-100 gap-4">
              <div className="flex items-center text-gray-500">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Posted on {new Date(job.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <button
                onClick={() => setShowApplicationForm(true)}
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
              >
                <span>Apply for this Position</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <ApplicationForm
          jobId={job.id}
          onClose={() => setShowApplicationForm(false)}
          onSuccess={handleApplicationSuccess}
        />
      )}
    </div>
  );
};

export default JobDetailsPage;