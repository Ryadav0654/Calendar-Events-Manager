import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  const saveEventsToLocalStorage = (updatedEvents) => {
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const addEvent = (date, event) => {
    const formattedDate = date.toISOString().split('T')[0];
    const updatedEvents = {
      ...events,
      [formattedDate]: [...(events[formattedDate] || []), event],
    };
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
  };

  const editEvent = (date, index, updatedEvent) => {
    const formattedDate = date.toISOString().split('T')[0];
    const updatedEvents = {
      ...events,
      [formattedDate]: events[formattedDate].map((event, i) =>
        i === index ? updatedEvent : event
      ),
    };
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
  };

  const deleteEvent = (date, index) => {
    const formattedDate = date.toISOString().split('T')[0];
    const updatedEvents = {
      ...events,
      [formattedDate]: events[formattedDate].filter((_, i) => i !== index),
    };
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
  };

  const setSelectedDate = (date) => {
    // Additional functionality can be added here if needed
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        editEvent,
        deleteEvent,
        setSelectedDate,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
