import { useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { RiMapPin2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import useAxiosePublic from '../../hooks/useAxiosPublic';
import Spinner from '../../components/Spinner';
import HotelSection from './HotelSection';

const Hotels = () => {
  const axiosPublic = useAxiosePublic();
  const navigate = useNavigate();
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const response = await axiosPublic.get('/hotels');
        setFeaturedHotels(response?.data || []);
      } catch (error) {
        console.error('Failed to fetch featured hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelsData();
  }, [axiosPublic]);

  if (loading) return <Spinner />;

  return (
    <div className="py-10 max-h-screen flex flex-col">
      <div className="container mx-auto px-4">
        {/* Header section */}
        <div className="bg-[#1A4D8C] text-white py-20 mt-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover amazing hotels around the world with exceptional service
              and comfort.
            </p>
          </div>
        </div>

        {/* Hotel features */}
        <HotelSection
          search={featuredHotels.location}
          setFeaturedHotels={setFeaturedHotels}
        />

        {/* Hotels count */}
        <div className="my-8">
          <h2 className="text-2xl font-bold text-hotel-dark mb-2">
            {featuredHotels.length} Hotels Found
          </h2>
        </div>

        {/* Hotel cards */}
        {featuredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredHotels.map(hotel => (
              <div
                key={hotel._id}
                className="overflow-hidden shadow transition-transform duration-300 hover:-translate-y-1 bg-white rounded-lg"
              >
                {/* Hotel image */}
                <div className="relative h-48 overflow-hidden">
                  {hotel?.images?.[0] && (
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  )}
                  <button className="absolute top-3 right-3 bg-white text-blue-500 px-2 py-1 text-sm font-semibold rounded">
                    {hotel.category}
                  </button>
                </div>

                {/* Hotel content */}
                <div className="p-4">
                  {/* Title and rating */}
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-blue-400">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center">
                      <CiStar className="w-4 h-4 text-orange-500 fill-orange-600" />
                      <span className="text-sm font-medium ml-1">
                        {hotel.rating}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <RiMapPin2Line className="w-4 h-4 mr-1" />
                    <span>{hotel.location}</span>
                  </div>

                  {/* Features */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {hotel?.featured?.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-[#E6F4F1] text-gray-600 text-xs p-1  rounded hover:bg-[#255691] duration-200 transition-colors"
                      >
                        {feature}
                      </span>
                    ))}
                    <span className="bg-[#E6F4F1] text-gray-600 text-xs p-1  rounded hover:bg-[#255691] duration-200 transition-colors">
                      +1 more
                    </span>
                  </div>

                  {/* Price and button */}
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <span className="text-xl font-bold text-blue-500">
                        ${hotel.price}
                      </span>
                      <span className="text-sm text-gray-500"> /night</span>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer "
                      onClick={() => navigate(`/hotel/${hotel._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-sky-500 font-bold mt-8">
            No Hotels Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
