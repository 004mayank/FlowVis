/**
 * FlowVis - Rewritten App (clean)
 * - simple SPA-style page router
 * - homepage + explore grid
 * - preview hub
 * - hero rotating product (1.5s)
 */

import { SYSTEMS, addSystem, CATEGORIES, slugify } from '../data/systems.js';
import { logoForSystemId } from '../data/logos.js';
import { flowForSystem, FLOWS } from '../data/flows.js';
import { SYSTEM_LAYOUTS } from '../data/system-layouts.js';
import { ARCH_LAYOUTS } from '../data/arch-layouts.js';

// ---------- Product seed (from user paste) ----------
const PRODUCT_LINES = `Stripe
PayPal
Revolut
Wise
Robinhood
Cash App
Venmo
Coinbase
Binance
Nubank
Monzo
Chime
Klarna
Razorpay
PhonePe
Amazon
Shopify
Etsy
eBay
Flipkart
Myntra
Meesho
Ajio
Zalando
ASOS
Wayfair
Daraz
Shopee
Lazada
Nykaa
Uber
Ola
Airbnb
Booking.com
MakeMyTrip
Lyft
Grab
BlaBlaCar
Skyscanner
Expedia
Netflix
Spotify
YouTube
Disney+
Prime Video
Apple Music
SoundCloud
Twitch
JioCinema
Hotstar
Instagram
WhatsApp
Telegram
Snapchat
Facebook
Messenger
Twitter (X)
Reddit
Discord
Threads
LinkedIn
Signal
Notion
Slack
Dropbox
Google Drive
Gmail
Microsoft Teams
Trello
Asana
ClickUp
Evernote
Airtable
Monday.com
Zoom
Calendly
Jira
Headspace
Calm
Nike Training Club
MyFitnessPal
Cult.fit
Fitbit
Strava
HealthifyMe
Swiggy
Zomato
Uber Eats
DoorDash
Deliveroo
Grubhub
Domino’s
McDonald’s App
Google Pay
Paytm
BHIM
HDFC Bank App
ICICI iMobile
Axis Mobile
Kotak 811
GitHub
GitLab
Stack Overflow
Postman
Vercel
Netlify
Firebase Console
AWS Console
Affirm
Afterpay
Brex
Ramp
Mercury
Square
Stripe Dashboard
Wise Business
Payoneer
Remitly
WorldRemit
Western Union App
MoneyGram
Zelle
Apple Pay
Samsung Pay
Google Wallet
MobiKwik
Freecharge
Groww
Zerodha Kite
Upstox
INDmoney
ET Money
CRED
Slice
Jupiter
Fi Money
Niyo
YNAB
Mint
PocketGuard
Acorns
Stash
SoFi
Ally Bank
Varo
Current
Aspiration
Starling Bank
Tinkoff
Paysera
Curve
Wise Card
Cashplus
Bunq
Paytm Money
KuCoin
Kraken
Bitstamp
Temu
Shein
AliExpress
Taobao
Tmall
JD.com
Rakuten
Mercado Libre
Noon
Jumia
Vinted
Depop
Poshmark
Carousell
OLX
Quikr
Facebook Marketplace
Wish
Banggood
Gearbest
Overstock
Houzz
1mg
PharmEasy
Netmeds
FirstCry
Lenskart
Pepperfry
Urban Ladder
Tata Cliq
Snapdeal
BigBasket
Blinkit
Zepto
Instacart
Shipt
Costco App
Walmart App
Target App
Best Buy App
Newegg
Wayfair App
Chewy
Zappos
StockX
GOAT
Farfetch
Ssense
Mr Porter
Net-a-Porter
Rebag
The RealReal
Grailed
Etsy Seller
Shopify Admin
Ecwid
Squarespace Commerce
Wix Stores
Magento
WooCommerce
BeReal
Mastodon
Clubhouse
Geneva
Geneva Groups
Nextdoor
Meetup
Amino
VSCO
Flickr
Imgur
Tumblr
Hive Social
Lemon8
Koo
ShareChat
Moj
Josh
Chingari
Roposo
Likee
WeChat
QQ
LINE
KakaoTalk
Viber
Hike
IMO
Marco Polo
Houseparty
Yubo
Wink
Slowly
Peanut
Fishbowl
Blind
Polywork
Lunchclub
Shapr
Circle
Vimeo
Dailymotion
Rumble
Nebula
CuriosityStream
Discovery+
HBO Go
Peacock
SonyLIV
Zee5
MX Player
Voot
Crunchyroll
Funimation
Tubi
Pluto TV
Plex
Kodi
Apple TV
YouTube Studio
Anchor
Pocket Casts
Overcast
Castbox
Audible
Storytel
Scribd
Kindle
Wattpad
Medium
Substack
Ghost
Beehiiv
Revue
Flipboard
Feedly
Inshorts
Dailyhunt
SmartNews
Pocket
Instapaper
Google News
Apple News
NewsBreak
Reddit Reader apps
Letterboxd
IMDb
TV Time
Trakt
JustWatch
Coda
Obsidian
Roam Research
Bear
Craft
Superhuman
Spark Mail
Newton Mail
Front
Missive
Proton Mail
Zoho Mail
Zoho CRM
HubSpot
Salesforce
Pipedrive
Freshsales
Intercom
Drift
Crisp
Help Scout
Zendesk
Gorgias
Linear
Height
Basecamp
Wrike
Teamwork
ProofHub
Smartsheet
Quip
Notability
GoodNotes
XMind
MindNode
Miro
FigJam
Whimsical
Lucidchart
Draw.io
Toggl
Clockify
Harvest
RescueTime
Freedom
Cold Turkey
Sunsama
Motion
Reclaim AI
Fantastical
Outlook
Zoho Books
QuickBooks
Xero
FreshBooks
Wave
Stripe Atlas
Paddle
Chargebee
Recurly
Mailchimp
ConvertKit
ActiveCampaign
Klaviyo
SendGrid
Brevo (Sendinblue)
Canva Docs
Gamma
Tome
Pitch
Beautiful.ai
Loom
Screen Studio
Descript
Riverside
VEED
Kapwing
Runway
Synthesia
Pictory
Freeletics
Fitbod
Centr
Sweat
8fit
Seven
JEFIT
Strong
Nike Run Club
Adidas Running
MapMyRun
Runkeeper
Peloton
Zwift
Trainerize
MySugr
Glucose Buddy
Flo
Clue
Ovia
BetterHelp
Talkspace
Wysa
Youper
MindDoc
Sanvello
Fabulous
Stoic
Reflectly
Daylio
Sleep Cycle
SleepScore
Calm Sleep
Insight Timer
Balance
Aura
Noom
Lifesum
Yazio
Fooducate
EatSure
Dunzo
Postmates
ChowNow
Ritual
Deliveroo Rider
Talabat
Careem Food
Glovo
Bolt Food
Foodpanda
SkipTheDishes
Menulog
Zomato Business
Swiggy Instamart
Uber Eats Driver
Domino’s Tracker
Starbucks App
KFC App
Burger King App
Taco Bell App
Pizza Hut App
Baskin Robbins App
Dunkin App
Blue Apron
HelloFresh
Freshly
Gousto
EveryPlate
Home Chef
Hopper
Rome2Rio
Omio
Agoda
Hostelworld
Trip.com
Cleartrip
Yatra
ixigo
RedBus
FlixBus
BlaBlaCar Daily
Turo
Getaround
Zipcar
Lime
Bird
Tier
Bolt
Careem
Free Now
GrabTaxi
GoJek
Moovit
Citymapper
Transit App
Google Trips (legacy)
Roadtrippers
ParkMobile
SpotHero
OpenAI Playground
Anthropic Claude
Perplexity AI
Poe
Character AI
Replit
CodeSandbox
StackBlitz
Glitch
Codespaces
Sourcegraph
Sentry
Datadog
New Relic
LogRocket
Supabase
PlanetScale
Railway
Render
Fly.io
V0.dev
Bolt.new
Cursor
Tabnine
Codeium
Hugging Face
Replicate
Stability AI
Midjourney
Leonardo AI
RunPod
Paperspace
Kaggle
Colab
Jupyter
Airbyte
n8n
Zapier
Make (Integromat)
Retool
Roblox Studio
Epic Games Store
Steam
Xbox App
PlayStation App
Discord Nitro
Battle.net
Riot Client
GOG
itch.io
Game Jolt
Miniclip
Poki
CrazyGames
Armor Games
Kongregate
Coolmath Games
Lichess
Chess.com
Duolingo
Memrise
Babbel
Busuu
Quizlet
Khan Academy
Coursera
Udemy
Skillshare
MasterClass
edX
Brainly
Photomath
Socratic
Remind
ClassDojo
Seesaw
Blackboard
Moodle
Canvas LMS
Google Classroom
Noteflight
Yousician
Simply Piano
Fender Play
Ultimate Guitar
GarageBand
FL Studio Mobile
BandLab
Soundtrap
Splice
Canva
Adobe Express
PicsArt
Snapseed
Lightroom Mobile
VSCO Editor
Facetune
Remini
Lensa
CapCut Editor
InShot
VN Editor
Kinemaster
FilmoraGo
Alight Motion
Mojo
Unfold
Linktree
Beacons
Stan Store
Gumroad
Lemon Squeezy
Ko-fi
Patreon
Buy Me a Coffee
Subbly
Teachable
Kajabi
Podia
Circle.so`;

PRODUCT_LINES.split(/\r?\n/).forEach(addSystem);

// ---------- Basic router ----------
const state = {
  page: 'home',
  q: '',
  activeHomeCat: 'all',
  activeExploreCat: 'all',
  homeRenderCount: 48,
  homeChunk: 48
};

window.showPage = function showPage(page) {
  state.page = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(`${page}-page`);
  if (el) el.classList.add('active');

  if (page === 'explore') renderExplore();
  if (page === 'home') renderHomeGrid();
  if (page === 'preview') renderPreview();
  if (page === 'ai') renderAI();

  window.scrollTo(0, 0);
};

// ---------- Playground overlay (System/UI toggle) ----------
const PLAYGROUND = {
  open: false,
  tab: 'system',
  sys: null,
  step: 0,
  timer: null,
  speed: 1,
};

// ---------- AI Generate state ----------
const AI_EXAMPLES = [
  'How does WhatsApp deliver a message',
  'How does Stripe process a payment',
  'How does Netflix stream a video',
  'How does Uber match a driver',
  'How does Google Search rank results',
  'How does Spotify recommend songs',
  'How does GitHub handle a pull request',
  'How does Amazon process an order',
  'How does Instagram serve your feed',
  'How does Slack deliver a message in real time',
  'How does Zoom start a video call',
  'How does Airbnb book a stay',
  'How does YouTube recommend a video',
  'How does Twitter show your timeline',
  'How does DoorDash route a delivery',
];

const AI_STATE = {
  history: [],
  exampleIdx: 0,
  exampleTimer: null,
};

function mountShell() {
  const body = document.body;

  // Main container after fixed nav
  const app = document.createElement('main');
  app.id = 'app';
  app.style.position = 'relative';
  app.style.zIndex = '1';
  app.style.paddingTop = '86px';
  body.appendChild(app);

  app.innerHTML = `
    <section id="home-page" class="page active"></section>
    <section id="explore-page" class="page"></section>
    <section id="ai-page" class="page"></section>
    <section id="preview-page" class="page"></section>
    <section id="product-page" class="page"></section>
  `;

  // Full-screen overlay playground (opens on product click)
  const overlay = document.createElement('div');
  overlay.id = 'playground';
  overlay.className = 'playground';
  overlay.innerHTML = `
    <div class="pg-top">
      <button class="pg-back" id="pg-close">← Back to Explore</button>
      <div class="pg-header-center">
        <div class="pg-title" id="pg-title"></div>
        <div class="pg-subtitle" id="pg-subtitle"></div>
      </div>
      <div class="pg-header-right">
        <div class="pg-tabs">
          <button class="pg-tab active" data-tab="system">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style="flex-shrink:0"><path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            System Flow
          </button>
          <button class="pg-tab" data-tab="arch">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style="flex-shrink:0"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.6"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.6"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.6"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.6"/></svg>
            Architecture Flow
          </button>
        </div>
        <button class="pg-export" id="pg-export" title="Export all flows to PDF">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Export PDF
        </button>
        <span class="pg-step-counter" id="pg-step-counter">Step 1 of 1</span>
      </div>
    </div>

    <div class="pg-body">
      <aside class="pg-left">
        <div class="pg-playback-section">
          <div class="pg-playback-label">PLAYBACK</div>
          <div class="pg-speed" id="pg-speed">
            <button class="sp" data-speed="0.5">0.5x</button>
            <button class="sp active" data-speed="1">1x</button>
            <button class="sp" data-speed="2">2x</button>
          </div>
          <div class="pg-controls">
            <button class="pg-btn pg-skip-btn" id="pg-prev" title="Previous step">⏮</button>
            <button class="pg-btn primary pg-play-btn" id="pg-play">▶ Play</button>
            <button class="pg-btn pg-skip-btn" id="pg-next" title="Next step">⏭</button>
          </div>
          <div class="pg-progress-wrap">
            <div class="pg-progress-fill" id="pg-progress-fill"></div>
          </div>
        </div>
        <div class="pg-steps-section">
          <div class="pg-steps" id="pg-steps"></div>
        </div>
        <div class="pg-step-detail" id="pg-step-detail">
          <div class="pg-step-detail-label">
            <span class="pg-detail-dot"></span>
            <span id="pg-step-detail-title">Step 1 Detail</span>
          </div>
          <div class="pg-step-detail-text" id="pg-step-detail-text"></div>
        </div>
      </aside>

      <main class="pg-main">
        <div class="pg-panel pg-system" id="pg-system">
          <div class="pg-canvas-wrap">
            <svg id="wa-diagram" viewBox="0 0 1000 640" xmlns="http://www.w3.org/2000/svg"></svg>
          </div>
          <div class="pg-zoom">
            <button class="z" id="z-in">+</button>
            <button class="z" id="z-out">−</button>
            <button class="z" id="z-reset" title="Reset zoom">⊡</button>
          </div>
          <div class="pg-canvas-hint">Click any node to inspect</div>
          <div class="pg-legend">
            <div class="pg-legend-row"><span class="pg-leg-solid"></span><span class="pg-leg-txt">data flow</span></div>
            <div class="pg-legend-row"><span class="pg-leg-dashed"></span><span class="pg-leg-txt">async / optional</span></div>
            <div class="pg-legend-row"><span class="pg-leg-dot-icon"></span><span class="pg-leg-txt">active node</span></div>
          </div>
        </div>
        <div class="pg-panel pg-system hidden" id="pg-arch">
          <div class="pg-canvas-wrap">
            <svg id="wa-arch" viewBox="0 0 1200 760" xmlns="http://www.w3.org/2000/svg"></svg>
          </div>
          <div class="pg-zoom">
            <button class="z" id="za-in">+</button>
            <button class="z" id="za-out">−</button>
            <button class="z" id="za-reset" title="Reset zoom">⊡</button>
          </div>
          <div class="pg-canvas-hint">Click any node to inspect</div>
          <div class="pg-legend">
            <div class="pg-legend-row"><span class="pg-leg-solid"></span><span class="pg-leg-txt">data flow</span></div>
            <div class="pg-legend-row"><span class="pg-leg-dashed"></span><span class="pg-leg-txt">async / optional</span></div>
            <div class="pg-legend-row"><span class="pg-leg-dot-icon"></span><span class="pg-leg-txt">active node</span></div>
          </div>
        </div>
      </main>
    </div>

    <div id="pg-deep-dives"></div>

    <button class="dd-fab" id="dd-fab" style="display:none;" title="Ask a deep-dive question">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v8H6l-3 3v-3H2V3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
      Deep dive
    </button>

    <div class="dd-panel" id="dd-panel" style="display:none;">
      <div class="dd-header">
        <div class="dd-header-title" id="dd-header-title">Deep dive</div>
        <button class="dd-close" id="dd-close" aria-label="Close">&times;</button>
      </div>
      <div class="dd-messages" id="dd-messages"></div>
      <div class="dd-chips" id="dd-chips"></div>
      <div class="dd-input">
        <textarea id="dd-textarea" rows="1" placeholder="Ask about a specific flow..."></textarea>
        <button class="dd-send" id="dd-send">Send</button>
      </div>
    </div>
  `;
  body.appendChild(overlay);
}

// ---------- UI helpers ----------
function el(tag, attrs = {}, html = '') {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  if (html) n.innerHTML = html;
  return n;
}

function uniqBy(arr, keyFn) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    const k = keyFn(x);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(x);
  }
  return out;
}

function pickRotatingTitles() {
  // prefer a spread of well-known products + whatever exists
  const titles = SYSTEMS.map(s => s.title);
  return uniqBy(titles, t => t.toLowerCase());
}

// ---------- Hero rotation ----------
let rotIdx = 0;
let rotTimer = null;

function startRotation() {
  const word = document.getElementById('cycle-word');
  if (!word) return;

  const titles = pickRotatingTitles();
  if (!titles.length) return;

  if (rotTimer) clearInterval(rotTimer);
  rotTimer = setInterval(() => {
    rotIdx = (rotIdx + 1) % titles.length;
    word.classList.add('fade-out');
    setTimeout(() => {
      word.textContent = titles[rotIdx];
      word.classList.remove('fade-out');
    }, 220);
  }, 1500);
}

// ---------- Home ----------
function renderHome() {
  const root = document.getElementById('home-page');
  root.innerHTML = `
    <div class="container">
      <div class="hero">
        <div class="hero-bg">
          <div class="particle p1"></div><div class="particle p2"></div><div class="particle p3"></div>
          <div class="particle p4"></div><div class="particle p5"></div>
        </div>

        <div class="hero-inner">
          <h1>
            <span class="h1-line1">See how <span id="cycle-word">${SYSTEMS[0]?.title || 'Stripe'}</span></span>
            <span class="h1-line2">actually works</span>
          </h1>
          <p class="hero-sub">FlowVis transforms complex system design into beautiful, interactive animations. Explore 100+ real products, step-by-step.</p>

          <div class="hero-search">
            <input id="hero-search" type="text" placeholder="Search any system" />
            <button id="hero-search-btn" class="btn-primary">Search</button>
          </div>
        </div>
      </div>

      <div class="section-title">
        <h2>Browse & Explore</h2>
        <p>Jump into systems by category. Each product includes an animated, step-by-step breakdown.</p>
      </div>

      <div id="home-filters" class="filters"></div>
      <div id="home-grid" class="grid"></div>
      <div id="home-sentinel" class="sentinel"></div>
    </div>
  `;

  // search
  const heroInput = document.getElementById('hero-search');
  const go = () => {
    const q = heroInput.value.trim();
    if (!q) return;
    const found = findSystem(q);
    if (found) openProduct(found);
    else {
      // fallback to explore filtered view
      state.q = q;
      showPage('explore');
      const expInput = document.getElementById('explore-search');
      if (expInput) expInput.value = q;
    }
  };
  document.getElementById('hero-search-btn').addEventListener('click', go);
  heroInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') go();
  });

  renderHomeFilters();
  renderHomeGrid();
  startRotation();

  initHomeInfiniteScroll();
}

function renderHomeFilters() {
  const host = document.getElementById('home-filters');
  const items = [{ id: 'all', label: 'All' }, ...CATEGORIES.map(c => ({ id: c.id, label: c.label }))];
  host.innerHTML = items.map(x => `<button class="fb ${x.id === state.activeHomeCat ? 'active' : ''}" data-cat="${x.id}">${x.label}</button>`).join('');
  host.querySelectorAll('.fb').forEach(b => b.addEventListener('click', () => {
    state.activeHomeCat = b.dataset.cat;
    state.homeRenderCount = state.homeChunk;
    renderHomeFilters();
    renderHomeGrid();
  }));
}

function renderHomeGrid() {
  const grid = document.getElementById('home-grid');
  if (!grid) return;

  const list = (state.activeHomeCat === 'all')
    ? SYSTEMS
    : SYSTEMS.filter(s => s.cat === state.activeHomeCat);

  // Infinite scroll: render only the first N; the rest loads as you scroll
  const slice = list.slice(0, state.homeRenderCount);

  grid.innerHTML = slice.map(s => {
    const logo = logoForSystemId(s.id);
    const iconHtml = logo
      ? `<div class="card-logo">${logo}</div>`
      : `<div class="card-icon">${abbr(s.title)}</div>`;

    return `
    <div class="card" data-id="${s.id}">
      <div class="card-top">
        ${iconHtml}
        <div class="card-meta">
          <div class="card-title">${s.title}</div>
          <div class="card-tags">
            <span class="tag">${s.tag || catLabel(s.cat)}</span>
          </div>
        </div>
      </div>
      <div class="card-desc">${s.desc}</div>
      <div class="card-foot"><span>View system</span><span class="arr">→</span></div>
    </div>
  `;
  }).join('');

  grid.querySelectorAll('.card').forEach(c => c.addEventListener('click', () => openProductById(c.dataset.id)));
}

function initHomeInfiniteScroll() {
  const sentinel = document.getElementById('home-sentinel');
  if (!sentinel) return;

  const obs = new IntersectionObserver((entries) => {
    const ent = entries[0];
    if (!ent.isIntersecting) return;

    // Increase render count and re-render
    const list = (state.activeHomeCat === 'all')
      ? SYSTEMS
      : SYSTEMS.filter(s => s.cat === state.activeHomeCat);

    if (state.homeRenderCount >= list.length) return;
    state.homeRenderCount = Math.min(state.homeRenderCount + state.homeChunk, list.length);
    renderHomeGrid();
  }, { root: null, rootMargin: '800px 0px', threshold: 0.01 });

  obs.observe(sentinel);
}

// ---------- Explore ----------
function renderExplore() {
  const root = document.getElementById('explore-page');
  root.innerHTML = `
    <div class="container">
      <div class="section-title" style="margin-top:10px">
        <h2>Explore</h2>
        <p>Search across the full catalog and filter by category.</p>
      </div>

      <div class="explore-bar">
        <input id="explore-search" type="text" placeholder="Search systems..." />
      </div>

      <div id="explore-filters" class="filters"></div>
      <div id="explore-grid" class="grid"></div>
    </div>
  `;

  renderExploreFilters();
  renderExploreGrid('');

  const input = document.getElementById('explore-search');
  input.addEventListener('input', () => renderExploreGrid(input.value));
}

function renderExploreFilters() {
  const host = document.getElementById('explore-filters');
  const items = [{ id: 'all', label: 'All' }, ...CATEGORIES.map(c => ({ id: c.id, label: c.label }))];
  host.innerHTML = items.map(x => `<button class="fb ${x.id === state.activeExploreCat ? 'active' : ''}" data-cat="${x.id}">${x.label}</button>`).join('');
  host.querySelectorAll('.fb').forEach(b => b.addEventListener('click', () => {
    state.activeExploreCat = b.dataset.cat;
    renderExploreFilters();
    const input = document.getElementById('explore-search');
    renderExploreGrid(input?.value || '');
  }));
}

function renderExploreGrid(q) {
  const grid = document.getElementById('explore-grid');
  if (!grid) return;

  const qq = (q || '').trim().toLowerCase();
  let list = SYSTEMS;
  if (state.activeExploreCat !== 'all') list = list.filter(s => s.cat === state.activeExploreCat);
  if (qq) list = list.filter(s => s.title.toLowerCase().includes(qq));

  grid.innerHTML = list.slice(0, 120).map(s => {
    const logo = logoForSystemId(s.id);
    const iconHtml = logo
      ? `<div class="card-logo">${logo}</div>`
      : `<div class="card-icon">${abbr(s.title)}</div>`;

    return `
    <div class="card" data-id="${s.id}">
      <div class="card-top">
        ${iconHtml}
        <div class="card-meta">
          <div class="card-title">${s.title}</div>
          <div class="card-tags">
            <span class="tag">${s.tag || catLabel(s.cat)}</span>
          </div>
        </div>
      </div>
      <div class="card-desc">${s.desc}</div>
      <div class="card-foot"><span>View system</span><span class="arr">→</span></div>
    </div>
  `;
  }).join('');

  grid.querySelectorAll('.card').forEach(c => c.addEventListener('click', () => openProductById(c.dataset.id)));
}

// ---------- Product (stub for now) ----------
function openProduct(sys) {
  // Open full-screen playground overlay
  openPlayground(sys);
}

function openPlayground(sys) {
  PLAYGROUND.open = true;
  PLAYGROUND.sys = sys;
  PLAYGROUND.step = 0;
  PLAYGROUND.tab = 'system';
  PLAYGROUND.deepDives = [];
  stopPlayground();

  const overlay = document.getElementById('playground');
  overlay.classList.add('open');

  // Lock background page scrolling while overlay is open
  document.body.dataset.prevOverflow = document.body.style.overflow || '';
  document.body.style.overflow = 'hidden';

  // Title: logo + product name + category tag + difficulty tag
  const titleEl = document.getElementById('pg-title');
  const logo = logoForSystemId(sys.id);
  const steps = getProductSteps(sys);
  const difficulty = steps.length <= 4 ? 'Beginner' : steps.length <= 6 ? 'Intermediate' : 'Advanced';
  titleEl.innerHTML = `${logo ? `<span class="pg-logo">${logo}</span>` : ''}<span class="pg-title-name">${sys.title}</span>${sys.tag ? `<span class="pg-tag">${sys.tag}</span>` : ''}<span class="pg-tag pg-tag-level">${difficulty}</span>`;
  // Subtitle
  const subtitleEl = document.getElementById('pg-subtitle');
  if (subtitleEl) subtitleEl.textContent = `How ${sys.title} works · ${steps.length} steps · System Flow`;

  // Tabs
  overlay.querySelectorAll('.pg-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === 'system');
  });
  document.getElementById('pg-system').classList.remove('hidden');

  // Steps
  const host = document.getElementById('pg-steps');
  host.innerHTML = steps.map((s,i)=>{
    const sd = s.desc ? (s.desc.length > 80 ? s.desc.slice(0,80)+'\u2026' : s.desc) : '';
    return `<button class="pg-step ${i===0?'active':''}" data-step="${i}"><span class="n">${i+1}</span><span class="pg-step-body"><span class="t">${s.title}</span>${sd?`<span class="pg-step-desc">${sd}</span>`:''}</span><span class="pg-step-chevron">›</span></button>`;
  }).join('');
  host.querySelectorAll('[data-step]').forEach(btn => btn.addEventListener('click', () => {
    PLAYGROUND.step = Number(btn.dataset.step);
    renderPlayground();
  }));

  // Controls
  document.getElementById('pg-prev').onclick = () => { PLAYGROUND.step = Math.max(0, PLAYGROUND.step-1); renderPlayground(); };
  document.getElementById('pg-next').onclick = () => { PLAYGROUND.step = Math.min(steps.length-1, PLAYGROUND.step+1); renderPlayground(); };
  document.getElementById('pg-play').onclick = () => {
    if (PLAYGROUND.timer) stopPlayground();
    else startPlayground();
  };
  document.getElementById('pg-close').onclick = closePlayground;

  // Speed controls
  const spHost = document.getElementById('pg-speed');
  if (spHost) {
    spHost.querySelectorAll('[data-speed]').forEach(b => {
      b.onclick = () => {
        PLAYGROUND.speed = Number(b.dataset.speed);
        spHost.querySelectorAll('[data-speed]').forEach(x => x.classList.toggle('active', x.dataset.speed === b.dataset.speed));
        if (PLAYGROUND.timer) {
          // restart timer with new speed
          stopPlayground();
          startPlayground();
        }
      };
    });
  }

  // Tab switching
  overlay.querySelectorAll('.pg-tab').forEach(b => b.onclick = () => {
    PLAYGROUND.tab = b.dataset.tab;
    overlay.querySelectorAll('.pg-tab').forEach(x => x.classList.toggle('active', x.dataset.tab === PLAYGROUND.tab));
    document.getElementById('pg-system').classList.toggle('hidden', PLAYGROUND.tab !== 'system');
    document.getElementById('pg-arch').classList.toggle('hidden', PLAYGROUND.tab !== 'arch');
    renderPlayground();
  });

  // Zoom controls
  wireZoom('wa-diagram', 'z-in', 'z-out', 'z-reset');
  wireZoom('wa-arch', 'za-in', 'za-out', 'za-reset');

  // Trackpad / mouse wheel support:
  // - two-finger scroll pans the diagram
  // - pinch/ctrl+wheel zooms
  wireWheelPanZoom(overlay);

  // Deep dive widget + export
  setupDeepDiveWidget(sys);
  const exportBtn = document.getElementById('pg-export');
  if (exportBtn) exportBtn.onclick = () => exportPlaygroundPDF();

  // Clear deep-dive host
  const ddHost = document.getElementById('pg-deep-dives');
  if (ddHost) ddHost.innerHTML = '';

  // Initial render
  renderPlayground();

  // Autoplay by default
  startPlayground();
}

function wireWheelPanZoom(overlay) {
  if (!overlay) return;
  if (overlay.dataset.wheelBound === '1') return;
  overlay.dataset.wheelBound = '1';

  const isDiagramEl = (el) => {
    if (!el) return false;
    return Boolean(el.closest && el.closest('#pg-system, #pg-arch'));
  };

  overlay.addEventListener('wheel', (e) => {
    if (!PLAYGROUND.open) return;
    if (!isDiagramEl(e.target)) return;

    // Prevent background from scrolling
    e.preventDefault();

    const svgId = (PLAYGROUND.tab === 'arch') ? 'wa-arch' : 'wa-diagram';
    if (!ZOOM[svgId]) ZOOM[svgId] = { k: 1, x: 0, y: 0 };

    // Zoom gesture (trackpad pinch often shows as ctrlKey wheel)
    if (e.ctrlKey) {
      const dir = (e.deltaY < 0) ? 1 : -1;
      ZOOM[svgId].k = Math.min(2.4, Math.max(0.55, ZOOM[svgId].k + dir * 0.10));
      applyZoom(svgId);
      return;
    }

    // Pan (two-finger scroll)
    // Make panning speed scale-aware so it feels consistent at different zoom.
    const k = ZOOM[svgId].k || 1;
    const speed = 1.0 / k;
    ZOOM[svgId].x -= e.deltaX * speed;
    ZOOM[svgId].y -= e.deltaY * speed;
    applyZoom(svgId);
  }, { passive: false });
}

function applyZoom(svgId) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  if (!ZOOM[svgId]) ZOOM[svgId] = { k: 1, x: 0, y: 0 };

  const { k, x, y } = ZOOM[svgId];
  let g = svg.querySelector('g[data-zoom]');
  if (!g) {
    g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('data-zoom', '1');
    svg.appendChild(g);
  }
  const kids = Array.from(svg.childNodes).filter(n => n !== g);
  for (const kk of kids) g.appendChild(kk);
  g.setAttribute('transform', `translate(${x} ${y}) scale(${k})`);
}

const ZOOM = {};
function wireZoom(svgId, inId, outId, resetId) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  if (!ZOOM[svgId]) ZOOM[svgId] = { k: 1, x: 0, y: 0 };

  const zin = document.getElementById(inId);
  const zout = document.getElementById(outId);
  const zreset = document.getElementById(resetId);
  if (zin) zin.onclick = () => { ZOOM[svgId].k = Math.min(2.4, ZOOM[svgId].k + 0.15); applyZoom(svgId); };
  if (zout) zout.onclick = () => { ZOOM[svgId].k = Math.max(0.55, ZOOM[svgId].k - 0.15); applyZoom(svgId); };
  if (zreset) zreset.onclick = () => { ZOOM[svgId] = { k: 1, x: 0, y: 0 }; applyZoom(svgId); };

  // Apply now and after each render call
  applyZoom(svgId);
}

function closePlayground() {
  stopPlayground();
  PLAYGROUND.open = false;
  PLAYGROUND.sys = null;
  PLAYGROUND.deepDives = [];
  document.getElementById('playground').classList.remove('open');
  const fab = document.getElementById('dd-fab');
  const panel = document.getElementById('dd-panel');
  if (fab) fab.style.display = 'none';
  if (panel) panel.style.display = 'none';
  const ddHost = document.getElementById('pg-deep-dives');
  if (ddHost) ddHost.innerHTML = '';

  // Restore background scrolling
  const prev = document.body.dataset.prevOverflow;
  document.body.style.overflow = prev || '';
}

function startPlayground() {
  const steps = getProductSteps(PLAYGROUND.sys);
  document.getElementById('pg-play').textContent = '⏸ Pause';
  const ms = Math.round(1800 / (PLAYGROUND.speed || 1));
  PLAYGROUND.timer = setInterval(() => {
    PLAYGROUND.step = (PLAYGROUND.step + 1) % steps.length;
    renderPlayground();
  }, ms);
}

function stopPlayground() {
  if (PLAYGROUND.timer) clearInterval(PLAYGROUND.timer);
  PLAYGROUND.timer = null;
  const btn = document.getElementById('pg-play');
  if (btn) btn.textContent = '▶ Play';
}

function getProductSteps(sys) {
  const flow = flowForSystem(sys);
  if (flow?.steps?.length) return flow.steps;
  // Placeholder for other products
  return [
    { title: 'Start', active: [] },
    { title: 'Process', active: [] },
    { title: 'Complete', active: [] },
  ];
}

function renderPlayground() {
  const steps = getProductSteps(PLAYGROUND.sys);
  document.querySelectorAll('.pg-step').forEach((b) => {
    b.classList.toggle('active', Number(b.dataset.step) === PLAYGROUND.step);
  });

  const s = steps[PLAYGROUND.step];

  // Progress bar
  const progressFill = document.getElementById('pg-progress-fill');
  if (progressFill) progressFill.style.width = `${((PLAYGROUND.step + 1) / steps.length) * 100}%`;

  // Step counter in header
  const stepCounter = document.getElementById('pg-step-counter');
  if (stepCounter) stepCounter.textContent = `Step ${PLAYGROUND.step + 1} of ${steps.length}`;

  // Step detail panel
  const detailTitle = document.getElementById('pg-step-detail-title');
  const detailText = document.getElementById('pg-step-detail-text');
  if (detailTitle) detailTitle.textContent = `Step ${PLAYGROUND.step + 1} Detail`;
  if (detailText) detailText.textContent = s?.desc || '';

  // Render per-product diagrams (system + architecture)
  if (PLAYGROUND.tab === 'system') renderSystemDiagram(PLAYGROUND.sys, steps[PLAYGROUND.step]);
  if (PLAYGROUND.tab === 'arch') renderArchitectureDiagram(PLAYGROUND.sys, steps[PLAYGROUND.step]);

  // Re-apply zoom after rerender so user zoom doesn't reset
  if (PLAYGROUND.tab === 'system') wireZoom('wa-diagram', 'z-in', 'z-out', 'z-reset');
  if (PLAYGROUND.tab === 'arch') wireZoom('wa-arch', 'za-in', 'za-out', 'za-reset');
}

// --------- Product-specific diagram layouts ---------

// Shared system diagram node palette (simple, readable)
const SYSTEM_NODE_COLORS = {
  client: 'rgba(99,102,241,0.95)',
  user: 'rgba(99,102,241,0.95)',
  device: 'rgba(99,102,241,0.95)',

  api: 'rgba(236,72,153,0.95)',
  auth: 'rgba(236,72,153,0.95)',
  gateway: 'rgba(236,72,153,0.95)',

  store: 'rgba(34,197,94,0.95)',
  db: 'rgba(34,197,94,0.95)',
  cache: 'rgba(34,197,94,0.95)',

  queue: 'rgba(251,191,36,0.95)',
  stream: 'rgba(251,191,36,0.95)',

  external: 'rgba(148,163,184,0.95)',
  cdn: 'rgba(148,163,184,0.95)',
  network: 'rgba(148,163,184,0.95)'
};









function systemLayoutFor(sys) {
  const id = sys?.id;
  const nid = normId(id);
  return SYSTEM_LAYOUTS[id] || SYSTEM_LAYOUTS[nid] || null;
}

function normId(id) {
  if (!id) return id;
  return String(id)
    .trim()
    .toLowerCase()
    // normalize apostrophes/quotes
    .replace(/[’'"`]/g, '')
    // normalize dots and plus (keep existing canonical ids elsewhere)
    .replace(/\./g, '-')
    .replace(/\+/g, '-plus')
    // collapse whitespace/underscores to hyphens
    .replace(/[\s_]+/g, '-')
    // collapse multiple hyphens
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function archLayoutFor(sys) {
  const id = sys?.id;
  const nid = normId(id);
  return ARCH_LAYOUTS[id] || ARCH_LAYOUTS[nid] || null;
}

function renderSystemDiagram(sys, step) {
  const svg = document.getElementById('wa-diagram');
  if (!svg) return;

  const layout = systemLayoutFor(sys);
  if (!layout) {
    svg.innerHTML = `<text x="50" y="80" fill="rgba(255,255,255,0.6)" font-size="18" font-family="Inter, Arial">System flow coming soon for ${escapeXml(sys?.title || '')}</text>`;
    return;
  }

  // If nodes got bigger, ensure we keep enough canvas space so they don't overlap.
  // Prefer per-product viewBox when set; otherwise default to a roomier canvas.
  svg.setAttribute('viewBox', layout.viewBox || '0 0 1200 960');

  const active = new Set(step?.active || []);
  const stepEdges = step?.edges || [];
  const eActive = (a, b) => stepEdges.some(e => e[0] === a && e[1] === b);

  const uniqPairs = (pairs) => {
    const seen = new Set();
    const out = [];
    for (const [a,b] of pairs) {
      const k = `${a}->${b}`;
      if (seen.has(k)) continue;
      seen.add(k);
      out.push([a,b]);
    }
    return out;
  };

  const baselineEdges = (() => {
    if (layout.baselineEdges?.length) return uniqPairs(layout.baselineEdges);
    // Always collect ALL edges from every step so every node is connected in the skeleton
    const flow = flowForSystem(sys);
    const all = [];
    for (const s of (flow?.steps || [])) for (const e of (s.edges || [])) all.push([e[0], e[1]]);
    // Also include primaryPath spine
    if (layout.primaryPath?.length) {
      const p = layout.primaryPath;
      for (let i = 0; i < p.length - 1; i++) all.push([p[i], p[i+1]]);
      if (layout.primaryBranches?.length) for (const br of layout.primaryBranches) all.push([br.from, br.to]);
    }
    return uniqPairs(all);
  })();

  const NODE_R = 44;
  // Products with an explicit viewBox already have precise coordinates — don't rescale.
  const scaleLayout = (layout.viewBox ? 1 : 1.35);
  const scaleY = scaleLayout; // same factor; keep nodes inside the declared viewBox

  // Unified teal/cyan neon for active elements (Screenshot B style)
  const ACTIVE_COL = 'rgba(45,212,191,1)';

  const node = (id, cx, cy, label) => {
    const on = active.has(id);
    const r = NODE_R;
    if (on) {
      return `
        <filter id="glow-${id}" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="20" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <g filter="url(#glow-${id})">
          <circle cx="${cx}" cy="${cy}" r="${r + 50}" fill="none" stroke="${ACTIVE_COL}" stroke-width="1" opacity="0.08"/>
          <circle cx="${cx}" cy="${cy}" r="${r + 28}" fill="none" stroke="${ACTIVE_COL}" stroke-width="1.5" opacity="0.20"/>
          <circle cx="${cx}" cy="${cy}" r="${r + 12}" fill="none" stroke="${ACTIVE_COL}" stroke-width="2" opacity="0.45"/>
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(20,184,166,0.14)" stroke="${ACTIVE_COL}" stroke-width="2.5"/>
          <text x="${cx}" y="${cy + 5}" text-anchor="middle" fill="rgba(230,255,252,0.96)" font-size="13" font-family="Inter, Arial" font-weight="900">${escapeXml(label)}</text>
        </g>
      `;
    }
    return `
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.28)" stroke-width="1.5"/>
      <text x="${cx}" y="${cy + 5}" text-anchor="middle" fill="rgba(240,240,248,0.72)" font-size="13" font-family="Inter, Arial" font-weight="600">${escapeXml(label)}</text>
    `;
  };

  const arrow = (x1, y1, x2, y2, on) => {
    const mid = Math.abs(x1 * 13 + x2 * 7 + y1 * 11 + y2 * 5).toFixed(0);
    const markerId = `sys-arrow-${mid}`;
    const base = `<path d="M${x1} ${y1} L ${x2} ${y2}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 9"/>`;
    const activePath = on ? `
      <defs>
        <marker id="${markerId}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="${ACTIVE_COL}"/>
        </marker>
      </defs>
      <path d="M${x1} ${y1} L ${x2} ${y2}" fill="none" stroke="${ACTIVE_COL}" stroke-width="2.5" stroke-linecap="round" opacity="0.85" marker-end="url(#${markerId})"/>
    ` : '';
    return `${base}${activePath}`;
  };

  const dot = (x, y, on) => {
    if (!on) return `<circle cx="${x}" cy="${y}" r="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;
    return `
      <filter id="dg-${x.toFixed(0)}-${y.toFixed(0)}" x="-300%" y="-300%" width="700%" height="700%">
        <feGaussianBlur stdDeviation="6" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <circle cx="${x}" cy="${y}" r="4.5" fill="${ACTIVE_COL}" stroke="${ACTIVE_COL}" stroke-width="1" opacity="0.9" filter="url(#dg-${x.toFixed(0)}-${y.toFixed(0)})"/>
    `;
  };

  const edgeLabel = (x1, y1, x2, y2, text, on) => {
    if (!text) return '';
    const mx = (x1 + x2) / 2; const my = (y1 + y2) / 2;
    const dx = x2 - x1; const dy = y2 - y1;
    const len = Math.max(1, Math.hypot(dx, dy));
    const ox = (-dy / len) * 14; const oy = (dx / len) * 14;
    return `<text x="${mx + ox}" y="${my + oy}" text-anchor="middle" fill="${on ? ACTIVE_COL : 'rgba(255,255,255,0.25)'}" font-size="11" font-family="Inter, Arial" font-weight="700" opacity="${on ? 0.9 : 0.45}">${escapeXml(text)}</text>`;
  };

  const mkNode = (n0) => ({ ...n0, x: n0.x * scaleLayout, y: n0.y * scaleLayout * scaleY });

  // Trim a line so it starts/ends at the node circle boundary, not the center
  const trimEdge = (x1, y1, x2, y2, r) => {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len < r * 2 + 10) return null; // nodes too close / overlapping
    const nx = dx / len, ny = dy / len;
    return [x1 + nx * r, y1 + ny * r, x2 - nx * r, y2 - ny * r];
  };

  let edgesSvg = '';
  let dotsSvg = '';
  let labelsSvg = '';

  // 1) Baseline: faint dotted skeleton connecting every node that appears in any step
  for (const [a, b] of baselineEdges) {
    const na = layout.nodes[a] ? mkNode(layout.nodes[a]) : null;
    const nb = layout.nodes[b] ? mkNode(layout.nodes[b]) : null;
    if (!na || !nb) continue;
    const pts = trimEdge(na.x, na.y, nb.x, nb.y, NODE_R + 4);
    if (!pts) continue;
    const [sx, sy, ex, ey] = pts;
    edgesSvg += arrow(sx, sy, ex, ey, false);
    dotsSvg += dot(sx, sy, false);
    dotsSvg += dot(ex, ey, false);
  }

  // 2) Active overlay: solid teal edges trimmed to circle boundary
  for (const [a, b] of stepEdges) {
    const na0 = layout.nodes[a];
    const nb0 = layout.nodes[b];
    const na = na0 ? mkNode(na0) : null;
    const nb = nb0 ? mkNode(nb0) : null;
    if (!na || !nb) continue;
    const pts = trimEdge(na.x, na.y, nb.x, nb.y, NODE_R + 4);
    if (!pts) continue;
    const [sx, sy, ex, ey] = pts;
    const on = eActive(a, b);
    edgesSvg += arrow(sx, sy, ex, ey, on);
    dotsSvg += dot(sx, sy, on);
    dotsSvg += dot(ex, ey, on);
    // Edge label at midpoint of trimmed line
    const lbl = step?.edgeLabels?.[`${a}->${b}`];
    if (on && lbl) labelsSvg += edgeLabel(sx, sy, ex, ey, lbl, on);
  }

  let nodesSvg = '';
  for (const [id, n0] of Object.entries(layout.nodes)) {
    const n = { ...n0, x: n0.x * scaleLayout, y: n0.y * scaleLayout * scaleY };
    nodesSvg += node(id, n.x, n.y, n.label);
  }

  const vb = (svg.getAttribute('viewBox') || '0 0 1000 640').split(' ');
  const vw = vb[2] || 1000; const vh = vb[3] || 640;

  svg.innerHTML = `
    <defs>
      <pattern id="grid-pat" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(45,212,191,0.04)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="${vw}" height="${vh}" fill="url(#grid-pat)"/>
    ${edgesSvg}
    ${dotsSvg}
    ${labelsSvg}
    ${nodesSvg}
  `;
}

function renderArchitectureDiagram(sys, step) {
  const svg = document.getElementById('wa-arch');
  if (!svg) return;

  const layout = archLayoutFor(sys);
  if (!layout) {
    svg.innerHTML = `<text x="50" y="80" fill="rgba(255,255,255,0.6)" font-size="18" font-family="Inter, Arial">Architecture flow coming soon for ${escapeXml(sys?.title || '')}</text>`;
    return;
  }

  svg.setAttribute('viewBox', layout.viewBox || '0 0 1420 760');
  const active = new Set(step?.active || []);
  const ARCH_ACTIVE = 'rgba(45,212,191,1)';

  // ── Shape inference ──────────────────────────────────────────────────────
  const inferShape = (lbl, typeHint) => {
    if (typeHint) return typeHint;
    const l = (lbl || '').toLowerCase();
    if (/(store|storage|kv|cache|metadata|object store|index|ledger|blob|warehouse|database|db\b|thread|user assist|assist kv|queue store|event store)/.test(l)) return 'db';
    if (/(queue|bus|stream|fanout|topic|kafka|pubsub)/.test(l)) return 'queue';
    return 'service';
  };

  // Box dimensions per shape
  const SVC_W = 210, SVC_H = 54;
  const DB_W  = 170, DB_RY = 13, DB_BODY = 44; // cylinder: ry = cap radius, total h = DB_BODY + DB_RY*2
  const Q_W   = 210, Q_H   = 54;

  const shapeDim = (nd) => {
    const s = inferShape(nd.label, nd.type);
    if (s === 'db')    return { w: DB_W, h: DB_BODY + DB_RY * 2, shape: s };
    if (s === 'queue') return { w: Q_W,  h: Q_H, shape: s };
    return { w: SVC_W, h: SVC_H, shape: 'service' };
  };

  // ── Node renderers ────────────────────────────────────────────────────────
  const renderService = (id, x, y, label, on) => {
    const glowDef = on ? `<filter id="an-${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>` : '';
    const gAttr = on ? `filter="url(#an-${id})"` : '';
    return `${glowDef}<g ${gAttr}>
      <rect x="${x}" y="${y}" width="${SVC_W}" height="${SVC_H}" rx="10"
        fill="${on ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.04)'}"
        stroke="${on ? ARCH_ACTIVE : 'rgba(255,255,255,0.22)'}" stroke-width="${on ? 2 : 1.5}"/>
      <text x="${x + 12}" y="${y + 33}" fill="${on ? 'rgba(230,255,252,0.96)' : 'rgba(240,240,248,0.68)'}"
        font-size="13" font-family="Inter, Arial" font-weight="${on ? 800 : 600}">${escapeXml(label)}</text>
    </g>`;
  };

  const renderDB = (id, x, y, label, on) => {
    const ry = DB_RY, bh = DB_BODY, w = DB_W;
    const cx = x + w / 2;
    const stroke = on ? ARCH_ACTIVE : 'rgba(255,255,255,0.22)';
    const bodyFill = on ? 'rgba(20,184,166,0.10)' : 'rgba(255,255,255,0.04)';
    const capFill  = on ? 'rgba(20,184,166,0.18)' : 'rgba(255,255,255,0.06)';
    const sw = on ? 2 : 1.5;
    const glowDef = on ? `<filter id="adb-${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>` : '';
    const gAttr = on ? `filter="url(#adb-${id})"` : '';
    return `${glowDef}<g ${gAttr}>
      <rect x="${x}" y="${y + ry}" width="${w}" height="${bh}"
        fill="${bodyFill}" stroke="${stroke}" stroke-width="${sw}" stroke-left="none" stroke-right="none"/>
      <ellipse cx="${cx}" cy="${y + ry}" rx="${w / 2}" ry="${ry}"
        fill="${capFill}" stroke="${stroke}" stroke-width="${sw}"/>
      <ellipse cx="${cx}" cy="${y + ry + bh}" rx="${w / 2}" ry="${ry}"
        fill="${on ? 'rgba(20,184,166,0.14)' : 'rgba(0,0,0,0.12)'}" stroke="${stroke}" stroke-width="${sw}"/>
      <text x="${cx}" y="${y + ry + bh / 2 + 5}" text-anchor="middle"
        fill="${on ? 'rgba(230,255,252,0.96)' : 'rgba(240,240,248,0.68)'}"
        font-size="12" font-family="Inter, Arial" font-weight="${on ? 800 : 600}">${escapeXml(label)}</text>
    </g>`;
  };

  const renderQueue = (id, x, y, label, on) => {
    const stroke = on ? ARCH_ACTIVE : 'rgba(255,255,255,0.22)';
    const glowDef = on ? `<filter id="aq-${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>` : '';
    const gAttr = on ? `filter="url(#aq-${id})"` : '';
    return `${glowDef}<g ${gAttr}>
      <rect x="${x}" y="${y}" width="${Q_W}" height="${Q_H}" rx="8"
        fill="${on ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.04)'}"
        stroke="${stroke}" stroke-width="${on ? 2 : 1.5}"/>
      <line x1="${x+15}" y1="${y+12}" x2="${x+15}" y2="${y+Q_H-12}" stroke="${stroke}" stroke-width="1.5" opacity="0.45"/>
      <line x1="${x+21}" y1="${y+12}" x2="${x+21}" y2="${y+Q_H-12}" stroke="${stroke}" stroke-width="1.5" opacity="0.45"/>
      <text x="${x+32}" y="${y+33}" fill="${on ? 'rgba(230,255,252,0.96)' : 'rgba(240,240,248,0.68)'}"
        font-size="13" font-family="Inter, Arial" font-weight="${on ? 800 : 600}">${escapeXml(label)}</text>
    </g>`;
  };

  const renderNode = (id, nd) => {
    const { shape } = shapeDim(nd);
    const on = active.has(id);
    if (shape === 'db')    return renderDB(id, nd.x, nd.y, nd.label, on);
    if (shape === 'queue') return renderQueue(id, nd.x, nd.y, nd.label, on);
    return renderService(id, nd.x, nd.y, nd.label, on);
  };

  // Backend outline
  const backendOutline = (x, y, w, h, label) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18"
      fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.13)" stroke-width="1.5" stroke-dasharray="6 5"/>
    <text x="${x + 16}" y="${y + 24}" fill="rgba(240,240,248,0.45)"
      font-size="12" font-family="Inter, Arial" font-weight="700" letter-spacing="0.08em">${escapeXml(label.toUpperCase())}</text>
  `;

  // ── Smart arrow routing ───────────────────────────────────────────────────
  // Compute edge attachment points based on relative node positions.
  const edgePoints = (na, nb) => {
    const da = shapeDim(na), db_ = shapeDim(nb);
    const ax = na.x + da.w / 2, ay = na.y + da.h / 2;
    const bx = nb.x + db_.w / 2, by = nb.y + db_.h / 2;
    const dx = bx - ax, dy = by - ay;

    let x1, y1, x2, y2;
    if (Math.abs(dx) >= Math.abs(dy)) {
      // Horizontal primary
      if (dx > 0) { x1 = na.x + da.w + 4; x2 = nb.x - 4; }
      else        { x1 = na.x - 4;         x2 = nb.x + db_.w + 4; }
      y1 = ay; y2 = by;
    } else {
      // Vertical primary
      if (dy > 0) { y1 = na.y + da.h + 4; y2 = nb.y - 4; }
      else        { y1 = na.y - 4;         y2 = nb.y + db_.h + 4; }
      x1 = ax; x2 = bx;
    }
    return { x1, y1, x2, y2 };
  };

  const drawConn = (x1, y1, x2, y2, label, on) => {
    const uid = `${Math.round(x1)}-${Math.round(y1)}-${Math.round(x2)}-${Math.round(y2)}`.replace(/\./g,'');
    const mid = `aa${uid}`;
    const markerCol = on ? ARCH_ACTIVE : 'rgba(255,255,255,0.20)';

    // Path shape
    const adx = Math.abs(x2 - x1), ady = Math.abs(y2 - y1);
    let d;
    if (adx < 6 || ady < 6) {
      d = `M${x1} ${y1} L ${x2} ${y2}`;
    } else {
      const mx = (x1 + x2) / 2;
      d = `M${x1} ${y1} L ${mx} ${y1} L ${mx} ${y2} L ${x2} ${y2}`;
    }

    const glowF = on ? `<filter id="cg-${uid}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>` : '';
    const mx = (x1 + x2) / 2;
    const labelSvg = label ? `<text x="${mx}" y="${Math.min(y1,y2) - 7}" text-anchor="middle"
      fill="${on ? ARCH_ACTIVE : 'rgba(255,255,255,0.32)'}" font-size="10" font-family="Inter, Arial"
      font-weight="700" opacity="${on ? 0.92 : 0.55}">${escapeXml(label)}</text>` : '';

    return `
      ${glowF}
      <defs><marker id="${mid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${markerCol}"/>
      </marker></defs>
      <path d="${d}" fill="none" stroke="rgba(255,255,255,0.11)" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 7"/>
      <path d="${d}" fill="none"
        stroke="${on ? ARCH_ACTIVE : 'rgba(255,255,255,0.18)'}"
        stroke-width="${on ? 2.5 : 1.5}" stroke-linecap="round" stroke-linejoin="round"
        opacity="${on ? 0.88 : 0.5}" marker-end="url(#${mid})"
        ${on ? `filter="url(#cg-${uid})"` : ''}/>
      ${labelSvg}
    `;
  };

  // ── Edge collections ──────────────────────────────────────────────────────
  const uniqPairs = (pairs) => {
    const seen = new Set(), out = [];
    for (const [a, b, ...rest] of pairs) {
      const k = `${a}->${b}`;
      if (seen.has(k)) continue;
      seen.add(k);
      out.push([a, b, ...rest]);
    }
    return out;
  };

  const baselineEdges = (() => {
    if (layout.baselineEdges?.length) return uniqPairs(layout.baselineEdges);
    if (layout.primaryPath?.length) {
      const p = layout.primaryPath;
      const edges = [];
      for (let i = 0; i < p.length - 1; i++) edges.push([p[i], p[i+1]]);
      return uniqPairs(edges);
    }
    const all = [];
    const steps = (flowForSystem(sys)?.steps || []);
    for (const s of steps) {
      const idx = steps.indexOf(s) + 1;
      for (const [a, b] of (layout.stepEdges ? layout.stepEdges(idx, sys) : [])) all.push([a, b]);
    }
    return uniqPairs(all);
  })();

  const stepIdx = (PLAYGROUND.step ?? 0) + 1;

  const baselineSvg = baselineEdges.map(([a, b]) => {
    const na = layout.nodes[a], nb = layout.nodes[b];
    if (!na || !nb) return '';
    const { x1, y1, x2, y2 } = edgePoints(na, nb);
    return drawConn(x1, y1, x2, y2, '', false);
  }).join('');

  const activeEdgeSvg = (layout.stepEdges ? layout.stepEdges(stepIdx, sys) : []).map(([a, b, lbl]) => {
    const na = layout.nodes[a], nb = layout.nodes[b];
    if (!na || !nb) return '';
    const { x1, y1, x2, y2 } = edgePoints(na, nb);
    return drawConn(x1, y1, x2, y2, lbl || '', true);
  }).join('');

  const backend = layout.backend;
  const backendSvg = backend
    ? backendOutline(backend.x, backend.y, backend.w, backend.h, layout.backendLabel || `${sys?.title || 'Product'} Backend`)
    : '';

  svg.innerHTML = `
    <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0)"/>
    ${backendSvg}
    ${baselineSvg}
    ${activeEdgeSvg}
    ${Object.entries(layout.nodes).map(([id, nd]) => renderNode(id, nd)).join('')}
  `;
}

function renderWhatsAppArchitecture(step) {
  const svg = document.getElementById('wa-arch');
  if (!svg) return;

  const active = new Set(step.active || []);

  const box = (x,y,w,h,label) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.10)" />
    <text x="${x+18}" y="${y+28}" fill="rgba(240,240,248,0.75)" font-size="14" font-family="Inter, Arial" font-weight="900">${escapeXml(label)}</text>
  `;

  const n = (id,x,y,label) => {
    const on = active.has(id);
    const stroke = on ? 'rgba(236,72,153,0.95)' : 'rgba(255,255,255,0.12)';
    const fill = on ? 'rgba(236,72,153,0.12)' : 'rgba(255,255,255,0.03)';
    return `
      <rect x="${x}" y="${y}" width="220" height="60" rx="16" fill="${fill}" stroke="${stroke}" stroke-width="2" opacity="${on?1:0.65}"/>
      <text x="${x+14}" y="${y+38}" fill="rgba(240,240,248,0.90)" font-size="14" font-family="Inter, Arial" font-weight="900" opacity="${on?1:0.65}">${escapeXml(label)}</text>
    `;
  };

  const arrowOrtho = (x1,y1,x2,y2,label='') => {
    const mid = Math.abs(x1*13+x2*7+y1*11+y2*5).toFixed(0);
    const markerId = `arch-arrow-${mid}`;
    // Route: horizontal then vertical then horizontal
    const mx = Math.round((x1 + x2) / 2);
    const d = `M${x1} ${y1} L ${mx} ${y1} L ${mx} ${y2} L ${x2} ${y2}`;
    return `
      <defs>
        <marker id="${markerId}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(123,125,248,0.9)"/>
        </marker>
      </defs>
      <path d="${d}" fill="none" stroke="rgba(123,125,248,0.55)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#${markerId})"/>
      ${label ? `<text x="${mx}" y="${Math.min(y1,y2)-10}" text-anchor="middle" fill="rgba(123,125,248,0.65)" font-size="12" font-family="Inter, Arial" font-weight="800">${escapeXml(label)}</text>` : ''}
    `;
  };

  // Layout (more spaced to keep connectors readable)
  // Clients
  const sender = { x: 40, y: 120 };
  const recipient = { x: 40, y: 200 };

  // Backend box
  const backend = { x: 320, y: 70, w: 860, h: 630 };

  // Services
  const edge = { x: 370, y: 150 };
  const auth = { x: 370, y: 240 };
  const keyb = { x: 370, y: 330 };
  const relay = { x: 680, y: 150 };
  const queue = { x: 680, y: 240 };
  const spam = { x: 680, y: 330 };
  const push = { x: 980, y: 150 };
  const media = { x: 980, y: 240 };
  const meta = { x: 980, y: 330 };
  const objstore = { x: 980, y: 420 };

  // External
  // Keep external systems clearly outside backend and not overlapping
  const fcm = { x: 1220, y: 150 };
  const cdn = { x: 1220, y: 240 };

  // Only show a clean subset of edges per current step to avoid clutter
  const idx = (PLAYGROUND.step ?? 0) + 1;
  let edges = '';
  if (idx === 2) {
    edges += arrowOrtho(sender.x+220, sender.y+30, keyb.x, keyb.y+30, 'keys');
    edges += arrowOrtho(sender.x+220, sender.y+30, edge.x, edge.y+30, 'send');
  }
  if (idx === 3) {
    edges += arrowOrtho(sender.x+220, sender.y+30, edge.x, edge.y+30, 'send');
    edges += arrowOrtho(edge.x+220, edge.y+30, relay.x, relay.y+30, 'relay');
    edges += arrowOrtho(relay.x+220, relay.y+30, queue.x, queue.y+30, 'fanout');
  }
  if (idx === 4) {
    edges += arrowOrtho(queue.x+220, queue.y+30, push.x, push.y+30, 'notify');
    edges += arrowOrtho(push.x+220, push.y+30, fcm.x, fcm.y+30, 'push');
    edges += arrowOrtho(fcm.x, fcm.y+30, recipient.x+220, recipient.y+30, 'wake');
  }
  if (idx === 5) {
    edges += arrowOrtho(relay.x+220, relay.y+30, meta.x, meta.y+30, 'store');
  }

  svg.setAttribute('viewBox', '0 0 1420 760');
  svg.innerHTML = `
    <rect x="0" y="0" width="1420" height="760" fill="rgba(0,0,0,0)"/>
    ${box(backend.x, backend.y, backend.w, backend.h, 'WhatsApp Backend')}

    ${n('sender', sender.x, sender.y, 'Sender App')}
    ${n('recipient', recipient.x, recipient.y, 'Recipient App')}

    ${n('relay', edge.x, edge.y, 'Edge / API Gateway')}
    ${n('auth', auth.x, auth.y, 'Auth Service')}
    ${n('keybundle', keyb.x, keyb.y, 'Key Bundle Service')}
    ${n('relay', relay.x, relay.y, 'Messaging Relay')}
    ${n('queue', queue.x, queue.y, 'Fanout Queue')}
    ${n('spam', spam.x, spam.y, 'Spam / Abuse Checks')}
    ${n('push', push.x, push.y, 'Push Orchestrator')}
    ${n('media', media.x, media.y, 'Media Service')}
    ${n('meta', meta.x, meta.y, 'Message Metadata Store')}
    ${n('obj', objstore.x, objstore.y, 'Media Object Store')}

    ${n('push', fcm.x, fcm.y, 'FCM / APNs')}
    ${n('cdn', cdn.x, cdn.y, 'CDN')}

    ${edges}
  `;
}

function renderWhatsAppDiagram(step) {
  const svg = document.getElementById('wa-diagram');
  if (!svg) return;

  const active = new Set(step.active || []);
  const stepEdges = step.edges || [];
  const eActive = (a,b) => stepEdges.some(e => e[0]===a && e[1]===b);
  const node = (id, cx, cy, label, color) => {
    const on = active.has(id);
    const base = on ? 1 : 0.45;
    const stroke = on ? color : 'rgba(255,255,255,0.16)';
    const fill = on ? 'rgba(0,0,0,0.20)' : 'rgba(0,0,0,0.10)';
    const r = 30;
    const ring1 = on ? `<circle cx="${cx}" cy="${cy}" r="${r+18}" fill="none" stroke="${color}" stroke-width="2" opacity="0.35"/>` : '';
    const ring2 = on ? `<circle cx="${cx}" cy="${cy}" r="${r+8}" fill="none" stroke="${color}" stroke-width="2" opacity="0.65"/>` : '';
    const glow = on
      ? `<filter id="glow-${id}"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`
      : '';
    return `
      ${glow}
      <g ${on ? `filter="url(#glow-${id})"` : ''}>
        ${ring1}
        ${ring2}
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2" opacity="${base}"/>
        <text x="${cx}" y="${cy+5}" text-anchor="middle" fill="${stroke}" font-size="14" font-family="Inter, Arial" font-weight="900" opacity="${base}">${escapeXml(label)}</text>
      </g>
    `;
  };

  const edge = (fromX, fromY, toX, toY, on, dashed=false, label='', color='rgba(123,125,248,0.9)') => {
    // Show only step-relevant edges; keep others hidden
    if (!on) return '';
    const stroke = dashed ? color.replace('0.9','0.55') : color;
    const w = dashed ? 2.2 : 3.2;
    const dx = Math.max(60, Math.min(220, Math.abs(toX - fromX) * 0.35));
    const d = `M${fromX} ${fromY} C ${fromX+dx} ${fromY}, ${toX-dx} ${toY}, ${toX} ${toY}`;
    const dash = dashed ? 'stroke-dasharray="8 8"' : '';
    const midLabel = label ? `<text>
        <textPath href="#p-${Math.abs(fromX*13+toX*7+fromY*11+toY*5).toFixed(0)}" startOffset="50%" text-anchor="middle" fill="rgba(123,125,248,0.65)" font-size="12" font-family="Inter, Arial" font-weight="800">${escapeXml(label)}</textPath>
      </text>` : '';
    const pid = `p-${Math.abs(fromX*13+toX*7+fromY*11+toY*5).toFixed(0)}`;
    // Arrow marker (unique per edge)
    const mid = Math.abs(fromX*13+toX*7+fromY*11+toY*5).toFixed(0);
    const mid2 = Math.abs(fromX*5+toX*11+fromY*7+toY*13).toFixed(0);
    const markerId = `arrow-${mid}-${mid2}`;
    const marker = `
      <defs>
        <marker id="${markerId}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="${stroke}" opacity="0.95" />
        </marker>
      </defs>`;
    return `${marker}<path id="${pid}" d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" ${dash} marker-end="url(#${markerId})"/>${midLabel}`;
  };

  // Layout
  // Circle-node layout similar to reference
  const nodes = {
    sender: { cx: 110, cy: 360, label: 'You', color: 'rgba(34,197,94,0.95)' },
    crypto: { cx: 290, cy: 360, label: 'Signal Encrypt', color: 'rgba(34,197,94,0.95)' },
    relay: { cx: 520, cy: 360, label: 'WA Server', color: 'rgba(123,125,248,0.95)' },
    decrypt: { cx: 740, cy: 360, label: 'Signal Decrypt', color: 'rgba(34,197,94,0.95)' },
    recipient: { cx: 910, cy: 360, label: 'Friend', color: 'rgba(34,197,94,0.95)' },
    push: { cx: 1160, cy: 170, label: 'FCM APNs', color: 'rgba(123,125,248,0.75)' },
    keybundle: { cx: 290, cy: 520, label: 'Key Bundle', color: 'rgba(34,197,94,0.65)' },
  };

  const dataColor = 'rgba(123,125,248,0.95)';
  const asyncColor = 'rgba(123,125,248,0.55)';
  const edgesSvg = `
    ${edge(nodes.sender.cx, nodes.sender.cy, nodes.crypto.cx, nodes.crypto.cy, eActive('sender','crypto'), true, 'plaintext', asyncColor)}
    ${edge(nodes.crypto.cx, nodes.crypto.cy, nodes.relay.cx, nodes.relay.cy, eActive('crypto','relay'), true, 'encrypted', asyncColor)}
    ${edge(nodes.relay.cx, nodes.relay.cy, nodes.decrypt.cx, nodes.decrypt.cy, eActive('relay','decrypt'), false, 'ciphertext', dataColor)}
    ${edge(nodes.decrypt.cx, nodes.decrypt.cy, nodes.recipient.cx, nodes.recipient.cy, eActive('decrypt','recipient'), true, '', asyncColor)}

    ${edge(nodes.relay.cx, nodes.relay.cy, nodes.push.cx, nodes.push.cy, eActive('relay','push'), true, 'notify', asyncColor)}
    ${edge(nodes.push.cx, nodes.push.cy, nodes.recipient.cx, nodes.recipient.cy, eActive('push','recipient'), true, 'wake', asyncColor)}

    ${edge(nodes.keybundle.cx, nodes.keybundle.cy, nodes.crypto.cx, nodes.crypto.cy, eActive('keybundle','crypto'), true, 'keys', asyncColor)}
  `;

  const nodesSvg = `
    ${node('sender', nodes.sender.cx, nodes.sender.cy, nodes.sender.label, nodes.sender.color)}
    ${node('crypto', nodes.crypto.cx, nodes.crypto.cy, nodes.crypto.label, nodes.crypto.color)}
    ${node('relay', nodes.relay.cx, nodes.relay.cy, nodes.relay.label, nodes.relay.color)}
    ${node('decrypt', nodes.decrypt.cx, nodes.decrypt.cy, nodes.decrypt.label, nodes.decrypt.color)}
    ${node('recipient', nodes.recipient.cx, nodes.recipient.cy, nodes.recipient.label, nodes.recipient.color)}
    ${node('push', nodes.push.cx, nodes.push.cy, nodes.push.label, nodes.push.color)}
    ${node('keybundle', nodes.keybundle.cx, nodes.keybundle.cy, nodes.keybundle.label, nodes.keybundle.color)}
  `;

  svg.setAttribute('viewBox', '0 0 1320 640');
  svg.innerHTML = `
    <rect x="0" y="0" width="1320" height="640" fill="rgba(0,0,0,0)"/>
    ${edgesSvg}
    ${nodesSvg}
  `;
}

function escapeXml(s) {
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}

function openProductById(id) {
  const sys = SYSTEMS.find(s => s.id === id);
  if (sys) openProduct(sys);
}

function findSystem(q) {
  const qq = q.trim().toLowerCase();
  // exact match
  let s = SYSTEMS.find(x => x.title.toLowerCase() === qq);
  if (s) return s;
  // slug match
  const slug = slugify(q);
  s = SYSTEMS.find(x => x.id === slug);
  if (s) return s;
  // contains
  return SYSTEMS.find(x => x.title.toLowerCase().includes(qq));
}

// ---------- AI Generate ----------

function aiFindBestMatch(prompt) {
  var q = prompt.trim().toLowerCase();
  var qWords = q.split(/\s+/).filter(function(w) { return w.length > 2; });
  var best = null;
  var bestScore = 0;

  for (var i = 0; i < SYSTEMS.length; i++) {
    var sys = SYSTEMS[i];
    var title = sys.title.toLowerCase();
    var titleWords = title.split(/\s+/).filter(function(w) { return w.length > 1; });
    var score = 0;

    // Tier 1: full product name is a substring of the query (e.g. "how stripe works")
    if (q.includes(title)) {
      score = 200;
    } else {
      var titleWordsFoundInQuery = titleWords.filter(function(tw) {
        return tw.length > 2 && q.includes(tw);
      });
      var allTitleWordsMatch = titleWordsFoundInQuery.length === titleWords.length;

      if (allTitleWordsMatch && titleWords.length >= 2) {
        // Tier 2: every word of a multi-word title appears in the query
        // e.g. "google maps" -> both "google" and "maps" in query
        score = 160 + titleWords.length * 10;
      } else if (allTitleWordsMatch && titleWords.length === 1) {
        // Tier 3: single-word product name found in query (e.g. "stripe", "netflix")
        var queryHitsInTitle = qWords.filter(function(w) { return title.includes(w) && w.length > 3; }).length;
        score = 100 + queryHitsInTitle * 15;
      } else {
        // Tier 4: partial match — only some title words found; penalise heavily
        // This prevents "Google Drive" winning on a query about "Google Search"
        score = titleWordsFoundInQuery.length * 15;
      }
    }

    if (score > bestScore) { bestScore = score; best = sys; }
  }

  // Threshold: 80 ensures tier-3+ matches win; tier-4 partial matches (< 80) are rejected
  return bestScore >= 80 ? best : null;
}

function aiSuggestAlternatives(prompt) {
  var q = prompt.trim().toLowerCase();
  var qWords = q.split(/\s+/).filter(function(w) { return w.length > 2; });
  var scored = SYSTEMS.map(function(sys) {
    var title = sys.title.toLowerCase();
    var hits = qWords.filter(function(w) { return title.includes(w) && w.length > 2; }).length;
    return { sys: sys, hits: hits };
  }).filter(function(x) { return x.hits > 0; });
  scored.sort(function(a, b) { return b.hits - a.hits; });
  return scored.slice(0, 3).map(function(x) { return x.sys.title; });
}

function aiHistoryCardHtml(entry) {
  var logo = logoForSystemId(entry.sys.id);
  var iconHtml = logo
    ? '<div class="ai-hist-logo">' + logo + '</div>'
    : '<div class="ai-hist-icon">' + abbr(entry.sys.title) + '</div>';
  var steps = getProductSteps(entry.sys);
  var tagLabel = entry.sys.tag || catLabel(entry.sys.cat);
  return '<div class="ai-hist-card" data-entry-id="' + entry.id + '">'
    + '<div class="ai-hist-top">'
    + iconHtml
    + '<div class="ai-hist-meta">'
    + '<div class="ai-hist-name">' + entry.sys.title + '</div>'
    + '<div class="ai-hist-tag">' + tagLabel + '</div>'
    + '</div>'
    + '<span class="ai-hist-arrow">&rarr;</span>'
    + '</div>'
    + '<div class="ai-hist-prompt">&ldquo;' + entry.prompt + '&rdquo;</div>'
    + '<div class="ai-hist-foot">'
    + '<span class="ai-hist-steps">' + steps.length + ' steps</span>'
    + '<span class="ai-hist-open">Open flow &#x2197;</span>'
    + '</div>'
    + '</div>';
}

function aiHistoryHtml() {
  if (AI_STATE.history.length === 0) return '';
  var cards = AI_STATE.history.map(function(e) { return aiHistoryCardHtml(e); }).join('');
  return '<div class="ai-history-header">'
    + '<span class="ai-history-title">Recent Generations</span>'
    + '<span class="ai-history-count">' + AI_STATE.history.length + '</span>'
    + '</div>'
    + '<div class="ai-history-grid">' + cards + '</div>';
}

function aiExampleChipsHtml() {
  return AI_EXAMPLES.slice(0, 5).map(function(ex) {
    return '<button class="ai-example-chip" data-ex="' + ex + '">' + ex + '</button>';
  }).join('');
}

// === LLM-backed custom flow generation ===

var AI_KEY_STATE = { provider: "anthropic", key: "" };

function aiLoadKey() {
  try {
    var raw = localStorage.getItem("flowvis_llm_key");
    if (!raw) return;
    var obj = JSON.parse(raw);
    if (obj && obj.key) {
      AI_KEY_STATE.provider = obj.provider || "anthropic";
      AI_KEY_STATE.key = obj.key;
    }
  } catch (e) {}
}

function aiSaveKey(provider, key) {
  AI_KEY_STATE.provider = provider;
  AI_KEY_STATE.key = key;
  try { localStorage.setItem("flowvis_llm_key", JSON.stringify({ provider: provider, key: key })); } catch (e) {}
}

function aiHasKey() {
  return !!(AI_KEY_STATE.key && AI_KEY_STATE.key.length > 10);
}

function aiProviderLabel() {
  return AI_KEY_STATE.provider === "openai" ? "OpenAI" : "Anthropic";
}

function aiOpenKeyModal() {
  var existing = document.getElementById("ai-key-overlay");
  if (existing) existing.remove();
  var ov = document.createElement("div");
  ov.id = "ai-key-overlay";
  ov.className = "ai-key-overlay";
  ov.innerHTML = ""
    + "<div class=\"ai-key-card\">"
    +   "<div class=\"ai-key-head\">"
    +     "<div class=\"ai-key-title\">Connect your LLM</div>"
    +     "<button class=\"ai-key-close\" id=\"ai-key-close\" aria-label=\"Close\">&times;</button>"
    +   "</div>"
    +   "<p class=\"ai-key-sub\"><b>Your key stays on your device.</b> It is saved only in this browser (localStorage) and sent directly from your browser to the LLM provider. FlowVis has no backend and never sees, stores, or has access to your key or any other credentials.</p>"
    +   "<div class=\"ai-key-tabs\">"
    +     "<button class=\"ai-key-tab\" data-p=\"anthropic\">Anthropic Claude</button>"
    +     "<button class=\"ai-key-tab\" data-p=\"openai\">OpenAI GPT</button>"
    +   "</div>"
    +   "<input type=\"password\" id=\"ai-key-input\" class=\"ai-key-input\" placeholder=\"sk-ant-... or sk-...\" autocomplete=\"off\" spellcheck=\"false\"/>"
    +   "<div class=\"ai-key-hint\" id=\"ai-key-hint\"></div>"
    +   "<div class=\"ai-key-actions\">"
    +     "<button class=\"ai-key-btn-secondary\" id=\"ai-key-cancel\">Cancel</button>"
    +     "<button class=\"ai-key-btn-primary\" id=\"ai-key-save\">Save key</button>"
    +   "</div>"
    + "</div>";
  document.body.appendChild(ov);

  var provider = AI_KEY_STATE.provider || "anthropic";
  var tabs = ov.querySelectorAll(".ai-key-tab");
  var hint = ov.querySelector("#ai-key-hint");
  var input = ov.querySelector("#ai-key-input");
  if (AI_KEY_STATE.key) input.value = AI_KEY_STATE.key;
  setTimeout(function() { input.focus(); }, 50);

  function applyProvider() {
    tabs.forEach(function(t) { t.classList.toggle("active", t.dataset.p === provider); });
    hint.textContent = provider === "anthropic"
      ? "Claude keys start with sk-ant-. Get one at console.anthropic.com."
      : "OpenAI keys start with sk-. Get one at platform.openai.com.";
  }
  applyProvider();
  tabs.forEach(function(t) {
    t.addEventListener("click", function() { provider = t.dataset.p; applyProvider(); });
  });

  function close() { ov.remove(); }
  ov.querySelector("#ai-key-close").addEventListener("click", close);
  ov.querySelector("#ai-key-cancel").addEventListener("click", close);
  ov.addEventListener("click", function(e) { if (e.target === ov) close(); });

  ov.querySelector("#ai-key-save").addEventListener("click", function() {
    var k = input.value.trim();
    if (!k) { hint.textContent = "Paste an API key first."; return; }
    aiSaveKey(provider, k);
    close();
    renderAI();
  });

  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") ov.querySelector("#ai-key-save").click();
  });
}

function aiBuildPrompt(query) {
  var system = "You are a senior distributed-systems architect. The user asks a specific question about how a system works. Build a DETAILED, PRODUCTION-GRADE custom flow that answers exactly that question — not a generic overview, not a marketing pitch. Teach the reader from first principles.\n\n"
    + "Output ONE raw JSON object (no markdown fences, no prose outside the JSON) with this exact schema:\n\n"
    + "{\n"
    + "  \"title\": \"<concise flow title under 60 chars, phrased as the user question>\",\n"
    + "  \"description\": \"<one-sentence overview>\",\n"
    + "  \"category\": \"<payments|finance|crypto|ecommerce|travel|streaming|social|productivity|devtools|health|food|news|creator|education|gaming>\",\n"
    + "  \"nodes\": [ {\"id\":\"<kebab-case id>\",\"label\":\"<<=18 chars>\",\"type\":\"<client|api|store|queue|cdn|external>\"} ],\n"
    + "  \"steps\": [ {\"title\":\"<short step title, <=50 chars>\",\"desc\":\"<3-5 sentences explaining WHY this step exists, WHAT data moves, which invariants hold, and common failure modes>\",\"active\":[\"id\",...],\"edges\":[[\"from\",\"to\",\"<short verb label>\"]]} ]\n"
    + "}\n\n"
    + "DEPTH REQUIREMENTS — follow all of these:\n"
    + "- Minimum 8 steps, ideally 8–12. Prefer MORE granular steps over fewer coarse ones. Break common phases into sub-steps (e.g. auth handshake, token mint, token exchange; or client upload → chunking → parallel PUT → assembly).\n"
    + "- Minimum 7 nodes, ideally 8–14. Include caches, queues, metadata stores, CDNs, external services, observability — not just client/api/db.\n"
    + "- Start from the very first user action (tap, keystroke, etc.) and end past the visible result (acks, analytics, cache warm, webhook fan-out).\n"
    + "- Cover the happy path AND at least one retry/backpressure/failure handling step where it naturally fits.\n"
    + "- Each step's desc must be 3–5 sentences of real technical substance — protocols, data formats, trade-offs, ordering guarantees, consistency model, cache TTLs, idempotency keys, etc. No vague filler like \"the system processes the request\".\n"
    + "- Each step should light up 2–5 nodes in active[] and have 1–4 edges so the diagram shows real data movement, not a single arrow.\n"
    + "- Edge labels should be concrete verbs or payloads (\"POST /v1/messages\", \"enqueue\", \"ack\", \"CDN hit\") — not \"data\".\n\n"
    + "VALIDITY:\n"
    + "- Every id used in active[] or edges[][0..1] MUST exist in nodes[].\n"
    + "- No duplicate node ids. kebab-case only.\n"
    + "- Return JSON ONLY.";
  return { system: system, user: "Question: " + query };
}

async function aiCallLLM(prompts) {
  var provider = AI_KEY_STATE.provider;
  var key = AI_KEY_STATE.key;
  if (provider === "openai") {
    var res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: prompts.system },
          { role: "user", content: prompts.user }
        ]
      })
    });
    if (!res.ok) throw new Error("OpenAI " + res.status + ": " + (await res.text()).slice(0, 200));
    var j = await res.json();
    return j.choices[0].message.content;
  }
  var res2 = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 6000,
      system: prompts.system,
      messages: [{ role: "user", content: prompts.user }]
    })
  });
  if (!res2.ok) throw new Error("Anthropic " + res2.status + ": " + (await res2.text()).slice(0, 200));
  var j2 = await res2.json();
  return j2.content[0].text;
}

function aiParseResponse(text) {
  var t = (text || "").trim();
  if (t.startsWith("```")) t = t.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  var first = t.indexOf("{");
  var last = t.lastIndexOf("}");
  if (first >= 0 && last > first) t = t.slice(first, last + 1);
  var data = JSON.parse(t);
  if (!data || !data.title || !Array.isArray(data.nodes) || !Array.isArray(data.steps)) {
    throw new Error("Invalid response shape from model");
  }
  var ids = new Set(data.nodes.map(function(n) { return n.id; }));
  data.steps = data.steps.map(function(s) {
    return {
      title: s.title || "Step",
      desc: s.desc || "",
      active: (s.active || []).filter(function(x) { return ids.has(x); }),
      edges: (s.edges || []).filter(function(e) { return e && ids.has(e[0]) && ids.has(e[1]); })
    };
  });
  return data;
}

// Order nodes by their first appearance across steps (active[] then edges[]),
// falling back to declared order. Produces a stable primary spine.
function aiOrderNodes(nodes, steps) {
  var firstSeen = {};
  var counter = 0;
  (steps || []).forEach(function(s) {
    (s.active || []).forEach(function(id) { if (firstSeen[id] === undefined) firstSeen[id] = counter++; });
    (s.edges || []).forEach(function(e) {
      if (e && e[0] !== undefined && firstSeen[e[0]] === undefined) firstSeen[e[0]] = counter++;
      if (e && e[1] !== undefined && firstSeen[e[1]] === undefined) firstSeen[e[1]] = counter++;
    });
  });
  (nodes || []).forEach(function(n) { if (firstSeen[n.id] === undefined) firstSeen[n.id] = counter++; });
  return nodes.slice().sort(function(a, b) { return firstSeen[a.id] - firstSeen[b.id]; });
}

// 2D grid layout: spread nodes across columns (left-to-right in order),
// stack into 2-3 rows if there are many nodes. Mirrors the feel of the
// hand-crafted product layouts (varied x + y, room for dotted skeleton).
function aiAutoLayout(nodes, steps, viewW, viewH, padX, padY) {
  var ordered = aiOrderNodes(nodes, steps);
  var n = ordered.length;
  var pos = {};
  if (n === 0) return pos;

  var rows = n <= 5 ? 1 : (n <= 10 ? 2 : 3);
  var cols = Math.ceil(n / rows);
  var usableW = viewW - padX * 2;
  var usableH = viewH - padY * 2;
  var dx = cols > 1 ? usableW / (cols - 1) : 0;

  // Row Y centers: single row → middle; two rows → 1/3 and 2/3; three rows → quarters.
  var rowYs;
  if (rows === 1) rowYs = [viewH / 2];
  else if (rows === 2) rowYs = [padY + usableH * 0.32, padY + usableH * 0.68];
  else rowYs = [padY + usableH * 0.22, padY + usableH * 0.50, padY + usableH * 0.78];

  // Fill row-by-row so column order equals declared order (left-to-right spine).
  var perRow = Math.ceil(n / rows);
  ordered.forEach(function(node, i) {
    var row = Math.floor(i / perRow);
    var col = i % perRow;
    var x = cols > 1 ? padX + dx * col : viewW / 2;
    var y = rowYs[row] || rowYs[rowYs.length - 1];
    pos[node.id] = { x: Math.round(x), y: Math.round(y) };
  });
  return pos;
}

function aiInjectFlow(data) {
  var base = slugify("ai " + data.title).slice(0, 60) || ("ai-" + Date.now());
  var id = base;
  var nn = 2;
  while (FLOWS[id] || SYSTEM_LAYOUTS[id]) { id = base + "-" + nn; nn++; }

  // Normalise steps: if a step has no edges, synthesise a chain from active[]
  // so the diagram always shows movement between the lit-up nodes.
  var steps = (data.steps || []).map(function(s) {
    var active = (s.active || []).slice();
    var edges = (s.edges || []).slice();
    if (edges.length === 0 && active.length >= 2) {
      for (var i = 0; i < active.length - 1; i++) edges.push([active[i], active[i + 1], ""]);
    }
    return { title: s.title || "Step", desc: s.desc || "", active: active, edges: edges };
  });

  // Primary spine: declared-order sequence, used for dotted baseline and arch primaryPath.
  var ordered = aiOrderNodes(data.nodes, steps);
  var primaryPath = ordered.map(function(n) { return n.id; });
  var baselineEdges = [];
  for (var k = 0; k < primaryPath.length - 1; k++) baselineEdges.push([primaryPath[k], primaryPath[k + 1]]);

  // ── System diagram ──
  var viewW = 1200, viewH = 700;
  var pos = aiAutoLayout(data.nodes, steps, viewW, viewH, 140, 110);
  var layoutNodes = {};
  data.nodes.forEach(function(nd) {
    var p = pos[nd.id] || { x: viewW / 2, y: viewH / 2 };
    var t = nd.type || "api";
    if (!SYSTEM_NODE_COLORS[t]) t = "api";
    layoutNodes[nd.id] = { x: p.x, y: p.y, label: nd.label, colorKey: t };
  });
  SYSTEM_LAYOUTS[id] = {
    viewBox: "0 0 " + viewW + " " + viewH,
    nodes: layoutNodes,
    baselineEdges: baselineEdges.slice()
  };

  // ── Architecture diagram ──
  var archW = 1420, archH = 760;
  var archPadX = 80, archPadY = 140;
  var posA = aiAutoLayout(data.nodes, steps, archW, archH, archPadX, archPadY);
  var archNodes = {};
  data.nodes.forEach(function(nd) {
    var p = posA[nd.id] || { x: archW / 2, y: archH / 2 };
    // Arch renderer uses top-left coords for boxes (w≈210, h≈54), so offset.
    archNodes[nd.id] = { x: Math.round(p.x - 105), y: Math.round(p.y - 27), label: nd.label };
  });
  ARCH_LAYOUTS[id] = {
    viewBox: "0 0 " + archW + " " + archH,
    backendLabel: (data.title || "Custom") + " Backend",
    backend: { x: 40, y: 70, w: archW - 80, h: archH - 140 },
    nodes: archNodes,
    primaryPath: primaryPath.slice(),
    stepEdges: function(stepIdx) {
      var s = steps[stepIdx];
      if (!s) return [];
      return (s.edges || []).map(function(e) { return [e[0], e[1], e[2] || ""]; });
    }
  };

  // ── FLOWS entry ──
  FLOWS[id] = {
    title: data.title,
    steps: steps.map(function(s) {
      var edgeLabels = {};
      (s.edges || []).forEach(function(e) { if (e[2]) edgeLabels[e[0] + "->" + e[1]] = e[2]; });
      return {
        title: s.title,
        desc: s.desc,
        active: s.active,
        edges: s.edges.map(function(e) { return [e[0], e[1]]; }),
        edgeLabels: edgeLabels
      };
    })
  };

  return {
    id: id,
    title: data.title,
    cat: data.category || "productivity",
    tag: "AI Generated",
    desc: data.description || ("Custom flow: " + data.title),
    aiGenerated: true
  };
}

async function aiGenerate(prompt) {
  prompt = (prompt || "").trim();
  if (!prompt) return;
  var root = document.getElementById("ai-page");
  if (!root) return;
  var inputEl = root.querySelector("#ai-prompt");
  var btn = root.querySelector("#ai-gen-btn");
  var statusEl = root.querySelector("#ai-status");

  if (!aiHasKey()) {
    if (statusEl) {
      statusEl.textContent = "Connect your LLM API key to generate custom flows.";
      statusEl.classList.add("visible", "error");
    }
    aiOpenKeyModal();
    return;
  }

  if (btn) btn.disabled = true;
  if (statusEl) {
    statusEl.classList.remove("error");
    statusEl.classList.add("visible");
    statusEl.innerHTML = 'Generating flows<span class="ai-dots"><span>.</span><span>.</span><span>.</span></span>';
  }

  try {
    var prompts = aiBuildPrompt(prompt);
    var raw = await aiCallLLM(prompts);
    var data = aiParseResponse(raw);
    var sys = aiInjectFlow(data);
    AI_STATE.history.unshift({ id: "ai-" + Date.now(), prompt: prompt, sys: sys, createdAt: new Date() });
    if (inputEl) inputEl.value = "";
    if (btn) btn.disabled = false;
    if (statusEl) { statusEl.textContent = ""; statusEl.classList.remove("visible", "error"); }
    renderAI();
    openProduct(sys);
  } catch (err) {
    if (btn) btn.disabled = false;
    if (statusEl) {
      statusEl.textContent = "Error: " + (err && err.message ? err.message : String(err));
      statusEl.classList.add("visible", "error");
    }
  }
}


function aiStartExampleRotation() {
  if (AI_STATE.exampleTimer) clearInterval(AI_STATE.exampleTimer);
  var root = document.getElementById('ai-page');
  AI_STATE.exampleTimer = setInterval(function() {
    AI_STATE.exampleIdx = (AI_STATE.exampleIdx + 1) % AI_EXAMPLES.length;
    var inp = root && root.querySelector('#ai-prompt');
    if (inp && inp !== document.activeElement && !inp.value) {
      inp.placeholder = AI_EXAMPLES[AI_STATE.exampleIdx];
    }
  }, 2800);
}

function renderAI() {
  var root = document.getElementById('ai-page');
  var placeholder = AI_EXAMPLES[AI_STATE.exampleIdx];
  root.innerHTML = '<div class="container">'
    + '<div class="ai-hero">'
    + '<div class="ai-hero-label">AI GENERATE</div>'
    + '<h2 class="ai-hero-title">Understand any system, instantly.</h2>'
    + '<p class="ai-hero-sub">Describe a product or flow in plain English - map the full system: steps, data flows, and architecture.</p>'
    + '<div class="ai-key-status">'
    +   (aiHasKey()
        ? ('<span class="ai-key-dot on"></span>Connected to <b>' + aiProviderLabel() + '</b>'
           + '<button class="ai-key-link" id="ai-key-change">Change key</button>')
        : ('<span class="ai-key-dot"></span>No LLM key connected'
           + '<button class="ai-key-link" id="ai-key-connect">Connect API key</button>'))
    + '</div>'
    + '<div class="ai-key-privacy">Your API key is saved locally in this browser only. FlowVis never has access to your credentials.</div>'
    + '</div>'
    + '<div class="ai-input-wrap">'
    + '<div class="ai-input-box">'
    + '<svg class="ai-input-icon" width="18" height="18" viewBox="0 0 20 20" fill="none">'
    + '<circle cx="10" cy="10" r="7" stroke="rgba(123,125,248,0.7)" stroke-width="1.5"/>'
    + '<path d="M10 7v6M7 10h6" stroke="rgba(123,125,248,0.9)" stroke-width="1.5" stroke-linecap="round"/>'
    + '</svg>'
    + '<input id="ai-prompt" type="text" placeholder="' + placeholder + '" autocomplete="off" spellcheck="false"/>'
    + '<button id="ai-gen-btn" class="ai-gen-btn">'
    + '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" style="flex-shrink:0">'
    + '<path d="M3 8l4 4 6-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    + '</svg>'
    + 'Generate'
    + '</button>'
    + '</div>'
    + '<div id="ai-status" class="ai-status"></div>'
    + '<div class="ai-examples-row">'
    + '<span class="ai-examples-label">Try:</span>'
    + aiExampleChipsHtml()
    + '</div>'
    + '</div>'
    + '<div class="ai-history-wrap" id="ai-history-wrap">'
    + aiHistoryHtml()
    + '</div>'
    + '</div>';

  var btn = root.querySelector('#ai-gen-btn');
  var inp = root.querySelector('#ai-prompt');
  btn.addEventListener('click', function() { aiGenerate(inp.value); });
  inp.addEventListener('keydown', function(e) { if (e.key === 'Enter') aiGenerate(inp.value); });
  root.querySelectorAll('.ai-example-chip').forEach(function(chip) {
    chip.addEventListener('click', function() { inp.value = chip.dataset.ex; inp.focus(); });
  });
  root.querySelectorAll('.ai-hist-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var entry = AI_STATE.history.find(function(e) { return e.id === card.dataset.entryId; });
      if (entry) openProduct(entry.sys);
    });
  });
  var kConnect = root.querySelector('#ai-key-connect');
  if (kConnect) kConnect.addEventListener('click', function() { aiOpenKeyModal(); });
  var kChange = root.querySelector('#ai-key-change');
  if (kChange) kChange.addEventListener('click', function() { aiOpenKeyModal(); });
  aiStartExampleRotation();
}

// ---------- Preview hub ----------
function renderPreview() {
  const root = document.getElementById('preview-page');
  root.innerHTML = `
    <div class="container">
      <div class="section-title" style="margin-top:10px">
        <h2>Preview</h2>
        <p>Quick links to review pages and flows.</p>
      </div>

      <div class="preview-grid">
        <a class="preview-link" href="#" data-page="home">Home</a>
        <a class="preview-link" href="#" data-page="explore">Explore</a>
        <a class="preview-link" href="#" data-page="ai">AI Generate</a>
      </div>

      <div style="height:18px"></div>

      <div class="product-box">
        <div class="muted" style="margin-bottom:10px">Sample products</div>
        <div class="mini-list" id="preview-products"></div>
      </div>
    </div>
  `;

  root.querySelectorAll('[data-page]').forEach(a => a.addEventListener('click', (e) => {
    e.preventDefault();
    showPage(a.dataset.page);
  }));

  const list = document.getElementById('preview-products');
  const sample = SYSTEMS.slice(0, 30);
  list.innerHTML = sample.map(s => `<button class="mini" data-id="${s.id}">${s.title}</button>`).join('');
  list.querySelectorAll('.mini').forEach(b => b.addEventListener('click', () => openProductById(b.dataset.id)));
}

// ---------- Deep Dive (product-scoped chat + stacked flows) ----------

// Sample prompts per product; fallback generic ones work for everything else.
const DD_SAMPLES = {
  stripe: ['How does Stripe handle refunds?', 'How does idempotency work in Stripe?', 'How does Stripe handle 3DS challenges?'],
  whatsapp: ['How does WhatsApp handle group message fanout?', 'How does WhatsApp sync across devices?', 'How does WhatsApp handle media upload?'],
  netflix: ['How does Netflix handle a play-start event?', 'How does ABR bitrate switching work?', 'How does Netflix recommend the next title?'],
  uber: ['How does Uber handle surge pricing?', 'How does Uber match a driver?', 'How does Uber handle trip payment?'],
  spotify: ['How does Spotify cache audio?', 'How does Discover Weekly build?', 'How does offline playback sync?'],
};
function ddSamplesFor(sys) {
  const id = (sys?.id || '').toLowerCase();
  if (DD_SAMPLES[id]) return DD_SAMPLES[id];
  const t = sys?.title || 'this product';
  return [
    `How does ${t} handle retries?`,
    `How does ${t} store data?`,
    `How does ${t} handle failure modes?`,
  ];
}

function setupDeepDiveWidget(sys) {
  const fab = document.getElementById('dd-fab');
  const panel = document.getElementById('dd-panel');
  const title = document.getElementById('dd-header-title');
  const messages = document.getElementById('dd-messages');
  const chipsHost = document.getElementById('dd-chips');
  const ta = document.getElementById('dd-textarea');
  const send = document.getElementById('dd-send');
  const closeBtn = document.getElementById('dd-close');
  if (!fab || !panel) return;

  // Reset state
  fab.style.display = 'flex';
  panel.style.display = 'none';
  title.textContent = `Deep dive: ${sys.title}`;
  messages.innerHTML = `<div class="dd-message assistant">Ask me about a specific ${escapeXml(sys.title)} flow. I'll generate a full system + architecture diagram for it below.</div>`;
  chipsHost.innerHTML = ddSamplesFor(sys)
    .map(s => `<button class="dd-chip" data-q="${escapeXml(s)}">${escapeXml(s)}</button>`).join('');
  ta.value = '';
  send.disabled = false;

  fab.onclick = () => {
    fab.style.display = 'none';
    panel.style.display = 'flex';
    setTimeout(() => ta.focus(), 20);
  };
  closeBtn.onclick = () => {
    panel.style.display = 'none';
    fab.style.display = 'flex';
  };
  chipsHost.querySelectorAll('.dd-chip').forEach(ch => {
    ch.onclick = () => { ta.value = ch.dataset.q; ta.focus(); };
  });
  const doSend = () => {
    const q = (ta.value || '').trim();
    if (!q) return;
    ta.value = '';
    handleDeepDiveQuery(sys, q);
  };
  send.onclick = doSend;
  ta.onkeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); }
  };
}

function ddAppendMessage(role, text, opts) {
  const messages = document.getElementById('dd-messages');
  if (!messages) return null;
  const div = document.createElement('div');
  div.className = `dd-message ${role}${opts && opts.error ? ' error' : ''}`;
  if (opts && opts.html) div.innerHTML = text;
  else div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

async function handleDeepDiveQuery(sys, q) {
  ddAppendMessage('user', q);

  if (!aiHasKey()) {
    aiOpenKeyModal();
    // Poll for key save, then continue automatically.
    const startedAt = Date.now();
    const interval = setInterval(() => {
      if (aiHasKey()) {
        clearInterval(interval);
        runDeepDive(sys, q);
      } else if (Date.now() - startedAt > 5 * 60 * 1000) {
        clearInterval(interval);
      }
    }, 400);
    return;
  }
  runDeepDive(sys, q);
}

async function runDeepDive(sys, q) {
  const send = document.getElementById('dd-send');
  if (send) send.disabled = true;

  const loading = ddAppendMessage('assistant', 'Generating deep dive<span class="ai-dots"><span>.</span><span>.</span><span>.</span></span>', { html: true });

  try {
    const prompts = aiBuildDeepDivePrompt(sys, q);
    const raw = await aiCallLLM(prompts);

    // Try to detect explicit out-of-scope payload first.
    let oos = null;
    try {
      const t = (raw || '').trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
      const first = t.indexOf('{'), last = t.lastIndexOf('}');
      if (first >= 0 && last > first) {
        const candidate = JSON.parse(t.slice(first, last + 1));
        if (candidate && candidate.error === 'out-of-scope') oos = candidate;
      }
    } catch (_) { /* ignore */ }

    if (oos) {
      if (loading) loading.remove();
      const hint = ddSamplesFor(sys).slice(0, 2).join(' | ');
      ddAppendMessage('assistant', `That question doesn't seem related to ${sys.title}. Try something like: ${hint}`, { error: true });
      return;
    }

    const data = aiParseResponse(raw);
    const dd = buildDeepDive(sys, q, data);
    PLAYGROUND.deepDives.push(dd);
    renderDeepDiveSection(dd);
    if (loading) loading.remove();
    ddAppendMessage('assistant', `Generated flow: ${dd.title}`);
  } catch (err) {
    if (loading) loading.remove();
    const msg = (err && /network|fetch/i.test(String(err.message || ''))) ? 'Network error. Please retry.'
      : (err && /JSON|parse|shape/i.test(String(err.message || ''))) ? "I couldn't parse that response. Try rephrasing your question."
      : `Error: ${err && err.message ? err.message : 'unknown'}`;
    ddAppendMessage('assistant', msg, { error: true });
  } finally {
    if (send) send.disabled = false;
  }
}

function aiBuildDeepDivePrompt(sys, userQuestion) {
  const existing = (FLOWS[sys.id]?.steps || []).map(s => s.title).join(' | ') || '(none available)';
  const system = "You are a senior distributed-systems architect explaining an internal subsystem of " + sys.title + ". "
    + "The user asked: " + userQuestion + ". Produce a production-grade deep-dive flow showing ONLY how " + sys.title + " handles this specific scenario. "
    + "Every node MUST be a real service/component in a " + sys.title + "-like architecture. Every step label and description must reference " + sys.title + " concretely. "
    + "Do NOT produce a generic flow that could apply to any company.\n\n"
    + "If the question is unrelated to " + sys.title + ", respond with a raw JSON object of shape {\"error\":\"out-of-scope\",\"reason\":\"...\"} and nothing else.\n\n"
    + "Otherwise output ONE raw JSON object (no markdown fences) with this exact schema:\n"
    + "{\n"
    + "  \"title\": \"<concise flow title under 60 chars, phrased as the user question>\",\n"
    + "  \"description\": \"<one-sentence overview>\",\n"
    + "  \"nodes\": [ {\"id\":\"<kebab-case id>\",\"label\":\"<<=18 chars>\",\"type\":\"<client|api|store|queue|cdn|external>\"} ],\n"
    + "  \"steps\": [ {\"title\":\"<short step title, <=50 chars>\",\"desc\":\"<3-5 sentences of real technical substance>\",\"active\":[\"id\",...],\"edges\":[[\"from\",\"to\",\"<short verb label>\"]]} ]\n"
    + "}\n\n"
    + "DEPTH REQUIREMENTS (apply ALL):\n"
    + "- Minimum 8 steps, ideally 8-12. Break phases into granular sub-steps.\n"
    + "- Minimum 7 nodes, ideally 8-14. Include caches, queues, metadata stores, CDNs, external services, observability.\n"
    + "- Cover the happy path AND at least one retry/backpressure/failure handling step.\n"
    + "- Each step's desc must be 3-5 sentences with protocols, data formats, invariants, consistency, retry, failure modes. No filler.\n"
    + "- Each step should light up 2-5 nodes in active[] and have 1-4 edges.\n"
    + "- Edge labels must be concrete verbs or payloads (e.g. \"POST /v1/charges\", \"enqueue\", \"ack\").\n\n"
    + "CONTEXT — the product's top-level flow already covers these steps, so do NOT duplicate them; focus on the specific subsystem the user asked about:\n"
    + existing + "\n\n"
    + "VALIDITY: every id used in active[] or edges MUST exist in nodes[]. No duplicates. kebab-case ids only. Return JSON ONLY.";
  return { system: system, user: "Question: " + userQuestion };
}

// Build a self-contained deep-dive object with its own precomputed layouts.
function buildDeepDive(sys, question, data) {
  const id = 'dd-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

  // Normalise steps — if no edges, chain active[] like aiInjectFlow does.
  const steps = (data.steps || []).map(s => {
    const active = (s.active || []).slice();
    let edges = (s.edges || []).slice();
    if (edges.length === 0 && active.length >= 2) {
      for (let i = 0; i < active.length - 1; i++) edges.push([active[i], active[i + 1], '']);
    }
    return { title: s.title || 'Step', desc: s.desc || '', active, edges };
  });

  const ordered = aiOrderNodes(data.nodes, steps);
  const primaryPath = ordered.map(n => n.id);
  const baselineEdges = [];
  for (let k = 0; k < primaryPath.length - 1; k++) baselineEdges.push([primaryPath[k], primaryPath[k + 1]]);

  // System layout
  const sysW = 1200, sysH = 700;
  const posS = aiAutoLayout(data.nodes, steps, sysW, sysH, 140, 110);
  const sysNodes = {};
  data.nodes.forEach(nd => {
    const p = posS[nd.id] || { x: sysW / 2, y: sysH / 2 };
    sysNodes[nd.id] = { x: p.x, y: p.y, label: nd.label };
  });
  const systemLayout = {
    viewBox: `0 0 ${sysW} ${sysH}`,
    nodes: sysNodes,
    baselineEdges: baselineEdges.slice(),
    primaryPath: primaryPath.slice(),
  };

  // Arch layout
  const archW = 1420, archH = 760;
  const posA = aiAutoLayout(data.nodes, steps, archW, archH, 120, 160);
  const archNodes = {};
  data.nodes.forEach(nd => {
    const p = posA[nd.id] || { x: archW / 2, y: archH / 2 };
    archNodes[nd.id] = { x: Math.round(p.x - 105), y: Math.round(p.y - 27), label: nd.label };
  });
  const archLayout = {
    viewBox: `0 0 ${archW} ${archH}`,
    backendLabel: `${sys.title} - ${data.title || 'Deep Dive'}`,
    backend: { x: 40, y: 70, w: archW - 80, h: archH - 140 },
    nodes: archNodes,
    primaryPath: primaryPath.slice(),
    stepEdges: (stepIdx) => {
      const s = steps[stepIdx];
      if (!s) return [];
      return (s.edges || []).map(e => [e[0], e[1], e[2] || '']);
    },
  };

  return {
    id,
    question,
    title: data.title || question,
    nodes: data.nodes,
    steps,
    stepIdx: 0,
    tab: 'system',
    collapsed: false,
    systemLayout,
    archLayout,
  };
}

function renderDeepDiveSection(dd) {
  const host = document.getElementById('pg-deep-dives');
  if (!host) return;
  const idx = PLAYGROUND.deepDives.indexOf(dd) + 1;
  const sec = document.createElement('section');
  sec.className = 'dd-section';
  sec.dataset.id = dd.id;
  sec.innerHTML = `
    <div class="dd-section-header">
      <span class="dd-chev">▼</span>
      <span class="dd-section-title">Deep dive ${idx}: ${escapeXml(dd.question)}</span>
      <div class="dd-section-tabs">
        <button class="dd-section-tab active" data-tab="system">System</button>
        <button class="dd-section-tab" data-tab="arch">Architecture</button>
      </div>
    </div>
    <div class="dd-section-body">
      <div class="dd-section-steps"></div>
      <div class="dd-section-diagram">
        <svg class="dd-svg" xmlns="http://www.w3.org/2000/svg"></svg>
      </div>
    </div>
  `;
  host.appendChild(sec);

  const header = sec.querySelector('.dd-section-header');
  const tabsEl = sec.querySelectorAll('.dd-section-tab');

  // Toggle collapse when clicking on header text / chevron (but not tab buttons).
  header.addEventListener('click', (e) => {
    if (e.target.closest('.dd-section-tab')) return;
    dd.collapsed = !dd.collapsed;
    sec.classList.toggle('collapsed', dd.collapsed);
  });

  tabsEl.forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      dd.tab = b.dataset.tab;
      tabsEl.forEach(x => x.classList.toggle('active', x.dataset.tab === dd.tab));
      renderDeepDiveDiagram(dd, sec);
    };
  });

  renderDeepDiveStepList(dd, sec);
  renderDeepDiveDiagram(dd, sec);

  // Scroll into view
  setTimeout(() => sec.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
}

function renderDeepDiveStepList(dd, sec) {
  const host = sec.querySelector('.dd-section-steps');
  host.innerHTML = dd.steps.map((s, i) => (
    `<button class="dd-step ${i === dd.stepIdx ? 'active' : ''}" data-i="${i}">
      <span class="n">${i + 1}</span><span class="t">${escapeXml(s.title)}</span>
    </button>`
  )).join('');
  host.querySelectorAll('[data-i]').forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      dd.stepIdx = Number(b.dataset.i);
      host.querySelectorAll('.dd-step').forEach(x => x.classList.toggle('active', Number(x.dataset.i) === dd.stepIdx));
      renderDeepDiveDiagram(dd, sec);
    };
  });
}

function renderDeepDiveDiagram(dd, sec) {
  const svg = sec.querySelector('.dd-svg');
  if (!svg) return;
  const step = dd.steps[dd.stepIdx];
  if (dd.tab === 'system') renderDDSystem(svg, dd.systemLayout, step);
  else renderDDArch(svg, dd.archLayout, step);
}

// Simplified system-style renderer against a provided SVG element.
function renderDDSystem(svg, layout, step) {
  svg.setAttribute('viewBox', layout.viewBox || '0 0 1200 700');
  const active = new Set(step?.active || []);
  const stepEdges = step?.edges || [];
  const eActive = (a, b) => stepEdges.some(e => e[0] === a && e[1] === b);
  const ACTIVE_COL = 'rgba(45,212,191,1)';
  const NODE_R = 42;

  const trimEdge = (x1, y1, x2, y2, r) => {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len < r * 2 + 10) return null;
    const nx = dx / len, ny = dy / len;
    return [x1 + nx * r, y1 + ny * r, x2 - nx * r, y2 - ny * r];
  };

  const arrow = (x1, y1, x2, y2, on) => {
    const base = `<path d="M${x1} ${y1} L ${x2} ${y2}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 9"/>`;
    if (!on) return base;
    const mid = `ddm-${Math.abs((x1*13+y1*7+x2*11+y2*5)|0)}`;
    return base + `<defs><marker id="${mid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="${ACTIVE_COL}"/></marker></defs>
      <path d="M${x1} ${y1} L ${x2} ${y2}" fill="none" stroke="${ACTIVE_COL}" stroke-width="2.5" stroke-linecap="round" opacity="0.88" marker-end="url(#${mid})"/>`;
  };

  const node = (id, cx, cy, label) => {
    const on = active.has(id);
    if (on) {
      return `<circle cx="${cx}" cy="${cy}" r="${NODE_R + 10}" fill="none" stroke="${ACTIVE_COL}" stroke-width="1.5" opacity="0.35"/>
        <circle cx="${cx}" cy="${cy}" r="${NODE_R}" fill="rgba(20,184,166,0.14)" stroke="${ACTIVE_COL}" stroke-width="2.5"/>
        <text x="${cx}" y="${cy + 5}" text-anchor="middle" fill="rgba(230,255,252,0.96)" font-size="12" font-family="Inter, Arial" font-weight="800">${escapeXml(label)}</text>`;
    }
    return `<circle cx="${cx}" cy="${cy}" r="${NODE_R}" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.28)" stroke-width="1.5"/>
      <text x="${cx}" y="${cy + 5}" text-anchor="middle" fill="rgba(240,240,248,0.72)" font-size="12" font-family="Inter, Arial" font-weight="600">${escapeXml(label)}</text>`;
  };

  let edgesSvg = '';
  for (const [a, b] of layout.baselineEdges) {
    const na = layout.nodes[a], nb = layout.nodes[b];
    if (!na || !nb) continue;
    const pts = trimEdge(na.x, na.y, nb.x, nb.y, NODE_R + 4);
    if (!pts) continue;
    edgesSvg += arrow(pts[0], pts[1], pts[2], pts[3], false);
  }
  for (const [a, b] of stepEdges) {
    const na = layout.nodes[a], nb = layout.nodes[b];
    if (!na || !nb) continue;
    const pts = trimEdge(na.x, na.y, nb.x, nb.y, NODE_R + 4);
    if (!pts) continue;
    edgesSvg += arrow(pts[0], pts[1], pts[2], pts[3], eActive(a, b));
  }

  let nodesSvg = '';
  for (const [id, nd] of Object.entries(layout.nodes)) {
    nodesSvg += node(id, nd.x, nd.y, nd.label);
  }

  svg.innerHTML = `
    <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0)"/>
    ${edgesSvg}
    ${nodesSvg}
  `;
}

function renderDDArch(svg, layout, step) {
  svg.setAttribute('viewBox', layout.viewBox || '0 0 1420 760');
  const active = new Set(step?.active || []);
  const ACTIVE_COL = 'rgba(45,212,191,1)';
  const SVC_W = 210, SVC_H = 54;

  const renderBox = (id, nd) => {
    const on = active.has(id);
    return `<rect x="${nd.x}" y="${nd.y}" width="${SVC_W}" height="${SVC_H}" rx="10"
      fill="${on ? 'rgba(20,184,166,0.14)' : 'rgba(255,255,255,0.04)'}"
      stroke="${on ? ACTIVE_COL : 'rgba(255,255,255,0.22)'}" stroke-width="${on ? 2 : 1.5}"/>
      <text x="${nd.x + 12}" y="${nd.y + 33}" fill="${on ? 'rgba(230,255,252,0.96)' : 'rgba(240,240,248,0.72)'}"
        font-size="13" font-family="Inter, Arial" font-weight="${on ? 800 : 600}">${escapeXml(nd.label)}</text>`;
  };

  const edgePoints = (na, nb) => {
    const ax = na.x + SVC_W / 2, ay = na.y + SVC_H / 2;
    const bx = nb.x + SVC_W / 2, by = nb.y + SVC_H / 2;
    const dx = bx - ax, dy = by - ay;
    let x1, y1, x2, y2;
    if (Math.abs(dx) >= Math.abs(dy)) {
      if (dx > 0) { x1 = na.x + SVC_W; x2 = nb.x; } else { x1 = na.x; x2 = nb.x + SVC_W; }
      y1 = ay; y2 = by;
    } else {
      if (dy > 0) { y1 = na.y + SVC_H; y2 = nb.y; } else { y1 = na.y; y2 = nb.y + SVC_H; }
      x1 = ax; x2 = bx;
    }
    return [x1, y1, x2, y2];
  };

  const drawConn = (x1, y1, x2, y2, label, on) => {
    const uid = `ddc${Math.abs((x1*13+y1*7+x2*11+y2*5)|0)}`;
    const adx = Math.abs(x2 - x1), ady = Math.abs(y2 - y1);
    let d;
    if (adx < 6 || ady < 6) d = `M${x1} ${y1} L ${x2} ${y2}`;
    else { const mx = (x1 + x2) / 2; d = `M${x1} ${y1} L ${mx} ${y1} L ${mx} ${y2} L ${x2} ${y2}`; }
    const labelSvg = label ? `<text x="${(x1+x2)/2}" y="${Math.min(y1,y2)-6}" text-anchor="middle" fill="${on ? ACTIVE_COL : 'rgba(255,255,255,0.35)'}" font-size="10" font-weight="700">${escapeXml(label)}</text>` : '';
    return `<defs><marker id="${uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="${on ? ACTIVE_COL : 'rgba(255,255,255,0.25)'}"/></marker></defs>
      <path d="${d}" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1.5" stroke-dasharray="4 7"/>
      <path d="${d}" fill="none" stroke="${on ? ACTIVE_COL : 'rgba(255,255,255,0.20)'}" stroke-width="${on ? 2.5 : 1.5}" opacity="${on ? 0.9 : 0.55}" marker-end="url(#${uid})"/>
      ${labelSvg}`;
  };

  const bk = layout.backend;
  const backendSvg = bk
    ? `<rect x="${bk.x}" y="${bk.y}" width="${bk.w}" height="${bk.h}" rx="18" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.13)" stroke-width="1.5" stroke-dasharray="6 5"/>
       <text x="${bk.x + 16}" y="${bk.y + 24}" fill="rgba(240,240,248,0.45)" font-size="12" font-weight="700" letter-spacing="0.08em">${escapeXml((layout.backendLabel || '').toUpperCase())}</text>`
    : '';

  // Baseline from primaryPath
  let baselineSvg = '';
  const path = layout.primaryPath || [];
  for (let i = 0; i < path.length - 1; i++) {
    const na = layout.nodes[path[i]], nb = layout.nodes[path[i + 1]];
    if (!na || !nb) continue;
    const [x1, y1, x2, y2] = edgePoints(na, nb);
    baselineSvg += drawConn(x1, y1, x2, y2, '', false);
  }

  const stepIdx = PLAYGROUND.deepDives.findIndex(dd => dd.archLayout === layout);
  // The function signature takes our step object, so use active edges from step directly:
  const activeEdges = (step?.edges || []);
  let activeSvg = '';
  for (const e of activeEdges) {
    const na = layout.nodes[e[0]], nb = layout.nodes[e[1]];
    if (!na || !nb) continue;
    const [x1, y1, x2, y2] = edgePoints(na, nb);
    activeSvg += drawConn(x1, y1, x2, y2, e[2] || '', true);
  }

  const nodesSvg = Object.entries(layout.nodes).map(([id, nd]) => renderBox(id, nd)).join('');

  svg.innerHTML = `${backendSvg}${baselineSvg}${activeSvg}${nodesSvg}`;
}

// ---------- PDF export ----------
async function exportPlaygroundPDF() {
  if (typeof html2pdf === 'undefined') {
    alert('PDF library failed to load. Please refresh and try again.');
    return;
  }
  const sys = PLAYGROUND.sys;
  if (!sys) return;

  const host = document.createElement('div');
  host.className = 'pdf-print-host';
  document.body.appendChild(host);

  const mainSteps = getProductSteps(sys) || [];
  const sysLayout = systemLayoutFor(sys);
  const archLayout = archLayoutFor(sys);

  const stepsListHtml = (steps) => (
    '<div class="pdf-step-list">' +
    steps.map((s, i) => `<div class="pdf-step"><b>Step ${i + 1}</b> · ${escapeXml(s.title || '')}${s.desc ? ` — ${escapeXml(s.desc)}` : ''}</div>`).join('') +
    '</div>'
  );

  // Build cover + main
  const cover = document.createElement('div');
  cover.className = 'pdf-page';
  cover.innerHTML = `
    <div class="pdf-brand">FlowVis</div>
    <div class="pdf-title">${escapeXml(sys.title)}</div>
    <div class="pdf-meta">How ${escapeXml(sys.title)} works · ${mainSteps.length} steps · generated ${new Date().toLocaleDateString()}</div>
    <div class="pdf-section-title">Overview</div>
    ${stepsListHtml(mainSteps)}
  `;
  host.appendChild(cover);

  // Main system + arch pages — render via temporary svg
  const renderToPdfSvg = (html, title, subtitle) => {
    const page = document.createElement('div');
    page.className = 'pdf-page';
    page.innerHTML = `
      <div class="pdf-brand">FlowVis</div>
      <div class="pdf-section-title">${escapeXml(title)}</div>
      ${subtitle ? `<div class="pdf-meta">${escapeXml(subtitle)}</div>` : ''}
      <div class="pdf-diagram">${html}</div>
    `;
    return page;
  };

  // Helper: capture current main SVG state at a representative step (middle step)
  const midIdx = Math.max(0, Math.floor(mainSteps.length / 2));
  const savedStep = PLAYGROUND.step, savedTab = PLAYGROUND.tab;

  // Render system diagram at mid step
  PLAYGROUND.step = midIdx;
  PLAYGROUND.tab = 'system';
  if (sysLayout) renderSystemDiagram(sys, mainSteps[midIdx]);
  const sysSvg = document.getElementById('wa-diagram');
  if (sysSvg) {
    const cloned = sysSvg.cloneNode(true);
    cloned.removeAttribute('id');
    host.appendChild(renderToPdfSvg(cloned.outerHTML, `${sys.title} — System Flow`, `Step ${midIdx + 1}: ${mainSteps[midIdx]?.title || ''}`));
  }

  // Render architecture diagram at mid step
  PLAYGROUND.tab = 'arch';
  if (archLayout) renderArchitectureDiagram(sys, mainSteps[midIdx]);
  const archSvg = document.getElementById('wa-arch');
  if (archSvg) {
    const cloned = archSvg.cloneNode(true);
    cloned.removeAttribute('id');
    host.appendChild(renderToPdfSvg(cloned.outerHTML, `${sys.title} — Architecture Flow`, `Step ${midIdx + 1}: ${mainSteps[midIdx]?.title || ''}`));
  }

  // Restore main state
  PLAYGROUND.step = savedStep;
  PLAYGROUND.tab = savedTab;
  renderPlayground();

  // Deep dives
  (PLAYGROUND.deepDives || []).forEach((dd, i) => {
    const midDD = Math.max(0, Math.floor(dd.steps.length / 2));
    const sysSvgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    sysSvgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    renderDDSystem(sysSvgEl, dd.systemLayout, dd.steps[midDD]);
    const archSvgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    archSvgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    renderDDArch(archSvgEl, dd.archLayout, dd.steps[midDD]);

    const page = document.createElement('div');
    page.className = 'pdf-page';
    page.innerHTML = `
      <div class="pdf-brand">FlowVis</div>
      <div class="pdf-section-title">Deep dive ${i + 1}</div>
      <div class="pdf-question">${escapeXml(dd.question)}</div>
      ${stepsListHtml(dd.steps)}
      <div class="pdf-section-title">System Flow</div>
      <div class="pdf-diagram">${sysSvgEl.outerHTML}</div>
      <div class="pdf-section-title">Architecture Flow</div>
      <div class="pdf-diagram">${archSvgEl.outerHTML}</div>
    `;
    host.appendChild(page);
  });

  try {
    await html2pdf().set({
      margin: [10, 10, 10, 10],
      filename: `flowvis-${sys.id}-deepdive.pdf`,
      image: { type: 'jpeg', quality: 0.92 },
      html2canvas: { scale: 2, backgroundColor: '#0d0d12', useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    }).from(host).save();
  } catch (e) {
    alert('PDF export failed: ' + (e && e.message ? e.message : 'unknown error'));
  } finally {
    host.remove();
  }
}

// ---------- Utils ----------
function abbr(title) {
  const parts = title.replace(/\(.*?\)/g, '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function catLabel(catId) {
  return CATEGORIES.find(c => c.id === catId)?.label || 'General';
}

// ---------- Init ----------
function initNavBindings() {
  // Hook up existing fixed nav buttons if present
  const navSearch = document.getElementById('nav-search-input');
  if (navSearch) {
    navSearch.addEventListener('input', () => {
      // quick jump in place: if matches a product exactly, open it
      const q = navSearch.value.trim();
      if (!q) return;
      const found = findSystem(q);
      if (found && found.title.toLowerCase() === q.toLowerCase()) openProduct(found);
    });
    navSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const found = findSystem(navSearch.value);
        if (found) openProduct(found);
      }
    });
  }

  // Keyboard: Cmd+K focuses nav search
  window.addEventListener('keydown', (e) => {
    const isMac = navigator.platform.toLowerCase().includes('mac');
    if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      navSearch?.focus();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  mountShell();
  aiLoadKey();
  renderHome();
  initNavBindings();

  // Dismiss the loading screen
  const loader = document.getElementById('fv-loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 350);
  }

  // Respect initial routing set by index.html (/?page=preview)
  const initial = window.__FLOWVIS_INITIAL_PAGE__;
  if (initial) showPage(initial);

  // Hash-based routing for deep links like #/play/stripe
  const handleHash = () => {
    const h = window.location.hash || '';
    const m = h.match(/^#\/play\/([\w-]+)/);
    if (m) {
      const id = m[1];
      const sys = SYSTEMS.find(s => s.id === id)
        || SYSTEMS.find(s => s.id === normId(id));
      if (sys) openProduct(sys);
    }
  };
  window.addEventListener('hashchange', handleHash);
  handleHash();
});
