import React from 'react'; 
import { 
  Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, 
} from './NavbarElements'; 
import { useState , useEffect} from 'react';

  
const Navbar = () => { 
  const [token, setToken] = useState('')
  const [profile, setProfile] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const CLIENT_ID = '5317c4cfb0fe43448183a30a0ad065e6'
  const REDIRECT_URI = 'http://localhost:3000/'
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'token'

  const fetchProfile = async (token) => {
    try {
      const result = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await result.json();
      setProfile(data);
      if (data.images && data.images.length > 0) {
        //print out the profile image
        console.log("hi:");
        setProfileImage(data.images[0]?.url);
      } else {
        // If no profile image is available, you can set a default image
        setProfileImage('https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if (!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
      window.location.hash = ''
      window.localStorage.setItem('token', token)
    }

    setToken(token)
    if (token) {
      setIsLoggedIn(true);
      fetchProfile(token);
    }
  }, [])


  const handleLogin = () => {
    // Call your login function here
    //navigate to this href link
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
    // Once you have the login token, set the isLoggedIn state to true
    setIsLoggedIn(true);
  };

 const logout = () => {
    window.localStorage.removeItem('token');
    setToken('');
    setIsLoggedIn(false);
  };

  return (     
    <> 
      <Nav> 
        <Bars/>
        <NavLink to='/'>
          <h1>Logo</h1>
        </NavLink>
        <NavMenu> 
          <NavLink to='/calendar' activeStyle> 
            Calendar 
          </NavLink> 
          {/* Second Nav */} 
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */} 
        </NavMenu> 
        <NavBtn>{token && <button onClick={logout}>Logout</button>}</NavBtn>
        <NavBtn>
          {isLoggedIn ? (
            <div>
              {profile.display_name && (
                <p>Welcome, {profile.display_name}</p>
              )}
              <img src={profileImage} alt="ProfileDP" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            </div>
          ) : (
            <NavBtnLink to='/login' onClick={handleLogin} style={{ width: '130px', height: '20px' }}>
              Login with Spotify
            </NavBtnLink>
          )}
        </NavBtn>
      </Nav> 
    </> 
  ); 
}; 
  
export default Navbar;