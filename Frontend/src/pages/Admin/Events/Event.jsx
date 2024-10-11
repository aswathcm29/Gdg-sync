/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import colors from '../../../assets/images/colors.png';
import flippedcolors from '../../../assets/images/colors-flip.png';
import rings from '../../../assets/images/ring-colors.png';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import getCookieValue from "../../../utils/token";
import { useNavigate } from "react-router-dom";
import TopSection from '../../../components/TopSection';
import AdminNav from '../../../components/AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import FlatCards from '../../../components/FlatCards';

const Body = () => {

  const navigate = useNavigate();
  const token = getCookieValue('token');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState(user?.username);
  const emailID = localStorage.getItem("email");

  const [events,setEvents] = useState([]);

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


  const fetchUser=async()=>{
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}users/getUser`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    console.log(res);
    setUsername(res.data.message.username);
    }
    catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
   fetchUser();
   fetchEvents();
  },[username])
  

  return (
    <div className="flex flex-col px-[1rem] bg-black ">
      <div className="p-[2rem] sm:p-[1rem] gap-y-[2rem] w-full lg:justify-around flex flex-col-reverse lg:flex-row items-center bg-transparent shadow-sm shadow-white rounded-md">
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-y-4 lg:gap-y-6">
          <span className="text-3xl md:text-5xl font-bold w-full text-center">
            <span>Hey <span className='text-blue'>{username} !</span></span>
          </span>
          <p className="text-lg md:text-xl text-gray-400 w-[20rem] text-center lg:w-[24rem]">
            You can view your events here.
          </p>
        </div>
        <img src={rings} className="w-[13rem] lg:w-[12rem]" />
      </div>
      <div className='w-full flex items-center justify-center p-[1rem]'>
          <input className='px-[3rem] sm:px-[10rem] py-[1rem] rounded-full bg-transparent shadow-sm shadow-green'
          placeholder='Search for your events'></input>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-[1rem]">
        {events.map((event) => (
          <FlatCards
          key={event._id}
          id = {event._id}
          title={event.title}
          description={event.description}
          date={new Date(event.date).toLocaleDateString()}
          time={event.time}
          image={event.image}
          venue={event.location}
          />
        ))}
      </div>
      <Toaster />
    </div>
  );
};


const Event = () => {
  return (
    <>
    <div className="bg-black text-[#f0f0f0] min-h-screen lg:h-screen flex">
      <AdminNav />
      <div className="md:ml-[8rem] w-full overflow-y-auto no-scrollbar">
        <TopSection />
        <Body />
      </div>
    </div>
  </>
  )
}

export default Event