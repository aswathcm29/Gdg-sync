import { useState } from "react";
import { SiGooglehome } from "react-icons/si";
import { FaCalendarAlt, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { RiCalendarEventFill } from "react-icons/ri";




const UserNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>

      <div className=" flex fixed md:h-screen w-[6rem] md:w-[8rem] items-center justify-center sm:shadow-sm sm:shadow-white rounded-r-[3rem] md:rounded-r-[5rem] bg-transparent">
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
            to="/admin/calendar"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-blue-400"
                : "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-white hover:text-blue-400"
            }
          >
            <FaCalendarAlt className="text-3xl md:text-4xl" />
            <span className="text-sm md:text-md">Track</span>
          </NavLink>

          <NavLink
            to="/user/events"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-blue-400"
                : "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-white hover:text-blue-400"
            }
          >
            <RiCalendarEventFill  className="text-3xl md:text-4xl" />
            <span className="text-sm md:text-md">Events</span>
          </NavLink>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-40 flex flex-col items-center justify-center">
          <NavLink
            to="/user/home"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive
                ? "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-blue-400"
                : "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-white hover:text-blue-400"
            }
          >
            <SiGooglehome className="text-6xl mb-2" />
            <span className="text-2xl">Home</span>
          </NavLink>

          <NavLink
            to="/admin/calendar"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive
                ? "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-blue-400"
                : "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-white hover:text-blue-400"
            }
          >
            <FaCalendarAlt className="text-6xl mb-2" />
            <span className="text-2xl">Track</span>
          </NavLink>

          <NavLink
            to="/admin/events"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive
                ? "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-blue-400"
                : "flex flex-col gap-y-[0.5rem] justify-center items-center p-[1rem] text-white hover:text-blue-400"
            }
          >
            <RiCalendarEventFill  className="text-6xl mb-2" />
            <span className="text-2xl">Events</span>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default UserNav;
