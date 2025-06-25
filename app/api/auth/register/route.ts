import { NextResponse } from "next/server"
import { sequelize } from "@/lib/db"
import { User } from "@/lib/models/User"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { signToken } from '@/lib/jwt'
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    await sequelize.sync()

    const { firstName, lastName, email, password, acceptNotifications } = await request.json()

    if (!firstName || !lastName || !email || !password || acceptNotifications === null) {
      return NextResponse.json({ message: "Nom, email et mot de passe sont requis." }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ message: "Le mot de passe doit contenir au moins 8 caractères." }, { status: 400 })
    }

    const existing = await User.findOne({ where: { email } })
    if (existing) {
      return NextResponse.json({ message: "Email déjà utilisé." }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",
      loyaltyPoints: 0,
      notifications: acceptNotifications,
    })

    newUser.qrCodeValue = `user-${newUser.id}`
    await newUser.save()

    const token = await signToken({ sub: newUser.id, email: newUser.email, role: newUser.role })

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/verify-email?token=${token}`

    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      subject: "Vérifiez votre adresse email",
      html: `
        <h1>Bienvenue chez Jim's !</h1>
        <p>Merci pour votre inscription, ${firstName}.</p>
        <p>Pour activer votre compte, cliquez sur le lien ci-dessous :</p>
        <a href="${verificationUrl}">Vérifier mon adresse email</a>
      `,
    })

    const { password: _, ...userData } = newUser.get()

    // const cookieStore = await cookies()
    // cookieStore.set({
    //   name: 'token',
    //   value: token,
    //   httpOnly: true,
    //   path: '/',
    //   maxAge: 60 * 60 * 24 * 7,
    //   secure: true,
    // })

    return NextResponse.json(
      { message: "Inscription réussie", user: userData, token },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Erreur lors de l'inscription." }, { status: 500 })
  }
}
