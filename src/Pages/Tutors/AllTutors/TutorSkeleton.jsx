const TutorSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      {/* avatar */}
      <div className="w-20 h-20 rounded-full bg-gray-300 mb-4"></div>

      {/* name */}
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-3"></div>

      {/* subject */}
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>

      {/* experience badge */}
      <div className="h-6 bg-gray-200 rounded-full w-32 mb-3"></div>

      {/* qualification */}
      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
};
export default TutorSkeleton;
