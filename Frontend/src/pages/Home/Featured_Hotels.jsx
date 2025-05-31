import { useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { RiMapPin2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import useAxiosePublic from '../../hooks/useAxiosPublic';
import { Spinner } from '@material-tailwind/react';

const FeaturedHotels = () => {
  const axiosPublic = useAxiosePublic();
  const navigate = useNavigate();
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const response = await axiosPublic.get('/hotels/featured');
        setFeaturedHotels(response?.data || []);
      } catch (error) {
        console.error('Failed to fetch featured hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelsData();
  }, [axiosPublic]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner className="h-12 w-12 text-hotel-blue" />
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-hotel-dark">
            Featured Hotels
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of extraordinary hotels and resorts
            around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredHotels.map(hotel => (
            <div
              key={hotel._id}
              className="overflow-hidden hotel-card-shadow transition-transform duration-300 hover:-translate-y-1 bg-white rounded-lg"
            >
              <div className="relative h-48 overflow-hidden">
                {hotel?.images?.slice(0, 1).map((imgObj, index) => (
                  <img
                    key={index}
                    src={imgObj}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ))}

                <h2 className="absolute top-3 right-3 bg-white text-hotel-blue px-2 py-1 text-sm font-semibold shadow">
                  Featured
                </h2>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-hotel-blue">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center">
                    <CiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium ml-1">
                      {hotel.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <RiMapPin2Line className="w-4 h-4 mr-1" />
                  <span>{hotel.location}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {hotel?.featured?.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-hotel-lightblue text-hotel-blue text-xs px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <span className="text-xl font-bold text-hotel-blue">
                      ${hotel.price}
                    </span>
                    <span className="text-sm text-gray-500"> /night</span>
                  </div>
                  <button
                    className="bg-hotel-blue text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => navigate(`/hotel/${hotel._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="border border-hotel-blue text-hotel-blue px-6 py-2 rounded hover:bg-hotel-blue hover:text-white transition"
            onClick={() => navigate('/hotels')}
          >
            View All Hotels
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
