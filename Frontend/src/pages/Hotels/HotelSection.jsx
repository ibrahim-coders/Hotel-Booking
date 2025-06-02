import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import useAxiosePublic from '../../hooks/useAxiosPublic';
const HotelSection = ({ search, setFeaturedHotels }) => {
  const axiosPublic = useAxiosePublic();
  const [searchTerm, setSearch] = useState(search);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  console.log(category, sort);
  const handleSearch = async () => {
    let query = [];
    if (searchTerm) query.push(`location=${searchTerm}`);
    if (category && category !== 'all') query.push(`category=${category}`);
    if (sort) query.push(`sort=${sort}`);
    const queryString = query.length ? `?${query.join('&')}` : '';

    const res = await axiosPublic.get(`/hotels${queryString}`);
    setFeaturedHotels(res.data);
  };

  const searchClose = async () => {
    setSearch('');
    setCategory('');
    setSort('');
    try {
      const res = await axiosPublic.get('/hotels');
      setFeaturedHotels(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="pt-8 bg-white ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm w-full">
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <div className="flex space-x-2">
              {' '}
              <input
                value={searchTerm}
                onChange={e => setSearch(e.target.value)}
                type="text"
                placeholder="Search locations..."
                className=" relative w-full pl-10 pr-4 py-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <IoIosClose
                onClick={searchClose}
                className="absolute right-22 top-2.5 text-2xl text-red-500 font-bold cursor-pointer"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer "
              >
                Search
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={category}
              onChange={e => {
                setCategory(e.target.value);
                setTimeout(handleSearch, 0);
              }}
              className="w-48 px-3 py-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Category</option>
              <option value="all">All Categories</option>
              <option value="luxury">Luxury</option>
              <option value="resort">Resort</option>
              <option value="business">Business</option>
              <option value="boutique">Boutique</option>
              <option value="beach">Beach</option>
              <option value="lodge">Lodge</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <select
              value={sort}
              onChange={e => {
                setSort(e.target.value);
                setTimeout(handleSearch, 0);
              }}
              className="w-48 px-3 py-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Sort by</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelSection;
