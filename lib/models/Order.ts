import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class Order extends Model {
  id!: string
  userId!: string
  status!: string
  totalPrice!: number
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
  }
)
