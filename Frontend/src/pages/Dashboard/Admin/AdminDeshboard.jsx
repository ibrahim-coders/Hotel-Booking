import { useState } from 'react';

import { FaCalendarAlt } from 'react-icons/fa';

import useAuthStore from '../../../store/authStore';
import Footer from '../../../components/Footer';
import { useQuery } from '@tanstack/react-query';
import useAxiosCustomer from '../../../hooks/useCustomer';
import Navbar from '../../../components/Navbar';
import Overview from './Overview';
import HotelManagement from './HotelManagement';
import Booking from './Booking';
import Users from './Users';
import Analytics from './Analytics';
import Setting from './Setting';

const AdminDeshboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const user = useAuthStore(state => state.user);
  const axiosCustomer = useAxiosCustomer();

  // if(activeTab===)
  const { data: checkOutDate } = useQuery({
    queryKey: ['checkout', user],
    queryFn: async () => {
      const res = await axiosCustomer.get('/checkout', {
        params: { userEmail: user?.email },
      });
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header Section */}
      <section className="bg-[#0F6299] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6  mt-10">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.fullName}!
              </h1>
              <p className="text-blue-100 ">
                Manage your hotel booking platform
              </p>
              <p className="text-blue-100 mb-4">
                Member since{' '}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : ''}
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="h-4 w-4" />
                  <span>{checkOutDate?.bookings?.length} Total Bookings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
            {/* Overview */}
            <button
              className={`flex-1 min-w-[120px] px-4 py-2 rounded font-semibold transition cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-blue-100 text-blue-700 shadow cursor-pointer'
                  : 'bg-white text-blue-700 shadow'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>

            {/* Hotel */}
            <button
              className={`flex-1 min-w-[120px] px-4 py-2 rounded font-semibold transition cursor-pointer ${
                activeTab === 'hotel'
                  ? 'bg-blue-100 text-blue-700 shadow '
                  : 'bg-white text-blue-700 shadow'
              }`}
              onClick={() => setActiveTab('hotel')}
            >
              Hotel
            </button>

            {/* Booking */}
            <button
              className={`flex-1 min-w-[120px] px-4 py-2 rounded font-semibold transition cursor-pointer ${
                activeTab === 'booking'
                  ? 'bg-blue-100 text-blue-700 shadow cursor-pointer'
                  : 'bg-white text-blue-700 shadow'
              }`}
              onClick={() => setActiveTab('booking')}
            >
              Booking
            </button>

            {/* User */}
            <button
              className={`flex-1 min-w-[120px] px-4 py-2 rounded font-semibold transition cursor-pointer ${
                activeTab === 'user'
                  ? 'bg-blue-100 text-blue-700 shadow cursor-pointer'
                  : 'bg-white text-blue-700 shadow'
              }`}
              onClick={() => setActiveTab('user')}
            >
              User
            </button>

            {/* Analytics */}
            <button
              className={`flex-1 min-w-[120px] px-4 py-2 rounded font-semibold transition cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-blue-100 text-blue-700 shadow cursor-pointer'
                  : 'bg-white text-blue-700 shadow'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>

            {/* Settings */}
            <button
              className={`flex-1 min-w-[120px] px-4 py-2 rounded font-semibold transition cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-blue-100 text-blue-700 shadow cursor-pointer'
                  : 'bg-white text-blue-700 shadow'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>

          {/* Bookings Tab */}
          {activeTab === 'overview' && (
            <>
              <Overview />
            </>
          )}

          {/* Settings Tab */}
          {activeTab === 'hotel' && <HotelManagement />}

          {/* booking Tab */}
          {activeTab === 'booking' && <Booking />}
          {/* User Tab */}
          {activeTab === 'user' && <Users />}
          {/* analytics Tab */}
          {activeTab === 'analytics' && <Analytics />}
          {/* settings Tab */}
          {activeTab === 'settings' && <Setting />}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDeshboard;
