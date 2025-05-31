import { useState, useEffect } from 'react';
import { CiLogout, CiUser } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, NavLink } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useAxiosePublic from '../hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const user = useAuthStore(state => state.user);
  const [isOpen, setOpen] = useState(false);
  const axiosPublic = useAxiosePublic();
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleLogout = async () => {
    setOpen(false);

    try {
      const res = await axiosPublic.post(
        '/auth/logout',
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
      toast.success(res.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pb-3 ${
        isScrolled ? 'bg-white shadow-md ' : ''
      }`}
    >
      <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl ">
        <nav
          aria-label="main navigation"
          className="flex items-center justify-between font-medium text-slate-700 pt-3 "
        >
          {/* Brand logo */}
          <Link
            to="/"
            className="flex items-center gap-2 whitespace-nowrap text-lg focus:outline-none lg:flex-1"
          >
            <span
              className={`text-2xl font-heading font-bold ${
                isScrolled ? 'text-[#1A4D8C]' : 'text-teal-500'
              }`}
            >
              StartHotel
            </span>
          </Link>

          {/* Mobile toggle button */}
          <button
            className={`relative order-10 block h-10 w-10 self-center cursor-pointer lg:hidden`}
            onClick={() => setIsToggleOpen(!isToggleOpen)}
            aria-expanded={isToggleOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 transform">
              <span className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-teal-500 transition-all duration-300" />
              <span className="absolute block h-0.5 w-6 transform rounded-full bg-teal-500 transition duration-300" />
              <span className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-teal-500 transition-all duration-300" />
            </div>
          </button>

          {/* Nav Links */}
          <ul
            role="menubar"
            aria-label="Select page"
            className={`absolute space-x-4 left-0 top-0 z-0 h-[28.5rem] w-full justify-center overflow-hidden overflow-y-auto px-8 pb-12 pt-20 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0 lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-transparent lg:px-0 lg:py-0 lg:opacity-100 ${
              isToggleOpen
                ? 'visible opacity-100 backdrop-blur-sm bg-slate-900/50'
                : 'invisible opacity-10'
            }`}
          >
            <li role="none" className="flex items-stretch px-4 py-2 lg:p-0">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition-colors hover:text-hotel-teal ${
                    isScrolled ? 'text-[#1A4D8C]' : 'text-white'
                  } ${isActive ? 'font-bold underline text-hotel-teal' : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li role="none" className="flex items-stretch px-4 py-2 lg:p-0">
              <NavLink
                to="/hotels"
                className={({ isActive }) =>
                  `transition-colors hover:text-hotel-teal ${
                    isScrolled ? 'text-[#1A4D8C]' : 'text-white'
                  } ${isActive ? 'font-bold underline text-hotel-teal' : ''}`
                }
              >
                Hotels
              </NavLink>
            </li>
            <li role="none" className="flex items-stretch px-4 py-2 lg:p-0">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `transition-colors hover:text-hotel-teal ${
                    isScrolled ? 'text-[#1A4D8C]' : 'text-white'
                  } ${isActive ? 'font-bold underline text-hotel-teal' : ''}`
                }
              >
                About Us
              </NavLink>
            </li>
            <li role="none" className="flex items-stretch px-4 py-2 lg:p-0">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `transition-colors hover:text-hotel-teal ${
                    isScrolled ? 'text-[#1A4D8C]' : 'text-white'
                  } ${isActive ? 'font-bold underline text-hotel-teal' : ''}`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Sign In Button or User Avatar with Dropdown */}
          <div className="ml-auto flex items-center justify-end px-6 lg:ml-0 lg:flex-1 lg:p-0">
            {user ? (
              <div className="flex flex-col justify-center items-center gap-1 text-sm relative">
                {/* Avatar + Dropdown Toggle Button */}
                <div className="inline-flex items-center divide-x divide-gray-300 rounded border border-gray-300 bg-[#1A4D8C] shadow-sm overflow-hidden">
                  {/* Avatar with Online Badge */}
                  <Link to="/profile" className="relative p-1.5">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        user.photoURL ||
                        'https://i.ibb.co/9km0tXxd/istockphoto-1158245278-1024x1024.jpg'
                      }
                      alt="User"
                    />
                    <span className="absolute top-0 left-2 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                  </Link>

                  {/* Dropdown Toggle */}
                  <button
                    onClick={() => setOpen(!isOpen)}
                    type="button"
                    className="px-3 py-1.5 text-sm font-medium text-white   cursor-pointer"
                  >
                    <IoIosArrowDown className="size-4 " />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-14 z-50 w-40 rounded border border-gray-300 bg-[#1A4D8C] shadow-md divide-y divide-gray-200 "
                  >
                    <Link
                      to="deshboard"
                      className="w-full inline-block px-4 py-2 text-left text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      type="button"
                      className="flex w-full items-center space-x-2  px-4 py-2 text-left text-sm text-red-500 hover:bg-red-100 cursor-pointer"
                    >
                      <span>Logout</span>
                      <CiLogout className="text-red-500 size-5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Sign In Link
              <Link
                to="/login"
                className={`flex items-center gap-1 rounded-full py-2 px-4 text-sm font-semibold border transition-all ${
                  isScrolled
                    ? 'text-hotel-blue border-hotel-blue hover:bg-hotel-blue hover:text-white'
                    : 'text-white border-blue-800 hover:bg-blue-700'
                }`}
              >
                <CiUser size={18} />
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
