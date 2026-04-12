// context/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const exist = cart.find((x) => x.name === item.name);
    if (exist) {
      setCart(cart.map(x =>
        x.name === item.name ? { ...x, qty: x.qty + 1 } : x
      ));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (itemName) => {
    setCart(cart.filter((x) => x.name !== itemName));
  };

  const increaseQty = (itemName) => {
    setCart(cart.map(x =>
      x.name === itemName ? { ...x, qty: x.qty + 1 } : x
    ));
  };

  const decreaseQty = (itemName) => {
    setCart(cart.map(x => {
      if (x.name === itemName) {
        return { ...x, qty: x.qty > 1 ? x.qty - 1 : 1 };
      }
      return x;
    }));
  };

  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, total }}>
      {children}
    </CartContext.Provider>
  );
};