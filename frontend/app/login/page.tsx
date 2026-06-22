'use client';

import { useState, useEffect } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(
        'http://localhost:5000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();
      console.log('LOGIN RESPONSE:', data);
      if (res.ok) {
        localStorage.setItem(
          'token',
          data.token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(data.user)
        );

        alert('Login Successful');

        window.location.href =
          '/dashboard';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert('Login Failed');
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-xl w-96">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-slate-800 text-white"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-slate-800 text-white"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
          >
            Login
          </button>
        </form>

        <p className="text-center text-white mt-4">
          Don't have an account?

          <a
            href="/register"
            className="text-blue-400 ml-2"
          >
            Register
          </a>
        </p>
      </div>
    </main>
  );
}