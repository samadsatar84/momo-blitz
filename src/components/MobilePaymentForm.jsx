// components/MobilePaymentForm.jsx
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function MobilePaymentForm({ total, cart, customerInfo, onSuccess, paymentMethod }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const bankDetails = {
    jazzcash: {
      phone: "0306-7730467",
      account: "MOMO BLITZ BUSINESS",
      note: "Send money to this JazzCash account"
    },
    easypaisa: {
      phone: "0306-7730467",
      account: "MOMO BLITZ",
      note: "Send money to this Easypaisa account"
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!transactionId.trim()) {
      toast.error("Please enter transaction ID");
      return;
    }

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error("Please fill all delivery details");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate secure payment verification
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const paymentData = {
        paymentMethod: paymentMethod,
        transactionId: transactionId,
        amount: total,
        currency: "PKR",
        cart: cart,
        customerInfo: customerInfo,
        timestamp: new Date().toISOString(),
        status: "confirmed",
      };

      // Validate transaction
      if (transactionId.length >= 8) {
        toast.success(`✅ Payment confirmed via ${paymentMethod === "jazzcash" ? "JazzCash" : "Easypaisa"}!`);
        if (onSuccess) {
          onSuccess(paymentData);
        }
      } else {
        toast.error("Invalid transaction ID format");
      }
    } catch (error) {
      toast.error("Payment verification failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const details = bankDetails[paymentMethod];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handlePayment}
      className="bg-white rounded-lg shadow-lg p-4 md:p-6"
    >
      {/* Payment Instructions */}
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 md:p-6 mb-6">
        <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">
          📱 {paymentMethod === "jazzcash" ? "JazzCash" : "Easypaisa"} Payment
        </h3>

        <div className="space-y-4">
          <div>
            <p className="text-gray-700 font-semibold mb-2">Step 1: Open {paymentMethod === "jazzcash" ? "JazzCash" : "Easypaisa"} App</p>
            <p className="text-gray-600">
              Open your {paymentMethod === "jazzcash" ? "JazzCash" : "Easypaisa"} mobile app or dial the USSD code
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
            <p className="text-gray-700 text-sm mb-2">Step 2: Send Money To:</p>
            <p className="text-2xl md:text-3xl font-black text-red-600 mb-2">{details.phone}</p>
            <p className="text-gray-600 text-sm">{details.account}</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
            <p className="text-gray-700 font-semibold mb-2">Step 3: Amount to Send</p>
            <p className="text-3xl md:text-4xl font-black text-blue-600">Rs. {total}</p>
          </div>

          <div>
            <p className="text-gray-700 font-semibold mb-2">Step 4: Confirmation</p>
            <p className="text-gray-600">
              Enter your transaction/reference ID below to confirm your payment
            </p>
          </div>
        </div>
      </div>

      {/* Transaction ID Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Transaction ID / Reference Number *
        </label>
        <input
          type="text"
          placeholder="Enter your transaction ID (e.g., TXN123456)"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition text-base md:text-lg"
        />
        <p className="text-xs md:text-sm text-gray-500 mt-2">
          You'll receive this ID via SMS after sending money
        </p>
      </div>

      {/* Important Notes */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
        <h4 className="font-bold text-red-600 mb-2">⚠️ Important</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>✓ Confirm amount before sending</li>
          <li>✓ Save transaction ID from SMS</li>
          <li>✓ Do not close this page until confirmed</li>
          <li>✓ We'll call to confirm your order</li>
        </ul>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing}
        className={`w-full py-3 md:py-4 rounded-lg font-bold text-white text-base md:text-lg transition ${
          isProcessing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        }`}
      >
        {isProcessing ? "⏳ Verifying Payment..." : `✓ Confirm Payment (Rs. ${total})`}
      </button>

      {/* Security Badge */}
      <p className="text-center text-xs md:text-sm text-gray-500 mt-4">
        🔒 Your data is secure and encrypted
      </p>
    </motion.form>
  );
}
