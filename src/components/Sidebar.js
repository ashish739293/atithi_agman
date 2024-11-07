import Link from 'next/link';

export default function Sidebar() {
   return (
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-5">
         <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
         <ul className="space-y-4">
            <li>
               <Link href="/dashboard" className="text-gray-300 hover:text-white">
                  Overview
               </Link>
            </li>
            <li>
               <Link href="/dashboard/reports" className="text-gray-300 hover:text-white">
                  Reports
               </Link>
            </li>
            <li>
               <Link href="/dashboard/settings" className="text-gray-300 hover:text-white">
                  Settings
               </Link>
            </li>
         </ul>
      </aside>
   );
}
