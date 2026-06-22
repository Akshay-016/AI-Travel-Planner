'use client';

import { useEffect, useState } from 'react';

export default function MyTripsPage() {
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        'http://localhost:5000/api/travel-plans/my-trips',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTrips(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTrip = async (id: string) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `http://localhost:5000/api/travel-plans/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchTrips();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        My Trips
      </h1>

      {trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-slate-900 p-4 rounded"
            >
              <h2 className="text-2xl font-bold">
                {trip.destination}
              </h2>

              <p>Budget: ₹{trip.budget}</p>
              <p>Days: {trip.days}</p>
              <p>Interests: {trip.interests}</p>

              <p className="text-gray-400 mt-2">
                {new Date(
                  trip.createdAt
                ).toLocaleDateString()}
              </p>

              <div className="mt-4 bg-slate-800 p-4 rounded">
                <h3 className="font-bold mb-2">
                  Travel Plan
                </h3>

                <pre className="whitespace-pre-wrap text-sm">
                  {trip.plan}
                </pre>
              </div>

              <button
                onClick={() => deleteTrip(trip._id)}
                className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Delete Trip
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}