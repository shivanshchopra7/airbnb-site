// src/app/components/HotelSkeleton.tsx
const HotelSkeleton = () => {
    return (
      <div className="border rounded-lg p-4 shadow-md animate-pulse">
        <div className="bg-gray-300 w-full h-48 rounded-lg"></div>
        <div className="mt-4">
          <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
          <div className="bg-gray-300 h-4 w-1/2"></div>
          <div className="mt-4 flex justify-between">
            <div className="bg-gray-300 h-4 w-1/4"></div>
            <div className="bg-gray-300 h-4 w-16"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HotelSkeleton;
  