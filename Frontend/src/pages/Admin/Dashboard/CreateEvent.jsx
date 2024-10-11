/* eslint-disable no-unused-vars */
import AdminNav from "../../../components/AdminNav";
import TopSection from "../../../components/TopSection";
import colors from '../../../assets/images/colors.png';
import flippedcolors from '../../../assets/images/colors-flip.png';
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import getCookieValue from "../../../utils/token";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: "",
    tags: [],
  });

  const token = getCookieValue('token');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagAddition = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        tags: [...formData.tags, e.target.value.trim()],
      });
      e.target.value = "";
    }
  };

  const removeTag = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: newTags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.date).getFullYear() > 2026) {
      toast.error("Please select a date before the year 2027");
      return;
    }

    const eventDateTime = new Date(`${formData.date}T${formData.time}`);
    const currentDateTime = new Date();

    if (eventDateTime <= currentDateTime) {
      toast.error("Please select a future date and time");
      return;
    }

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

    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      image: formData.image,
      tags: formData.tags,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}events/createEvent`,
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        toast.success("Event created successfully");
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          image: "",
          tags: [],
        });

        navigate('/admin/dashboard');
      }
    } catch (err) {
      toast.error("Failed to create event");
    }
  };

  return (
    <div className="flex flex-col p-[1rem]">
      <div className="p-[2rem] sm:p-[2rem] gap-y-[2rem] w-full lg:justify-around flex flex-col-reverse lg:flex-row items-center bg-transparent shadow-sm shadow-white rounded-md">
        <img src={flippedcolors} className="w-[25rem] lg:block md:w-[20rem] hidden" />
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-y-4 lg:gap-y-6">
          <span className="text-3xl md:text-5xl font-bold w-full text-center text-[#f0f0f0]">
            <span>Create Event</span>
          </span>
          <p className="text-lg md:text-xl text-gray-400 w-[20rem] text-center lg:w-[24rem]">
            Get your events creation simplified
          </p>
        </div>
        <img src={colors} className="w-[25rem] lg:w-[20rem]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent pt-[1rem] md:pt-[1rem] h-full justify-center items-center rounded-md shadow-lg">
        <div className="col-span-1">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            className="w-full p-3 bg-gray-900 text-white rounded-md hover:-translate-y-1 transition-all "
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="date"
            name="date"
            className="w-full p-3 bg-gray-900 text-white rounded-md hover:-translate-y-1 transition-all "
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2">
          <textarea
            name="description"
            placeholder="Event Description"
            className="w-full p-3 bg-gray-900 text-white rounded-md hover:-translate-y-1 transition-all "
            rows="4"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-span-2">
  <div className="flex flex-wrap items-center w-full p-3 bg-gray-900 text-white rounded-md hover:-translate-y-1 transition-all gap-2">
    {formData.tags.map((tag, index) => (
      <span
        key={index}
        className="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center"
      >
        {tag}
        <button
          className="ml-2 text-sm text-white"
          onClick={() => removeTag(index)}
        >
          &times;
        </button>
      </span>
    ))}
    <input
      type="text"
      name="tags"
      placeholder="Add Tags"
      className="flex-grow bg-transparent border-none outline-none text-white"
      onKeyDown={handleTagAddition}
    />
  </div>
</div>

        <div className="col-span-1">
          <input
            type="time"
            name="time"
            className="w-full p-3 bg-gray-900 text-white rounded-md hover:-translate-y-1 transition-all "
            value={formData.time}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="location"
            placeholder="Event Location"
            className="w-full p-3 bg-gray-900 text-white rounded-md hover:-translate-y-1 transition-all "
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-2">
          <input
            type="text"
            name="image"
            placeholder="Cover Image URL"
            className="w-full p-3 bg-gray-900 text-white rounded-md hover:-translate-y-1 transition-all "
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-2">
          <button
            onClick={handleSubmit}
            className="w-full bg-green hover:bg-green-600 text-white p-3 rounded-md shadow-md"
          >
            Create Event
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

const CreateEvent = () => {
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
  );
};

export default CreateEvent;
