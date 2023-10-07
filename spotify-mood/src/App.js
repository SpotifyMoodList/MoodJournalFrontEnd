import React from 'react'; 
import './App.css'; 
import Navbar from './components/Navbar'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages'; 
import About from './pages/about'; 
import Login from './pages/login'; 
  
function App() { 
  return ( 
    <Router> 
      <Navbar /> 
      <Routes> 
        <Route path='/' exact component={Home} /> 
        <Route path='/about' component={About} /> 
        <Route path='/login' component={Login} /> 
      </Routes> 
    </Router> 
  ); 
} 
  
export default App;