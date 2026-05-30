import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { Inquiry } from "./db";
import { BUSINESS } from "./constants";

const LOG_FILE = path.join(process.cwd(), "data", "sent_emails.log");

// Helper to compile a highly polished responsive HTML email template matching GLC's brand theme
function compileHtmlTemplate(inquiry: Inquiry): string {
  const dateStr = new Date(inquiry.created_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Website Inquiry</title>
        <style>
          body {
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f4faf6;
            color: #1a2e24;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 146, 69, 0.08);
            border: 1px border rgba(0, 146, 69, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #007a38 0%, #009245 100%);
            padding: 30px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 0.5px;
          }
          .header p {
            margin: 5px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .badge {
            display: inline-block;
            background-color: #f58220;
            color: #ffffff;
            padding: 6px 14px;
            border-radius: 99px;
            font-size: 13px;
            font-weight: 600;
            margin-top: 15px;
            box-shadow: 0 2px 6px rgba(245, 130, 32, 0.2);
          }
          .content {
            padding: 30px;
          }
          .section-title {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #009245;
            border-bottom: 2px solid #eef8f1;
            padding-pb: 6px;
            margin-top: 0;
            margin-bottom: 15px;
          }
          .grid {
            margin-bottom: 25px;
          }
          .grid-row {
            display: flex;
            border-bottom: 1px solid #f4faf6;
            padding: 10px 0;
          }
          .grid-row:last-child {
            border-bottom: none;
          }
          .label {
            width: 140px;
            font-size: 13px;
            font-weight: 600;
            color: #5a6b63;
            flex-shrink: 0;
          }
          .value {
            font-size: 14px;
            color: #1a2e24;
            word-break: break-word;
          }
          .message-box {
            background-color: #f4faf6;
            border-left: 4px solid #009245;
            padding: 15px 20px;
            border-radius: 0 12px 12px 0;
            font-size: 14px;
            line-height: 1.6;
            color: #1a2e24;
            margin-bottom: 25px;
            white-space: pre-wrap;
          }
          .footer {
            background-color: #eef8f1;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #5a6b63;
            border-top: 1px solid rgba(0, 146, 69, 0.05);
          }
          .footer a {
            color: #009245;
            text-decoration: none;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Website Inquiry</h1>
            <p>Ganpati Lifecare order management system</p>
            <div class="badge">ID: ${inquiry.inquiry_id}</div>
          </div>
          <div class="content">
            <h2 class="section-title">Customer Information</h2>
            <div class="grid">
              <div class="grid-row">
                <div class="label">Customer Name</div>
                <div class="value">${inquiry.name}</div>
              </div>
              <div class="grid-row">
                <div class="label">Phone Number</div>
                <div class="value">${inquiry.phone}</div>
              </div>
              <div class="grid-row">
                <div class="label">Email Address</div>
                <div class="value">${inquiry.email || "Not Provided"}</div>
              </div>
              <div class="grid-row">
                <div class="label">Date & Time</div>
                <div class="value">${dateStr}</div>
              </div>
            </div>

            <h2 class="section-title">Inquiry Details</h2>
            <div class="grid">
              <div class="grid-row">
                <div class="label">Product / Scope</div>
                <div class="value"><strong>${inquiry.product_name}</strong></div>
              </div>
              <div class="grid-row">
                <div class="label">Quantity</div>
                <div class="value">${inquiry.quantity}</div>
              </div>
              <div class="grid-row">
                <div class="label">Inquiry Status</div>
                <div class="value"><span style="color: #009245; font-weight: bold;">${inquiry.status}</span></div>
              </div>
            </div>

            <h2 class="section-title">Customer Message</h2>
            <div class="message-box">${inquiry.message || "No message provided."}</div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} <a href="${BUSINESS.siteUrl}">${BUSINESS.name}</a>. All rights reserved.</p>
            <p>This is an automated system notification.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Sends an email notification to the administrator (whiteroseglc@gmail.com)
export async function sendAdminNotification(inquiry: Inquiry): Promise<boolean> {
  const subject = `New Website Inquiry - Ganpati Lifecare (${inquiry.inquiry_id})`;
  const htmlContent = compileHtmlTemplate(inquiry);
  const plainTextContent = `
New Website Inquiry Received
-----------------------------------------
Inquiry ID:   ${inquiry.inquiry_id}
Customer:     ${inquiry.name}
Phone:        ${inquiry.phone}
Email:        ${inquiry.email || "Not Provided"}
Product:      ${inquiry.product_name}
Quantity:     ${inquiry.quantity}
Status:       ${inquiry.status}
Date & Time:  ${new Date(inquiry.created_at).toLocaleString("en-IN")}

Message:
${inquiry.message || "No message provided."}
-----------------------------------------
  `.trim();

  // Read SMTP settings
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const isConfigured = host && port && user && pass;

  if (isConfigured) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port: parseInt(port),
        secure: parseInt(port) === 465, // True for 465, false for other ports
        auth: {
          user,
          pass,
        },
      });

      await transporter.sendMail({
        from: `"${BUSINESS.name} Notifications" <${user}>`,
        to: BUSINESS.email, // Sends directly to whiteroseglc@gmail.com
        subject: subject,
        text: plainTextContent,
        html: htmlContent,
      });

      console.log(`[SMTP] Successfully sent admin email for inquiry ${inquiry.inquiry_id}`);
      return true;
    } catch (err) {
      console.error("[SMTP] Failed to send admin email, falling back to file log.", err);
      // Fall through to filesystem logging
    }
  }

  // Fallback dev logger: Write email safely to disk
  try {
    const divider = "\n" + "=".repeat(80) + "\n";
    const logEntry = `
Date: ${new Date().toISOString()}
Subject: ${subject}
To: ${BUSINESS.email}
${divider}
${plainTextContent}
${divider}
    `;

    await fs.mkdir(path.dirname(LOG_FILE), { recursive: true });
    await fs.appendFile(LOG_FILE, logEntry, "utf8");
    console.log(`[DEV EMAIL LOGGER] Inquiry notification logged to: ${path.relative(process.cwd(), LOG_FILE)}`);
    return true;
  } catch (err) {
    console.error("Failed to write to fallback email log file:", err);
    return false;
  }
}
