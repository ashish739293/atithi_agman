export default function Header({ title }) {
    return (
       <header className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex items-center space-x-4">
             <span className="text-gray-600">Welcome, User</span>
             <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="rounded-full w-10 h-10"
             />
          </div>
       </header>
    );
 }
 