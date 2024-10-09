/* eslint-disable no-unused-vars */
import AdminNav from "../../../components/AdminNav";
import TopSection from "../../../components/TopSection";
import colors from '../../../assets/images/colors.png';
import flippedcolors from '../../../assets/images/colors-flip.png';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import getCookieValue from "../../../utils/token";
import { useNavigate, useParams } from "react-router-dom";

const Body = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        description: "",
        time: "",
        location: "",
        image: ""
    });

    const fetchEvent = async () => {
        const token = getCookieValue('token');
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}events/getEvent/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            setEvent(res.data.event);
            const eventData = res.data.event;
            const formattedDate = new Date(eventData.date).toISOString().split('T')[0];
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [id]);

    const token = getCookieValue('token');


    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title || "",
                date: event.date || "",
                description: event.description || "",
                time: event.time || "",
                location: event.location || "",
                image: event.image || ""
            });
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventDateTime = new Date(`${formData.date}T${formData.time}`);
        const currentDateTime = new Date();
    
        if (eventDateTime <= currentDateTime) {
          toast.error("Please select a future date and time");
          return;
        }
        e.preventDefault();
        if (
          !formData.title ||
          !formData.description ||
          !formData.date ||
          !formData.time ||
          !formData.location ||
          !formData.image
        ) {
          toast.error("Please fill all fields");
          return;
        }

        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL}events/updateEvent/${id}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            toast.success("Event updated successfully!");
            navigate(`/admin/event/${id}`);
        } catch (err) {
            toast.error("Failed to update event.");
            console.error(err.message);
        }
    };

    const handleSubmitDel = async()=>{
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}events/deleteEvent/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            toast.success("Event deleted successfully!");
            navigate(`/admin/dashboard`);
        } catch (err) {
            toast.error("Failed to delete event.");
            console.error(err.message);
        }
    }

    return (
        <div className="flex flex-col p-[1rem]">
            <div className="p-[2rem] sm:p-[1rem] gap-y-[2rem] w-full lg:justify-around flex flex-col-reverse lg:flex-row items-center bg-transparent shadow-sm shadow-white rounded-md">
                <img src={flippedcolors} className="w-[25rem] lg:block md:w-[20rem] hidden" />
                <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-y-4 lg:gap-y-6">
                    <span className="text-3xl md:text-5xl font-bold w-full text-center">
                        <span>Get Updated</span>
                    </span>
                    <p className="text-lg md:text-xl text-gray-600 w-[20rem] text-center lg:w-[24rem]">
                        Get your events updation simplified
                    </p>
                </div>
                <img src={colors} className="w-[25rem] lg:w-[20rem]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent pt-[1rem] md:p-6 rounded-md shadow-lg">
                <div className="col-span-1">
                    <input
                        type="text"
                        name="title"
                        placeholder="Event Title"
                        className="w-full p-3 rounded-md bg-transparent shadow-sm shadow-white text-white"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <input
                        type="date"
                        name="date"
                        className="w-full p-3 bg-transparent shadow-sm shadow-white text-white"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-2">
                    <textarea
                        name="description"
                        placeholder="Event Description"
                        className="w-full p-3 bg-transparent shadow-sm shadow-white text-white"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="col-span-1">
                    <input
                        type="time"
                        name="time"
                        placeholder="Start Time"
                        className="w-full p-3 bg-transparent shadow-sm shadow-white text-white"
                        value={formData.time}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <input
                        type="text"
                        name="location"
                        placeholder="Event Location"
                        className="w-full p-3 bg-transparent shadow-sm shadow-white text-white"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-2">
                    <input
                        type="text"
                        name="image"
                        placeholder="Cover Image URL"
                        className="w-full p-3 rounded-md bg-transparent shadow-sm shadow-white text-white"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-1 flex gap-x-[2rem]">
                    <button
                        onClick={handleSubmit}
                        className="w-full text-xl bg-green hover:bg-green-500 text-white p-3 rounded-md shadow-md"
                    >
                        Update Event
                    </button>
                </div>
                <div className="col-span-1 flex gap-x-[2rem]">
                <button
                        onClick={handleSubmitDel}
                        className="w-full text-xl bg-red hover:bg-red-500 text-white p-3 rounded-md shadow-md"
                    >
                        Delete Event
                    </button>
                </div>

            </div>
            <Toaster />
        </div>
    );
};

const UpdateEvent = () => {
    return (
        <div className="bg-black text-[#f0f0f0] min-h-screen lg:h-screen flex">
            <AdminNav />
            <div className="md:ml-[8rem] w-full overflow-y-auto no-scrollbar">
                <TopSection />
                <Body />
            </div>
        </div>
    );
};

export default UpdateEvent;
