import React from 'react'; 
import { 
  Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, 
} from './NavbarElements'; 
import { useState , useEffect} from 'react';

  
const Navbar = () => { 
  const [token, setToken] = useState("")
  const [profile, setProfile, setProfileImage] = useState('')
  // const token = window.localStorage.getItem('token')

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
      setProfileImage(data.images[0].url);
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

      // Fetch the user's profile and set the profile and profileImage states
      fetchProfile(token);
    }
  }, [])


  var profileImage;
  const CLIENT_ID = '5317c4cfb0fe43448183a30a0ad065e6'
  const REDIRECT_URI = 'http://localhost:3000/'
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'token'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // var username = profile.display_name;
  // const userProfilePic = profile.images[0].url;
  // if (profile.images) {
  //       const profileImage = new Image(200, 200);
  //   // profileImage.src = profile.images[0].url;
    
  //       // document.getElementById("avatar")!.appendChild(profileImage);
  // }
  // else {
  //   const profileImage = new Image(200, 200);
  //   profileImage.src = "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"; 
  // }
  // img userProfileImage = profile.


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
  // if (token) {
  //   setIsLoggedIn(true);
  //   //get profile picture
  //   //get username

  // }

  return ( 
    //get token from address if it exists
    //if it exists, set isloggedin to true
    //if token no empty, set isloggedin to true

    
    <> 
      <Nav> 
        <Bars/>
        <NavLink to='/'>
          <h1>Logo</h1>
        </NavLink>
        <NavMenu> 
          <NavLink to='/about' activeStyle> 
            About 
          </NavLink> 
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
            <NavBtnLink to='/login' onClick={handleLogin}>
              Login to Spotify
            </NavBtnLink>
          )}
        </NavBtn>
      </Nav> 
    </> 
  ); 
}; 
  
export default Navbar;