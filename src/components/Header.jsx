/* eslint-disable react/prop-types */
import { IoIosSearch } from "react-icons/io";// Importing search icon
import { Link } from "react-router-dom";// Importing Link component for routing
import { auth } from "../firebase"; // Importing Firebase authentication
import { useAuth } from "../context/GlobalState"; // Importing custom authentication hook
import { FaRegUser } from "react-icons/fa6"; // Importing user icon
import { MdKeyboardArrowRight } from "react-icons/md"; // Importing arrow icon
import { Drawer, IconButton, List, ListItem } from "@material-tailwind/react";  // Importing components from Material Tailwind
import { useState } from "react"; // Importing useState hook
import { GrHomeRounded } from "react-icons/gr"; // Importing home icon
import { HiOutlineLocationMarker } from "react-icons/hi"; // Importing location marker icon

// Header component
const Header = ({ handleSearch, dar }) => {
  // Function to handle authentication
  const handleAuth = () => {
    auth.signOut(); // Signing out the user
  };
  // Accessing user and basket state from the global context
  const { user, basket } = useAuth();
  // Setting up state for drawer and search query
  const [open, setOpen] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  // Functions to open and close drawer
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  // Setting up state for search query
  const [searchQuery, setSearchQuery] = useState('');
  // Function to handle search input
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };
  // Setting up state for dark mode
  const [darkMode, setDarkMode] = useState(false);
  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    dar(!darkMode);
  };

  return (
    <header className="bg-amazon_blue-light md:bg-amazon_blue sticky top-0 z-50 text-white">
      {/* Header top section */}
      <div className="flex px-3 sm:px-1 flex-col md:flex-row items-center">
        {/* Logo and menu */}
        <div className="flex items-center w-full md:max-w-28 justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger menu button for mobile view */}
            <div onClick={openDrawer} className="flex md:hidden">
              <img src="./menu.png" alt="menu" />
            </div>
            {/* Drawer navigation */}
            <Drawer open={open} onClose={closeDrawer} className="overflow-y-auto">
              <div className="mb-2 flex items-center justify-between p-4 bg-amazon_blue-light">
                <div className="flex items-center gap-3 absolute right-4 top-4">
                  <p>Your Account</p>
                  <FaRegUser className="text-lg" />
                </div>
                <div className="flex flex-col text-white mt-4">
                  <p className="text-lg font-bold">Browse</p>
                  <p className="text-2xl">Amazon</p>
                </div>
                <IconButton variant="text" color="blue-gray" onClick={closeDrawer} className="mt-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </IconButton>
              </div>
              <List>
                <div className="flex items-center justify-between">
                  <ListItem className="font-bold">Amazon Home</ListItem>
                  <GrHomeRounded className="text-lg me-5" />
                </div>
                <ListItem className="font-bold">Trending</ListItem>
                <ListItem>Best Sellers</ListItem>
                <ListItem>New Releases</ListItem>
                <ListItem>Movers & Shakers</ListItem>
                <div className="border-2 border-gray-300" />
                <ListItem className="font-bold">Top categories</ListItem>
                <ListItem>Electronics</ListItem>
                <ListItem>Fashion</ListItem>
                <ListItem>Computers</ListItem>
                <ListItem>Home</ListItem>
                <div className="border-2 border-gray-300" />
                <ListItem className="font-bold">Programs & Features</ListItem>
                <ListItem>Today's Deal</ListItem>
                <ListItem>Amazon Outlet</ListItem>
                <ListItem>Try Prime</ListItem>
              </List>
            </Drawer>
            {/* Amazon logo */}
            <Link to={"/"} className="flex items-center flex-shrink-auto mt-4 md:mt-1 sm:mx-2">
              <img className="w-[87px] sm:w-[97px]" src="./amazon-logo.png" alt="logo" />
            </Link>
          </div>
          {/* Dark mode toggle for mobile view */}
          <div className="flex ms-10 md:hidden">
            <img onClick={toggleDarkMode} className=" w-6" src={darkMode ? "./sun.png" : "./moon.png"} />
          </div>
          {/* User account info and drawer for mobile view */}
          <Link to={!user && "/signin"} className="flex items-center md:hidden" onClick={openDrawerRight}>
            {user ? `${user.email.split("@")[0]}` : "Sign in"} <MdKeyboardArrowRight />
            <FaRegUser className="text-lg" />
            <Drawer placement="right" open={openRight} onClose={closeDrawerRight} className="overflow-y-auto">
              <div className="mb-2 flex items-center justify-between p-4 bg-amazon_blue-light">
                <p className="text-2xl">Your Account</p>
              </div>
              <List>
                <ListItem className="font-bold text-lg">Your Orders</ListItem>
                <ListItem>Track and manage Your orders</ListItem>
                <ListItem>Buy Again</ListItem>
                <ListItem>Returns & Replacements</ListItem>
                <ListItem>Shipping & Delivery</ListItem>
                <div className="border border-gray-200" />
                <ListItem className="font-bold">Customer Service</ListItem>
                <div className="border-2 border-gray-300" />
                <ListItem className="font-bold text-lg">Your Account</ListItem>
                <ListItem>Lists</ListItem>
                <ListItem>Recommendations</ListItem>
                <ListItem>Browsing history</ListItem>
                <div className="border-2 border-gray-300" />
                <ListItem>You Prime membership</ListItem>
                <ListItem>Subscribe & Save</ListItem>
                <div className="border-2 border-gray-300" />
                <ListItem className="font-bold text-lg">Settings</ListItem>
                <ListItem>English</ListItem>
                <ListItem onClick={handleAuth}>Sign Out</ListItem>
              </List>
            </Drawer>
            {/* Close Drawer */}
            <div variant="text" color="blue-gray" onClick={closeDrawerRight} className={`absolute top-40 left-5 text-red-500 z-50 ${openRight ? 'block' : 'hidden'}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            {/* Checkout */}
            <Link to={"/checkout"} className="flex items-center space-x-1 btn relative">
              <img className="text-white" src="./cart.png" alt="cart" />
              <span className="absolute top-1 left-7 w-4 h-4 flex justify-center items-center bg-yellow-500 rounded-full text-black font-bold">{basket.length}</span>
            </Link>
          </Link>
        </div>
        {/* Delivery */}
        <div className="hidden md:flex items-end me-5 btn">
          <HiOutlineLocationMarker className="text-xl" />
          <div className="flex ms-1 flex-col -space-y-1">
            <p className="text-xs text-gray-500">Deliver to</p>
            <p className="text-sm font-bold">Egypt</p>
          </div>
        </div>
        {/* Search */}
        <div className="flex items-center flex-grow w-full md:w-3 text-black">
          <input value={searchQuery} onChange={handleInputChange} className="p-2 focus:outline-none flex-grow rounded-s-md px-4 h-10" type="text" placeholder="Search Amazon..." />
          <div className="bg-yellow-600 text-black rounded-lg px-3 -ms-4">
            <IoIosSearch className="text-lg h-10" />
          </div>
        </div>
        {/* Dark mode toggle */}
        <div className="hidden md:flex">
          <img onClick={toggleDarkMode} className="ms-2 w-7" src={darkMode ? "./sun.png" : "./moon.png"} />
        </div>
        {/* User account and cart */}
        <div className="hidden md:flex items-center space-x-2 text-xs data-container">
          <Link onClick={handleAuth} to={!user && "/Signup"} className="btn">
            <p className="">Hello, {user ? user.email.split('@')[0] : 'Sign In'}</p>
            <p className="font-extrabold lg:text-sm">{user ? "Account & Sign Out" : "Account & Lists"}</p>
          </Link>
          <Link to={"/orders"} className="btn">
            <p>Returns</p>
            <p className="font-extrabold lg:text-sm">& Orders</p>
          </Link>
          <Link to={"/checkout"} className="flex items-center space-x-1 btn relative">
            <img className="text-white" src="./cart.png" alt="cart" />
            <p className="font-extrabold lg:text-sm">Cart</p>
            <span className="absolute top-1 left-7 w-4 h-4 flex justify-center items-center bg-yellow-500 rounded-full text-black font-bold">{basket?.length}</span>
          </Link>
        </div>
      </div>

      {/* Header bottom section */}
      <div className="bg-amazon_blue-light flex items-center overflow-x-auto text-xs sm:text-sm text-nowrap sm:justify-between py-1 sm:py-0">
        <div className="flex">
          <div onClick={openDrawer} className="hidden sm:flex items-center space-x-2 btn me-2">
            <img src="./menu.png" alt="menu" />
            <p>All</p>
          </div>
          {[
            "Today's Deals",
            "Mobile Phones",
            "Prime",
            "Electronics",
            "Appliances",
            "Fashion",
            "Toys & Games",
            "Perfumes",
            "Sell",
            "Help"
          ].map((item) => (
            <p className="btn" key={item}>{item}</p>
          ))}
        </div>
        <div>
          <img src="./free-delivery.jpg" alt="free-delivery" className="hidden lg:block" />
        </div>
      </div>
    </header>
  );
};

export default Header;
