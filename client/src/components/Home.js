// Home.js
import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from './Navbar';

const Home = () => {
  const [menuData, setMenuData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('http://localhost:5000/menu') // Adjust endpoint if you've made changes
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMenuData(data))
      .catch((error) => {
        console.error('Error fetching menu data:', error);
        setError('Error fetching menu data. Please try again later.');
      });
  }, []);

  const groupMenuByDay = () => {
    const groupedMenu = {};
    menuData.forEach((menuItem) => {
      if (!groupedMenu[menuItem.Day]) {
        groupedMenu[menuItem.Day] = [];
      }
      groupedMenu[menuItem.Day].push(menuItem);
    });
    return groupedMenu;
  };

  return (
    <div className='nav-home-container'>
      <Navbar />
      <br />
      <h2 style={{fontSize:'46px'}}>MESS</h2>
      <div className="home-container">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          Object.entries(groupMenuByDay()).map(([day, meals]) => (
            <div key={day} className="menu-card">
              <div className="day-header">{day}</div>
              <div className="meals-container">
                {meals.map((menuItem) => (
                  <div key={menuItem.Menuid} className="meal-section">
                    <div className="meal-time">{menuItem.Timeslot}</div>
                    <div className="menu-item">{menuItem.Food.Fname}</div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
