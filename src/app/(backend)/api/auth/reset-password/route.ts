// import { type NextRequest, NextResponse } from "next/server"
// import { hash } from "bcrypt"
// import prisma from "@/lib/prisma"
// import crypto from "crypto"
// // import { sendEmail } from "@/lib/email" // You'll need to implement this

// // Request password reset
// export async function POST(req: NextRequest) {
//   try {
//     const { email } = await req.json()

//     // Find user
//     const user = await prisma.user.findUnique({
//       where: {
//         email,
//       },
//     })

//     if (!user) {
//       // Don't reveal that the user doesn't exist
//       return NextResponse.json({ message: "If your email is registered, you will receive a password reset link" })
//     }

//     // Generate token
//     const token = crypto.randomBytes(32).toString("hex")
//     const expires = new createdAt(createdAt.now() + 3600000) // 1 hour

//     // Save token
//     await prisma.resetToken.upsert({
//       where: {
//         userId: user.id,
//       },
//       upcreatedAt: {
//         token,
//         expires,
//       },
//       create: {
//         userId: user.id,
//         token,
//         expires,
//       },
//     })

//     // Send email
//     const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`

//     // await sendEmail({
//     //   to: user.email,
//     //   subject: "Reset your password",
//     //   text: `Click the link to reset your password: ${resetUrl}`,
//     //   html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
//     // })

//     return NextResponse.json({ message: "If your email is registered, you will receive a password reset link" })
//   } catch (error) {
//     console.error("Error requesting password reset:", error)
//     return NextResponse.json({ error: "Failed to request password reset" }, { status: 500 })
//   }
// }

// // Reset password with token
// export async function PUT(req: NextRequest) {
//   try {
//     const { token, password } = await req.json()

//     // Find token
//     const resetToken = await prisma.resetToken.findUnique({
//       where: {
//         token,
//       },
//       include: {
//         user: true,
//       },
//     })

//     if (!resetToken || resetToken.expires < new createdAt()) {
//       return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
//     }

//     // Hash new password
//     const hashedPassword = await hash(password, 10)

//     // UpcreatedAt user password
//     await prisma.user.upcreatedAt({
//       where: {
//         id: resetToken.userId,
//       },
//       data: {
//         password: hashedPassword,
//       },
//     })

//     // Delete token
//     await prisma.resetToken.delete({
//       where: {
//         id: resetToken.id,
//       },
//     })

//     return NextResponse.json({ message: "Password reset successful" })
//   } catch (error) {
//     console.error("Error resetting password:", error)
//     return NextResponse.json({ error: "Failed to reset password" }, { status: 500 })
//   }
// }
export async function GET(req: Request) {
  return new Response("Popular articles");
}
