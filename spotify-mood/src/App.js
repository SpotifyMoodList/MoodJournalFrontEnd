import React from 'react'; 
import './App.css'; 
import Navbar from './components/Navbar'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages'; 
import Calendar from './pages/calendar'; 
import Login from './pages/login'; 
import Mood from './pages/mood';
import { SpotifyProvider } from './components/SpotfiyContext';


  
function App() { 
  return ( 
            <SpotifyProvider>

    <Router> 
      <Navbar /> 
      <Routes> 
          <Route path='/' exact element={<Home />} /> 
          <Route path='/calendar' element={<Calendar />} /> 
          <Route path='/login' element={<Login />} /> 
          <Route path='/mood' element={<Mood />} />
      </Routes> 
      </Router> 
              </SpotifyProvider>


  ); 
} 
  
export default App;