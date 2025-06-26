// app/api/admin/users/route.ts

import { NextResponse } from "next/server"
import { User } from "@/lib/models/User"
import { sequelize } from "@/lib/db"
import { cookies } from "next/headers"
import { getUserFromToken } from "@/lib/auth"

export async function GET() {
  await sequelize.sync()

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) {
    return NextResponse.json({ message: "Non authentifié." }, { status: 401 })
  }

  const userAdmin = await getUserFromToken(token)
  if (!userAdmin || userAdmin.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const users = await User.findAll({
    attributes: ["id", "firstName", "lastName", "email", "loyaltyPoints"]
  })

  return NextResponse.json(users)
}

export async function DELETE(req: Request) {
  await sequelize.sync()

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) {
    return NextResponse.json({ message: "Non authentifié." }, { status: 401 })
  }

  const userAdmin = await getUserFromToken(token)
  if (!userAdmin || userAdmin.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await req.json()

  const user = await User.findByPk(id)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  await user.destroy()
  return NextResponse.json({ message: "User deleted" })
}
