import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class JimsInformation extends Model {
  id!: string
  name!: string
  siret!: string
  email!: string
  phone!: string
  address!: string
  schedules!: string
}

JimsInformation.init(
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
    siret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schedules: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "jims_informations",
    timestamps: true,
  }
)
