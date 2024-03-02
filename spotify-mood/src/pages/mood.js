//make basic mood page

import React from 'react';

const Mood = () => {
  const songs = JSON.parse(localStorage.getItem('songs'));
  console.log(songs);
  console.log(songs[0].name);

  return (
    //display the mood page with the list of songs, but check if the songs are there first
    <div>
      <h1>Your Mood</h1>
      <ul>
        {songs && songs.map((song, index) => (
          <li key={index}>{song.name} by {song.artist['#text']}</li>
        ))}
        
      </ul>
    </div>
  );
}

export default Mood;
