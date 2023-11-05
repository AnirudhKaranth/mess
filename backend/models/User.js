import sequelize from "../DB/db.js ";
import { Op, Model, DataTypes } from "sequelize";
// import useBcrypt from "sequelize-bcrypt" //ani

// const { Sequelize, DataTypes } = require('sequelize'); //docs
// const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    Uid: {
      type: DataTypes.INTEGER, //or type: Sequelize.UUID  or DataTypes.UUID
      primaryKey: true,
    //   allowNull: false, // defaults to true
    },
    Uname: {
      type: DataTypes.STRING,
    //   allowNull: false,
      defaultValue: "John Doe",
    },
    Upasswd: {
      type: DataTypes.STRING,
    //   allowNull: false,
    },

    Mid: {
      type: DataTypes.INTEGER,
      
      references: {
        model: 'Mess',
        key: 'Mid',
      },
    },
  },
  {
    // Other model options go here
    //tableName: 'Employees'
    timestamps: false,
    freezeTableName: true
  }
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

export default User