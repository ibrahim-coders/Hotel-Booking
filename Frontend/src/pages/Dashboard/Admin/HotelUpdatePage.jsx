import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSequrity from '../../../hooks/useCustomer';
import HotelImageUpdate from './HotelImageUpdate';
import uploadImage from '../../../utils/uploadImage';

const HotelUpdatePage = ({ hotel, onBack }) => {
  const axiosSequrity = useAxiosSequrity();
  const [form, setForm] = useState({
    name: hotel.name || '',
    location: hotel.location || '',
    rating: hotel.rating || '',
    price: hotel.price || '',
    status: hotel.status || '',
    category: hotel.category || '',
    description: hotel.description || '',
  });
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(hotel.images || []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    let imageUrls = images;

    if (images.length && images[0] instanceof File) {
      imageUrls = [];
      for (const file of images) {
        const url = await uploadImage(file);
        if (url) imageUrls.push(url);
      }
    }

    const updatedForm = { ...form, images: imageUrls };
    try {
      await axiosSequrity.patch(`/updateHotel/${hotel._id}`, updatedForm);
      toast.success('Hotel updated!');
      if (onBack) onBack();
    } catch (err) {
      console.log(err);
      toast.error('Update failed!');
    }
    setLoading(false);
  };

  return (
    <div className="w-full md:max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <button
        onClick={onBack}
        className="mb-4 px-3 py-1 bg-blue-500 text-white rounded"
      >
        Back
      </button>
      <h2 className="text-xl font-bold mb-4">Update Hotel</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          {' '}
          <div className="w-1/2">
            <label className="block text-sm">Hotel Name</label>
            <input
              className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Hotel Name"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm">Hotel Loaction</label>
            <input
              className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              required
            />
          </div>
        </div>
        <div className="flex gap-2">
          {' '}
          {/* Rating */}
          <div className="w-1/2">
            <label className="block text-sm">Hotel Rating</label>
            <input
              className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              placeholder="Rating"
              type="number"
              min="0"
              max="5"
              required
            />
          </div>
          {/* hotel price */}
          <div className="w-1/2">
            <label className="block text-sm">Hotel Price</label>
            <input
              className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              min="0"
              required
            />
          </div>
        </div>
        <div className="flex gap-3">
          {/* Status */}
          <div className="w-full">
            <label className="block text-sm ">Status</label>
            <select
              className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm ">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
            >
              <option value="">Select Category</option>
              <option value="luxury">Luxury</option>
              <option value="resort">Resort</option>
              <option value="business">Business</option>
              <option value="boutique">Boutique</option>
              <option value="beach">Beach</option>
              <option value="lodge">Lodge</option>
            </select>
          </div>
        </div>
        {/* hotel imges update page */}
        <div className="w-full">
          {' '}
          <label className="block text-sm">Image Select</label>
          <HotelImageUpdate imageValue={images} setHotelData={setImages} />
        </div>
        {/* Description */}
        <label className="block text-sm">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="your description here..."
          className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded mt-2"
        >
          {loading ? 'Updating...' : 'Update Hotel'}
        </button>
      </form>
    </div>
  );
};

export default HotelUpdatePage;
