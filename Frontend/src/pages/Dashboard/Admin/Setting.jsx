import {
  FaBell,
  FaCog,
  FaCreditCard,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';

const Setting = () => {
  const logout = useAuthStore(state => state.logout);
  return (
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
  );
};

export default Setting;
