const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const connectToPg = async () => {
  try {
    await prisma.$connect();
    console.log("Successfully connected to PostgreSQL via Prisma Client");
  } catch (err) {
    console.error("Failed to connect to PostgreSQL:", err.message);
    process.exit(1);
  }
};

module.exports = {
  prisma,
  connectToPg
};