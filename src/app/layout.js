import { Button } from "@/components/ui/button";
import './globals.css'; // Adjust the path as necessary

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <header className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-2xl font-bold">Secure App</div>
              <nav>
                <Button>Login</Button>
              </nav>
            </div>
          </header>

          {/* Main Content */}  
          <main className="flex-1 container mx-auto p-4">{children}</main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white text-center py-4">
            <div className="container mx-auto">© 2024 Secure App. All rights reserved.</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
