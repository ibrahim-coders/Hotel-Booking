import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { IoMdAdd } from 'react-icons/io';
import HotelImageSeleact from '../../components/HotelImageSeleact';
import uploadImage from '../../utils/uploadImage'; // This must be an async function that returns a URL
import useAxiosePublic from '../../hooks/useAxiosPublic';

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// Zod Validation Schema
const schema = z.object({
  name: z.string().min(1, 'Hotel name is required'),
  location: z.string().min(1, 'Location is required'),
  price: z.string().min(1, 'Price is required'),
  featured: z
    .array(z.string().min(1))
    .min(1, 'At least one featured item is required'),
  images: z
    .array(
      z
        .any()
        .refine(file => file?.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
        .refine(
          file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
          'Invalid image type'
        )
    )
    .min(1, 'At least one image is required')
    .max(3, 'You can upload up to 3 images'),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .max(200, { message: 'Description must be at most 200 characters long' }),
});

const AddHotel = () => {
  const [loading, setLoading] = useState(false);
  const [featuredInput, setFeaturedInput] = useState('');
  const [featuredList, setFeaturedList] = useState([]);
  const axiosPublic = useAxiosePublic();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
  });

  useEffect(() => {
    register('images');
    register('featured');
  }, [register]);

  const handleAddFeatured = () => {
    if (featuredInput.trim() !== '') {
      const updated = [...featuredList, featuredInput.trim()];
      setFeaturedList(updated);
      setValue('featured', updated);
      setFeaturedInput('');
    }
  };

  const onSubmit = async data => {
    setLoading(true);
    try {
      const imageFiles = data.images;
      console.log(imageFiles);
      const uploadedImageUrls = [];

      for (const file of imageFiles) {
        const url = await uploadImage(file);
        if (url) {
          uploadedImageUrls.push(url);
        }
      }

      const hotelData = {
        ...data,
        images: uploadedImageUrls,
      };

      console.log('Final Hotel Data:', hotelData);
      setLoading(false);
      // Simulate API call
      try {
        const res = axiosPublic.post('/hotels', hotelData);
        console.log(res.data);
        setLoading(true);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }

      setTimeout(() => {
        setLoading(false);
        reset();
        setFeaturedList([]);
        setFeaturedInput('');
      }, 1000);
    } catch (error) {
      console.error('Error uploading images:', error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Hotel</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm">Hotel Name</label>
            <input
              type="text"
              placeholder="Hotel Name"
              className="w-full p-2 border-2 border-sky-200 focus:border-sky-500 outline-none rounded"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-sm">Location</label>
            <input
              type="text"
              placeholder="Location"
              className="w-full p-2 border-2 border-sky-200 focus:border-sky-500 outline-none rounded"
              {...register('location')}
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
              placeholder="Price"
              className="w-full p-2 border-2 border-sky-200 focus:border-sky-500 outline-none rounded"
              {...register('price')}
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
                className="w-full p-2 border border-sky-300 rounded"
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
            {featuredList.length > 0 && (
              <ul className="text-sm mt-1 list-disc list-inside text-gray-600 space-y-0.5">
                {featuredList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <label className="block text-sm">Upload Images (Max 3)</label>
        <HotelImageSeleact
          imageValue={watch('images')}
          setHotelData={data => setValue('images', data)}
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
          className="w-full p-2 border-2 border-sky-200 focus:border-sky-500 outline-none rounded text-sm resize-y"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2 rounded-md cursor-pointer"
        >
          {loading ? 'Adding...' : 'Add Hotel'}
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
