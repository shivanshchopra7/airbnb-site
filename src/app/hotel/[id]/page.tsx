'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Slider from 'react-slick';
import { mockHotels } from '../../../../utils/mockData';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Star, Users, BedDouble, Bath, Ruler } from 'lucide-react'; // or from react-icons if you prefer
import {
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaSnowflake,
  FaUmbrellaBeach,
} from 'react-icons/fa';



export default function HotelDetailsPage() {
  const params = useParams();
  const id = params.id;
  const [hotel, setHotel] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('body');
    }
  }, []);

  useEffect(() => {
    if (id) {
      const hotelId = parseInt(id as string);
      const selectedHotel = mockHotels.find((hotel) => hotel.id === hotelId);
      setHotel(selectedHotel);
    }
  }, [id]);

  if (!hotel) return <div className="text-center mt-10 text-red-500">Hotel not found or loading...</div>;

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedIndex,
    arrows: true,
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12">
      <h1 className="text-4xl font-bold text-black">{hotel.hotel_name}</h1>
      <p className="text-gray-600 text-md mt-1">{hotel.location}</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[400px] rounded-xl overflow-hidden">
        <div className="col-span-2 row-span-2">
          <img
            src={hotel.images[0]}
            alt="Main"
            className="w-full h-full object-cover rounded-l-xl cursor-pointer"
            onClick={() => openModal(0)}
          />
        </div>
        {hotel.images.slice(1, 5).map((img: string, index: number) => {
  const actualIndex = index + 1;
  const isLastVisible = index === 3 && hotel.images.length > 5;

  return (
    <div
      key={index}
      className="relative w-full h-full cursor-pointer"
      onClick={() => openModal(actualIndex)}
    >
      <img
        src={isLastVisible ? '/placeholder.jpg' : img}
        alt={`Image ${actualIndex + 1}`}
        className={`w-full h-full object-cover ${isLastVisible ? 'opacity-60' : ''}`}
      />
      {isLastVisible && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-lg">
          + See more
        </div>
      )}
    </div>
  );
})}

      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="relative w-full max-w-6xl mx-auto p-4 z-50"
        overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <button
          className="absolute top-4 left-0 transform -translate-y-1/2 z-50 text-white bg-black/50 rounded-full px-3 py-1 hover:bg-black"
          onClick={() => setIsModalOpen(false)}
        >
          ✕
        </button>
        <Slider {...sliderSettings}>
          {hotel.images.map((img: string, index: number) => (
            <div key={index}>
              <img
                src={img}
                className="w-full max-h-[80vh] px-8 object-contain rounded-xl"
                alt={`Zoomed Image ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      </Modal>

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
        <div className="flex flex-wrap items-center gap-6 text-gray-700 text-sm mt-4">
  <div className="flex items-center gap-1">
    <Star className="w-4 h-4 text-yellow-500" />
    <span>{hotel.rating}</span>
  </div>
  <div className="flex items-center gap-1">
    <Users className="w-4 h-4" />
    <span>{hotel.guest_count} guests</span>
  </div>
  <div className="flex items-center gap-1">
    <BedDouble className="w-4 h-4" />
    <span>{hotel.room_count} bedrooms</span>
  </div>
  <div className="flex items-center gap-1">
    <Bath className="w-4 h-4" />
    <span>{hotel.bathroom_count} bathrooms</span>
  </div>
  <div className="flex items-center gap-1">
    <Ruler className="w-4 h-4" />
    <span>{hotel.size} sqft</span>
  </div>

</div>

          <p className="text-md mt-4 text-gray-600 font-semibold">{hotel.description}</p>
        
          <div className="mt-4">
  <h3 className="text-lg font-semibold text-black mb-2">Amenities</h3>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700 text-sm">
    {hotel.wifi && (
      <div className="flex items-center gap-2">
        <FaWifi />
        <span>Free Wifi</span>
      </div>
    )}
    {hotel.pool && (
      <div className="flex items-center gap-2">
        <FaSwimmingPool />
        <span>Pool</span>
      </div>
    )}
    {hotel.parking && (
      <div className="flex items-center gap-2">
        <FaParking />
        <span>Free Parking</span>
      </div>
    )}
    {hotel.airConditioning && (
      <div className="flex items-center gap-2">
        <FaSnowflake />
        <span>Air Conditioning</span>
      </div>
    )}
    {hotel.balcony && (
      <div className="flex items-center gap-2">
        <FaUmbrellaBeach />
        <span>Balcony</span>
      </div>
    )}
  </div>
</div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-black">Reviews ({hotel.reviews})</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold text-black">John Doe</p>
              <p className="text-sm text-gray-600">Stayed in January 2025</p>
              <p className="mt-1 text-sm text-gray-500">"Amazing stay, cozy atmosphere, beautiful views!"</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/3 border border-gray-300 rounded-lg p-4 shadow-md">
          <div className="text-xl font-semibold text-gray-900">
            ₹{hotel.price.toLocaleString()}{' '}
            <span className="text-sm font-normal text-gray-500">per night</span>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-black">Check-in</label>
            <input type="date" className="w-full mt-1 p-2 text-gray-900 border rounded-lg" />
          </div>
          <div className="mt-4">
            <label className="block text-sm text-black">Check-out</label>
            <input type="date" className="w-full mt-1 p-2 border rounded-lg text-gray-900" />
          </div>

          <button className="w-full mt-6 bg-[#FF385C] text-white p-3 rounded-lg font-semibold hover:bg-[#e0354f]">
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
}
