const TuitionSkeleton = () => {
  return (
    <div className="animate-pulse bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between">
      <div>
        <div className="h-5 bg-gray-300 rounded w-1/2 mb-4"></div>

        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>

        <div className="h-6 bg-gray-200 rounded-full w-32 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-24"></div>
      </div>

      <div className="h-10 bg-gray-300 rounded-xl mt-6"></div>
    </div>
  );
};

export default TuitionSkeleton;
