import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {job.title}
      </h3>
      <p className="text-gray-600 mb-4">{job.company}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {job.category_name && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {job.category_name}
          </span>
        )}
        {job.location_name && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {job.location_name}
          </span>
        )}
      </div>
      {job.description && (
        <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
      )}
    </Link>
  );
};

export default JobCard;