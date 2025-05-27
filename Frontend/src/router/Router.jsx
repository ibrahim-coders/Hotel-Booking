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
        {/* authtentication file */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* error file */}
        <Route path="*" element={<ErrorPage />} />
        {/* deshboard */}
        <Route>
          <Route path="/deshboard" element={<DashboardLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
