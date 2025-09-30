const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12" role="status">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium animate-pulse">Loading amazing jobs...</p>
    </div>
  );
};

export default LoadingSpinner;