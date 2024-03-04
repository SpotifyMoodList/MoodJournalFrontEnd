import React from "react";
import { Nav, NavLink, Bars, NavBtn } from "./NavbarElements";
import { useEffect, useState } from "react";
import { useSpotify } from "../SpotfiyContext"; // Adjust the path as necessary
import { Button } from "../../@/components/ui/button";

const Navbar = () => {
  const { token } = useSpotify();
  const [profile, setProfile] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const fetchProfile = async () => {
    try {
      const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await result.json();
      setProfile(data);
      setProfileImage(
        data.images[0]?.url ||
          "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token, fetchProfile]);

  const logout = () => {
    window.localStorage.removeItem("spotify_token");
    setProfile("");
    setProfileImage("");
    window.location.href = "/";
  };

  return (
    <>
      <Nav className="h-[85px] bg-[#1DB954] flex flex-row w-full justify-between px-10">
        <Bars />
        <div className="flex flex-row justify-center items-center gap-2">
          <NavLink to="/">
            <img
              src="/6134110.png"
              alt="logo"
              style={{ width: "40px", height: "40px" }}
            />
          </NavLink>
          <p className="text-black text-3xl font-bold">Moodify</p>
        </div>
        {token && (
          <>
            <div className="flex flex-row gap-10">
              <div className="flex flex-row h-full justify-center items-center gap-4">
                {profile.display_name && <p>Welcome, {profile.display_name}</p>}
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
              </div>
              <NavBtn>
                <Button onClick={logout}>Logout</Button>
              </NavBtn>
            </div>
          </>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
