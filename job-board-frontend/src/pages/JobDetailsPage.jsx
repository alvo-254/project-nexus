import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJobById } from '../services/api';
import ApplicationForm from '../components/ApplicationForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

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
      try {
        const data = await fetchJobById(id);
        setJob(data);
      } catch (error) {
        setError('Failed to load job details');
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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!job) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 mb-4 hover:text-blue-700"
        >
          ← Back to Jobs
        </button>

        {applicationSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              Application submitted successfully! We'll get back to you soon.
            </p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <p className="text-xl text-gray-700 mb-4">{job.company}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {job.category_name && (
              <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                {job.category_name}
              </span>
            )}
            {job.location_name && (
              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                {job.location_name}
              </span>
            )}
          </div>

          {job.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Job Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>
          )}

          <button
            onClick={() => setShowApplicationForm(true)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Apply Now
          </button>
        </div>
      </div>

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