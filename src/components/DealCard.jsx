import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DealCard({ deal }) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden border-3 border-red-500 hover:shadow-2xl transition"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-48 md:h-56 bg-gradient-to-br from-red-100 to-orange-100">
        {!imageError ? (
          <img
            src={deal.image}
            alt={deal.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl">
            {deal.icon}
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-black text-base sm:text-lg md:text-xl">
          Rs. {deal.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-6">
        <h2 className="font-bold text-sm sm:text-base md:text-xl text-gray-800 mb-2 flex items-center gap-2">
          <span className="text-lg sm:text-2xl">{deal.icon}</span>
          {deal.name}
        </h2>

        <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 leading-relaxed">
          {deal.description}
        </p>

        <button
          onClick={() => addToCart({ name: deal.name, price: deal.price })}
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-3 md:py-4 w-full rounded-lg font-bold text-xs sm:text-sm md:text-base transition transform hover:scale-105 min-h-[44px]"
        >
          🛒 Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
