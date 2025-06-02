import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_intent');
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const saveBooking = async () => {
      const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo'));
      if (bookingInfo && paymentId) {
        await axiosPublic.post('/checkout', {
          ...bookingInfo,
          paymentId,
        });
        localStorage.removeItem('bookingInfo');
      }
    };
    saveBooking();
  }, [paymentId, axiosPublic]);

  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h2>
      <p>Your booking has been saved.</p>
    </div>
  );
};

export default PaymentSuccess;
