'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { motion, AnimatePresence } from 'framer-motion'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Patch Leaflet's default icon URLs
interface PatchedIcon extends L.Icon.Default {
  _getIconUrl?: () => void;
}
delete (L.Icon.Default.prototype as PatchedIcon)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

const overlayVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: '0%', opacity: 1 },
  exit: { y: '100%', opacity: 0 },
}

type Hotel = {
  id: number
  lat: number
  lng: number
  price: number
}

type HotelMapOverlayProps = {
  hotels: Hotel[]
  onClose: () => void
}

export default function HotelMapOverlay({ hotels, onClose }: HotelMapOverlayProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white"
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        variants={overlayVariants}
      >
        <div className="absolute top-5 right-5 z-[1000]">
          <button
            onClick={onClose}
            className="bg-black text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>

        <MapContainer
          center={[31.1048, 77.1734]}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hotels
            .filter((hotel) => hotel.lat && hotel.lng)
            .map((hotel) => (
              <Marker key={hotel.id} position={[hotel.lat, hotel.lng]}>
                <Popup>₹{hotel.price.toLocaleString()}</Popup>
              </Marker>
            ))}
        </MapContainer>
      </motion.div>
    </AnimatePresence>
  )
}
