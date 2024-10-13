/* eslint-disable no-constant-binary-expression */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsCalendarDate } from "react-icons/bs";
import { MdInfo, MdOutlineTimer } from "react-icons/md";
import { GrLocationPin } from "react-icons/gr";
import flippedcolors from '../../../assets/images/colors-flip.png'; 
import getCookieValue from "../../../utils/token";
import AdminNav from "../../../components/AdminNav";
import TopSection from "../../../components/TopSection";
import { useDispatch } from "react-redux";
import { setEvent } from "../../../redux/slices/eventSlice";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { IoImages } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import gallery from "../../../utils/gallery";
import Footer from "../../../components/Footer";

const Body = () => {
    const { id } = useParams();
    const [event, setEvents] = useState({});
    const [activeTab, setActiveTab] = useState('description'); 
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const fetchEvent = async () => {
        const token = getCookieValue('token');
        
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}events/getEvent/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            setEvents(res.data.event);
            dispatch(setEvent(res.data.event));
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [id]);

    const handleButton = ()=>{
       navigate(`/admin/update/event/${id}`)
    }

    return (
        <div className="p-[1rem]">
         <div
  className="relative p-[2rem] sm:p-[4rem] gap-[2rem] sm:justify-center  flex flex-col-reverse lg:flex-row items-center bg-transparent shadow-sm shadow-white rounded-md"
  style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${event.image || flippedcolors})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="flex flex-col  justify-center items-center text-center lg:text-left gap-y-4 lg:gap-y-6 z-10">
    <span className="text-3xl lg:text-5xl font-bold w-full text-white ">
      {event.title || "Event Title"}
    </span>
    <button
      className="px-2 py-3 lg:px-4 lg:py-4 font-bold text-white bg-blue-500 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
      onClick={() => handleButton()}
    >
      Update Event
    </button>
  </div>
  <div className="absolute inset-0 bg-black opacity-40 rounded-md"></div>
</div>


            <div className="py-4">
                <div className="flex justify-center space-x-4 ">
                    <button
                        className={`px-4 py-2 font-bold ${activeTab === 'description' ? 'text-white bg-green' : 'text-gray-400'} rounded-md transition duration-300 ease-in-out hover:bg-green-600`}
                        onClick={() => setActiveTab('description')}
                    >
                        Description
                    </button>
                    <button
                        className={`px-4 py-2 font-bold ${activeTab === 'participants' ? 'text-white bg-green' : 'text-gray-400'} rounded-md transition duration-300 ease-in-out hover:bg-green-600`}
                        onClick={() => setActiveTab('participants')}
                    >
                        Participants
                    </button>
                    <button
                        className={`px-4 py-2 font-bold ${activeTab === 'gallery' ? 'text-white bg-green' : 'text-gray-400'} rounded-md transition duration-300 ease-in-out hover:bg-green-600`}
                        onClick={() => setActiveTab('gallery')}
                    >
                        Gallery
                    </button>
                </div>

                <div className="mt-6 text-gray-300 rounded-md shadow-lg">
                    {activeTab === 'description' && (
                        <div>
                            <span className="text-3xl p-[1rem] rounded-md bg-gray-900 font-bold mb-4 text-center w-auto text-blue flex items-center justify-center gap-x-[1rem] "><MdInfo/>About the event</span>
                            <div className="bg-transparent rounded-lg ">
                            <h2 className="text-3xl font-bold mb-4"></h2>
                            <p className="mb-6 text-xl shadow-sm rounded-md text-gray-300 py-[1rem] px-[1rem] shadow-blue">{event.description || "No description available for this event."}</p>
                            <div className="mt-4 text-[1.1rem] rounded-md space-y-3 text-gray-300 shadow-sm py-[1rem] px-[1rem] shadow-blue">
                                <div className="flex items-center  gap-x-[1rem]">
                                    <BsCalendarDate className="text-2xl  text-green-500 " />
                                    <span>{new Date(event.date).toLocaleDateString() || "Not Available"}</span>
                                </div>
                                <div className="flex items-center gap-x-[1rem]">
                                    <MdOutlineTimer className="text-2xl text-yellow-500 " />
                                    <span>{`${event.time} hrs` || "Not Available"}</span>
                                </div>
                                <div className="flex items-center gap-x-[1rem] ">
                                    <GrLocationPin className="text-xl text-red-500 " />
                                    <span className="truncate ml-1">{event.location || "Venue not specified"}</span>
                                </div>
                            </div>
                        </div>
                        </div>
                    )}
                    {activeTab === 'participants' && (
                        <div>
                            <span className="text-3xl p-[1rem] rounded-md bg-gray-900 font-bold mb-4 text-center w-auto text-blue flex items-center justify-center gap-x-[1rem] "><FaUsers/>Enrolled Participants </span>
                            {
                                event.participants && event.participants.length > 0 ? (
                                    <ul className="grid sm:grid-cols-2 grid-cols-1 gap-[1rem]">
                                        {event.participants.map((participant, index) => (
                                            <div key={index} className="py-[2rem] rounded-md hover:-translate-y-1 transition-all shadow-sm shadow-blue flex justify-center items-center">
                                               <span className="text-xl">{participant.username}</span> 
                                            </div>
                                        ))}
                                    </ul>
                                ) : <div className="flex items-center justify-center">No Participants Yet</div>
                            }
                        </div>
                    )}
                    {activeTab === 'gallery' && (
                        <div>
                            <span className="text-3xl p-[1rem] rounded-md bg-gray-900 font-bold mb-4 text-center w-auto text-blue flex items-center justify-center gap-x-[1rem] "><IoImages/>Glimpse of the events</span>
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                            >
                                <Masonry>
                                    {gallery && gallery.length > 0 ? (
                                        gallery.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Gallery Image ${index + 1}`}
                                                className="p-[0.8rem] rounded-md shadow-md hover:-translate-y-1 transition-all duration-300"
                                            />
                                        ))
                                    ) : (
                                        <p>Gallery is currently empty.</p>
                                    )}
                                </Masonry>
                            </ResponsiveMasonry>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};





const EventView = () => {
  return (
        <>
        <div className="bg-black text-[#f0f0f0] min-h-screen lg:h-screen flex">
          <AdminNav />
          <div className="md:ml-[8rem] w-full overflow-y-auto no-scrollbar flex flex-col">
            <TopSection />
            <Body />
            <Footer/>
          </div>
        </div>
      </>
  );
  
}

export default EventView