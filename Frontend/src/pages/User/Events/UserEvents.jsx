/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import rings from '../../../assets/images/colors-flip.png';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import getCookieValue from "../../../utils/token";
import TopSection from '../../../components/TopSection';
import AdminNav from '../../../components/AdminNav';
import FlatCards from '../../../components/FlatCards';
import { Link } from 'react-router-dom';
import UserNav from '../../../components/UserNav';
import Footer from '../../../components/Footer';

const Body = () => {
  const token = getCookieValue('token');

  const emailID = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(""); 
  const [selectedDate, setSelectedDate] = useState(""); 

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
      setFilteredEvents(res.data.events);
    } catch (err) {
      console.log(err.message);
    }
  };


  const applyFilters = () => {
    let filtered = events;

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(event => event.tags.includes(selectedTag));
    }

    if (selectedDate) {
      filtered = filtered.filter(event => 
        new Date(event.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
      );
    }

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedTag, selectedDate]);

  return (
    <div className="flex flex-col px-[1rem] bg-black ">
      <div className="p-[2rem] sm:p-[2rem] gap-y-[2rem] w-full lg:justify-around flex flex-col-reverse lg:flex-row items-center bg-transparent shadow-sm shadow-white rounded-md">
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-y-4 lg:gap-y-6">
          <span className="text-3xl md:text-5xl font-bold w-full text-center">
            <span>Search for<span className='text-blue'> events</span></span>
          </span>
          <span className="text-lg md:text-xl text-gray-400 w-[20rem] text-center lg:w-[24rem]">
            You can view your events here.
          </span>
        </div>
        <img src={rings} className="w-[13rem] lg:w-[20rem]" />
      </div>

      <div className='w-full grid md:grid-cols-3 items-center justify-center py-[1rem] gap-4'>
        <input
          className='px-[3rem] sm:px-[1rem] col-span-2 md:col-span-1 py-[1rem] rounded-md bg-gray-800'
          placeholder='Search for your events'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <select
          className='px-[1rem] py-[1rem] rounded-md bg-gray-800'
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option className=' rounded-md' value="">All Tags</option>
          <option className=' rounded-md' value="workshop">Workshop</option>
          <option className=' rounded-md' value="conference">Conference</option>
          <option  className=' rounded-md' value="meetup">Meetup</option>
        </select>

        <input
          type="date"
          className='px-[3rem] py-[1rem] rounded-md bg-gray-800'
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-[1rem]">
          {filteredEvents.map((event) => (
            <FlatCards
              key={event._id}
              id={event._id}
              title={event.title}
              description={event.description}
              date={new Date(event.date).toLocaleDateString()}
              time={event.time}
              image={event.image}
              venue={event.location}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[16rem]">
          <span className="text-gray-400">No events found</span>
        </div>
      )}

      <Toaster />
    </div>
  );
};

const UserEvents = () => {
  return (
    <>
      <div className="bg-black text-[#f0f0f0] min-h-screen lg:h-screen flex">
        <UserNav />
        <div className="md:ml-[8rem] w-full overflow-y-auto no-scrollbar">
          <TopSection />
          <Body />
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}

export default UserEvents;
