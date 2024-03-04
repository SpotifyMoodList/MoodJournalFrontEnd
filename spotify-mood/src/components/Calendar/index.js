// export default CalendarApp;
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useSpotify } from "../SpotfiyContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../../@/components/ui/button";
import { calculateMoodFromSpotifyFeatures } from "../../@/lib/utils";
import { MoveDown } from "lucide-react";
import { Loader2 } from "lucide-react";

const CalendarApp = () => {
  const { token } = useSpotify();
  const navigate = useNavigate();
  const [lastListenedSong, setLastListenedSong] = useState(null);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [mood, setMood] = useState(undefined);
  const userName = "Kushion32";
  const apiKey = "51cf10fb7444a0015d2ccf2a59347aa4";
  const handleDayButtonClick = async (dateISOString) => {
    try {
      // console.log("Using token for Spotify API:", token);
      // // &after=${start}&before=${end}
      // //?limit=20&after=${start}

      // const result = await fetch(`https://api.spotify.com/v1/me/player/recently-played`, {
      //   method: 'GET',
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      // const data = await result.json();
      // console.log("The songs from the last little bit are", data);
      // localStorage.setItem('songs', JSON.stringify(data.items)); // Save songs to Local Storage
      // navigate('/mood');
      // // Assuming data contains the details of the last listened song
      // setLastListenedSong(data.items[0].track); // or the appropriate path to the song details
      const date = new Date(dateISOString);
      date.setHours(0, 0, 0, 0); // Adjust to the start of the day in the local time zone

      // The Spotify API expects the timestamp in milliseconds since the Unix epoch
      const after = date.getTime();

      console.log(
        `Fetching songs played after ${date.toISOString()} (${after})`
      );

      const apiUrl = `https://api.spotify.com/v1/me/player/recently-played?limit=50&after=${after}`;
      console.log("API URL:", apiUrl);

      const result = await fetch(apiUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      //console log the api key
      console.log("API Key:", token);

      if (!result.ok)
        throw new Error(`API request failed with status ${result.status}`);

      const data = await result.json();
      console.log("The songs from the specified day are", data);

      if (data.items && data.items.length > 0) {
        localStorage.setItem("songs", JSON.stringify(data.items));
        navigate("/mood");
        setLastListenedSong(data.items[0].track);
      } else {
        console.log("No songs were found for the specified day.");
        setLastListenedSong(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  async function searchSpotifyForTrack(artist, track) {
    const query = encodeURIComponent(`artist:${artist} track:${track}`);
    const apiUrl = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.tracks.items[0]?.id; // Return the first track's ID
  }

  async function getSpotifyTrackFeatures(trackId) {
    const apiUrl = `https://api.spotify.com/v1/audio-features/${trackId}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API URL:", apiUrl);
    // console.log("response:", response.json());
    return response.json(); // Return the track's features
  }

  const buttonClick = async (dateISOString) => {
    setMood("loading");
    try {
      console.log("Using token for Spotify API:", token);
      const date = new Date(dateISOString);
      date.setHours(0, 0, 0, 0); // Adjust to the start of the day in the local time zone

      // Last.fm uses timestamps in seconds since the Unix epoch
      //concver the time to unix
      // const from = 1708866907
      // const to = 1708953307

      const from = date / 1000; // Convert milliseconds to seconds
      const to = date / 1000 + 86400; // Add one day in seconds

      const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${userName}&api_key=${apiKey}&format=json&from=${from}&to=${to}`;
      // console.log("API URL apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok)
        throw new Error(`API request failed with status ${response.status}`);

      const data = await response.json();
      console.log("The songs from the specified day are", data);
      //make a features array
      let features = [];
      // const track = data.recenttracks.track[0];

      const promises = [];
      for (const track of data.recenttracks.track) {
        const artistName = track.artist["#text"];
        const trackName = track.name;

        promises.push(searchSpotifyForTrack(artistName, trackName));
      }

      const spotifyTrackIds = await Promise.all(promises);

      const featPromises = [];
      for (const spotifyTrackId of spotifyTrackIds) {
        if (spotifyTrackId) {
          featPromises.push(getSpotifyTrackFeatures(spotifyTrackId));
        } else {
          console.log(`Spotify track not found for id ${spotifyTrackId}`);
        }
      }

      features = await Promise.all(featPromises);

      console.log("Features for all tracks:", features);

      // Process the data as needed for your application
      if (data.recenttracks && data.recenttracks.track.length > 0) {
        setMood(calculateMoodFromSpotifyFeatures(features));
        // Example: Store the tracks in local storage
        // localStorage.setItem('songs', JSON.stringify(features));
        // navigate('/mood');
        // Optionally set a song or data to state here
      } else {
        console.log("No songs were found for the specified day.");
        setLastListenedSong(null);
      }
    } catch (error) {
      console.error("Error fetching data from Last.fm:", error);
    }
  };

  useEffect(() => {
    const buttons = document.querySelectorAll(".get-mood-button");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const dateISO = e.target.getAttribute("data-date");
        console.log(`Date from button: ${dateISO}`); // Log the ISO string for debugging

        const date = new Date(dateISO);
        date.setHours(0, 0, 0, 0);
        const after = date.getTime();

        console.log(
          `Converted timestamp for API: ${after} (${date.toISOString()})`
        ); // Verify the converted date
        // handleDayButtonClick(dateISO);
        buttonClick(dateISO);
      });
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", handleDayButtonClick);
      });
    };
  });

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row-reverse w-full justify-around px-10 pt-10">
        {dates.map((date) => (
          <Button
            className="w-20 h-20 text-xl font-bold"
            onClick={() => {
              setSelectedDate(date);
              setMood(undefined);
            }}
            asChild
          >
            <div className="flex flex-col justify-center items-center">
              <p>{date.toLocaleString("default", { month: "short" })}</p>
              <p>{date.getDate()}</p>
            </div>
          </Button>
        ))}
      </div>
      <div className="h-full w-full flex flex-col justify-center items-center bg-red gap-5">
        <p className="text-[120px] font-bold text-white">
          {selectedDate
            ? `${selectedDate.toLocaleString("default", {
                month: "long",
              })} ${selectedDate.getDate()}`
            : "Select a date"}
        </p>
        {mood && mood !== "loading" ? (
          <p className="text-[100px] font-bold text-white">{mood}</p>
        ) : (
          <Button
            className="w-48 h-12 text-xl font-bold"
            onClick={() => buttonClick(selectedDate?.toISOString())}
            disabled={!selectedDate || mood === "loading"}
          >
            {mood === "loading" && (
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            )}
            Get Mood
          </Button>
        )}
      </div>
      {/* <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        dayCellContent={dayCellContent}
      /> */}
      {lastListenedSong && (
        <div>
          <h2>Last Listened Song</h2>
          <p>Title: {lastListenedSong.name}</p>
          <p>
            Artist:{" "}
            {lastListenedSong.artists.map((artist) => artist.name).join(", ")}
          </p>
          <img src={lastListenedSong.album.images[0].url} alt="Album Cover" />
        </div>
      )}
    </div>
  );
};

export default CalendarApp;
