/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineTimer } from "react-icons/md";
import { GrLocationPin } from "react-icons/gr";
import flippedcolors from '../../../assets/images/colors-flip.png'; 
import getCookieValue from "../../../utils/token";
import AdminNav from "../../../components/AdminNav";
import TopSection from "../../../components/TopSection";
import { useDispatch } from "react-redux";
import { setEvent } from "../../../redux/slices/eventSlice";

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
            <div className="p-[2rem] sm:p-[1rem] gap-[2rem] lg:justify-between flex flex-col-reverse lg:flex-row items-center bg-transparent shadow-sm shadow-white rounded-md">
                <img src={event.image || flippedcolors} className="w-[25rem] lg:block lg:w-[30rem] hidden rounded-md shadow-md" alt="Event" />
                <div className="flex flex-col lg:mr-[5rem] justify-center items-center text-center lg:text-left gap-y-4 lg:gap-y-6">
                    <span className="text-3xl text-blue lg:text-5xl font-bold w-full text-center">
                        <span>{event.title || "Event Title"}</span>
                    </span>
                    <span className="md:truncate lg:w-full">{event.description}</span>
                    <button
                    className="px-2 py-3 lg:px-4 lg:py-4 font-bold  text-white bg-blue-500 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
                    onClick={() => handleButton()}
                >
                    Update Event
                </button>
                </div>
               
            </div>

            <div className="p-4">
                <div className="flex justify-center space-x-4 ">
                    <button
                        className={`px-4 py-2 font-bold ${activeTab === 'description' ? 'text-white bg-green-500' : 'text-gray-400'} rounded-md transition duration-300 ease-in-out hover:bg-green-600`}
                        onClick={() => setActiveTab('description')}
                    >
                        Description
                    </button>
                    <button
                        className={`px-4 py-2 font-bold ${activeTab === 'participants' ? 'text-white bg-green-500' : 'text-gray-400'} rounded-md transition duration-300 ease-in-out hover:bg-green-600`}
                        onClick={() => setActiveTab('participants')}
                    >
                        Participants
                    </button>
                    <button
                        className={`px-4 py-2 font-bold ${activeTab === 'gallery' ? 'text-white bg-green-500' : 'text-gray-400'} rounded-md transition duration-300 ease-in-out hover:bg-green-600`}
                        onClick={() => setActiveTab('gallery')}
                    >
                        Gallery
                    </button>
                </div>

                <div className="mt-6 p-6  text-gray-300 rounded-md shadow-lg">
                    {activeTab === 'description' && (
                        <div className="shadow-sm shadow-white p-6 bg-transparent rounded-lg">
                            <h2 className="text-3xl font-bold mb-4">About the Event</h2>
                            <p className="mb-6">{event.description || "No description available for this event."}</p>
                            <div className="mt-4 text-md space-y-3">
                                <div className="flex items-center">
                                    <BsCalendarDate className="text-xl text-green-500 mr-2" />
                                    <span className="font-semibold">Date:</span>
                                    <span>{new Date(event.date).toLocaleDateString() || "Not Available"}</span>
                                </div>
                                <div className="flex items-center">
                                    <MdOutlineTimer className="text-xl text-yellow-500 mr-2" />
                                    <span className="font-semibold">Time:</span>
                                    <span>{event.time || "Not Available"}</span>
                                </div>
                                <div className="flex items-center">
                                    <GrLocationPin className="text-xl text-red-500 mr-2" />
                                    <span className="font-semibold">Venue:</span>
                                    <span className="truncate">{event.location || "Venue not specified"}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'participants' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Participants</h2>
                            <p>No participants have registered yet.</p>
                        </div>
                    )}
                    {activeTab === 'gallery' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                            <p>Gallery is currently empty.</p>
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
          <div className="md:ml-[8rem] w-full overflow-y-auto no-scrollbar">
            <TopSection />
            <Body />
          </div>
        </div>
      </>
  );
  
}

export default EventView