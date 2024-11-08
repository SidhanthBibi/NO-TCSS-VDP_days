// client/src/components/TimetableCalendar.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const TimetableCalendar = ({ userType }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    // Fetch events from the server based on userType
    const response = await fetch(`/api/events?userType=${userType}`);
    const data = await response.json();
    setEvents(data);
  };

  const handleSelect = async ({ start, end }) => {
    if (userType === 'teacher' || userType === 'clubLeader') {
      const title = window.prompt('Enter event title:');
      if (title) {
        const newEvent = { start, end, title };
        const response = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEvent),
        });
        if (response.ok) {
          setEvents([...events, newEvent]);
        }
      }
    }
  };

  return (
    <div className="timetable-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable={userType === 'teacher' || userType === 'clubLeader'}
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default TimetableCalendar;