"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://ai-travel-planner-backend-zhr1.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful!");

        window.location.href = "/login";
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-xl w-96">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 text-white"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 text-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-white mt-4">
          Already have an account?

          <a
            href="/login"
            className="text-blue-400 ml-2"
          >
            Login
          </a>
        </p>
      </div>
    </main>
  );
}