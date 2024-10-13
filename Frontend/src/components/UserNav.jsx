import { useState } from "react";
import { SiGooglehome } from "react-icons/si";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { RiCalendarEventFill } from "react-icons/ri";
import gdgImage from '../assets/images/gdg-bgremove.png'; // Ensure you have a logo image at this path

const UserNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex fixed md:h-screen w-[6rem] md:w-[8rem] items-center justify-center sm:shadow-sm sm:shadow-white rounded-r-[3rem] md:rounded-r-[5rem] bg-transparent">
        <div className="md:hidden absolute top-4 left-4 z-50">
          <button
            onClick={toggleMenu}
            className="text-white text-3xl focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="hidden md:flex flex-col h-[50%] w-full md:w-[4.5rem] gap-y-[2rem] items-center">
          <NavLink
            to="/user/home"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-blue-400"
                : "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-white hover:text-blue-400"
            }
          >
            <SiGooglehome className="text-3xl md:text-4xl" />
            <span className="text-sm md:text-md">Home</span>
          </NavLink>
          <NavLink
            to="/user/events"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-blue-400"
                : "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-white hover:text-blue-400"
            }
          >
            <RiCalendarEventFill className="text-3xl md:text-4xl" />
            <span className="text-sm md:text-md">Events</span>
          </NavLink>
          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-blue-400"
                : "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-white hover:text-blue-400"
            }
          >
            <FaUser className="text-3xl md:text-4xl" />
            <span className="text-sm md:text-md">Profile</span>
          </NavLink>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black z-40 flex flex-col items-center justify-start">
          <div className="w-full flex  items-center bg-gray-800 p-4 justify-between">
            <div className="flex items-center justify-center gap-x-[1rem]">
            <img src={gdgImage} alt="Logo" className="w-[3rem] " />
            <h1 className="text-white text-2xl">Gdg-Sync</h1>
            </div>
            <button
              onClick={toggleMenu}
              className="text-white text-3xl focus:outline-none mt-2 "
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-col  w-full gap-y-4 mt-4">
            <NavLink
              to="/user/home"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "flex  gap-x-[1rem]  items-center p-[1rem] bg-gray-800 text-blue-400"
                  : "flex  gap-x-[1rem]  items-center p-[1rem] text-white hover:text-blue-400"
              }
            >
              <SiGooglehome className="text-4xl mb-2" />
              <span className="text-xl">Home</span>
            </NavLink>

            <NavLink
              to="/user/events"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "flex gap-x-[1rem]  items-center p-[1rem] text-blue-400 bg-gray-800"
                  : "flex gap-x-[1rem]  items-center p-[1rem] text-white hover:bg-gray-800 hover:text-blue-400"
              }
            >
              <RiCalendarEventFill className="text-4xl mb-2" />
              <span className="text-xl">Events</span>
              </NavLink>
            <NavLink
              to="/user/profile"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "flex gap-x-[1rem]  items-center p-[1rem] bg-gray-800 text-blue-400"
                  : "flex  gap-x-[1rem]  items-center p-[1rem] text-white hover:bg-gray-800 hover:text-blue-400"
              }
            >
              <FaUser className="text-4xl mb-2" />
              <span className="text-xl">Profile</span>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default UserNav;
