import sequelize from "../DB/db.js ";
import { Op, Model, DataTypes } from "sequelize";
// import useBcrypt from "sequelize-bcrypt" //ani
import Mess from "./Mess.js"


const Food = sequelize.define(
  "Food",
  {
    // Model attributes are defined here
    Fid: {
      type: DataTypes.INTEGER, //or type: Sequelize.UUID  or DataTypes.UUID
      primaryKey: true,
      //   allowNull: false, // defaults to true
    },
    Fname: {
      type: DataTypes.STRING,
      //   allowNull: false,
      // defaultValue: "John Doe",
    },

    Mid: {
      type: DataTypes.INTEGER,

      references: {
        model: "Mess",
        key: "Mid",
      },
    },
  },
  {
    // Other model options go here
    //tableName: 'Employees'
    timestamps: false,
    freezeTableName: true,
  }
);

Food.belongsTo(Mess, { foreignKey: 'Mid' });

await Food.sync();

export default Food;
