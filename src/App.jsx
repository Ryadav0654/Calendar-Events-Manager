// src/App.jsx
import React, { useState } from 'react';
import CalendarGrid from './Components/CalenderGrid';
import { EventProvider } from './Context/EventContext';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <EventProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <CalendarGrid />
      </div>
    </EventProvider>
  );
}

export default App;
