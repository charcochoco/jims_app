// app/api/verify-email/route.ts
import { NextRequest, NextResponse } from "next/server"
import { verifyToken, signToken } from "@/lib/jwt"
import { User } from "@/lib/models/User"
import { cookies } from "next/headers"

export async function GET(req: NextRequest) {

  const token = req.nextUrl.searchParams.get("token")

  if (!token) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login?error=token`)

  try {
    const decoded = await verifyToken(token) as { sub: string }
    
    const user = await User.findByPk(decoded.sub)

    if (!user) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login?error=account`)

    if (user.emailVerified) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/account`)

    user.emailVerified = true
    await user.save()

    const newToken = await signToken({ sub: user.id, email: user.email, role: user.role })
    const cookieStore = await cookies()
    cookieStore.set("token", newToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
    })

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/account`)
  } catch (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login?error=invalid`)
  }
}
