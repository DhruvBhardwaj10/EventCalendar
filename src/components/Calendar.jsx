import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const localizer = momentLocalizer(moment);

function Calendar() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();  // Get Clerk user object

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const userId = user.id;  // Get Clerk userId
      const response = await axios.get(`https://eventcalendar-backend.onrender.com/api/events/${userId}`);  // Passing userId in URL
      setEvents(response.data.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      })));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSelectSlot = (slotInfo) => {
    navigate('/event', { state: { start: slotInfo.start, end: slotInfo.end } });
  };

  const handleSelectEvent = (event) => {
    navigate(`/event/${event._id}`, { state: event });
  };

  return (
    <div className="h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">My Calendar</h1>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        selectable
        className="h-full"
      />
    </div>
  );
}

export default Calendar;
