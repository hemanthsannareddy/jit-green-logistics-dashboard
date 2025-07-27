import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LayoutDashboard, Store, Leaf, MapPin } from 'lucide-react';

export default function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  const handleStoreRequest = async () => {
    try {
      const response = await fetch(`${API_URL}/store-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          store_id: 'S101',
          item: 'Milk',
          last_week_sales: 120,
          avg_weekly_sales: 115,
          day_of_week: 'Monday',
        }),
      });
      const data = await response.json();
      alert(`✅ Store Request Created: ID ${data.id || JSON.stringify(data)}`);
    } catch (error) {
      alert('❌ Failed to submit store request');
      console.error(error);
    }
  };

  const handleDemandPrediction = async () => {
    try {
      const response = await fetch(`${API_URL}/predict-demand`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: 'S101',
          item: 'Milk',
          lastWeekSales: 120,
          avgWeeklySales: 115,
          dayOfWeek: 'Monday',
        }),
      });
      const data = await response.json();
      alert(`📈 Predicted Quantity: ${data.predictedQuantity}`);
    } catch (error) {
      alert('❌ Prediction failed');
      console.error(error);
    }
  };

  const handleEvaluateRoutes = async () => {
    try {
      const response = await fetch(`${API_URL}/evaluate-routes`);
      const data = await response.json();
      alert('📍 Route evaluation data fetched (dummy)');
      console.log(data);
    } catch (error) {
      alert('❌ Failed to evaluate routes');
      console.error(error);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col items-center mb-4">
        <img
          src="/belc_logo.jpg"
          alt="Belc Logo"
          style={{ height: '100px', width: 'auto' }}
          className="mb-[-4px]"
        />
        <h1 className="text-4xl font-bold text-green-700 mt-0 text-center">
          JIT + Green Logistics Dashboard
        </h1>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Store Request */}
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Store className="w-12 h-12 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Store Request</h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              Submit and view inventory requests from stores.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white w-40 mx-auto" onClick={handleStoreRequest}>
              Go to Store Request
            </Button>
          </CardContent>
        </Card>

        {/* Evaluate Routes */}
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <LayoutDashboard className="w-12 h-12 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Evaluate Routes</h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              View and compare CO₂-optimized delivery routes.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white w-40 mx-auto" onClick={handleEvaluateRoutes}>
              Check Routes
            </Button>
          </CardContent>
        </Card>

        {/* Demand Prediction */}
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Leaf className="w-12 h-12 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Demand Prediction</h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              Estimate product demand using AI-based models.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white w-40 mx-auto" onClick={handleDemandPrediction}>
              Predict Demand
            </Button>
          </CardContent>
        </Card>

        {/* Map Link */}
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <MapPin className="w-12 h-12 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">View Map</h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              Navigate to real-time delivery map and store locations.
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white w-40 mx-auto"
              onClick={() => window.open('https://www.google.com/maps', '_blank')}
            >
              Open Map
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
