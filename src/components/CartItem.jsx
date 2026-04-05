export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex justify-between items-center border-b p-3">
      <div>
        <p className="font-bold">{item.name}</p>
        <p className="text-gray-600">Qty: {item.qty}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold">Rs. {item.price * item.qty}</p>
        <button
          onClick={() => onRemove(item.name)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
