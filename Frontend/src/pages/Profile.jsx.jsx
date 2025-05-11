import { useState } from 'react';
import useAuthStore from '../store/authStore';
import useAxiosePublic from '../hooks/useAxiosPublic';
import ImageUploader from '../components/common/ImageUploade';
import toast from 'react-hot-toast';

const Profile = () => {
  const user = useAuthStore(state => state.user);
  const axiosPublic = useAxiosePublic();
  const [users, setUser] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    password: '',
    photoURL: user?.photoURL || '',
    imageFile: null,
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (previewUrl, file) => {
    setUser(prev => ({
      ...prev,
      photoURL: previewUrl,
      imageFile: file, // storing actual file
    }));
  };

  const handleUpdate = async () => {
    if (!user?.id) {
      console.error('User ID is missing!');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', users.fullName);
    formData.append('email', users.email);
    formData.append('password', users.password);
    if (users.imageFile) {
      formData.append('image', users.imageFile);
    }

    try {
      const res = await axiosPublic.patch(
        `/users/update-profile/${user?.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success(res.data?.message || 'Profile updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Your Profile
        </h2>
        <div className="space-y-4">
          <div className="flex justify-center items-center text-center">
            <div className="flex flex-col items-center">
              <label htmlFor="profile-image" className="cursor-pointer">
                <img
                  className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover mb-3"
                  src={users.photoURL}
                  alt="User"
                />
              </label>

              {/* ImageUploader */}
              <ImageUploader onImageUpload={handleImageUpload} />

              <h2 className="text-2xl font-semibold tracking-tighter">
                {user?.role} ID: {user?._id?.slice(6, 14)}
              </h2>
            </div>
          </div>

          {/* Full Name */}
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Name:</span>
            <input
              name="fullName"
              className="border border-gray-300 rounded px-2 py-1"
              type="text"
              value={users.fullName}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Email:</span>
            <input
              name="email"
              className="border border-gray-300 rounded px-2 py-1"
              type="email"
              value={users.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password */}
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">New Password:</span>
            <input
              name="password"
              className="border border-gray-300 rounded px-2 py-1"
              type="password"
              value={users.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Update Button */}
          <button
            onClick={handleUpdate}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
