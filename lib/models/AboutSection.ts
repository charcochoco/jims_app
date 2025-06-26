import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class AboutSection extends Model {
  id!: number
  title!: string
  description!: string
}

AboutSection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "about_sections",
    timestamps: true,
  }
)
