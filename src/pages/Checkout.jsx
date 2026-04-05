// pages/Checkout.jsx
import { useCart } from "../context/CartContext";
import { useState } from "react";
import MobilePaymentForm from "../components/MobilePaymentForm";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Checkout() {
  const { cart, total } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("jazzcash");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handlePaymentSuccess = (paymentData) => {
    setOrderPlaced(true);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl md:text-8xl mb-6">🛒</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 text-base md:text-lg">Add delicious items from our menu</p>
          <Link
            to="/menu"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold transition text-base md:text-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-b from-green-50 to-gray-50 min-h-screen py-8 md:py-12"
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center">
            <div className="text-6xl md:text-8xl mb-4 md:mb-6">✅</div>
            <h1 className="text-3xl md:text-5xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
            <p className="text-base md:text-xl text-gray-600 mb-8">
              Your delicious food is being prepared. You will receive a call shortly for confirmation.
            </p>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 mb-8">
            <div className="bg-gray-100 rounded-lg p-4 md:p-6 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-2 text-left mb-4 max-h-60 overflow-y-auto">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm md:text-base">
                    <span>{item.name} x{item.qty}</span>
                    <span className="font-bold">Rs. {item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="border-t-2 pt-4 flex justify-between items-center text-lg md:text-2xl font-bold">
                <span>Total:</span>
                <span className="text-green-600">Rs. {total}</span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-3 text-base md:text-lg">📞 Delivery Details</h3>
              <p className="text-sm md:text-base text-gray-700 mb-2"><span className="font-bold">Name:</span> {customerInfo.name}</p>
              <p className="text-sm md:text-base text-gray-700 mb-2"><span className="font-bold">Phone:</span> {customerInfo.phone}</p>
              <p className="text-sm md:text-base text-gray-700"><span className="font-bold">Address:</span> {customerInfo.address}</p>
            </div>

            <p className="text-center text-gray-700 font-semibold text-base md:text-lg">
              We'll call you shortly to confirm your delivery time!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/menu"
              className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:py-4 rounded-lg font-bold transition text-base md:text-lg"
            >
              Order More
            </Link>
            <Link
              to="/"
              className="flex-1 text-center bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 md:py-4 rounded-lg font-bold transition text-base md:text-lg"
            >
              Go Home
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg p-4 md:p-8 mb-6 md:mb-8 shadow-lg"
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">🛒 Order Checkout</h1>
          <p className="text-sm md:text-base text-red-100">Select payment method and confirm your order</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-4 md:p-6"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">📋 Delivery Information</h2>

              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="03001234567"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Delivery Address *</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="House #, Street, Area"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition text-base"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-4 md:p-6"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">💳 Payment Method</h2>

              <div className="space-y-3 md:space-y-4">
                {/* JazzCash Option */}
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-green-500 transition active:scale-95"
                  style={{ borderColor: paymentMethod === "jazzcash" ? "#16a34a" : "#d1d5db" }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="jazzcash"
                    checked={paymentMethod === "jazzcash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="ml-3 text-base md:text-lg font-semibold">📱 JazzCash</span>
                </label>

                {/* Easypaisa Option */}
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-purple-500 transition active:scale-95"
                  style={{ borderColor: paymentMethod === "easypaisa" ? "#9333ea" : "#d1d5db" }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="easypaisa"
                    checked={paymentMethod === "easypaisa"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="ml-3 text-base md:text-lg font-semibold">📱 Easypaisa</span>
                </label>
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <MobilePaymentForm
                total={total}
                cart={cart}
                customerInfo={customerInfo}
                paymentMethod={paymentMethod}
                onSuccess={handlePaymentSuccess}
              />
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-4 md:p-6 sticky top-4 md:top-20"
            >
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">📦 Order Summary</h3>

              {/* Items List */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 max-h-64 md:max-h-96 overflow-y-auto">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between text-gray-700 pb-3 border-b text-sm md:text-base">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs md:text-sm text-gray-500">x{item.qty}</p>
                    </div>
                    <p className="font-bold">Rs. {item.price * item.qty}</p>
                  </div>
                ))}
              </div>

              {/* Total Section */}
              <div className="bg-gray-100 rounded-lg p-3 md:p-4">
                <div className="flex justify-between mb-2 text-gray-700 text-sm md:text-base">
                  <span>Subtotal:</span>
                  <span>Rs. {total}</span>
                </div>
                <div className="flex justify-between mb-3 text-gray-700 text-sm md:text-base">
                  <span>Delivery:</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="border-t-2 pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-800 text-base md:text-lg">Total:</span>
                  <span className="text-2xl md:text-3xl font-black text-red-600">Rs. {total}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 md:mt-6 space-y-2 text-center text-xs md:text-sm">
                <p className="text-gray-600">✅ 100% Halal</p>
                <p className="text-gray-600">🍽️ Fresh Ingredients</p>
                <p className="text-gray-600">🚚 Fast Delivery</p>
                <p className="text-gray-600">🔒 Secure Payment</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
