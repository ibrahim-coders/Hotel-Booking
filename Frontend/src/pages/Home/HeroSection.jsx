import { CiLocationOn } from 'react-icons/ci';
import heroImage from '../../assets/hero-banner.avif';
const HeroSection = () => {
  return (
    <div className="relative h-[85vh] md:h-[80vh] lg:h-[85vh]">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30">
          <div className="flex justify-center items-center text-center h-full">
            <div className="text-center max-w-2xl space-y-2">
              <h2 className="text-2xl md:text-5xl text-white font-bold">
                Find Your Perfect Stay with Start Hotel
              </h2>
              <p className="text-xl text-gray-300">
                Discover amazing hotels, resorts and apartments around the world
                for your next adventure
              </p>
              <div className="bg-white shadow-md rounded-sm p-4 gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Where are you going ?"
                    className="w-full px-3 py-2 shadow-md rounded-md focus:outline text-xs"
                  />
                  <CiLocationOn className="absolute top-3 left-2" />
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
