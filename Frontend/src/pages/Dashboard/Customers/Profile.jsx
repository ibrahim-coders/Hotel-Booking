import { FaEdit, FaUser } from 'react-icons/fa';
import { MdLock, MdOutlineMailOutline } from 'react-icons/md';
import useAuthStore from '../../../store/authStore';
import { useState } from 'react';
import useAxiosSequrity from '../../../hooks/useCustomer';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import CustomerProfile from './CustomerProfile';

const Profile = () => {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const [activeTab, setActiveTab] = useState('personal');
  const [isUpdate, setUpdate] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const axiosSequrity = useAxiosSequrity();

  const updateUserMutation = useMutation({
    mutationFn: async ({ fullName, email }) => {
      const res = await axiosSequrity.patch('/user/updateUser', {
        fullName,
        email,
      });
      return res.data;
    },
    onSuccess: data => {
      setUser(data.user);
      setUpdate(false);
      toast.success('Profile updated!');
    },
    onError: error => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Update failed!');
      }
    },
  });

  const handleUserUpdate = e => {
    e.preventDefault();
    updateUserMutation.mutate({ fullName, email });
  };

  const changePasswordMutation = useMutation({
    mutationFn: async ({ currentPassword, newPassword }) => {
      const res = await axiosSequrity.patch('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      console.log(res.data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Password updated!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    },
    onError: error => {
      toast.error(error.response?.data?.message || 'Password update failed!');
    },
  });
  const handlePasswordChange = e => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    changePasswordMutation.mutate({ currentPassword, newPassword });
  };
  return (
    <div className="w-full rounded shadow mx-2 pt-10 overflow-y-auto">
      <CustomerProfile />
      <div className="flex justify-between text-center p-4 shadow">
        <div className="text-start">
          <h2 className="text-xl font-semibold">My Profile</h2>
          <p className="text-gray-600 text-sm tracking-tighter">
            View and update your personal information
          </p>
        </div>
        <div onClick={() => setUpdate(!isUpdate)}>
          <button className="flex items-center gap-2 border border-gray-500 px-3 py-2 rounded cursor-pointer shadow">
            <FaEdit className="size-4" /> {isUpdate ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-4 w-full bg-gray-100 pl-2">
        <button
          className={`flex gap-2 text-gray-600 px-3 py-2 text-sm cursor-pointer ${
            activeTab === 'personal'
              ? 'bg-white text-blue-600 font-semibold shadow'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('personal')}
        >
          <FaUser className="size-4" /> Personal Info
        </button>
        <button
          className={`flex gap-2 text-gray-600 px-3 py-2 text-sm cursor-pointer ${
            activeTab === 'security'
              ? 'bg-white text-blue-600 font-semibold shadow'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('security')}
        >
          <MdLock className="size-4" />
          Security
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 max-w-sm">
        {activeTab === 'personal' && !isUpdate && (
          <>
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              Personal Information
            </h2>
            <div className="flex w-full gap-4 flex-wrap">
              {/* User Name */}
              <div className="w-full md:w-1/2">
                <label className="text-sm text-gray-400">Full Name</label>
                <h3 className="text-gray-600 text-sm tracking-tight flex gap-2 items-center">
                  <FaUser className="size-4" /> {user?.fullName || 'N/A'}
                </h3>
              </div>
              {/* User Email */}
              <div className="w-full md:w-1/2">
                <label className="text-sm text-gray-400">Email</label>
                <h3 className="text-gray-600 text-sm tracking-tight flex gap-2 items-center">
                  <MdOutlineMailOutline className="size-4" />{' '}
                  {user?.email || 'N/A'}
                </h3>
              </div>
            </div>
          </>
        )}

        {activeTab === 'personal' && isUpdate && (
          <>
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              Update Personal Information
            </h2>
            <form onSubmit={handleUserUpdate} className="flex gap-4 flex-wrap">
              {/* User Name */}
              <div className="flex flex-col w-full ">
                <label className="text-sm text-gray-400">Full Name</label>
                <h3 className="text-gray-600 text-sm tracking-tight flex gap-2 items-center">
                  <FaUser className="size-4" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
                  />
                </h3>
              </div>
              {/* User Email */}
              <div className="flex flex-col w-full ">
                <label className="text-sm text-gray-400">Email</label>
                <h3 className="text-gray-600 text-sm tracking-tight flex gap-2 items-center">
                  <MdOutlineMailOutline className="size-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
                  />
                </h3>
              </div>
              {/* Save Button */}
              <div className="w-full mt-4">
                <button
                  type="submit"
                  disabled={updateUserMutation.isPending}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  {updateUserMutation.isPending ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </>
        )}

        {activeTab === 'security' && (
          <div className="max-w-sm p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Change your password
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Update your password and manage your account security settings.
            </p>
            <form className="space-y-4" onSubmit={handlePasswordChange}>
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                disabled={changePasswordMutation.isPending}
              >
                {changePasswordMutation.isPending
                  ? 'Updating...'
                  : 'Update Password'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
