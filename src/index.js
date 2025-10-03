import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import template from './template.js';
import { CONFIG } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get formatted current date
 */
function getCurrentDate() {
  const now = new Date();
  return now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Calculate days until next new year
 */
function getDaysUntilNewYear() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const newYearDate = new Date(nextYear, 0, 1);
  
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = newYearDate.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffMs / msPerDay);
  
  return {
    days: daysLeft,
    year: nextYear
  };
}

/**
 * Generate bot signature with mood
 */
function getBotSignature() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const mood = CONFIG.bot.moods[dayOfWeek];
  const emoji = CONFIG.bot.moodEmojis[mood];
  
  return `🤖 This README.md is updated with ${mood} ${emoji} by ${CONFIG.bot.name}`;
}

/**
 * Generate the new README content
 */
async function generateReadme() {
  const currentDate = getCurrentDate();
  const newYearInfo = getDaysUntilNewYear();
  const botSignature = getBotSignature();
  
  // Build sections based on configuration
  const sections = {
    tagline: CONFIG.profile.tagline.replace(/\s+/g, '%20').replace(/,/g, '%2C'),
    lastUpdateSection: CONFIG.features.lastUpdate ? 
      `**Last updated:** ${currentDate}` : '',
    newYearCountdown: CONFIG.features.newYearCountdown ? 
      `**${newYearInfo.days}** days until ${newYearInfo.year} 🎊` : '',
    botSignature: botSignature
  };
  
  // Replace placeholders in template
  let readmeContent = template
    .replace('{{TAGLINE}}', sections.tagline)
    .replace('{{LAST_UPDATE_SECTION}}', sections.lastUpdateSection)
    .replace('{{NEW_YEAR_COUNTDOWN}}', sections.newYearCountdown)
    .replace('{{BOT_SIGNATURE}}', sections.botSignature);
  
  return readmeContent;
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
    console.log('📋 Configuration: Elsy CHARLES profile');
    
    const readmeContent = await generateReadme();
    console.log('\n📝 Generated content preview:');
    console.log('─'.repeat(50));
    console.log(readmeContent.slice(0, 200) + '...');
    console.log('─'.repeat(50));
    
    await writeReadme(readmeContent);
    
    console.log('\n📊 Update summary:');
    console.log(`• Date: ${getCurrentDate()}`);
    console.log(`• Days until new year: ${getDaysUntilNewYear().days}`);
    console.log(`• Bot mood: ${CONFIG.bot.moods[new Date().getDay()]}`);
    console.log(`• Features enabled: ${Object.entries(CONFIG.features).filter(([, enabled]) => enabled).map(([name]) => name).join(', ')}`);
    
  } catch (error) {
    console.error('❌ Failed to generate README:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateReadme, getCurrentDate, getDaysUntilNewYear, getBotSignature };