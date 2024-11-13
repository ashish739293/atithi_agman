"use client";

import { usePathname } from "next/navigation";
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import './globals.css'; // Adjust the path as necessary

export default function Layout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Petit+Formal+Script&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 text-gray-900 w-full">
        <div className="flex flex-col min-h-screen w-full">
          {/* Header */}
          {!isAuthPage && (
            <Header />
          )}

          {/* Main Content */}
          <main className="flex-1 w-full">
            {children}
          </main>

          {/* Footer */}
          {!isAuthPage && (
            <Footer />
          )}
        </div>
      </body>
    </html>
  );
}
