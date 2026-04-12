import DealCard from "../components/DealCard";
import { motion } from "framer-motion";

const deals = [
  { 
    name: "THE PARTY PACK", 
    description: "12 Pcs Chicken Steam Momos + 2 Brownies + 1 Litre Drink",
    price: 1100,
    icon: "🎉",
    image: "fest1.png"
  },
  { 
    name: "ROLL DUO SAVER", 
    description: "2 Chicken Paratha Rolls + 2 Regular Drinks",
    price: 520,
    icon: "🌯",
    image: "fest2.png"
  },
  { 
    name: "DESI FEAST (FULL)", 
    description: "Chicken Biryani Full Plate + Fresh Salad + Raita + 1 Regular Drink",
    price: 450,
    icon: "🍚",
    image: "bircom1.png"
  },
  { 
    name: "SWEET BIRYANI COMBO", 
    description: "Chicken Biryani (Half Plate) + Raita + Salad + 1 Brownie + Soft Drink",
    price: 470,
    icon: "🍚",
    image: "bircom2.png"
  },
  { 
    name: "THE BLITZ MIX", 
    description: "6 Pcs Chicken Steam Momos + 1 Chicken Paratha Roll + Regular Drink",
    price: 600,
    icon: "🔥",
    image: "comb3.png"
  },
];

export default function Deals() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen py-8 sm:py-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-6 sm:py-10 mb-8 sm:mb-12 shadow-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-2">🔥 EXCLUSIVE SAVER DEALS 🔥</h1>
          <p className="text-xs sm:text-base md:text-xl text-red-100 font-semibold">Hot & Fresh Daily | 12:00 PM to 12:00 AM</p>
        </motion.div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {deals.map((deal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <DealCard deal={deal} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-10 sm:mt-16 text-center px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-5 sm:p-8 max-w-2xl mx-auto shadow-2xl text-gray-900"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Order Your Favorites Now! 📱</h2>
          <p className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4">Call us for fast delivery</p>
          <p className="text-lg sm:text-2xl md:text-2xl font-black">📞 0306 7730467</p>
          <p className="text-xs sm:text-sm mt-3 text-gray-800">Fresh food prepared for every order • Bahawalpur Only</p>
        </motion.div>
      </div>
    </div>
  );
}
