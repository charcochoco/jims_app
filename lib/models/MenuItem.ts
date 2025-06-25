import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class MenuItem extends Model {
  id!: string
  name!: string
  description!: string
  price!: number
  category!: string
  available!: boolean
}

MenuItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "menu_items",
    timestamps: true,
  }
)
