import DashboardHome from '../pages/Dashboard/DashboardHome';
import Sidebar from '../pages/Dashboard/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex gap-4">
      {/* sideBar */}
      <div className="w-64  h-full">
        <Sidebar />
      </div>
      <DashboardHome />
    </div>
  );
};

export default DashboardLayout;
