'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import {
  GiMountainCave, GiIsland, GiTreehouse, GiSnowflake1,
} from 'react-icons/gi';
import {
  MdOutlineVilla, MdBeachAccess, MdOutlinePool,
} from 'react-icons/md';
import { TbBuildingCottage } from 'react-icons/tb';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const categories = [
  { label: 'Amazing views', icon: <GiMountainCave size={20} /> },
  { label: 'Icons', icon: <MdOutlineVilla size={20} /> },
  { label: 'Rooms', icon: <TbBuildingCottage size={20} /> },
  { label: 'Cabins', icon: <GiTreehouse size={20} /> },
  { label: 'Arctic', icon: <GiSnowflake1 size={20} /> },
  { label: 'Farms', icon: <GiIsland size={20} /> },
  { label: 'Amazing pools', icon: <MdOutlinePool size={20} /> },
  { label: 'Countryside', icon: <MdOutlineVilla size={20} /> },
  { label: 'Treehouses', icon: <GiTreehouse size={20} /> },
  { label: 'OMG!', icon: <MdOutlineVilla size={20} /> },
  { label: 'Luxe', icon: <MdOutlineVilla size={20} /> },
  { label: 'Beach', icon: <MdBeachAccess size={20} /> },
  { label: 'Historical homes', icon: <MdOutlineVilla size={20} /> },
  { label: 'Mansions', icon: <MdOutlineVilla size={20} /> },
  { label: 'Domes', icon: <MdOutlineVilla size={20} /> },
];

const mockHistogram = [
  5, 10, 15, 20, 28, 40, 45, 30, 25, 20, 18, 15, 10, 7, 5, 3, 2, 1,
];

export default function CategoryFilterBar() {
  const [active, setActive] = useState('Amazing views');
  const [showModal, setShowModal] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [priceRange, setPriceRange] = useState([4300, 140000]);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => el.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const handleIncrement = (setter: any, value: number) => () => setter(value + 1);
  const handleDecrement = (setter: any, value: number) => () => {
    if (value > 0) setter(value - 1);
  };

  return (
    <>
      <div className="w-full border-b bg-white px-4 sm:px-6 md:mt-12 mt-4 py-3 z-40">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto relative">
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-1 sm:left-0 z-10 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 hidden sm:flex"
            >
              <FaChevronLeft size={12} />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-none scrollbar-hide space-x-4 sm:space-x-6 flex-grow px-6 sm:px-10 scroll-smooth"
          >
            {categories.map((category) => (
              <div
                key={category.label}
                onClick={() => setActive(category.label)}
                className="flex flex-col items-center text-gray-500 hover:text-black cursor-pointer min-w-[60px] flex-shrink-0"
              >
                <div className="mb-1">{category.icon}</div>
                <span className="text-[10px] sm:text-[11px] text-center">{category.label}</span>
                {active === category.label && (
                  <div className="mt-1 h-[2px] w-5 rounded-full bg-black" />
                )}
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-[90px] sm:right-28 z-10 bg-white border border-gray-300 rounded-full w-8 h-8 items-center justify-center text-gray-500 hover:bg-gray-100 hidden sm:flex"
            >
              <FaChevronRight size={12} />
            </button>
          )}

          <button
            onClick={() => setShowModal(true)}
            className="ml-2 sm:ml-3 flex items-center space-x-1 sm:space-x-2 border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:shadow-sm"
          >
            <FaFilter />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold text-black text-center mb-4 border-b pb-2">Filters</h2>

              <div className="space-y-6">
                {/* Type of Place */}
                <div>
                  <div className="text-md font-medium mb-2 text-black ">Type of place</div>
                  <div className="flex gap-3 text-black">
                    <button className="px-4 py-2 rounded-full border border-gray-400 text-sm">Any type</button>
                    <button className="px-4 py-2 rounded-full border border-gray-400 text-sm">Room</button>
                    <button className="px-4 py-2 rounded-full border border-gray-400 text-sm">Entire home</button>
                  </div>
                </div>

                {/* Price Histogram */}
                <div>
                  <div className="text-md font-medium mb-2 text-black">Price range</div>
                  <div className="w-full h-20 flex items-end gap-[1px] mb-4">
                    {mockHistogram.map((h, idx) => (
                      <div
                        key={idx}
                        style={{ height: `${h}px` }}
                        className="flex-1 bg-[#FF385C] rounded-t-sm"
                      />
                    ))}
                  </div>
                  <div className="px-1">
                  <Slider
  min={0}
  max={140000}
  value={priceRange}
  onChange={(value) => {
    if (Array.isArray(value)) {
      setPriceRange(value)
    }
  }}
  trackStyle={[{ backgroundColor: '#FF385C' }]}
  handleStyle={[
    { borderColor: '#FF385C', backgroundColor: '#fff' },
    { borderColor: '#FF385C', backgroundColor: '#fff' }
  ]}
/>

                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}+</span>
                  </div>
                </div>

                {/* Rooms & Beds */}
                <div className='text-black'>
                  <div className="text-sm font-medium mb-2">Rooms and beds</div>
                  {[
                    { label: 'Bedrooms', count: bedrooms, setter: setBedrooms },
                    { label: 'Beds', count: beds, setter: setBeds },
                    { label: 'Bathrooms', count: bathrooms, setter: setBathrooms },
                  ].map(({ label, count, setter }) => (
                    <div key={label} className="flex justify-between items-center py-2 border-t">
                      <span className="text-sm">{label}</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleDecrement(setter, count)}
                          className="w-7 h-7 rounded-full border text-xl text-gray-500"
                        >
                          –
                        </button>
                        <span className="min-w-[24px] text-center">{count === 0 ? 'Any' : count}</span>
                        <button
                          onClick={handleIncrement(setter, count)}
                          className="w-7 h-7 rounded-full border text-xl text-gray-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <button className="text-sm underline text-black" onClick={() => setShowModal(false)}>Clear all</button>
                <button className="bg-black text-white px-4 py-2 rounded-xl text-sm">Show 1,000+ places</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
