// components/Navbar.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const { cart } = useCart();

  const navLinks = [
    { to: "/", label: "🏠 Home" },
    { to: "/menu", label: "🥡 Menu" },
    { to: "/deals", label: "💰 Deals" },
    { to: "/cart", label: `🛒 Cart (${cart.length})` },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition">
          <span className="text-3xl">🔥</span>
          <h1 className="text-2xl font-black">MOMO BLITZ</h1>
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-semibold hover:text-red-100 transition text-lg"
            >
              {link.label}
            </Link>
          ))}
          
          {/* Cart Link with Badge */}
          <Link to="/cart" className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-full font-bold hover:bg-red-50 transition"
            >
              🛒 Cart
              {cart.length > 0 && (
                <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ml-2">
                  {cart.length}
                </span>
              )}
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}