import React from 'react';

const Analytics = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Revenue Analytics Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Revenue Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">This Month</p>
            <h3 className="text-2xl font-semibold text-blue-700">$284,750</h3>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Last Month</p>
            <h3 className="text-2xl font-semibold text-blue-700">$253,120</h3>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Growth</p>
            <h3 className="text-2xl font-semibold text-green-600">+12.5%</h3>
          </div>
        </div>
      </div>

      {/* Booking Trends Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Booking Trends
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Bookings</p>
            <h3 className="text-xl font-semibold text-gray-800">3,421</h3>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Confirmed</p>
            <h3 className="text-xl font-semibold text-green-700">2,890</h3>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Pending</p>
            <h3 className="text-xl font-semibold text-yellow-600">342</h3>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Cancelled</p>
            <h3 className="text-xl font-semibold text-red-600">189</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
