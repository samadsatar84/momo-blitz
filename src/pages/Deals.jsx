import DealCard from "../components/DealCard";
import { motion } from "framer-motion";

const deals = [
  { 
    name: "THE PARTY PACK", 
    description: "12 Pcs Chicken Steam Momos + 2 Brownies + 1 Litre Drink",
    price: 1100,
    icon: "🎉",
    image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  { 
    name: "ROLL DUO SAVER", 
    description: "2 Chicken Paratha Rolls + 2 Regular Drinks",
    price: 520,
    icon: "🌯",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  { 
    name: "DESI FEAST (FULL)", 
    description: "Chicken Biryani Full Plate + Fresh Salad + Raita + 1 Regular Drink",
    price: 450,
    icon: "🍚",
    image: "https://images.unsplash.com/photo-1585820817529-e876ca0f7f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  { 
    name: "SWEET BIRYANI COMBO", 
    description: "Chicken Biryani (Half Plate) + Raita + Salad + 1 Brownie + Soft Drink",
    price: 470,
    icon: "🍚",
    image: "https://images.unsplash.com/photo-1604908176997-431f3c88a8b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  { 
    name: "THE BLITZ MIX", 
    description: "6 Pcs Chicken Steam Momos + 1 Chicken Paratha Roll + Regular Drink",
    price: 600,
    icon: "🔥",
    image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
];

export default function Deals() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen py-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-10 mb-12 shadow-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl font-black mb-2">🔥 EXCLUSIVE SAVER DEALS 🔥</h1>
          <p className="text-xl text-red-100 font-semibold">Hot & Fresh Daily | 12:00 PM to 12:00 AM</p>
        </motion.div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
      <div className="mt-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-8 max-w-2xl mx-4 md:mx-auto shadow-2xl text-gray-900"
        >
          <h2 className="text-3xl font-bold mb-3">Order Your Favorites Now! 📱</h2>
          <p className="text-lg font-semibold mb-4">Call us for fast delivery</p>
          <p className="text-2xl font-black">📞 0306 7730467</p>
          <p className="text-sm mt-3 text-gray-800">Fresh food prepared for every order • Bahawalpur Only</p>
        </motion.div>
      </div>
    </div>
  );
}
