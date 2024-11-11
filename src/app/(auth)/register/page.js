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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [pincode, setPincode] = useState("");
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
        body: JSON.stringify({ username, email, password, confirmPassword, name, mobile, address1, address2, pincode }), // Send user data as JSON
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
        router.push('/user-dashboard'); // Redirect to the dashboard on success
      } else {
        // Handle error responses
        // setEmail(""); // Reset email input
        // setPassword(""); // Reset password input
        // setName(""); // Reset name input
        // setUsername(""); // Reset username input
        // setMobile(""); // Reset mobile input
        // setAddress1(""); // Reset Address1 input
        // setAddress2(""); // Reset Address2 input
        // setPincode(""); // Reset Pincode input
        setMessage(userData.message || userData.error); // Set error message
        setMessageType("error");
      }
    } catch (error) {
      console.error('An error occurred:', error); // Log error to console
      setMessage("An error occurred. Please try again."); // Set generic error message
      setMessageType("error");
    }
  };


  const goToLogin = () => {
    router.push('/login');
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
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: 'url("background-image.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Overlay for darkening and slightly blurring the background */}
        <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>

        {/* Centered login card */}
        <div className="relative w-full max-w-4xl mx-auto p-8 bg-white bg-opacity-30 backdrop-blur-sm rounded-3xl shadow-lg text-black z-10">
          <button
            onClick={() => router.back()}
            className="absolute top-8 left-10 bg-yellow-500 rounded-full text-white text-2xl flex items-center justify-center w-8 h-8"
          >
            &#8592;
          </button>

          <h1 className="text-center text-2xl font-semibold text-yellow-500 mb-4">
            Welcome on Atithi Agman
          </h1>
          
          <p className="text-right text-white cursor-pointer mb-3" onClick={goToLogin}>
            Already Registered
          </p>

          <form onSubmit={handleSignup} className="space-y-4">

            <div className="flex items-center justify-between mb-4 space-x-4">
            <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 text-black rounded-full"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-black rounded-full"
                required
              />
            </div>


            <div className="flex items-center justify-between mb-4 space-x-4">
            <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-2 text-black rounded-full"
                required
              />
              <input
                type="text"
                placeholder="Address Line 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full px-4 py-2 text-black rounded-full"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-4 space-x-4">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 text-black rounded-full"
                required
              />
              <input
                type="text"
                placeholder="Address Line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="w-full px-4 py-2 text-black rounded-full"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-4 space-x-4">
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-black rounded-full"
                required
              />
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-4 py-2 text-black rounded-full"
                required
              />
            </div>

            <div className="flex items-center justify-start mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-1/2  px-4 py-2 text-black rounded-full"
                required
              />
            </div>

            <div className="flex items-center justify-end mb-4">
            <button
              type="submit"
              className="w-1/2 py-2 bg-yellow-500 rounded-full font-bold text-white"
            >
              Signup
            </button>
            </div>
          </form>
        </div>
      </div>


    </>
  );
}
