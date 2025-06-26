import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class Formula extends Model {
  id!: number
  name!: string
  price!: string
  description!: string
}

Formula.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "formulas",
    timestamps: true,
  }
)
