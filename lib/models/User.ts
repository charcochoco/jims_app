import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class User extends Model {
  id!: string
  name!: string
  email!: string
  password!: string
  role!: string
  loyaltyPoints!: number
  qrCodeValue!: string
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: "user" },
    loyaltyPoints: { type: DataTypes.INTEGER, defaultValue: 0 },
    qrCodeValue: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
)
