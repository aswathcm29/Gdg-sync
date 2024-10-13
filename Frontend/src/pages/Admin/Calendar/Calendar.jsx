import { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import AdminNav from '../../../components/AdminNav';
import TopSection from '../../../components/TopSection';
import './customCalendarStyles.css';
import getCookieValue from '../../../utils/token';
import Footer from '../../../components/Footer';

const localizer = momentLocalizer(moment);

const Body = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);



  const emailID = localStorage.getItem("email");
  const token = getCookieValue("token");

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
      console.log(res.data.events); 
      setEvents(res.data.events.map(event => ({
        start: new Date(event.date),
        end: new Date(event.date), 
        title: event.title,
        id: event.id, 
      })));
    } catch (err) {
      console.error('Error fetching events:', err.message);
    } finally {
      setLoading(false); 
    }
  };


  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelectSlot = ({ start }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents([...events, { start, title, id: events.length + 1 }]); 
    }
  };

  const handleSelectEvent = (event) => {
    const action = window.confirm('Do you want to delete this event?');
    if (action) {
      setEvents(events.filter((e) => e.id !== event.id));
    }
  };



  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-6">Calendar</h1>
      {loading ? (
        <p className='h-full items-center justify-center text-2xl'>Loading events...</p> 
      ) : (
        <BigCalendar
          localizer={localizer}
          events={events}
          selectable
          startAccessor="start"
          endAccessor="end"
          style={{ height: 650 }}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          views={['month', 'week', 'day']}
          defaultView="month"
        />
      )}
    </div>
  );
};

const Calendar = () => {
  return (
    <div className="bg-black text-[#f0f0f0] sm:min-h-screen lg:h-screen flex">
      <AdminNav />
      <div className="md:ml-[8rem] w-full overflow-y-auto no-scrollbar flex flex-col">
        <TopSection />
        <Body />
        <Footer />
      </div>
    </div>
  );
};

export default Calendar;
