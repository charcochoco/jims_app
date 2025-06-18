import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class OrderItem extends Model {
  id!: string
  orderId!: string
  menuItemId!: string
  quantity!: number
}

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    menuItemId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "order_items",
    timestamps: true,
  }
)
