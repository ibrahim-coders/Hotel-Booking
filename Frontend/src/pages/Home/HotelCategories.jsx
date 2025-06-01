const categories = [
  {
    id: 1,
    name: 'Beach Resorts',
    description: 'Relax by the ocean with stunning views',
    image:
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop',
    count: 45,
  },
  {
    id: 2,
    name: 'City Hotels',
    description: 'Perfect for business and urban exploration',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop',
    count: 67,
  },
  {
    id: 3,
    name: 'Mountain Retreats',
    description: 'Breathtaking views and outdoor activities',
    image:
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop',
    count: 28,
  },
  {
    id: 4,
    name: 'Boutique Hotels',
    description: 'Unique and stylish accommodation options',
    image:
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop',
    count: 32,
  },
];

const HotelCategories = () => {
  return (
    <section className="py-6 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-hotel-dark">
            Browse by Category
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore hotels by category to find your perfect match
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(category => (
            <div
              key={category.id}
              className="overflow-hidden shadow cursor-pointer hover:-translate-y-1 transition-transform"
            >
              <div className="relative h-48">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-sm text-white/80 mt-1">
                    {category.description}
                  </p>
                  <span className="text-sm mt-2">
                    {category.count} properties
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelCategories;
