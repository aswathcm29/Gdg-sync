/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BsCalendarDate } from "react-icons/bs";
import { GrLocationPin } from "react-icons/gr";
import { MdOutlineTimer } from "react-icons/md";

const FlatCards = (props) => {
    console.log(props.id)
  return (
    <div className="">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5, bounce: 0.5 }}
        className="bg-transparent shadow-sm shadow-white text-white p-6 rounded-lg transition-shadow duration-300"
      >
        <Link
          to={`/admin/event/${props.id}`}
          className={`flex sm:p-4 m-4`}
        >
          <div className="sm:px-6 w-full">
            <div className="text-2xl w-full font-bold truncate">{props.title}</div>
            <div className="mt-2 text-sm text-gray-400 truncate">{props.description}</div>
            <div className="mt-4 text-gray-400 text-sm flex items-center gap-3">
              <BsCalendarDate className="text-xl text-green-500" />
              <span>{new Date(props.date).toLocaleDateString()}</span>
            </div>
            <div className="mt-1 text-gray-400 text-sm flex items-center gap-3">
              <MdOutlineTimer className="text-xl text-yellow-500" />
              <span>{props.time}</span>
            </div>
            <div className="mt-1 text-gray-400 text-sm flex items-center gap-3">
              <GrLocationPin className="text-xl text-red-500" />
              <span className="truncate">{props.venue}</span>
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
