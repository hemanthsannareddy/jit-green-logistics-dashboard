import { useState } from "react";

const API_URL = "http://localhost:8000";

export default function NewRequest() {
  const [storeId, setStoreId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      store_id: storeId,      // We’ll resolve this in the backend
      product_name: productName,
      quantity,
      status,
    };

    try {
      const res = await fetch(`${API_URL}/store/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit request.");
      const data = await res.json();
      setMessage("✅ Request submitted successfully.");
      setStoreId("");
      setProductName("");
      setQuantity(1);
      setStatus("Pending");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">New Store Request</h2>
      {message && <div className="mb-4 text-green-400">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Store ID"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          className="w-full border rounded p-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
