import React, { useState, useContext } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  isToday,
} from 'date-fns';
import { EventContext } from '../Context/EventContext';

export default function CalendarGrid() {
  const { events, setSelectedDate, addEvent, editEvent, deleteEvent } = useContext(EventContext);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventDate, setSelectedEventDate] = useState(null);

  const daysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setSelectedEventDate(day);
    setModalOpen(true);
  };

  return (
    <div className="p-4">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded mb-2 sm:mb-0"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          Previous
        </button>
        <h2 className="text-lg font-bold text-center">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button
          className="px-4 py-2 bg-gray-200 rounded mt-2 sm:mt-0"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          Next
        </button>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {daysInMonth().map((day) => (
          <div
            key={day}
            className={`p-4 border rounded text-center cursor-pointer ${
              isToday(day) ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleDayClick(day)}
          >
            <span className="font-bold">{format(day, 'd')}</span>
            <div>
              {(events[format(day, 'yyyy-MM-dd')] || []).map((event, index) => (
                <div key={index} className="text-xs bg-gray-100 mt-1 p-1 rounded">
                  {event.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Manage Events</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const name = formData.get('name');
                const startTime = formData.get('startTime');
                const endTime = formData.get('endTime');
                const description = formData.get('description');
                addEvent(selectedEventDate, { name, startTime, endTime, description });
                setModalOpen(false);
              }}
            >
              <label className="block mb-2">
                Event Name
                <input
                  name="name"
                  type="text"
                  className="w-full border rounded p-2"
                  required
                />
              </label>
              <label className="block mb-2">
                Start Time
                <input
                  name="startTime"
                  type="time"
                  className="w-full border rounded p-2"
                  required
                />
              </label>
              <label className="block mb-2">
                End Time
                <input
                  name="endTime"
                  type="time"
                  className="w-full border rounded p-2"
                  required
                />
              </label>
              <label className="block mb-4">
                Description
                <textarea
                  name="description"
                  className="w-full border rounded p-2"
                ></textarea>
              </label>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
