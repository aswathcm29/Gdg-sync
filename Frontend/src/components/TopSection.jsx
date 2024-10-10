import axios from "axios";
import { useEffect, useState } from "react";
import gdgImage from '../assets/images/gdg-bgremove.png';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const TopSection = () => {
   const [username, setUsername] = useState('');
   const token = localStorage.getItem('token');
   const user = useSelector((state) => state.user);

   

   console.log('redux',user);

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
      document.cookie = "token=;max-age=0;path=/";
      navigate('/login');
   };
   const handleCreate= () => {
      navigate('/admin/create');
   };

   return (
      <>
         <div className="w-full flex flex-col md:flex-row justify-between items-center md:h-[3.5rem] md:mb-[1rem] p-4 md:pt-[3.5rem] md:pb-[2rem]  text-white">
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
               <img src={gdgImage} alt="GDG Logo" className="w-[3rem] h-[2rem] md:w-[3rem] mr-0 md:mr-[1rem]" />
               <span className="text-xl md:text-2xl lg:text-3xl font-semibold">
                  Hello <span className="text-blue">{user.username}!</span>
               </span>
            </div>
            <div className="flex gap-x-[2rem]">
            <button 
               onClick={handleCreate}
               className="px-4 py-2 md:px-[3rem] md:py-[1rem] items-center gap-x-2 hidden lg:flex bg-green rounded-md text-center text-sm md:text-base hover:bg-green-600 transition-all duration-300">
               Create New <span className="text-2xl">+</span>
            </button>
            <button 
               onClick={handleLogout}
               className="px-4 py-2 md:px-[3rem] md:py-[1rem] bg-blue rounded-md text-center text-sm md:text-base hover:bg-blue-400 transition-all duration-300">
               Logout
            </button>
            </div>
         </div>
      </>
   );
};

export default TopSection;
