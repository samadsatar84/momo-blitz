// pages/Home.jsx
/* eslint-disable react/jsx-pascal-case */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-red-900 to-gray-900 min-h-screen">
      {/* Main Hero Section */}
      <div className="min-h-screen flex flex-col justify-center items-center text-white px-4 sm:px-6 relative overflow-hidden py-12 sm:py-0">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        {/* Content */}
        <div className="relative z-10 text-center w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-4 sm:mb-6"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-2 sm:mb-3 break-words">
              🔥 MOMO BLITZ 🔥
            </h1>
            <div className="text-lg sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-3 sm:mb-4">
              Hot & Fresh Daily
            </div>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-2xl text-gray-200 mb-5 sm:mb-8 font-semibold"
          >
            Delicious Momos • Authentic Biryani • Fast Food
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-2 sm:gap-4 flex-col sm:flex-row justify-center items-center mb-5 sm:mb-8 w-full"
          >
            <Link 
              to="/menu" 
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-lg transition transform hover:scale-105 shadow-lg min-h-[44px] flex items-center justify-center"
            >
              🛒 Order Now
            </Link>
            <Link 
              to="/deals" 
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-lg transition transform hover:scale-105 shadow-lg text-gray-900 min-h-[44px] flex items-center justify-center"
            >
              💰 View Deals
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xs sm:text-base md:text-xl text-red-200 font-semibold"
          >
            📱 Call: 0306 7730467 | 🏪 Bahawalpur Only
          </motion.p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: "⚡", title: "Fast Delivery", desc: "Hot food delivered in 30 mins" },
              { icon: "✨", title: "Fresh & Quality", desc: "Made fresh for every order" },
              { icon: "🎁", title: "Great Deals", desc: "Amazing combo offers daily" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-red-600 to-orange-600 p-6 sm:p-8 rounded-lg text-white text-center shadow-lg"
              >
                <div className="text-4xl sm:text-5xl mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-red-100">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 py-8 sm:py-12 text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Order?</h2>
        <p className="text-sm sm:text-lg mb-4 sm:mb-6 text-red-100">Fresh food prepared for every order • Only in Bahawalpur</p>
        <Link 
          to="/menu" 
          className="inline-block bg-white text-red-600 font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
        >
          Start Ordering Now →
        </Link>
      </div>
    </div>
  );
}