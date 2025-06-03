import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home';
import AboutPages from '../pages/About/AboutPages';
import Contact from '../pages/Contact/Contact';
import Login from '../pages/Auth/Login';
import ErrorPage from '../pages/Error/ErrorPages';
import Register from '../pages/Auth/Register';
import Profile from '../pages/Profile.jsx';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import DashboardHome from '../pages/Dashboard/DashboardHome.jsx';
import AddHotel from '../pages/Dashboard/AddHotel.jsx';
import Hotels from '../pages/Hotels/Hotels.jsx';
import HotelDetails from '../pages/HotelDetails.jsx';
import ChackOut from '../components/ChackOut.jsx';
import PaymentSuccess from '../components/PaymentSuccess.jsx';
import BrowseHotels from '../pages/Dashboard/Customers/BrowseHotels.jsx';
import RoomBooking from '../pages/Dashboard/Customers/RoomBooking.jsx';
import MyBookings from '../pages/Dashboard/Customers/MyBookings.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Overview from '../pages/Dashboard/Admin/Overview.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="about" element={<AboutPages />} />
          <Route path="contact" element={<Contact />} />
          <Route path="payment" element={<ChackOut />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Auth routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Dashboard layout and nested routes */}
        <Route
          path="/deshboard"
          element={
            <PrivateRoute allowedRoles={['Admin', 'Customer']}>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          {/* Admin only */}
          <Route
            index
            element={
              <PrivateRoute allowedRoles={['Admin']}>
                <Overview />
              </PrivateRoute>
            }
          />
          <Route
            path="add-hotel"
            element={
              <PrivateRoute allowedRoles={['Admin']}>
                <AddHotel />
              </PrivateRoute>
            }
          />
          {/* Customer only */}
          <Route
            index
            path="browese-hotel"
            element={
              <PrivateRoute allowedRoles={['Customer']}>
                <BrowseHotels />
              </PrivateRoute>
            }
          />
          <Route
            path="room-booking"
            element={
              <PrivateRoute allowedRoles={['Customer']}>
                <RoomBooking />
              </PrivateRoute>
            }
          />
          <Route
            path="my-Bookings"
            element={
              <PrivateRoute allowedRoles={['Customer']}>
                <MyBookings />
              </PrivateRoute>
            }
          />
        </Route>
        {/* Error fallback */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
