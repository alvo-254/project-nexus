import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="group block glass-effect rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
    >
      {/* Company Logo Placeholder */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {job.company?.charAt(0) || 'J'}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {job.title}
            </h3>
            <p className="text-gray-600 font-medium">{job.company}</p>
          </div>
        </div>
        {job.salary && (
          <div className="text-right">
            <div className="text-2xl font-bold gradient-text">
              ${(job.salary / 1000).toFixed(0)}k
            </div>
            <p className="text-xs text-gray-500">per year</p>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.category_name && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
            📂 {job.category_name}
          </span>
        )}
        {job.location_name && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
            📍 {job.location_name}
          </span>
        )}
        {job.experience_level && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
            💼 {job.experience_level.charAt(0).toUpperCase() + job.experience_level.slice(1)}
          </span>
        )}
      </div>

      {/* Description */}
      {job.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          {new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
        <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200">
          View Details
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;