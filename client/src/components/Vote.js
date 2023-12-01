import React, { useState, useEffect } from 'react';
import './Vote.css';
import Navbar from './Navbar';

const Vote = () => {
  const [selectedFids, setSelectedFids] = useState({});

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

  const handleFinalizeVote = async (day) => {
    try {
      const selectedMenuItems = weekendMenu.filter((menuItem) => menuItem.Day === day);
  
      const response = await fetch('http://localhost:5000/votemenu', {
        method: 'POST',
        headers: {
          'userId': 2,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          votes: selectedMenuItems.map((menuItem) => ({
            day: menuItem.Day,
            timeslot: menuItem.Timeslot,
            Fid: selectedFids[menuItem.Timeslot],
          })),
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error finalizing vote:', error);
    }
  };

  const handleChange = (e, timeslot) => {
    setSelectedFids((prevSelectedFids) => ({
      ...prevSelectedFids,
      [timeslot]: e.target.value,
    }));
  };

  return (
    <>
      <Navbar />

      <div className="home_container">
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
                    <div className="vote_section">
                     
              <select type="number" name="Fid" value={selectedFids[menuItem.Timeslot] || ''} onChange = {(e) => handleChange(e, menuItem.Timeslot)} required
              >
                <option value="" disabled >Select</option>
                <option value="1">Fname1</option>
                <option value="2">Fname2</option>
                <option value="3">Fname3</option>
                <option value="4">Fname4</option>
              </select>
            
                    </div>
                  </div>
                ))}
              </div>
              <button className="finalize_button" onClick={() => handleFinalizeVote(day)}>
                {/* disabled={isVoteFinalized[day]} */}
                Finalize Vote
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Vote;
