import { NextRequest, NextResponse } from "next/server"
import { User } from "@/lib/models/User"
import { Resend } from "resend"
import { signToken } from "@/lib/auth"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  const user = await User.findOne({ where: { email } })

  if (user) {
    const token = await signToken({ sub: user.id, email: user.email, role: user.role }, "1h")

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`

    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      subject: "Réinitialisation de mot de passe",
      html: `
        <p>Bonjour ${user.firstName},</p>
        <p>Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous :</p>
        <a href="${resetUrl}">Réinitialiser mon mot de passe</a>
        <p>Ce lien est valable 1 heure.</p>
      `,
    })
  }

  return NextResponse.json({ success: true })
}
