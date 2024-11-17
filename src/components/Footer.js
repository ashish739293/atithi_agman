export default function Footer() {
  return (
    <div className="bg-black text-white py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Additional Footer Information */}
        <div className="mt-6 sm:flex sm:flex-wrap sm:justify-between sm:space-y-0 sm:gap-y-8 lg:gap-y-10">
          
          <div className="flex flex-col items-center sm:items-start sm:w-1/2 md:w-1/4">
            <p className="font-semibold text-yellow-400">Mobile Number</p>
            <p className="text-gray-300 text-sm text-center sm:text-left">+91 6351569933</p>
          </div>
          <div className="flex flex-col items-center sm:items-start sm:w-1/2 md:w-1/4">
            <p className="font-semibold text-yellow-400">Mail ID</p>
            <p className="text-gray-300 text-sm text-center sm:text-left">radhalegaladvice@gmail.com</p>
          </div>
          <div className="flex flex-col items-center sm:items-start sm:w-1/2 md:w-1/4">
            <p className="font-semibold text-yellow-400">Certificate No</p>
            <p className="text-gray-300 text-sm text-center sm:text-left">UDYAM-GJ-22-0431232</p>
          </div>

          <div className="flex flex-col items-center sm:items-start sm:w-1/2 md:w-1/4">
            <p className="font-semibold text-yellow-400">Address</p>
            <p className="text-gray-300 text-sm text-center sm:text-left">
              Vishalnagar society near Merigold Residency, Valak, Surat (395006)
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-8 flex justify-center space-x-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <i className="fab fa-facebook-f text-2xl sm:text-3xl"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <i className="fab fa-twitter text-2xl sm:text-3xl"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <i className="fab fa-linkedin-in text-2xl sm:text-3xl"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <i className="fab fa-instagram text-2xl sm:text-3xl"></i>
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-gray-400 text-center py-4">
        <p className="text-sm sm:text-base">
          © 2024 Secure App. Designed to ensure your digital security with reliability and transparency. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
