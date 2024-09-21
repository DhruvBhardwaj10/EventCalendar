import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
function EventForm() {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    reminder: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { user } = useUser();  // Get Clerk user object

  useEffect(() => {
    if (id) {
      fetchEvent();
    } else if (location.state) {
      setEvent({
        ...event,
        start: location.state.start.toISOString().slice(0, 16),
        end: location.state.end.toISOString().slice(0, 16),
      });
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      const userId = user.id;
      const response = await axios.get(`https://eventcalendar-backend.onrender.com/api/events/${id}/${userId}`);
      setEvent({
        ...response.data,
        start: new Date(response.data.start).toISOString().slice(0, 16),
        end: new Date(response.data.end).toISOString().slice(0, 16),
        reminder: response.data.reminder ? new Date(response.data.reminder).toISOString().slice(0, 16) : '',
      });
      
    } catch (error) {
        
      console.error('Error fetching event:', error);
    }
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = user.id;  // Pass userId in request body
      if (id) {
        await axios.put(`http://localhost:4000/api/events/${id}`, { ...event, userId });
      toast.success("Event updated successfully")

      } else {
        await axios.post('https://eventcalendar-backend.onrender.com/api/events', { ...event, userId });  // Pass userId when creating event
      toast.success("Event created successfully")

      }

      navigate('/');
    } catch (error) {
      console.error('Error saving event:', error);
      toast.warning("Error in creating/updating the event")
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const userId = user.id;
        await axios.delete(`https://eventcalendar-backend.onrender.com/api/events/${id}/${userId}`);  // Pass userId in URL
        navigate('/');
      toast.success("Event deleted successfully")

      } catch (error) {
        console.error('Error deleting event:', error);
        toast.warning("Error in deleting the event")

      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Event' : 'Create Event'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label htmlFor="start" className="block mb-1">Start</label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={event.start}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="end" className="block mb-1">End</label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={event.end}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="reminder" className="block mb-1">Reminder</label>
          <input
            type="datetime-local"
            id="reminder"
            name="reminder"
            value={event.reminder}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {id ? 'Update' : 'Create'} Event
        </button>
        {id && (
          <button
            type="button"
            onClick={handleDelete}
            className="ml-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
}

export default EventForm;
