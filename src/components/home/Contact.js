"use client";

import { useState } from "react";
import MessageBox from "@/components/MessageBox";

export default function Contact (){
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, mobile, message:contactMessage }),
      });
      const userData = await response.json();

      if (response.ok) {
        setMessage(userData.message);
        setMessageType("success");
        setName("");
        setMobile("");
        setContactMessage("");
      } else {
        setName("");
        setMobile("");
        setContactMessage("");
        setMessage(userData.message);
        setMessageType("error");
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <>
      <MessageBox
        message={message}
        type={messageType}
        onClose={() => setMessage("")}
      />

      <section className="py-8 px-4 md:py-16 md:px-8 flex flex-col md:flex-row justify-center md:space-x-16 space-y-8 md:space-y-0" id="contact-us">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h2 className="font-script text-[32px] md:text-[40px] font-normal leading-[40px] md:leading-[50px] text-yellow-500">
            Contact Us
          </h2>
          <p className="text-lg md:text-xl mb-4">Submit your contact details, and we will get back to you</p>
          <div className="flex items-center space-x-4">
            <img src="Phone_fill.png" alt="Phone" className="w-5 h-5 md:w-6 md:h-6" />
            <span>+91 909-999-9090</span>
          </div>
          <div className="flex items-center space-x-4">
            <img src="Message_alt_fill.png" alt="Email" className="w-5 h-5 md:w-6 md:h-6" />
            <span>support@atithiagman.com</span>
          </div>
          <p className="mt-8 mb-2">Follow us on</p>
          <div className="flex space-x-4">
            <a href="#"><img src="facebook.jpeg" alt="Facebook" className="w-5 h-5 md:w-6 md:h-6" /></a>
            <a href="#"><img src="instagram.png" alt="Instagram" className="w-5 h-5 md:w-6 md:h-6" /></a>
            <a href="#"><img src="linkedin.png" alt="LinkedIn" className="w-5 h-5 md:w-6 md:h-6" /></a>
            <a href="#"><img src="twitter.jpeg" alt="Twitter" className="w-5 h-5 md:w-6 md:h-6" /></a>
          </div>
        </div>

        <form className="max-w-lg w-full space-y-4" onSubmit={handleContact}>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <textarea
            placeholder="Message"
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full p-3 bg-[#DEAB55] text-black font-semibold rounded-full hover:bg-yellow-500 transition"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
