import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class LoyaltyTransaction extends Model {
  id!: string
  userId!: string
  type!: string
  points!: number
  orderId!: string
}

LoyaltyTransaction.init(
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "loyalty_transactions",
    timestamps: true,
  }
)
