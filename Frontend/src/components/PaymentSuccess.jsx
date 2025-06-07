import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_intent');
  const axiosPublic = useAxiosPublic();
  const hasPosted = useRef(false);

  useEffect(() => {
    if (hasPosted.current) return;
    const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo'));
    if (!bookingInfo || !paymentId) return;

    hasPosted.current = true;

    axiosPublic
      .post('/checkout', {
        ...bookingInfo,
      })
      .finally(() => {
        localStorage.removeItem('bookingInfo');
      });
  }, [paymentId, axiosPublic]);
  return (
    <div className="text-center py-20 bg-blue-700">
      <h2 className="text-2xl font-bold text-white mb-4">
        Payment Successful!
      </h2>
      <p>Your booking has been saved.</p>
    </div>
  );
};

export default PaymentSuccess;
