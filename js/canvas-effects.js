/**
 * Canvas Effects Engine for Luxury Wedding Invitation
 * Creates:
 * 1. Gentle falling rose petals & marigold petals
 * 2. Subtle rising gold dust and shimmering sparkles
 * 3. Particle burst explosion on envelope opening
 * 4. High-performance rendering with devicePixelRatio support and reduced motion respect
 */

class WeddingCanvasFX {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.animationFrameId = null;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isPaused = false;

    this.init();
  }

  init() {
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());

    // Respect tab visibility
    document.addEventListener('visibilitychange', () => {
      this.isPaused = document.hidden;
      if (!this.isPaused && !this.animationFrameId) {
        this.loop();
      }
    });

    if (!this.isReducedMotion) {
      this.populateParticles();
      this.loop();
    }
  }

  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
  }

  populateParticles() {
    const isMobile = this.width < 768;
    const petalCount = isMobile ? 18 : 32;
    const goldCount = isMobile ? 25 : 50;

    for (let i = 0; i < petalCount; i++) {
      this.particles.push(new Petal(this.width, this.height, true));
    }
    for (let i = 0; i < goldCount; i++) {
      this.particles.push(new GoldSparkle(this.width, this.height, true));
    }
  }

  /**
   * Triggers a celebratory particle explosion when the envelope opens
   */
  triggerBurst() {
    if (this.isReducedMotion) return;

    const burstOriginX = this.width / 2;
    const burstOriginY = this.height * 0.45;
    const burstCount = this.width < 768 ? 40 : 80;

    for (let i = 0; i < burstCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 3; // Initial upward launch

      if (Math.random() > 0.4) {
        const petal = new Petal(this.width, this.height, false);
        petal.x = burstOriginX;
        petal.y = burstOriginY;
        petal.vx = vx;
        petal.vy = vy;
        petal.isBurst = true;
        this.particles.push(petal);
      } else {
        const spark = new GoldSparkle(this.width, this.height, false);
        spark.x = burstOriginX;
        spark.y = burstOriginY;
        spark.vx = vx * 1.5;
        spark.vy = vy * 1.5;
        spark.isBurst = true;
        this.particles.push(spark);
      }
    }
  }

  loop() {
    if (this.isPaused) {
      this.animationFrameId = null;
      return;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update(this.width, this.height);
      p.draw(this.ctx);

      // Remove expired burst particles to prevent memory bloat
      if (p.isBurst && (p.alpha <= 0 || p.y > this.height + 50)) {
        this.particles.splice(i, 1);
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.loop());
  }
}

/**
 * Petal particle representing velvety Rose or Marigold petals
 */
class Petal {
  constructor(w, h, randomY = false) {
    this.isBurst = false;
    this.alpha = 1;
    this.reset(w, h, randomY);
  }

  reset(w, h, randomY = false) {
    this.x = Math.random() * w;
    this.y = randomY ? Math.random() * h : -25;
    this.size = Math.random() * 8 + 9; // Size 9px to 17px
    this.vy = Math.random() * 1.2 + 0.8;
    this.vx = Math.random() * 0.8 - 0.4;
    this.angle = Math.random() * 360;
    this.angularSpeed = (Math.random() * 1.5 - 0.75) * 1.2;
    this.tilt = Math.random() * Math.PI;
    this.tiltSpeed = Math.random() * 0.04 + 0.01;

    // Palette: Deep royal red, velvety crimson, blush pink, golden marigold
    const petalColors = [
      '#991b1b', // Royal crimson
      '#b91c1c', // Deep ruby
      '#f43f5e', // Rose blush
      '#fb7185', // Soft pink
      '#f59e0b', // Vibrant marigold orange
      '#eab308'  // Golden yellow marigold
    ];
    this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
    this.alpha = Math.random() * 0.3 + 0.65;
  }

  update(w, h) {
    if (this.isBurst) {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.15; // Gravity
      this.vx *= 0.96;
      this.angle += this.angularSpeed * 2;
      this.alpha -= 0.008;
      return;
    }

    this.y += this.vy;
    this.tilt += this.tiltSpeed;
    this.x += Math.sin(this.tilt) * 1.2 + this.vx;
    this.angle += this.angularSpeed;

    if (this.y > h + 30) {
      this.reset(w, h, false);
    }
  }

  draw(ctx) {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.scale(Math.cos(this.tilt), 1);
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;

    // Organic curved petal geometry
    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.6, this.size * 0.8, this.size * 0.6, 0, this.size);
    ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.6, -this.size * 0.8, -this.size * 0.6, 0, -this.size);
    ctx.fill();

    // Subtle petal vein highlight
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, -this.size * 0.7);
    ctx.lineTo(0, this.size * 0.7);
    ctx.stroke();

    ctx.restore();
  }
}

/**
 * Gold sparkle & stardust particle
 */
class GoldSparkle {
  constructor(w, h, randomY = false) {
    this.isBurst = false;
    this.alpha = 1;
    this.reset(w, h, randomY);
  }

  reset(w, h, randomY = false) {
    this.x = Math.random() * w;
    this.y = randomY ? Math.random() * h : h + 10;
    this.radius = Math.random() * 2 + 0.8;
    this.vy = -(Math.random() * 0.7 + 0.2); // Gentle upward drift
    this.vx = Math.random() * 0.4 - 0.2;
    this.alpha = Math.random() * 0.6 + 0.3;
    this.pulseSpeed = Math.random() * 0.05 + 0.02;
    this.pulseVal = Math.random() * Math.PI;
    this.color = Math.random() > 0.4 ? '#fde047' : '#f59e0b';
  }

  update(w, h) {
    if (this.isBurst) {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.08;
      this.vx *= 0.95;
      this.alpha -= 0.015;
      return;
    }

    this.y += this.vy;
    this.x += this.vx;
    this.pulseVal += this.pulseSpeed;

    if (this.y < -10) {
      this.reset(w, h, false);
    }
  }

  draw(ctx) {
    if (this.alpha <= 0) return;
    const currentAlpha = Math.max(0, this.alpha * (0.6 + Math.sin(this.pulseVal) * 0.4));
    ctx.save();
    ctx.globalAlpha = currentAlpha;
    ctx.fillStyle = this.color;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

window.WeddingCanvasFX = WeddingCanvasFX;
