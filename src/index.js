import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import template from './template.js';
import { CONFIG } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get today's date and time in Madagascar timezone (UTC+3) with format YYYY-MM-DD HH:MM:SS
 */
function getTodayDate() {
  const now = new Date();
  // Convert to Madagascar time (UTC+3)
  const madagascarTime = new Date(now.getTime() + (3 * 60 * 60 * 1000));
  
  // Format as YYYY-MM-DD HH:MM:SS
  const year = madagascarTime.getUTCFullYear();
  const month = String(madagascarTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(madagascarTime.getUTCDate()).padStart(2, '0');
  const hours = String(madagascarTime.getUTCHours()).padStart(2, '0');
  const minutes = String(madagascarTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(madagascarTime.getUTCSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Generate the new README content
 */
function generateReadme() {
  const todayDate = getTodayDate();
  const tagline = CONFIG.profile.tagline.replace(/\s+/g, '%20').replace(/,/g, '%2C');
  
  // Replace placeholders in template
  return template
    .replace('{{TAGLINE}}', tagline)
    .replace('{{TODAY_DATE}}', todayDate);
}

/**
 * Write README file
 */
async function writeReadme(content) {
  const readmePath = join(__dirname, '..', 'README.md');
  try {
    await fs.writeFile(readmePath, content, 'utf8');
    console.log('✅ README.md updated successfully!');
  } catch (error) {
    console.error('❌ Error writing README.md:', error);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('🚀 Generating README.md...');
    
    const readmeContent = generateReadme();
    await writeReadme(readmeContent);
    
    console.log(`✅ README updated with date: ${getTodayDate()}`);
    
  } catch (error) {
    console.error('❌ Failed to generate README:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}