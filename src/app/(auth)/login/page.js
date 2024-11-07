"use client";

import { useState } from "react";
import { FaEnvelope } from "react-icons/fa"; // Importing an envelope icon for the email input
import { useRouter } from "next/navigation"; // Hook to handle routing
import Cookies from "js-cookie"; // Library for managing cookies
import MessageBox from "@/components/MessageBox"; // Component to display messages to the user

export default function LoginPage() {
  // State variables for form fields and messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const router = useRouter(); // Use router for navigation

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Send login request to the server
      const response = await fetch('/api/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password in the request body
      });
      const userData = await response.json(); // Parse the JSON response

      if (response.ok) {
        // If login is successful, set cookies and redirect to the dashboard
        Cookies.set("token", userData.data.token, { expires: 1 });
        Cookies.set("user_id", userData.data.id, { expires: 1 });
        Cookies.set("name", userData.data.name, { expires: 1 });
        Cookies.set("type", userData.data.type, { expires: 1 });
        Cookies.set("mobile", userData.data.mobile, { expires: 1 });
        
        setMessage(userData.message); // Set success message
        setMessageType("success"); // Set message type to success
        router.push('/dashboard'); // Redirect to the dashboard
      } else {
        // Handle login failure
        setEmail(""); // Reset email field
        setPassword(""); // Reset password field
        setMessage(userData.message); // Set error message
        setMessageType("error"); // Set message type to error
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage("An error occurred. Please try again."); // Set generic error message
      setMessageType("error"); // Set message type to error
    }
  };

  // Function to handle Google Sign-In button click
  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked"); // Placeholder for Google Sign-In logic
  };

  // Function to navigate to the registration page
  const goToRegister = () => {
    router.push('/register'); // Navigate to the registration page
  };

  return (
    <>
      <MessageBox
        message={message} // Display message based on state
        type={messageType} // Display message type based on state
        onClose={() => setMessage("")} // Clear message on close
      />
    
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/path/to/forest-background.jpg")' }}>
        <div className="relative w-96">
          <button
            onClick={() => router.back()} // Navigate back on button click
            className="absolute top-2 -left-24 bg-red-500 rounded-full text-white text-2xl flex items-center justify-center w-10 h-10"
          >
            &#8592; {/* Left arrow icon */}
          </button>

          <div className="bg-black bg-opacity-60 p-8 rounded-lg w-96 text-white">
            <h1 className="text-center text-2xl font-bold mb-10">
              <span className="text-red-500">Kwix.</span>
              <span>Live</span>
            </h1>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Login</h2>
              <p className="text-red-400 cursor-pointer" onClick={goToRegister}>New User Registration</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                  className="w-full px-4 py-2 text-black rounded-full"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-black rounded-full p-2">
                  <FaEnvelope className="text-gray-500" /> {/* Envelope icon */}
                </div>
              </div>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                className="w-full px-4 py-2 text-black rounded-full"
                required
              />
              <p className="text-left text-red-400 text-sm cursor-pointer">Forgot Password?</p> {/* Link for password recovery */}
              <button
                type="submit"
                className="w-full py-2 bg-red-500 rounded-full font-bold text-white"
              >
                Login
              </button>
            </form>
            <div className="text-center mt-4">
              <p>or</p>
              <button
                onClick={handleGoogleSignIn} // Trigger Google Sign-In on button click
                className="w-full py-2 bg-white text-black rounded-full flex items-center justify-center space-x-2 mt-2"
              >
                <img src="/google.png" alt="Google icon" className="w-5 h-5" />
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
