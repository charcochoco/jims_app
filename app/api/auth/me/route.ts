import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from '@/lib/auth'
import { User } from "@/lib/models/User"
import { sequelize } from "@/lib/db"

export async function GET() {
  try {
    await sequelize.sync()
    
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json({ message: "Non authentifié." }, { status: 401 })
    }

    const payload = token && await verifyToken(token)

    if (!payload) {
      return NextResponse.json({ user: null }, { status: 401 })
    } 
  
    const userId = payload.sub

    const user = await User.findByPk(userId)

    if (!user) {
      return NextResponse.json({ message: "Utilisateur non trouvé." }, { status: 404 })
    }

    const { password: _, ...userData } = user.get()

    return NextResponse.json({ user: userData })
  } catch (error) {
    console.error("Erreur /api/me:", error)
    return NextResponse.json({ message: "Erreur serveur." }, { status: 500 })
  }
}


// export async function GET() {
//   const authorization = headers().get("Authorization")

//   if (!authorization || !authorization.startsWith("Bearer ")) {
//     return NextResponse.json({ message: "Non autorisé: Token manquant ou malformé" }, { status: 401 })
//   }

//   const token = authorization.split(" ")[1]

//   try {
//     // const decoded = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
//     const decoded = verifyJwt(token) // Mock verification

//     if (!decoded) {
//       return NextResponse.json({ message: "Non autorisé: Token invalide" }, { status: 401 })
//     }

//     // Fetch user from DB based on decoded.userId
//     // const user = await UserModel.findByPk(decoded.userId, { attributes: { exclude: ['password'] } });

//     // Mock implementation:
//     let user = mockUsers.find((u) => u.id === decoded.userId)
//     if (!user && decoded.userId === mockAdminUser.id) {
//       user = mockAdminUser
//     }

//     if (!user) {
//       return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 })
//     }

//     const { ...userWithoutPassword } = user
//     return NextResponse.json(userWithoutPassword)
//   } catch (error) {
//     // if (error instanceof jwt.JsonWebTokenError) {
//     //   return NextResponse.json({ message: 'Non autorisé: Token invalide' }, { status: 401 });
//     // }
//     console.error("Error fetching user data:", error)
//     return NextResponse.json({ message: "Erreur serveur interne" }, { status: 500 })
//   }
// }
