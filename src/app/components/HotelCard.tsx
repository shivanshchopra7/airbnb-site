'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider, { CustomArrowProps } from 'react-slick';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

type HotelCardProps = {
  hotel: {
    id: number;
    hotel_name: string;
    description: string;
    location: string;
    price: number;
    images: string[];
    rating: number;
    reviews: number;
    guest_count: number;
    room_count: number;
    bathroom_count: number;
    balcony: boolean;
    size: number;
    wifi: boolean;
    pool: boolean;
    parking: boolean;
    airConditioning: boolean;
  };
};

const ArrowLeft = ({ onClick }: CustomArrowProps) => (
  <button
    onClick={onClick}
    aria-label="Previous image"
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 p-1 rounded-full shadow hover:bg-white"
  >
    <ChevronLeft className="w-5 h-5 text-black" />
  </button>
);

const ArrowRight = ({ onClick }: CustomArrowProps) => (
  <button
    onClick={onClick}
    aria-label="Next image"
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 p-1 rounded-full shadow hover:bg-white"
  >
    <ChevronRight className="w-5 h-5 text-black" />
  </button>
);

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const [liked, setLiked] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
  };

  return (
    <div className="md:w-[340px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="cursor-pointer">
        <div className="relative h-64">
          {/* Heart Button */}
          <div className="absolute top-3 right-3 z-20">
            <button
              aria-label="Like this hotel"
              className="backdrop-blur-sm rounded-full p-2 transition shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
            >
              <motion.div
                key={liked.toString()}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <Heart
                  className={`w-5 h-5 transition-transform duration-200 hover:scale-125 ${
                    liked
                      ? 'fill-red-500 stroke-red-500'
                      : 'fill-transparent stroke-white'
                  }`}
                />
              </motion.div>
            </button>
          </div>

          <Slider {...settings}>
            {hotel.images.map((img, index) => (
              <div key={img || index}>
               <Image
  src={img}
  alt={`${hotel.hotel_name || 'Hotel'} - image ${index + 1}`}
  width={500}
  height={256}
  className="w-full h-64 object-cover"
/>
              </div>
            ))}
          </Slider>
        </div>

        {/* Info Block */}
        <Link href={`/hotel/${hotel.id}?id=${hotel.id}`}>
          <div>
            <div className="p-3 mt-1">
              <h2 className="text-base text-black font-medium mt-1 truncate">
                {hotel.hotel_name}
              </h2>
              <p className="text-sm text-neutral-500 mt-1">{hotel.location}</p>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {hotel.description}
              </p>
              <div className="flex justify-between items-center mt-3 text-sm">
                <div className="text-black font-medium">
                  ₹{hotel.price.toLocaleString()}{' '}
                  <span className="font-normal text-neutral-500">per night</span>
                </div>
                <div className="flex items-center">
                  <span className="text-black">★ {hotel.rating}</span>
                  <span className="ml-1 text-neutral-500">({hotel.reviews})</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
