import { useEffect, useState } from 'react';
import UserNav from '../../../components/UserNav';
import TopSection from '../../../components/TopSection';
import axios from 'axios';
import rings from '../../../assets/images/ring-colors.png';
import getCookieValue from '../../../utils/token';
import Footer from '../../../components/Footer';
import RactCards from '../../../components/RactCards';

const Body = () => {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const token = getCookieValue('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}events/getEventsByParticipant`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [token]);

  const filteredEvents = events.filter(event => {
    const matchesText = event.title.toLowerCase().includes(searchText.toLowerCase()) || 
                        event.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
    const matchesDate = selectedDate ? new Date(event.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString() : true;

    return matchesText && matchesCategory && matchesDate;
  });

  return (
    <div className="flex flex-col px-[1rem] bg-black ">
      <div className="p-[2rem] sm:p-[1rem] gap-y-[2rem] w-full lg:justify-around flex flex-col-reverse lg:flex-row items-center bg-transparent shadow-sm shadow-white rounded-md">
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-y-4 lg:gap-y-6">
          <span className="text-3xl md:text-5xl font-bold w-full text-center">
            <span>Hey <span className='text-blue'>{username} !</span></span>
          </span>
          <p className="text-lg md:text-xl text-gray-400 w-[20rem] text-center lg:w-[24rem]">
            You can view your enrolled events here.
          </p>
        </div>
        <img src={rings} className="w-[13rem] lg:w-[12rem]" />
      </div>
      <div className='w-full flex items-center rounded-md justify-center py-[1rem]'>
      </div>
      <div className='w-full grid md:grid-cols-3 items-center justify-center py-[1rem] gap-4'>
        <input
          className='px-[3rem] sm:px-[1rem] col-span-2 md:col-span-1 py-[1rem] rounded-md bg-gray-800'
          placeholder='Search for your events'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        
        <select
          className='px-[1rem] py-[1rem] rounded-md bg-gray-800'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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
        <div className="grid grid-cols-1 gap-4 py-[1rem]">
          {filteredEvents.map((event) => (
            <RactCards
              key={event._id}
              id={event._id}
              title={event.title}
              description={event.description}
              date={new Date(event.date).toLocaleDateString()}
              time={event.time}
              venue={event.location}
            />
          ))}
        </div>
      ) : (
        <div className="text-gray-400 flex items-center justify-center h-[16rem]">No enrolled events found.</div>
      )}
    </div>
  );
};

const Profile = () => {
  return (
    <div className="bg-black text-[#f0f0f0] min-h-screen lg:h-screen flex">
      <UserNav />
      <div className="md:ml-[8rem] w-full flex-grow overflow-y-auto no-scrollbar flex flex-col  ">
        <TopSection />
        <Body />
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
