// page.tsx or wherever you're using the map
'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { mockHotels } from '../../utils/mockData'
import HotelCard from '@/app/components/HotelCard'
import HotelSkeleton from '@/app/components/HotelSkeleton'
import CategoryFilterBar from './components/CategoryFilterBar'

// 🔥 Dynamically load the map (client-side only)
const HotelMapOverlay = dynamic(() => import('@/app/components/HotelMapOverlay'), {
  ssr: false,
})

export default function Home() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHotels(mockHotels)
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div>
      <CategoryFilterBar />
      <div className="min-h-screen px-4 md:pt-10 py-5 md:pb-20 flex justify-center relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[1440px]">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <HotelSkeleton key={i} />)
            : hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
        </div>

        <button
          onClick={() => setShowMap(true)}
          className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-5 py-2 rounded-full shadow-md hover:bg-gray-900 transition z-50"
        >
          Show map
        </button>
      </div>

      {showMap && (
        <HotelMapOverlay hotels={hotels} onClose={() => setShowMap(false)} />
      )}
    </div>
  )
}
