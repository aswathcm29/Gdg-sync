/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BsCalendarDate } from "react-icons/bs";
import { GrLocationPin } from "react-icons/gr";
import { MdOutlineTimer } from "react-icons/md";

const FlatCards = (props) => {
  const role = localStorage.getItem("role");
  const linkTo =
    role === "user" ? `/user/event/${props.id}` : `/admin/event/${props.id}`;

  return (
    <div className="">
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.5, bounce: 0.5 }}
        className="relative text-white p-6 rounded-md transition-shadow duration-300 overflow-hidden shadow-sm shadow-white" 
        style={{
          backgroundImage: `url(${props.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80" /> 
        
        <Link to={`${linkTo}`} className={`flex sm:p-4 m-4 relative z-10`}> 
          <div className="sm:px-6 w-full p-4 text-center">
            <div className="text-3xl w-full font-bold truncate text-blue text-center">{props.title}</div>
            <div className="mt-2 text-md text-gray-300 truncate">{props.description}</div>
            <div className="flex text-gray-300 items-center justify-center py-[1rem]">
              <GrLocationPin className="text-2xl text-green font-bold" />
              <span className="ml-2 text-md">{props.venue}</span>
            </div>
    
           

            <div className="mt-4">
              <Link to={`/admin/event/${props.id}`}>
                <button className="w-full py-2 bg-blue text-white rounded-md hover:bg-green-600">
                  View
                </button>
              </Link>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default FlatCards;
