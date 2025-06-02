import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const stripePromise = loadStripe(
  'pk_test_51RVUhaIxhl3RPbv2dgn4mVrpmKMlY4eBXSiUYDTRP7LbKn1NS9IlxuydEoWIxBFUzMqzgEQ9nlyGCpwD3jcGH7xL00CrA9P3ap'
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const user = useAuthStore(state => state.user);
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [errorMess, setErrorMess] = useState('');

  const {
    guests,
    checkInDate,
    checkOutDate,
    totalHotelPrice,
    hotelName,
    hotelLocation,
    hotelId,
  } = location.state || {};

  const [checkoutInformation, setCheckoutInformation] = useState({
    phone: '',
    address: '',
    city: '',
    country: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    const { phone, address, city, country } = checkoutInformation;

    if (!phone) return setErrorMess('Phone is required.');
    if (!address) return setErrorMess('Address is required.');
    if (!city) return setErrorMess('City is required.');
    if (!country) return setErrorMess('Country is required.');

    setErrorMess('');

    localStorage.setItem(
      'bookingInfo',
      JSON.stringify({
        user: user._id,
        hotel: hotelId,
        guests,
        checkInDate,
        checkOutDate,
        totalPrice: totalHotelPrice,
        paymentStatus: 'paid',
        phone: checkoutInformation.phone,
        address: checkoutInformation.address,
        city: checkoutInformation.city,
        country: checkoutInformation.country,
      })
    );
    setShowStripeForm(true);
    setShowStripeForm(true);
  };

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axiosPublic.post('/stripe/payment', {
          amount: totalHotelPrice,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };
    createPaymentIntent();
  }, [axiosPublic, totalHotelPrice]);

  const options = {
    clientSecret,
    appearance: { theme: 'stripe' },
  };

  return (
    <section className="my-20 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
      <div className="w-full shadow rounded p-4">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">
          Shipping Address
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-2 py-2">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={user?.fullName}
                readOnly
                className="w-full bg-gray-100 text-gray-600 border border-blue-300 px-4 py-2 rounded-md cursor-not-allowed outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full bg-gray-100 text-gray-600 border border-blue-300 px-4 py-2 rounded-md cursor-not-allowed outline-none"
              />
            </div>
          </div>

          <div className="flex space-x-2 py-2">
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                value={checkoutInformation.phone}
                onChange={e =>
                  setCheckoutInformation({
                    ...checkoutInformation,
                    phone: e.target.value,
                  })
                }
                className="w-full bg-gray-100 text-gray-600 border border-blue-300 px-4 py-2 rounded-md outline-none"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                value={checkoutInformation.address}
                onChange={e =>
                  setCheckoutInformation({
                    ...checkoutInformation,
                    address: e.target.value,
                  })
                }
                className="w-full bg-gray-100 text-gray-600 border border-blue-300 px-4 py-2 rounded-md outline-none"
                placeholder="Address"
              />
            </div>
          </div>

          <div className="flex space-x-2 py-2">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                value={checkoutInformation.city}
                onChange={e =>
                  setCheckoutInformation({
                    ...checkoutInformation,
                    city: e.target.value,
                  })
                }
                className="w-full bg-gray-100 text-gray-600 border border-blue-300 px-4 py-2 rounded-md outline-none"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                value={checkoutInformation.country}
                onChange={e =>
                  setCheckoutInformation({
                    ...checkoutInformation,
                    country: e.target.value,
                  })
                }
                className="w-full bg-gray-100 text-gray-600 border border-blue-300 px-4 py-2 rounded-md outline-none"
                placeholder="Country"
              />
            </div>
          </div>

          {errorMess && (
            <p className="text-red-500 text-sm mt-2">{errorMess}</p>
          )}

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4">
            Checkout
          </button>
        </form>
      </div>

      {/* Booking Info */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-lg border border-blue-100">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">
          Booking Summary
        </h3>
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <p className="font-medium">Hotel:</p>
            <span>{hotelName}</span>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Location:</p>
            <span>{hotelLocation}</span>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Guests:</p>
            <span>{guests}</span>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Check-in:</p>
            <span>{checkInDate}</span>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Check-out:</p>
            <span>{checkOutDate}</span>
          </div>
          <div className="flex justify-end border-t border-blue-400 pt-2 space-x-2">
            <p className="font-medium">Total:</p>
            <span className="font-bold text-lg text-blue-600">
              ${totalHotelPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Stripe Form */}
      {showStripeForm && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">Payment</h3>
          {clientSecret ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements>
          ) : (
            <p className="text-gray-500 text-center">
              Loading payment details...
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default Checkout;
