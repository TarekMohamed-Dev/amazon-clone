import { Link } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import { auth } from "../firebase";
import { useState } from 'react';
// eslint-disable-next-line react/prop-types
const Header = ({ handleSearch }) => {
  const { user,basket } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const handleAuthentication = () => {
    auth.signOut();
  };
  const refresh = () => {
    window.location.reload();
  }
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value); // Pass the search query to ProductFeed
};
  return (
    <header className="sticky top-0 z-50 bg-amazon_blue">
      {/* Top nav */}
      <div className="flex items-center p-1 py-2 h-[64px]">
        {/* Logo */}
        <div className="flex items-center flex-grow sm:flex-grow-0 mt-2 mx-2" onClick={refresh}>
          <Link to={"/"}>
            <img
              src="/amazon-logo.png"
              alt="logo"
              width={99}
              height={30}
              className="cursor-pointer active:transform active:scale-90 "
            />
          </Link>
        </div>

        {/* Search */}
        <div className="hidden sm:flex bg-yellow-400 hover:bg-yellow-500 items-center h-10 rounded-md flex-grow cursor-pointer">
          <input
            value={searchQuery}
            onChange={handleChange}
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
            placeholder="Search..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-12 p-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        {/* Right */}
        <div className="text-white flex  items-end text-xs space-y-2  sm:items-center  mx-1 sm:mx-6 space-x-2 sm:space-x-4 whitespace-nowrap">
          {/* User Authentication */}
          <Link to={!user && "/login"} className="link" onClick={handleAuthentication}>
            <p>Hello, {user ? `${user.email.split("@")[0]}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">{user ? "Account & Sign Out" : "Account & Lists"}</p>
          </Link>

          {/* Orders */}
          <Link to={"/orders"} className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </Link>

          {/* Basket */}
          <Link to={"/checkout"} className="link relative flex items-center">
        <span className="absolute top-0 right-0 md:right-10 h-4 w-4 text-center bg-yellow-400 rounded-full text-black font-bold">{basket?.length}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <p className="font-extrabold md:text-sm hidden md:inline mt-2">Basket</p>
          </Link>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center bg-amazon_blue-light text-white text-sm space-x-3 pl-3 py-2 overflow-x-auto">
        {/* Navigation Links */}
        {[
          "All",
          "Prime Video",
          "Amazon Business",
          "Today's Deals",
          "Electronics",
          "Appliances",
          "Fashion",
          "Home",
          "Grocery",
          "Grocery", // Duplicated 'Grocery' in your original code
          "Video Games",
          "Toys & Games",
          "Perfumes",
          "Your amazon.eg",
          "Sell",
          "Coupons",
          "Help",
        ].map((link, index) => (
          <p key={index} className="link">
            {link}
          </p>
        ))}
      </div>

    </header>
  );
};

export default Header;
