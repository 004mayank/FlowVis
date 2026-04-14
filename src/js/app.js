/**
 * FlowVis - Rewritten App (clean)
 * - simple SPA-style page router
 * - homepage + explore grid
 * - preview hub
 * - hero rotating product (1.5s)
 */

import { SYSTEMS, addSystem, CATEGORIES, slugify } from '../data/systems.js';
import { logoForSystemId } from '../data/logos.js';
import { flowForSystem } from '../data/flows.js';

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
      <button class="pg-back" id="pg-close">← Back</button>
      <div class="pg-title" id="pg-title"></div>
      <div class="pg-tabs">
        <button class="pg-tab active" data-tab="system">System Flow</button>
        <button class="pg-tab" data-tab="ui">UI Flow</button>
        <button class="pg-tab" data-tab="arch">Architecture Flow</button>
      </div>
    </div>

    <div class="pg-body">
      <aside class="pg-left">
        <div class="pg-desc" id="pg-desc"></div>
        <div class="pg-steps" id="pg-steps"></div>
        <div class="pg-controls">
          <button class="pg-btn" id="pg-prev">Prev</button>
          <button class="pg-btn primary" id="pg-play">Play</button>
          <button class="pg-btn" id="pg-next">Next</button>
        </div>
        <div class="pg-speed" id="pg-speed">
          <button class="sp" data-speed="0.5">0.5x</button>
          <button class="sp active" data-speed="1">1x</button>
          <button class="sp" data-speed="2">2x</button>
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
            <button class="z" id="z-reset">Reset</button>
          </div>
        </div>
        <div class="pg-panel hidden" id="pg-ui">
          <div class="pg-placeholder">
            UI Flow coming soon.
          </div>
        </div>
        <div class="pg-panel pg-system hidden" id="pg-arch">
          <div class="pg-canvas-wrap">
            <svg id="wa-arch" viewBox="0 0 1200 760" xmlns="http://www.w3.org/2000/svg"></svg>
          </div>
          <div class="pg-zoom">
            <button class="z" id="za-in">+</button>
            <button class="z" id="za-out">−</button>
            <button class="z" id="za-reset">Reset</button>
          </div>
        </div>
      </main>
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
  stopPlayground();

  const overlay = document.getElementById('playground');
  overlay.classList.add('open');

  // Lock background page scrolling while overlay is open
  document.body.dataset.prevOverflow = document.body.style.overflow || '';
  document.body.style.overflow = 'hidden';

  // Title: logo + product name (no "Playground")
  const titleEl = document.getElementById('pg-title');
  const logo = logoForSystemId(sys.id);
  titleEl.innerHTML = `${logo ? `<span class="pg-logo">${logo}</span>` : ''}<span>${sys.title}</span>`;
  // Step description is shown above step list (like reference)
  document.getElementById('pg-desc').textContent = '';

  // Tabs
  overlay.querySelectorAll('.pg-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === 'system');
  });
  document.getElementById('pg-system').classList.remove('hidden');
  document.getElementById('pg-ui').classList.add('hidden');

  // Steps
  const steps = getProductSteps(sys);
  const host = document.getElementById('pg-steps');
  host.innerHTML = steps.map((s,i)=>`<button class="pg-step ${i===0?'active':''}" data-step="${i}"><span class="n">${i+1}</span><span class="t">${s.title}</span></button>`).join('');
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
    document.getElementById('pg-ui').classList.toggle('hidden', PLAYGROUND.tab !== 'ui');
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
  document.getElementById('playground').classList.remove('open');

  // Restore background scrolling
  const prev = document.body.dataset.prevOverflow;
  document.body.style.overflow = prev || '';
}

function startPlayground() {
  const steps = getProductSteps(PLAYGROUND.sys);
  document.getElementById('pg-play').textContent = 'Pause';
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
  if (btn) btn.textContent = 'Play';
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
  const d = document.getElementById('pg-desc');
  if (d) d.textContent = s?.desc || '';

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

// System diagram layouts per product id.
// Each layout defines nodes (id -> {x,y,label,colorKey}).
const SYSTEM_LAYOUTS = {
  whatsapp: {
    viewBox: '0 0 1000 640',
    nodes: {
      sender: { x: 120, y: 160, label: 'Sender', colorKey: 'client' },
      crypto: { x: 300, y: 160, label: 'Encrypt', colorKey: 'api' },
      keybundle: { x: 300, y: 320, label: 'Keys', colorKey: 'store' },
      relay: { x: 520, y: 220, label: 'Relay', colorKey: 'api' },
      push: { x: 720, y: 220, label: 'Push', colorKey: 'external' },
      decrypt: { x: 720, y: 360, label: 'Decrypt', colorKey: 'api' },
      recipient: { x: 880, y: 360, label: 'Recipient', colorKey: 'client' }
    }
  },

  instagram: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 240, label: 'App', colorKey: 'client' },
      api: { x: 320, y: 240, label: 'API', colorKey: 'api' },
      auth: { x: 320, y: 420, label: 'Auth', colorKey: 'api' },
      feed: { x: 520, y: 180, label: 'Feed', colorKey: 'api' },
      rank: { x: 520, y: 300, label: 'Ranking', colorKey: 'api' },
      safety: { x: 520, y: 420, label: 'Safety', colorKey: 'api' },
      media: { x: 720, y: 180, label: 'Media', colorKey: 'store' },
      cdn: { x: 880, y: 180, label: 'CDN', colorKey: 'cdn' },
      write: { x: 720, y: 320, label: 'Writes', colorKey: 'store' },
      upload: { x: 720, y: 460, label: 'Upload', colorKey: 'api' },
      obj: { x: 880, y: 460, label: 'Object Store', colorKey: 'store' },
      fanout: { x: 880, y: 320, label: 'Fanout', colorKey: 'queue' },
      notify: { x: 880, y: 380, label: 'Notify', colorKey: 'external' },
      realtime: { x: 720, y: 560, label: 'Realtime', colorKey: 'stream' }
    }
  },

  uber: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 280, label: 'Rider App', colorKey: 'client' },
      driver: { x: 120, y: 440, label: 'Driver App', colorKey: 'client' },
      api: { x: 320, y: 280, label: 'API', colorKey: 'api' },
      auth: { x: 320, y: 440, label: 'Auth', colorKey: 'api' },
      maps: { x: 520, y: 180, label: 'Maps', colorKey: 'external' },
      pricing: { x: 520, y: 280, label: 'Pricing', colorKey: 'api' },
      dispatch: { x: 520, y: 420, label: 'Dispatch', colorKey: 'api' },
      location: { x: 720, y: 420, label: 'Location', colorKey: 'stream' },
      match: { x: 720, y: 520, label: 'Matching', colorKey: 'api' },
      routing: { x: 720, y: 280, label: 'Routing', colorKey: 'api' },
      realtime: { x: 880, y: 420, label: 'Realtime', colorKey: 'stream' },
      payments: { x: 880, y: 180, label: 'Payments', colorKey: 'api' },
      ledger: { x: 880, y: 280, label: 'Ledger', colorKey: 'store' },
      payouts: { x: 880, y: 520, label: 'Payouts', colorKey: 'api' },
      support: { x: 720, y: 600, label: 'Support', colorKey: 'external' }
    }
  },

  netflix: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 280, label: 'Client', colorKey: 'client' },
      home: { x: 320, y: 200, label: 'Home API', colorKey: 'api' },
      recos: { x: 520, y: 200, label: 'Recos', colorKey: 'api' },
      rank: { x: 520, y: 320, label: 'Ranking', colorKey: 'api' },
      ab: { x: 520, y: 440, label: 'Experiments', colorKey: 'api' },
      catalog: { x: 320, y: 360, label: 'Catalog', colorKey: 'store' },
      drm: { x: 520, y: 520, label: 'DRM/License', colorKey: 'api' },
      cdn: { x: 720, y: 280, label: 'CDN', colorKey: 'cdn' },
      player: { x: 720, y: 420, label: 'Player', colorKey: 'client' },
      metrics: { x: 880, y: 420, label: 'QoE Metrics', colorKey: 'stream' },
      analytics: { x: 880, y: 520, label: 'Analytics', colorKey: 'store' }
    }
  },

  stripe: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 240, label: 'Client', colorKey: 'client' },
      checkout: { x: 320, y: 240, label: 'Checkout', colorKey: 'api' },
      merchant: { x: 120, y: 420, label: 'Merchant', colorKey: 'client' },
      api: { x: 320, y: 420, label: 'Stripe API', colorKey: 'api' },
      pi: { x: 520, y: 420, label: 'PaymentIntent', colorKey: 'store' },
      sca: { x: 520, y: 240, label: '3DS/SCA', colorKey: 'external' },
      acq: { x: 720, y: 420, label: 'Acquirer', colorKey: 'external' },
      network: { x: 880, y: 420, label: 'Card Network', colorKey: 'network' },
      events: { x: 520, y: 560, label: 'Events', colorKey: 'queue' },
      webhook: { x: 720, y: 560, label: 'Webhooks', colorKey: 'external' },
      settle: { x: 720, y: 320, label: 'Settlement', colorKey: 'api' },
      ledger: { x: 880, y: 320, label: 'Ledger', colorKey: 'store' },
      reports: { x: 880, y: 200, label: 'Reports', colorKey: 'store' },
      disputes: { x: 880, y: 560, label: 'Disputes', colorKey: 'api' }
    }
  },

  amazon: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 280, label: 'Client', colorKey: 'client' },
      search: { x: 320, y: 180, label: 'Search', colorKey: 'api' },
      catalog: { x: 520, y: 180, label: 'Catalog', colorKey: 'store' },
      reviews: { x: 520, y: 300, label: 'Reviews', colorKey: 'store' },
      pricing: { x: 520, y: 420, label: 'Pricing', colorKey: 'api' },
      cart: { x: 320, y: 420, label: 'Cart', colorKey: 'store' },
      promo: { x: 320, y: 540, label: 'Promotions', colorKey: 'api' },
      checkout: { x: 720, y: 180, label: 'Checkout', colorKey: 'api' },
      orders: { x: 720, y: 300, label: 'Orders', colorKey: 'store' },
      payments: { x: 720, y: 420, label: 'Payments', colorKey: 'api' },
      wms: { x: 880, y: 300, label: 'Warehouse', colorKey: 'external' },
      carrier: { x: 880, y: 420, label: 'Carrier', colorKey: 'external' },
      tracking: { x: 880, y: 180, label: 'Tracking', colorKey: 'stream' },
      notify: { x: 880, y: 540, label: 'Notify', colorKey: 'external' },
      returns: { x: 720, y: 540, label: 'Returns', colorKey: 'api' },
      refunds: { x: 520, y: 540, label: 'Refunds', colorKey: 'api' },
      inventory: { x: 520, y: 420, label: 'Inventory', colorKey: 'store' }
    }
  },

  'google-drive': {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 280, label: 'Client', colorKey: 'client' },
      metadata: { x: 320, y: 220, label: 'Metadata', colorKey: 'store' },
      sync: { x: 520, y: 220, label: 'Sync', colorKey: 'stream' },
      upload: { x: 320, y: 380, label: 'Upload', colorKey: 'api' },
      storage: { x: 520, y: 380, label: 'Storage', colorKey: 'store' },
      sharing: { x: 720, y: 180, label: 'Sharing', colorKey: 'api' },
      authz: { x: 720, y: 300, label: 'AuthZ/ACL', colorKey: 'api' },
      realtime: { x: 720, y: 420, label: 'Realtime', colorKey: 'stream' },
      merge: { x: 880, y: 420, label: 'Merge', colorKey: 'api' },
      index: { x: 520, y: 520, label: 'Index', colorKey: 'store' },
      search: { x: 720, y: 520, label: 'Search', colorKey: 'api' },
      versions: { x: 880, y: 300, label: 'Versions', colorKey: 'store' },
      audit: { x: 880, y: 220, label: 'Audit', colorKey: 'store' },
      cdn: { x: 880, y: 520, label: 'CDN', colorKey: 'cdn' }
    }
  },

  github: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 280, label: 'Client', colorKey: 'client' },
      auth: { x: 320, y: 180, label: 'Auth', colorKey: 'api' },
      repo: { x: 320, y: 320, label: 'Repo Service', colorKey: 'api' },
      git: { x: 520, y: 320, label: 'Git Storage', colorKey: 'store' },
      cache: { x: 720, y: 320, label: 'Cache', colorKey: 'cache' },
      pr: { x: 520, y: 180, label: 'PRs', colorKey: 'api' },
      actions: { x: 720, y: 180, label: 'Actions', colorKey: 'queue' },
      runner: { x: 880, y: 180, label: 'Runner', colorKey: 'external' },
      comments: { x: 520, y: 480, label: 'Comments', colorKey: 'store' },
      notify: { x: 720, y: 480, label: 'Notify', colorKey: 'external' },
      deploy: { x: 880, y: 320, label: 'Deploy', colorKey: 'external' },
      security: { x: 720, y: 560, label: 'Security', colorKey: 'api' },
      audit: { x: 880, y: 560, label: 'Audit', colorKey: 'store' }
    }
  },

  doordash: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 280, label: 'Client', colorKey: 'client' },
      search: { x: 320, y: 180, label: 'Discovery', colorKey: 'api' },
      catalog: { x: 520, y: 180, label: 'Catalog/Menu', colorKey: 'store' },
      cart: { x: 320, y: 320, label: 'Cart', colorKey: 'store' },
      pricing: { x: 520, y: 320, label: 'Pricing', colorKey: 'api' },
      promo: { x: 720, y: 320, label: 'Promos', colorKey: 'api' },
      orders: { x: 520, y: 460, label: 'Orders', colorKey: 'store' },
      merchant: { x: 720, y: 460, label: 'Merchant', colorKey: 'external' },
      dispatch: { x: 320, y: 460, label: 'Dispatch', colorKey: 'api' },
      location: { x: 320, y: 560, label: 'Location', colorKey: 'stream' },
      match: { x: 520, y: 560, label: 'Matching', colorKey: 'api' },
      routing: { x: 720, y: 560, label: 'Routing', colorKey: 'api' },
      tracking: { x: 880, y: 180, label: 'Tracking', colorKey: 'stream' },
      realtime: { x: 880, y: 320, label: 'Realtime', colorKey: 'stream' },
      notify: { x: 880, y: 460, label: 'Notify', colorKey: 'external' },
      payments: { x: 880, y: 560, label: 'Payments', colorKey: 'api' },
      ledger: { x: 720, y: 620, label: 'Ledger', colorKey: 'store' },
      support: { x: 880, y: 620, label: 'Support', colorKey: 'external' }
    }
  },

  duolingo: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 280, label: 'Client', colorKey: 'client' },
      lesson: { x: 320, y: 220, label: 'Lesson Content', colorKey: 'store' },
      state: { x: 520, y: 220, label: 'User State', colorKey: 'store' },
      engine: { x: 320, y: 380, label: 'Exercise Engine', colorKey: 'api' },
      rank: { x: 520, y: 380, label: 'Personalization', colorKey: 'api' },
      grade: { x: 720, y: 380, label: 'Grading', colorKey: 'api' },
      recos: { x: 720, y: 220, label: 'Recos', colorKey: 'api' },
      notify: { x: 880, y: 220, label: 'Notify', colorKey: 'external' },
      scheduler: { x: 880, y: 320, label: 'Scheduler', colorKey: 'queue' },
      ab: { x: 520, y: 520, label: 'Experiments', colorKey: 'api' },
      analytics: { x: 720, y: 520, label: 'Analytics', colorKey: 'stream' },
      warehouse: { x: 880, y: 520, label: 'Warehouse', colorKey: 'store' }
    }
  },

  coinbase: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 280, label: 'Client', colorKey: 'client' },
      auth: { x: 320, y: 180, label: 'Auth', colorKey: 'api' },
      risk: { x: 520, y: 180, label: 'Risk', colorKey: 'api' },
      payments: { x: 320, y: 360, label: 'Fiat Rails', colorKey: 'external' },
      ledger: { x: 520, y: 360, label: 'Ledger', colorKey: 'store' },
      custody: { x: 720, y: 360, label: 'Custody', colorKey: 'store' },
      orders: { x: 320, y: 520, label: 'Orders', colorKey: 'api' },
      match: { x: 520, y: 520, label: 'Matching', colorKey: 'api' },
      positions: { x: 720, y: 520, label: 'Positions', colorKey: 'store' },
      wallet: { x: 880, y: 360, label: 'Wallet', colorKey: 'api' },
      network: { x: 880, y: 520, label: 'Blockchain', colorKey: 'network' },
      monitor: { x: 720, y: 620, label: 'Monitoring', colorKey: 'stream' },
      compliance: { x: 880, y: 620, label: 'Compliance', colorKey: 'api' },
      reports: { x: 520, y: 620, label: 'Reports', colorKey: 'store' }
    }
  }

  ,

  paypal: {
    viewBox: '0 0 1000 640',
    primaryPath: ['client','api','risk','routing'],
    primaryBranches: [
      { from: 'routing', to: 'bank' },
      { from: 'routing', to: 'network' },
      { from: 'routing', to: 'ledger' }
    ],
    nodes: {
      client: { x: 120, y: 260, label: 'Client', colorKey: 'client' },
      auth: { x: 320, y: 180, label: 'Auth', colorKey: 'api' },
      funding: { x: 320, y: 340, label: 'Funding Source', colorKey: 'external' },
      api: { x: 520, y: 260, label: 'Payments API', colorKey: 'api' },
      risk: { x: 520, y: 420, label: 'Risk', colorKey: 'api' },
      merchant: { x: 720, y: 180, label: 'Merchant', colorKey: 'external' },
      routing: { x: 720, y: 260, label: 'Routing', colorKey: 'api' },
      bank: { x: 880, y: 260, label: 'Bank Rails', colorKey: 'external' },
      network: { x: 880, y: 340, label: 'Card Network', colorKey: 'network' },
      ledger: { x: 720, y: 420, label: 'Ledger', colorKey: 'store' },
      balances: { x: 880, y: 420, label: 'Balances', colorKey: 'store' },
      notify: { x: 520, y: 560, label: 'Notify', colorKey: 'external' },
      webhook: { x: 720, y: 560, label: 'Webhooks', colorKey: 'external' },
      disputes: { x: 880, y: 560, label: 'Disputes', colorKey: 'api' },
      refunds: { x: 650, y: 680, label: 'Refunds', colorKey: 'api' },
      reports: { x: 950, y: 680, label: 'Reports', colorKey: 'store' }
    }
  },

  revolut: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 260, label: 'Client', colorKey: 'client' },
      kyc: { x: 320, y: 160, label: 'KYC', colorKey: 'api' },
      compliance: { x: 520, y: 160, label: 'Compliance', colorKey: 'api' },
      topup: { x: 320, y: 320, label: 'Top Up', colorKey: 'api' },
      risk: { x: 520, y: 320, label: 'Risk', colorKey: 'api' },
      ledger: { x: 720, y: 320, label: 'Ledger', colorKey: 'store' },
      card: { x: 320, y: 480, label: 'Card Network', colorKey: 'network' },
      auth: { x: 520, y: 480, label: 'Auth', colorKey: 'api' },
      fraud: { x: 720, y: 480, label: 'Fraud', colorKey: 'api' },
      fx: { x: 520, y: 560, label: 'FX', colorKey: 'api' },
      pricing: { x: 720, y: 560, label: 'FX Pricing', colorKey: 'api' },
      statements: { x: 880, y: 320, label: 'Statements', colorKey: 'store' },
      analytics: { x: 880, y: 400, label: 'Analytics', colorKey: 'store' },
      notify: { x: 880, y: 480, label: 'Notify', colorKey: 'external' },
      support: { x: 880, y: 560, label: 'Support', colorKey: 'external' },
      disputes: { x: 720, y: 620, label: 'Disputes', colorKey: 'api' }
    }
  },

  wise: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 260, label: 'Client', colorKey: 'client' },
      quote: { x: 320, y: 180, label: 'Quote', colorKey: 'api' },
      pricing: { x: 520, y: 180, label: 'Pricing', colorKey: 'api' },
      kyc: { x: 320, y: 340, label: 'KYC', colorKey: 'api' },
      funding: { x: 520, y: 340, label: 'Funding', colorKey: 'api' },
      risk: { x: 720, y: 340, label: 'Risk', colorKey: 'api' },
      collection: { x: 320, y: 500, label: 'Local Collection', colorKey: 'api' },
      bank: { x: 120, y: 500, label: 'Bank Rails', colorKey: 'external' },
      ledger: { x: 520, y: 500, label: 'Ledger', colorKey: 'store' },
      fx: { x: 720, y: 500, label: 'FX', colorKey: 'api' },
      netting: { x: 880, y: 500, label: 'Netting', colorKey: 'api' },
      routing: { x: 720, y: 620, label: 'Routing', colorKey: 'api' },
      payout: { x: 880, y: 620, label: 'Payout', colorKey: 'api' },
      tracking: { x: 520, y: 620, label: 'Tracking', colorKey: 'stream' },
      notify: { x: 320, y: 620, label: 'Notify', colorKey: 'external' },
      support: { x: 120, y: 620, label: 'Support', colorKey: 'external' }
    }
  },

  robinhood: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 260, label: 'Client', colorKey: 'client' },
      kyc: { x: 320, y: 160, label: 'KYC', colorKey: 'api' },
      compliance: { x: 520, y: 160, label: 'Compliance', colorKey: 'api' },
      funding: { x: 320, y: 320, label: 'Funding', colorKey: 'api' },
      risk: { x: 520, y: 320, label: 'Risk', colorKey: 'api' },
      ledger: { x: 720, y: 320, label: 'Ledger', colorKey: 'store' },
      marketdata: { x: 320, y: 480, label: 'Market Data', colorKey: 'api' },
      quotes: { x: 520, y: 480, label: 'Quotes', colorKey: 'api' },
      orders: { x: 720, y: 480, label: 'Orders', colorKey: 'api' },
      routing: { x: 880, y: 480, label: 'Routing', colorKey: 'api' },
      venue: { x: 880, y: 360, label: 'Venue', colorKey: 'external' },
      fills: { x: 720, y: 560, label: 'Fills', colorKey: 'api' },
      positions: { x: 520, y: 560, label: 'Positions', colorKey: 'store' },
      clearing: { x: 320, y: 560, label: 'Clearing', colorKey: 'external' },
      settlement: { x: 120, y: 560, label: 'Settlement', colorKey: 'external' },
      reports: { x: 120, y: 420, label: 'Statements', colorKey: 'store' },
      tax: { x: 120, y: 340, label: 'Tax', colorKey: 'store' }
    }
  },

  'cash-app': {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 260, label: 'Client', colorKey: 'client' },
      auth: { x: 320, y: 180, label: 'Auth', colorKey: 'api' },
      funding: { x: 320, y: 340, label: 'Funding', colorKey: 'external' },
      p2p: { x: 520, y: 260, label: 'P2P', colorKey: 'api' },
      lookup: { x: 520, y: 180, label: 'Recipient Lookup', colorKey: 'api' },
      risk: { x: 720, y: 180, label: 'Risk', colorKey: 'api' },
      fraud: { x: 880, y: 180, label: 'Fraud', colorKey: 'api' },
      ledger: { x: 720, y: 340, label: 'Ledger', colorKey: 'store' },
      balances: { x: 880, y: 340, label: 'Balances', colorKey: 'store' },
      cashout: { x: 720, y: 500, label: 'Cash Out', colorKey: 'api' },
      routing: { x: 880, y: 500, label: 'Routing', colorKey: 'api' },
      bank: { x: 520, y: 500, label: 'Bank Rails', colorKey: 'external' },
      notify: { x: 520, y: 620, label: 'Notify', colorKey: 'external' },
      support: { x: 720, y: 620, label: 'Support', colorKey: 'external' },
      disputes: { x: 880, y: 620, label: 'Disputes', colorKey: 'api' }
    }
  },

  venmo: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 260, label: 'Client', colorKey: 'client' },
      auth: { x: 320, y: 160, label: 'Auth', colorKey: 'api' },
      social: { x: 320, y: 340, label: 'Privacy/Social', colorKey: 'api' },
      api: { x: 520, y: 260, label: 'Payments API', colorKey: 'api' },
      p2p: { x: 720, y: 260, label: 'P2P', colorKey: 'api' },
      lookup: { x: 720, y: 160, label: 'Lookup', colorKey: 'api' },
      funding: { x: 520, y: 420, label: 'Funding', colorKey: 'external' },
      risk: { x: 720, y: 420, label: 'Risk', colorKey: 'api' },
      fraud: { x: 880, y: 420, label: 'Fraud', colorKey: 'api' },
      ledger: { x: 520, y: 520, label: 'Ledger', colorKey: 'store' },
      balances: { x: 720, y: 520, label: 'Balances', colorKey: 'store' },
      feed: { x: 880, y: 260, label: 'Feed', colorKey: 'api' },
      cashout: { x: 880, y: 520, label: 'Cash Out', colorKey: 'api' },
      disputes: { x: 520, y: 620, label: 'Disputes', colorKey: 'api' },
      support: { x: 720, y: 620, label: 'Support', colorKey: 'external' }
    }
  },

  binance: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 260, label: 'Client', colorKey: 'client' },
      auth: { x: 320, y: 160, label: 'Auth', colorKey: 'api' },
      risk: { x: 520, y: 160, label: 'Risk', colorKey: 'api' },
      deposit: { x: 320, y: 320, label: 'Deposit', colorKey: 'api' },
      payments: { x: 520, y: 320, label: 'Fiat Rails', colorKey: 'external' },
      custody: { x: 720, y: 320, label: 'Custody', colorKey: 'store' },
      orders: { x: 320, y: 480, label: 'Orders', colorKey: 'api' },
      match: { x: 520, y: 480, label: 'Matching', colorKey: 'api' },
      ledger: { x: 720, y: 480, label: 'Ledger', colorKey: 'store' },
      positions: { x: 880, y: 480, label: 'Positions', colorKey: 'store' },
      wallet: { x: 720, y: 560, label: 'Wallet', colorKey: 'api' },
      approvals: { x: 880, y: 560, label: 'Approvals', colorKey: 'api' },
      withdraw: { x: 520, y: 560, label: 'Withdraw', colorKey: 'api' },
      compliance: { x: 320, y: 560, label: 'Compliance', colorKey: 'api' },
      monitor: { x: 120, y: 560, label: 'Monitoring', colorKey: 'stream' },
      reports: { x: 120, y: 420, label: 'Reports', colorKey: 'store' },
      notify: { x: 120, y: 340, label: 'Notify', colorKey: 'external' }
    }
  },

  nubank: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 260, label: 'Client', colorKey: 'client' },
      kyc: { x: 320, y: 160, label: 'KYC', colorKey: 'api' },
      compliance: { x: 520, y: 160, label: 'Compliance', colorKey: 'api' },
      card: { x: 320, y: 320, label: 'Card Network', colorKey: 'network' },
      auth: { x: 520, y: 320, label: 'Auth', colorKey: 'api' },
      fraud: { x: 720, y: 320, label: 'Fraud', colorKey: 'api' },
      ledger: { x: 720, y: 440, label: 'Ledger', colorKey: 'store' },
      balances: { x: 880, y: 440, label: 'Balances', colorKey: 'store' },
      statements: { x: 520, y: 500, label: 'Statements', colorKey: 'store' },
      billing: { x: 320, y: 500, label: 'Billing', colorKey: 'api' },
      analytics: { x: 120, y: 500, label: 'Analytics', colorKey: 'store' },
      notify: { x: 120, y: 340, label: 'Notify', colorKey: 'external' },
      disputes: { x: 320, y: 620, label: 'Disputes', colorKey: 'api' },
      support: { x: 520, y: 620, label: 'Support', colorKey: 'external' },
      recon: { x: 720, y: 620, label: 'Reconciliation', colorKey: 'api' }
    }
  },

  monzo: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 260, label: 'Client', colorKey: 'client' },
      kyc: { x: 320, y: 160, label: 'KYC', colorKey: 'api' },
      provision: { x: 520, y: 160, label: 'Provisioning', colorKey: 'api' },
      card: { x: 320, y: 320, label: 'Card Network', colorKey: 'network' },
      auth: { x: 520, y: 320, label: 'Auth', colorKey: 'api' },
      fraud: { x: 720, y: 320, label: 'Fraud', colorKey: 'api' },
      ledger: { x: 720, y: 440, label: 'Ledger', colorKey: 'store' },
      balances: { x: 880, y: 440, label: 'Balances', colorKey: 'store' },
      pots: { x: 520, y: 440, label: 'Pots', colorKey: 'store' },
      enrich: { x: 320, y: 500, label: 'Enrichment', colorKey: 'api' },
      analytics: { x: 120, y: 500, label: 'Insights', colorKey: 'store' },
      realtime: { x: 320, y: 620, label: 'Realtime', colorKey: 'stream' },
      notify: { x: 120, y: 620, label: 'Notify', colorKey: 'external' },
      support: { x: 720, y: 620, label: 'Support', colorKey: 'external' },
      disputes: { x: 880, y: 620, label: 'Disputes', colorKey: 'api' },
      refunds: { x: 520, y: 620, label: 'Refunds', colorKey: 'api' }
    }
  },

  chime: {
    viewBox: '0 0 1000 640',
    nodes: {
      client: { x: 120, y: 260, label: 'Client', colorKey: 'client' },
      kyc: { x: 320, y: 160, label: 'KYC', colorKey: 'api' },
      compliance: { x: 520, y: 160, label: 'Compliance', colorKey: 'api' },
      bank: { x: 120, y: 420, label: 'Bank Rails', colorKey: 'external' },
      deposit: { x: 320, y: 420, label: 'Direct Deposit', colorKey: 'api' },
      card: { x: 320, y: 320, label: 'Card Network', colorKey: 'network' },
      auth: { x: 520, y: 320, label: 'Auth', colorKey: 'api' },
      fraud: { x: 720, y: 320, label: 'Fraud', colorKey: 'api' },
      ledger: { x: 720, y: 420, label: 'Ledger', colorKey: 'store' },
      balances: { x: 880, y: 420, label: 'Balances', colorKey: 'store' },
      overdraft: { x: 880, y: 320, label: 'Overdraft', colorKey: 'api' },
      analytics: { x: 520, y: 560, label: 'Insights', colorKey: 'store' },
      notify: { x: 320, y: 560, label: 'Notify', colorKey: 'external' },
      disputes: { x: 720, y: 560, label: 'Disputes', colorKey: 'api' },
      support: { x: 880, y: 560, label: 'Support', colorKey: 'external' },
      recon: { x: 880, y: 640, label: 'Reconciliation', colorKey: 'api' }
    }
  }
};

// Architecture layouts per product id.
// Node ids should match the step.active ids in src/data/flows.js for that product.
const ARCH_LAYOUTS = {
  whatsapp: {
    viewBox: '0 0 1420 760',
    backendLabel: 'WhatsApp Backend',
    backend: { x: 320, y: 70, w: 860, h: 630 },
    nodes: {
      sender: { x: 40, y: 120, label: 'Sender App' },
      recipient: { x: 40, y: 200, label: 'Recipient App' },
      edge: { x: 370, y: 150, label: 'Edge / API Gateway' },
      auth: { x: 370, y: 240, label: 'Auth Service' },
      keybundle: { x: 370, y: 330, label: 'Key Bundle Service' },
      relay: { x: 680, y: 150, label: 'Messaging Relay' },
      queue: { x: 680, y: 240, label: 'Fanout Queue' },
      spam: { x: 680, y: 330, label: 'Spam / Abuse Checks' },
      push: { x: 980, y: 150, label: 'Push Orchestrator' },
      media: { x: 980, y: 240, label: 'Media Service' },
      meta: { x: 980, y: 330, label: 'Message Metadata Store' },
      obj: { x: 980, y: 420, label: 'Media Object Store' },
      fcm: { x: 1220, y: 150, label: 'FCM / APNs' },
      cdn: { x: 1220, y: 240, label: 'CDN' }
    },
    stepEdges: (stepIdx) => {
      let edges = [];
      if (stepIdx === 2) edges.push(['sender','keybundle','keys'], ['sender','edge','send']);
      if (stepIdx === 3) edges.push(['sender','edge','send'], ['edge','relay','relay'], ['relay','queue','fanout']);
      if (stepIdx === 4) edges.push(['queue','push','notify'], ['push','fcm','push'], ['fcm','recipient','wake']);
      if (stepIdx === 5) edges.push(['relay','meta','store']);
      return edges;
    }
  },

  instagram: {
    viewBox: '0 0 1760 760',
    backendLabel: 'Instagram Backend',
    backend: { x: 300, y: 70, w: 1360, h: 630 },
    // Baseline (spine) for readability: left-to-right sequence
    primaryPath: ['client','api','feed','rank','media','cdn'],
    nodes: {
      // Outside
      client: { x: 40, y: 190, label: 'Mobile App' },

      // Core pipeline (spaced)
      api: { x: 340, y: 190, label: 'API Gateway' },
      feed: { x: 640, y: 190, label: 'Feed Service' },
      rank: { x: 940, y: 190, label: 'Ranking' },
      media: { x: 1240, y: 190, label: 'Media Service' },
      cdn: { x: 1540, y: 190, label: 'CDN' },

      // Supporting services (lower rows)
      auth: { x: 340, y: 300, label: 'Auth' },
      safety: { x: 940, y: 300, label: 'Safety / Integrity' },
      write: { x: 1240, y: 300, label: 'Write Store' },
      upload: { x: 1240, y: 410, label: 'Upload Service' },
      obj: { x: 1540, y: 410, label: 'Object Store' },
      fanout: { x: 940, y: 410, label: 'Fanout / Cache Updates' },
      notify: { x: 1540, y: 300, label: 'Push / Email' },
      realtime: { x: 640, y: 410, label: 'Realtime Gateway' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','api','load'], ['api','feed','get']);
      if (stepIdx === 2) e.push(['feed','rank','rank'], ['rank','safety','filter']);
      if (stepIdx === 3) e.push(['api','media','urls'], ['media','cdn','serve'], ['cdn','client','stream']);
      if (stepIdx === 4) e.push(['client','api','write'], ['api','auth','auth'], ['api','write','persist']);
      if (stepIdx === 5) e.push(['client','upload','upload'], ['upload','obj','store'], ['upload','write','meta']);
      if (stepIdx === 6) e.push(['write','fanout','fanout'], ['fanout','notify','notify']);
      if (stepIdx === 7) e.push(['feed','realtime','publish'], ['realtime','client','deliver']);
      return e;
    }
  },

  uber: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Uber Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 150, label: 'Rider App' },
      driver: { x: 40, y: 240, label: 'Driver App' },
      api: { x: 340, y: 150, label: 'API Gateway' },
      auth: { x: 340, y: 240, label: 'Auth' },
      maps: { x: 1220, y: 150, label: 'Maps Provider' },
      pricing: { x: 600, y: 150, label: 'Pricing / ETA' },
      dispatch: { x: 600, y: 240, label: 'Dispatch' },
      location: { x: 860, y: 240, label: 'Location Stream' },
      match: { x: 860, y: 330, label: 'Matching' },
      routing: { x: 860, y: 150, label: 'Routing' },
      realtime: { x: 600, y: 420, label: 'Realtime Updates' },
      payments: { x: 600, y: 520, label: 'Payments' },
      ledger: { x: 860, y: 520, label: 'Ledger' },
      payouts: { x: 860, y: 610, label: 'Payouts' },
      support: { x: 1220, y: 240, label: 'Support Tools' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','api','request'], ['api','pricing','estimate'], ['client','maps','geocode']);
      if (stepIdx === 2) e.push(['client','api','request'], ['api','auth','auth'], ['api','dispatch','dispatch']);
      if (stepIdx === 3) e.push(['driver','location','gps'], ['location','dispatch','nearby'], ['dispatch','match','match']);
      if (stepIdx === 4) e.push(['match','routing','route'], ['routing','maps','tiles']);
      if (stepIdx === 5) e.push(['driver','location','gps'], ['location','realtime','stream'], ['realtime','client','update']);
      if (stepIdx === 6) e.push(['pricing','payments','charge'], ['payments','ledger','record']);
      if (stepIdx === 7) e.push(['ledger','payouts','payout'], ['ledger','support','case']);
      return e;
    }
  },

  netflix: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Netflix Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 170, label: 'Client App' },
      home: { x: 340, y: 150, label: 'Home API' },
      recos: { x: 600, y: 150, label: 'Recos Service' },
      rank: { x: 600, y: 240, label: 'Ranking' },
      ab: { x: 600, y: 330, label: 'Experiment Service' },
      catalog: { x: 340, y: 240, label: 'Catalog' },
      drm: { x: 340, y: 330, label: 'DRM / License' },
      cdn: { x: 1220, y: 240, label: 'CDN' },
      player: { x: 40, y: 320, label: 'Player' },
      metrics: { x: 860, y: 330, label: 'QoE Telemetry' },
      analytics: { x: 860, y: 420, label: 'Analytics / Warehouse' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','home','rows'], ['home','recos','recos']);
      if (stepIdx === 2) e.push(['recos','rank','rank'], ['rank','ab','variant']);
      if (stepIdx === 3) e.push(['client','catalog','meta'], ['catalog','drm','policy']);
      if (stepIdx === 4) e.push(['client','drm','license']);
      if (stepIdx === 5) e.push(['cdn','player','segments'], ['player','client','video']);
      if (stepIdx === 6) e.push(['player','metrics','qoe']);
      if (stepIdx === 7) e.push(['metrics','analytics','events'], ['analytics','recos','signals']);
      return e;
    }
  },

  stripe: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Stripe Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 150, label: 'Client' },
      merchant: { x: 40, y: 240, label: 'Merchant Backend' },
      api: { x: 340, y: 200, label: 'Stripe API' },
      pi: { x: 600, y: 200, label: 'PaymentIntent' },
      sca: { x: 1220, y: 150, label: 'Issuer / 3DS' },
      acq: { x: 860, y: 200, label: 'Acquirer' },
      network: { x: 1220, y: 240, label: 'Card Network' },
      events: { x: 600, y: 330, label: 'Events Bus' },
      webhook: { x: 860, y: 330, label: 'Webhooks' },
      settle: { x: 860, y: 460, label: 'Settlement' },
      ledger: { x: 600, y: 460, label: 'Ledger' },
      reports: { x: 600, y: 570, label: 'Reports' },
      disputes: { x: 860, y: 570, label: 'Disputes' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','merchant','start']);
      if (stepIdx === 2) e.push(['merchant','api','create'], ['api','pi','intent']);
      if (stepIdx === 3) e.push(['client','pi','confirm'], ['pi','sca','3ds']);
      if (stepIdx === 4) e.push(['pi','acq','route'], ['acq','network','auth']);
      if (stepIdx === 5) e.push(['events','webhook','event'], ['webhook','merchant','update']);
      if (stepIdx === 6) e.push(['pi','settle','capture'], ['settle','ledger','entries']);
      if (stepIdx === 7) e.push(['ledger','reports','recon'], ['ledger','disputes','dispute']);
      return e;
    }
  },

  amazon: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Amazon Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 150, label: 'Client' },
      search: { x: 340, y: 150, label: 'Search' },
      catalog: { x: 600, y: 150, label: 'Catalog' },
      reviews: { x: 600, y: 240, label: 'Reviews' },
      pricing: { x: 600, y: 330, label: 'Pricing' },
      cart: { x: 340, y: 330, label: 'Cart' },
      promo: { x: 340, y: 420, label: 'Promotions' },
      checkout: { x: 860, y: 150, label: 'Checkout' },
      orders: { x: 860, y: 240, label: 'Orders' },
      payments: { x: 860, y: 330, label: 'Payments' },
      wms: { x: 860, y: 420, label: 'Warehouse Mgmt' },
      carrier: { x: 1220, y: 420, label: 'Carrier' },
      tracking: { x: 1220, y: 240, label: 'Tracking' },
      notify: { x: 1220, y: 150, label: 'Notifications' },
      returns: { x: 860, y: 520, label: 'Returns' },
      refunds: { x: 600, y: 520, label: 'Refunds' },
      inventory: { x: 600, y: 420, label: 'Inventory' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','search','query'], ['search','catalog','results']);
      if (stepIdx === 2) e.push(['catalog','reviews','load'], ['catalog','pricing','price']);
      if (stepIdx === 3) e.push(['client','cart','add'], ['cart','promo','apply']);
      if (stepIdx === 4) e.push(['checkout','orders','reserve'], ['orders','payments','charge']);
      if (stepIdx === 5) e.push(['orders','wms','pickpack'], ['wms','carrier','handoff']);
      if (stepIdx === 6) e.push(['carrier','tracking','events'], ['tracking','notify','notify']);
      if (stepIdx === 7) e.push(['returns','refunds','refund'], ['returns','inventory','restock']);
      return e;
    }
  },

  'google-drive': {
    viewBox: '0 0 1420 760',
    backendLabel: 'Google Drive Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 160, label: 'Client' },
      metadata: { x: 340, y: 160, label: 'Metadata Service' },
      sync: { x: 600, y: 160, label: 'Sync Engine' },
      upload: { x: 340, y: 260, label: 'Upload Service' },
      storage: { x: 600, y: 260, label: 'Blob Storage' },
      sharing: { x: 860, y: 160, label: 'Sharing Service' },
      authz: { x: 860, y: 260, label: 'ACL / AuthZ' },
      realtime: { x: 860, y: 360, label: 'Realtime Collab' },
      merge: { x: 600, y: 360, label: 'OT / Merge' },
      index: { x: 340, y: 460, label: 'Indexing' },
      search: { x: 600, y: 460, label: 'Search' },
      versions: { x: 860, y: 460, label: 'Versions' },
      audit: { x: 860, y: 560, label: 'Audit Log' },
      cdn: { x: 1220, y: 460, label: 'CDN' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','metadata','list'], ['metadata','sync','sync']);
      if (stepIdx === 2) e.push(['client','upload','upload'], ['upload','storage','store']);
      if (stepIdx === 3) e.push(['client','sharing','share'], ['sharing','authz','acl']);
      if (stepIdx === 4) e.push(['realtime','merge','merge'], ['merge','storage','persist']);
      if (stepIdx === 5) e.push(['metadata','index','index'], ['index','search','search']);
      if (stepIdx === 6) e.push(['storage','versions','versions'], ['storage','audit','audit']);
      if (stepIdx === 7) e.push(['client','authz','authz'], ['cdn','client','download']);
      return e;
    }
  },

  github: {
    viewBox: '0 0 1420 760',
    backendLabel: 'GitHub Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 170, label: 'Client' },
      auth: { x: 340, y: 150, label: 'Auth' },
      repo: { x: 340, y: 260, label: 'Repo Service' },
      git: { x: 600, y: 260, label: 'Git Storage' },
      cache: { x: 860, y: 260, label: 'Cache/CDN' },
      pr: { x: 600, y: 150, label: 'PR Service' },
      actions: { x: 860, y: 150, label: 'Actions' },
      runner: { x: 1220, y: 150, label: 'Runners' },
      comments: { x: 600, y: 380, label: 'Comments' },
      notify: { x: 860, y: 380, label: 'Notifications' },
      deploy: { x: 1220, y: 260, label: 'Deploy Pipeline' },
      security: { x: 860, y: 520, label: 'Security Scans' },
      audit: { x: 600, y: 520, label: 'Audit Logs' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','auth','signin'], ['auth','repo','session']);
      if (stepIdx === 2) e.push(['repo','git','read'], ['git','cache','cache']);
      if (stepIdx === 3) e.push(['client','pr','open'], ['pr','repo','diffs']);
      if (stepIdx === 4) e.push(['pr','actions','workflow'], ['actions','runner','execute']);
      if (stepIdx === 5) e.push(['pr','comments','review'], ['comments','notify','notify']);
      if (stepIdx === 6) e.push(['git','deploy','deploy'], ['git','actions','trigger']);
      if (stepIdx === 7) e.push(['repo','security','scan'], ['security','audit','record']);
      return e;
    }
  },

  doordash: {
    viewBox: '0 0 1420 760',
    backendLabel: 'DoorDash Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 150, label: 'Client' },
      search: { x: 340, y: 150, label: 'Discovery' },
      catalog: { x: 600, y: 150, label: 'Catalog/Menu' },
      cart: { x: 340, y: 260, label: 'Cart' },
      pricing: { x: 600, y: 260, label: 'Pricing' },
      promo: { x: 860, y: 260, label: 'Promos/Tax' },
      orders: { x: 600, y: 380, label: 'Orders' },
      merchant: { x: 860, y: 380, label: 'Merchant Integration' },
      dispatch: { x: 340, y: 380, label: 'Dispatch' },
      location: { x: 340, y: 500, label: 'Location Stream' },
      match: { x: 600, y: 500, label: 'Matching' },
      routing: { x: 860, y: 500, label: 'Routing' },
      tracking: { x: 1220, y: 150, label: 'Tracking' },
      realtime: { x: 1220, y: 260, label: 'Realtime' },
      notify: { x: 1220, y: 380, label: 'Notifications' },
      payments: { x: 860, y: 610, label: 'Payments' },
      ledger: { x: 600, y: 610, label: 'Ledger' },
      support: { x: 1220, y: 500, label: 'Support' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','search','browse'], ['search','catalog','menus']);
      if (stepIdx === 2) e.push(['cart','pricing','price'], ['pricing','promo','fees']);
      if (stepIdx === 3) e.push(['orders','merchant','send'], ['orders','dispatch','dispatch']);
      if (stepIdx === 4) e.push(['location','dispatch','nearby'], ['dispatch','match','match']);
      if (stepIdx === 5) e.push(['match','routing','route'], ['routing','tracking','track']);
      if (stepIdx === 6) e.push(['tracking','realtime','update'], ['realtime','notify','notify']);
      if (stepIdx === 7) e.push(['payments','ledger','settle'], ['ledger','support','refunds']);
      return e;
    }
  },

  duolingo: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Duolingo Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 170, label: 'Client' },
      lesson: { x: 340, y: 150, label: 'Lesson Service' },
      state: { x: 600, y: 150, label: 'User State' },
      engine: { x: 340, y: 270, label: 'Exercise Engine' },
      rank: { x: 600, y: 270, label: 'Personalization' },
      grade: { x: 860, y: 270, label: 'Grading' },
      recos: { x: 860, y: 150, label: 'Recommender' },
      notify: { x: 1220, y: 150, label: 'Push' },
      scheduler: { x: 860, y: 390, label: 'Scheduler' },
      ab: { x: 600, y: 390, label: 'Experiments' },
      analytics: { x: 860, y: 510, label: 'Analytics' },
      warehouse: { x: 1220, y: 510, label: 'Warehouse' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','lesson','start'], ['lesson','state','state']);
      if (stepIdx === 2) e.push(['lesson','engine','serve'], ['engine','rank','select']);
      if (stepIdx === 3) e.push(['engine','grade','grade'], ['grade','state','update']);
      if (stepIdx === 4) e.push(['state','recos','signals'], ['recos','engine','next']);
      if (stepIdx === 5) e.push(['scheduler','notify','push'], ['notify','client','remind']);
      if (stepIdx === 6) e.push(['ab','engine','variant'], ['engine','analytics','events']);
      if (stepIdx === 7) e.push(['analytics','warehouse','load'], ['warehouse','recos','train']);
      return e;
    }
  },

  coinbase: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Coinbase Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 170, label: 'Client' },
      auth: { x: 340, y: 150, label: 'Auth' },
      risk: { x: 600, y: 150, label: 'Risk Engine' },
      payments: { x: 340, y: 300, label: 'Fiat Rails' },
      ledger: { x: 600, y: 300, label: 'Ledger' },
      custody: { x: 860, y: 300, label: 'Custody' },
      orders: { x: 340, y: 450, label: 'Orders' },
      match: { x: 600, y: 450, label: 'Matching Engine' },
      positions: { x: 860, y: 450, label: 'Positions' },
      wallet: { x: 860, y: 570, label: 'Wallet / Withdrawals' },
      network: { x: 1220, y: 450, label: 'Blockchain' },
      monitor: { x: 600, y: 570, label: 'Monitoring' },
      compliance: { x: 860, y: 670, label: 'Compliance / AML' },
      reports: { x: 340, y: 570, label: 'Reporting' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','auth','login'], ['auth','risk','risk']);
      if (stepIdx === 2) e.push(['payments','ledger','credit'], ['ledger','custody','balance']);
      if (stepIdx === 3) e.push(['client','orders','order'], ['orders','match','submit']);
      if (stepIdx === 4) e.push(['match','ledger','settle'], ['ledger','positions','positions']);
      if (stepIdx === 5) e.push(['custody','wallet','withdraw'], ['wallet','risk','checks']);
      if (stepIdx === 6) e.push(['wallet','risk','checks'], ['wallet','network','broadcast']);
      if (stepIdx === 7) e.push(['monitor','compliance','alerts'], ['compliance','reports','report']);
      return e;
    }
  }

  ,

  paypal: {
    viewBox: '0 0 1420 760',
    backendLabel: 'PayPal Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    // Baseline (spine) should be simple and sequential.
    // Branches will show only when step edges activate.
    primaryPath: ['client','auth','api','routing','ledger','reports'],
    nodes: {
      // Outside
      client: { x: 40, y: 190, label: 'Client' },

      // Inside backend: arranged left-to-right in sequence
      auth: { x: 320, y: 140, label: 'Auth Service' },
      funding: { x: 320, y: 230, label: 'Funding Source Vault' },
      api: { x: 600, y: 190, label: 'Payments API' },
      risk: { x: 600, y: 300, label: 'Risk Engine' },
      routing: { x: 880, y: 190, label: 'Routing' },

      // External rails (right column)
      bank: { x: 1220, y: 140, label: 'Bank Rails' },
      network: { x: 1220, y: 230, label: 'Card Networks' },

      // Core state (right-inside)
      ledger: { x: 880, y: 300, label: 'Ledger' },
      balances: { x: 1220, y: 320, label: 'Balances' },

      // Downstream (bottom row)
      notify: { x: 600, y: 460, label: 'Notifications' },
      webhook: { x: 880, y: 460, label: 'Webhooks' },
      reports: { x: 1220, y: 460, label: 'Reporting' },
      refunds: { x: 600, y: 560, label: 'Refunds' },
      disputes: { x: 880, y: 560, label: 'Disputes' },

      // Optional integration surface
      merchant: { x: 1220, y: 560, label: 'Merchant Integration' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','auth','signin'], ['client','funding','select'], ['auth','api','token']);
      if (stepIdx === 2) e.push(['client','api','create'], ['api','risk','screen']);
      if (stepIdx === 3) e.push(['api','routing','route'], ['routing','bank','bank'], ['routing','network','card']);
      if (stepIdx === 4) e.push(['routing','ledger','post'], ['ledger','balances','update']);
      if (stepIdx === 5) e.push(['ledger','notify','receipt'], ['ledger','webhook','event'], ['webhook','merchant','deliver'], ['webhook','reports','logs']);
      if (stepIdx === 6) e.push(['ledger','refunds','refund'], ['ledger','disputes','case'], ['refunds','reports','recon']);
      return e;
    }
  },

  revolut: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Revolut Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 160, label: 'Client' },
      kyc: { x: 340, y: 160, label: 'KYC Service' },
      compliance: { x: 600, y: 160, label: 'Compliance/AML' },
      topup: { x: 340, y: 280, label: 'Top Up Service' },
      risk: { x: 600, y: 280, label: 'Risk Engine' },
      ledger: { x: 860, y: 280, label: 'Ledger' },
      card: { x: 1220, y: 360, label: 'Card Networks' },
      auth: { x: 600, y: 360, label: 'Authorization' },
      fraud: { x: 860, y: 360, label: 'Fraud Scoring' },
      fx: { x: 600, y: 460, label: 'FX Engine' },
      pricing: { x: 860, y: 460, label: 'FX Pricing' },
      statements: { x: 860, y: 540, label: 'Statements' },
      analytics: { x: 1220, y: 540, label: 'Analytics' },
      notify: { x: 340, y: 540, label: 'Notifications' },
      support: { x: 340, y: 640, label: 'Support' },
      disputes: { x: 600, y: 640, label: 'Disputes' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','kyc','verify'], ['kyc','compliance','screen']);
      if (stepIdx === 2) e.push(['client','topup','topup'], ['topup','risk','risk'], ['risk','ledger','credit']);
      if (stepIdx === 3) e.push(['card','auth','auth'], ['auth','fraud','score'], ['fraud','ledger','post']);
      if (stepIdx === 4) e.push(['auth','fx','fx'], ['fx','pricing','rate'], ['pricing','ledger','convert']);
      if (stepIdx === 5) e.push(['ledger','statements','statement'], ['ledger','analytics','insights']);
      if (stepIdx === 6) e.push(['ledger','notify','alert'], ['ledger','support','case'], ['support','disputes','dispute']);
      return e;
    }
  },

  wise: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Wise Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 170, label: 'Client' },
      quote: { x: 340, y: 150, label: 'Quote API' },
      pricing: { x: 600, y: 150, label: 'Pricing' },
      kyc: { x: 340, y: 270, label: 'KYC/AML' },
      funding: { x: 600, y: 270, label: 'Funding' },
      risk: { x: 860, y: 270, label: 'Risk' },
      collection: { x: 340, y: 390, label: 'Local Collection' },
      bank: { x: 40, y: 390, label: 'Bank Rails' },
      ledger: { x: 600, y: 390, label: 'Ledger' },
      fx: { x: 860, y: 390, label: 'FX Engine' },
      netting: { x: 1220, y: 390, label: 'Netting' },
      routing: { x: 860, y: 510, label: 'Routing' },
      payout: { x: 1220, y: 510, label: 'Local Payout' },
      tracking: { x: 600, y: 510, label: 'Tracking' },
      notify: { x: 340, y: 630, label: 'Notifications' },
      support: { x: 40, y: 630, label: 'Support' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','quote','quote'], ['quote','pricing','fees']);
      if (stepIdx === 2) e.push(['client','kyc','verify'], ['client','funding','fund'], ['funding','risk','risk']);
      if (stepIdx === 3) e.push(['funding','collection','collect'], ['collection','bank','rail'], ['collection','ledger','credit']);
      if (stepIdx === 4) e.push(['ledger','fx','fx'], ['fx','netting','net'], ['netting','ledger','settle']);
      if (stepIdx === 5) e.push(['ledger','routing','route'], ['routing','payout','payout']);
      if (stepIdx === 6) e.push(['payout','tracking','status'], ['tracking','notify','notify'], ['tracking','support','exceptions']);
      return e;
    }
  },

  robinhood: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Robinhood Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 170, label: 'Client' },
      kyc: { x: 340, y: 150, label: 'KYC' },
      compliance: { x: 600, y: 150, label: 'Compliance/AML' },
      funding: { x: 340, y: 270, label: 'Funding (ACH)' },
      risk: { x: 600, y: 270, label: 'Risk Limits' },
      ledger: { x: 860, y: 270, label: 'Ledger' },
      marketdata: { x: 340, y: 390, label: 'Market Data' },
      quotes: { x: 600, y: 390, label: 'Quotes' },
      orders: { x: 860, y: 390, label: 'Order Service' },
      routing: { x: 1220, y: 390, label: 'Smart Router' },
      venue: { x: 1220, y: 270, label: 'Exchanges/MMs' },
      fills: { x: 860, y: 510, label: 'Fills' },
      positions: { x: 600, y: 510, label: 'Positions' },
      clearing: { x: 340, y: 510, label: 'Clearing' },
      settlement: { x: 40, y: 510, label: 'Settlement' },
      reports: { x: 40, y: 270, label: 'Statements' },
      tax: { x: 40, y: 390, label: 'Tax Docs' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','kyc','kyc'], ['kyc','compliance','aml']);
      if (stepIdx === 2) e.push(['client','funding','fund'], ['funding','risk','limits'], ['risk','ledger','buying power']);
      if (stepIdx === 3) e.push(['client','marketdata','md'], ['marketdata','quotes','quote']);
      if (stepIdx === 4) e.push(['client','orders','order'], ['orders','risk','check'], ['orders','routing','route']);
      if (stepIdx === 5) e.push(['routing','venue','execute'], ['venue','fills','fills'], ['fills','positions','positions']);
      if (stepIdx === 6) e.push(['positions','clearing','clear'], ['clearing','settlement','settle'], ['settlement','ledger','ledger']);
      if (stepIdx === 7) e.push(['ledger','reports','statements'], ['reports','tax','tax'], ['reports','client','deliver']);
      return e;
    }
  },

  'cash-app': {
    viewBox: '0 0 1420 760',
    backendLabel: 'Cash App Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 170, label: 'Client' },
      auth: { x: 340, y: 150, label: 'Auth' },
      funding: { x: 340, y: 260, label: 'Funding Links' },
      p2p: { x: 600, y: 200, label: 'P2P Service' },
      lookup: { x: 600, y: 300, label: 'Recipient Lookup' },
      risk: { x: 860, y: 150, label: 'Risk Engine' },
      fraud: { x: 1220, y: 150, label: 'Fraud Scoring' },
      ledger: { x: 860, y: 300, label: 'Ledger' },
      balances: { x: 1220, y: 300, label: 'Balances' },
      cashout: { x: 860, y: 450, label: 'Cash Out' },
      routing: { x: 1220, y: 450, label: 'Routing' },
      bank: { x: 600, y: 450, label: 'Bank Rails' },
      notify: { x: 340, y: 600, label: 'Notifications' },
      support: { x: 860, y: 600, label: 'Support' },
      disputes: { x: 1220, y: 600, label: 'Disputes' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','auth','verify'], ['client','funding','link']);
      if (stepIdx === 2) e.push(['client','p2p','send'], ['p2p','lookup','lookup'], ['p2p','risk','limits']);
      if (stepIdx === 3) e.push(['p2p','risk','risk'], ['risk','fraud','fraud']);
      if (stepIdx === 4) e.push(['p2p','ledger','post'], ['ledger','balances','update']);
      if (stepIdx === 5) e.push(['balances','cashout','cashout'], ['cashout','routing','route'], ['routing','bank','ach']);
      if (stepIdx === 6) e.push(['ledger','notify','notify'], ['ledger','support','case'], ['support','disputes','dispute']);
      return e;
    }
  },

  venmo: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Venmo Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 170, label: 'Client' },
      auth: { x: 340, y: 150, label: 'Auth' },
      social: { x: 340, y: 260, label: 'Privacy/Social' },
      api: { x: 600, y: 200, label: 'Payments API' },
      p2p: { x: 860, y: 200, label: 'P2P Core' },
      lookup: { x: 860, y: 300, label: 'User Lookup' },
      funding: { x: 600, y: 360, label: 'Funding' },
      risk: { x: 860, y: 360, label: 'Risk' },
      fraud: { x: 1220, y: 360, label: 'Fraud' },
      ledger: { x: 600, y: 520, label: 'Ledger' },
      balances: { x: 860, y: 520, label: 'Balances' },
      feed: { x: 1220, y: 200, label: 'Social Feed' },
      cashout: { x: 1220, y: 520, label: 'Cash Out' },
      disputes: { x: 600, y: 640, label: 'Disputes' },
      support: { x: 860, y: 640, label: 'Support' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','auth','signin'], ['client','social','audience']);
      if (stepIdx === 2) e.push(['client','api','create'], ['api','p2p','p2p'], ['p2p','lookup','lookup']);
      if (stepIdx === 3) e.push(['p2p','funding','fund'], ['funding','risk','risk'], ['risk','fraud','fraud']);
      if (stepIdx === 4) e.push(['p2p','ledger','post'], ['ledger','balances','update']);
      if (stepIdx === 5) e.push(['ledger','social','privacy'], ['social','feed','feed'], ['feed','client','render']);
      if (stepIdx === 6) e.push(['balances','cashout','cashout'], ['ledger','disputes','case'], ['disputes','support','support']);
      return e;
    }
  },

  binance: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Binance Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 170, label: 'Client' },
      auth: { x: 340, y: 150, label: 'Auth/MFA' },
      risk: { x: 600, y: 150, label: 'Risk Controls' },
      deposit: { x: 340, y: 270, label: 'Deposit Service' },
      payments: { x: 40, y: 270, label: 'Fiat Rails' },
      custody: { x: 600, y: 270, label: 'Custody' },
      orders: { x: 340, y: 390, label: 'Orders' },
      match: { x: 600, y: 390, label: 'Matching Engine' },
      ledger: { x: 860, y: 390, label: 'Ledger' },
      positions: { x: 1220, y: 390, label: 'Positions' },
      wallet: { x: 860, y: 510, label: 'Wallet' },
      approvals: { x: 1220, y: 510, label: 'Approvals' },
      withdraw: { x: 600, y: 510, label: 'Withdrawals' },
      compliance: { x: 340, y: 510, label: 'Compliance/AML' },
      monitor: { x: 40, y: 510, label: 'Monitoring' },
      reports: { x: 340, y: 640, label: 'Reporting' },
      notify: { x: 600, y: 640, label: 'Notifications' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','auth','signin'], ['auth','risk','risk']);
      if (stepIdx === 2) e.push(['client','deposit','deposit'], ['deposit','payments','fiat'], ['deposit','custody','crypto']);
      if (stepIdx === 3) e.push(['client','orders','order'], ['orders','risk','check'], ['orders','match','submit']);
      if (stepIdx === 4) e.push(['match','ledger','ledger'], ['ledger','positions','positions']);
      if (stepIdx === 5) e.push(['ledger','custody','custody'], ['custody','wallet','wallet'], ['wallet','approvals','approve']);
      if (stepIdx === 6) e.push(['wallet','withdraw','withdraw'], ['withdraw','compliance','aml'], ['compliance','monitor','monitor']);
      if (stepIdx === 7) e.push(['ledger','reports','report'], ['ledger','notify','notify'], ['notify','client','alert']);
      return e;
    }
  },

  nubank: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Nubank Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 170, label: 'Client' },
      kyc: { x: 340, y: 150, label: 'KYC' },
      compliance: { x: 600, y: 150, label: 'Compliance' },
      card: { x: 1220, y: 270, label: 'Card Network' },
      auth: { x: 600, y: 270, label: 'Authorization' },
      fraud: { x: 860, y: 270, label: 'Fraud' },
      ledger: { x: 860, y: 390, label: 'Ledger' },
      balances: { x: 1220, y: 390, label: 'Balances' },
      statements: { x: 600, y: 510, label: 'Statements' },
      billing: { x: 340, y: 510, label: 'Billing' },
      analytics: { x: 40, y: 510, label: 'Insights' },
      notify: { x: 40, y: 270, label: 'Notifications' },
      disputes: { x: 340, y: 640, label: 'Disputes' },
      support: { x: 600, y: 640, label: 'Support' },
      recon: { x: 860, y: 640, label: 'Reconciliation' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','kyc','kyc'], ['kyc','compliance','screen']);
      if (stepIdx === 2) e.push(['card','auth','auth'], ['auth','fraud','fraud']);
      if (stepIdx === 3) e.push(['auth','ledger','post'], ['ledger','balances','update']);
      if (stepIdx === 4) e.push(['ledger','statements','cycle'], ['statements','billing','bill']);
      if (stepIdx === 5) e.push(['ledger','analytics','insights'], ['analytics','notify','notify'], ['notify','client','alert']);
      if (stepIdx === 6) e.push(['ledger','disputes','case'], ['disputes','support','support'], ['support','recon','recon']);
      return e;
    }
  },

  monzo: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Monzo Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 170, label: 'Client' },
      kyc: { x: 340, y: 150, label: 'KYC' },
      provision: { x: 600, y: 150, label: 'Provisioning' },
      card: { x: 1220, y: 270, label: 'Card Network' },
      auth: { x: 600, y: 270, label: 'Authorization' },
      fraud: { x: 860, y: 270, label: 'Fraud' },
      ledger: { x: 860, y: 390, label: 'Ledger' },
      balances: { x: 1220, y: 390, label: 'Balances' },
      pots: { x: 600, y: 390, label: 'Pots' },
      enrich: { x: 340, y: 510, label: 'Enrichment' },
      analytics: { x: 40, y: 510, label: 'Insights' },
      realtime: { x: 340, y: 640, label: 'Realtime' },
      notify: { x: 40, y: 640, label: 'Notifications' },
      support: { x: 860, y: 640, label: 'Support' },
      disputes: { x: 1220, y: 640, label: 'Disputes' },
      refunds: { x: 600, y: 640, label: 'Refunds' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','kyc','kyc'], ['kyc','provision','provision']);
      if (stepIdx === 2) e.push(['card','auth','auth'], ['auth','fraud','fraud']);
      if (stepIdx === 3) e.push(['auth','ledger','post'], ['ledger','balances','update'], ['balances','pots','pots']);
      if (stepIdx === 4) e.push(['ledger','enrich','enrich'], ['enrich','analytics','insights'], ['analytics','client','render']);
      if (stepIdx === 5) e.push(['ledger','realtime','stream'], ['realtime','notify','notify'], ['notify','client','alert']);
      if (stepIdx === 6) e.push(['ledger','refunds','refund'], ['refunds','disputes','dispute'], ['disputes','support','support']);
      return e;
    }
  },

  chime: {
    viewBox: '0 0 1420 760',
    backendLabel: 'Chime Backend',
    backend: { x: 300, y: 70, w: 900, h: 630 },
    nodes: {
      client: { x: 40, y: 170, label: 'Client' },
      kyc: { x: 340, y: 150, label: 'KYC' },
      compliance: { x: 600, y: 150, label: 'Compliance' },
      bank: { x: 40, y: 300, label: 'Bank Rails' },
      deposit: { x: 340, y: 300, label: 'Direct Deposit' },
      card: { x: 1220, y: 300, label: 'Card Network' },
      auth: { x: 600, y: 300, label: 'Authorization' },
      fraud: { x: 860, y: 300, label: 'Fraud' },
      ledger: { x: 860, y: 420, label: 'Ledger' },
      balances: { x: 1220, y: 420, label: 'Balances' },
      overdraft: { x: 1220, y: 520, label: 'Overdraft Controls' },
      analytics: { x: 600, y: 520, label: 'Insights' },
      notify: { x: 340, y: 520, label: 'Notifications' },
      disputes: { x: 860, y: 640, label: 'Disputes' },
      support: { x: 1220, y: 640, label: 'Support' },
      recon: { x: 600, y: 640, label: 'Reconciliation' }
    },
    stepEdges: (stepIdx) => {
      const e = [];
      if (stepIdx === 1) e.push(['client','kyc','kyc'], ['kyc','compliance','screen']);
      if (stepIdx === 2) e.push(['bank','deposit','deposit'], ['deposit','ledger','credit']);
      if (stepIdx === 3) e.push(['card','auth','auth'], ['auth','fraud','fraud'], ['fraud','ledger','post']);
      if (stepIdx === 4) e.push(['ledger','balances','update'], ['balances','overdraft','spotme']);
      if (stepIdx === 5) e.push(['ledger','analytics','insights'], ['analytics','notify','notify'], ['notify','client','alert']);
      if (stepIdx === 6) e.push(['ledger','disputes','case'], ['disputes','support','support'], ['support','recon','recon']);
      return e;
    }
  }
};

function systemLayoutFor(sys) {
  const id = sys?.id;
  return SYSTEM_LAYOUTS[id] || null;
}

function archLayoutFor(sys) {
  const id = sys?.id;
  return ARCH_LAYOUTS[id] || null;
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
    // Prefer explicit baseline edges; else use primary path; else union-of-edges across steps.
    if (layout.baselineEdges?.length) return uniqPairs(layout.baselineEdges);
    if (layout.primaryPath?.length) {
      const p = layout.primaryPath;
      const edges = [];
      for (let i = 0; i < p.length - 1; i++) edges.push([p[i], p[i+1]]);
      if (layout.primaryBranches?.length) {
        for (const br of layout.primaryBranches) edges.push([br.from, br.to]);
      }
      return uniqPairs(edges);
    }
    const flow = flowForSystem(sys);
    const all = [];
    for (const s of (flow?.steps || [])) for (const e of (s.edges || [])) all.push(e);
    return uniqPairs(all);
  })();

  const NODE_R = 44;
  // Expand product layouts on the y-axis to avoid vertical overlap with bigger nodes.
  const scaleLayout = (layout.viewBox ? 1 : 1.35);
  const scaleY = 1.35;
  const node = (id, cx, cy, label, color) => {
    const on = active.has(id);
    const stroke = on ? color : 'rgba(255,255,255,0.16)';
    const fill = on ? 'rgba(0,0,0,0.20)' : 'rgba(0,0,0,0.10)';
    const r = NODE_R;
    const ring1 = on ? `<circle cx="${cx}" cy="${cy}" r="${r + 26}" fill="none" stroke="${color}" stroke-width="2" opacity="0.25"/>` : '';
    const ring2 = on ? `<circle cx="${cx}" cy="${cy}" r="${r + 12}" fill="none" stroke="${color}" stroke-width="2" opacity="0.55"/>` : '';
    const glow = on
      ? `<filter id="glow-${id}"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`
      : '';
    return `
      ${glow}
      <g ${on ? `filter="url(#glow-${id})"` : ''}>
        ${ring1}
        ${ring2}
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="3" opacity="${on ? 1 : 0.55}"/>
        <text x="${cx}" y="${cy + 5}" text-anchor="middle" fill="rgba(240,240,248,0.92)" font-size="13" font-family="Inter, Arial" font-weight="900" opacity="${on ? 1 : 0.65}">${escapeXml(label)}</text>
      </g>
    `;
  };

  const arrow = (x1, y1, x2, y2, on) => {
    const mid = Math.abs(x1 * 13 + x2 * 7 + y1 * 11 + y2 * 5).toFixed(0);
    const markerId = `sys-arrow-${mid}`;
    const stroke = on ? 'rgba(123,125,248,0.9)' : 'rgba(255,255,255,0.12)';
    const w = on ? 4 : 3;
    // faint dotted baseline always visible + solid overlay when active
    const base = `
      <path d="M${x1} ${y1} L ${x2} ${y2}" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 7" opacity="1"/>
    `;
    const activePath = on ? `
      <defs>
        <marker id="${markerId}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="${stroke}"/>
        </marker>
      </defs>
      <path d="M${x1} ${y1} L ${x2} ${y2}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" opacity="${on ? 0.95 : 0.55}" marker-end="url(#${markerId})"/>
    ` : '';
    return `${base}${activePath}`;
  };

  const dot = (x, y, on) => {
    // small connector dot at endpoints; glows when on
    const r = 4;
    const stroke = on ? 'rgba(123,125,248,0.95)' : 'rgba(255,255,255,0.14)';
    const fill = on ? 'rgba(123,125,248,0.22)' : 'rgba(255,255,255,0.06)';
    const glow = on
      ? `<filter id="dot-glow-${x}-${y}"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`
      : '';
    return `
      ${glow}
      <circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2" opacity="${on ? 0.95 : 0.65}" ${on ? `filter="url(#dot-glow-${x}-${y})"` : ''}/>
    `;
  };

  const edgeLabel = (x1, y1, x2, y2, text, on) => {
    if (!text) return '';
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    // small offset so label sits above the line
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.max(1, Math.hypot(dx, dy));
    const ox = (-dy / len) * 12;
    const oy = (dx / len) * 12;
    const a = on ? 0.9 : 0.45;
    return `
      <text x="${mx + ox}" y="${my + oy}" text-anchor="middle" fill="rgba(123,125,248,${a})" font-size="12" font-family="Inter, Arial" font-weight="900">${escapeXml(text)}</text>
    `;
  };

  const mkNode = (n0) => ({ ...n0, x: n0.x * scaleLayout, y: n0.y * scaleLayout * scaleY });

  let edgesSvg = '';
  let dotsSvg = '';
  let labelsSvg = '';

  // 1) Baseline: show connected dotted lines + dots for the default graph
  for (const [a, b] of baselineEdges) {
    const na0 = layout.nodes[a];
    const nb0 = layout.nodes[b];
    const na = na0 ? mkNode(na0) : null;
    const nb = nb0 ? mkNode(nb0) : null;
    if (!na || !nb) continue;
    // not active here; arrow() already draws dotted baseline regardless of `on`
    edgesSvg += arrow(na.x, na.y, nb.x, nb.y, false);
    dotsSvg += dot(na.x, na.y, false);
    dotsSvg += dot(nb.x, nb.y, false);
  }

  // 2) Active overlay: re-draw step edges as glowing solid + glowing dots
  for (const [a, b] of stepEdges) {
    const na0 = layout.nodes[a];
    const nb0 = layout.nodes[b];
    const na = na0 ? { ...na0, x: na0.x * scaleLayout, y: na0.y * scaleLayout * scaleY } : null;
    const nb = nb0 ? { ...nb0, x: nb0.x * scaleLayout, y: nb0.y * scaleLayout * scaleY } : null;
    if (!na || !nb) continue;
    const on = eActive(a, b);
    edgesSvg += arrow(na.x, na.y, nb.x, nb.y, on);
    // Endpoint dots for visual continuity
    dotsSvg += dot(na.x, na.y, on);
    dotsSvg += dot(nb.x, nb.y, on);

    // Only show edge label when active (keeps canvas clean)
    const lbl = step?.edgeLabels?.[`${a}->${b}`];
    if (on && lbl) labelsSvg += edgeLabel(na.x, na.y, nb.x, nb.y, lbl, on);
  }

  let nodesSvg = '';
  for (const [id, n0] of Object.entries(layout.nodes)) {
    const n = { ...n0, x: n0.x * scaleLayout, y: n0.y * scaleLayout * scaleY };
    const cKey = n.colorKey || 'api';
    const color = SYSTEM_NODE_COLORS[cKey] || 'rgba(236,72,153,0.95)';
    nodesSvg += node(id, n.x, n.y, n.label, color);
  }

  svg.innerHTML = `
    <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0)"/>
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

  const box = (x, y, w, h, label) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.10)" />
    <text x="${x + 18}" y="${y + 28}" fill="rgba(240,240,248,0.75)" font-size="14" font-family="Inter, Arial" font-weight="900">${escapeXml(label)}</text>
  `;

  const n = (id, x, y, label) => {
    const on = active.has(id);
    const stroke = on ? 'rgba(236,72,153,0.95)' : 'rgba(255,255,255,0.12)';
    const fill = on ? 'rgba(236,72,153,0.12)' : 'rgba(255,255,255,0.03)';
    return `
      <rect x="${x}" y="${y}" width="240" height="60" rx="16" fill="${fill}" stroke="${stroke}" stroke-width="2" opacity="${on ? 1 : 0.65}"/>
      <text x="${x + 14}" y="${y + 38}" fill="rgba(240,240,248,0.90)" font-size="14" font-family="Inter, Arial" font-weight="900" opacity="${on ? 1 : 0.65}">${escapeXml(label)}</text>
    `;
  };

  const arrowOrtho = (x1, y1, x2, y2, label = '', on = false) => {
    const mid = Math.abs(x1 * 13 + x2 * 7 + y1 * 11 + y2 * 5).toFixed(0);
    const markerId = `arch-arrow-${mid}`;
    const mx = Math.round((x1 + x2) / 2);
    // Add clearance so edges don't go through boxes
    const clearance = 22;
    const dir = (y2 >= y1) ? 1 : -1;
    const y1c = y1 + dir * clearance;
    const y2c = y2 - dir * clearance;
    // Route primarily left->right: move out horizontally from source, then vertical, then into target.
    // This avoids weird up/down arrowheads near boxes.
    const x1c = x1 + clearance;
    const x2c = x2 - clearance;
    const d = `M${x1} ${y1} L ${x1c} ${y1} L ${x1c} ${y2} L ${x2c} ${y2} L ${x2} ${y2}`;

    const glow = on
      ? `<filter id="arch-glow-${mid}"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`
      : '';

    const strokeOn = 'rgba(123,125,248,0.9)';
    const strokeOff = 'rgba(123,125,248,0.40)';
    return `
      ${glow}
      <defs>
        <marker id="${markerId}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="${on ? strokeOn : strokeOff}"/>
        </marker>
      </defs>
      <path d="${d}" fill="none" stroke="rgba(255,255,255,0.30)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 7" opacity="1"/>
      <path d="${d}" fill="none" stroke="${on ? strokeOn : strokeOff}" stroke-width="${on ? 4 : 3}" stroke-linecap="round" stroke-linejoin="round" opacity="${on ? 0.92 : 0.55}" marker-end="url(#${markerId})" ${on ? `filter="url(#arch-glow-${mid})"` : ''}/>
      ${label ? `<text x="${mx}" y="${Math.min(y1, y2) - 10}" text-anchor="middle" fill="rgba(123,125,248,0.65)" font-size="12" font-family="Inter, Arial" font-weight="800">${escapeXml(label)}</text>` : ''}
    `;
  };

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
    // Prefer explicit baseline edges; else use ONLY the primary path (spine).
    // Branches are intentionally NOT part of baseline to keep the default view readable.
    if (layout.baselineEdges?.length) return uniqPairs(layout.baselineEdges);
    if (layout.primaryPath?.length) {
      const p = layout.primaryPath;
      const edges = [];
      for (let i = 0; i < p.length - 1; i++) edges.push([p[i], p[i+1]]);
      return uniqPairs(edges);
    }
    const all = [];
    // fallback: union all step edges for this product
    const steps = (flowForSystem(sys)?.steps || []);
    for (const s of steps) {
      const idx = steps.indexOf(s) + 1;
      const edges = (layout.stepEdges ? layout.stepEdges(idx, sys) : []);
      for (const [a,b] of edges) all.push([a,b]);
    }
    return uniqPairs(all);
  })();

  const stepIdx = (PLAYGROUND.step ?? 0) + 1;

  // 1) Baseline (faint dotted + non-glowing arrow overlay) for connected architecture graph
  const baseline = baselineEdges
    .map(([a, b]) => {
      const na = layout.nodes[a];
      const nb = layout.nodes[b];
      if (!na || !nb) return '';
      // Connect from right edge of source to left edge of target with padding
      return arrowOrtho(na.x + 252, na.y + 30, nb.x - 12, nb.y + 30, '', false);
    })
    .join('');

  // 2) Active edges (solid/glow label already handled in arrowOrtho main stroke)
  const activeEdges = (layout.stepEdges ? layout.stepEdges(stepIdx, sys) : [])
    .map(([a, b, label]) => {
      const na = layout.nodes[a];
      const nb = layout.nodes[b];
      if (!na || !nb) return '';
      return arrowOrtho(na.x + 252, na.y + 30, nb.x - 12, nb.y + 30, label || '', true);
    })
    .join('');

  const backend = layout.backend;
  const backendBox = backend
    ? box(backend.x, backend.y, backend.w, backend.h, layout.backendLabel || `${sys?.title || 'Product'} Backend`)
    : '';

  svg.innerHTML = `
    <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0)"/>
    ${backendBox}
    ${Object.entries(layout.nodes)
      .map(([id, nd]) => n(id, nd.x, nd.y, nd.label))
      .join('')}
    ${baseline}
    ${activeEdges}
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

// ---------- AI Generate (placeholder) ----------
function renderAI() {
  const root = document.getElementById('ai-page');
  root.innerHTML = `
    <div class="container">
      <div class="section-title" style="margin-top:10px">
        <h2>AI Generate</h2>
        <p>Generate a new system flow from a prompt. (Placeholder for now.)</p>
      </div>
      <div class="product-box">
        <div class="muted">We’ll wire this once the main browsing flow is locked.</div>
      </div>
    </div>
  `;
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

window.addEventListener('load', () => {
  mountShell();
  renderHome();
  initNavBindings();

  // Respect initial routing set by index.html (/?page=preview)
  const initial = window.__FLOWVIS_INITIAL_PAGE__;
  if (initial) showPage(initial);
});
