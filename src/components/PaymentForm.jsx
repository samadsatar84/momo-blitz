// components/PaymentForm.jsx
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

export default function PaymentForm({ total, cart, customerInfo, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Payment system not ready");
      return;
    }

    setIsLoading(true);

    try {
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name: customerInfo.name,
          phone: customerInfo.phone,
          address: {
            line1: customerInfo.address,
            city: "Bahawalpur",
            country: "PK",
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      // Simulate order processing
      // In production, you would send this to your backend
      const orderData = {
        paymentMethodId: paymentMethod.id,
        amount: total * 100, // in cents
        currency: "pkr",
        cart,
        customerInfo,
        timestamp: new Date().toISOString(),
      };

      // Simulate backend call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success
      toast.success("✅ Payment successful! Your order is confirmed.");
      
      // Clear card
      elements.getElement(CardElement).clear();
      
      // Call success callback
      if (onSuccess) {
        onSuccess(orderData);
      }
    } catch (error) {
      toast.error("Payment failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg border-2 border-red-200"
      onSubmit={handlePayment}
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6">💳 Card Payment</h3>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-300">
        <label className="block text-gray-700 font-semibold mb-2">Card Details</label>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className={`w-full py-3 rounded-lg font-bold text-white text-lg transition ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
        }`}
      >
        {isLoading ? "Processing Payment..." : `Pay Rs. ${total}`}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        🔒 Your payment is secured and encrypted by Stripe
      </p>
    </motion.form>
  );
}
