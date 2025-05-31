import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Drawer,
  Card,
} from '@material-tailwind/react';

import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';

import {
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { FaHotel } from 'react-icons/fa';
import { MdManageAccounts } from 'react-icons/md';
import { BsBookmarkCheck } from 'react-icons/bs';

import { useEffect, useState } from 'react';
import logo from '../../assets/star-hotel.png';
import { Link, NavLink } from 'react-router-dom';

const SidebarContent = ({ open, handleOpen }) => (
  <div className="h-full">
    <Link to="/">
      <div className="mb-2 flex items-center gap-4 p-4 ">
        <img src={logo} alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Start-Hotel
        </Typography>
      </div>
    </Link>
    <div className="p-2 pr-2">
      <input
        type="text"
        className="border-2 border-sky-300 focus:border-sky-600 outline-none rounded p-2 "
        placeholder="Search...."
      />
    </div>
    <List>
      <Accordion
        open={open === 1}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${
              open === 1 ? 'rotate-180' : ''
            }`}
          />
        }
      >
        <ListItem className="p-0" selected={open === 1}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="border-b-0 p-3"
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              Dashboard Overview
            </Typography>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List className="p-0">
            <ListItem>
              <ListItemPrefix>
                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
              </ListItemPrefix>
              Analytics
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
              </ListItemPrefix>
              Reporting
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
              </ListItemPrefix>
              Projects
            </ListItem>
          </List>
        </AccordionBody>
      </Accordion>

      <NavLink to="/deshboard/add-hotel">
        <ListItem className="flex gap-2">
          <FaHotel className="h-5 w-5" />
          <span> Add Hotels</span>
        </ListItem>
      </NavLink>
      <ListItem className="flex gap-2">
        <MdManageAccounts className="h-5 w-5" />
        <span> Manage Hotels</span>
      </ListItem>
      <ListItem className="flex gap-2">
        <BsBookmarkCheck className="h-5 w-5" />
        Manage Bookings
      </ListItem>
      <ListItem>
        <ListItemPrefix>
          <UserCircleIcon className="h-5 w-5" />
        </ListItemPrefix>
        Manage Users
      </ListItem>
      <ListItem>
        <ListItemPrefix>
          <Cog6ToothIcon className="h-5 w-5" />
        </ListItemPrefix>
        Settings
      </ListItem>
      <ListItem>
        <ListItemPrefix>
          <PowerIcon className="h-5 w-5" />
        </ListItemPrefix>
        Log Out
      </ListItem>
    </List>
  </div>
);

const Sidebar = () => {
  const [open, setOpen] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpen = value => setOpen(open === value ? 0 : value);

  // 👇 Close Drawer if screen size becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Toggle Button for Small Screens Only */}
      <div className="md:hidden">
        <IconButton
          variant="text"
          size="lg"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Bars3Icon className="h-8 w-8 stroke-2" />
        </IconButton>
      </div>

      {/* Drawer for Mobile */}
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Card color="transparent" shadow={false} className="h-full w-full p-4">
          <div className="flex justify-end">
            <IconButton variant="text" onClick={() => setIsDrawerOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </IconButton>
          </div>
          <SidebarContent open={open} handleOpen={handleOpen} />
        </Card>
      </Drawer>

      {/* Static Sidebar for Desktop */}
      <div className="hidden md:block w-64 h-screen  p-4">
        <SidebarContent open={open} handleOpen={handleOpen} />
      </div>
    </>
  );
};

export default Sidebar;
