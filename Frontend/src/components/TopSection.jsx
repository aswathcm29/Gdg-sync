import axios from "axios";
import { useEffect, useState } from "react";
import gdgImage from '../assets/images/gdg-bgremove.png';
import { useNavigate } from "react-router-dom";

const TopSection = () => {
   const [username, setUsername] = useState('');
   const token = localStorage.getItem('token');

   const fetchUser = async () => {
      try {
         const res = await axios.get(`${import.meta.env.VITE_BASE_URL}users/getUser`, {
            headers: {
               'Authorization': `Bearer ${token}`,
            },
         });
         console.log(res);
         setUsername(res.data.message.username);
      } catch (err) {
         console.log(err.message);
      }
   };

   useEffect(() => {
      fetchUser();
   }, [token]);

   const navigate = useNavigate();

   const handleLogout = () => {
      localStorage.removeItem('token');
      document.cookie = "token='';max-age=0";
      navigate('/login');
   };

   return (
      <>
         <div className="w-full flex flex-col md:flex-row justify-between items-center md:h-[3.5rem] p-4 md:p-[3rem] text-white">
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
               <img src={gdgImage} alt="GDG Logo" className="w-[3rem] h-[2rem] md:w-[3rem] mr-0 md:mr-[1rem]" />
               <span className="text-xl md:text-2xl lg:text-3xl font-semibold">
                  Hello <span className="text-blue">{username}!</span>
               </span>
            </div>
            <button 
               onClick={handleLogout}
               className="px-4 py-2 md:px-[3rem] md:py-[1rem] bg-blue rounded-md text-center text-sm md:text-base hover:bg-blue-400 transition-all duration-300">
               Logout
            </button>
         </div>
      </>
   );
};

export default TopSection;
