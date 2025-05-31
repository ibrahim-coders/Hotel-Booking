import { CiStar } from 'react-icons/ci';
import { RiMapPin2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

// Sample data for featured hotels
const featuredHotels = [
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    location: 'New York City, USA',
    rating: 4.8,
    price: 249,
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    features: ['Free WiFi', 'Swimming Pool', 'Spa'],
  },
  {
    id: 2,
    name: 'Seaside Resort & Spa',
    location: 'Maldives',
    rating: 4.9,
    price: 599,
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
    features: ['Beach Access', 'All Inclusive', 'Luxury Spa'],
  },
  {
    id: 3,
    name: 'Mountain View Lodge',
    location: 'Aspen, Colorado',
    rating: 4.7,
    price: 329,
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop',
    features: ['Ski Resort', 'Restaurant', 'Fireplace'],
  },
  {
    id: 4,
    name: 'City Center Suites',
    location: 'London, UK',
    rating: 4.6,
    price: 279,
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop',
    features: ['Business Center', 'Fitness Room', 'Restaurant'],
  },
];

const FeaturedHotels = () => {
  const navigate = useNavigate();

  // const handleViewDetails = () => {
  //   navigate(`/hotel/${hotelId}`);
  // };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-hotel-dark">
            Featured Hotels
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of extraordinary hotels and resorts
            around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredHotels.map(hotel => (
            <div
              key={hotel.id}
              className="overflow-hidden hotel-card-shadow transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <h2 className="absolute top-3 right-3 bg-white text-hotel-blue">
                  Featured
                </h2>
              </div>

              <div className="pt-4">
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
                  {hotel.features.map((feature, i) => (
                    <p
                      key={i}
                      variant="secondary"
                      className="bg-hotel-lightblue text-hotel-blue"
                    >
                      {feature}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-0">
                <div>
                  <span className="text-xl font-bold text-hotel-blue">
                    ${hotel.price}
                  </span>
                  <span className="text-sm text-gray-500">/night</span>
                </div>
                <button
                  className="bg-hotel-blue hover:bg-blue-700"
                  // onClick={() => handleViewDetails(hotel.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            variant="outline"
            className="border-hotel-blue text-hotel-blue hover:bg-hotel-blue hover:text-white"
          >
            View All Hotels
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
