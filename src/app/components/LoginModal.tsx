import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white rounded-2xl w-full max-w-md p-5 sm:p-6 md:p-8"
        >
          {/* Header */}
        {/* Header */}
{/* Header */}
<div className="relative mb-6 border-b pb-4 h-6 sm:h-8 flex items-center justify-center">
  <h2 className="text-base sm:text-lg font-semibold text-black text-center">
    Log in or sign up
  </h2>
  <button
    onClick={onClose}
    className="absolute right-0 text-gray-500 hover:text-black text-xl"
  >
    &times;
  </button>
</div>



          {/* Welcome title */}
          <h3 className="text-xl sm:text-2xl mb-4 text-black">Welcome to Airbnb</h3>

          {/* Phone input section */}
          <div className="mb-4">
  <div className="w-full border rounded-xl overflow-hidden">
    {/* Country/Region */}
    <div className="relative border-b px-4 pt-3 pb-1">
      <label className="text-xs text-gray-500 absolute top-1 left-4">Country/Region</label>
      <select
        className="appearance-none bg-transparent w-full pt-4 pb-1 pl-1 pr-6 text-sm text-black focus:outline-none"
        style={{ paddingLeft: '0.25rem' }} // additional control over padding if needed
      >
        <option className="pl-3">India (+91)</option>
        <option className="pl-3">United States (+1)</option>
        <option className="pl-3">UK (+44)</option>
      </select>
      <IoChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />

    </div>

    {/* Phone number */}
    <div className="px-4 py-3">
      <input
        type="tel"
        placeholder="Phone number"
        className="w-full text-sm pl-1 text-black placeholder-gray-500 focus:outline-none"
      />
    </div>
  </div>
</div>


          <p className="text-xs text-gray-500 mb-4 leading-snug">
            We’ll call or text you to confirm your number. Standard message and data rates apply.{" "}
            <a href="#" className="underline">Privacy Policy</a>
          </p>

          {/* Continue button */}
          <button className="w-full bg-[#FF385C] text-white font-semibold py-2 rounded-lg mb-4 text-sm sm:text-base">
            Continue
          </button>

          {/* Divider */}
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-2 text-sm text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social login buttons */}
          <div className="space-y-3 w-full">
            <button className="w-full border border-black py-2 px-4 rounded-lg relative flex justify-center items-center hover:bg-gray-100 text-sm sm:text-base">
              <FaGoogle className="absolute left-4 text-blue-500 text-lg" />
              <span className="text-gray-600 font-semibold">Continue with Google</span>
            </button>

            <button className="w-full border border-black py-2 px-4 rounded-lg relative flex justify-center items-center hover:bg-gray-100 text-sm sm:text-base">
              <FaApple className="absolute left-4 text-black text-lg" />
              <span className="text-gray-600 font-semibold">Continue with Apple</span>
            </button>

            <button className="w-full border border-black py-2 px-4 rounded-lg relative flex justify-center items-center hover:bg-gray-100 text-sm sm:text-base">
              <MdEmail className="absolute left-4 text-gray-700 text-lg" />
              <span className="text-gray-600 font-semibold">Continue with email</span>
            </button>

            <button className="w-full border border-black py-2 px-4 rounded-lg relative flex justify-center items-center hover:bg-gray-100 text-sm sm:text-base">
              <FaFacebookF className="absolute left-4 text-[#1877F2] text-lg" />
              <span className="text-gray-600 font-semibold">Continue with Facebook</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
