// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Deals from "./pages/Deals";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
           <Route path="/admin" element={<Admin />} />
        </Routes>
        <a
          href="https://wa.me/923067730467"
          className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full"
        >
          WhatsApp
        </a>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
