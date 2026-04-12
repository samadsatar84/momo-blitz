// pages/Checkout.jsx
import { useCart } from "../context/CartContext";
import { useState } from "react";
import MobilePaymentForm from "../components/MobilePaymentForm";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const DELIVERY_CHARGES = 200;

// Function to download receipt as image
const downloadReceipt = (orderData, customerInfo, cart, total) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 400;
  canvas.height = 600;
  
  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Border
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  
  let y = 40;
  const lineHeight = 25;
  
  // Header
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('🔥 MOMO BLITZ 🔥', canvas.width / 2, y);
  
  y += 35;
  ctx.font = '12px Arial';
  ctx.fillText('ORDER RECEIPT', canvas.width / 2, y);
  
  y += 30;
  ctx.strokeStyle = '#cccccc';
  ctx.beginPath();
  ctx.moveTo(20, y);
  ctx.lineTo(canvas.width - 20, y);
  ctx.stroke();
  
  y += 20;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 12px Arial';
  
  // Customer Info
  ctx.fillText(`Name: ${customerInfo.name}`, 30, y);
  y += lineHeight;
  ctx.fillText(`Phone: ${customerInfo.phone}`, 30, y);
  y += lineHeight;
  ctx.fillText(`Address: ${customerInfo.address}`, 30, y);
  
  y += 25;
  ctx.strokeStyle = '#cccccc';
  ctx.beginPath();
  ctx.moveTo(20, y);
  ctx.lineTo(canvas.width - 20, y);
  ctx.stroke();
  
  y += 20;
  ctx.font = 'bold 11px Arial';
  
  // Items
  cart.forEach((item) => {
    const itemText = `${item.name} x${item.qty}`;
    const priceText = `Rs. ${item.price * item.qty}`;
    ctx.fillText(itemText, 30, y);
    ctx.textAlign = 'right';
    ctx.fillText(priceText, canvas.width - 30, y);
    ctx.textAlign = 'left';
    y += lineHeight;
  });
  
  y += 15;
  ctx.strokeStyle = '#cccccc';
  ctx.beginPath();
  ctx.moveTo(20, y);
  ctx.lineTo(canvas.width - 20, y);
  ctx.stroke();
  
  y += 20;
  ctx.font = 'bold 13px Arial';
  const finalTotal = total + DELIVERY_CHARGES;
  
  ctx.fillText('Subtotal:', 30, y);
  ctx.textAlign = 'right';
  ctx.fillText(`Rs. ${total}`, canvas.width - 30, y);
  ctx.textAlign = 'left';
  
  y += lineHeight;
  ctx.fillText('Delivery:', 30, y);
  ctx.textAlign = 'right';
  ctx.fillText(`Rs. ${DELIVERY_CHARGES}`, canvas.width - 30, y);
  ctx.textAlign = 'left';
  
  y += 25;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(20, y);
  ctx.lineTo(canvas.width - 20, y);
  ctx.stroke();
  
  y += 20;
  ctx.font = 'bold 16px Arial';
  ctx.fillStyle = '#dc2626';
  ctx.fillText('TOTAL:', 30, y);
  ctx.textAlign = 'right';
  ctx.fillText(`Rs. ${finalTotal}`, canvas.width - 30, y);
  ctx.textAlign = 'center';
  
  y += 40;
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 11px Arial';
  ctx.fillText('Payment: Cash on Delivery', canvas.width / 2, y);
  
  y += 25;
  ctx.font = '10px Arial';
  ctx.fillStyle = '#666666';
  ctx.fillText(`Order Date: ${new Date().toLocaleString()}`, canvas.width / 2, y);
  
  y += 30;
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 11px Arial';
  ctx.fillText('✅ Order Confirmed', canvas.width / 2, y);
  
  y += 25;
  ctx.font = '9px Arial';
  ctx.fillStyle = '#666666';
  ctx.fillText('Thank you for your order!', canvas.width / 2, y);
  y += 15;
  ctx.fillText('Momo Blitz - Halal & Fresh', canvas.width / 2, y);
  
  // Download
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `momo-receipt-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Receipt downloaded! 📥');
  });
};

export default function Checkout() {
  const { cart, total } = useCart();
  const finalTotal = total + DELIVERY_CHARGES;
  const [paymentMethod, setPaymentMethod] = useState("cod");
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
          <div className="text-5xl sm:text-6xl md:text-8xl mb-4 sm:mb-6">🛒</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">Add delicious items from our menu</p>
          <Link
            to="/menu"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold transition text-sm sm:text-base md:text-lg"
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
        className="bg-gradient-to-b from-green-50 to-gray-50 min-h-screen py-6 sm:py-8 md:py-12"
      >
        <div className="max-w-2xl mx-auto px-3 sm:px-4">
          <div className="text-center">
            <div className="text-5xl sm:text-6xl md:text-8xl mb-3 sm:mb-4 md:mb-6">✅</div>
            <h1 className="text-lg sm:text-2xl md:text-4xl font-bold text-green-600 mb-3 sm:mb-4">Order Confirmed!</h1>
            <p className="text-xs sm:text-sm md:text-lg text-gray-600 mb-6 sm:mb-8">
              Your delicious food is being prepared. You will receive a call shortly for confirmation.
            </p>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
            <div className="bg-gray-100 rounded-lg p-4 sm:p-5 md:p-6 mb-6">
              <h2 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-2 text-left mb-4 max-h-60 overflow-y-auto">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs sm:text-sm md:text-base">
                    <span>{item.name} x{item.qty}</span>
                    <span className="font-bold">Rs. {item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t-2 pt-3 text-xs sm:text-sm md:text-base">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>Rs. {total}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charges:</span>
                  <span className="font-bold text-orange-600">Rs. {DELIVERY_CHARGES}</span>
                </div>
                <div className="flex justify-between items-center text-base sm:text-lg md:text-xl font-bold text-green-600 pt-2">
                  <span>Total:</span>
                  <span>Rs. {total + DELIVERY_CHARGES}</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-3 text-xs sm:text-sm md:text-base">📞 Delivery Details</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-2"><span className="font-bold">Name:</span> {customerInfo.name}</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-2"><span className="font-bold">Phone:</span> {customerInfo.phone}</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700"><span className="font-bold">Address:</span> {customerInfo.address}</p>
            </div>

            <p className="text-center text-gray-700 font-semibold text-xs sm:text-sm md:text-base">
              We'll call you shortly to confirm your delivery time!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => downloadReceipt({}, customerInfo, cart, total)}
              className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:py-4 rounded-lg font-bold transition text-sm sm:text-base md:text-lg"
            >
              💾 Save Receipt
            </button>
            <Link
              to="/menu"
              className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:py-4 rounded-lg font-bold transition text-sm sm:text-base md:text-lg"
            >
              Order More
            </Link>
            <Link
              to="/"
              className="flex-1 text-center bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 md:py-4 rounded-lg font-bold transition text-sm sm:text-base md:text-lg"
            >
              Go Home
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg p-4 sm:p-6 md:p-8 mb-6 md:mb-8 shadow-lg"
        >
          <h1 className="text-lg sm:text-xl md:text-4xl font-bold mb-1 md:mb-2">🛒 Order Checkout</h1>
          <p className="text-xs sm:text-xs md:text-sm text-red-100">Select payment method and confirm your order</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Customer Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6"
            >
              <h2 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6">📋 Delivery Information</h2>

              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-xs sm:text-xs md:text-sm">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition text-base min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-xs sm:text-xs md:text-sm">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="03001234567"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition text-base min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-xs sm:text-xs md:text-sm">Delivery Address *</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="House #, Street, Area"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition text-base min-h-[44px]"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6"
            >
              <h2 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6">💳 Payment Method</h2>

              <div className="space-y-3 md:space-y-4">
                {/* COD Option */}
                <label className="flex items-center p-4 sm:p-5 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition active:scale-95 min-h-[56px]"
                  style={{ borderColor: paymentMethod === "cod" ? "#2563eb" : "#d1d5db" }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-6 h-6 cursor-pointer"
                  />
                  <span className="ml-3 text-xs sm:text-sm md:text-base font-semibold">💵 Cash on Delivery (COD)</span>
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
              className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6 sticky top-4 md:top-20"
            >
              <h3 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">📦 Order Summary</h3>

              {/* Items List */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 max-h-64 md:max-h-96 overflow-y-auto">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between text-gray-700 pb-2 sm:pb-3 border-b text-xs sm:text-sm md:text-base">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs md:text-sm text-gray-500">x{item.qty}</p>
                    </div>
                    <p className="font-bold">Rs. {item.price * item.qty}</p>
                  </div>
                ))}
              </div>

              {/* Total Section */}
              <div className="bg-gray-100 rounded-lg p-3 sm:p-4">
                <div className="flex justify-between mb-2 text-gray-700 text-xs sm:text-sm md:text-base">
                  <span>Subtotal:</span>
                  <span>Rs. {total}</span>
                </div>
                <div className="flex justify-between mb-3 text-gray-700 text-xs sm:text-sm md:text-base">
                  <span>Delivery Charges:</span>
                  <span className="font-bold text-orange-600">Rs. {DELIVERY_CHARGES}</span>
                </div>
                <div className="border-t-2 pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-800 text-xs sm:text-sm md:text-base">Total:</span>
                  <span className="text-lg sm:text-xl md:text-3xl font-black text-red-600">Rs. {finalTotal}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 md:mt-6 space-y-2 text-center text-xs sm:text-xs md:text-sm">
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
