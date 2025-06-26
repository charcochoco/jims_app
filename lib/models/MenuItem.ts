// lib/models/MenuItem.ts
import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class MenuItem extends Model {
  id!: number
  name!: string
  description?: string
  priceMenu?: string
  category!: string
}

MenuItem.init(
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
    description: DataTypes.TEXT,
    priceMenu: DataTypes.STRING,
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "menu_items",
    timestamps: true,
  }
)
