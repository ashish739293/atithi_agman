import { CalendarIcon, LinkIcon, UserIcon, ShareIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const EventCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mx-auto mt-8 border border-gray-200 flex items-center justify-between">
      
      {/* Left Section */}
      <div className="flex items-start space-x-4">
        {/* Event Title with Icon */}
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <UserIcon className="w-5 h-5 text-gray-800" />
            <span className="text-xl font-semibold text-gray-800">John's Wedding</span>
          </div>
          
          {/* Event Link with Icon */}
          <a
            href="https://johnswedding.atithiagman.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-blue-500 flex items-center"
          >
            <LinkIcon className="w-4 h-4 mr-1" />
            johnswedding.atithiagman.com
          </a>

          {/* Event Stats */}
          <div className="flex space-x-2 mt-2">
            <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
              Total Sent: 1550
            </span>
            <span className="bg-[#d4af37] text-black px-3 py-1 rounded-full text-sm font-semibold">
              Total Received: 1450
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end space-y-2">
        {/* Date */}
        <div className="flex items-center text-gray-500 space-x-1">
          <CalendarIcon className="w-5 h-5" />
          <span className="text-sm">11/November/2024</span>
        </div>

        {/* Share Button */}
        <button className="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 text-sm font-semibold space-x-1">
          <ShareIcon className="w-4 h-4" />
          <span>Share</span>
        </button>

        {/* Edit and Delete Actions */}
        <div className="flex space-x-4">
          <button className="text-red-600 font-semibold text-sm hover:text-red-700 flex items-center space-x-1">
            <PencilIcon className="w-4 h-4 text-gray-800" />
            <span>Edit</span>
          </button>
          <button className="text-red-600 font-semibold text-sm hover:text-red-700 flex items-center space-x-1">
            <TrashIcon className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
