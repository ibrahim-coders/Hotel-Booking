import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 bg-[#1A4D8C] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Stay?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of satisfied travelers who have found their ideal
            accommodations through StayNexus. Sign up today and get exclusive
            deals on premium hotels worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className=" bg-white  text-gray-700 text-sm font-semibold px-6 py-2 rounded-md whitespace-nowrap cursor-pointer"
            >
              Sign Up Now
            </Link>
            <Link
              to="/hotels"
              className=" bg-white  text-gray-700 text-sm font-semibold px-6 py-2 rounded-md whitespace-nowrap cursor-pointer"
            >
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
