import React from "react";

export function FeaturedSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-xl overflow-hidden shadow-sm mb-6 animate-pulse">
      <div className="h-56 md:h-72 bg-gray-200" />
      <div className="p-6 md:p-8 flex flex-col justify-center gap-4">
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="space-y-2">
          <div className="h-7 bg-gray-200 rounded w-full" />
          <div className="h-7 bg-gray-200 rounded w-3/4" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-5/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 w-7 rounded-full bg-gray-200" />
          <div className="h-3 w-32 bg-gray-100 rounded mt-2" />
        </div>
      </div>
    </div>
  );
}

export function SmallSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full mt-3" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
    </div>
  );
}
