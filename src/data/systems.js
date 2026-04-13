/**
 * FlowVis Systems Catalog
 * Lightweight dataset used for homepage/explore/search routing.
 *
 * Shape:
 * { id, title, cat, desc }
 */

// Homepage categories (match screenshot)
export const CATEGORIES = [
  { id: 'payments', label: 'Payments' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'travel', label: 'Travel' },
  { id: 'streaming', label: 'Streaming' },
  { id: 'social', label: 'Social' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'devtools', label: 'Dev Tools' },
  { id: 'health', label: 'Health' },
  { id: 'food', label: 'Food Delivery' },
  { id: 'finance', label: 'Personal Finance' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'news', label: 'News & Reading' },
  { id: 'creator', label: 'Creator Tools' },
  { id: 'education', label: 'Education' },
  { id: 'gaming', label: 'Gaming' },
];

import { DESC_OVERRIDES } from './desc-overrides.js';

// Manual mapping for now (fast and predictable). We can refine iteratively.
const MAP = {
  // Payments / Fintech (broad)
  payments: new Set([
    'Stripe','PayPal','Google Pay','Paytm','BHIM','PhonePe','Razorpay','Venmo','Cash App','Revolut','Wise','Apple Pay','Samsung Pay','Google Wallet','Square',
    'Klarna','Affirm','Afterpay','Payoneer','Remitly','WorldRemit','Western Union App','MoneyGram','Zelle','MobiKwik','Freecharge',
    'HDFC Bank App','ICICI iMobile','Axis Mobile','Kotak 811'
  ]),
  finance: new Set([
    'Robinhood','Groww','Zerodha Kite','Upstox','INDmoney','ET Money','CRED','Slice','Jupiter','Fi Money','Niyo','YNAB','Mint','PocketGuard','Acorns','Stash','SoFi','Ally Bank','Varo','Current','Aspiration','Monzo','Chime','Nubank','Starling Bank','Tinkoff','Paysera','Curve','Wise Card','Cashplus','Bunq','Paytm Money'
  ]),
  crypto: new Set(['Coinbase','Binance','KuCoin','Kraken','Bitstamp']),

  // E-commerce / Marketplaces
  ecommerce: new Set([
    'Amazon','Shopify','Etsy','eBay','Flipkart','Myntra','Meesho','Ajio','Zalando','ASOS','Wayfair','Daraz','Shopee','Lazada','Nykaa',
    'Temu','Shein','AliExpress','Taobao','Tmall','JD.com','Rakuten','Mercado Libre','Noon','Jumia','Vinted','Depop','Poshmark','Carousell','OLX','Quikr','Facebook Marketplace','Wish','Banggood','Gearbest','Overstock','Houzz',
    'FirstCry','Lenskart','Pepperfry','Urban Ladder','Tata Cliq','Snapdeal','BigBasket','Blinkit','Zepto','Instacart','Shipt','Costco App','Walmart App','Target App','Best Buy App','Newegg','Chewy','Zappos','StockX','GOAT','Farfetch','Ssense','Mr Porter','Net-a-Porter','Rebag','The RealReal','Grailed',
    'Shopify Admin','Etsy Seller','Ecwid','Squarespace Commerce','Wix Stores','Magento','WooCommerce'
  ]),

  // Travel / Mobility
  travel: new Set([
    'Uber','Ola','Airbnb','Booking.com','MakeMyTrip','Lyft','Grab','BlaBlaCar','Skyscanner','Expedia','Hopper','Rome2Rio','Omio','Agoda','Hostelworld','Trip.com','Cleartrip','Yatra','ixigo','RedBus','FlixBus','Turo','Getaround','Zipcar','Lime','Bird','Tier','Bolt','Careem','Free Now','GrabTaxi','GoJek','Moovit','Citymapper','Transit App','ParkMobile','SpotHero'
  ]),

  // Streaming / Media
  streaming: new Set([
    'Netflix','Spotify','YouTube','Disney+','Prime Video','Apple Music','SoundCloud','Twitch','JioCinema','Hotstar','HBO Go','Peacock','SonyLIV','Zee5','MX Player','Voot','Crunchyroll','Funimation','Tubi','Pluto TV','Plex','Kodi','Apple TV','YouTube Studio','Vimeo','Dailymotion','Rumble','Nebula','CuriosityStream','Discovery+'
  ]),

  // Social / Messaging
  social: new Set([
    'Instagram','WhatsApp','Telegram','Snapchat','Facebook','Messenger','Twitter (X)','Reddit','Discord','Threads','LinkedIn','Signal',
    'BeReal','Mastodon','Clubhouse','Geneva','Geneva Groups','Nextdoor','Meetup','Amino','VSCO','Flickr','Imgur','Tumblr','Hive Social','Lemon8','Koo','ShareChat','Moj','Josh','Chingari','Roposo','Likee',
    'WeChat','QQ','LINE','KakaoTalk','Viber','Hike','IMO','Marco Polo','Houseparty','Yubo','Wink','Slowly','Peanut','Fishbowl','Blind','Polywork','Lunchclub','Shapr','Circle'
  ]),

  // Productivity / Work
  productivity: new Set([
    'Notion','Slack','Dropbox','Google Drive','Gmail','Microsoft Teams','Trello','Asana','ClickUp','Evernote','Airtable','Monday.com','Zoom','Calendly','Jira',
    'Coda','Obsidian','Roam Research','Bear','Craft','Superhuman','Spark Mail','Newton Mail','Front','Missive','Proton Mail','Zoho Mail',
    'Zoho CRM','HubSpot','Salesforce','Pipedrive','Freshsales','Intercom','Drift','Crisp','Help Scout','Zendesk','Gorgias',
    'Linear','Height','Basecamp','Wrike','Teamwork','ProofHub','Smartsheet','Quip','Notability','GoodNotes','XMind','MindNode','Miro','FigJam','Whimsical','Lucidchart','Draw.io',
    'Toggl','Clockify','Harvest','RescueTime','Freedom','Cold Turkey','Sunsama','Motion','Reclaim AI','Fantastical','Outlook',
    'Zoho Books','QuickBooks','Xero','FreshBooks','Wave'
  ]),

  // Dev tools / AI tools
  devtools: new Set([
    'GitHub','GitLab','Stack Overflow','Postman','Vercel','Netlify','Firebase Console','AWS Console',
    'OpenAI Playground','Anthropic Claude','Perplexity AI','Poe','Character AI','Replit','CodeSandbox','StackBlitz','Glitch','Codespaces','Sourcegraph','Sentry','Datadog','New Relic','LogRocket','Supabase','PlanetScale','Railway','Render','Fly.io','V0.dev','Bolt.new','Cursor','Tabnine','Codeium','Hugging Face','Replicate','Stability AI','Midjourney','Leonardo AI','RunPod','Paperspace','Kaggle','Colab','Jupyter','Airbyte','n8n','Zapier','Make (Integromat)','Retool'
  ]),

  // Health / Wellness
  health: new Set([
    'Headspace','Calm','Nike Training Club','MyFitnessPal','Cult.fit','Fitbit','Strava','HealthifyMe',
    'Freeletics','Fitbod','Centr','Sweat','8fit','Seven','JEFIT','Strong','Nike Run Club','Adidas Running','MapMyRun','Runkeeper','Peloton','Zwift','Trainerize',
    'MySugr','Glucose Buddy','Flo','Clue','Ovia','BetterHelp','Talkspace','Wysa','Youper','MindDoc','Sanvello','Fabulous','Stoic','Reflectly','Daylio','Sleep Cycle','SleepScore','Calm Sleep','Insight Timer','Balance','Aura','Noom','Lifesum','Yazio','Fooducate'
  ]),

  // Food Delivery
  food: new Set([
    'Swiggy','Zomato','Uber Eats','DoorDash','Deliveroo','Grubhub','Domino’s','McDonald’s App',
    'EatSure','Dunzo','Postmates','ChowNow','Ritual','Deliveroo Rider','Talabat','Careem Food','Glovo','Foodpanda','SkipTheDishes','Menulog','Zomato Business','Swiggy Instamart','Uber Eats Driver','Domino’s Tracker',
    'Starbucks App','KFC App','Burger King App','Taco Bell App','Pizza Hut App','Baskin Robbins App','Dunkin App','Blue Apron','HelloFresh','Freshly','Gousto','EveryPlate','Home Chef'
  ]),

  // News / Reading / Writing
  news: new Set([
    'Medium','Substack','Ghost','Beehiiv','Revue','Flipboard','Feedly','Inshorts','Dailyhunt','SmartNews','Pocket','Instapaper','Google News','Apple News','NewsBreak','Scribd','Kindle','Wattpad','Audible','Storytel'
  ]),

  // Creator tools
  creator: new Set([
    'Mailchimp','ConvertKit','ActiveCampaign','Klaviyo','SendGrid','Brevo (Sendinblue)',
    'Canva','Adobe Express','PicsArt','Snapseed','Lightroom Mobile','VSCO Editor','Facetune','Remini','Lensa','CapCut Editor','InShot','VN Editor','Kinemaster','FilmoraGo','Alight Motion','Mojo','Unfold',
    'Canva Docs','Gamma','Tome','Pitch','Beautiful.ai','Loom','Screen Studio','Descript','Riverside','VEED','Kapwing','Runway','Synthesia','Pictory',
    'Linktree','Beacons','Stan Store','Gumroad','Lemon Squeezy','Ko-fi','Patreon','Buy Me a Coffee','Subbly','Teachable','Kajabi','Podia','Circle.so'
  ]),

  // Education
  education: new Set([
    'Duolingo','Memrise','Babbel','Busuu','Quizlet','Khan Academy','Coursera','Udemy','Skillshare','MasterClass','edX','Brainly','Photomath','Socratic','Remind','ClassDojo','Seesaw','Blackboard','Moodle','Canvas LMS','Google Classroom'
  ]),

  // Gaming
  gaming: new Set([
    'Roblox Studio','Epic Games Store','Steam','Xbox App','PlayStation App','Discord Nitro','Battle.net','Riot Client','GOG','itch.io','Game Jolt','Miniclip','Poki','CrazyGames','Armor Games','Kongregate','Coolmath Games','Lichess','Chess.com'
  ])
};

export const SYSTEMS = [];

export function addSystem(title) {
  const t = title.trim();
  if (!t) return;
  const id = slugify(t);
  if (SYSTEMS.some(s => s.id === id)) return;

  const cat = inferCategory(t);
  SYSTEMS.push({
    id,
    title: t,
    cat,
    tag: (CATEGORIES.find(c => c.id === cat)?.label) || 'General',
    steps: defaultStepsForCategory(cat),
    desc: DESC_OVERRIDES[t] ?? defaultDescForCategory(t, cat)
  });
}

export function defaultStepsForCategory(cat) {
  const byCat = {
    payments: 6,
    finance: 6,
    crypto: 6,
    ecommerce: 7,
    travel: 7,
    streaming: 6,
    social: 6,
    productivity: 7,
    devtools: 6,
    health: 6,
    food: 7,
    news: 5,
    creator: 6,
    education: 6,
    gaming: 6,
  };
  return byCat[cat] ?? 6;
}

export function defaultDescForCategory(title, cat) {
  switch (cat) {
    case 'payments':
      return `Payment flow: auth → tokenization → routing → settlement → reconciliation.`;
    case 'finance':
      return `Account flow: onboarding → KYC → ledgering → risk checks → insights.`;
    case 'crypto':
      return `Exchange flow: deposits → order book → matching → custody → withdrawals.`;
    case 'ecommerce':
      return `Shopping flow: browse → cart → checkout → payments → fulfillment → returns.`;
    case 'travel':
      return `Booking flow: search → pricing → inventory → reservation → payment → itinerary.`;
    case 'streaming':
      return `Playback flow: catalog → DRM → CDN → adaptive bitrate → analytics.`;
    case 'social':
      return `Social flow: feed → ranking → notifications → messaging → safety moderation.`;
    case 'productivity':
      return `Work flow: sync → permissions → collaboration → storage → realtime updates.`;
    case 'devtools':
      return `Dev flow: auth → APIs → builds/jobs → logs/metrics → deploy/runtime.`;
    case 'health':
      return `Wellness flow: tracking → personalization → reminders → coaching → insights.`;
    case 'food':
      return `Delivery flow: discovery → order → dispatch → routing → tracking → payouts.`;
    case 'news':
      return `Reading flow: sources → ranking → personalization → delivery → engagement.`;
    case 'creator':
      return `Creator flow: editor → assets → publish → distribution → analytics.`;
    case 'education':
      return `Learning flow: content → practice → evaluation → progress → recommendations.`;
    case 'gaming':
      return `Gaming flow: matchmaking → sessions → anti-cheat → payments → social.`;
    default:
      return `See how ${title} works under the hood — step-by-step.`;
  }
}

export function slugify(s) {
  return s
    .toLowerCase()
    .replace(/\+/g, ' plus ')
    .replace(/\./g, ' ')
    .replace(/\(|\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function inferCategory(title) {
  for (const [cat, set] of Object.entries(MAP)) {
    if (set.has(title)) return cat;
  }
  // fallbacks by keyword
  const s = title.toLowerCase();
  if (/(pay|bank|wallet|upi|card)/.test(s)) return 'payments';
  if (/(netflix|spotify|video|music|tv|stream)/.test(s)) return 'streaming';
  if (/(uber|ola|booking|airbnb|trip|flight)/.test(s)) return 'travel';
  if (/(shop|store|market|commerce)/.test(s)) return 'ecommerce';
  if (/(git|dev|console|cloud|ai)/.test(s)) return 'devtools';
  return 'productivity';
}
