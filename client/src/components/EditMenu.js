// OptionsSelector.js
import React, { useState } from 'react';
import './EditMenu.css';

const EditMenu = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedFood, setSelectedFood] = useState('');

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleFoodChange = (event) => {
    setSelectedFood(event.target.value);
  };

  const handleApplyChanges = () => {
    // Implement the logic to apply the selected options
    console.log('Selected Day:', selectedDay);
    console.log('Selected Time:', selectedTime);
    console.log('Selected Food:', selectedFood);
  };

  return (
    <div className="full-screen bgContainer">
    <div className=" editContainer">
      <div className="group">
        <u>Day of the Week</u>
        <div className="labelContainer">
          {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map((day) => (
            <label key={day} className="label">
              <input type="radio" value={` ${day}`} checked={selectedDay === ` ${day}`} onChange={handleDayChange} />
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
          <select value={selectedFood} onChange={handleFoodChange}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((food) => (
              <option key={food} value={`Food${food}`}>
                {`Food ${food}`}
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
