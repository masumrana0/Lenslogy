import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Create super admin user
  const password = await hash("Admin@123", 10)

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Super Admin",
      password,
      role: "SUPER_ADMIN",
      designation: "System Administrator",
    },
  })

  console.log({ superAdmin })

  // Create default categories
  const categories = [
    { name: "technology", enName: "Technology", bnName: "প্রযুক্তি" },
    { name: "gadgets", enName: "Gadgets", bnName: "গ্যাজেট" },
    { name: "software", enName: "Software", bnName: "সফটওয়্যার" },
    { name: "hardware", enName: "Hardware", bnName: "হার্ডওয়্যার" },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
  }

  // Create default tags
  const tags = [
    { name: "ai", enName: "AI", bnName: "এআই" },
    { name: "mobile", enName: "Mobile", bnName: "মোবাইল" },
    { name: "web", enName: "Web", bnName: "ওয়েব" },
    { name: "programming", enName: "Programming", bnName: "প্রোগ্রামিং" },
  ]

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: tag,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
