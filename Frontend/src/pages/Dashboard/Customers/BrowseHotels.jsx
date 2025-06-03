import React, { useState } from 'react';

const hotelData = [
  { id: 1, name: 'Grand Dhaka', city: 'Dhaka', price: 120, available: true },
  { id: 2, name: 'Sylhet View', city: 'Sylhet', price: 90, available: false },
  {
    id: 3,
    name: 'Chittagong Inn',
    city: 'Chittagong',
    price: 220,
    available: true,
  },
  {
    id: 4,
    name: 'Hotel Green View',
    city: 'Dhaka',
    price: 80,
    available: true,
  },
  { id: 5, name: 'Luxury Stay', city: 'Sylhet', price: 200, available: false },
  {
    id: 6,
    name: 'Ocean Paradise',
    city: 'Chittagong',
    price: 150,
    available: true,
  },
];

const BrowseHotels = () => {
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filterHotels = () => {
    return hotelData.filter(hotel => {
      const matchesLocation = !location || hotel.city === location;
      const matchesPrice =
        price === 'low'
          ? hotel.price < 100
          : price === 'mid'
          ? hotel.price >= 100 && hotel.price <= 200
          : price === 'high'
          ? hotel.price > 200
          : true;
      const matchesAvailability = !onlyAvailable || hotel.available;

      return matchesLocation && matchesPrice && matchesAvailability;
    });
  };

  const hotels = filterHotels();

  return (
    <div className="w-full md:max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Browse Hotels</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <select
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        >
          <option value="">All Locations</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Sylhet">Sylhet</option>
        </select>

        <select
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        >
          <option value="">All Prices</option>
          <option value="low">Below $100</option>
          <option value="mid">$100 - $200</option>
          <option value="high">Above $200</option>
        </select>

        <label className="flex items-center gap-2 w-full md:w-1/3">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={() => setOnlyAvailable(!onlyAvailable)}
          />
          <span>Available Only</span>
        </label>
      </div>

      {/* Hotel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.length > 0 ? (
          hotels.map(hotel => (
            <div key={hotel.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
              <p className="text-gray-700">City: {hotel.city}</p>
              <p className="text-gray-700">Price: ${hotel.price}</p>
              <p
                className={`font-medium ${
                  hotel.available ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {hotel.available ? 'Available' : 'Not Available'}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No hotels match your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default BrowseHotels;
