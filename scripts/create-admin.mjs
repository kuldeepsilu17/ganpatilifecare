// Ganpati Lifecare - Secure Administrator Account Creator
// Usage: node scripts/create-admin.mjs <email> <password> [name]

import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const ADMIN_FILE = path.join(DATA_DIR, "admin_users.json");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function main() {
  const args = process.argv.slice(2);
  const email = (args[0] || process.env.ADMIN_EMAIL || "whiteroseglc@gmail.com").trim().toLowerCase();
  const password = (args[1] || process.env.ADMIN_PASSWORD || "glcadmin123").trim();
  const name = (args[2] || "Dharampal Verma").trim();

  if (!email || !password) {
    console.error("Usage: node scripts/create-admin.mjs <email> <password> [name]");
    process.exit(1);
  }

  await fs.mkdir(DATA_DIR, { recursive: true });

  let admins = [];
  try {
    const raw = await fs.readFile(ADMIN_FILE, "utf8");
    admins = JSON.parse(raw);
  } catch {
    admins = [];
  }

  const existingIndex = admins.findIndex((a) => a.email.toLowerCase() === email);
  const passwordHash = hashPassword(password);
  const adminData = {
    id: existingIndex >= 0 ? admins[existingIndex].id : `admin-${Date.now()}`,
    name,
    email,
    passwordHash,
    role: "SUPERADMIN",
    createdAt: existingIndex >= 0 ? admins[existingIndex].createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    admins[existingIndex] = adminData;
    console.log(`✅ Administrator credentials updated for: ${email}`);
  } else {
    admins.push(adminData);
    console.log(`✅ New administrator created: ${email}`);
  }

  await fs.writeFile(ADMIN_FILE, JSON.stringify(admins, null, 2), "utf8");

  // Sync to PostgreSQL if configured
  if (process.env.DATABASE_URL) {
    try {
      const { PrismaClient } = await import("@prisma/client");
      const prisma = new PrismaClient();
      await prisma.adminUser.upsert({
        where: { email },
        update: { name, passwordHash, role: "SUPERADMIN" },
        create: adminData,
      });
      console.log(`✅ PostgreSQL administrator synced: ${email}`);
      await prisma.$disconnect();
    } catch {
      console.log("ℹ️ PostgreSQL sync skipped (DATABASE_URL offline). Stored in local repository.");
    }
  }

  console.log(`🔑 Admin Email: ${email}`);
  console.log(`🔒 Password: [PROTECTED]`);
}

main().catch((err) => {
  console.error("Failed to create admin:", err);
  process.exit(1);
});
