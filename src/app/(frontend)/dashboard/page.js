'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import { Bar } from 'react-chartjs-2';
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function Dashboard() {
   const barChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
         {
            label: 'Revenue',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(75,192,192,1)',
            data: [65, 59, 80, 81, 56, 55, 40],
         },
      ],
   };

   return (
      <div className="flex min-h-screen bg-gray-100">
         <Sidebar />
         <main className="flex-1 p-6 space-y-6">
            <Header title="Dashboard" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <StatCard title="Total Users" value="1,200" />
               <StatCard title="Revenue" value="$34,000" />
               <StatCard title="Tasks Completed" value="780" />
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
               <h2 className="text-xl font-bold mb-4">Monthly Revenue</h2>
               <Bar data={barChartData} />
            </div>
         </main>
      </div>
   );
}
