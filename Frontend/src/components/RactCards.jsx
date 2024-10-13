/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BsCalendarDate } from "react-icons/bs";
import { GrLocationPin } from "react-icons/gr";
import { MdOutlineTimer } from "react-icons/md";

const RactCards = (props) => {
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
          <div className="sm:px-6 w-full p-4 ">
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-start gap-y-[0.5rem] ">
                    <div className="text-4xl w-full font-bold truncate text-blue">{props.title}</div>
                    <div className=" text-md text-gray-300 truncate">{props.description}</div>
                    <span className="bg-green px-[1rem] py-[0.2rem] rounded-xl text-left">Enrolled</span>
                </div> 
                <div className="flex flex-col items-end justify-end text-xl">
                  <div className="flex text-gray-300 gap-x-[2rem] items-center justify-center py-[1rem]">
                    <span className="ml-2 text-md">{props.venue}</span>
                    <GrLocationPin className="text-2xl text-red font-bold" />
                   </div> 
                   <div className="flex text-gray-300 gap-x-[2rem] text-xl items-center justify-center py-[1rem]">
                      <span className="ml-2 text-md">{props.date}</span>
                      <BsCalendarDate className="text-2xl text-green font-bold" />
                    </div>
                    <div className="flex text-gray-300 gap-x-[2rem] text-xl items-center justify-center py-[1rem]">
                            <span className="ml-2 text-md">{props.time}</span>
                            <MdOutlineTimer className="text-2xl text-yellow font-bold" />
                    </div>     
                </div>          
            </div>
          
    
           

            <div className="mt-4">
              <Link to={`/admin/event/${props.id}`}>
                <button className="w-full py-2 bg-blue text-white rounded-md hover:bg-blue-500">
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

export default RactCards;
