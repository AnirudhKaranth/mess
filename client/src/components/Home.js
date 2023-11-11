import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from './Navbar';

const Home = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('http://localhost:5000/menu') // Adjust endpoint if you've made changes
      .then((response) => response.json())
      .then((data) => setMenuData(data))
      .catch((error) => console.error('Error fetching menu data:', error));
  }, []);

  // Create a function to group menu items by day
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
    <>
      <Navbar />

      <div className="home-container">
        {Object.entries(groupMenuByDay()).map(([day, meals]) => (
          <div key={day} className="day-container">
            <div className="day-header">{day}</div>
            <div className="meals-container">
              {meals.map((menuItem) => (
                <div key={menuItem.Menuid} className="menu-card">
                  <div className="meal-section">
                    <div className="meal-time">{menuItem.Timeslot}</div>
                    <div className="menu-item">{`Fid: ${menuItem.Fid}`}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;

// import React, { useState, useEffect } from 'react';
// import './Home.css'; // Import your CSS file
// import Navbar from './Navbar'


// const Home = () => {
//   const [menuData, setMenuData] = useState([]);

//   useEffect(() => {
//     // Fetch data from your API endpoint
//     fetch('http://localhost:5000/menu') // Replace with your actual API endpoint
//       .then((response) => response.json())
//       .then((data) => setMenuData(data))
//       .catch((error) => console.error('Error fetching menu data:', error));
//   }, []);

//   return (
//     <>
//     <Navbar/>

//     <div className="home-container">
//       {menuData.map((menuItem) => (
//         <div key={menuItem.Menuid} className="menu-card">
//           <div className="day-header">{menuItem.Day}</div>
//           <div className="meal-section">
//             <div className="meal-time">{menuItem.Timeslot}</div>
//             <div className="menu-item">{`Fid: ${menuItem.Fid}`}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//     </>
//   );
// };

// export default Home;
