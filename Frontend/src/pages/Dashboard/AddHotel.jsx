import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { IoMdAdd } from 'react-icons/io';
import uploadImage from '../../utils/uploadImage';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Spinner from '../../components/Spinner';
import { toast } from 'react-hot-toast';
import HotelImageSelect from '../../components/HotelImageSeleact';

// Constants
// const MAX_FILE_SIZE = 5 * 1024 * 1024;
// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp',
// ];

// Zod Schema
const schema = z.object({
  name: z.string().min(1, 'Hotel name is required'),
  location: z.string().min(1, 'Location is required'),
  price: z.string().min(1, 'Price is required'),
  featured: z
    .array(z.string().min(1))
    .min(1, 'At least one featured item is required'),
  images: z
    .array(z.any())
    .min(1, 'At least one image is required')
    .max(3, 'You can upload up to 3 images'),
  description: z.string().min(10).max(200),
});

const AddHotel = () => {
  const [loading, setLoading] = useState(false);
  const [featuredInput, setFeaturedInput] = useState('');
  const [featuredList, setFeaturedList] = useState([]);
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      location: '',
      price: '',
      featured: [],
      images: [],
      description: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    register('images');
    register('featured');
  }, [register]);

  useEffect(() => {
    setValue('featured', featuredList);
  }, [featuredList, setValue]);

  const handleAddFeatured = () => {
    if (featuredInput.trim()) {
      setFeaturedList(prev => [...prev, featuredInput.trim()]);
      setFeaturedInput('');
    }
  };

  const handleRemoveFeatured = index => {
    const updated = featuredList.filter((_, i) => i !== index);
    setFeaturedList(updated);
  };

  const onSubmit = async data => {
    setLoading(true);
    try {
      const uploadedImageUrls = [];
      for (const file of data.images) {
        const url = await uploadImage(file);
        if (url) uploadedImageUrls.push(url);
      }

      const hotelData = {
        ...data,
        price: Number(data.price),
        images: uploadedImageUrls,
      };

      const res = await axiosPublic.post('/hotels', hotelData, {
        withCredentials: true,
      });
      toast.success(res.data?.message);

      reset();
      setFeaturedList([]);
      setFeaturedInput('');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-full md:max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Hotel</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm">Hotel Name</label>
            <input
              type="text"
              {...register('name')}
              placeholder="Hotel Name"
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-sm">Location</label>
            <input
              type="text"
              {...register('location')}
              placeholder="Location"
              className="w-full p-2 border rounded"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm">Price</label>
            <input
              type="number"
              {...register('price')}
              placeholder="Price"
              className="w-full p-2 border rounded"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div className="w-1/2">
            <label className="block text-sm">Featured</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featuredInput}
                onChange={e => setFeaturedInput(e.target.value)}
                placeholder="Add Feature"
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={handleAddFeatured}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
              >
                <IoMdAdd className="text-xl" />
              </button>
            </div>
            {errors.featured && (
              <p className="text-red-500 text-sm">{errors.featured.message}</p>
            )}
            <ul className="text-sm mt-1 list-disc list-inside text-gray-600">
              {featuredList.map((item, i) => (
                <li key={i} className="flex items-center justify-between">
                  {item}
                  <button
                    onClick={() => handleRemoveFeatured(i)}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <label className="block text-sm">Upload Images (Max 3)</label>
        <HotelImageSelect
          imageValue={watch('images')}
          setHotelData={data => {
            setValue('images', data);
            trigger('images');
          }}
          errors={errors}
        />
        {errors.images && (
          <p className="text-red-500 text-sm">{errors.images.message}</p>
        )}

        <label className="block text-sm">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          placeholder="Write a brief description here..."
          className="w-full p-2 border rounded text-sm resize-y"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded"
        >
          {loading ? 'Adding...' : 'Add Hotel'}
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
