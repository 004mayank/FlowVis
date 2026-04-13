/**
 * FlowVis - Rewritten App (clean)
 * - simple SPA-style page router
 * - homepage + explore grid
 * - preview hub
 * - hero rotating product (1.5s)
 */

import { SYSTEMS, addSystem, CATEGORIES, slugify } from '../data/systems.js';
import { logoForSystemId } from '../data/logos.js';

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
      </aside>

      <main class="pg-main">
        <div class="pg-panel" id="pg-system">
          <div class="pg-canvas-wrap">
            <svg id="wa-diagram" viewBox="0 0 1000 640" xmlns="http://www.w3.org/2000/svg"></svg>
          </div>
        </div>
        <div class="pg-panel hidden" id="pg-ui">
          <div class="pg-placeholder">
            UI Flow coming soon.
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

  document.getElementById('pg-title').textContent = `${sys.title} Playground`;
  document.getElementById('pg-desc').textContent = sys.desc;

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

  // Tab switching
  overlay.querySelectorAll('.pg-tab').forEach(b => b.onclick = () => {
    PLAYGROUND.tab = b.dataset.tab;
    overlay.querySelectorAll('.pg-tab').forEach(x => x.classList.toggle('active', x.dataset.tab === PLAYGROUND.tab));
    document.getElementById('pg-system').classList.toggle('hidden', PLAYGROUND.tab !== 'system');
    document.getElementById('pg-ui').classList.toggle('hidden', PLAYGROUND.tab !== 'ui');
  });

  // Initial render
  renderPlayground();
}

function closePlayground() {
  stopPlayground();
  PLAYGROUND.open = false;
  PLAYGROUND.sys = null;
  document.getElementById('playground').classList.remove('open');
}

function startPlayground() {
  const steps = getProductSteps(PLAYGROUND.sys);
  document.getElementById('pg-play').textContent = 'Pause';
  PLAYGROUND.timer = setInterval(() => {
    PLAYGROUND.step = (PLAYGROUND.step + 1) % steps.length;
    renderPlayground();
  }, 1800);
}

function stopPlayground() {
  if (PLAYGROUND.timer) clearInterval(PLAYGROUND.timer);
  PLAYGROUND.timer = null;
  const btn = document.getElementById('pg-play');
  if (btn) btn.textContent = 'Play';
}

function getProductSteps(sys) {
  if (sys.title.toLowerCase() === 'whatsapp') {
    return [
      { title: 'User types message', active: ['sender'] },
      { title: 'Client encryption', active: ['sender','crypto','keybundle'] },
      { title: 'Server relay', active: ['relay','queue'] },
      { title: 'Push notification', active: ['push','recipient'] },
      { title: 'Client decryption', active: ['recipient','crypto'] },
    ];
  }
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

  // Render WhatsApp diagram if applicable
  if (PLAYGROUND.sys?.title.toLowerCase() === 'whatsapp') {
    renderWhatsAppDiagram(steps[PLAYGROUND.step]);
  } else {
    const svg = document.getElementById('wa-diagram');
    if (svg) svg.innerHTML = `<text x="50" y="80" fill="rgba(255,255,255,0.6)" font-size="18" font-family="Inter, Arial">Flow coming soon for ${escapeXml(PLAYGROUND.sys?.title || '')}</text>`;
  }
}

function renderWhatsAppDiagram(step) {
  const svg = document.getElementById('wa-diagram');
  if (!svg) return;

  const active = new Set(step.active || []);
  const node = (id, x, y, label) => {
    const on = active.has(id);
    const stroke = on ? 'rgba(123,125,248,0.95)' : 'rgba(255,255,255,0.14)';
    const fill = on ? 'rgba(123,125,248,0.16)' : 'rgba(255,255,255,0.04)';
    const glow = on ? `<filter id="g"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>` : '';
    return `
      ${glow}
      <g>
        <rect x="${x}" y="${y}" rx="16" ry="16" width="220" height="74" fill="${fill}" stroke="${stroke}" stroke-width="2" ${on?'filter="url(#g)"':''}/>
        <text x="${x+18}" y="${y+44}" fill="rgba(240,240,248,0.92)" font-size="16" font-family="Inter, Arial" font-weight="800">${escapeXml(label)}</text>
      </g>
    `;
  };

  const edge = (fromX, fromY, toX, toY, on) => {
    const stroke = on ? 'rgba(236,72,153,0.9)' : 'rgba(255,255,255,0.10)';
    const w = on ? 3 : 2;
    return `<path d="M${fromX} ${fromY} C ${fromX+80} ${fromY}, ${toX-80} ${toY}, ${toX} ${toY}" fill="none" stroke="${stroke}" stroke-width="${w}"/>`;
  };

  // Layout
  const nodes = {
    sender: { x: 60, y: 90, label: 'Sender App' },
    crypto: { x: 60, y: 200, label: 'Crypto Layer' },
    keybundle: { x: 60, y: 310, label: 'Key Bundle Service' },
    relay: { x: 390, y: 200, label: 'WhatsApp Servers' },
    queue: { x: 390, y: 310, label: 'Message Queue' },
    push: { x: 720, y: 200, label: 'Push Service' },
    recipient: { x: 720, y: 310, label: 'Recipient App' },
  };

  const eOn = (a,b) => active.has(a) && active.has(b);

  svg.innerHTML = `
    <rect x="0" y="0" width="1000" height="640" fill="rgba(0,0,0,0)"/>
    ${edge(nodes.sender.x+220, nodes.sender.y+36, nodes.crypto.x+220, nodes.crypto.y+36, eOn('sender','crypto'))}
    ${edge(nodes.crypto.x+220, nodes.crypto.y+36, nodes.relay.x, nodes.relay.y+36, eOn('crypto','relay') || eOn('sender','relay'))}
    ${edge(nodes.keybundle.x+220, nodes.keybundle.y+36, nodes.crypto.x+220, nodes.crypto.y+36, eOn('keybundle','crypto'))}
    ${edge(nodes.relay.x+220, nodes.relay.y+36, nodes.queue.x+220, nodes.queue.y+36, eOn('relay','queue'))}
    ${edge(nodes.queue.x+220, nodes.queue.y+36, nodes.push.x, nodes.push.y+36, eOn('queue','push'))}
    ${edge(nodes.push.x+220, nodes.push.y+36, nodes.recipient.x+220, nodes.recipient.y+36, eOn('push','recipient'))}

    ${node('sender', nodes.sender.x, nodes.sender.y, nodes.sender.label)}
    ${node('crypto', nodes.crypto.x, nodes.crypto.y, nodes.crypto.label)}
    ${node('keybundle', nodes.keybundle.x, nodes.keybundle.y, nodes.keybundle.label)}
    ${node('relay', nodes.relay.x, nodes.relay.y, nodes.relay.label)}
    ${node('queue', nodes.queue.x, nodes.queue.y, nodes.queue.label)}
    ${node('push', nodes.push.x, nodes.push.y, nodes.push.label)}
    ${node('recipient', nodes.recipient.x, nodes.recipient.y, nodes.recipient.label)}
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
