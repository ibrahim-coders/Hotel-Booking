// Overview.jsx

import { BsCurrencyDollar } from 'react-icons/bs';
import { FaHome, FaUser } from 'react-icons/fa';
import { CiBookmark } from 'react-icons/ci';

const recentBookings = [
  {
    id: 'BK001',
    guest: 'John Smith',
    hotel: 'Grand Plaza Hotel',
    checkIn: '2024-06-15',
    checkOut: '2024-06-18',
    amount: 747,
    status: 'confirmed',
  },
  {
    id: 'BK002',
    guest: 'Sarah Johnson',
    hotel: 'Ocean Breeze Resort',
    checkIn: '2024-06-20',
    checkOut: '2024-06-25',
    amount: 1250,
    status: 'pending',
  },
  {
    id: 'BK003',
    guest: 'Mike Davis',
    hotel: 'Mountain Lodge',
    checkIn: '2024-06-22',
    checkOut: '2024-06-24',
    amount: 890,
    status: 'cancelled',
  },
];

const Overview = ({ hotelsData }) => {
  const safeHotelsData = Array.isArray(hotelsData) ? hotelsData : [];

  return (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="w-full shadow rounded p-4 bg-white">
          <h4 className="flex justify-between items-center">
            <span>Total Revenue</span>
            <BsCurrencyDollar className="size-4" />
          </h4>
          <h2 className="text-xl font-bold text-gray-950 mt-3">$284,750</h2>
          <p className="text-sm text-gray-600">+12.5% from last month</p>
        </div>

        {/* Total Users */}
        <div className="w-full shadow rounded p-4 bg-white">
          <h4 className="flex justify-between items-center">
            <span>Total Users</span>
            <FaUser className="size-4" />
          </h4>
          <h2 className="text-xl font-bold text-gray-950 mt-3">1,247</h2>
          <p className="text-sm text-gray-600">+12.5% from last month</p>
        </div>

        {/* Total Hotels */}
        <div className="w-full shadow rounded p-4 bg-white">
          <h4 className="flex justify-between items-center">
            <span>Total Hotels</span>
            <FaHome className="size-4" />
          </h4>
          <h2 className="text-xl font-bold text-gray-950 mt-3">1,247</h2>
          <p className="text-sm text-gray-600">+3 new this month</p>
        </div>

        {/* Total Bookings */}
        <div className="w-full shadow rounded p-4 bg-white">
          <h4 className="flex justify-between items-center">
            <span>Total Bookings</span>
            <CiBookmark className="size-4" />
          </h4>
          <h2 className="text-xl font-bold text-gray-950 mt-3">1,247</h2>
          <p className="text-sm text-gray-600">+18% from last month</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {recentBookings.map(booking => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{booking.guest}</p>
                  <p className="text-sm text-gray-600">{booking.hotel}</p>
                  <p className="text-xs text-gray-500">
                    {booking.checkIn} - {booking.checkOut}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-medium px-2 py-1 rounded ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {booking.status}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    ${booking.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
            View All Bookings
          </button>
        </div>

        {/* Top Performing Hotels */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Top Performing Hotels</h2>
          <div className="space-y-4">
            {safeHotelsData.slice(0, 3).map(hotel => (
              <div
                key={hotel.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{hotel.name}</p>
                  <p className="text-sm text-gray-600">{hotel.location}</p>
                  <p className="text-xs text-gray-500">
                    {hotel.rooms} rooms • ⭐ {hotel.rating}
                  </p>
                </div>
                <div className="text-right">
                  <p className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                    {hotel.status}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    ${hotel.revenue?.toLocaleString() ?? 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
