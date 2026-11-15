// ==========================================================================
// DS LAB — SIGMA CAT EDITION 🐈
// Neumorphic Interactive Logic & Calm Cat Engine
// ==========================================================================

let currentExperiment = null;
let activeCategory = 'all';
let searchQuery = '';

// Hinglish Sigma Meme Dialogues
const HINGLISH_MEME_QUOTES = [
  "Le garreb, tu bhi kya aish karega! 😼",
  "404: Teri akal not found.",
  "Padh le bhai, practical hai.",
  "Human detected. Intelligence not detected.",
  "Main toh chill kar raha hoon.",
  "Code kar, chapri!",
  "Itna bhi kya sochna hai?",
  "Bhai, copy kar aur nikal.",
  "Mujhe kya, main toh billi hoon.",
  "Tera code dekh ke compiler bhi ro diya.",
  "Pointer null hai, tera future bhi. 💀",
  "Viva mein bolna: 'Billi ne likha hai'.",
  "Segmentation Fault: Cat stepped on keyboard."
];

// Real Cat Photograph Stamps for each of the 10 experiments
const EXP_CAT_MAP = {
  1: { img: 'assets/cats/cat_boss_sunglasses_cutout.png', stamp: 'Sigma Approved' },
  2: { img: 'assets/cats/cat_monster_gamer_cutout.png', stamp: 'Postfix Gamer' },
  3: { img: 'assets/cats/cat_matrix_spiky_cutout.png', stamp: 'Infix Matrix Cat' },
  4: { img: 'assets/cats/cat_bread_face_cutout.png', stamp: 'Circular Chonk' },
  5: { img: 'assets/cats/cat_businessman_coffee_cutout.png', stamp: 'Deque Boss' },
  6: { img: 'assets/cats/cat_tactical_gamer_cutout.png', stamp: 'O(1) Tactical Push' },
  7: { img: 'assets/cats/cat_standing_kitten_cutout.png', stamp: 'Pana Miguel Approved' },
  8: { img: 'assets/cats/cat_teeth_smile_cutout.png', stamp: 'Queue In Stacks Grin' },
  9: { img: 'assets/cats/cat_nerd_glasses_im1_cutout.png', stamp: 'Single Link Chad' },
  10: { img: 'assets/cats/cat_sigma_sunglasses_cutout.png', stamp: 'Doubly Linked Sigma' }
};

// DOM Elements
const homeView = document.getElementById('home-view');
const codeView = document.getElementById('code-view');
const experimentsContainer = document.getElementById('experiments-container');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.neu-filter-btn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Code View Elements
const backBtn = document.getElementById('back-btn');
const expNumEl = document.getElementById('code-exp-num');
const expCatEl = document.getElementById('code-exp-cat');
const expTitleEl = document.getElementById('code-exp-title');
const expAimEl = document.getElementById('code-exp-aim');
const expObjEl = document.getElementById('code-exp-obj');
const codeContainer = document.getElementById('code-content');
const lineNumbersContainer = document.getElementById('line-numbers');
const fileNameEl = document.getElementById('file-name');
const locCountEl = document.getElementById('loc-count');
const bigCopyBtn = document.getElementById('big-copy-btn');
const downloadBtn = document.getElementById('download-btn');
const prevExpBtn = document.getElementById('prev-exp-btn');
const nextExpBtn = document.getElementById('next-exp-btn');
const outputSection = document.getElementById('output-section');
const outputBody = document.getElementById('output-body');
const outputHeader = document.getElementById('output-header');

// Dynamic Cat Elements
const heroCatMascot = document.getElementById('hero-mascot-card');
const heroCatBubble = document.getElementById('hero-cat-bubble');
const companionCatBox = document.getElementById('companion-cat-box');
const companionCatQuote = document.getElementById('companion-cat-quote');

// ==========================================================================
// Sound completely muted as requested
// ==========================================================================
function playCatChirp() {
  // Muted
}

// ==========================================================================
// C Syntax Highlighter (Clean, safe, client-side)
// ==========================================================================
function highlightC(code) {
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const tokens = [];

  // Comments
  escaped = escaped.replace(/\/\*[\s\S]*?\*\//g, match => {
    tokens.push({ type: 'comment', value: match });
    return `___TOKEN_${tokens.length - 1}___`;
  });

  escaped = escaped.replace(/\/\/.*$/gm, match => {
    tokens.push({ type: 'comment', value: match });
    return `___TOKEN_${tokens.length - 1}___`;
  });

  // Strings
  escaped = escaped.replace(/"(\\.|[^"\\])*"/g, match => {
    tokens.push({ type: 'string', value: match });
    return `___TOKEN_${tokens.length - 1}___`;
  });

  escaped = escaped.replace(/'(\\.|[^'\\])'/g, match => {
    tokens.push({ type: 'string', value: match });
    return `___TOKEN_${tokens.length - 1}___`;
  });

  // Directives
  escaped = escaped.replace(/(^\s*#\s*(?:include|define|ifdef|ifndef|endif|else|elif|undef|pragma)[^\n]*)/gm, 
    '<span class="token-directive">$1</span>');

  // Keywords
  const keywords = ['return', 'if', 'else', 'while', 'for', 'do', 'switch', 'case', 'break', 'default', 'continue', 'goto', 'sizeof', 'typedef', 'struct'];
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  escaped = escaped.replace(keywordRegex, '<span class="token-keyword">$1</span>');

  // Data Types
  const types = ['int', 'char', 'float', 'double', 'void', 'long', 'short', 'unsigned', 'signed', 'NULL', 'queue_t', 'Node'];
  const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
  escaped = escaped.replace(typeRegex, '<span class="token-type">$1</span>');

  // Numbers
  escaped = escaped.replace(/\b(\d+|0x[0-9a-fA-F]+)\b/g, '<span class="token-number">$1</span>');

  // Restore protected tokens
  escaped = escaped.replace(/___TOKEN_(\d+)___/g, (_, index) => {
    const token = tokens[parseInt(index, 10)];
    return `<span class="token-${token.type}">${token.value}</span>`;
  });

  return escaped;
}

function generateLineNumbers(code) {
  const lineCount = code.split('\n').length;
  let numbers = '';
  for (let i = 1; i <= lineCount; i++) {
    numbers += `${i}\n`;
  }
  return { html: numbers, count: lineCount };
}

// ==========================================================================
// Render Home View Cards (Neumorphic Elevated Cards)
// ==========================================================================
function renderExperiments() {
  const query = searchQuery.toLowerCase().trim();

  const filtered = EXPERIMENTS.filter(exp => {
    const matchesCat = (activeCategory === 'all') || 
      (activeCategory === 'stack' && (exp.category.toLowerCase().includes('stack'))) ||
      (activeCategory === 'queue' && (exp.category.toLowerCase().includes('queue'))) ||
      (activeCategory === 'list' && (exp.category.toLowerCase().includes('list')));

    const matchesSearch = !query || 
      exp.title.toLowerCase().includes(query) ||
      exp.number.toLowerCase().includes(query) ||
      exp.shortNumber.toLowerCase().includes(query) ||
      exp.category.toLowerCase().includes(query);

    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    experimentsContainer.innerHTML = `
      <div style="text-align: center; padding: 3.5rem 1rem; background: var(--neu-bg); border-radius: var(--radius-xl); box-shadow: var(--neu-inset); border: 1px solid rgba(255, 255, 255, 0.4);">
        <img src="assets/cats/cat_shocked_gasp_cutout.png" alt="Shocked Cat" style="width: 105px; height: auto; margin-bottom: 1rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));">
        <div style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--accent-orange); margin-bottom: 0.5rem;">
          404: Teri akal not found. 🙀
        </div>
        <h3 style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 800; color: var(--text-primary);">No experiments found</h3>
        <p style="color: var(--text-secondary); margin-top: 0.25rem;">Try another search term or click 'All Experiments'.</p>
      </div>
    `;
    return;
  }

  experimentsContainer.innerHTML = filtered.map(exp => {
    let catClass = 'stack';
    if (exp.category.toLowerCase().includes('queue')) catClass = 'queue';
    if (exp.category.toLowerCase().includes('list')) catClass = 'list';

    const catInfo = EXP_CAT_MAP[exp.id] || { img: 'assets/cats/cat_boss_sunglasses_cutout.png', stamp: 'Sigma Approved' };

    return `
      <a href="#/experiment/${exp.slug}" class="neu-card" data-slug="${exp.slug}">
        <div class="card-exp-num">
          <span class="lbl">EXP</span>
          <span class="val">${exp.shortNumber}</span>
        </div>
        
        <div class="card-info">
          <div class="card-tag-row">
            <span class="tag-badge ${catClass}">${exp.category}</span>
            <span class="cat-stamp-text">★ ${catInfo.stamp}</span>
          </div>
          <h2 class="card-title-text">${exp.title}</h2>
        </div>

        <div class="card-cat-stamp" title="${catInfo.stamp}">
          <img src="${catInfo.img}" alt="Sigma Cat Badge">
        </div>

        <div class="card-arrow-box" aria-label="Open Code">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </a>
    `;
  }).join('');
}

// ==========================================================================
// Code Page View
// ==========================================================================
function openExperiment(exp) {
  currentExperiment = exp;

  // Set Details
  expNumEl.textContent = exp.number;
  expCatEl.textContent = exp.category;
  expTitleEl.textContent = exp.title;
  expAimEl.textContent = exp.aim || exp.title;
  expObjEl.textContent = exp.objective || '';

  fileNameEl.textContent = `${exp.slug}.c`;

  // Syntax Highlighting & Line Numbers
  const { html: lineHtml, count } = generateLineNumbers(exp.code);
  lineNumbersContainer.textContent = lineHtml;
  locCountEl.textContent = `${count} lines`;
  codeContainer.innerHTML = highlightC(exp.code);

  // Sample Output
  if (exp.sampleOutput) {
    outputSection.style.display = 'block';
    outputBody.textContent = exp.sampleOutput;
  } else {
    outputSection.style.display = 'none';
  }

  // Prev / Next Navigation buttons
  const currentIndex = EXPERIMENTS.findIndex(e => e.id === exp.id);
  if (currentIndex > 0) {
    prevExpBtn.disabled = false;
    prevExpBtn.onclick = () => window.location.hash = `#/experiment/${EXPERIMENTS[currentIndex - 1].slug}`;
  } else {
    prevExpBtn.disabled = true;
  }

  if (currentIndex < EXPERIMENTS.length - 1) {
    nextExpBtn.disabled = false;
    nextExpBtn.onclick = () => window.location.hash = `#/experiment/${EXPERIMENTS[currentIndex + 1].slug}`;
  } else {
    nextExpBtn.disabled = true;
  }

  // Set random witty quote for companion cat
  if (companionCatQuote) {
    companionCatQuote.textContent = getRandomQuote();
  }

  // Switch View
  homeView.classList.remove('active');
  codeView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function showHome() {
  currentExperiment = null;
  codeView.classList.remove('active');
  homeView.classList.add('active');
}

function getRandomQuote() {
  return HINGLISH_MEME_QUOTES[Math.floor(Math.random() * HINGLISH_MEME_QUOTES.length)];
}

// ==========================================================================
// Copy to Clipboard (Robust with Fallback)
// ==========================================================================
async function copyCurrentCode() {
  if (!currentExperiment) return;

  const codeToCopy = currentExperiment.code;
  let success = false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(codeToCopy);
      success = true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = codeToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      success = document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  } catch (err) {
    console.error('Copy failed:', err);
    success = false;
  }

  if (success) {
    playCatChirp(820, 0.16);
    showToast('Copied Successfully! 😼');

    if (companionCatQuote) {
      companionCatQuote.textContent = "Le garreb, tu bhi kya aish karega! 😼";
    }

    // Button feedback
    const originalText = bigCopyBtn.innerHTML;
    bigCopyBtn.classList.add('copied');
    bigCopyBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>COPIED TO CLIPBOARD! 😼</span>
    `;

    setTimeout(() => {
      bigCopyBtn.classList.remove('copied');
      bigCopyBtn.innerHTML = originalText;
    }, 2400);
  } else {
    showToast('Failed to copy. Please select manually.');
  }
}

// Toast Display
let toastTimeout;
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// Download .c file
function downloadCurrentCode() {
  if (!currentExperiment) return;
  const blob = new Blob([currentExperiment.code], { type: 'text/x-c;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${currentExperiment.slug}.c`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  playCatChirp(600, 0.14);
  showToast(`Downloaded ${currentExperiment.slug}.c 🐈`);
}

// ==========================================================================
// Routing (Hash-based)
// ==========================================================================
function handleRouting() {
  const hash = window.location.hash;

  if (hash.startsWith('#/experiment/')) {
    const slug = hash.replace('#/experiment/', '');
    const found = EXPERIMENTS.find(e => e.slug === slug || String(e.id) === slug);
    if (found) {
      openExperiment(found);
      return;
    }
  }

  showHome();
}

// ==========================================================================
// 3-Second "MASALA DOSA?" Splash Screen Handler
// ==========================================================================
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  const dismissSplash = () => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 400);
  };

  // Automatically fade out after 1.5 seconds (1500ms)
  setTimeout(dismissSplash, 1500);

  // Allow clicking anywhere on the splash to enter immediately if needed
  splash.addEventListener('click', dismissSplash);
}

// ==========================================================================
// Event Listeners & Cat Interactions
// ==========================================================================
window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  renderExperiments();
  handleRouting();

  if (heroCatBubble) {
    heroCatBubble.textContent = "Le garreb, tu bhi kya aish karega! 😼";
  }
});

// Search input
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderExperiments();
});

// Category filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    playCatChirp(520, 0.08);
    renderExperiments();
  });
});

// Big Copy Button
bigCopyBtn.addEventListener('click', copyCurrentCode);

// Download button
downloadBtn.addEventListener('click', downloadCurrentCode);

// Back to experiments
backBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.hash = '#/';
});

// Logo click
document.querySelector('.logo-group').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.hash = '#/';
});

// Output toggle collapse/expand
if (outputHeader) {
  outputHeader.addEventListener('click', () => {
    outputBody.style.display = outputBody.style.display === 'none' ? 'block' : 'none';
  });
}

// Interactive Cat Clicks
if (heroCatMascot) {
  heroCatMascot.addEventListener('click', () => {
    playCatChirp(780, 0.14);
    heroCatBubble.textContent = getRandomQuote();
  });
}

if (companionCatBox) {
  companionCatBox.addEventListener('click', () => {
    playCatChirp(880, 0.14);
    companionCatQuote.textContent = getRandomQuote();
  });
}

// Keyboard shortcuts
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && codeView.classList.contains('active')) {
    window.location.hash = '#/';
  }

  if ((e.key === 'c' || e.key === 'C') && codeView.classList.contains('active')) {
    if (document.activeElement !== searchInput) {
      copyCurrentCode();
    }
  }

  if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && homeView.classList.contains('active')) {
    if (document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  }
});
