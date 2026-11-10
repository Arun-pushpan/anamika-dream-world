// Boo's Magical Storytime - Interactive Fairy Tale Engine
// With branching story paths, browser-supported Read-Aloud (TTS), and collectible endings!

const STORY_DATA = {
  start: {
    badge: 'Chapter 1: The Golden Dawn',
    title: 'The Secret Scroll of Starlight Castle',
    icon: '✨🏰',
    text: `The morning sun cast a warm pink glow over Dreamland. Princess Anamika sat near her balcony window, sipping sweet strawberry tea. Suddenly, a soft tap echoed on the glass!\n\nThere was Boo the little ghost, wearing her favorite magenta ribbon, floating happily with a shimmering golden scroll! Beside the castle gate, Sparkle the pink unicorn whinnied cheerfully, while Luna the flower fairy fluttered down with her sparkling star wand.\n\n"Princess Anamika!" Boo whispered excitedly. "The magical scroll has awakened! It leads to the lost Crystal Star of Happiness. Where should our journey begin?"`,
    choices: [
      { text: 'Follow the Rainbow Bridge towards the Whispering Crystal Forest 🌈', nextId: 'forest_path', icon: '🌲' },
      { text: 'Fly with Sparkle the Unicorn up to the Cotton Candy Cloud Castle 🦄', nextId: 'cloud_path', icon: '☁️' },
      { text: 'Sail with Boo across the Pink Strawberry Milk Lake 🍓', nextId: 'lake_path', icon: '⛵' }
    ]
  },

  // BRANCH 1: FOREST
  forest_path: {
    badge: 'Chapter 2: The Crystal Forest',
    title: 'The Golden Puppy & The Singing Tree',
    icon: '🌸🌳',
    text: `Anamika stepped onto the glowing Rainbow Bridge, each step chiming like a gentle xylophone. Soon, they entered the Whispering Crystal Forest, where sugar-crystal blossoms glowed in lavender and mint.\n\nOut from a hollow oak bounded Pip, an adorable golden puppy with a sparkling bell collar! Pip held an ornate silver key in his mouth and wagged his tail enthusiastically.\n\n"Woof woof!" barked Pip. Ahead, the path split in two: one trail went deeper towards the ancient Melodic Tree of Echoes, and another curved towards a hidden secret cavern decorated with glowing fairy lamps!`,
    choices: [
      { text: 'Give Pip a honey biscuit and sing a duet with the Melodic Tree 🎵', nextId: 'forest_singing', icon: '🎶' },
      { text: 'Follow Pip into the glowing Fairy Lantern Cavern 🕯️', nextId: 'forest_cavern', icon: '🗝️' }
    ]
  },

  forest_singing: {
    badge: 'Chapter 3: Harmony Grove',
    title: 'The Symphony of the Blossom Fairies',
    icon: '🧚‍♀️🎶',
    text: `Anamika offered Pip a sweet honey biscuit, and the happy puppy led her straight to the center of Harmony Grove. When Anamika hummed a gentle melody, thousands of tiny blossom fairies flew out from the leaves!\n\nTheir voices blended with Anamika\'s song into the sweetest lullaby ever heard in Dreamland. The ancient tree blossomed with sparkling golden star-fruit, each granting a blessing of pure joy!`,
    isEnding: true,
    endingId: 'blossom_harmony',
    endingTitle: 'Ending 1: The Symphony of Blossom Fairies 🌸🎶',
    endingDesc: 'Anamika became the beloved Songstress of the Enchanted Grove. Whenever the wind blows softly, the blossom fairies sing songs of her kindness!'
  },

  forest_cavern: {
    badge: 'Chapter 3: The Crystal Cavern',
    title: 'The Starlight Gem Sanctuary',
    icon: '💎✨',
    text: `Pip led Anamika and Boo through the arched cavern entrance. Inside, crystal stalactites sparkled like pink diamonds. Using Pip\'s silver key, Anamika unlocked a velvet pedestal holding the Crystal Heart Gem!\n\nAs she held it up, a glorious beam of warmth washed over the forest. The gentle woodland creatures gathered around, and Boo placed a shimmering tiara on Anamika\'s head.`,
    isEnding: true,
    endingId: 'crystal_gem',
    endingTitle: 'Ending 2: Guardian of the Crystal Heart 💎👑',
    endingDesc: 'Anamika awakened the legendary Crystal Heart of Dreamland, bringing perpetual spring and laughter to every creature in the realm!'
  },

  // BRANCH 2: CLOUD CASTLE
  cloud_path: {
    badge: 'Chapter 2: The Sky Realm',
    title: 'Soaring on Cotton Candy Clouds',
    icon: '🦄☁️',
    text: `Sparkle the pink unicorn bent her knees, allowing Princess Anamika and Boo to climb aboard her silk saddle. With a joyful neigh, Sparkle leapt into the skies, soaring through warm vanilla-scented clouds!\n\nHigh above stood the Cotton Candy Cloud Castle, floating on iridescent pastel rainbows. Luna the Fairy landed on Sparkle\'s horn and giggled. "Princess Anamika! The Great Cloud Queen is hosting a Starlight Gathering. Would you like to bake celestial star-cupcakes or join the Rainbow Starlight Dance?"`,
    choices: [
      { text: 'Bake celestial star-cupcakes in the Royal Cloud Kitchen 🧁', nextId: 'cloud_baking', icon: '✨' },
      { text: 'Lead the Grand Rainbow Starlight Dance on Saturn\'s rings 💫', nextId: 'cloud_dance', icon: '💃' }
    ]
  },

  cloud_baking: {
    badge: 'Chapter 3: The Sweetest Kitchen',
    title: 'The Golden Star-Cupcake Feast',
    icon: '🧁🎂',
    text: `Anamika, Boo, and Luna donned fluffy pink chef hats! Together, they whipped sugar clouds, strawberry cream, and sprinkled genuine stardust over golden cupcakes. When the timer chimed, the cupcakes were glowing with magic!\n\nEvery cloud guardian cheered as Anamika handed out the magical pastries. Eating one made you float gently in mid-air with happy giggles!`,
    isEnding: true,
    endingId: 'star_cupcake',
    endingTitle: 'Ending 3: The Starlight Cloud Banquet 🧁⭐',
    endingDesc: 'Anamika\'s enchanted cupcakes became the most famous royal recipe in all of Dreamland! Even the Moon smiled with delight.'
  },

  cloud_dance: {
    badge: 'Chapter 3: The Northern Lights',
    title: 'Celestial Princess of the Constellations',
    icon: '🌌🌟',
    text: `Holding Boo\'s little hand, Princess Anamika stepped onto the glowing rainbow ribbons surrounding the castle. The stars in the sky pulsed to the rhythm of her graceful twirls!\n\nA cascade of pastel northern lights formed a crown of light above her head. The night sky painted her name in shooting stars, celebrating her radiance across the universe!`,
    isEnding: true,
    endingId: 'celestial_princess',
    endingTitle: 'Ending 4: Celestial Princess of the Stars 🌌✨',
    endingDesc: 'Anamika\'s starlight dance lit up the entire galaxy with hope, pink sparkles, and endless magical dreams!'
  },

  // BRANCH 3: STRAWBERRY LAKE
  lake_path: {
    badge: 'Chapter 2: The Pink Waters',
    title: 'The Strawberry Lake Voyage',
    icon: '🍓⛵',
    text: `Anamika and Boo stepped onto a seashell-shaped swan boat that floated atop the warm, pink waters of Strawberry Milk Lake. Cute baby ducklings with flower crowns swam alongside them!\n\nAs the boat reached the middle of the lake, a friendly pastel pink dolphin named Ripple leaped out of the water, performing triple flips! Ripple brought forth two choices: a luminous Glowing Pearl Shell from the deep lake bed, or a secret treasure map leading to the Enchanted Lotus Island!`,
    choices: [
      { text: 'Open the Glowing Pearl Shell to reveal its secret wish 🐚', nextId: 'lake_pearl', icon: '💖' },
      { text: 'Navigate towards the Lantern Festival on Lotus Island 🏮', nextId: 'lake_festival', icon: '🌺' }
    ]
  },

  lake_pearl: {
    badge: 'Chapter 3: The Wish of True Magic',
    title: 'The Eternal Sparkle of True Friendship',
    icon: '🐚💖',
    text: `Anamika gently placed her hands on the iridescent pearl shell. It opened with a dazzling flash of rose-gold light! Inside was the legendary Star of Endless Wishes.\n\nAnamika closed her eyes and made her wish: "May everyone I love always be surrounded by warmth, laughter, and magical adventures." The pearl absorbed her pure wish and burst into millions of tiny glowing butterflies that flew into the sky!`,
    isEnding: true,
    endingId: 'eternal_wish',
    endingTitle: 'Ending 5: The Eternal Sparkle of Pure Wishes 💖✨',
    endingDesc: 'Anamika\'s heartfelt wish granted everlasting joy to everyone in Dreamland. Her heart proved to be the greatest treasure of all!'
  },

  lake_festival: {
    badge: 'Chapter 3: Lotus Island',
    title: 'The Magical Lantern Night Carnival',
    icon: '🏮🎆',
    text: `The swan boat docked at Lotus Island, which was alive with glowing paper lanterns and cute animal stalls! Anamika, Boo, and Sparkle were greeted with flower leis and pink cotton candy.\n\nTogether, they released glowing lanterns into the night sky, watching them rise like floating fireflies. Boo gave Anamika a warm hug: "This is the happiest night of our lives, Anamika!"`,
    isEnding: true,
    endingId: 'lantern_carnival',
    endingTitle: 'Ending 6: The Lotus Lantern Carnival 🏮🎆',
    endingDesc: 'The festival lasted until dawn, full of sweet laughs, friendship, and memories that will sparkle in Anamika\'s heart forever!'
  }
};

const ALL_ENDINGS = [
  { id: 'blossom_harmony', title: 'The Symphony of Blossom Fairies', icon: '🌸' },
  { id: 'crystal_gem', title: 'Guardian of the Crystal Heart', icon: '💎' },
  { id: 'star_cupcake', title: 'The Starlight Cloud Banquet', icon: '🧁' },
  { id: 'celestial_princess', title: 'Celestial Princess of the Stars', icon: '🌌' },
  { id: 'eternal_wish', title: 'The Eternal Sparkle of Pure Wishes', icon: '💖' },
  { id: 'lantern_carnival', title: 'The Lotus Lantern Carnival', icon: '🏮' }
];

class StoryEngine {
  constructor() {
    this.currentNodeId = 'start';
    this.speechUtterance = null;
    this.isSpeaking = false;
    this.discoveredEndings = this.loadEndings();
  }

  loadEndings() {
    try {
      const data = localStorage.getItem('anamika_story_endings');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveEndings() {
    try {
      localStorage.setItem('anamika_story_endings', JSON.stringify(this.discoveredEndings));
    } catch (e) {}
  }

  recordEnding(endingId) {
    if (!this.discoveredEndings.includes(endingId)) {
      this.discoveredEndings.push(endingId);
      this.saveEndings();
    }
  }

  init() {
    this.renderCurrentNode();
    this.updateEndingsTrophyCount();

    // Setup speech synthesis cancel on page unload
    window.addEventListener('beforeunload', () => {
      this.stopSpeaking();
    });
  }

  goToNode(nodeId) {
    this.stopSpeaking();
    if (window.soundEngine) {
      window.soundEngine.playChime();
    }
    this.currentNodeId = nodeId;
    this.renderCurrentNode();
  }

  restart() {
    this.stopSpeaking();
    if (window.soundEngine) {
      window.soundEngine.playSparkle();
    }
    this.currentNodeId = 'start';
    this.renderCurrentNode();
  }

  renderCurrentNode() {
    const node = STORY_DATA[this.currentNodeId];
    if (!node) return;

    const badgeEl = document.getElementById('storyBadge');
    const titleEl = document.getElementById('storyTitle');
    const textEl = document.getElementById('storyText');
    const choicesEl = document.getElementById('storyChoices');
    const iconEl = document.getElementById('storySceneIcon');

    if (badgeEl) badgeEl.textContent = node.badge || 'Fairy Tale';
    if (titleEl) titleEl.textContent = node.title;
    if (iconEl) iconEl.textContent = node.icon || '📖';

    // Format text paragraphs
    if (textEl) {
      textEl.innerHTML = node.text
        .split('\n\n')
        .map(p => `<p class="story-paragraph">${p}</p>`)
        .join('');
    }

    // Render Choices or Ending Card
    if (choicesEl) {
      choicesEl.innerHTML = '';

      if (node.isEnding) {
        this.recordEnding(node.endingId);
        this.updateEndingsTrophyCount();
        if (window.soundEngine) {
          window.soundEngine.playFanfare();
        }

        const endingCard = document.createElement('div');
        endingCard.className = 'story-ending-banner';
        endingCard.innerHTML = `
          <div class="ending-ribbon">🏆 Ending Discovered! 🌟</div>
          <h3 class="ending-title">${node.endingTitle}</h3>
          <p class="ending-desc">${node.endingDesc}</p>
          <div class="ending-actions">
            <button class="game-btn primary-btn" onclick="window.storyEngine.restart()">
              🔄 Read Another Path
            </button>
            <button class="game-btn secondary-btn" onclick="window.storyEngine.toggleTrophyModal(true)">
              🏆 View My Endings (${this.discoveredEndings.length}/${ALL_ENDINGS.length})
            </button>
          </div>
        `;
        choicesEl.appendChild(endingCard);

        // Spawn confetti celebration
        if (typeof window.createHearts === 'function') {
          window.createHearts(30);
        }
      } else {
        node.choices.forEach(c => {
          const btn = document.createElement('button');
          btn.className = 'choice-btn';
          btn.innerHTML = `<span class="choice-icon">${c.icon}</span> <span class="choice-text">${c.text}</span>`;
          btn.onclick = () => this.goToNode(c.nextId);
          choicesEl.appendChild(btn);
        });
      }
    }

    // Reset TTS button state
    this.updateTtsButton(false);
  }

  updateEndingsTrophyCount() {
    const el = document.getElementById('storyTrophyBadge');
    if (el) {
      el.textContent = `🏆 ${this.discoveredEndings.length} / ${ALL_ENDINGS.length} Endings Discovered`;
    }
  }

  toggleTrophyModal(show) {
    const modal = document.getElementById('storyTrophyModal');
    if (!modal) return;
    if (show) {
      if (window.soundEngine) window.soundEngine.playSparkle();
      const listEl = document.getElementById('trophyList');
      if (listEl) {
        listEl.innerHTML = ALL_ENDINGS.map(end => {
          const unlocked = this.discoveredEndings.includes(end.id);
          return `
            <div class="trophy-item ${unlocked ? 'unlocked' : 'locked'}">
              <div class="trophy-icon">${unlocked ? end.icon : '🔒'}</div>
              <div class="trophy-details">
                <h4>${unlocked ? end.title : 'Mystery Ending'}</h4>
                <p>${unlocked ? '✨ Discovered by Princess Anamika!' : 'Keep exploring story paths to unlock!'}</p>
              </div>
            </div>
          `;
        }).join('');
      }
      modal.classList.add('active');
    } else {
      modal.classList.remove('active');
    }
  }

  // Cute Storytelling Read-Aloud Voice (Web Speech API)
  toggleReadAloud() {
    if (this.isSpeaking) {
      this.stopSpeaking();
    } else {
      this.startSpeaking();
    }
  }

  startSpeaking() {
    if (!('speechSynthesis' in window)) {
      alert('Sorry, text-to-speech is not supported by your browser.');
      return;
    }

    this.stopSpeaking();

    const node = STORY_DATA[this.currentNodeId];
    if (!node) return;

    // Combine title and paragraphs
    const fullText = `${node.title}. ${node.text}`;
    const utterance = new SpeechSynthesisUtterance(fullText);

    // Pick cute voice if available
    const voices = window.speechSynthesis.getVoices();
    let preferredVoice = voices.find(v =>
      v.lang.startsWith('en') &&
      (v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Zira') || v.name.includes('Natural') || v.name.includes('Female'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // High, sweet, storybook pitch and gentle pace
    utterance.pitch = 1.25;
    utterance.rate = 0.92;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.updateTtsButton(true);
      const storyContainer = document.getElementById('storyTextContainer');
      if (storyContainer) storyContainer.classList.add('reading-active');
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.updateTtsButton(false);
      const storyContainer = document.getElementById('storyTextContainer');
      if (storyContainer) storyContainer.classList.remove('reading-active');
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.updateTtsButton(false);
      const storyContainer = document.getElementById('storyTextContainer');
      if (storyContainer) storyContainer.classList.remove('reading-active');
    };

    this.speechUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.updateTtsButton(false);
    const storyContainer = document.getElementById('storyTextContainer');
    if (storyContainer) storyContainer.classList.remove('reading-active');
  }

  updateTtsButton(speaking) {
    const btn = document.getElementById('storyTtsBtn');
    if (btn) {
      if (speaking) {
        btn.innerHTML = '⏹️ Pause Reading';
        btn.classList.add('active-speaking');
      } else {
        btn.innerHTML = '🔊 Read Aloud (Cute Voice)';
        btn.classList.remove('active-speaking');
      }
    }
  }
}

window.storyEngine = new StoryEngine();

