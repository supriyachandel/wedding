/**
 * Wedding Invitation Website Configuration
 * Supriya & Ankush — 10 November 2026
 * 
 * Edit any detail below to update names, venues, dates, or media across the entire website.
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    bride: {
      firstName: "Supriya",
      fullName: "Supriya",
      parents: "Mrs. Nirmala Devi & Mr. Karam Chand",
      familyTitle: "Bride's Family",
      relationText: "Daughter of Mrs. Nirmala Devi and Mr. Karam Chand"
    },
    groom: {
      firstName: "Ankush",
      fullName: "Ankush",
      parents: "Mrs. Sweety Gupta & Mr. Naresh Kumar",
      familyTitle: "Groom's Family",
      relationText: "Son of Mrs. Sweety Gupta and Mr. Naresh Kumar"
    },
    subtitle: "Two Hearts, One Beautiful Beginning",
    mainDateText: "10 November 2026",
    // Target date for countdown (10 November 2026 18:00 IST - Asia/Kolkata UTC+05:30)
    // Format: YYYY-MM-DDTHH:mm:ss+05:30
    weddingDateISO: "2026-11-10T18:00:00+05:30",
    timezone: "Asia/Kolkata"
  },

  // Opening Envelope Card Details
  envelope: {
    subtitle: "You Are Cordially Invited",
    sealInitials: "S & A",
    buttonText: "Open Wedding Invitation"
  },

  // Ganesh Vandana Section
  ganeshVandana: {
    shloka: "॥ श्री गणेशाय नमः ॥",
    blessing: "With the blessings of Lord Ganesha and the love of our family, we invite you to celebrate the wedding of our beloved daughter."
  },

  // Wedding Functions & Ceremonies Timeline
  // Ordered by date and time
  functions: [
    {
      id: "kirtan",
      title: "Morning Kirtan",
      subtitle: "Devotional Kirtan & Family Blessings",
      dayName: "Monday",
      dateFormatted: "9 November 2026",
      dateISO: "2026-11-09",
      time: "10:00 AM",
      venue: "Bride's Residence",
      address: "Bride's Residence",
      badge: "Traditional Puja",
      image: "assets/images/kirtan.jpg",
      description: "Beginning our wedding festivities with the divine blessings of Waheguru, seeking peace, harmony, and joy for the couple.",
      mapsUrl: null, // Private residence
      calendarEvent: {
        title: "Morning Kirtan - Supriya & Ankush Wedding",
        start: "20261109T043000Z", // 10:00 AM IST is 04:30 UTC
        end: "20261109T073000Z",
        details: "Morning Kirtan for Supriya & Ankush Wedding at Bride's Residence"
      }
    },
    {
      id: "mehndi",
      title: "Nanka Swagat / Mehndi Ceremony",
      subtitle: "Henna, Music & Celebration",
      dayName: "Monday",
      dateFormatted: "9 November 2026",
      dateISO: "2026-11-09",
      time: "2:00 PM",
      venue: "Bride's Residence",
      address: "Bride's Residence",
      badge: "Henna & Festivity",
      image: "assets/images/mehndi.jpg",
      description: "An afternoon of joyous mehndi adornment, traditional Punjabi boliyan, welcoming maternal grandparents (Nanka), and festive folk dances.",
      mapsUrl: null,
      calendarEvent: {
        title: "Nanka Swagat & Mehndi - Supriya & Ankush Wedding",
        start: "20261109T083000Z", // 2:00 PM IST is 08:30 UTC
        end: "20261109T123000Z",
        details: "Nanka Swagat & Mehndi Ceremony for Supriya & Ankush Wedding at Bride's Residence"
      }
    },
    {
      id: "dj-night",
      title: "DJ Night",
      subtitle: "Music, Dance & Dinner",
      dayName: "Monday",
      dateFormatted: "9 November 2026",
      dateISO: "2026-11-09",
      time: "7:00 PM",
      venue: "Bride's Residence",
      address: "Bride's Residence",
      badge: "Sangeet & Dance",
      image: "assets/images/dj_night.jpg",
      description: "An electric evening of music, celebration, dazzling beats, and family performances celebrating the union of both families.",
      mapsUrl: null,
      calendarEvent: {
        title: "DJ Night - Supriya & Ankush Wedding",
        start: "20261109T133000Z", // 7:00 PM IST is 13:30 UTC
        end: "20261109T180000Z",
        details: "DJ Night & Sangeet Dinner celebration for Supriya & Ankush Wedding"
      }
    },
    {
      id: "haldi",
      title: "Haldi Ceremony",
      subtitle: "Turmeric Blessings & Golden Hues",
      dayName: "Tuesday",
      dateFormatted: "10 November 2026",
      dateISO: "2026-11-10",
      time: "9:00 AM",
      venue: "Bride's Residence",
      address: "Bride's Residence",
      badge: "Auspicious Ritual",
      image: "assets/images/haldi.jpg",
      description: "A joyful sunshine-filled morning applying sacred turmeric paste with marigold flower showers, love, and warm family blessings.",
      mapsUrl: null,
      calendarEvent: {
        title: "Haldi Ceremony - Supriya & Ankush Wedding",
        start: "20261110T033000Z", // 9:00 AM IST is 03:30 UTC
        end: "20261110T063000Z",
        details: "Haldi Ceremony for Supriya & Ankush Wedding at Bride's Residence"
      }
    },
    {
      id: "baraat-swagat",
      title: "Baraat Swagat & Grand Wedding",
      subtitle: "The Royal Wedding Ceremony & Feast",
      dayName: "Tuesday",
      dateFormatted: "10 November 2026",
      dateISO: "2026-11-10",
      time: "6:00 PM",
      venue: "MJ Farm",
      address: "MJ Farm, Badala Road, Near Railway Station, Kharar, Kharar – 140301, Punjab",
      badge: "Grand Ceremony",
      isGrandHighlight: true, // Prominent card styling
      image: "assets/images/baraat_swagat.jpg",
      description: "Grand reception of the Baraat procession followed by the Milni, Jaimala, traditional wedding rituals, and an opulent royal feast.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=MJ+Farm+Badala+Road+Near+Railway+Station+Kharar+140301+Punjab",
      calendarEvent: {
        title: "Baraat Swagat & Grand Wedding - Supriya & Ankush",
        start: "20261110T123000Z", // 6:00 PM IST is 12:30 UTC
        end: "20261110T193000Z",
        details: "Baraat Swagat & Grand Wedding of Supriya & Ankush at MJ Farm, Badala Road, Kharar, Punjab"
      }
    },
    {
      id: "vidai",
      title: "Vidai",
      subtitle: "A Heartfelt Farewell & Beautiful Blessings",
      // IMPORTANT: The date of the Vidai is not yet confirmed.
      // Leave date null or empty string so no date is automatically displayed.
      // To confirm the date in the future, set dateFormatted: "11 November 2026" and dateISO: "2026-11-11".
      dayName: null,
      dateFormatted: null,
      dateISO: null,
      dateStatusText: "Date to be confirmed",
      time: "4:00 AM",
      venue: "To be confirmed",
      address: "To be confirmed",
      badge: "Emotional Farewell",
      image: "assets/images/vidai.jpg",
      description: "A tender, emotional farewell as our dearest daughter embarks on her new journey with love, prayers, and eternal family blessings.",
      mapsUrl: null,
      calendarEvent: null
    }
  ],

  // Family Closing Invitation
  closingInvitation: {
    messageLead: "With immense joy and love, we invite you to join us in celebrating the wedding of our beloved daughter.",
    messageBody: "Your presence and blessings will make this special occasion even more memorable.",
    regardsPrefix: "With love and warm regards,",
    parents: "Nirmala Devi & Karam Chand",
    relation: "Bride's Parents",
    couple: "Supriya & Ankush",
    date: "10 November 2026"
  },

  // Contact / RSVP & Social Links
  rsvp: {
    phone: "+917889430245",
    whatsappUrl: "https://wa.me/917889430245?text=Congratulations%20to%20Supriya%20and%20Ankush!%20We%20delightfully%20accept%20the%20invitation%20and%20will%20join%20the%20wedding%20celebrations.",
    shareTitle: "Supriya & Ankush Wedding Invitation",
    shareText: "You are cordially invited to celebrate the wedding of Supriya & Ankush on 10 November 2026 at MJ Farm, Kharar, Punjab.",
    shareUrl: window.location.href
  },

  // Audio / Music Settings
  audio: {
    // YouTube video ID for soothing wedding music (e.g., romantic Punjabi wedding instrumental)
    youtubeVideoId: "Xg2PBy8wLyo",
    // Local audio file path (can be loaded if provided in assets/audio/)
    localAudioPath: "assets/audio/wedding_music.mp3",
    // Autoplay after envelope interaction
    autoPlayOnOpen: true,
    // Enable fallback Web Audio API ambient sitar/tanpura meditative drone
    enableWebAudioSynthFallback: true
  }
};

// Freeze configuration to prevent accidental mutations
Object.freeze(WEDDING_CONFIG);
window.WEDDING_CONFIG = WEDDING_CONFIG;
