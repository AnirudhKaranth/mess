import React, { useState, useEffect } from 'react';
import './EditMenu.css';
import Navbar from './Navbar';

const EditMenu = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedFood, setSelectedFood] = useState('');
  const [foodOptions, setFoodOptions] = useState([]);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleFoodChange = (event) => {
    setSelectedFood(event.target.value);
  };

  useEffect(() => {
    const fetchFoodOptions = async () => {
      try {
        const response = await fetch('http://localhost:5000/foodnames');
        if (!response.ok) {
          throw new Error('Failed to fetch food options');
        }
        const data = await response.json();
        console.log('Food Options:', data); 
        setFoodOptions(data);
      } catch (error) {
        console.error('Error fetching food options:', error.message);
        // Handle and display the error to the user
      }
    };

    fetchFoodOptions();
  }, []);

  const handleApplyChanges = async () => {
    try {
      // Construct the request body
      const requestBody = {
        selectedDay,
        selectedTime,
        selectedFood: parseInt(selectedFood, 10)
      };
      console.log('Request Body:', requestBody);

      // Send a PUT request to the backend route
      const response = await fetch('http://localhost:5000/editmenu', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to update menu');
      }

      alert('Menu Updated')
      
      // Handle success or update UI as needed
      console.log('Menu updated successfully');
    } catch (error) {
      console.error('Error updating menu:', error.message);
      // Handle and display the error to the user
    }
  };

  return (
    <div className="full-screen bgContainer">
      <Navbar />
      <div className=" editContainer">
        <div className="group">
          <u>Day of the Week</u>
          <div className="labelContainer">
            {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map((day) => (
              <label key={day} className="label">
                <input type="radio" value={`${day}`} checked={selectedDay === `${day}`} onChange={handleDayChange} />
                {`  ${day}`}
              </label>
            ))}
          </div>
        </div>
        <div className="group">
          <u>Time of Day</u>
          <div className="labelContainer">
            {['Morning', 'Afternoon', 'Night'].map((time) => (
              <label key={time} className="label">
                <input type="radio" value={time} checked={selectedTime === time} onChange={handleTimeChange} />
                {` ${time}`}
              </label>
            ))}
          </div>
        </div>
        <div className="group">
          <u>Food Options</u>
          <div className="labelContainer">
            <select type="text" value={selectedFood} onChange={handleFoodChange} required>
            <option value="" disabled selected>
            Select
            </option>
            {foodOptions.map((food) => (
              <option key={food.Fid} value={food.Fid}>
                {food.Fname}
              </option>
            ))}
          </select>
        </div>
        </div>
        <button onClick={handleApplyChanges}>Apply Changes</button>
      </div>
    </div>
  );
};

export default EditMenu;
