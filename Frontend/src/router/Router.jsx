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

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPages />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Auth routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Dashboard layout and nested routes */}
        <Route path="/deshboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="add-hotel" element={<AddHotel />} />
        </Route>

        {/* Error fallback */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
