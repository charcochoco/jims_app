import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db"

export class InstaPost extends Model {
  id!: number
  url!: string
}

InstaPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "insta_posts",
    timestamps: true,
  }
)
