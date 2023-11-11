import sequelize from "../DB/db.js ";
import { Op, Model, DataTypes } from "sequelize";

const Menu = sequelize.define(
  "Menu",
  {
    Menuid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
        model: "Food",
        key: "Fid",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Don't forget to sync the model with the database
Menu.sync();

console.log(Menu === sequelize.models.Menu); // true
export default Menu;
