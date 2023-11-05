import { Sequelize } from 'sequelize';

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:')

// const sequelize = new Sequelize('sqlite::memory:', {
//     define: {
//       freezeTableName: true
//     }
//   });

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'mess.sqlite', // You specify the database file name here
  });
  
// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'sqlite'
//   });

export default sequelize