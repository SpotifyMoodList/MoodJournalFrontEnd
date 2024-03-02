import React from 'react'; 
  
const Home = () => { 
  return ( 
    //home page with a black background, a big title, and a button to login
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', // Stack items vertically
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
        height: '100vh', // Full height of the viewport
        backgroundColor: 'black', // Set background color to black
        color: 'white', // Set text color to white for better contrast
      }}
    >
      <h1>Welcome to Mood Journal</h1>
      <h2>Log in to Spotify to get started</h2>
      <div style={{
        position: 'absolute', // Position the login button
        bottom: '20px' // Place it at the bottom of the screen
      }}>
        <a href="http://localhost:3000/login">
          <button>Login with Spotify</button>
        </a>
      </div>
    </div>

  ); 
}; 
  
export default Home;