import CallToAction from './CallToAction';
import FeaturedHotels from './Featured_Hotels';
import HeroSection from './HeroSection';
import HotelCategories from './HotelCategories';
import CarouselTestimonial from './Testimonial';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedHotels />
      <HotelCategories />
      <CarouselTestimonial />
      <CallToAction />
    </div>
  );
};

export default Home;
