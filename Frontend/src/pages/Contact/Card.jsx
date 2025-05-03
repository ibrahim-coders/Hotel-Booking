import { FaRegMessage } from 'react-icons/fa6';
import { CiCircleQuestion, CiDollar } from 'react-icons/ci';

const Card = () => {
  const cards = [
    {
      icon: <FaRegMessage />,
      title: 'Booking Inquiries',
      description: 'Questions about your current or upcoming bookings',
      link: '#',
    },
    {
      icon: <CiCircleQuestion />,
      title: 'Technical Support',
      description: 'Help with website issues or account problems',
      link: '#',
    },
    {
      icon: <CiDollar />,
      title: 'Billing & Refunds',
      description: 'Questions about payments, cancellations, or refunds',
      link: '#',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Quick Help Topics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition text-center"
          >
            <div className="flex justify-center items-center p-3 w-12 h-12 text-gray-700 bg-[#E6F4F1] rounded-full mx-auto mb-4 text-xl">
              {card.icon}
            </div>

            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600 mb-4">{card.description}</p>
            <a
              href={card.link}
              className="text-blue-600 font-medium hover:underline"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
