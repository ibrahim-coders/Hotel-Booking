import heroImage from '../../assets/hero-banner.avif';
const HeroSection = () => {
  return (
    <div className="relative h-[85vh] md:h-[80vh] lg:h-[85vh]">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
      </div>
    </div>
  );
};

export default HeroSection;
