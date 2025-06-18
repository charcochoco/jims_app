// models/PushSubscription.ts

import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class PushSubscription extends Model {
  id!: string
  userId!: string
  subscription!: any
}

PushSubscription.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    subscription: {
      type: DataTypes.JSONB, 
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "push_subscriptions",
    timestamps: true,
  }
)
