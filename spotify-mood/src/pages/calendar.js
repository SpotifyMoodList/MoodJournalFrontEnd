import React from 'react';
import CalendarApp from '../components/Calendar';
  
const Calendar = () => { 
  return (
    <div>
      {/* <h1>Mood Calendar</h1> */}
      <CalendarApp />
    </div>
    //display the calendar
    // <div 
    //   style={{ 
    //     display: 'flex', 
    //     justifyContent: 'Right', 
    //     alignItems: 'Right', 
    //     height: '100vh'
    //   }} 
    // > 
    //   <h1>Welcome to GeeksforGeeks Team</h1> 
    // </div> 
  ); 
}; 
  
export default Calendar;