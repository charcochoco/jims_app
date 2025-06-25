import { verifyToken } from '@/lib/jwt'
import { User } from "@/lib/models/User"

export async function getUserFromToken(token: string) {
    try {
        const payload = await verifyToken(token)
        if (!payload) {
            return null
        }

        const user = await User.findByPk(payload.sub)
        if (!user) {
            return null
        }
        return user
    } catch {
        return null
    }
}


