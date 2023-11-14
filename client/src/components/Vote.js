// const userId = 3; // Replace with the actual user ID (you may get it from authentication)

//   const handleVote = async () => {
//     try {
//       const response = await fetch('/votemenu', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           userId: userId,
//         },
//         body: JSON.stringify({ votes }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         console.log('Vote successful');
//         // Handle success, e.g., show a success message
//       } else {
//         console.error('Vote failed:', data.error);
//         // Handle failure, e.g., show an error message to the user
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle unexpected errors
//     }
//   };

//VOTE TEMPORARY
import React, { useState, useEffect } from 'react';
import './Vote.css';
import Navbar from './Navbar';

const Vote = () => {
  const [weekendMenu, setWeekendMenu] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data for Saturday and Sunday from your API endpoint
    fetch('http://localhost:5000/menu') // Adjust endpoint if you've made changes
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Filter the data to include only Saturday and Sunday menu items
        const weekendData = data.filter((menuItem) => menuItem.Day === 'SATURDAY' || menuItem.Day === 'SUNDAY');
        setWeekendMenu(weekendData);
      })
      .catch((error) => {
        console.error('Error fetching weekend menu data:', error);
        setError('Error fetching weekend menu data. Please try again later.');
      });
  }, []);

  const groupMenuByDay = () => {
    const groupedMenu = {};
    weekendMenu.forEach((menuItem) => {
      if (!groupedMenu[menuItem.Day]) {
        groupedMenu[menuItem.Day] = [];
      }
      groupedMenu[menuItem.Day].push(menuItem);
    });
    return groupedMenu;
  };

  return (
    <>
      <Navbar />

      <div className="vote_container">
        {error ? (
          <div className="error_message">{error}</div>
        ) : (
          Object.entries(groupMenuByDay()).map(([day, meals]) => (
            <div key={day} className="day_container">
              <div className="day_header">{day}</div>
              <div className="meals_container">
                {meals.map((menuItem) => (
                  <div key={menuItem.Menuid} className="menu_card">
                    <div className="meal_section">
                      <div className="meal_time">{menuItem.Timeslot}</div>
                      <div className="menu_item">{menuItem.Food.Fname}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Vote;
