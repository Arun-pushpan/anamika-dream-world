// Boo-Boo's Beauty Studio - Interactive Anime Princess Makeover
// Eyeshadow, Lipstick, Hairstyles, Accessories, and Princess Reveal Snapshot!

class BeautyStudio {
  constructor() {
    this.state = {
      hairstyle: 'twintails',
      hairColor: '#f7d070', // Honey Blonde
      hasStreak: true,
      streakColor: '#e63946', // Strawberry Red streak
      eyeshadow: '#ff9ebb',
      lipstick: '#ff5588',
      lipGloss: true,
      blush: 'hearts', // rosy, peach, hearts, stars
      blushColor: '#ff70a6',
      eyeColor: '#7b2cbf', // Purple/Violet anime eyes
      accessory: 'bows', // bows, tiara, star, necklace, glasses, none
      outfit: 'pajamas', // pajamas, gown, fairy, idol
      princessTitle: 'Princess of Starlight & Dreams'
    };

    this.activeTab = 'makeup';
  }

  init() {
    this.renderAvatar();
    this.setupEventListeners();
  }

  setTab(tabName) {
    this.activeTab = tabName;
    document.querySelectorAll('.studio-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.studio-tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `tab-${tabName}`);
    });
    if (window.soundEngine) window.soundEngine.playPop();
  }

  setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.studio-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setTab(btn.dataset.tab);
      });
    });
  }

  setEyeshadow(color) {
    this.state.eyeshadow = color;
    if (window.soundEngine) window.soundEngine.playBrush();
    this.renderAvatar();
    this.highlightOption('eyeshadow', color);
  }

  setLipstick(color) {
    this.state.lipstick = color;
    if (window.soundEngine) window.soundEngine.playPop();
    this.renderAvatar();
    this.highlightOption('lipstick', color);
  }

  setHairstyle(style) {
    this.state.hairstyle = style;
    if (window.soundEngine) window.soundEngine.playSparkle();
    this.renderAvatar();
    this.highlightOption('hairstyle', style);
  }

  setHairColor(color, hasStreak = null) {
    this.state.hairColor = color;
    if (hasStreak !== null) this.state.hasStreak = hasStreak;
    if (window.soundEngine) window.soundEngine.playSparkle();
    this.renderAvatar();
    this.highlightOption('haircolor', color);
  }

  setStreak(enabled) {
    this.state.hasStreak = enabled;
    if (window.soundEngine) window.soundEngine.playPop();
    this.renderAvatar();
  }

  setBlush(type, color = '#ff70a6') {
    this.state.blush = type;
    this.state.blushColor = color;
    if (window.soundEngine) window.soundEngine.playBrush();
    this.renderAvatar();
    this.highlightOption('blush', type);
  }

  setEyeColor(color) {
    this.state.eyeColor = color;
    if (window.soundEngine) window.soundEngine.playPop();
    this.renderAvatar();
    this.highlightOption('eyecolor', color);
  }

  setAccessory(acc) {
    this.state.accessory = acc;
    if (window.soundEngine) window.soundEngine.playSparkle();
    this.renderAvatar();
    this.highlightOption('accessory', acc);
  }

  setOutfit(outfit) {
    this.state.outfit = outfit;
    if (window.soundEngine) window.soundEngine.playSparkle();
    this.renderAvatar();
    this.highlightOption('outfit', outfit);
  }

  highlightOption(group, val) {
    document.querySelectorAll(`[data-${group}]`).forEach(el => {
      el.classList.toggle('selected', el.getAttribute(`data-${group}`) === val);
    });
  }

  // Surprise randomizer
  randomizeLook() {
    const hairstyles = ['twintails', 'waves', 'ponytail', 'spacebuns', 'bob', 'crownbraid'];
    const hairColors = ['#f7d070', '#ff9ebb', '#c499f6', '#4a3728', '#2b2d42', '#a8dadc'];
    const eyeshadows = ['#ff9ebb', '#ff66aa', '#b388ff', '#ffaa80', '#80d8ff', '#ffd700'];
    const lipsticks = ['#ff5588', '#ff70a6', '#e63946', '#c72c68', '#ff8a65', '#d47b59'];
    const eyeColors = ['#7b2cbf', '#1d3557', '#e63946', '#2a9d8f', '#b56576'];
    const blushes = ['hearts', 'rosy', 'peach', 'stars'];
    const accessories = ['bows', 'tiara', 'star', 'necklace', 'glasses'];
    const outfits = ['pajamas', 'gown', 'fairy', 'idol'];

    this.state.hairstyle = hairstyles[Math.floor(Math.random() * hairstyles.length)];
    this.state.hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
    this.state.hasStreak = Math.random() > 0.4;
    this.state.eyeshadow = eyeshadows[Math.floor(Math.random() * eyeshadows.length)];
    this.state.lipstick = lipsticks[Math.floor(Math.random() * lipsticks.length)];
    this.state.eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];
    this.state.blush = blushes[Math.floor(Math.random() * blushes.length)];
    this.state.accessory = accessories[Math.floor(Math.random() * accessories.length)];
    this.state.outfit = outfits[Math.floor(Math.random() * outfits.length)];

    if (window.soundEngine) window.soundEngine.playSparkle();
    this.renderAvatar();
  }

  resetLook() {
    this.state = {
      hairstyle: 'twintails',
      hairColor: '#f7d070',
      hasStreak: true,
      streakColor: '#e63946',
      eyeshadow: '#ff9ebb',
      lipstick: '#ff5588',
      lipGloss: true,
      blush: 'hearts',
      blushColor: '#ff70a6',
      eyeColor: '#7b2cbf',
      accessory: 'bows',
      outfit: 'pajamas',
      princessTitle: 'Princess of Starlight & Dreams'
    };
    if (window.soundEngine) window.soundEngine.playPop();
    this.renderAvatar();
  }

  // Render SVG Character dynamically
  renderAvatar() {
    const container = document.getElementById('avatarSvgContainer');
    if (!container) return;

    const {
      hairstyle,
      hairColor,
      hasStreak,
      streakColor,
      eyeshadow,
      lipstick,
      blush,
      eyeColor,
      accessory,
      outfit
    } = this.state;

    // SVG Layers definition
    let backHairSvg = '';
    let frontHairSvg = '';
    let accessorySvg = '';
    let outfitSvg = '';
    let blushSvg = '';

    // 1. Back Hair
    if (hairstyle === 'twintails') {
      backHairSvg = `
        <!-- Twintails Back -->
        <path d="M 110 200 C 60 210 20 270 40 370 C 55 430 90 440 95 380 C 100 320 120 280 135 250 Z" fill="${hairColor}" />
        <path d="M 290 200 C 340 210 380 270 360 370 C 345 430 310 440 305 380 C 300 320 280 280 265 250 Z" fill="${hairColor}" />
        ${hasStreak ? `<path d="M 115 210 C 80 230 45 285 58 350 C 65 330 85 270 125 245 Z" fill="${streakColor}" opacity="0.9" />` : ''}
      `;
    } else if (hairstyle === 'waves') {
      backHairSvg = `
        <!-- Long Royal Wavy Curls -->
        <path d="M 90 190 C 40 260 50 400 80 470 C 120 480 140 430 110 370 C 130 320 140 260 140 210 Z" fill="${hairColor}" />
        <path d="M 310 190 C 360 260 350 400 320 470 C 280 480 260 430 290 370 C 270 320 260 260 260 210 Z" fill="${hairColor}" />
        <path d="M 120 210 Q 200 130 280 210 Q 300 350 200 370 Q 100 350 120 210 Z" fill="${hairColor}" />
      `;
    } else if (hairstyle === 'ponytail') {
      backHairSvg = `
        <!-- High Ponytail -->
        <path d="M 270 130 C 350 110 410 190 390 340 C 370 410 340 400 345 330 C 350 240 310 190 260 170 Z" fill="${hairColor}" />
        ${hasStreak ? `<path d="M 280 135 C 335 125 385 180 375 280 C 355 230 315 175 275 160 Z" fill="${streakColor}" opacity="0.9" />` : ''}
      `;
    } else if (hairstyle === 'spacebuns') {
      backHairSvg = `
        <!-- Space Buns -->
        <circle cx="95" cy="115" r="48" fill="${hairColor}" />
        <circle cx="305" cy="115" r="48" fill="${hairColor}" />
        ${hasStreak ? `<circle cx="95" cy="115" r="30" fill="${streakColor}" opacity="0.8" />` : ''}
      `;
    } else if (hairstyle === 'bob') {
      backHairSvg = `
        <!-- Soft Bob Cut -->
        <path d="M 100 190 C 80 270 90 340 120 370 C 145 350 140 280 145 220 Z" fill="${hairColor}" />
        <path d="M 300 190 C 320 270 310 340 280 370 C 255 350 260 280 255 220 Z" fill="${hairColor}" />
      `;
    } else if (hairstyle === 'crownbraid') {
      backHairSvg = `
        <!-- Crown Braid Long Back -->
        <path d="M 100 200 C 70 290 85 410 120 460 C 145 420 130 330 140 230 Z" fill="${hairColor}" />
        <path d="M 300 200 C 330 290 315 410 280 460 C 255 420 270 330 260 230 Z" fill="${hairColor}" />
      `;
    }

    // 2. Outfits
    if (outfit === 'pajamas') {
      outfitSvg = `
        <!-- Cute Pink Collared Pajamas with Ribbon (matching screenshot!) -->
        <path d="M 120 360 Q 200 370 280 360 L 320 480 L 80 480 Z" fill="#ffd1e6" />
        <path d="M 155 355 L 200 420 L 130 400 Z" fill="#ffffff" stroke="#ffb3d9" stroke-width="2" />
        <path d="M 245 355 L 200 420 L 270 400 Z" fill="#ffffff" stroke="#ffb3d9" stroke-width="2" />
        <!-- Red Collar Ribbon Knot -->
        <path d="M 190 350 Q 200 358 210 350 Q 200 365 190 350 Z" fill="#e63946" />
        <circle cx="200" cy="358" r="4" fill="#d90429" />
        <path d="M 197 362 L 188 385 M 203 362 L 212 385" stroke="#e63946" stroke-width="2.5" stroke-linecap="round" />
      `;
    } else if (outfit === 'gown') {
      outfitSvg = `
        <!-- Royal Lavender Princess Gown -->
        <path d="M 120 360 Q 200 390 280 360 L 330 480 L 70 480 Z" fill="#d7bdfc" />
        <path d="M 130 365 Q 200 395 270 365 L 255 430 Q 200 450 145 430 Z" fill="#fff" opacity="0.6" />
        <path d="M 115 365 C 100 375 90 400 95 420 C 120 420 135 385 130 365 Z" fill="#c499f6" />
        <path d="M 285 365 C 300 375 310 400 305 420 C 280 420 265 385 270 365 Z" fill="#c499f6" />
        <!-- Golden Brooch -->
        <circle cx="200" cy="390" r="7" fill="#ffd166" />
        <circle cx="200" cy="390" r="4" fill="#e76f51" />
      `;
    } else if (outfit === 'fairy') {
      outfitSvg = `
        <!-- Fairy Wings and Sparkle Petal Dress -->
        <!-- Wings -->
        <path d="M 110 320 C 30 280 10 360 40 430 C 80 440 110 390 120 360 Z" fill="#e0f7fa" opacity="0.8" stroke="#80deea" stroke-width="1.5" />
        <path d="M 290 320 C 370 280 390 360 360 430 C 320 440 290 390 280 360 Z" fill="#e0f7fa" opacity="0.8" stroke="#80deea" stroke-width="1.5" />
        <!-- Dress -->
        <path d="M 125 360 Q 200 375 275 360 L 315 480 L 85 480 Z" fill="#bbf7d0" />
        <path d="M 125 360 Q 200 410 275 360" fill="none" stroke="#86efac" stroke-width="3" />
        <circle cx="200" cy="375" r="5" fill="#fef08a" />
      `;
    } else if (outfit === 'idol') {
      outfitSvg = `
        <!-- Cute School Idol Blazer -->
        <path d="M 120 360 Q 200 370 280 360 L 325 480 L 75 480 Z" fill="#fda4af" />
        <path d="M 160 360 L 200 420 L 140 400 Z" fill="#1e293b" />
        <path d="M 240 360 L 200 420 L 260 400 Z" fill="#1e293b" />
        <!-- Plaid Tie -->
        <path d="M 193 360 L 207 360 L 204 430 L 200 445 L 196 430 Z" fill="#e11d48" />
        <circle cx="200" cy="365" r="4" fill="#fbbf24" />
      `;
    }

    // 3. Front Hair & Bangs
    let streakBangSvg = hasStreak ? `
      <path d="M 185 95 C 190 120 185 160 175 195 C 185 165 200 135 195 95 Z" fill="${streakColor}" />
    ` : '';

    frontHairSvg = `
      <!-- Hair Top Crown -->
      <path d="M 105 190 C 95 100 160 60 200 60 C 240 60 305 100 295 190 C 280 150 260 110 200 110 C 140 110 120 150 105 190 Z" fill="${hairColor}" />

      <!-- Bangs -->
      <path d="M 110 170 C 125 210 150 220 165 210 C 170 190 170 160 165 140 Z" fill="${hairColor}" />
      <path d="M 160 160 C 175 225 200 230 215 210 C 210 180 200 140 195 120 Z" fill="${hairColor}" />
      <path d="M 210 160 C 220 220 245 225 260 195 C 255 170 245 140 235 125 Z" fill="${hairColor}" />
      <path d="M 250 170 C 270 210 285 205 295 180 C 290 150 280 130 265 120 Z" fill="${hairColor}" />

      <!-- Side Locks / Tendrils framing face -->
      <path d="M 115 180 C 105 240 125 285 135 310 C 130 270 125 230 135 190 Z" fill="${hairColor}" />
      <path d="M 285 180 C 295 240 275 285 265 310 C 270 270 275 230 265 190 Z" fill="${hairColor}" />

      ${streakBangSvg}
    `;

    // 4. Blush Styles
    if (blush === 'hearts') {
      blushSvg = `
        <!-- Heart Blush Stamps -->
        <g fill="#ff4d88" opacity="0.75">
          <path d="M 140 278 A 4 4 0 0 0 132 278 A 4 4 0 0 0 136 286 L 136 286 Z" transform="scale(1.2) translate(-25, -45)" />
          <path d="M 230 278 A 4 4 0 0 0 222 278 A 4 4 0 0 0 226 286 L 226 286 Z" transform="scale(1.2) translate(10, -45)" />
          <ellipse cx="140" cy="275" rx="14" ry="7" fill="#ff70a6" opacity="0.35" />
          <ellipse cx="260" cy="275" rx="14" ry="7" fill="#ff70a6" opacity="0.35" />
        </g>
      `;
    } else if (blush === 'rosy') {
      blushSvg = `
        <ellipse cx="140" cy="275" rx="16" ry="8" fill="#ff4d88" opacity="0.45" />
        <ellipse cx="260" cy="275" rx="16" ry="8" fill="#ff4d88" opacity="0.45" />
        <!-- Soft blush streaks -->
        <line x1="133" y1="272" x2="147" y2="278" stroke="#ff1a66" stroke-width="1.5" stroke-linecap="round" opacity="0.4" />
        <line x1="253" y1="272" x2="267" y2="278" stroke="#ff1a66" stroke-width="1.5" stroke-linecap="round" opacity="0.4" />
      `;
    } else if (blush === 'peach') {
      blushSvg = `
        <ellipse cx="140" cy="275" rx="18" ry="9" fill="#ff8a65" opacity="0.5" />
        <ellipse cx="260" cy="275" rx="18" ry="9" fill="#ff8a65" opacity="0.5" />
      `;
    } else if (blush === 'stars') {
      blushSvg = `
        <ellipse cx="140" cy="275" rx="15" ry="8" fill="#ff70a6" opacity="0.35" />
        <ellipse cx="260" cy="275" rx="15" ry="8" fill="#ff70a6" opacity="0.35" />
        <!-- Sparkle stars -->
        <text x="135" y="278" font-size="12" fill="#ffd166">✨</text>
        <text x="255" y="278" font-size="12" fill="#ffd166">✨</text>
      `;
    }

    // 5. Accessories
    if (accessory === 'bows') {
      accessorySvg = `
        <!-- Twin Pink Silk Bows (matching screenshot!) -->
        <!-- Left Bow -->
        <g transform="translate(100, 160) rotate(-15)">
          <path d="M 0 0 C -25 -20 -35 15 0 0 Z" fill="#ff66aa" stroke="#e63980" stroke-width="2" />
          <path d="M 0 0 C -20 30 -5 35 0 0 Z" fill="#ff66aa" stroke="#e63980" stroke-width="2" />
          <circle cx="0" cy="0" r="7" fill="#d90466" />
          <path d="M -3 4 L -12 25 M 3 4 L 8 22" stroke="#ff66aa" stroke-width="3" stroke-linecap="round" />
        </g>
        <!-- Right Bow -->
        <g transform="translate(300, 160) rotate(15)">
          <path d="M 0 0 C 25 -20 35 15 0 0 Z" fill="#ff66aa" stroke="#e63980" stroke-width="2" />
          <path d="M 0 0 C 20 30 5 35 0 0 Z" fill="#ff66aa" stroke="#e63980" stroke-width="2" />
          <circle cx="0" cy="0" r="7" fill="#d90466" />
          <path d="M 3 4 L 12 25 M -3 4 L -8 22" stroke="#ff66aa" stroke-width="3" stroke-linecap="round" />
        </g>
      `;
    } else if (accessory === 'tiara') {
      accessorySvg = `
        <!-- Golden Princess Tiara -->
        <g transform="translate(200, 85)">
          <path d="M -50 0 L -30 -25 L -10 -10 L 0 -38 L 10 -10 L 30 -25 L 50 0 Z" fill="#ffd700" stroke="#f39c12" stroke-width="2" />
          <circle cx="0" cy="-38" r="5" fill="#e74c3c" />
          <circle cx="-30" cy="-25" r="4" fill="#9b59b6" />
          <circle cx="30" cy="-25" r="4" fill="#9b59b6" />
          <circle cx="0" cy="-12" r="6" fill="#3498db" />
        </g>
      `;
    } else if (accessory === 'star') {
      accessorySvg = `
        <!-- Twinkle Star Hairpin -->
        <g transform="translate(130, 130)">
          <polygon points="0,-15 4,-4 15,-4 7,3 10,14 0,7 -10,14 -7,3 -15,-4 -4,-4" fill="#ffd166" stroke="#f39c12" stroke-width="1.5" />
          <circle cx="0" cy="0" r="3" fill="#ffffff" />
        </g>
      `;
    } else if (accessory === 'necklace') {
      accessorySvg = `
        <!-- Pearl Necklace -->
        <g fill="#ffffff" stroke="#e2e8f0" stroke-width="1">
          <circle cx="160" cy="350" r="5" />
          <circle cx="173" cy="358" r="5.5" />
          <circle cx="186" cy="363" r="6" />
          <circle cx="200" cy="365" r="7" fill="#ffe4e6" />
          <circle cx="214" cy="363" r="6" />
          <circle cx="227" cy="358" r="5.5" />
          <circle cx="240" cy="350" r="5" />
        </g>
      `;
    } else if (accessory === 'glasses') {
      accessorySvg = `
        <!-- Chic Heart Sunglasses -->
        <g fill="#ff70a6" opacity="0.7" stroke="#ffffff" stroke-width="2">
          <path d="M 140 230 C 130 215 105 220 110 240 C 115 255 140 270 140 270 C 140 270 165 255 170 240 C 175 220 150 215 140 230 Z" />
          <path d="M 260 230 C 250 215 225 220 230 240 C 235 255 260 270 260 270 C 260 270 285 255 290 240 C 295 220 270 215 260 230 Z" />
          <line x1="170" y1="240" x2="230" y2="240" stroke="#ffffff" stroke-width="3" />
        </g>
      `;
    }

    // Complete SVG Markup
    const svgCode = `
      <svg id="princessAvatarSvg" viewBox="0 0 400 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#111122" />
            <stop offset="40%" stop-color="${eyeColor}" />
            <stop offset="100%" stop-color="#ff8fc7" />
          </linearGradient>
          <radialGradient id="eyeshadowGlow">
            <stop offset="0%" stop-color="${eyeshadow}" stop-opacity="0.85" />
            <stop offset="70%" stop-color="${eyeshadow}" stop-opacity="0.3" />
            <stop offset="100%" stop-color="${eyeshadow}" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fff5f0" />
            <stop offset="100%" stop-color="#ffebe3" />
          </linearGradient>
        </defs>

        <!-- 1. BACK HAIR -->
        ${backHairSvg}

        <!-- 2. NECK & EARS -->
        <rect x="180" y="300" width="40" height="60" fill="url(#skinGrad)" rx="6" />
        <path d="M 120 235 C 105 240 105 270 125 270 Z" fill="url(#skinGrad)" />
        <path d="M 280 235 C 295 240 295 270 275 270 Z" fill="url(#skinGrad)" />

        <!-- 3. OUTFIT / CLOTHING -->
        ${outfitSvg}

        <!-- 4. HEAD / FACE BASE -->
        <path d="M 120 200 C 115 140 285 140 280 200 C 280 260 250 330 200 330 C 150 330 120 260 120 200 Z" fill="url(#skinGrad)" stroke="#f7d4c8" stroke-width="1.5" />

        <!-- 5. EYESHADOW GLOW -->
        <ellipse cx="152" cy="226" rx="28" ry="14" fill="url(#eyeshadowGlow)" />
        <ellipse cx="248" cy="226" rx="28" ry="14" fill="url(#eyeshadowGlow)" />

        <!-- 6. EYEBROWS -->
        <path d="M 135 210 Q 155 200 172 212" stroke="#8d6e63" stroke-width="2.5" stroke-linecap="round" fill="none" />
        <path d="M 265 210 Q 245 200 228 212" stroke="#8d6e63" stroke-width="2.5" stroke-linecap="round" fill="none" />

        <!-- 7. ANIME EYES -->
        <!-- Left Eye Socket -->
        <ellipse cx="152" cy="235" rx="20" ry="24" fill="#ffffff" />
        <ellipse cx="152" cy="236" rx="16" ry="21" fill="url(#eyeGrad)" />
        <!-- Iris Highlights -->
        <circle cx="146" cy="225" r="6" fill="#ffffff" />
        <circle cx="158" cy="246" r="3.5" fill="#ffffff" opacity="0.9" />
        <circle cx="150" cy="248" r="2" fill="#ffffff" opacity="0.8" />
        <!-- Upper Eyelashes & Eyeliner -->
        <path d="M 130 225 Q 152 210 175 226" stroke="#2b2d42" stroke-width="3.5" stroke-linecap="round" fill="none" />
        <path d="M 172 223 L 180 220" stroke="#2b2d42" stroke-width="2.5" stroke-linecap="round" />

        <!-- Right Eye Socket -->
        <ellipse cx="248" cy="235" rx="20" ry="24" fill="#ffffff" />
        <ellipse cx="248" cy="236" rx="16" ry="21" fill="url(#eyeGrad)" />
        <!-- Iris Highlights -->
        <circle cx="242" cy="225" r="6" fill="#ffffff" />
        <circle cx="254" cy="246" r="3.5" fill="#ffffff" opacity="0.9" />
        <circle cx="246" cy="248" r="2" fill="#ffffff" opacity="0.8" />
        <!-- Upper Eyelashes & Eyeliner -->
        <path d="M 270 225 Q 248 210 225 226" stroke="#2b2d42" stroke-width="3.5" stroke-linecap="round" fill="none" />
        <path d="M 228 223 L 220 220" stroke="#2b2d42" stroke-width="2.5" stroke-linecap="round" />

        <!-- 8. NOSE -->
        <circle cx="200" cy="265" r="2" fill="#e5989b" opacity="0.7" />

        <!-- 9. BLUSH -->
        ${blushSvg}

        <!-- 10. LIPS (Lipstick) -->
        <g>
          <!-- Upper Lip -->
          <path d="M 188 290 Q 200 286 212 290 Q 200 293 188 290 Z" fill="${lipstick}" />
          <!-- Lower Lip -->
          <path d="M 189 291 Q 200 302 211 291 Z" fill="${lipstick}" />
          <!-- Lip Gloss Sparkle -->
          <ellipse cx="197" cy="295" rx="3.5" ry="1.5" fill="#ffffff" opacity="0.85" />
        </g>

        <!-- 11. FRONT HAIR & BANGS -->
        ${frontHairSvg}

        <!-- 12. ACCESSORIES & TIARA -->
        ${accessorySvg}
      </svg>
    `;

    container.innerHTML = svgCode;
  }

  // Princess Look Reveal & Snapshot
  revealPrincessLook() {
    if (window.soundEngine) {
      window.soundEngine.playShutter();
      setTimeout(() => window.soundEngine.playFanfare(), 300);
    }

    // Trigger flash animation
    const flashEl = document.getElementById('cameraFlash');
    if (flashEl) {
      flashEl.classList.add('flash-active');
      setTimeout(() => flashEl.classList.remove('flash-active'), 500);
    }

    // Generate Royal Titles
    const titles = [
      'Her Royal Highness: Princess Anamika of Cotton Candy & Starlight ✨',
      'The Radiant Enchantress: Lady Anamika of Dreamland Gardens 🌸',
      'Grand Starlight Sovereign: Princess Anamika, Queen of Sparkles 👑',
      'The Sweetest Angel: Princess Anamika of Strawberry Castle 🍓'
    ];
    const chosenTitle = titles[Math.floor(Math.random() * titles.length)];
    this.state.princessTitle = chosenTitle;

    // Show Reveal Modal
    const modal = document.getElementById('princessRevealModal');
    if (modal) {
      const portraitContainer = document.getElementById('revealPortraitContainer');
      const titleEl = document.getElementById('revealPrincessTitle');
      const descEl = document.getElementById('revealPrincessDesc');

      if (titleEl) titleEl.textContent = chosenTitle;
      if (descEl) descEl.textContent = 'You look breathtaking, gorgeous, and truly magical! Your royal glow sparkles brighter than all the stars in Dreamland. 💖✨';

      // Clone SVG into portrait frame
      if (portraitContainer) {
        const currentSvg = document.getElementById('princessAvatarSvg');
        if (currentSvg) {
          portraitContainer.innerHTML = currentSvg.outerHTML;
        }
      }

      modal.classList.add('active');
    }

    // Confetti shower
    if (typeof window.createHearts === 'function') {
      window.createHearts(35);
    }
  }

  closeRevealModal() {
    const modal = document.getElementById('princessRevealModal');
    if (modal) modal.classList.remove('active');
  }

  // Save / Download Portrait as PNG
  savePortraitPng() {
    const svgEl = document.querySelector('#revealPortraitContainer svg') || document.getElementById('princessAvatarSvg');
    if (!svgEl) return;

    if (window.soundEngine) window.soundEngine.playSparkle();

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 960;
    const ctx = canvas.getContext('2d');

    // Draw cute background frame
    const grad = ctx.createLinearGradient(0, 0, 800, 960);
    grad.addColorStop(0, '#fff0f7');
    grad.addColorStop(0.5, '#f4eaff');
    grad.addColorStop(1, '#ffe3f1');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 960);

    // Gilded border
    ctx.strokeStyle = '#ff8fc7';
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, 760, 920);

    ctx.strokeStyle = '#b28af0';
    ctx.lineWidth = 4;
    ctx.strokeRect(34, 34, 732, 892);

    // Title on top
    ctx.fillStyle = '#e77db5';
    ctx.font = 'bold 34px "Baloo 2", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Princess Anamika\'s Royal Portrait ✨', 400, 75);

    // Convert SVG to Image and draw
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      // Draw avatar centered
      ctx.drawImage(img, 100, 110, 600, 720);

      // Bottom banner text
      ctx.fillStyle = '#9274aa';
      ctx.font = '22px "Baloo 2", sans-serif';
      ctx.fillText(this.state.princessTitle, 400, 860);

      ctx.fillStyle = '#ad7bd1';
      ctx.font = 'italic 18px "Pacifico", cursive';
      ctx.fillText('Created with love in Anamika\'s Dream World ♡', 400, 895);

      // Trigger download
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'Princess-Anamika-Royal-Look.png';
      downloadLink.href = pngUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      URL.revokeObjectURL(blobURL);
    };
    img.src = blobURL;
  }
}

window.beautyStudio = new BeautyStudio();

