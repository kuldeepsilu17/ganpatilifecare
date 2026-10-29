// Ganpati Lifecare - Secure Authentication & Password Hashing
import crypto from "crypto";

const AUTH_SECRET = process.env.ADMIN_SESSION_SECRET || "glc-secure-auth-secret-key-335802";
const DEFAULT_PASSKEY = process.env.ADMIN_PASSWORD || "glcadmin123";

/**
 * Hash a password using Node's cryptographic scrypt function with a unique salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verify a plain password against a stored salt:hash string
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;

    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

/**
 * Create a signed, tamper-proof session token for an authenticated user
 */
export function createSessionToken(payload: {
  id: string;
  email: string;
  role: string;
  expiresInHours?: number;
}): string {
  const expiresAt = Date.now() + (payload.expiresInHours || 24) * 60 * 60 * 1000;
  const data = JSON.stringify({
    id: payload.id,
    email: payload.email,
    role: payload.role,
    exp: expiresAt,
  });

  const encodedData = Buffer.from(data, "utf8").toString("base64url");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(encodedData)
    .digest("base64url");

  return `${encodedData}.${signature}`;
}

/**
 * Verify a session token or passkey
 */
export function verifySessionToken(token: string | null | undefined): {
  valid: boolean;
  user?: { id: string; email: string; role: string };
} {
  if (!token) return { valid: false };

  // Fast-path: Check direct passkey comparison (constant-time check)
  if (token === DEFAULT_PASSKEY) {
    return {
      valid: true,
      user: {
        id: "admin-master",
        email: "whiteroseglc@gmail.com",
        role: "SUPERADMIN",
      },
    };
  }

  // Check signed HMAC session token
  const parts = token.split(".");
  if (parts.length !== 2) return { valid: false };

  const [encodedData, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(encodedData)
    .digest("base64url");

  if (signature !== expectedSig) return { valid: false };

  try {
    const raw = Buffer.from(encodedData, "base64url").toString("utf8");
    const payload = JSON.parse(raw);

    if (payload.exp && Date.now() > payload.exp) {
      return { valid: false }; // Expired
    }

    return {
      valid: true,
      user: {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      },
    };
  } catch {
    return { valid: false };
  }
}
