// components/ProductCard.jsx
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useState } from "react";

export default function ProductCard({ item }) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      className="bg-white shadow-lg rounded-lg overflow-hidden border border-red-200 hover:shadow-2xl transition h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative w-full pt-[100%] bg-gradient-to-br from-red-100 to-orange-100 overflow-hidden">
        {!imageError ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImageError(true)}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-5xl">
            🍕
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full font-bold text-sm sm:text-base">
          Rs. {item.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
        <h2 className="font-bold text-gray-800 line-clamp-2 text-sm sm:text-base mb-2 sm:mb-3 flex-grow">
          {item.name}
        </h2>

        <button
          onClick={() => {
            addToCart({ name: item.name, price: item.price, image: item.image });
            toast.success("Added to cart!", {
              duration: 2,
              position: "bottom-center"
            });
          }}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-3 sm:px-4 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-base transition transform hover:scale-105 active:scale-95 min-h-[44px] flex items-center justify-center"
        >
          🛒 Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
  