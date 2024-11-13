export default function Footer() {
    return (
      <div className="bg-black text-white text-center py-8">
        <div className="container mx-auto">
          {/* Main Footer Text */}
          <p className="text-lg sm:text-xl mb-6 text-gray-400">© 2024 Secure App. All rights reserved.</p>
  
          {/* Additional Footer Information */}
          <div className="mt-4 space-y-6 sm:space-y-0 sm:flex sm:justify-center sm:space-x-12 sm:mt-8">
            <div className="flex flex-col items-center">
              <p className="font-semibold text-yellow-400">Address</p>
              <p className="text-gray-300 text-sm">Vishalnagar society near Merigold Residency, Valak, Surat (395006)</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-yellow-400">Mobile Number</p>
              <p className="text-gray-300 text-sm">+91 6351569933</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-yellow-400">Mail ID</p>
              <p className="text-gray-300 text-sm">radhalegaladvice@gmail.com</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-yellow-400">Certificate No</p>
              <p className="text-gray-300 text-sm">UDYAM-GJ-22-0431232</p>
            </div>
          </div>
  
          {/* Social Icons */}
          <div className="mt-6 flex justify-center space-x-8">
            <a href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
            <a href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
  