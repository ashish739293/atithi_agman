export default function StatCard({ title, value }) {
    return (
       <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
          <h2 className="text-lg font-medium">{title}</h2>
          <p className="text-2xl font-bold mt-2">{value}</p>
       </div>
    );
 }
 