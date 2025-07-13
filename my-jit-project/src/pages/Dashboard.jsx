import React, { useState } from 'react';

export default function Dashboard() {
  const [recommendation, setRecommendation] = useState(null);
  const [status, setStatus] = useState("");

  const checkRecommendation = async () => {
    setStatus("Checking...");
    try {
      const res = await fetch("http://localhost:8000/store/recommendation");
      const data = await res.json();
      setRecommendation(data);
      setStatus("");
    } catch (err) {
      setStatus("Error fetching recommendation.");
    }
  };

  const confirmRecommendation = async () => {
    try {
      const res = await fetch("http://localhost:8000/store/confirm", {
        method: "POST",
      });
      const data = await res.json();
      setStatus("Confirmed: " + JSON.stringify(data));
    } catch (err) {
      setStatus("Error confirming recommendation.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        JIT + Green Logistics Dashboard
      </h1>

      <p className="text-gray-600 mb-6">
        Welcome! This dashboard will show you store inventory, approvals, CO₂ savings, and delivery optimization.
      </p>

      <div className="mb-4">
        <button
          onClick={checkRecommendation}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
        >
          🔍 Check Recommendation
        </button>
        <button
          onClick={confirmRecommendation}
          disabled={!recommendation || !recommendation.recommendation}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          ✅ Confirm Suggestion
        </button>
      </div>

      {recommendation && (
        <div className="p-4 bg-gray-100 border rounded">
          {recommendation.recommendation ? (
            <>
              <p className="text-green-700 font-semibold">✅ Recommendation Active</p>
              <p><strong>Suggested Items:</strong> {recommendation.suggested_items.join(", ")}</p>
              <p><strong>Reason:</strong> {recommendation.reason}</p>
            </>
          ) : (
            <p className="text-gray-700">❌ No action needed. {recommendation.message}</p>
          )}
        </div>
      )}

      {status && (
        <div className="mt-4 text-sm text-blue-600">
          {status}
        </div>
      )}
    </div>
  );
}