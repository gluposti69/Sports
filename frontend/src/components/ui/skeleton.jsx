import React from 'react';

const LoadingSkeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
};

const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <LoadingSkeleton className="h-6 w-3/4" />
      <LoadingSkeleton className="h-4 w-full" />
      <LoadingSkeleton className="h-4 w-2/3" />
      <div className="space-y-2">
        <LoadingSkeleton className="h-3 w-full" />
        <LoadingSkeleton className="h-3 w-5/6" />
        <LoadingSkeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
};

const ButtonSkeleton = ({ className = '' }) => {
  return (
    <LoadingSkeleton className={`h-12 w-full ${className}`} />
  );
};

export { LoadingSkeleton, CardSkeleton, ButtonSkeleton };