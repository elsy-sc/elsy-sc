/**
 * Configuration file for the README generator
 */
export const CONFIG = {
  // Personal information
  profile: {
    tagline: 'Hello, I am Elsy CHARLES'
  },
  
  // Bot configuration
  bot: {
    name: 'AutoBot',
    // Moods for each day of the week (0 = Sunday, 6 = Saturday)
    moods: {
      0: 'joy',        // Sunday
      1: 'determination', // Monday
      2: 'creativity',    // Tuesday
      3: 'focus',        // Wednesday
      4: 'enthusiasm',   // Thursday
      5: 'satisfaction', // Friday
      6: 'relaxation'    // Saturday
    },
    
    // Emojis for each mood
    moodEmojis: {
      joy: '😊',
      determination: '💪',
      creativity: '🎨',
      focus: '🎯',
      enthusiasm: '🚀',
      satisfaction: '✨',
      relaxation: '😌'
    }
  },
  
  // Features to enable/disable
  features: {
    newYearCountdown: true,   // Show days until new year
    lastUpdate: true          // Show last update date
  }
};