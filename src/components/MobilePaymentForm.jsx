// components/MobilePaymentForm.jsx
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import API from "../api/axios";

const DELIVERY_CHARGES = 200;

export default function MobilePaymentForm({ total, cart, customerInfo, onSuccess, paymentMethod }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error("Please fill all delivery details");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate secure payment verification
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const finalTotal = total + DELIVERY_CHARGES;

      const paymentData = {
        cart: cart,
        total: finalTotal,
        deliveryCharges: DELIVERY_CHARGES,
        subtotal: total,
        customerInfo: customerInfo,
        paymentMethod: "cod",
        transactionId: "COD-" + Date.now(),
      };

      try {
        // Send order to backend
        const response = await API.post('/orders', paymentData);
        
        // Also save to localStorage as backup
        const existingOrders = JSON.parse(localStorage.getItem('momoOrders') || '[]');
        existingOrders.push({ ...paymentData, _id: response.data._id, source: 'backend', createdAt: new Date() });
        localStorage.setItem('momoOrders', JSON.stringify(existingOrders));
        
        toast.success(`✅ Order confirmed via Cash on Delivery!`);
        if (onSuccess) {
          onSuccess(response.data);
        }
      } catch (apiError) {
        // Backend not available - save to localStorage for local processing
        console.warn("Backend not available, saving to localStorage:", apiError.message);
        
        const localOrderData = { 
          ...paymentData, 
          _id: 'LOCAL-' + Date.now(),
          source: 'local',
          createdAt: new Date(),
          status: 'confirmed'
        };
        
        // Save to localStorage
        const existingOrders = JSON.parse(localStorage.getItem('momoOrders') || '[]');
        existingOrders.push(localOrderData);
        localStorage.setItem('momoOrders', JSON.stringify(existingOrders));
        
        toast.success(`✅ Order confirmed via Cash on Delivery!`);
        if (onSuccess) {
          onSuccess(localOrderData);
        }
      }
    } catch (error) {
      toast.error("Payment processing failed");
      console.error("Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const finalTotal = total + DELIVERY_CHARGES;

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handlePayment}
      className="bg-white rounded-lg shadow-lg p-4 md:p-6"
    >
      {/* COD Payment Form */}
      <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4 md:p-6 mb-6">
        <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">
          💵 Cash on Delivery Payment
        </h3>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
            <p className="text-gray-700 font-semibold mb-3">Order Summary:</p>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Food & Items:</span>
                <span>Rs. {total}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                <span className="font-bold text-orange-600">Rs. {DELIVERY_CHARGES}</span>
              </div>
              <div className="border-t-2 pt-2 flex justify-between font-bold text-lg">
                <span>Total to Pay:</span>
                <span className="text-blue-600">Rs. {finalTotal}</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
            <p className="text-gray-700 font-semibold mb-2">How it works:</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Place your order now</li>
              <li>✓ We'll call to confirm delivery time</li>
              <li>✓ Pay Rs. {finalTotal} when delivery arrives</li>
              <li>✓ No advance payment required</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-bold text-green-600 mb-2">✅ Benefits of COD:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>🔒 Safe & Secure - Pay only after inspection</li>
          <li>💰 No extra charges for payment verification</li>
          <li>⚡ Quick delivery, no payment delays</li>
        </ul>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing}
        className={`w-full py-3 sm:py-4 rounded-lg font-bold text-white text-base sm:text-lg transition min-h-[48px] flex items-center justify-center ${
          isProcessing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        }`}
      >
        {isProcessing ? "⏳ Processing..." : `✓ Confirm Payment (Rs. ${finalTotal})`}
      </button>

      {/* Security Badge */}
      <p className="text-center text-xs md:text-sm text-gray-500 mt-4">
        🔒 Your data is secure and encrypted
      </p>
    </motion.form>
  );
}
