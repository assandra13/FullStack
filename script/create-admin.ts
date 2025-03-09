// This script creates an admin user in the database
// Run with: npx ts-node scripts/create-admin.ts

import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import * as readline from "readline";

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  console.log("Create Admin User");
  console.log("=================");

  const name = await question("Enter admin name: ");
  const email = await question("Enter admin email: ");
  const password = await question("Enter admin password: ");

  if (!name || !email || !password) {
    console.error("Error: All fields are required");
    process.exit(1);
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error("Error: User with this email already exists");
      process.exit(1);
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log(`Admin user created successfully: ${user.name} (${user.email})`);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

main();
