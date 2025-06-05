import { useState } from 'react';

import html2pdf from 'html2pdf.js';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCog,
  FaUser,
  FaCreditCard,
  FaBell,
  FaQuestionCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import { CiSaveDown1 } from 'react-icons/ci';
import useAuthStore from '../../../store/authStore';
import Footer from '../../../components/Footer';
import { useQuery } from '@tanstack/react-query';
import useAxiosCustomer from '../../../hooks/useCustomer';
import Spinner from '../../../components/Spinner';
import { Link } from 'react-router-dom';

const DashboardCustomer = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const user = useAuthStore(state => state.user);
  const axiosCustomer = useAxiosCustomer();
  const logout = useAuthStore(state => state.logout);
  const fastWord = name => {
    if (!name) return '';
    const words = name.trim().split(' ');
    let initials = '';
    for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0];
    }
    return initials.toUpperCase();
  };

  const { isLoading, data: checkOutDate } = useQuery({
    queryKey: ['checkout', user],
    queryFn: async () => {
      const res = await axiosCustomer.get('/checkout', {
        params: { userEmail: user?.email },
      });
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  // if (error)
  //   return (
  //     <div className="text-red-600 flex flex-justify-center items-center text-center h-screen">
  //       {error.message}
  //     </div>
  //   );

  const handleDownloadPDF = booking => {
    const element = document.createElement('div');
    element.style.padding = '20px';
    element.style.fontFamily = 'Arial, sans-serif';
    element.innerHTML = `
      <div style="border:1px solid #ccc; border-radius:8px; padding:20px; max-width:800px; margin:10px;">
        <h1 style="color:#0b3d91; text-align:center;">${booking.hotelName}</h1>
        <p style="text-align:center; color:gray; margin:10px 0">${
          booking.hotelLocation
        }, ${booking.city}, ${booking.country}</p>
        <hr/>
  
        <h2 style="color:#0b3d91;">Booking Details</h2>
        <table style="width:100%; margin-bottom:20px;">
          <tr>
            <td><strong>Guest:</strong> ${booking.userName}</td>
            <td><strong>Email:</strong> ${booking.userEmail}</td>
          </tr>
          <tr>
            <td><strong>Phone:</strong> ${booking.phone}</td>
            <td><strong>Guests:</strong> ${booking.guests} guest(s)</td>
          </tr>
          <tr>
            <td><strong>Check-in:</strong> ${new Date(
              booking.checkInDate
            ).toDateString()}</td>
            <td><strong>Check-out:</strong> ${new Date(
              booking.checkOutDate
            ).toDateString()}</td>
          </tr>
          <tr>
            <td><strong>Booking Date:</strong> ${new Date(
              booking.createdAt
            ).toDateString()}</td>
            <td><strong>Status:</strong> ${booking.paymentStatus}</td>
          </tr>
        </table>
  
        <h3 style="background-color:#0b3d91; color:white; padding:8px; border-radius:4px;">Pricing Summary</h3>
        <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
          <thead>
            <tr style="background:#f2f2f2;">
              <th style="padding:10px; border:1px solid #ddd;">Description</th>
              <th style="padding:10px; border:1px solid #ddd;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:10px; border:1px solid #ddd;">Hotel Booking</td>
              <td style="padding:10px; border:1px solid #ddd;">$${
                booking.totalPrice
              }</td>
            </tr>
         
            <tr style="background:#e6f7ff; font-weight:bold;">
              <td style="padding:10px; border:1px solid #ddd;">Total</td>
              <td style="padding:10px; border:1px solid #ddd;">$${booking.totalPrice.toFixed(
                2
              )}</td>
            </tr>
          </tbody>
        </table>
  
        <p><strong>Additional Info:</strong> Check-in from 1 PM, check-out by 11 AM. Free parking available on site.</p>
      </div>
    `;

    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: `booking-${booking.hotelName}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .save();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-[#0F6299] text-white px-4 py-3 flex items-center justify-between shadow">
        <Link to="/">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-2xl" />
            <span className="font-bold text-lg">Hotel Dashboard</span>
          </div>
        </Link>
      </nav>

      {/* Header Section */}
      <section className="bg-[#0F6299] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-slate-300 text-xl font-semibold text-white">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center">
                  {fastWord(user.fullName)}
                </span>
              )}
              <span className="absolute top-[5px] left-2.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.fullName}!
              </h1>
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
          <div className="flex gap-4 mb-8">
            <button
              className={`px-4 py-2 rounded-t-lg font-semibold transition ${
                activeTab === 'bookings'
                  ? ' bg-blue-100 text-blue-700 shadow cursor-pointer'
                  : 'bg-white text-blue-700 shadow'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              My Bookings
            </button>

            <button
              className={`px-4 py-2 rounded-t-lg font-semibold transition ${
                activeTab === 'settings'
                  ? ' bg-blue-100 text-blue-700 shadow cursor-pointer'
                  : 'bg-white text-blue-700 shadow'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="bg-white rounded shadow">
                <div className="p-4 border-b font-semibold text-lg">
                  Bookings
                </div>
                <div className="p-4 space-y-4">
                  {checkOutDate?.bookings &&
                  checkOutDate.bookings.length > 0 ? (
                    checkOutDate.bookings.map(booking => (
                      <div
                        key={booking._id}
                        className="flex items-center gap-4 p-4 border rounded-lg"
                      >
                        <img
                          src={booking.images}
                          alt={booking.hotelName}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">
                            {booking.hotelName}
                          </h4>
                          <p className="text-gray-600 flex items-center gap-1">
                            <FaMapMarkerAlt className="h-4 w-4" />
                            {booking.hotelLocation}
                          </p>
                          <p className="text-gray-500">
                            Check-in:{' '}
                            {booking.checkInDate
                              ? new Date(
                                  booking.checkInDate
                                ).toLocaleDateString()
                              : ''}{' '}
                            | Check-out:{' '}
                            {booking.checkOutDate
                              ? new Date(
                                  booking.checkOutDate
                                ).toLocaleDateString()
                              : ''}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                            {booking.paymentStatus}
                          </span>
                          <p className="text-lg font-semibold mt-2">
                            ${booking.totalPrice}
                          </p>
                          <button
                            onClick={() => handleDownloadPDF(booking)}
                            className="mt-2 px-3 py-1 flex text-center items-center gap-2 bg-[#0F6299] text-white rounded hover:bg-blue-900 transition text-sm cursor-pointer"
                          >
                            <CiSaveDown1 className="size-4 mt-1" /> Details
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-red-500 font-semibold mt-6">
                      ❌ No data found
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded shadow p-4">
                <div className="flex items-center gap-2 mb-4 text-blue-700 font-semibold">
                  <FaUser className="h-5 w-5" />
                  Profile Settings
                </div>
                <div className="space-y-3">
                  <Link
                    to="/profile"
                    className="w-full flex items-center gap-2 border border-gray-300 rounded py-2 px-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <FaUser className="h-4 w-4" />
                    Edit Profile
                  </Link>
                  <button className="w-full flex items-center gap-2 border border-gray-300 rounded py-2 px-3 hover:bg-gray-50">
                    <FaBell className="h-4 w-4" />
                    Notification Preferences
                  </button>
                  <button className="w-full flex items-center gap-2 border border-gray-300 rounded py-2 px-3 hover:bg-gray-50">
                    <FaCreditCard className="h-4 w-4" />
                    Payment Methods
                  </button>
                </div>
              </div>
              <div className="bg-white rounded shadow p-4">
                <div className="flex items-center gap-2 mb-4 text-blue-700 font-semibold">
                  <FaCog className="h-5 w-5" />
                  Account Settings
                </div>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-2 border border-gray-300 rounded py-2 px-3 hover:bg-gray-50">
                    <FaCog className="h-4 w-4" />
                    Privacy Settings
                  </button>
                  <button className="w-full flex items-center gap-2 border border-gray-300 rounded py-2 px-3 hover:bg-gray-50">
                    <FaQuestionCircle className="h-4 w-4" />
                    Help & Support
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 border border-red-300 text-red-600 rounded py-2 px-3 hover:bg-red-50 cursor-pointer"
                  >
                    <FaSignOutAlt className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardCustomer;
