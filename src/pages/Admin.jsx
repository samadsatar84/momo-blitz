// pages/Admin.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl">Orders</h1>

      {orders.map((o, i) => (
        <div key={i} className="border p-2 my-2">
          <p>{o.total}</p>
        </div>
      ))}
    </div>
  );
}