'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-white">
      <h1 className="text-7xl font-bold mb-8">
        AI Travel Planner
      </h1>

      <p className="text-2xl text-gray-300 mb-10">
        Generate Smart Travel Itineraries with Gemini AI
      </p>

      <div className="flex gap-6">
        <Link href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded text-2xl">
            Login
          </button>
        </Link>

        <Link href="/register">
          <button className="bg-green-600 hover:bg-green-700 px-10 py-4 rounded text-2xl">
            Register
          </button>
        </Link>
      </div>
    </main>
  );
}