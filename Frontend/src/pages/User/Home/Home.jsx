/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import axios from "axios";
import lap from '../../../assets/images/events-boook.png'
import { Link} from "react-router-dom";
import getCookieValue from "../../../utils/token";
import CardShimmer from "../../../components/CardShimmer";
import EventCard from "../../../components/EventCard";
import UserNav from "../../../components/UserNav";
import TopSection from "../../../components/TopSection";


const Body = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); 
  

  const token = getCookieValue("token");

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}events/getAllEvents`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEvents(res.data.events);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);



  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 4;
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const currentEvents = events.slice(
    currentPage * eventsPerPage,
    (currentPage + 1) * eventsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };



  return (
    <div className="flex flex-col w-full justify-center items-center px-[1rem]">
      <div className="p-[3rem]  md:p-[1rem] lg:p-[0.1rem] gap-y-[2rem] w-full flex flex-col lg:flex-row-reverse lg:justify-around items-center shadow-sm shadow-white rounded-md">
        <img src={lap} className="w-[20rem] md:w-[25rem] lg:w-[27rem]" />
        <div className="flex flex-col justify-center items-center lg:items-start lg:justify-between text-center lg:text-center gap-y-4 lg:gap-y-6">
          <span className="text-3xl md:text-5xl lg:text-7xl font-bold w-full tracking-wide">
            <span>Gdg <span className="text-green"></span><span className="text-blue">sync</span></span>
          </span>
          <p className="text-lg md:text-xl text-gray-600 w-[25rem] lg:w-[24rem]">
            Synchronize all your events with ease and manage them effortlessly.
          </p>
        </div>      
      </div>

      <div className="flex flex-col w-full py-[1rem] gap-y-[1rem]">
        <div className="flex justify-between items-center flex-row  gap-y-[1rem]">
          <span className="text-2xl md:text-3xl">Your <span className="text-blue">top events</span></span>
          <div className="flex justify-end gap-x-[1rem] items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 p-[0.6rem] bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <IoMdArrowDropleftCircle className="text-3xl" />
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages - 1}
            className={`flex items-center gap-2 p-[0.6rem] bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all ${
              currentPage >= totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <IoMdArrowDroprightCircle className="text-3xl" />
          </button>
        </div>
    
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[2rem] gap-y-[2rem]">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => <CardShimmer key={index} />) 
            : currentEvents.map((event) => (
              <Link to={`/user/event/${event._id}`}> 
              <EventCard
              key={event._id}
              title={event.title}
              description={event.description}
              date={new Date(event.date).toLocaleDateString()}
              time={event.time}
              image={event.image}
              venue={event.location}
              tags={event.tags}
              />
              </Link>  
             
              ))}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
   
      <>
        <div className="bg-black text-[#f0f0f0] min-h-screen lg:h-screen flex">
        <UserNav />
        <div className="md:ml-[8rem] w-full overflow-y-auto no-scrollbar ">
          <TopSection />
          <Body />
        </div>
      </div>
      </>
    );
}

export default Home;