import { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Base styles for the calendar
import AdminNav from '../../../components/AdminNav';
import TopSection from '../../../components/TopSection';
import './customCalendarStyles.css'; // Custom CSS to match your theme

// Initialize localizer for moment.js
const localizer = momentLocalizer(moment);

const eventsData = [
  {
    id: 1,
    title: "Project Meeting",
    start: new Date(2024, 9, 12, 10, 0), // Example date (12 Oct 2024)
    end: new Date(2024, 9, 12, 11, 0),
  },
  {
    id: 2,
    title: "Code Review",
    start: new Date(2024, 9, 14, 14, 0),
    end: new Date(2024, 9, 14, 15, 30),
  },
];

const Body = () => {
  const [events, setEvents] = useState(eventsData);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents([...events, { start, end, title }]);
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
      <BigCalendar
        localizer={localizer}
        events={events}
        selectable
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={() => ({
          style: { backgroundColor: '#4CAF50', color: '#fff' }, // Customize event style
        })}
        views={['month', 'week', 'day']}
        defaultView="month"
      />
    </div>
  );
};

const Calendar = () => {
  return (
    <div className="bg-black text-[#f0f0f0] sm:min-h-screen lg:h-screen flex">
      <AdminNav />
      <div className="md:ml-[8rem] w-full overflow-y-auto no-scrollbar">
        <TopSection />
        <Body />
      </div>
    </div>
  );
};

export default Calendar;
