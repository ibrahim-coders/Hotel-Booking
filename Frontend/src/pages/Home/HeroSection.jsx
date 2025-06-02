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
          <div className="flex items-center justify-center  h-full px-4">
            <div className="text-center max-w-2xl space-y-4">
              <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold">
                Find Your Perfect Stay with Start Hotel
              </h2>
              <p className="text-sm md:text-lg text-gray-300">
                Discover amazing hotels, resorts and apartments around the world
                for your next adventure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
