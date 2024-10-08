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
import { useSelector } from 'react-redux';

const Body = () => {

  const navigate = useNavigate();
  const token = getCookieValue('token');
  const [username,setUsername] = useState('');


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
  },[username])
  

  return (
    <div className="flex flex-col p-[1rem]">
      <div className="p-[2rem] sm:p-[1rem] gap-y-[2rem] w-full lg:justify-around flex flex-col-reverse lg:flex-row items-center bg-transparent shadow-sm shadow-white rounded-md">
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-y-4 lg:gap-y-6">
          <span className="text-3xl md:text-5xl font-bold w-full text-center">
            <span>Hey {username}</span>
          </span>
          <p className="text-lg md:text-xl text-gray-600 w-[20rem] text-center lg:w-[24rem]">
            Get your events creation simplified
          </p>
        </div>
        <img src={rings} className="w-[25rem] lg:w-[20rem]" />
      </div>
      <Toaster />
    </div>
  );
};


const Profile = () => {
  return (
    <>
    <div className="bg-black text-[#f0f0f0] sm:min-h-screen lg:h-screen flex">
      <AdminNav />
      <div className="md:ml-[8rem] w-full overflow-y-auto no-scrollbar">
        <TopSection />
        <Body />
      </div>
    </div>
  </>
  )
}

export default Profile