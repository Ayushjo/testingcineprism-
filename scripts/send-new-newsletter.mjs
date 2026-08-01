import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the new newsletter HTML (the dark cinematic one in the root)
const html = readFileSync(join(__dirname, '../new_newsletter.html'), 'utf8');

const res = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'onboarding@resend.dev',
    to: ['ayushsingh202586@gmail.com'],
    subject: 'The CinePrism — Issue No. 02 · May 2026',
    html,
  }),
});

const data = await res.json();
console.log(JSON.stringify(data, null, 2));
