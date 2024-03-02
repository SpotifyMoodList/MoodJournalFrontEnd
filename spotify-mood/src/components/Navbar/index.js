import React from 'react'; 
import { 
  Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, 
} from './NavbarElements'; 
import { useEffect, useState } from 'react';
import { useSpotify } from '../SpotfiyContext'; // Adjust the path as necessary

const Navbar = () => { 
  const { token, handleLogin } = useSpotify();
  const [profile, setProfile] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const fetchProfile = async () => {
    try {
      const result = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await result.json();
      setProfile(data);
      setProfileImage(data.images[0]?.url || 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const logout = () => {
    window.localStorage.removeItem('spotify_token');
    setProfile('');
    setProfileImage('');
  };

  return (     
    <> 
      <Nav> 
        <Bars/>
        <NavLink to='/'>
          <img src='/6134110.png' alt='logo' style={{ width: '40px', height: '40px' }} /> 
        </NavLink>
        <NavMenu> 
          <NavLink to='/calendar' activeStyle> 
            Calendar 
          </NavLink> 
        </NavMenu> 
        <NavBtn>
          {token ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <NavBtnLink to='/login' onClick={handleLogin}>
              Login with Spotify
            </NavBtnLink>
          )}
        </NavBtn>
        {token && (
          <div>
            {profile.display_name && <p>Welcome, {profile.display_name}</p>}
            <img src={profileImage} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          </div>
        )}
      </Nav> 
    </> 
  ); 
}; 
  
export default Navbar;
