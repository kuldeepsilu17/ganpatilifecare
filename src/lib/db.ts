import fs from "fs/promises";
import path from "path";

export type InquiryStatus =
  | "New"
  | "Contacted"
  | "Quoted"
  | "Completed"
  | "Cancelled"
  | "New Inquiry"
  | "In Progress";

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
  status: InquiryStatus;
  source?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "inquiries.json");
const LOCK_FILE = path.join(DATA_DIR, "inquiries.lock");

// Ensure the data directory and database file exist
async function initDb() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Already exists or permission denied
  }

  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

// Concurrency file lock management
async function acquireLock(retries = 30, delay = 50): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    try {
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
  email?: string;
  product_name?: string;
  quantity?: string;
  message?: string;
  source?: string;
}): Promise<Inquiry | null> {
  const inquiries = await getInquiries();

  const nextId = inquiries.length > 0 ? Math.max(...inquiries.map((i) => i.id)) + 1 : 1;
  const nextNumStr = String(nextId).padStart(4, "0");
  const inquiry_id = `GLC-${nextNumStr}`;

  const newInquiry: Inquiry = {
    id: nextId,
    inquiry_id,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: (data.email || "").trim(),
    product_name: (data.product_name || "General Inquiry").trim(),
    quantity: (data.quantity || "1").trim(),
    message: (data.message || "").trim(),
    source: data.source || "Website",
    created_at: new Date().toISOString(),
    status: "New",
  };

  inquiries.push(newInquiry);
  const success = await saveInquiries(inquiries);
  return success ? newInquiry : null;
}

// Update the status of an existing inquiry
export async function updateInquiryStatus(
  id: number,
  status: InquiryStatus
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
