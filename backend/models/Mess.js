import sequelize from "../DB/db.js ";
import { DataTypes } from "sequelize";

const Mess = sequelize.define(
  "Mess",
  {
    Mid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    //   allowNull: false,
    },
    Mname: {
      type: DataTypes.ENUM,
      values: ["south_1", "south_2", "north"],
    //   allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

export default Mess;
