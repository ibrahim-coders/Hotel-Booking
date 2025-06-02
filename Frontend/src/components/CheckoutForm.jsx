import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?payment_intent={PAYMENT_ID}`,
      },
    });

    if (result.error) {
      setMessage(result.error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
    </form>
  );
};

export default CheckoutForm;
