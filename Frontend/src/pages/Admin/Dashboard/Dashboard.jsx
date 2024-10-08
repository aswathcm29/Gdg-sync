import AdminNav from "../../../components/AdminNav";
import TopSection from "../../../components/TopSection";
import { MdOutlineEvent } from "react-icons/md";
import { useEffect, useState } from "react";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import EventCard from "../../../components/EventCard";;
import axios from "axios";
import lap from '../../../assets/images/events-boook.png'
import { useNavigate } from "react-router-dom";
import getCookieValue from "../../../utils/token";

const Body = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const createPage=()=>{
    navigate('/admin/create');
  }

  const emailID = localStorage.getItem("email");
  
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
    <div className="flex flex-col w-full justify-center items-center px-[1rem] h-full ">
    <div className=" p-[2rem] sm:p-[1rem] gap-y-[2rem] w-full flex flex-col lg:flex-row items-center  shadow-sm shadow-white rounded-md">
  <img src={lap} className="w-[20rem] md:w-[25rem] lg:w-[30rem]" />
  <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-y-4 lg:gap-y-6">
    <span className="text-3xl md:text-5xl font-bold w-full tracking-wide">
      <span className="text-blue">G<span className="text-red">D</span><span className="text-yellow">G</span><span className="text-green">-</span>sync</span>
    </span>
    <p className="text-lg md:text-xl text-gray-600 w-[20rem] lg:w-[24rem]">
      Synchronize all your events with ease and manage them effortlessly.
    </p>
  </div>

  <div className="mt-6 lg:mt-0 md:flex md:justify-end md:w-full md:mr-[3rem]">
    <button
      onClick={() => {createPage()}}
      className="flex items-center gap-x-[0.5rem] px-6 py-3 md:px-8 md:py-4 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md transition-all duration-300 ease-in-out"
    >
      <MdOutlineEvent className="text-2xl text-white" />
      <span className="text-lg md:text-xl">Create New Event</span>
    </button>
  </div>
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
          <div className="bg-black text-[#f0f0f0] sm:min-h-screen lg:h-screen flex">
      <AdminNav />
      <div className="md:ml-[8rem] w-full overflow-y-auto no-scrollbar ">
        <TopSection />
        <Body />
      </div>
    </div>
    </>
  );
};

export default Dashboard;
