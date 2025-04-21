'use client';

import { useState, useRef, useEffect } from 'react';
import { FaGlobe, FaUserCircle, FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import LoginModal from './LoginModal';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Range } from 'react-date-range';

// Extend the type to allow undefined
type CustomRange = Range;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'Homes' | 'Experiences'>('Homes');
  const [isScrolled, setIsScrolled] = useState(false);

  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const [dateRange, setDateRange] = useState<CustomRange[]>([
    {
      startDate: undefined,
      endDate: undefined,
      key: 'selection',
    },
  ]);

  const locationRef = useRef<HTMLDivElement | null>(null);
  const dateRef = useRef<HTMLDivElement | null>(null);
  const guestRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node) &&
        dateRef.current &&
        !dateRef.current.contains(event.target as Node) &&
        guestRef.current &&
        !guestRef.current.contains(event.target as Node)
      ) {
        setLocationOpen(false);
        setDateOpen(false);
        setGuestOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          height: isScrolled ? 80 : 120,
          paddingTop: isScrolled ? 10 : 16,
          paddingBottom: isScrolled ? 10 : 16,
          boxShadow: isScrolled ? '0 2px 6px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 w-full bg-white z-50 px-6 flex justify-between items-center border-b`}
      >
        {/* Left: Logo */}
        <div className="flex mx-10 items-center">
          <Image src="/airbnblogo.png" alt="Airbnb Logo" width={105} height={40} priority className="object-contain" />
        </div>

        {/* Center: Tabs and Search */}
        <div className="hidden md:flex flex-col items-center justify-center space-y-2 relative w-full max-w-[850px]">
          {!isScrolled && (
            <div className="flex space-x-4 pt-2 text-md font-medium text-gray-600">
              <span
                onClick={() => setActiveTab('Homes')}
                className={`hover:text-black cursor-pointer border-b-[2px] ${
                  activeTab === 'Homes' ? 'border-black text-black' : 'border-transparent'
                }`}
              >
                Homes
              </span>
              <span
                onClick={() => setActiveTab('Experiences')}
                className={`hover:text-black cursor-pointer border-b-[2px] ${
                  activeTab === 'Experiences' ? 'border-black text-black' : 'border-transparent'
                }`}
              >
                Experiences
              </span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isScrolled ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center rounded-full border border-gray-300 shadow-sm bg-white w-full h-[60px] relative overflow-hidden"
              >
                <div className="grid grid-cols-4 divide-x divide-gray-300 flex-grow h-full">
                  {/* Where */}
                  <div
                    onClick={() => {
                      setLocationOpen(!locationOpen);
                      setDateOpen(false);
                      setGuestOpen(false);
                    }}
                    className="px-6 py-2 flex flex-col justify-center cursor-pointer hover:bg-gray-100"
                  >
                    <span className="text-[12px] font-semibold text-gray-800">Where</span>
                    {location ? (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm text-black font-medium truncate">{location}</span>
                        <FaTimes
                          size={12}
                          className="ml-2 text-gray-500 hover:text-black cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation('');
                          }}
                        />
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 mt-1">Search destinations</span>
                    )}
                  </div>

                  {/* Dates */}
                  {activeTab === 'Homes' ? (
                    <>
                      <div
                        onClick={() => {
                          setDateOpen(!dateOpen);
                          setLocationOpen(false);
                          setGuestOpen(false);
                        }}
                        className="px-6 py-2 flex flex-col justify-center cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-[12px] font-semibold text-gray-800">Check in</span>
                        {dateRange[0].startDate ? (
                          <div className="flex items-center">
                            <span className="text-sm text-black font-medium">
                              {format(dateRange[0].startDate, 'dd MMM')}
                            </span>
                            <FaTimes
                              size={12}
                              className="ml-2 text-gray-500 hover:text-black cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDateRange([{ ...dateRange[0], startDate: undefined }]);
                              }}
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500 mt-1">Add dates</span>
                        )}
                      </div>

                      <div
                        onClick={() => {
                          setDateOpen(!dateOpen);
                          setLocationOpen(false);
                          setGuestOpen(false);
                        }}
                        className="px-6 py-2 flex flex-col justify-center cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-[12px] font-semibold text-gray-800">Check out</span>
                        {dateRange[0].endDate ? (
                          <div className="flex items-center">
                            <span className="text-sm text-black font-medium">
                              {format(dateRange[0].endDate, 'dd MMM')}
                            </span>
                            <FaTimes
                              size={12}
                              className="ml-2 text-gray-500 hover:text-black cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDateRange([{ ...dateRange[0], endDate: undefined }]);
                              }}
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500 mt-1">Add dates</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="col-span-2 px-6 flex flex-col justify-center cursor-pointer">
                      <span className="text-[12px] font-semibold text-gray-800">Date</span>
                      <span className="text-sm text-gray-500 mt-1">Add dates</span>
                    </div>
                  )}

                  {/* Who */}
                  <div
                    onClick={() => {
                      setGuestOpen(!guestOpen);
                      setLocationOpen(false);
                      setDateOpen(false);
                    }}
                    className="px-6 py-2 flex flex-col justify-center cursor-pointer hover:bg-gray-100"
                  >
                    <span className="text-[12px] font-semibold text-gray-800">Who</span>
                    {guests ? (
                      <div className="flex items-center">
                        <span className="text-sm text-black font-medium">{guests} guest(s)</span>
                        <FaTimes
                          size={12}
                          className="ml-2 text-gray-500 hover:text-black cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setGuests(null);
                          }}
                        />
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 mt-1">Add guests</span>
                    )}
                  </div>
                </div>
                <button className="bg-[#FF385C] text-white w-10 h-10 flex items-center justify-center rounded-full mr-4 hover:bg-[#e03b56] transition">
                  <FaSearch size={14} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="compact"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="rounded-full border border-gray-300 shadow-sm bg-white px-4 py-2 flex items-center space-x-3 cursor-pointer hover:shadow-md"
              >
                <span className="text-sm text-gray-600">Where to?</span>
                <button className="bg-[#FF385C] text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e03b56] transition">
                  <FaSearch size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Location Modal */}
          {locationOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              ref={locationRef}
              className="absolute top-[110%] left-0 bg-white border rounded-xl shadow-md w-[300px] p-4 z-30"
            >
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search destinations..."
                className="w-full px-3 py-2 mb-3 text-black text-sm border rounded"
              />
              <p className="text-sm font-semibold text-gray-700 mb-2">Suggested destinations</p>
              {['New Delhi', 'Goa', 'Bangalore', 'Mumbai'].map((loc) =>
                loc.toLowerCase().includes(searchValue.toLowerCase()) ? (
                  <div
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setLocationOpen(false);
                      setSearchValue('');
                    }}
                    className="cursor-pointer px-2 py-1 hover:bg-gray-100 text-gray-500 rounded"
                  >
                    {loc}
                  </div>
                ) : null
              )}
            </motion.div>
          )}

          {/* Date Modal */}
          {dateOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              ref={dateRef}
              className={`absolute top-[110%] ${
                activeTab === 'Homes' ? 'left-[25%]' : 'left-[50%] -translate-x-1/2'
              } bg-white z-30 rounded-xl shadow-md p-2`}
            >
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={[
                  {
                    ...dateRange[0],
                    startDate: dateRange[0].startDate || new Date(),
                    endDate: dateRange[0].endDate || new Date(),
                  },
                ]}
                minDate={new Date()}
              />
            </motion.div>
          )}

          {/* Guest Modal */}
          {guestOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              ref={guestRef}
              className="absolute top-[110%] right-0 bg-white border text-gray-500 rounded-xl shadow-md w-[200px] p-4 z-30"
            >
              <p className="text-sm font-semibold text-gray-700 mb-2">Guests</p>
              <div className="flex items-center justify-between">
                <button
                  className="px-2 py-1 border rounded text-gray-600"
                  onClick={() => setGuests((prev) => (prev && prev > 1 ? prev - 1 : null))}
                >
                  -
                </button>
                <span>{guests || 0}</span>
                <button
                  className="px-2 py-1 border rounded text-gray-600"
                  onClick={() => setGuests((prev) => (prev ? prev + 1 : 1))}
                >
                  +
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Profile */}
        <div className="flex items-center space-x-4">
          <p className="text-sm font-medium hidden md:block text-gray-600">Airbnb your home</p>
          <FaGlobe className="text-md text-gray-600" />
          <div
            onClick={() => setIsOpen(true)}
            className="flex items-center border border-gray-300 rounded-full px-3 py-[6px] space-x-2 hover:shadow-md cursor-pointer"
          >
            <FaBars className="text-gray-600" />
            <FaUserCircle className="text-2xl text-gray-600" />
          </div>
        </div>
      </motion.nav>

      {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
