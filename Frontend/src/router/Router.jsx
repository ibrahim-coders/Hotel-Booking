import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home';
import AboutPages from '../pages/About/AboutPages';
import Contact from '../pages/Contact/Contact';
import Login from '../pages/Auth/Login';
import ErrorPage from '../pages/Error/ErrorPages';
import Register from '../pages/Auth/Register';
import Hotels from '../pages/Hotels/Hotels.jsx';
import HotelDetails from '../pages/HotelDetails.jsx';
import ChackOut from '../components/ChackOut.jsx';
import PaymentSuccess from '../components/PaymentSuccess.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import DashboardCustomer from '../pages/Dashboard/Customers/DashboardCustomer.jsx';
import useAuthStore from '../store/authStore.js';
import AdminDeshboard from '../pages/Dashboard/Admin/AdminDeshboard.jsx';
import AdminProfile from '../pages/Dashboard/Admin/AdminProfile.jsx';
import CustomerProfile from '../pages/Dashboard/Customers/CustomerProfile.jsx';

const RoleBasedDashboard = () => {
  const user = useAuthStore(state => state.user);
  if (!user) return null;
  if (user.role === 'Admin') return <AdminDeshboard />;
  if (user.role === 'Customer') return <DashboardCustomer />;
  return Navigate('/login');
};

const RoleBasedProfile = () => {
  const user = useAuthStore(state => state.user);
  if (!user) return null;
  if (user.role === 'Admin') return <AdminProfile />;
  if (user.role === 'Customer') return <CustomerProfile />;
  return Navigate('/login');
};
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
        </Route>

        {/* Auth routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Dashboard layout and nested routes */}
        <Route
          path="/deshboard"
          element={
            <PrivateRoute allowedRoles={['Admin', 'Customer']}>
              <RoleBasedDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute allowedRoles={['Admin', 'Customer']}>
              <RoleBasedProfile />
            </PrivateRoute>
          }
        />

        {/* Error fallback */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
