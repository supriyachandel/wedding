/**
 * Main Controller — Supriya & Ankush Wedding Invitation Website
 * Orchestrates Envelope Animation, Functions Timeline, Countdown, and Social Actions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Canvas Particle Engine
  let canvasFX = null;
  if (window.WeddingCanvasFX) {
    canvasFX = new WeddingCanvasFX('fx-canvas');
  }

  // 2. Initialize Audio Manager
  let audioManager = null;
  if (window.WeddingAudioManager && window.WEDDING_CONFIG) {
    audioManager = new WeddingAudioManager(WEDDING_CONFIG.audio);
  }

  // 3. Render Dynamic Sections from Config
  renderFunctionsTimeline();
  setupCountdownTimer();
  setupEnvelopeInteractions(audioManager, canvasFX);
  setupScrollObservers();
  setupMemoriesReel();
  setupFloatingControls();
  setupShareAndToast();
});

/**
 * Handles Envelope Opening Ceremony
 */
function setupEnvelopeInteractions(audioManager, canvasFX) {
  const envelopeScreen = document.getElementById('envelope-screen');
  const envelopeBox = document.getElementById('envelope-box');
  const openBtn = document.getElementById('btn-open-envelope');
  const waxSeal = document.getElementById('envelope-seal');
  const mainInvitation = document.getElementById('main-invitation');

  let isOpened = false;

  function triggerOpen() {
    if (isOpened) return;
    isOpened = true;

    // 1. Play Background Music upon user gesture
    if (audioManager) {
      audioManager.play();
    }

    // 2. Trigger 3D Flap & Wax Seal Animation
    if (envelopeBox) {
      envelopeBox.classList.add('is-opening');
    }

    // 3. Trigger Particle Burst Explosion
    if (canvasFX) {
      canvasFX.triggerBurst();
    }

    // 4. Reveal Main Website smoothly
    setTimeout(() => {
      if (envelopeScreen) {
        envelopeScreen.classList.add('opened');
      }
      if (mainInvitation) {
        mainInvitation.classList.add('revealed');
      }

      // Smooth scroll to top of main invitation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1100);
  }

  if (openBtn) openBtn.addEventListener('click', triggerOpen);
  if (waxSeal) waxSeal.addEventListener('click', triggerOpen);
  if (envelopeBox) envelopeBox.addEventListener('click', (e) => {
    // Only open if clicking envelope before open
    if (!isOpened) triggerOpen();
  });
}

/**
 * Renders Wedding Functions Timeline dynamically from WEDDING_CONFIG.functions
 */
function renderFunctionsTimeline() {
  const container = document.getElementById('timeline-events-container');
  if (!container || !window.WEDDING_CONFIG || !WEDDING_CONFIG.functions) return;

  const functions = WEDDING_CONFIG.functions;
  let html = '';
  let currentDayGroup = '';

  functions.forEach((event, index) => {
    // Group headers by Day / Date
    const dayHeaderKey = event.dayName && event.dateFormatted ? `${event.dayName}, ${event.dateFormatted}` : null;
    
    if (dayHeaderKey && dayHeaderKey !== currentDayGroup) {
      currentDayGroup = dayHeaderKey;
      html += `
        <div class="timeline-day-header reveal-on-scroll">
          <div class="timeline-day-badge">
            <span>📅 ${event.dayName} — ${event.dateFormatted}</span>
          </div>
        </div>
      `;
    } else if (!dayHeaderKey && currentDayGroup !== 'unconfirmed') {
      currentDayGroup = 'unconfirmed';
      html += `
        <div class="timeline-day-header reveal-on-scroll">
          <div class="timeline-day-badge" style="background: linear-gradient(135deg, #7d0d1b, #4a050f); color: #fef0c7; border: 1px solid #dfba73;">
            <span>🕊️ Heartfelt Farewell Ceremony</span>
          </div>
        </div>
      `;
    }

    // Date display logic: Respect prompt requirements for unconfirmed dates (Vidai)
    let dateMetaHTML = '';
    if (event.dateFormatted) {
      dateMetaHTML = `
        <div class="event-meta-item">
          <span class="event-meta-icon">📅</span>
          <div class="event-meta-text">
            <span class="event-meta-label">Date:</span>
            <span>${event.dayName ? event.dayName + ', ' : ''}${event.dateFormatted}</span>
          </div>
        </div>
      `;
    } else {
      dateMetaHTML = `
        <div class="event-meta-item">
          <span class="event-meta-icon">📅</span>
          <div class="event-meta-text">
            <span class="event-meta-label">Date:</span>
            <span style="font-style: italic; color: #f7e7b4;">${event.dateStatusText || 'To be confirmed'}</span>
          </div>
        </div>
      `;
    }

    // Action buttons: Google Maps and Google Calendar
    let actionsHTML = '';
    if (event.mapsUrl) {
      actionsHTML += `
        <a href="${event.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-event-action btn-event-maps">
          <span>📍 Get Directions</span>
        </a>
      `;
    }

    if (event.calendarEvent) {
      const calUrl = generateGoogleCalendarUrl(
        event.calendarEvent.title,
        event.calendarEvent.start,
        event.calendarEvent.end,
        event.calendarEvent.details,
        event.address || event.venue
      );
      actionsHTML += `
        <a href="${calUrl}" target="_blank" rel="noopener noreferrer" class="btn-event-action btn-event-cal">
          <span>📅 Add to Calendar</span>
        </a>
      `;
    }

    const grandClass = event.isGrandHighlight ? 'is-grand-highlight' : '';
    const delayClass = `reveal-delay-${(index % 3) + 1}`;

    html += `
      <article class="event-card ${grandClass} reveal-on-scroll ${delayClass}" id="event-${event.id}">
        <div class="event-card-media">
          <img src="${event.image}" alt="${event.title}" loading="lazy" onerror="this.src='assets/images/cover.jpg'" />
          <span class="event-badge">${event.badge}</span>
        </div>
        <div class="event-card-content">
          <h3 class="event-card-title">${event.title}</h3>
          <div class="event-card-subtitle">${event.subtitle}</div>
          
          <div class="event-meta-grid">
            ${dateMetaHTML}
            <div class="event-meta-item">
              <span class="event-meta-icon">⏰</span>
              <div class="event-meta-text">
                <span class="event-meta-label">Time:</span>
                <span>${event.time}</span>
              </div>
            </div>
            <div class="event-meta-item">
              <span class="event-meta-icon">🏛️</span>
              <div class="event-meta-text">
                <span class="event-meta-label">Venue:</span>
                <span>${event.venue}</span>
              </div>
            </div>
            ${event.address && event.address !== event.venue ? `
            <div class="event-meta-item">
              <span class="event-meta-icon">📍</span>
              <div class="event-meta-text">
                <span class="event-meta-label">Address:</span>
                <span style="font-size: 0.88rem;">${event.address}</span>
              </div>
            </div>
            ` : ''}
          </div>

          <p class="event-card-description">${event.description}</p>
          
          <div class="event-actions">
            ${actionsHTML}
          </div>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
}

/**
 * Builds Google Calendar Event URL
 */
function generateGoogleCalendarUrl(title, startISO, endISO, details, location) {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const params = new URLSearchParams({
    text: title,
    dates: `${startISO}/${endISO}`,
    details: details || '',
    location: location || ''
  });
  return `${base}&${params.toString()}`;
}

/**
 * Countdown Timer configured for Indian Standard Time (Asia/Kolkata: UTC+05:30)
 */
function setupCountdownTimer() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');
  const gridEl = document.getElementById('countdown-grid');
  const weddingDayMsg = document.getElementById('countdown-wedding-day-message');

  if (!daysEl || !hoursEl || !minsEl || !secsEl || !window.WEDDING_CONFIG) return;

  // Wedding Date timestamp in Asia/Kolkata
  // 10 November 2026, 18:00 IST (UTC+05:30)
  const targetDate = new Date(WEDDING_CONFIG.couple.weddingDateISO).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (gridEl) gridEl.style.display = 'none';
      if (weddingDayMsg) {
        weddingDayMsg.style.display = 'block';
        weddingDayMsg.innerHTML = `✨ Today is the Auspicious Day! The Wedding Celebrations Have Begun! ✨`;
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/**
 * IntersectionObserver for smooth scroll reveals
 */
function setupScrollObservers() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Floating Dock Controls (Back to Top & Quick Nav)
 */
function setupFloatingControls() {
  const btnBackToTop = document.getElementById('btn-back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      if (btnBackToTop) btnBackToTop.classList.add('visible');
    } else {
      if (btnBackToTop) btnBackToTop.classList.remove('visible');
    }
  }, { passive: true });

  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * Share Invitation and Toast Notification
 */
function setupShareAndToast() {
  const btnShare = document.getElementById('btn-share-invite');
  const btnHeaderShare = document.getElementById('btn-header-share');
  const toast = document.getElementById('toast-notice');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3200);
  }

  async function handleShare() {
    const config = window.WEDDING_CONFIG ? WEDDING_CONFIG.rsvp : {};
    const shareData = {
      title: config.shareTitle || "Supriya & Ankush Wedding Invitation",
      text: config.shareText || "You are cordially invited to celebrate the wedding of Supriya & Ankush on 10 November 2026.",
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard if user dismissed or error
        if (err.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  }

  function copyToClipboard() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => showToast('✨ Invitation link copied to clipboard! Share with loved ones.'))
        .catch(() => showToast('✨ URL: ' + window.location.href));
    } else {
      showToast('✨ URL: ' + window.location.href);
    }
  }

  if (btnShare) btnShare.addEventListener('click', handleShare);
  if (btnHeaderShare) btnHeaderShare.addEventListener('click', handleShare);

  // Sync WhatsApp RSVP button link from config
  const rsvpBtn = document.querySelector('.btn-rsvp-whatsapp');
  if (rsvpBtn && window.WEDDING_CONFIG && window.WEDDING_CONFIG.rsvp && window.WEDDING_CONFIG.rsvp.whatsappUrl) {
    rsvpBtn.href = window.WEDDING_CONFIG.rsvp.whatsappUrl;
  }
}

/**
 * Interactive 5-Photo Memories Reel Controller (Swipe Up / Down, Counter & Heart Blast)
 */
function setupMemoriesReel() {
  const reelFeed = document.getElementById('reel-feed');
  const reelViewport = document.getElementById('reel-viewport');
  const btnReelUp = document.getElementById('btn-reel-up');
  const btnReelDown = document.getElementById('btn-reel-down');
  const btnLike = document.getElementById('btn-like');
  const counterPill = document.getElementById('reel-counter');
  const swipeHint = document.getElementById('swipe-hint');
  const totalSlides = 5;

  if (!reelFeed || !reelViewport) return;

  if (btnReelUp) {
    btnReelUp.addEventListener('click', () => {
      reelFeed.scrollBy({ top: -reelFeed.clientHeight, behavior: 'smooth' });
    });
  }

  if (btnReelDown) {
    btnReelDown.addEventListener('click', () => {
      reelFeed.scrollBy({ top: reelFeed.clientHeight, behavior: 'smooth' });
    });
  }

  reelFeed.addEventListener('scroll', () => {
    const activeIdx = Math.min(
      totalSlides,
      Math.max(1, Math.round(reelFeed.scrollTop / reelFeed.clientHeight) + 1)
    );
    if (counterPill) {
      counterPill.textContent = `${activeIdx} / ${totalSlides}`;
    }
    if (swipeHint && reelFeed.scrollTop > 30) {
      swipeHint.style.opacity = '0';
    }
  }, { passive: true });

  function spawnHeartEffect() {
    const heart = document.createElement('div');
    heart.className = 'heart-blast';
    heart.innerHTML = '❤️';
    reelViewport.appendChild(heart);
    setTimeout(() => heart.remove(), 900);
  }

  if (btnLike) {
    btnLike.addEventListener('click', spawnHeartEffect);
  }

  reelFeed.addEventListener('dblclick', spawnHeartEffect);
}
