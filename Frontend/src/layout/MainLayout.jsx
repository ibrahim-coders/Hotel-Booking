import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const loaction = useLocation();
  const noLayouts = ['/login', 'register'];
  const isLayoutHidden = noLayouts.includes(loaction.pathname);
  return (
    <div className=" min-h-screen">
      {!isLayoutHidden && <Navbar />}
      <Outlet />
      {!isLayoutHidden && <Footer />}
    </div>
  );
};

export default MainLayout;
