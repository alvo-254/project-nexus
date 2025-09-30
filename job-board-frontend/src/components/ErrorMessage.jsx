const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="glass-effect rounded-2xl p-6 border-2 border-red-200 animate-slide-up">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <svg className="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-red-800 mb-1">Oops! Something went wrong</h3>
          <p className="text-red-700 mb-3">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="btn-secondary text-sm"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;