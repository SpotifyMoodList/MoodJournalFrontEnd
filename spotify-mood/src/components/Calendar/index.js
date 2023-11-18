import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarApp = () => {
  const [lastListenedSong, setLastListenedSong] = useState(null);

  // Function to handle the button click and fetch the last listened song
  const handleDayButtonClick = (date) => {
    // Make a request to Spotify API to get the last listened song
    // Update the state with the song information
    // Example:
    // fetchLastListenedSong(date).then((song) => setLastListenedSong(song));
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          // You can populate this array with events for each day
          {title: 'Click to get Mood of the Day', date: ''}
          // Example: { title: 'Click to Get Last Song', date: '2023-10-01' }
        ]}
        eventClick={(info) => handleDayButtonClick(info.event.start)}
      />
      {lastListenedSong && (
        <div>
          <h2>Last Listened Song</h2>
          <p>Title: {lastListenedSong.title}</p>
          <p>Artist: {lastListenedSong.artist}</p>
          <img src={lastListenedSong.albumCover} alt="Album Cover" />
        </div>
      )}
    </div>
  );
};

export default CalendarApp;