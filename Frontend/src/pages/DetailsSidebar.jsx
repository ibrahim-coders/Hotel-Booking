import { FaCalendarDays } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
const DetailsSidebar = ({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guests,
  setGuests,
  price,
  totalNights,
  hotelName,
  hotelLocation,
  images,
}) => {
  const rooms = Math.ceil(guests / 2);
  const totalHotelPrice = rooms * price * totalNights;
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const location = useLocation();

  const chackOut = () => {
    if (!user) {
      return navigate('/login', { state: { from: location } });
    }
    navigate('/payment', {
      state: {
        guests,
        checkInDate,
        checkOutDate,
        totalHotelPrice,
        hotelName,
        hotelLocation,
        images,
      },
    });
  };
  return (
    <div className="lg:col-span-1 space-y-4 sticky top-4">
      <h3 className="text-lg font-semibold">Book Your Stay</h3>
      <div className="space-y-3">
        <label className="block text-sm font-medium">Check-in Date</label>
        <div className="relative">
          <FaCalendarDays className="absolute left-3 top-3 text-gray-500" />
          <input
            type="date"
            value={checkInDate}
            onChange={e => setCheckInDate(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <label className="block text-sm font-medium">Check-out Date</label>
        <div className="relative">
          <FaCalendarDays className="absolute left-3 top-3 text-gray-500" />
          <input
            type="date"
            value={checkOutDate}
            onChange={e => setCheckOutDate(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <label className="block text-sm font-medium">Guests</label>
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-500" />
          <input
            type="number"
            min="1"
            value={guests}
            onChange={e => setGuests(Number(e.target.value))}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Price per night</span>
            <span className="font-semibold">${totalHotelPrice}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Service fee</span>
            <span className="font-semibold">$25</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
            <span>Total</span>
            <span className="text-hotel-blue">${totalHotelPrice + 25}</span>
          </div>
        </div>
        <button
          onClick={chackOut}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer"
        >
          Book Now
        </button>
        <p className="text-sm text-gray-600 text-center mt-2">
          Free cancellation until 24 hours before check-in
        </p>
      </div>
    </div>
  );
};

export default DetailsSidebar;
