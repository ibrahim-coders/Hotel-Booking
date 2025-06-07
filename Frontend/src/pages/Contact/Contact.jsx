import {
  CiFacebook,
  CiInstagram,
  CiLock,
  CiMail,
  CiMapPin,
  CiPhone,
  CiTwitter,
  CiYoutube,
} from 'react-icons/ci';
import Card from './Card';

const Contact = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <div className="bg-[#1A4D8C] text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're here to help you with any questions or concerns about your
            bookings
          </p>
        </div>
      </div>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto  px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-hotel-dark">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-hotel-lightblue p-3 rounded-full">
                    <CiMapPin className="h-6 w-6 text-hotel-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 Booking Street
                      <br />
                      Travel City, TC 10000
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-hotel-lightblue p-3 rounded-full">
                    <CiMail className="h-6 w-6 text-hotel-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">
                      support@staynexus.com
                      <br />
                      partnerships@staynexus.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-hotel-lightblue p-3 rounded-full">
                    <CiPhone className="h-6 w-6 text-hotel-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-gray-600">
                      +1 (555) 123-4567
                      <br />
                      +1 (555) 987-6543
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-hotel-lightblue p-3 rounded-full">
                    <CiLock className="h-6 w-6 text-hotel-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      Hours of Operation
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9am - 8pm EST
                      <br />
                      Saturday - Sunday: 10am - 6pm EST
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="font-bold text-xl mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className=" bg-[#1A4D8C] hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                  >
                    <CiFacebook size={20} />
                  </a>
                  <a
                    href="#"
                    className=" bg-[#1A4D8C] hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                  >
                    <CiTwitter size={20} />
                  </a>
                  <a
                    href="#"
                    className=" bg-[#1A4D8C] hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                  >
                    <CiInstagram size={20} />
                  </a>
                  <a
                    href="#"
                    className=" bg-[#1A4D8C] hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                  >
                    <CiYoutube size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-6 shadow rounded bg-white p-3">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-hotel-dark">
                  Send Us a Message
                </h2>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="firstName"
                        className="text-sm font-medium"
                      >
                        First Name
                      </label>
                      <input
                        className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
                        placeholder="John"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
                      type="email"
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      placeholder="How can we help you?"
                      type="text"
                      className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      placeholder="Type your message here..."
                      className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-500 border-blue-500 text-xs"
                      rows={5}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2 rounded-md whitespace-nowrap"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Card />
    </div>
  );
};

export default Contact;
