import { useState, useEffect } from 'react';
import { CiUser } from 'react-icons/ci';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);

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
              Start Hotel
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

          {/* Sign In Button */}
          <div className="ml-auto flex items-center justify-end px-6 lg:ml-0 lg:flex-1 lg:p-0">
            <Link
              to="/login"
              className={`flex items-center gap-1 rounded-full py-2 px-4 text-sm font-semibold border transition-all ${
                isScrolled
                  ? 'text-hotel-blue border-hotel-blue hover:bg-hotel-blue hover:text-white'
                  : 'text-white border-blue-800 hover:bg-bule-700 '
              }`}
            >
              <CiUser size={18} />
              Sign In
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
