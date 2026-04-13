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

          <div class="chip-row" id="home-chips"></div>
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

  // chips
  const chips = document.getElementById('home-chips');
  const top = SYSTEMS.slice(0, 10);
  chips.innerHTML = top.map(s => `<button class="chip" data-id="${s.id}">${s.title}</button>`).join('');
  chips.querySelectorAll('.chip').forEach(b => b.addEventListener('click', () => openProductById(b.dataset.id)));

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
  const root = document.getElementById('product-page');
  root.innerHTML = `
    <div class="container">
      <div class="section-title" style="margin-top:10px">
        <h2>${sys.title}</h2>
        <p>${sys.desc}</p>
      </div>
      <div class="product-box">
        <div class="muted">(Next) This is where the animated system flow will render step-by-step.</div>
        <div class="muted">For now, the rewrite focuses on page structure + routing + catalog.</div>
      </div>
    </div>
  `;
  showPage('product');
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
