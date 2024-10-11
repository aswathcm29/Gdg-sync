/* eslint-disable react/prop-types */
import { BsCalendarDate } from "react-icons/bs";
import { GrLocationPin } from "react-icons/gr";
import { MdOutlineTimer } from "react-icons/md";
import { motion } from "framer-motion";



const EventCard = (props) => {
    return (
      <>
      <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, bounce: 0.5 }} className="max-w-[400px] rounded-lg bg-transparent text-[#f0f0f0] shadow-sm shadow-blue hover:translate-y-2  transition-shadow duration-300">
        <div
        className="w-full h-[150px] bg-cover rounded-md bg-center"
        style={{
          backgroundImage: `url(${props.image})`,
        }}
        ></div>
        <div className="p-4">
        <a href="#">
          <span className="text-lg leading-7 block truncate">{props.title}</span>
        </a>
        <p className="mt-2 text-[#6B7280] text-sm leading-5 truncate">
          {props.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {props.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md"
          >
            {tag}
          </span>
          ))}
        </div>
        <div className="mt-4">
          <p className="font-medium text-sm">
          <span className="text-gray-400 flex items-center gap-x-[1rem]">
            <BsCalendarDate className="text-xl text-green" />
            <span>{props.date}</span>
          </span>
          </p>
          <p className="font-medium text-sm mt-1">
          <span className="text-gray-400 flex items-center gap-x-[1rem]">
            <MdOutlineTimer className="text-xl text-yellow" />
            <span>{props.time} hrs</span>
          </span>
          </p>
          <p className="font-medium text-sm mt-1">
          <span className="text-gray-400 flex items-center gap-x-[1rem]">
            <GrLocationPin className="text-xl text-red" />
            <span className="truncate">{props.venue}</span>
          </span>
          </p>
        </div>
        </div>
      </motion.div>
      </>
    );
  };
  
  export default EventCard;
  
  