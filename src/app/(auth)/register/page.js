"use client"; // Indicates that this file is a client component in Next.js

import { useState } from "react"; // Importing useState hook from React
import { FaEnvelope } from "react-icons/fa"; // Importing email icon from react-icons
import { useRouter } from "next/navigation"; // Importing useRouter hook from Next.js for navigation
import Cookies from "js-cookie"; // Importing js-cookie for handling cookies
import MessageBox from "@/components/MessageBox"; // Importing a custom message box component for feedback

export default function SignUpPage() {
  // State variables for form inputs and message handling
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Message to display feedback
  const [messageType, setMessageType] = useState(""); // Type of message (success or error)
  const router = useRouter(); // Initialize router for navigation

  // Function to handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send POST request to the sign-up API
      const response = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify({ email, password, name, mobile }), // Send user data as JSON
      });

      const userData = await response.json(); // Parse JSON response

      if (response.ok) {
        // Handle successful signup
        // Store user data in cookies
        Cookies.set("token", userData.data.token, { expires: 1 });
        Cookies.set("user_id", userData.data.id, { expires: 1 });
        Cookies.set("name", userData.data.name, { expires: 1 });
        Cookies.set("type", userData.data.type, { expires: 1 });
        Cookies.set("mobile", userData.data.mobile, { expires: 1 });
        setMessage(userData.message); // Set success message
        setMessageType("success");
        router.push('/dashboard'); // Redirect to the dashboard on success
      } else {
        // Handle error responses
        setEmail(""); // Reset email input
        setPassword(""); // Reset password input
        setName(""); // Reset name input
        setMobile(""); // Reset mobile input
        setMessage(userData.message); // Set error message
        setMessageType("error");
      }
    } catch (error) {
      console.error('An error occurred:', error); // Log error to console
      setMessage("An error occurred. Please try again."); // Set generic error message
      setMessageType("error");
    }
  };

  // Function to handle Google Sign-In (placeholder for future implementation)
  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked"); // Log to console when Google Sign-In is clicked
  };

  return (
    <>
      {/* Message box for displaying feedback messages */}
      <MessageBox
        message={message}
        type={messageType}
        onClose={() => setMessage("")} // Close message box
      />
      {/* Main container with background image */}
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/path/to/forest-background.jpg")' }}>
        <div className="relative w-96">
          {/* Back button */}
          <button
            onClick={() => router.back()} // Go back to the previous page
            className="absolute top-2 -left-24 bg-red-500 rounded-full text-white text-xl flex items-center justify-center w-10 h-10"
          >
            &#8592;
          </button>

          {/* Signup form container */}
          <div className="bg-black bg-opacity-60 p-8 rounded-lg w-96 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Signup</h2> {/* Form title */}
            </div>

            {/* Signup form */}
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Input for Name */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Update name state on change
                  className="w-full px-4 py-2 text-black rounded-full"
                  required
                />
              </div>

              {/* Input for Mobile Number */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)} // Update mobile state on change
                  className="w-full px-4 py-2 text-black rounded-full"
                  required
                />
              </div>

              {/* Input for Email */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on change
                  className="w-full px-4 py-2 text-black rounded-full"
                  required
                />
                {/* Email icon */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-black rounded-full p-2">
                  <FaEnvelope className="text-gray-500" />
                </div>
              </div>

              {/* Input for Password */}
              <input
                type="password"
                placeholder="8 Character Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on change
                className="w-full px-4 py-2 text-black rounded-full"
                required
              />
              {/* Signup button */}
              <button
                type="submit"
                className="w-full py-2 bg-red-500 rounded-full font-bold text-white"
              >
                SignUp
              </button>
            </form>

            {/* Alternative sign-in option */}
            <div className="text-center mt-4">
              <p>or</p>
              <button
                onClick={handleGoogleSignIn} // Call Google Sign-In function
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
