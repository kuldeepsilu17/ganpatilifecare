import fs from "fs/promises";
import path from "path";

export interface Inquiry {
  id: number;
  inquiry_id: string; // E.g., GLC-0001, GLC-0002
  name: string;
  phone: string;
  email: string;
  product_name: string;
  quantity: string;
  message: string;
  created_at: string;
  status: "New Inquiry" | "In Progress" | "Completed";
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "inquiries.json");
const LOCK_FILE = path.join(DATA_DIR, "inquiries.lock");

// Ensure the data directory and database file exist
async function initDb() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    // Already exists or permission denied (will catch on write if failed)
  }

  try {
    await fs.access(DB_FILE);
  } catch {
    // If database file does not exist, initialize as empty array
    await fs.writeFile(DB_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

// Concurrency file lock management to prevent race conditions
async function acquireLock(retries = 30, delay = 50): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    try {
      // Create file in exclusive write 'wx' mode (errors if already exists)
      const fileHandle = await fs.open(LOCK_FILE, "wx");
      await fileHandle.close();
      return true;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  return false;
}

async function releaseLock() {
  try {
    await fs.unlink(LOCK_FILE);
  } catch {
    // Ignore errors during unlink
  }
}

// Retrieve all inquiries from the JSON database
export async function getInquiries(): Promise<Inquiry[]> {
  await initDb();
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    return JSON.parse(data) as Inquiry[];
  } catch (err) {
    console.error("Error reading database:", err);
    return [];
  }
}

// Save all inquiries to the JSON database
async function saveInquiries(inquiries: Inquiry[]): Promise<boolean> {
  await initDb();
  const locked = await acquireLock();
  if (!locked) {
    console.error("Could not acquire lock to save inquiries.");
    return false;
  }

  try {
    await fs.writeFile(DB_FILE, JSON.stringify(inquiries, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing database:", err);
    return false;
  } finally {
    await releaseLock();
  }
}

// Create a new inquiry record
export async function createInquiry(data: {
  name: string;
  phone: string;
  email: string;
  product_name: string;
  quantity: string;
  message: string;
}): Promise<Inquiry | null> {
  const inquiries = await getInquiries();
  
  // Calculate next numeric ID
  const nextId = inquiries.length > 0 ? Math.max(...inquiries.map((i) => i.id)) + 1 : 1;
  
  // Calculate next sequential Inquiry ID (GLC-0001)
  const nextNumStr = String(nextId).padStart(4, "0");
  const inquiry_id = `GLC-${nextNumStr}`;

  const newInquiry: Inquiry = {
    id: nextId,
    inquiry_id,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    product_name: data.product_name.trim() || "General Inquiry",
    quantity: data.quantity.trim() || "1",
    message: data.message.trim(),
    created_at: new Date().toISOString(),
    status: "New Inquiry",
  };

  inquiries.push(newInquiry);
  const success = await saveInquiries(inquiries);
  return success ? newInquiry : null;
}

// Update the status of an existing inquiry
export async function updateInquiryStatus(
  id: number,
  status: "New Inquiry" | "In Progress" | "Completed"
): Promise<Inquiry | null> {
  const inquiries = await getInquiries();
  const index = inquiries.findIndex((i) => i.id === id);
  if (index === -1) return null;

  inquiries[index].status = status;
  const success = await saveInquiries(inquiries);
  return success ? inquiries[index] : null;
}

// Delete an inquiry record
export async function deleteInquiry(id: number): Promise<boolean> {
  const inquiries = await getInquiries();
  const filtered = inquiries.filter((i) => i.id !== id);
  if (filtered.length === inquiries.length) return false;

  return await saveInquiries(filtered);
}
