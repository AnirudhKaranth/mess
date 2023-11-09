import { Sequelize } from 'sequelize';

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'mess.sqlite', // You specify the database file name here
  });
  
export default sequelize