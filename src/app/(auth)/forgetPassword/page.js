"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FaArrowLeft } from "react-icons/fa";
import MessageBox from "@/components/MessageBox";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const router = useRouter();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const userData = await response.json();

      if (response.ok) {
        setMessage(userData.message);
        setMessageType("success");
        router.push('/login'); // Redirect back to login after successful password reset
      } else {
        setEmail("");
        setMessage(userData?.message || userData?.error );
        setMessageType("error");
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
    }
  };

  const goToLogin = () => {
    router.push('/login');
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

        {/* Centered forgot password card with only the card background made transparent */}
        <div className="relative w-full max-w-md mx-4 sm:mx-auto p-8 bg-white bg-opacity-30 backdrop-blur-sm rounded-xl shadow-lg text-black z-10">
          <button
            onClick={goToLogin}
            className="absolute top-4 left-4 bg-yellow-500 rounded-full text-white text-xl flex items-center justify-center w-8 h-8"
          >
            <FaArrowLeft />
          </button>

          <h1 className="text-center text-2xl font-semibold text-yellow-500 mb-6">
            Forgot Password?
          </h1>

          <p className="text-right text-white cursor-pointer mb-6" onClick={goToLogin}>
            Remembered your password? Login here
          </p>

          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 rounded-full font-bold text-white hover:bg-yellow-600 transition"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
