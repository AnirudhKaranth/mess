import React, { useState, useEffect } from 'react';
import './Vote.css';
import Navbar from './Navbar';

const Vote = () => {
  const [selectedFids, setSelectedFids] = useState({});
  const [isDisabledSat, setisDisabledSat] = useState(false)
  const [isDisabledSun, setisDisabledSun] = useState(false)
  const [weekendMenu, setWeekendMenu] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

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
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          votes: selectedMenuItems.map((menuItem) => ({
            day: menuItem.Day,
            timeslot: menuItem.Timeslot,
            Fid: selectedFids[`${day}-${menuItem.Timeslot}`],
          })),
        }),
      });
      
      if (!response.ok) {
        alert('Already voted')
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if(day==="SATURDAY"){
        setisDisabledSat(true)
      } else{
        setisDisabledSun(true)
      }
      alert('Voted')
    } catch (error) {
      console.error('Error finalizing vote:', error);
    }
  };

  const handleChange = (e, key) => {
    setSelectedFids((prevSelectedFids) => ({
      ...prevSelectedFids,
      [key]: e.target.value,
    }));
  };
  

  return (
    <div className='full-screen nav_vote_container'>
      <Navbar />
      <br />  
    <h2>VOTE</h2>
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
                      <div className="menu_item">{/*{menuItem.Food.Fname}*/}</div>
                    </div>
                    <div className="vote_section">

                    <select
                      type="number"
                      name="Fid"
                      value={selectedFids[`${day}-${menuItem.Timeslot}`] || ''}
                      onChange={(e) => handleChange(e, `${day}-${menuItem.Timeslot}`)}
                      required
                    >
                        <option value="" disabled>Select</option>
                {(day === 'SATURDAY' && menuItem.Timeslot === 'Morning') && (
                  <>
                    <option value="21">Masala Dosa</option>
                    <option value="22">Chole Bhature</option>
                    <option value="23">Rava Idli</option>
                    <option value="24">Pav Bhaji</option>
                    <option value="25">Dahi Vada</option>
                    <option value="26">Poori Baaji</option>
                  </>
                )}
                {(day === 'SUNDAY' && menuItem.Timeslot === 'Morning') && (
                  <>
                    <option value="21">Masala Dosa</option>
                    <option value="22">Chole Bhature</option>
                    <option value="23">Rava Idli</option>
                    <option value="24">Pav Bhaji</option>
                    <option value="25">Dahi Vada</option>
                    <option value="26">Poori Baaji</option>
                  </>
                )}
                {(day === 'SATURDAY' && menuItem.Timeslot === 'Afternoon') && (
                  <>
                    <option value="31">Pundi Ghasi</option>
                    <option value="32">Egg Burji/Soya Chunks</option>
                    <option value="33">Chicken/Paneer Green Masala</option>
                    <option value="34">Chicken/Paneer Kabab</option>
                    <option value="35">Fish/Babycorn Fry</option>
                  </>
                )}
                {(day === 'SUNDAY' && menuItem.Timeslot === 'Afternoon') && (
                  <>
                    <option value="31">Egg Burji/Soya Chunks</option>
                    <option value="32">Pundi Ghasi</option>
                    <option value="33">Chicken/Paneer Green Masala</option>
                    <option value="34">Chicken/Paneer Kabab</option>
                    <option value="35">Fish/Babycorn Fry</option>
                  </>
                )}
                {(day === 'SATURDAY' && menuItem.Timeslot === 'Night') && (
                  <>
                    <option value="41">Biriyani</option>
                    <option value="42">Parota Sukka/Kurma</option>
                    <option value="43">Fried Rice</option>
                    <option value="44">Noodles</option>
                    <option value="45">Chicken/Paneer Butter Masala</option>
                    <option value="46">Chicken/Mushroom Pepper</option>
                  </>
                )}
                {(day === 'SUNDAY' && menuItem.Timeslot === 'Night') && (
                  <>
                    <option value="41">Biriyani</option>
                    <option value="42">Parota Sukka/Kurma</option>
                    <option value="43">Fried Rice</option>
                    <option value="44">Noodles</option>
                    <option value="45">Chicken/Paneer Butter Masala</option>
                    <option value="46">Chicken/Mushroom Pepper</option>
                  </>
                )}
</select>
                    </div>
                  </div>
                ))}
              </div>
              {day==="SATURDAY" && <button className="finalize_button" onClick={()=> handleFinalizeVote(day)} disabled={isDisabledSat}>Finalize Vote</button>}
              {day==="SUNDAY" && <button className="finalize_button" onClick={()=> handleFinalizeVote(day)} disabled={isDisabledSun}>Finalize Vote</button>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Vote;
