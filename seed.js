import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      aadhaar: "123456789012",
      mobile: "9999999999",
      pan: "ABCDE1234F"
    },
  });
  console.log("Seed data inserted ✅");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());



