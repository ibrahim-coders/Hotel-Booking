import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/Dashboard/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex gap-4 ">
      {/* sideBar */}
      <div className=" fixed top-0 left-0 z-10 h-screen pr-2 overflow-y-auto">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
