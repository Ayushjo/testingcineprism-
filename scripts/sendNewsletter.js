import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Configure Environment and file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Load .env from root
dotenv.config({ path: path.join(rootDir, '.env') });

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'; // Default fallback

if (!RESEND_API_KEY) {
  console.error("❌ Error: RESEND_API_KEY is missing in .env file.");
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

async function sendNewsletter() {
  try {
    console.log("Reading newsletter template...");
    const templatePath = path.join(rootDir, 'newsletter_template.html');
    const htmlContent = fs.readFileSync(templatePath, 'utf-8');

    console.log(`Sending email to ayushsingh202586@gmail.com from ${RESEND_FROM_EMAIL}...`);

    const { data, error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: ['ayushsingh202586@gmail.com'],
      subject: 'The Cinéprism: Review of the Week - Dune: Part Two',
      html: htmlContent,
    });

    if (error) {
      console.error("❌ Resend API Error:", error);
      return;
    }

    console.log("✅ Email sent successfully!");
    console.log("Message ID:", data.id);
  } catch (err) {
    console.error("❌ Unexpected Error:", err);
  }
}

sendNewsletter();
