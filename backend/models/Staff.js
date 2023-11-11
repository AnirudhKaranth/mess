import sequelize from "../DB/db.js ";
import { Op, Model, DataTypes } from "sequelize";

const Staff = sequelize.define('Staff', {
  Sid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Sname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Spasswd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
    timestamps: false,
    freezeTableName: true
}
);

// Don't forget to sync the model with the database
Staff.sync();

console.log(Staff === sequelize.models.Staff); // true
export default Staff;
