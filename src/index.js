import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import template from './template.js';
import { CONFIG } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get simple today's date
 */
function getTodayDate() {
  const now = new Date();
  return now.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
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