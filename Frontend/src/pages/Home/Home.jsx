import CallToAction from './CallToAction';
import FeaturedHotels from './Featured_Hotels';
import HeroSection from './HeroSection';
import HotelCategories from './HotelCategories';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedHotels />
      <HotelCategories />
      <CallToAction />
    </div>
  );
};

export default Home;
