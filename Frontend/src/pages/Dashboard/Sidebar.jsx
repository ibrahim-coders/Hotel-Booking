import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import {
  FaTachometerAlt,
  FaHotel,
  FaUsers,
  FaMoneyCheckAlt,
  FaSignOutAlt,
  FaRegCreditCard,
  FaUserCog,
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdHotelClass } from 'react-icons/md';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { MdSettings, MdBookOnline } from 'react-icons/md';
import useAuthStore from '../../store/authStore';
import Spinner from '../../components/Spinner';
import logo from '../../assets/star-hotel.png';
const Sidebar = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const user = useAuthStore(state => state.user);

  const fastWord = name => {
    if (!name) return '';
    const words = name.trim().split(' ');
    let initials = '';
    for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0];
    }
    return initials.toUpperCase();
  };

  if (!user) return <Spinner />;
  return (
    <>
      <button
        title="Side navigation"
        type="button"
        className={`visible fixed left-4 top-6 z-40 order-10 block h-10 w-10 self-center rounded opacity-100 lg:hidden ${
          isSideNavOpen
            ? 'visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 '
            : ''
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? ' true' : 'false'}
        aria-controls="nav-menu-4"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </button>
      <div
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
        className={`fixed top-6 right-4 lg:hidden ${
          isSideNavOpen ? '' : 'hidden'
        }`}
      >
        {' '}
        <IoMdClose className="size-6 text-red-500 flex justify-end " />
      </div>
      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-4"
        aria-label="Side navigation"
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
          isSideNavOpen ? 'translate-x-0' : ' -translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center gap-4 border-b border-slate-200 p-6">
          <Link to="/">
            <div className="mb-2 flex items-start gap-4 p-4 ">
              <img src={logo} alt="brand" className="h-8 w-8" />
              <h2 className="text-2xl"> Start-Hotel</h2>
            </div>
          </Link>
          <div className="shrink-0">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-300 text-xl font-semibold text-white">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center">
                  {fastWord(user.fullName)}
                </span>
              )}
              <span className="absolute top-[5px] left-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
            </div>
          </div>
          <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0 text-center">
            <p className="w-full truncate text-sm text-slate-500">
              {user?.role}
            </p>
            <h4 className="w-full truncate text-base text-slate-700">
              {user?.fullName}
            </h4>
          </div>
        </div>
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <div>
            {user?.role === 'Admin' ? (
              <ul className="flex flex-1 flex-col gap-1 py-3">
                {/* deshboard */}
                <li className="px-3">
                  <NavLink
                    to="/deshboard/overview"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50  ${
                        isActive ? 'bg-blue-100 text-blue-500 ' : ''
                      }`
                    }
                  >
                    <div className="flex items-center self-center">
                      <FaTachometerAlt className="h-6 -w-6" />
                    </div>
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                      Dashboard
                    </div>
                  </NavLink>
                </li>
                {/* add holtel */}
                <li className="px-3">
                  <NavLink
                    to="/deshboard/add-hotel"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50  ${
                        isActive ? 'bg-blue-100 text-blue-500 ' : ''
                      }`
                    }
                  >
                    <div className="flex items-center self-center ">
                      <FaHotel className="size-4" />
                    </div>
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                      Manage Hotels
                    </div>
                  </NavLink>
                </li>
                {/* Manage Bookings */}
                <li className="px-3">
                  <NavLink
                    to="/deshboard/manage-booking"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50  ${
                        isActive ? 'bg-blue-100 text-blue-500 ' : ''
                      }`
                    }
                  >
                    <div className="flex items-center self-center ">
                      <MdBookOnline className="size-4" />
                    </div>
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                      Manage Bookings
                    </div>
                  </NavLink>
                </li>
                {/* Manage Users */}
                <li className="px-3">
                  <NavLink
                    to="/deshboard/manage-user"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50  ${
                        isActive ? 'bg-blue-100 text-blue-500 ' : ''
                      }`
                    }
                  >
                    <div className="flex items-center self-center ">
                      <FaUsers />
                    </div>
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                      Manage Users
                    </div>
                  </NavLink>
                </li>
                {/* Manage Payments */}
                <li className="px-3">
                  <NavLink
                    to="/deshboard/manage-payments"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50  ${
                        isActive ? 'bg-blue-100 text-blue-500 ' : ''
                      }`
                    }
                  >
                    <div className="flex items-center self-center ">
                      <FaMoneyCheckAlt className="size-4" />
                    </div>
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                      Manage Payments
                    </div>
                  </NavLink>
                </li>
                {/* Settings */}
                <li className="px-3">
                  <NavLink
                    to="/deshboard/settings"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50  ${
                        isActive ? 'bg-blue-100 text-blue-500 ' : ''
                      }`
                    }
                  >
                    <div className="flex items-center self-center ">
                      <MdSettings className="size-4" />
                    </div>
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                      Settings
                    </div>
                  </NavLink>
                </li>
              </ul>
            ) : (
              // custumers path
              <ul className="flex flex-1 flex-col gap-1 py-3">
                <li className="px-3">
                  <NavLink
                    to="/deshboard/browese-hotel"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50  ${
                        isActive ? 'bg-blue-100 text-blue-500 ' : ''
                      }`
                    }
                  >
                    <div className="flex items-center self-center ">
                      <FaHotel className="size-4" />
                    </div>
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                      Browse Hotels
                    </div>
                  </NavLink>
                </li>
                {/* Room Booking */}
                <li className="px-3">
                  <NavLink
                    to="/deshboard/room-booking"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50  ${
                        isActive ? 'bg-blue-100 text-blue-500 ' : ''
                      }`
                    }
                  >
                    <div className="flex items-center self-center ">
                      <MdHotelClass className="size-4" />
                    </div>
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                      Room Booking
                    </div>
                  </NavLink>
                </li>
                {/* My Bookings */}
                <li className="px-3">
                  <NavLink
                    to="/deshboard/my-Bookings"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50  ${
                        isActive ? 'bg-blue-100 text-blue-500 ' : ''
                      }`
                    }
                  >
                    <div className="flex items-center self-center ">
                      <BsFillBookmarkCheckFill className="size-4" />
                    </div>
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                      My Bookings
                    </div>
                  </NavLink>
                </li>
                {/* Payment History */}
                <li className="px-3">
                  <NavLink
                    to="/deshboard/bookings"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50  ${
                        isActive ? 'bg-blue-100 text-blue-500 ' : ''
                      }`
                    }
                  >
                    <div className="flex items-center self-center ">
                      <FaRegCreditCard className="size-4" />
                    </div>
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                      Payment History
                    </div>
                  </NavLink>
                </li>
                {/* Profile Settings */}
                <li className="px-3">
                  <NavLink
                    to="/deshboard/profile-settings"
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-500 focus:bg-blue-50  ${
                        isActive ? 'bg-blue-100 text-blue-500 ' : ''
                      }`
                    }
                  >
                    <div className="flex items-center self-center ">
                      <FaUserCog className="size-4" />
                    </div>
                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                      Profile Settings
                    </div>
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </nav>

        <footer className="border-t border-slate-200 p-3">
          <Link className="flex items-center gap-3 rounded p-3 text-slate-900 transition-colors hover:text-blue-500 ">
            <div className="flex items-center self-center ">
              <FaSignOutAlt className="size-4" />
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium">
              Logout
            </div>
          </Link>
        </footer>
      </aside>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
    </>
  );
};

export default Sidebar;
