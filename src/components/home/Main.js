"use client"
import { useEffect, useState } from 'react';

export default function Main() {
  const [text, setText] = useState("");
  const toType = "Organize Your Events With 0% Food Wastage";
  const typingSpeed = 100;

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < toType.length) {
        setText((prev) => prev + toType[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    return () => clearInterval(typingInterval);
  }, []);

  const steps = [
    { title: "Connect with us", icon: "🤝" },
    { title: "Send Invites", icon: "✉️" },
    { title: "Receive Response", icon: "📬" },
    { title: "Final list of guests", icon: "📋" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center shadow-black-soft"
        style={{ backgroundImage: "url('food.jpeg')" }}
        id="what-we-offer"
      >
        <div className="text-center px-6 sm:px-8 lg:px-10 xl:px-12 max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-yellow-500">
            {text}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 lg:mb-10 px-4 sm:px-8 lg:px-12 text-white leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="m-6 sm:m-8 lg:m-12 py-8 sm:py-10 lg:py-14 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-yellow-500">
          We Manage Events In 4 Steps
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-yellow-100 rounded-lg p-6 flex flex-col items-center text-yellow-500 shadow-md hover:bg-yellow-200 transition duration-200"
            >
              <div className="text-4xl mb-3">{step.icon}</div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
            </div>
          ))}
        </div>
        <div className="mt-8 text-left text-base sm:text-lg md:text-xl lg:text-2xl px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto text-white leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a 
          type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
          the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled 
          it to make a type specimen book.
        </div>
      </section>
    </>
  );
}
