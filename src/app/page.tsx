'use client';

import { useState, useEffect } from 'react';
import { mockHotels } from '../../utils/mockData';
import HotelCard from '@/app/components/HotelCard';
import HotelSkeleton from '@/app/components/HotelSkeleton';
import CategoryFilterBar from './components/CategoryFilterBar';

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHotels(mockHotels);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
 <CategoryFilterBar />
 <div className="min-h-screen px-4 md:pt-10 py-5 md:pb-10 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[1440px]">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <HotelSkeleton key={i} />)
          : hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
      </div>
    </div>
    </div>
   
   
  );
}
