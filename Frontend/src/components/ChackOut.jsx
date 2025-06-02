import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import useAxiosPublic from '../hooks/useAxiosPublic';

const stripePromise = loadStripe(
  'pk_test_51RVUhaIxhl3RPbv2dgn4mVrpmKMlY4eBXSiUYDTRP7LbKn1NS9IlxuydEoWIxBFUzMqzgEQ9nlyGCpwD3jcGH7xL00CrA9P3ap'
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axiosPublic.post('/stripe/payment', {
          amount: 5000,
        });

        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };

    createPaymentIntent();
  }, [axiosPublic]);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <div className="my-20 max-w-md mx-auto px-4 rounded">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
