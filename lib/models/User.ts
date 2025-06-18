import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class User extends Model {
  id!: string
  lastName!: string
  firstName!: string
  email!: string
  password!: string
  role!: string
  loyaltyPoints!: number
  qrCodeValue!: string
  notifications!: boolean
  emailVerified!: boolean
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: false,
    },
    loyaltyPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    qrCodeValue: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    notifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
)
