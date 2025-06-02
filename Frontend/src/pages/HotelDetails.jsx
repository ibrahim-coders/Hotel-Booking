import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaRegStar,
  FaWifi,
  FaCar,
  FaUtensilSpoon,
  FaPhone,
  FaDumbbell,
} from 'react-icons/fa';
import { LuMapPinCheckInside } from 'react-icons/lu';
import { BiCoffeeTogo } from 'react-icons/bi';
import { MdOutlineWaves } from 'react-icons/md';
import { CiMail } from 'react-icons/ci';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosePublic from '../hooks/useAxiosPublic';
import Spinner from '../components/Spinner';
import ErrorPage from './Error/ErrorPages';
import DetailsSidebar from './DetailsSidebar';

const HotelDetails = () => {
  const service = {
    features: [
      '24/7 Front Desk',
      'Room Service',
      'Concierge Service',
      'Business Center',
      'Spa Services',
      'Airport Shuttle',
    ],
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'info@grandplazahotel.com',
    },
  };

  const amenities = [
    { icon: FaWifi, name: 'Free WiFi' },
    { icon: FaCar, name: 'Parking' },
    { icon: BiCoffeeTogo, name: 'Coffee Shop' },
    { icon: FaDumbbell, name: 'Fitness Center' },
    { icon: MdOutlineWaves, name: 'Swimming Pool' },
    { icon: FaUtensilSpoon, name: 'Restaurant' },
  ];

  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [guests, setGuests] = useState(2);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const axiosPublic = useAxiosePublic();

  const getNights = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const differenceInTime = checkOut - checkIn;
      const days = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 0;
    }
    return 0;
  };

  const totalNights = getNights();

  const {
    isPending,
    error,
    data: hotelData,
  } = useQuery({
    queryKey: ['hotelData', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/hotel/${id}`);
      return res.data;
    },
  });

  if (isPending) return <Spinner />;
  if (error) return <ErrorPage />;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* HEADER */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col lg:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              {hotelData.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <FaRegStar className="text-yellow-500" />
                <span className="ml-1 font-semibold">{hotelData.rating}</span>
                <span className="ml-1 text-gray-600">
                  ({hotelData.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <LuMapPinCheckInside className="mr-1" />
                <span>{hotelData.location}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="text-2xl font-bold text-blue-600">
                ${hotelData.price}
              </span>
              <span className="line-through text-gray-500">
                ${hotelData.originalPrice}
              </span>
            </div>
            <span className="text-sm text-gray-600">per night</span>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-3">
            <img
              src={hotelData.images[selectedImage]}
              alt="Main"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
            {hotelData.images.slice(0, 3).map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(i)}
                className={`w-full h-24 lg:h-32 object-cover rounded-lg cursor-pointer transition ${
                  selectedImage === i
                    ? 'ring-2 ring-blue-500'
                    : 'opacity-70 hover:opacity-100'
                }`}
                alt={`Thumb ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* MAIN CONTENT + SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Tabs>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Amenities</Tab>
                <Tab>Policies</Tab>
              </TabList>

              <TabPanel>
                <h2 className="text-xl font-semibold mb-2">About This Hotel</h2>
                <p className="text-gray-700">{hotelData.description}</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                  Featured Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <item.icon className="text-blue-600" />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </TabPanel>

              <TabPanel>
                <h2 className="text-xl font-semibold mb-2">All Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </TabPanel>

              <TabPanel>
                <h2 className="text-xl font-semibold mb-2">Hotel Policies</h2>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-1">Check-in / Check-out</h4>
                    <p>Check-in: {service.checkIn}</p>
                    <p>Check-out: {service.checkOut}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Contact</h4>
                    <p className="flex items-center gap-2">
                      <FaPhone className="text-blue-600" />
                      {service?.contact?.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <CiMail className="text-blue-600" />
                      {service?.contact?.email}
                    </p>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>

          {/* SIDEBAR */}
          <DetailsSidebar
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            guests={guests}
            setGuests={setGuests}
            price={hotelData.price}
            totalNights={totalNights}
            hotelName={hotelData.name}
            hotelLocation={hotelData.location}
            hotelId={hotelData._id}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
