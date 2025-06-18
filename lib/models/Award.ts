import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class Award extends Model {
  id!: string
  award!: string
  necessaryPoint!: number
}

Award.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    award: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    necessaryPoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "awards",
    timestamps: true,
  }
)
