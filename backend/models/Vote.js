import sequelize from "../DB/db.js ";
import { Op, Model, DataTypes } from "sequelize";

import User from "./User.js"
import Food from "./Food.js"
import Mess from "./Mess.js"

const Vote = sequelize.define('Vote', {
    Vid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Uid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // Assuming you have a 'users' table
        key: 'Uid',
      },
      allowNull: false,
    },
    Mid: {
      type: DataTypes.INTEGER,
  
      references: {
        model: "Mess",
        key: "Mid",
      },
    },
    Day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Timeslot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Food', // Assuming you have a 'Food' table
        key: 'Fid',
      },
      allowNull: false,
    }
  
  }, {
    // Define a unique constraint for the combination of userid, day, and timeslot
    indexes: [
      {
        unique: true,
        fields: ['Uid', 'Day', 'Timeslot'],
      },
    ],
    timestamps: false,
    freezeTableName: true,
  });
  
Vote.belongsTo(User, { foreignKey: 'Uid' });
Vote.belongsTo(Mess, { foreignKey: 'Mid' });
Vote.belongsTo(Food, { foreignKey: 'Fid' });

// Sync the models with the database
await Vote.sync();
  
  console.log(Vote === sequelize.models.Vote); // true
  export default Vote;