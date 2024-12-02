import axios from "axios";
import React, { useEffect, useState } from "react";

// Define a TypeScript type for the song objects
interface Song {
  _id: string;
  title: string;
  artist: string;
  duration: number; // duration in seconds
}

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]); // Explicitly type the state

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get<Song[]>(
          "http://localhost:5000/api/songs"
        );
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div>
      <h1>Welcome to Smoothie Plays</h1>
      <h2>Song List:</h2>
      <ul>
        {songs.map((song) => (
          <li key={song._id}>
            {song.title} by {song.artist} ({Math.floor(song.duration / 60)}:
            {song.duration % 60})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
