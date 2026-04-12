// pages/Cart.jsx
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DELIVERY_CHARGES = 200;

export default function Cart() {
  const { cart, total, removeFromCart, increaseQty, decreaseQty } = useCart();
  const finalTotal = total + DELIVERY_CHARGES;

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl sm:text-6xl md:text-8xl mb-4 sm:mb-6">🛒</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">Let's add some delicious food!</p>
          <Link
            to="/menu"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold transition text-sm sm:text-base md:text-lg"
          >
            View Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 shadow-lg"
        >
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">🛒 Your Cart</h1>
          <p className="text-red-100 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">{cart.length} item{cart.length > 1 ? "s" : ""} in your cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cart.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4"
              >
                <div className="flex-1 w-full">
                  <h3 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">Price: <span className="font-bold text-red-600">Rs. {item.price}</span></p>
                  <p className="text-lg sm:text-xl md:text-2xl font-black text-red-600 mt-2">Rs. {item.price * item.qty}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-3 sm:mt-4">
                    <button
                      onClick={() => decreaseQty(item.name)}
                      className="bg-orange-500 hover:bg-orange-600 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-bold transition flex items-center justify-center text-sm"
                    >
                      −
                    </button>
                    <span className="bg-gray-100 px-3 sm:px-4 py-2 rounded-lg font-bold text-gray-800 min-w-12 text-center text-sm">{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item.name)}
                      className="bg-green-600 hover:bg-green-700 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-bold transition flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.name)}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold transition text-xs sm:text-sm md:text-base min-h-[44px]"
                >
                  🗑️ Remove
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6 sticky top-4 md:top-20"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Order Summary</h2>

              {/* Items Count */}
              <div className="flex justify-between mb-4 text-gray-700 pb-4 border-b">
                <span>Items:</span>
                <span className="font-bold">{cart.length}</span>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between mb-2 text-gray-700">
                <span>Subtotal:</span>
                <span>Rs. {total}</span>
              </div>

              {/* Delivery Fee */}
              <div className="flex justify-between mb-4 text-gray-700 pb-4 border-b">
                <span>Delivery Fee:</span>
                <span className="font-bold text-orange-600">Rs. {DELIVERY_CHARGES}</span>
              </div>

              {/* Total */}
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800 text-base md:text-lg">Total:</span>
                  <span className="text-3xl md:text-4xl font-black text-red-600">Rs. {finalTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 md:py-4 rounded-lg font-bold text-center text-base md:text-lg transition"
              >
                ✓ Proceed to Checkout
              </Link>

              {/* Continue Shopping */}
              <Link
                to="/menu"
                className="block w-full mt-3 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 md:py-4 rounded-lg font-bold text-center text-base md:text-lg transition"
              >
                Continue Shopping
              </Link>

              {/* Trust Info */}
              <div className="mt-6 space-y-2 text-center text-xs md:text-sm">
                <p className="text-gray-600">✅ 100% Halal</p>
                <p className="text-gray-600">🍽️ Fresh Ingredients</p>
                <p className="text-gray-600">🚚 Fast Delivery</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}