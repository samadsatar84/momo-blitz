// components/Navbar.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "🏠 Home" },
    { to: "/menu", label: "🥡 Menu" },
    { to: "/deals", label: "💰 Deals" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition min-w-fit">
            <span className="text-2xl sm:text-3xl">🔥</span>
            <h1 className="text-lg sm:text-2xl font-black">MOMO BLITZ</h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex gap-3 sm:gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-semibold hover:text-red-100 transition text-sm sm:text-base"
              >
                {link.label}
              </Link>
            ))}

            {/* Cart Link with Badge - Desktop */}
            <Link to="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 bg-white text-red-600 px-3 sm:px-4 py-2 rounded-full font-bold hover:bg-red-50 transition text-sm sm:text-base"
              >
                🛒 Cart
                {cart.length > 0 && (
                  <span className="bg-red-600 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ml-1 sm:ml-2">
                    {cart.length}
                  </span>
                )}
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Toggle + Cart Badge */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="bg-white text-red-600 px-3 py-2 rounded-full font-bold hover:bg-red-50 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? "✖" : "☰"}
            </button>

            <Link to="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center bg-white text-red-600 px-3 py-2 rounded-full font-bold hover:bg-red-50 transition"
              >
                🛒
                {cart.length > 0 && (
                  <span className="bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ml-1">
                    {cart.length}
                  </span>
                )}
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="sm:hidden mt-3 pb-3 border-t border-red-500 pt-3 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block font-semibold hover:text-red-100 transition text-sm py-2 px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}