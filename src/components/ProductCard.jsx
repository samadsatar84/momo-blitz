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
      className="bg-white shadow-lg rounded-lg overflow-hidden border border-red-200 hover:shadow-2xl transition"
    >
      {/* Image Container */}
      <div className="relative h-48 md:h-56 bg-gradient-to-br from-red-100 to-orange-100 overflow-hidden">
        {!imageError ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            🍕
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full font-bold">
          Rs. {item.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h2 className="font-bold text-gray-800 line-clamp-2 min-h-[2.5rem] mb-3 text-sm md:text-base">
          {item.name}
        </h2>

        <button
          onClick={() => {
            addToCart({ name: item.name, price: item.price });
            toast.success("Added to cart!");
          }}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base transition transform hover:scale-105"
        >
          🛒 Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
  