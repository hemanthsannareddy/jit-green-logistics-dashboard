import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000";

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/store/requests`)
      .then((res) => {
        if (!res.ok) throw new Error("No store requests found.");
        return res.json();
      })
      .then(setRequests)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Store Requests</h2>
      {error && <div className="text-red-500">{error}</div>}
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul className="list-disc ml-5">
         {requests.map((req, idx) => (
            <li key={idx}>
              <span className="font-semibold">{req.store_name}</span> — (
              {[
              req.product_name,
              req.quantity,       // you had a typo: "quatity" → should be "quantity"
              req.status,
              req.latitude,
              req.longitude
              ]
              .filter(Boolean)    // ✅ removes empty/undefined values
              .join(", ")}
            )
            </li>
          ))}


        </ul>
      )}
    </div>
  );
}
