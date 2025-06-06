import useAuthStore from '../../../store/authStore';
import { useRef, useState } from 'react';
import uploadImage from '../../../utils/uploadImage';
import toast from 'react-hot-toast';
import useAxiosSequrity from '../../../hooks/useCustomer';

const CustomerProfile = () => {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const inputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const axiosSequrity = useAxiosSequrity();

  const fastWord = name => {
    if (!name) return '';
    const words = name.trim().split(' ');
    let initials = '';
    for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0];
    }
    return initials.toUpperCase();
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    const imageUrl = await uploadImage(selectedFile);
    if (!imageUrl) {
      toast.error('Image upload failed!');
      setUploading(false);
      return;
    }

    try {
      const res = await axiosSequrity.patch('/updateImage', {
        image: imageUrl,
      });
      setUser(res.data.user);
      setPreviewImage(null);
      setSelectedFile(null);
      toast.success('Image updated!');
    } catch (error) {
      toast.error(error.message);
    }
    setUploading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 flex flex-col md:flex-row gap-4">
      {/* Sidebar */}

      <div className="px-4 flex flex-col items-center gap-4 py-6">
        {/* Profile Image */}
        <div
          className="relative h-20 w-20 overflow-hidden rounded-full bg-slate-300 text-xl font-semibold text-white cursor-pointer"
          onClick={handleImageClick}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : user.image ? (
            <img
              src={user.image}
              alt={user.fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center">
              {fastWord(user.fullName)}
            </span>
          )}
          <span className="absolute top-[5px] left-2.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Upload Button */}
        {selectedFile && (
          <button
            onClick={handleImageUpload}
            disabled={uploading}
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        )}

        {/* Username */}
        <h1 className="text-xl font-bold">{user?.fullName}</h1>
      </div>
    </div>
  );
};

export default CustomerProfile;
