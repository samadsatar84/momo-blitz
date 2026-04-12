// pages/Admin.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const STATUS_OPTIONS = ["confirmed", "preparing", "ready", "delivered", "cancelled"];
const STATUS_COLORS = {
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-yellow-100 text-yellow-800",
  ready: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  pending: "bg-gray-100 text-gray-800"
};

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch orders from both backend and localStorage
  const fetchOrders = async () => {
    try {
      // Try to fetch from backend
      const response = await API.get("/orders");
      let allOrders = response.data || [];
      
      // Also get orders from localStorage (created offline)
      const localOrders = JSON.parse(localStorage.getItem('momoOrders') || '[]');
      
      // Combine both, avoiding duplicates
      const backendIds = new Set(allOrders.map(o => o._id));
      const uniqueLocalOrders = localOrders.filter(lo => !backendIds.has(lo._id));
      
      allOrders = [...allOrders, ...uniqueLocalOrders];
      setOrders(allOrders);
    } catch (error) {
      // If backend fails, just use localStorage
      console.error("Backend error, using localStorage:", error);
      const localOrders = JSON.parse(localStorage.getItem('momoOrders') || '[]');
      setOrders(localOrders);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh every 5 seconds
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter by phone number
  const filteredOrders = orders.filter(order =>
    order.customerInfo.phone.includes(searchPhone)
  );

  // Update order status
  const updateStatus = async (orderId, newStatus) => {
    try {
      // Check if it's a local order
      if (orderId.startsWith('LOCAL-')) {
        // Update in localStorage
        const localOrders = JSON.parse(localStorage.getItem('momoOrders') || '[]');
        const updated = localOrders.map(o => 
          o._id === orderId ? { ...o, status: newStatus } : o
        );
        localStorage.setItem('momoOrders', JSON.stringify(updated));
        toast.success(`Order status updated to ${newStatus}`);
      } else {
        // Update in backend
        await API.patch(`/orders/${orderId}/status`, { status: newStatus });
        toast.success(`Order status updated to ${newStatus}`);
      }
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // Delete order
  const deleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        // Check if it's a local order
        if (orderId.startsWith('LOCAL-')) {
          // Delete from localStorage
          const localOrders = JSON.parse(localStorage.getItem('momoOrders') || '[]');
          const updated = localOrders.filter(o => o._id !== orderId);
          localStorage.setItem('momoOrders', JSON.stringify(updated));
          toast.success("Order deleted");
        } else {
          // Delete from backend
          await API.delete(`/orders/${orderId}`);
          toast.success("Order deleted");
        }
        fetchOrders();
      } catch (error) {
        toast.error("Failed to delete order");
      }
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (filteredOrders.length === 0) {
      toast.error("No orders to export");
      return;
    }

    const headers = ["Order ID", "Customer Name", "Phone", "Address", "Items", "Subtotal", "Delivery", "Total", "Payment", "Status", "Date"];
    const csvContent = [
      headers.join(","),
      ...filteredOrders.map(order => [
        order.orderId || order._id,
        order.customerInfo.name,
        order.customerInfo.phone,
        order.customerInfo.address,
        order.cart.map(item => `${item.name}(${item.qty})`).join("|"),
        order.subtotal || (order.total - (order.deliveryCharges || 0)),
        order.deliveryCharges || 0,
        order.total,
        order.paymentMethod,
        order.status,
        new Date(order.createdAt).toLocaleString()
      ].join(","))
    ].join("\n");

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent));
    element.setAttribute("download", `MOMO_BLITZ_ORDERS_${Date.now()}.csv`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Orders exported to CSV");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-6 mb-8 shadow-lg">
          <h1 className="text-4xl font-bold mb-2">📊 Admin Dashboard</h1>
          <p className="text-red-100">Manage all customer orders in real-time</p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Search Box */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-gray-700 font-semibold mb-2">🔍 Search by Phone</label>
            <input
              type="text"
              placeholder="Enter customer phone..."
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
            />
            {searchPhone && <p className="text-sm text-gray-600 mt-2">{filteredOrders.length} orders found</p>}
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 font-semibold mb-2">📦 Total Orders</p>
            <p className="text-4xl font-bold text-red-600">{orders.length}</p>
            <p className="text-sm text-gray-500 mt-2">Auto-refreshing every 5 sec</p>
          </div>

          {/* Export Button */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
            <button
              onClick={exportToCSV}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-lg transition"
            >
              📥 Export to CSV
            </button>
            <p className="text-sm text-gray-500 text-center mt-2">Download all orders</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Order ID</th>
                  <th className="px-6 py-4 text-left font-bold">Customer</th>
                  <th className="px-6 py-4 text-left font-bold">Phone</th>
                  <th className="px-6 py-4 text-left font-bold">Items</th>
                  <th className="px-6 py-4 text-left font-bold">Total</th>
                  <th className="px-6 py-4 text-left font-bold">Payment</th>
                  <th className="px-6 py-4 text-left font-bold">Status</th>
                  <th className="px-6 py-4 text-left font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">Loading orders...</td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                      {searchPhone ? "No orders found for this phone number" : "No orders yet"}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-mono text-sm text-gray-700">
                        {order.orderId || order._id.slice(-8)}
                        {order.source === 'local' && <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">LOCAL</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-800">{order.customerInfo.name}</p>
                          <p className="text-sm text-gray-600">{order.customerInfo.address}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a href={`tel:${order.customerInfo.phone}`} className="text-blue-600 hover:underline font-mono">
                          {order.customerInfo.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm max-w-xs">
                        <div className="space-y-1">
                          {order.cart.map((item, i) => (
                            <p key={i}>
                              {item.name} <span className="text-gray-600">x{item.qty}</span>
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-lg font-bold text-red-600">Rs. {order.total}</p>
                          {order.deliveryCharges && (
                            <p className="text-xs text-gray-600">(+Rs. {order.deliveryCharges} delivery)</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono">
                          {order.paymentMethod === "cod" ? "💵 COD" : order.paymentMethod === "jazzcash" ? "🟢 JazzCash" : "🟣 EasyPaisa"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status || "pending"}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-semibold border-0 cursor-pointer ${
                            STATUS_COLORS[order.status || "pending"] || "bg-gray-100"
                          }`}
                        >
                          {STATUS_OPTIONS.map(status => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-2">💡 How to Use Admin Panel:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Orders auto-refresh every 5 seconds - no need to refresh manually</li>
            <li>✓ Click on status dropdown to update order status (confirming → preparing → ready → delivered)</li>
            <li>✓ Click on phone number to call customer directly</li>
            <li>✓ Search by phone number to find specific orders</li>
            <li>✓ Click "Export to CSV" to download all orders as Excel file</li>
            <li>✓ Delete orders that are cancelled or completed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}