import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class Contact extends Model {
  id!: string
  name!: string
  email!: string
  subject!: string
  message!: string
}

Contact.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "contacts",
    timestamps: true,
  }
)
