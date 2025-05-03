import { CiCalendar, CiLocationOn, CiSearch } from 'react-icons/ci';
import heroImage from '../../assets/hero-banner.avif';

const HeroSection = () => {
  return (
    <div className="relative h-[60vh] md:h-[80vh] lg:h-[85vh]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30">
          <div className="flex items-center justify-center h-full px-4">
            <div className="text-center max-w-2xl space-y-4">
              <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold">
                Find Your Perfect Stay with Start Hotel
              </h2>
              <p className="text-sm md:text-lg text-gray-300">
                Discover amazing hotels, resorts and apartments around the world
                for your next adventure
              </p>

              {/* Search Box */}
              <div className="mt-6 flex justify-center">
                <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col md:flex-row gap-3 w-full max-w-5xl">
                  {/* Destination Input */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <CiLocationOn className="absolute top-2.5 left-2.5 text-gray-500 text-lg" />
                  </div>

                  {/* Check-in Date */}
                  <div className="flex-none w-full md:w-[150px]">
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Check-out Date */}
                  <div className="flex-none w-full md:w-[150px]">
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Search Button */}
                  <button className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2 rounded-md whitespace-nowrap">
                    <CiSearch className="text-lg" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
