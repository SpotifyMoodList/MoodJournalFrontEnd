import React, { useEffect } from "react";
import { useSpotify } from "../components/SpotfiyContext"; // Adjust the path as necessary
import { Button } from "../@/components/ui/button";

const Home = () => {
  const { token, handleLogin } = useSpotify();

  useEffect(() => {
    if (token) {
      window.location.href = "/calendar";
    }
  }, [token]);

  return (
    //home page with a black background, a big title, and a button to login
    <div className="w-full h-full bg-black flex flex-col justify-center items-center gap-10">
      <p className="text-7xl text-white font-bold">Welcome to Moodify!</p>
      <Button onClick={handleLogin} className="text-xl w-64 h-16">
        Login with Spotify
      </Button>
    </div>
  );
};

export default Home;
