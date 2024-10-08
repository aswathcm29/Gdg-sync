import AdminNav from "../../../components/AdminNav";
import TopSection from "../../../components/TopSection";
import { MdOutlineEvent } from "react-icons/md";
import { useEffect, useState } from "react";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import EventCard from "../../../components/EventCard";;
import axios from "axios";
import bluebg from '../../../assets/images/blue-bg.png'

const Body = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const emailID = localStorage.getItem("email");
  
  function getCookieValue(name) {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  const token = getCookieValue("token");

  const fetchEvents = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}events/getEventsUser`,
        { email: emailID },
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
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = selectedDate
      ? new Date(event.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
      : true; 
    return matchesSearch && matchesDate;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 4;
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const currentEvents = filteredEvents.slice(
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
      <div className="p-[1rem] sm:p-[2rem] gap-y-[2rem] w-full flex items-center justify-center flex-col rounded-md shadow-sm shadow-white">
        
        <span className="text-2xl md:text-4xl text-center ">
          Create and manage your events at ease
        </span>
        <button
          onClick={() => {}}
          className="flex items-center gap-x-[0.5rem] px-2 py-2 md:px-[2rem] md:py-[1rem] bg-green rounded-md text-center text-sm md:text-base hover:bg-blue-400 transition-all duration-300"
        >
          <MdOutlineEvent className="text-2xl text-white" />
          <span className="text-xl md:text-xl">Create New</span>
        </button>
      </div>

      <div className="flex flex-col w-full p-[1rem] gap-y-[1rem]">
        <div className="flex justify-between items-center md:flex-row flex-col gap-y-[1rem]">
          <span className="text-2xl">Your events</span>
          <div className="flex gap-x-[1rem]">
            <input
              className="bg-transparent shadow-sm shadow-white rounded-md p-[0.8rem] w-[80%] sm:w-auto"
              placeholder="Search for your events"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <input
              type="date"
              className="bg-green shadow-sm shadow-white rounded-md p-[0.8rem] w-[80%] sm:w-auto"
              placeholder="Filter by date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[2rem] gap-y-[2rem]">
          {currentEvents.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              description={event.description}
              date={new Date(event.date).toLocaleDateString()}
              time={event.time}
              image={event.image}
              venue={event.location}
            />
          ))}
        </div>

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
    </div>
  );
};

const Dashboard = () => {
  return (
    <>
      <div className="bg-black text-[#f0f0f0] min-h-screen">
        <div className="flex flex-col md:flex-row">
          <AdminNav />
          <div className="flex flex-col w-full">
            <TopSection />
            <Body />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
