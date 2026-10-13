# Premium Interactive Wedding Invitation Website — Supriya & Ankush

A luxurious, cinematic, interactive Indian wedding invitation website built with standard **HTML, CSS, and JavaScript**, crafted for seamless deployment to **GitHub Pages**.

---

## 🌟 Highlights & Features

1. **Interactive Opening Ceremony (3D Envelope)**:
   - Full-screen opening scene featuring an ivory invitation envelope on a royal maroon velvet background with ornate gold borders.
   - Embossed 3D metallic gold wax seal with couple monogram (`S & A`) and glowing pulse effect.
   - Interactive envelope opening with 3D flap flip, wax seal unlock, and letter slide-out.
   - Celebratory burst explosion of rose petals and golden sparkles upon opening.
   - Automatic music playback initiation respecting browser autoplay policies, with a persistent header equalizer button (`Playing` / `Muted`).

2. **Ganesh Vandana (Devotional Introduction)**:
   - Auspicious shloka: `॥ श्री गणेशाय नमः ॥`
   - Divine blessing: *"With the blessings of Lord Ganesha and the love of our family, we invite you to celebrate the wedding of our beloved daughter."*
   - Sacred gold foil Lord Ganesha artwork with rotating mandala halo and animated flickering diya oil lamps.

3. **Couple Introduction Section**:
   - Regal gold palace arch frame displaying custom traditional wedding illustration of bride and groom.
   - Elegant typography: **SUPRIYA & ANKUSH** with tagline *"Two Hearts, One Beautiful Beginning"*.
   - Wedding Date: `10 NOVEMBER 2026`.
   - Family information cards:
     - **Bride's Family**: Daughter of Mrs. Nirmala Devi and Mr. Karam Chand
     - **Groom's Family**: Son of Mrs. Sweety Gupta and Mr. Naresh Kumar

4. **Live Wedding Countdown (Asia/Kolkata Timezone)**:
   - Dynamic countdown to **10 November 2026** showing Days, Hours, Minutes, and Seconds.
   - Accurately calculated against Indian Standard Time (IST, UTC+05:30).
   - Automatically transitions into a celebratory wedding-day greeting upon arrival.

5. **Wedding Functions Timeline**:
   - **Monday, 9 November 2026**:
     - *Morning Kirtan* (10:00 AM, Bride's Residence)
     - *Nanka Swagat / Mehndi Ceremony* (2:00 PM, Bride's Residence)
     - *DJ Night* (7:00 PM, Bride's Residence)
   - **Tuesday, 10 November 2026**:
     - *Haldi Ceremony* (9:00 AM, Bride's Residence)
     - *Baraat Swagat & Grand Wedding* (6:00 PM, MJ Farm, Badala Road, Near Railway Station, Kharar, Punjab)
       - Highlighted with grand gold badge and prominent styling.
       - Interactive **"Get Directions"** button linked to Google Maps (opens in a new tab).
       - **"Add to Calendar"** integration for Google Calendar.
     - *Vidai* (4:00 AM, Venue: To be confirmed)
       - Handled with unconfirmed date configuration (`Date to be confirmed`), easily editable in `js/config.js`.

6. **Closing Family Invitation Card**:
   - Traditional Indian card format with royal maroon background, gold corner accents, and warm regards from parents **Nirmala Devi & Karam Chand**.

7. **Guest Actions & Sharing**:
   - Direct WhatsApp RSVP button (`Send RSVP via WhatsApp`).
   - Share invitation button with Web Share API support and instant clipboard link copy fallback with toast notification.
   - Floating back-to-top button.

---

## 📁 Project Structure

```
wedding/
├── index.html                 # Main website entry point
├── cover.jpg                  # OpenGraph & social preview card image (1200x675)
├── README.md                  # Project documentation
├── css/
│   ├── style.css              # Design system, royal maroon & gold tokens, layouts
│   └── animations.css         # 3D flap folds, scroll reveals, diya flickers, shimmers
├── js/
│   ├── config.js              # Centralized configuration (dates, venues, families, audio)
│   ├── audio.js               # Audio controller (local audio, YouTube stream, Tanpura synth)
│   ├── canvas-effects.js      # Particle simulation (rose petals, marigolds, gold dust)
│   └── main.js                # Envelope triggers, timeline rendering, countdown, share
└── assets/
    ├── images/                # Luxury illustrations, wax seal, Ganesha, ceremonies
    └── audio/                 # Directory for optional local background music MP3
```

---

## ⚙️ Configuration (`js/config.js`)

All ceremony details, dates, venues, map links, and contact information can be updated in `js/config.js`.

### Confirming the Vidai Date:
When the date of the Vidai is finalized, update the `vidai` object in `js/config.js`:
```javascript
{
  id: "vidai",
  title: "Vidai",
  dayName: "Wednesday",             // e.g. "Wednesday"
  dateFormatted: "11 November 2026", // e.g. "11 November 2026"
  dateISO: "2026-11-11",
  time: "4:00 AM",
  venue: "To be confirmed",
  ...
}
```

---

## 🚀 How to Deploy on GitHub Pages

1. Initialize git and commit the files (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Royal wedding invitation website for Supriya & Ankush"
   ```
2. Create a repository on GitHub (e.g., `wedding-invitation` or `wedding-invites`).
3. Push to your repository:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Select branch: `main` and folder: `/ (root)`.
   - Click **Save**.
5. Your wedding invitation website will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 💻 Testing Locally

Run any static HTTP server:
```bash
python3 -m http.server 8080
```
Open `http://localhost:8080` in any web browser.
