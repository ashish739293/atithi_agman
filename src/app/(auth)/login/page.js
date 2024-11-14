"use client";

import { useState } from "react";
import { FaEnvelope } from "react-icons/fa"; 
import { useRouter } from "next/navigation"; 
import Cookies from "js-cookie";
import MessageBox from "@/components/MessageBox";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Login logic here
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
  };

  const goToRegister = () => {
    router.push('/register');
  };

  return (
    <>
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
        <MessageBox
          message={message}
          type={messageType}
          onClose={() => setMessage("")}
          className="p-4 bg-yellow-500 text-white rounded-lg shadow-lg"
        />
      </div>

      <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url("background-image.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Overlay for darkening and slightly blurring the background */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

        {/* Centered login card with only the card background made transparent */}
        <div className="relative w-full max-w-md mx-4 sm:mx-auto p-8 bg-white bg-opacity-30 backdrop-blur-sm rounded-xl shadow-lg text-black z-10">
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 bg-yellow-500 rounded-full text-white text-xl flex items-center justify-center w-8 h-8"
          >
            &#8592;
          </button>

          <h1 className="text-center text-2xl font-semibold text-yellow-500 mb-6">
            Welcome to Atithi Agman
          </h1>

          <p className="text-right text-white cursor-pointer mb-6" onClick={goToRegister}>
            New User? Register
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <p className="text-right text-white text-sm cursor-pointer mb-4">Forgot Password?</p>
            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 rounded-full font-bold text-white hover:bg-yellow-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
