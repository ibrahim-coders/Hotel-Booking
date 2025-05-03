const AboutBanner = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="bg-[#1A4D8C] text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Start-Hotel
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to make booking accommodations simple, enjoyable,
            and accessible for everyone.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-hotel-dark">
              Our Story
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Founded in 2023, StayNexus began with a simple idea: traveling
                should be about the experience, not the stress of finding a
                place to stay. Our founders, avid travelers themselves, were
                frustrated with the complexities of booking accommodations
                online.
              </p>
              <p className="mb-4">
                What started as a small project quickly grew into a
                comprehensive hotel booking platform. Today, StayNexus partners
                with thousands of hotels, resorts, and property owners worldwide
                to offer travelers an unparalleled selection of accommodations
                at competitive prices.
              </p>
              <p>
                Our team of travel enthusiasts and tech experts works tirelessly
                to ensure that every aspect of your booking journey is smooth,
                from browsing options to checking out of your hotel after an
                amazing stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-hotel-dark">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-lg hotel-card-shadow">
              <h3 className="text-xl font-bold mb-4 text-hotel-blue">
                Transparency
              </h3>
              <p className="text-gray-700">
                We believe in clear, honest communication. No hidden fees, no
                misleading information – just straightforward details about the
                accommodations we list.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-lg hotel-card-shadow">
              <h3 className="text-xl font-bold mb-4 text-hotel-blue">
                Customer-First
              </h3>
              <p className="text-gray-700">
                Everything we do is designed with our customers in mind. We
                strive to provide exceptional service and support at every step
                of your journey.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-lg hotel-card-shadow">
              <h3 className="text-xl font-bold mb-4 text-hotel-blue">
                Innovation
              </h3>
              <p className="text-gray-700">
                We continuously improve our platform with new features and
                technologies to make finding and booking accommodations easier
                and more enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-hotel-dark">
            Meet Our Leadership Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-hotel-dark">David Chen</h3>
              <p className="text-hotel-blue font-medium mb-2">
                CEO & Co-Founder
              </p>
              <p className="text-gray-600 text-sm">
                Travel enthusiast with 15+ years in hospitality tech
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="COO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-hotel-dark">
                Sarah Johnson
              </h3>
              <p className="text-hotel-blue font-medium mb-2">
                COO & Co-Founder
              </p>
              <p className="text-gray-600 text-sm">
                Former hospitality executive with global experience
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/67.jpg"
                  alt="CTO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-hotel-dark">
                Michael Rodriguez
              </h3>
              <p className="text-hotel-blue font-medium mb-2">CTO</p>
              <p className="text-gray-600 text-sm">
                Tech innovator specializing in travel platforms
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/28.jpg"
                  alt="CMO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-hotel-dark">Emily Patel</h3>
              <p className="text-hotel-blue font-medium mb-2">CMO</p>
              <p className="text-gray-600 text-sm">
                Digital marketing expert and brand strategist
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutBanner;
