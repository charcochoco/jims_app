import { jwtVerify, SignJWT } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

if (!SECRET) {
  throw new Error('❌ JWT_SECRET is not défini dans .env')
}

export async function signToken(payload: { sub: string; email: string; role: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as { sub: string; email: string; role: string }
  } catch {
    return null
  }
}



