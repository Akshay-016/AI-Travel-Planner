'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [interests, setInterests] = useState('');
  const [travelPlan, setTravelPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    const user = localStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleGenerate = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Please login again');
        window.location.href = '/login';
        return;
      }

      setLoading(true);
      setTravelPlan('');

      const response = await fetch(
        'https://ai-travel-planner-backend-zhr1.onrender.com/api/ai/generate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            destination,
            budget,
            days,
            interests,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTravelPlan(data.plan);
      } else {
        setTravelPlan(
          data.message || 'Failed to generate plan'
        );
      }
    } catch (error) {
      console.error(error);
      setTravelPlan('Error connecting to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            AI Travel Planner
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome, {userName}
          </p>
        </div>

        <div className="flex gap-3">
          <a
            href="/my-trips"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            My Trips
          </a>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-slate-900 p-6 rounded-xl">
        <input
          type="text"
          placeholder="Destination"
          className="w-full p-3 rounded bg-slate-800 mb-4"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          type="number"
          placeholder="Budget"
          className="w-full p-3 rounded bg-slate-800 mb-4"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <input
          type="number"
          placeholder="Number of Days"
          className="w-full p-3 rounded bg-slate-800 mb-4"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <input
          type="text"
          placeholder="Interests (Adventure, Food, Beaches)"
          className="w-full p-3 rounded bg-slate-800 mb-4"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded font-semibold"
        >
          {loading
            ? 'Generating...'
            : 'Generate Travel Plan'}
        </button>

        {travelPlan && (
          <div className="mt-6 bg-slate-800 p-4 rounded">
            <h2 className="text-2xl font-bold mb-4">
              AI Generated Travel Plan
            </h2>

            <pre className="whitespace-pre-wrap text-white">
              {travelPlan}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}