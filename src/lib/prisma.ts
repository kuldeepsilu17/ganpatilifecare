// Ganpati Lifecare - Safe Prisma Client Wrapper
// Automatically connects to PostgreSQL when DATABASE_URL is configured,
// and gracefully falls back to structured storage when offline or unconfigured.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prismaInstance: any = null;

try {
  if (process.env.DATABASE_URL) {
    // Dynamically require to prevent compile-time crashes if client is not generated yet
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require("@prisma/client");
    const globalForPrisma = globalThis as unknown as {
      prisma: typeof PrismaClient | undefined;
    };
    prismaInstance =
      globalForPrisma.prisma ??
      new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
      });

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaInstance;
    }
  }
} catch {
  // Prisma client not available locally; will fallback to file-based repository
  prismaInstance = null;
}

export const prisma = prismaInstance;

export function isPrismaAvailable(): boolean {
  return Boolean(process.env.DATABASE_URL && prismaInstance);
}
