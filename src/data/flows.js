/**
 * Product flows (steps + diagrams)
 *
 * This file is the source of truth for per-product user/system/architecture flows.
 * Add new products in batches here.
 */

export const FLOWS = {
  whatsapp: {
    title: 'WhatsApp',
    steps: [
      {
        title: 'User types message',
        desc: 'You compose a message on your device. Nothing leaves your phone yet.',
        active: ['sender'],
        edges: []
      },
      {
        title: 'Client encryption',
        desc: "Your app encrypts the message using Signal Protocol and the recipient's key bundle.",
        active: ['sender','crypto','keybundle'],
        edges: [['sender','crypto'], ['keybundle','crypto']],
        edgeLabels: {
          'sender->crypto': 'plaintext',
          'keybundle->crypto': 'keys'
        }
      },
      {
        title: 'Server relay',
        desc: 'WhatsApp servers relay the encrypted packet without reading the content.',
        active: ['relay'],
        edges: [['crypto','relay'], ['relay','decrypt']],
        edgeLabels: {
          'crypto->relay': 'encrypted',
          'relay->decrypt': 'ciphertext'
        }
      },
      {
        title: 'Push notification',
        desc: 'If the recipient is offline, push services wake the app to fetch the message.',
        active: ['push','recipient','relay'],
        edges: [['relay','push'], ['push','recipient']],
        edgeLabels: {
          'relay->push': 'notify',
          'push->recipient': 'wake'
        }
      },
      {
        title: 'Client decryption',
        desc: 'The recipient app verifies and decrypts locally, then shows the plaintext.',
        active: ['decrypt','recipient'],
        edges: [['decrypt','recipient']]
      }
    ]
  },

  instagram: {
    title: 'Instagram',
    steps: [
      {
        title: 'Open app and load feed',
        desc: 'Client fetches feed items and cached media for fast first paint.',
        active: ['client','feed'],
        edges: [['client','feed']]
      },
      {
        title: 'Rank and assemble feed',
        desc: 'Ranking selects posts using signals, embeddings, and safety filters.',
        active: ['feed','rank','safety'],
        edges: [['feed','rank'], ['rank','safety']]
      },
      {
        title: 'Fetch media and profiles',
        desc: 'Client requests media URLs and loads images and video via CDN.',
        active: ['client','media','cdn'],
        edges: [['client','media'], ['media','cdn']]
      },
      {
        title: 'Like or comment',
        desc: 'Writes go through API gateway, auth, and a write store with counters.',
        active: ['client','api','auth','write'],
        edges: [['client','api'], ['api','auth'], ['api','write']]
      },
      {
        title: 'Create post and upload',
        desc: 'Media uploads to object storage; metadata is persisted for the timeline.',
        active: ['client','upload','obj','write'],
        edges: [['client','upload'], ['upload','obj'], ['upload','write']]
      },
      {
        title: 'Fanout and notifications',
        desc: 'Systems fanout updates, update caches, and trigger notification pipelines.',
        active: ['write','fanout','notify'],
        edges: [['write','fanout'], ['fanout','notify']]
      },
      {
        title: 'Realtime updates',
        desc: 'Clients receive updates via polling or realtime channels when available.',
        active: ['client','realtime','feed'],
        edges: [['feed','realtime'], ['realtime','client']]
      }
    ]
  },

  uber: {
    title: 'Uber',
    steps: [
      {
        title: 'Set pickup and destination',
        desc: 'Client geocodes addresses and shows ETA and fare estimates.',
        active: ['client','maps','pricing'],
        edges: [['client','maps'], ['client','pricing']]
      },
      {
        title: 'Request ride',
        desc: 'Ride request is authorized and sent to dispatch with rider context.',
        active: ['client','api','auth','dispatch'],
        edges: [['client','api'], ['api','auth'], ['api','dispatch']]
      },
      {
        title: 'Driver matching',
        desc: 'Dispatch finds nearby drivers using location streams and constraints.',
        active: ['dispatch','location','match'],
        edges: [['location','dispatch'], ['dispatch','match']]
      },
      {
        title: 'Trip acceptance and routing',
        desc: 'After acceptance, routing computes path and updates live ETAs.',
        active: ['match','routing','maps'],
        edges: [['match','routing'], ['routing','maps']]
      },
      {
        title: 'Live tracking',
        desc: 'Driver location updates stream to clients through realtime services.',
        active: ['driver','location','realtime','client'],
        edges: [['driver','location'], ['location','realtime'], ['realtime','client']]
      },
      {
        title: 'Complete trip and charge',
        desc: 'Fare finalization runs pricing and payments, then updates receipts.',
        active: ['pricing','payments','ledger'],
        edges: [['pricing','payments'], ['payments','ledger']]
      },
      {
        title: 'Payouts and support',
        desc: 'Driver payouts, dispute handling, and support workflows are triggered.',
        active: ['ledger','payouts','support'],
        edges: [['ledger','payouts'], ['ledger','support']]
      }
    ]
  },

  netflix: {
    title: 'Netflix',
    steps: [
      {
        title: 'Browse home and rows',
        desc: 'Client loads personalized rows and artwork from API and caches.',
        active: ['client','home','recos'],
        edges: [['client','home'], ['home','recos']]
      },
      {
        title: 'Recommendations and ranking',
        desc: 'Ranking selects titles using history, embeddings, and experiments.',
        active: ['recos','rank','ab'],
        edges: [['recos','rank'], ['rank','ab']]
      },
      {
        title: 'Select title and fetch metadata',
        desc: 'Client requests title metadata, available encodes, and playback policy.',
        active: ['client','catalog','drm'],
        edges: [['client','catalog'], ['catalog','drm']]
      },
      {
        title: 'License and DRM',
        desc: 'Client obtains DRM license for the device and session before playback.',
        active: ['client','drm'],
        edges: [['client','drm']]
      },
      {
        title: 'Start playback from CDN',
        desc: 'Segments stream from CDN with adaptive bitrate selection.',
        active: ['client','cdn','player'],
        edges: [['cdn','client'], ['client','player']]
      },
      {
        title: 'Adaptive bitrate switching',
        desc: 'Player changes quality based on bandwidth, buffer health, and device.',
        active: ['player','metrics'],
        edges: [['player','metrics']]
      },
      {
        title: 'Telemetry and engagement',
        desc: 'Playback events feed analytics to improve quality and recommendations.',
        active: ['metrics','analytics','recos'],
        edges: [['metrics','analytics'], ['analytics','recos']]
      }
    ]
  },

  stripe: {
    title: 'Stripe',
    steps: [
      {
        title: 'Checkout starts',
        desc: 'Client initiates a payment and collects payment method details securely.',
        active: ['client','checkout'],
        edges: [['client','checkout']]
      },
      {
        title: 'Create payment intent',
        desc: 'Backend creates a PaymentIntent and returns a client secret for confirmation.',
        active: ['merchant','api','pi'],
        edges: [['merchant','api'], ['api','pi']]
      },
      {
        title: 'Confirm and authenticate',
        desc: 'Client confirms payment and runs SCA or 3DS when required.',
        active: ['client','pi','sca'],
        edges: [['client','pi'], ['pi','sca']]
      },
      {
        title: 'Authorize with network',
        desc: 'Stripe routes to acquirer and card network for authorization decisions.',
        active: ['pi','acq','network'],
        edges: [['pi','acq'], ['acq','network']]
      },
      {
        title: 'Webhook to merchant',
        desc: 'Stripe emits webhook events so merchant systems can fulfill and update UI.',
        active: ['events','webhook','merchant'],
        edges: [['events','webhook'], ['webhook','merchant']]
      },
      {
        title: 'Capture and settlement',
        desc: 'Captures happen immediately or later; settlement moves funds on schedule.',
        active: ['pi','settle','ledger'],
        edges: [['pi','settle'], ['settle','ledger']]
      },
      {
        title: 'Reconciliation and disputes',
        desc: 'Reports, disputes, and payouts are reconciled against ledger entries.',
        active: ['ledger','reports','disputes'],
        edges: [['ledger','reports'], ['ledger','disputes']]
      }
    ]
  },

  amazon: {
    title: 'Amazon',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Search and recommendations show products with availability and pricing.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'View product page',
        desc: 'Product details load from catalog, reviews, and pricing services.',
        active: ['catalog','reviews','pricing'],
        edges: [['catalog','reviews'], ['catalog','pricing']]
      },
      {
        title: 'Add to cart',
        desc: 'Cart service updates items, quantities, and applies promotions.',
        active: ['client','cart','promo'],
        edges: [['client','cart'], ['cart','promo']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Order service reserves inventory and processes payments securely.',
        active: ['checkout','orders','payments'],
        edges: [['checkout','orders'], ['orders','payments']]
      },
      {
        title: 'Fulfillment',
        desc: 'Warehouse picks, packs, and hands off to carrier with tracking updates.',
        active: ['orders','wms','carrier'],
        edges: [['orders','wms'], ['wms','carrier']]
      },
      {
        title: 'Delivery tracking',
        desc: 'Tracking events update the order timeline and customer notifications.',
        active: ['carrier','tracking','notify'],
        edges: [['carrier','tracking'], ['tracking','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Return workflows restock items and issue refunds after verification.',
        active: ['returns','refunds','inventory'],
        edges: [['returns','refunds'], ['returns','inventory']]
      }
    ]
  },

  'google-drive': {
    title: 'Google Drive',
    steps: [
      {
        title: 'Open and sync',
        desc: 'Client lists files and syncs metadata for fast browsing and search.',
        active: ['client','metadata','sync'],
        edges: [['client','metadata'], ['metadata','sync']]
      },
      {
        title: 'Upload file',
        desc: 'Uploads stream to storage; resumable upload handles retries and chunks.',
        active: ['client','upload','storage'],
        edges: [['client','upload'], ['upload','storage']]
      },
      {
        title: 'Permissions and sharing',
        desc: 'ACLs define who can view or edit; share links are generated securely.',
        active: ['authz','sharing','client'],
        edges: [['client','sharing'], ['sharing','authz']]
      },
      {
        title: 'Collaboration edits',
        desc: 'Realtime edits are merged and persisted with conflict resolution.',
        active: ['realtime','merge','storage'],
        edges: [['realtime','merge'], ['merge','storage']]
      },
      {
        title: 'Search and discovery',
        desc: 'Indexing powers search, suggestions, and ranking across content.',
        active: ['index','search','metadata'],
        edges: [['metadata','index'], ['index','search']]
      },
      {
        title: 'Versioning and audit',
        desc: 'Versions, activity logs, and retention policies protect data.',
        active: ['versions','audit','storage'],
        edges: [['storage','versions'], ['storage','audit']]
      },
      {
        title: 'Download and share externally',
        desc: 'Downloads are authorized and served efficiently with caching.',
        active: ['client','cdn','authz'],
        edges: [['client','authz'], ['cdn','client']]
      }
    ]
  },

  github: {
    title: 'GitHub',
    steps: [
      {
        title: 'Authenticate and load repo',
        desc: 'User signs in and loads repository metadata and permissions.',
        active: ['client','auth','repo'],
        edges: [['client','auth'], ['auth','repo']]
      },
      {
        title: 'Browse code',
        desc: 'Code is served from git storage with caching and syntax rendering.',
        active: ['repo','git','cache'],
        edges: [['repo','git'], ['git','cache']]
      },
      {
        title: 'Open pull request',
        desc: 'PR service creates diffs, checks, and review workflows.',
        active: ['client','pr','repo'],
        edges: [['client','pr'], ['pr','repo']]
      },
      {
        title: 'Run CI checks',
        desc: 'Actions runners execute workflows and report statuses back.',
        active: ['actions','runner','pr'],
        edges: [['pr','actions'], ['actions','runner']]
      },
      {
        title: 'Code review and comments',
        desc: 'Comments, approvals, and notifications coordinate collaboration.',
        active: ['pr','comments','notify'],
        edges: [['pr','comments'], ['comments','notify']]
      },
      {
        title: 'Merge and deploy',
        desc: 'Merge updates git refs and triggers downstream deployment pipelines.',
        active: ['git','deploy','actions'],
        edges: [['git','deploy'], ['git','actions']]
      },
      {
        title: 'Audit and security',
        desc: 'Security checks scan dependencies and enforce policies.',
        active: ['security','audit','repo'],
        edges: [['repo','security'], ['security','audit']]
      }
    ]
  },

  doordash: {
    title: 'DoorDash',
    steps: [
      {
        title: 'Discover restaurants',
        desc: 'Client loads nearby stores, menus, fees, and delivery estimates.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Create cart and checkout',
        desc: 'Cart service prices items, fees, promos, and taxes.',
        active: ['cart','pricing','promo'],
        edges: [['cart','pricing'], ['pricing','promo']]
      },
      {
        title: 'Place order',
        desc: 'Order service sends order to restaurant and reserves courier capacity.',
        active: ['orders','merchant','dispatch'],
        edges: [['orders','merchant'], ['orders','dispatch']]
      },
      {
        title: 'Dispatch dasher',
        desc: 'Dispatch matches a dasher based on location, batching, and constraints.',
        active: ['dispatch','location','match'],
        edges: [['location','dispatch'], ['dispatch','match']]
      },
      {
        title: 'Pickup and routing',
        desc: 'Pickup confirmation triggers route planning and tracking updates.',
        active: ['match','routing','tracking'],
        edges: [['match','routing'], ['routing','tracking']]
      },
      {
        title: 'Delivery tracking',
        desc: 'Customer sees realtime updates and receives notifications.',
        active: ['tracking','realtime','notify'],
        edges: [['tracking','realtime'], ['realtime','notify']]
      },
      {
        title: 'Payouts and support',
        desc: 'Payments settle to restaurant and dasher; refunds and disputes flow.',
        active: ['payments','ledger','support'],
        edges: [['payments','ledger'], ['ledger','support']]
      }
    ]
  },

  duolingo: {
    title: 'Duolingo',
    steps: [
      {
        title: 'Start lesson',
        desc: 'Client fetches lesson content and user state for the session.',
        active: ['client','lesson','state'],
        edges: [['client','lesson'], ['lesson','state']]
      },
      {
        title: 'Serve exercises',
        desc: 'Exercise engine selects prompts and difficulty based on progress.',
        active: ['lesson','engine','rank'],
        edges: [['lesson','engine'], ['engine','rank']]
      },
      {
        title: 'Check answers',
        desc: 'Grading verifies responses and updates streak and XP safely.',
        active: ['engine','grade','state'],
        edges: [['engine','grade'], ['grade','state']]
      },
      {
        title: 'Personalize next items',
        desc: 'Recommendation adjusts content selection using mistakes and spacing.',
        active: ['state','recos','engine'],
        edges: [['state','recos'], ['recos','engine']]
      },
      {
        title: 'Notifications and reminders',
        desc: 'Reminder pipeline schedules nudges to keep learners engaged.',
        active: ['notify','scheduler','client'],
        edges: [['scheduler','notify'], ['notify','client']]
      },
      {
        title: 'A/B experiments',
        desc: 'Experiments change lesson ordering and UI to measure learning outcomes.',
        active: ['ab','engine','analytics'],
        edges: [['ab','engine'], ['engine','analytics']]
      },
      {
        title: 'Analytics and retention',
        desc: 'Events feed dashboards to improve curriculum and engagement.',
        active: ['analytics','warehouse','recos'],
        edges: [['analytics','warehouse'], ['warehouse','recos']]
      }
    ]
  },

  coinbase: {
    title: 'Coinbase',
    steps: [
      {
        title: 'Sign in and verify',
        desc: 'Secure auth and risk checks gate access to trading and withdrawals.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Deposit funds',
        desc: 'Deposits are credited after confirmations and ledger updates.',
        active: ['payments','ledger','custody'],
        edges: [['payments','ledger'], ['ledger','custody']]
      },
      {
        title: 'Place order',
        desc: 'Order service validates balances and submits to matching engine.',
        active: ['client','orders','match'],
        edges: [['client','orders'], ['orders','match']]
      },
      {
        title: 'Match and execute',
        desc: 'Matching engine executes trades and updates positions atomically.',
        active: ['match','ledger','positions'],
        edges: [['match','ledger'], ['ledger','positions']]
      },
      {
        title: 'Custody and wallets',
        desc: 'Custody manages keys and withdrawals with approvals and security.',
        active: ['custody','wallet','risk'],
        edges: [['custody','wallet'], ['wallet','risk']]
      },
      {
        title: 'Withdraw',
        desc: 'Withdrawals run risk checks and broadcast transactions to the network.',
        active: ['wallet','risk','network'],
        edges: [['wallet','risk'], ['wallet','network']]
      },
      {
        title: 'Monitoring and compliance',
        desc: 'Monitoring, AML, and reporting systems track activity and alerts.',
        active: ['compliance','monitor','reports'],
        edges: [['monitor','compliance'], ['compliance','reports']]
      }
    ]
  }

  ,

  paypal: {
    title: 'PayPal',
    steps: [
      {
        title: 'Sign in and fund selection',
        desc: 'User signs in, selects a funding source (balance, bank, card) and begins checkout.',
        active: ['client','auth','funding'],
        edges: [['client','auth'], ['client','funding']]
      },
      {
        title: 'Create payment and risk screening',
        desc: 'Payment is created; risk engine evaluates device, velocity, and merchant signals.',
        active: ['api','risk','merchant'],
        edges: [['client','api'], ['api','risk'], ['api','merchant']]
      },
      {
        title: 'Authorize with bank/card network',
        desc: 'PayPal routes authorization to bank rails or card networks based on funding source.',
        active: ['routing','bank','network'],
        edges: [['api','routing'], ['routing','bank'], ['routing','network']]
      },
      {
        title: 'Capture and ledger update',
        desc: 'On success, the ledger is updated and balances are adjusted atomically.',
        active: ['ledger','balances','api'],
        edges: [['api','ledger'], ['ledger','balances']]
      },
      {
        title: 'Notifications and webhooks',
        desc: 'Receipts and merchant IPN/webhooks are delivered; status is reflected in the UI.',
        active: ['notify','webhook','merchant'],
        edges: [['ledger','notify'], ['notify','client'], ['ledger','webhook'], ['webhook','merchant']]
      },
      {
        title: 'Disputes and refunds',
        desc: 'Refunds and disputes trigger case management, evidence flows, and reconciliations.',
        active: ['disputes','refunds','reports'],
        edges: [['ledger','refunds'], ['refunds','reports'], ['ledger','disputes']]
      }
    ]
  },

  revolut: {
    title: 'Revolut',
    steps: [
      {
        title: 'Onboarding and KYC',
        desc: 'User signs up, verifies identity, and passes compliance checks to open an account.',
        active: ['client','kyc','compliance'],
        edges: [['client','kyc'], ['kyc','compliance']]
      },
      {
        title: 'Add money / top up',
        desc: 'User tops up via card or bank transfer; funds are credited after risk rules.',
        active: ['topup','risk','ledger'],
        edges: [['client','topup'], ['topup','risk'], ['risk','ledger']]
      },
      {
        title: 'Card authorization',
        desc: 'A card swipe triggers authorization, limits, and fraud scoring before approval.',
        active: ['card','auth','fraud'],
        edges: [['card','auth'], ['auth','fraud'], ['fraud','ledger']]
      },
      {
        title: 'FX and pricing',
        desc: 'For cross-currency spend, FX engine computes rate, markup, and executes conversion.',
        active: ['fx','pricing','ledger'],
        edges: [['auth','fx'], ['fx','pricing'], ['pricing','ledger']]
      },
      {
        title: 'Ledgering and statements',
        desc: 'Double-entry ledger records transactions and produces statements and insights.',
        active: ['ledger','statements','analytics'],
        edges: [['ledger','statements'], ['ledger','analytics']]
      },
      {
        title: 'Alerts and support',
        desc: 'Real-time alerts are sent; disputes and chargebacks create support cases.',
        active: ['notify','support','disputes'],
        edges: [['ledger','notify'], ['notify','client'], ['ledger','support'], ['support','disputes']]
      }
    ]
  },

  wise: {
    title: 'Wise',
    steps: [
      {
        title: 'Create transfer quote',
        desc: 'User enters amount and destination; Wise returns fees, rate, and ETA.',
        active: ['client','quote','pricing'],
        edges: [['client','quote'], ['quote','pricing']]
      },
      {
        title: 'KYC and funding',
        desc: 'Compliance checks run; user funds transfer via bank/card/local rails.',
        active: ['kyc','funding','risk'],
        edges: [['client','funding'], ['funding','risk'], ['client','kyc']]
      },
      {
        title: 'Local collection',
        desc: 'Funds are collected into a local account, reducing cross-border movement.',
        active: ['collection','bank','ledger'],
        edges: [['funding','collection'], ['collection','bank'], ['collection','ledger']]
      },
      {
        title: 'FX conversion',
        desc: 'FX engine converts at mid-market rate with transparent fees and executes netting.',
        active: ['fx','netting','ledger'],
        edges: [['ledger','fx'], ['fx','netting'], ['netting','ledger']]
      },
      {
        title: 'Local payout',
        desc: 'Wise pays out locally to recipient bank using domestic rails.',
        active: ['payout','bank','routing'],
        edges: [['ledger','routing'], ['routing','payout'], ['payout','bank']]
      },
      {
        title: 'Tracking and notifications',
        desc: 'Status updates and receipts are sent; failures trigger support workflows.',
        active: ['tracking','notify','support'],
        edges: [['payout','tracking'], ['tracking','notify'], ['notify','client'], ['tracking','support']]
      }
    ]
  },

  robinhood: {
    title: 'Robinhood',
    steps: [
      {
        title: 'Account and KYC',
        desc: 'User opens an account; KYC/AML checks and suitability rules are applied.',
        active: ['client','kyc','compliance'],
        edges: [['client','kyc'], ['kyc','compliance']]
      },
      {
        title: 'Fund account',
        desc: 'ACH/card funding is initiated; risk limits gate buying power.',
        active: ['funding','risk','ledger'],
        edges: [['client','funding'], ['funding','risk'], ['risk','ledger']]
      },
      {
        title: 'Get quote and market data',
        desc: 'Market data service provides quotes, spreads, and trading halts status.',
        active: ['marketdata','quotes','client'],
        edges: [['client','marketdata'], ['marketdata','quotes']]
      },
      {
        title: 'Place order',
        desc: 'Order is validated for balances, trading rules, and routed to execution venues.',
        active: ['orders','risk','routing'],
        edges: [['client','orders'], ['orders','risk'], ['orders','routing']]
      },
      {
        title: 'Execution and fills',
        desc: 'Broker routes to market maker/exchange; fills are returned and positions update.',
        active: ['venue','fills','positions'],
        edges: [['routing','venue'], ['venue','fills'], ['fills','positions']]
      },
      {
        title: 'Clearing and settlement',
        desc: 'Trades are cleared and settled; ledger updates cash and holdings.',
        active: ['clearing','settlement','ledger'],
        edges: [['positions','clearing'], ['clearing','settlement'], ['settlement','ledger']]
      },
      {
        title: 'Statements and tax reporting',
        desc: 'Statements, confirmations, and tax docs are generated from the ledger.',
        active: ['reports','tax','ledger'],
        edges: [['ledger','reports'], ['reports','tax'], ['reports','client']]
      }
    ]
  },

  'cash-app': {
    title: 'Cash App',
    steps: [
      {
        title: 'Link identity and funding source',
        desc: 'User verifies identity and links bank/card for cash in/out.',
        active: ['client','auth','funding'],
        edges: [['client','auth'], ['client','funding']]
      },
      {
        title: 'Initiate P2P send',
        desc: 'Sender initiates transfer; recipient lookup and limits apply.',
        active: ['p2p','lookup','risk'],
        edges: [['client','p2p'], ['p2p','lookup'], ['p2p','risk']]
      },
      {
        title: 'Risk and fraud checks',
        desc: 'Device, behavior, and graph signals decide whether to allow or hold.',
        active: ['risk','fraud','p2p'],
        edges: [['p2p','risk'], ['risk','fraud']]
      },
      {
        title: 'Ledger transfer',
        desc: 'Internal ledger posts debit/credit entries and updates balances.',
        active: ['ledger','balances','p2p'],
        edges: [['p2p','ledger'], ['ledger','balances']]
      },
      {
        title: 'Cash-out and bank rails',
        desc: 'If user cashes out, funds move via ACH/instant rails to bank.',
        active: ['cashout','bank','routing'],
        edges: [['balances','cashout'], ['cashout','routing'], ['routing','bank']]
      },
      {
        title: 'Notifications and support',
        desc: 'Receipts and alerts are sent; disputes trigger support case workflows.',
        active: ['notify','support','disputes'],
        edges: [['ledger','notify'], ['notify','client'], ['ledger','support'], ['support','disputes']]
      }
    ]
  },

  venmo: {
    title: 'Venmo',
    steps: [
      {
        title: 'Sign in and select audience',
        desc: 'User signs in and chooses payment visibility (public/friends/private).',
        active: ['client','auth','social'],
        edges: [['client','auth'], ['client','social']]
      },
      {
        title: 'Create payment',
        desc: 'Payment request is created with payer/payee and optional note/emoji.',
        active: ['api','p2p','lookup'],
        edges: [['client','api'], ['api','p2p'], ['p2p','lookup']]
      },
      {
        title: 'Funding and risk checks',
        desc: 'Funding source is chosen; risk and fraud systems apply limits and holds.',
        active: ['funding','risk','fraud'],
        edges: [['p2p','funding'], ['funding','risk'], ['risk','fraud']]
      },
      {
        title: 'Ledger posting',
        desc: 'Ledger posts debit/credit and updates available balances for both users.',
        active: ['ledger','balances','p2p'],
        edges: [['p2p','ledger'], ['ledger','balances']]
      },
      {
        title: 'Social feed update',
        desc: 'Transaction metadata updates the social feed based on privacy settings.',
        active: ['social','feed','api'],
        edges: [['ledger','social'], ['social','feed'], ['feed','client']]
      },
      {
        title: 'Cash-out and disputes',
        desc: 'Users can cash out to bank; disputes/refunds create case management flows.',
        active: ['cashout','disputes','support'],
        edges: [['balances','cashout'], ['ledger','disputes'], ['disputes','support']]
      }
    ]
  },

  binance: {
    title: 'Binance',
    steps: [
      {
        title: 'Sign in and security checks',
        desc: 'User signs in with MFA; device and risk checks gate trading and withdrawals.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Deposit (fiat or crypto)',
        desc: 'Deposits are credited after bank confirmations or blockchain confirmations.',
        active: ['deposit','payments','custody'],
        edges: [['client','deposit'], ['deposit','payments'], ['deposit','custody']]
      },
      {
        title: 'Place order',
        desc: 'Order service validates balances and submits orders to the matching engine.',
        active: ['orders','match','risk'],
        edges: [['client','orders'], ['orders','risk'], ['orders','match']]
      },
      {
        title: 'Match and execute',
        desc: 'Matching engine executes trades and updates balances and positions atomically.',
        active: ['match','ledger','positions'],
        edges: [['match','ledger'], ['ledger','positions']]
      },
      {
        title: 'Custody and wallet operations',
        desc: 'Custody manages keys, hot/cold wallets, and internal transfers with approvals.',
        active: ['custody','wallet','approvals'],
        edges: [['ledger','custody'], ['custody','wallet'], ['wallet','approvals']]
      },
      {
        title: 'Withdraw and compliance monitoring',
        desc: 'Withdrawals run AML checks and are broadcast; monitoring triggers alerts.',
        active: ['withdraw','compliance','monitor'],
        edges: [['wallet','withdraw'], ['withdraw','compliance'], ['compliance','monitor']]
      },
      {
        title: 'Reporting and alerts',
        desc: 'Trade history, tax/export reporting, and user alerts are produced from ledger.',
        active: ['reports','notify','ledger'],
        edges: [['ledger','reports'], ['ledger','notify'], ['notify','client']]
      }
    ]
  },

  nubank: {
    title: 'Nubank',
    steps: [
      {
        title: 'Onboarding and KYC',
        desc: 'User signs up, verifies identity, and opens an account with limits.',
        active: ['client','kyc','compliance'],
        edges: [['client','kyc'], ['kyc','compliance']]
      },
      {
        title: 'Card transaction authorization',
        desc: 'A card purchase triggers authorization, limits, and fraud scoring.',
        active: ['card','auth','fraud'],
        edges: [['card','auth'], ['auth','fraud']]
      },
      {
        title: 'Ledger posting',
        desc: 'Approved transactions are posted to the ledger and balances are updated.',
        active: ['ledger','balances','auth'],
        edges: [['auth','ledger'], ['ledger','balances']]
      },
      {
        title: 'Statements and credit billing',
        desc: 'Statement cycles compute billing, minimum due, and interest when applicable.',
        active: ['statements','billing','ledger'],
        edges: [['ledger','statements'], ['statements','billing']]
      },
      {
        title: 'Insights and notifications',
        desc: 'Spending categories and insights are computed; real-time alerts are sent.',
        active: ['analytics','notify','client'],
        edges: [['ledger','analytics'], ['analytics','notify'], ['notify','client']]
      },
      {
        title: 'Disputes and support',
        desc: 'Chargebacks and disputes create case workflows; outcomes reconcile with ledger.',
        active: ['disputes','support','recon'],
        edges: [['ledger','disputes'], ['disputes','support'], ['support','recon']]
      }
    ]
  },

  monzo: {
    title: 'Monzo',
    steps: [
      {
        title: 'Sign up and verify',
        desc: 'User signs up; identity verification and account provisioning completes.',
        active: ['client','kyc','provision'],
        edges: [['client','kyc'], ['kyc','provision']]
      },
      {
        title: 'Card auth and controls',
        desc: 'Card authorization checks limits, merchant category controls, and fraud rules.',
        active: ['card','auth','fraud'],
        edges: [['card','auth'], ['auth','fraud']]
      },
      {
        title: 'Ledger posting and balances',
        desc: 'Ledger posts the transaction and updates available balance and pots.',
        active: ['ledger','balances','pots'],
        edges: [['auth','ledger'], ['ledger','balances'], ['balances','pots']]
      },
      {
        title: 'Categories and insights',
        desc: 'Enrichment categorizes merchants and computes budgets and insights.',
        active: ['enrich','analytics','client'],
        edges: [['ledger','enrich'], ['enrich','analytics'], ['analytics','client']]
      },
      {
        title: 'Notifications',
        desc: 'Real-time notifications are sent for transactions and balance changes.',
        active: ['notify','realtime','client'],
        edges: [['ledger','realtime'], ['realtime','notify'], ['notify','client']]
      },
      {
        title: 'Support and disputes',
        desc: 'Support workflows handle disputes, card replacement, and refunds.',
        active: ['support','disputes','refunds'],
        edges: [['ledger','refunds'], ['refunds','disputes'], ['disputes','support']]
      }
    ]
  },

  chime: {
    title: 'Chime',
    steps: [
      {
        title: 'Onboarding and compliance',
        desc: 'User signs up; KYC/AML and account provisioning completes.',
        active: ['client','kyc','compliance'],
        edges: [['client','kyc'], ['kyc','compliance']]
      },
      {
        title: 'Direct deposit and funding',
        desc: 'Payroll deposits arrive; funds are credited and made available per rules.',
        active: ['deposit','bank','ledger'],
        edges: [['bank','deposit'], ['deposit','ledger']]
      },
      {
        title: 'Card purchase authorization',
        desc: 'Card transactions are authorized with fraud checks and balance validation.',
        active: ['card','auth','fraud'],
        edges: [['card','auth'], ['auth','fraud'], ['fraud','ledger']]
      },
      {
        title: 'Ledger and overdraft controls',
        desc: 'Ledger posts transactions; overdraft/SpotMe logic applies when eligible.',
        active: ['ledger','balances','overdraft'],
        edges: [['auth','ledger'], ['ledger','balances'], ['balances','overdraft']]
      },
      {
        title: 'Insights and alerts',
        desc: 'Spending insights and alerts are computed and delivered in real time.',
        active: ['analytics','notify','client'],
        edges: [['ledger','analytics'], ['analytics','notify'], ['notify','client']]
      },
      {
        title: 'Disputes and customer support',
        desc: 'Chargebacks, refunds, and disputes create support workflows and reconciliations.',
        active: ['disputes','support','recon'],
        edges: [['ledger','disputes'], ['disputes','support'], ['support','recon']]
      }
    ]
  }

  ,

  shopify: {
    title: 'Shopify',
    steps: [
      {
        title: 'Browse storefront and search',
        desc: 'Customer loads storefront pages, collections, and search results with cached content.',
        active: ['client','storefront','catalog'],
        edges: [['client','storefront'], ['storefront','catalog']]
      },
      {
        title: 'View product page',
        desc: 'Product details, variants, inventory status, and pricing rules are fetched.',
        active: ['catalog','pricing','inventory'],
        edges: [['catalog','pricing'], ['catalog','inventory']]
      },
      {
        title: 'Add to cart',
        desc: 'Cart is updated; discounts, taxes, and shipping options are estimated.',
        active: ['client','cart','promo'],
        edges: [['client','cart'], ['cart','promo']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Checkout creates an order and routes payment via payment gateway with risk checks.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','risk'], ['checkout','payments']]
      },
      {
        title: 'Order creation and confirmation',
        desc: 'Order service persists the order, issues confirmation, and updates merchant admin.',
        active: ['orders','notify','merchant'],
        edges: [['checkout','orders'], ['orders','notify'], ['orders','merchant']]
      },
      {
        title: 'Fulfillment and shipping',
        desc: 'Fulfillment workflows pick/pack/ship; carrier labels and tracking are generated.',
        active: ['fulfillment','wms','carrier'],
        edges: [['orders','fulfillment'], ['fulfillment','wms'], ['wms','carrier']]
      },
      {
        title: 'Tracking, returns, and refunds',
        desc: 'Tracking updates notify customer; returns trigger refunds and restocking.',
        active: ['tracking','returns','refunds'],
        edges: [['carrier','tracking'], ['tracking','returns'], ['returns','refunds']]
      }
    ]
  },

  etsy: {
    title: 'Etsy',
    steps: [
      {
        title: 'Search and discovery',
        desc: 'Buyer searches listings; ranking and personalization assemble results.',
        active: ['client','search','rank'],
        edges: [['client','search'], ['search','rank']]
      },
      {
        title: 'View listing and shop info',
        desc: 'Listing details load with seller policies, shipping profiles, and reviews.',
        active: ['catalog','seller','reviews'],
        edges: [['search','catalog'], ['catalog','seller'], ['catalog','reviews']]
      },
      {
        title: 'Add to cart',
        desc: 'Cart aggregates items across shops and computes shipping + taxes per seller.',
        active: ['cart','pricing','tax'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','tax']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Order is created and payment is authorized; fraud checks may hold the order.',
        active: ['checkout','payments','fraud'],
        edges: [['cart','checkout'], ['checkout','fraud'], ['checkout','payments']]
      },
      {
        title: 'Seller fulfillment',
        desc: 'Seller receives order; prints label, ships item, and posts tracking.',
        active: ['orders','seller','carrier'],
        edges: [['checkout','orders'], ['orders','seller'], ['seller','carrier']]
      },
      {
        title: 'Notifications and messaging',
        desc: 'Buyer and seller get updates; messaging supports questions and resolution.',
        active: ['notify','messages','client'],
        edges: [['orders','notify'], ['notify','client'], ['orders','messages']]
      },
      {
        title: 'Disputes, returns, and refunds',
        desc: 'Cases and disputes drive refunds and seller performance metrics.',
        active: ['cases','refunds','risk'],
        edges: [['orders','cases'], ['cases','refunds'], ['cases','risk']]
      }
    ]
  },

  ebay: {
    title: 'eBay',
    steps: [
      {
        title: 'Search and browse',
        desc: 'Buyer searches listings; filters and ranking select relevant items.',
        active: ['client','search','rank'],
        edges: [['client','search'], ['search','rank']]
      },
      {
        title: 'View listing and seller reputation',
        desc: 'Listing details, seller ratings, shipping, and return policies load.',
        active: ['catalog','seller','trust'],
        edges: [['search','catalog'], ['catalog','seller'], ['seller','trust']]
      },
      {
        title: 'Bid or buy now',
        desc: 'Auction bids update in realtime; buy-now locks inventory and price.',
        active: ['auction','orders','inventory'],
        edges: [['client','auction'], ['auction','orders'], ['orders','inventory']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payment is authorized; fraud checks and address validation run.',
        active: ['checkout','payments','fraud'],
        edges: [['orders','checkout'], ['checkout','fraud'], ['checkout','payments']]
      },
      {
        title: 'Shipping and tracking',
        desc: 'Seller ships item; tracking updates are propagated to buyer.',
        active: ['seller','carrier','tracking'],
        edges: [['checkout','seller'], ['seller','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Delivery confirmation',
        desc: 'Delivery events update order state and release seller funds as appropriate.',
        active: ['tracking','escrow','ledger'],
        edges: [['tracking','escrow'], ['escrow','ledger']]
      },
      {
        title: 'Returns and disputes',
        desc: 'Returns, chargebacks, and disputes are handled with case management.',
        active: ['returns','cases','refunds'],
        edges: [['ledger','returns'], ['returns','cases'], ['cases','refunds']]
      }
    ]
  },

  flipkart: {
    title: 'Flipkart',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Customer searches products; ranking blends inventory, price, and relevance.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Product page and offers',
        desc: 'Product details load with pricing, offers, and delivery estimates.',
        active: ['catalog','pricing','offers'],
        edges: [['catalog','pricing'], ['pricing','offers']]
      },
      {
        title: 'Add to cart',
        desc: 'Cart updates and computes totals, coupons, and taxes.',
        active: ['cart','promo','tax'],
        edges: [['client','cart'], ['cart','promo'], ['cart','tax']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Order is placed; payment is authorized with risk checks and retries.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','risk'], ['checkout','payments']]
      },
      {
        title: 'Order and allocation',
        desc: 'Inventory is allocated to a fulfillment center or seller for packing.',
        active: ['orders','inventory','wms'],
        edges: [['checkout','orders'], ['orders','inventory'], ['orders','wms']]
      },
      {
        title: 'Shipping and last-mile delivery',
        desc: 'Carrier pickup, routing, and delivery tracking updates are published.',
        active: ['carrier','tracking','notify'],
        edges: [['wms','carrier'], ['carrier','tracking'], ['tracking','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns process restocks items and issues refunds after inspection.',
        active: ['returns','refunds','support'],
        edges: [['orders','returns'], ['returns','refunds'], ['returns','support']]
      }
    ]
  },

  myntra: {
    title: 'Myntra',
    steps: [
      {
        title: 'Discover and browse',
        desc: 'User browses fashion catalog; personalization and ranking select items.',
        active: ['client','catalog','rank'],
        edges: [['client','catalog'], ['catalog','rank']]
      },
      {
        title: 'Product page and size availability',
        desc: 'Variant availability and size charts load with pricing and offers.',
        active: ['catalog','inventory','offers'],
        edges: [['catalog','inventory'], ['catalog','offers']]
      },
      {
        title: 'Add to bag',
        desc: 'Bag/cart updates and computes coupons, taxes, and delivery fees.',
        active: ['cart','promo','tax'],
        edges: [['client','cart'], ['cart','promo'], ['cart','tax']]
      },
      {
        title: 'Checkout and payments',
        desc: 'Order is placed; payment is authorized; COD eligibility is evaluated.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','risk'], ['checkout','payments']]
      },
      {
        title: 'Fulfillment and packing',
        desc: 'Warehouse picks/ packs apparel and generates shipping labels.',
        active: ['orders','wms','carrier'],
        edges: [['checkout','orders'], ['orders','wms'], ['wms','carrier']]
      },
      {
        title: 'Delivery tracking',
        desc: 'Shipment tracking updates notify the customer and update order timeline.',
        active: ['tracking','notify','client'],
        edges: [['carrier','tracking'], ['tracking','notify'], ['notify','client']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns pickup and QC run; refunds issued to wallet/bank/card.',
        active: ['returns','refunds','qc'],
        edges: [['tracking','returns'], ['returns','qc'], ['qc','refunds']]
      }
    ]
  },

  meesho: {
    title: 'Meesho',
    steps: [
      {
        title: 'Browse catalog and recommendations',
        desc: 'User discovers products through feeds, categories, and recommendations.',
        active: ['client','feed','catalog'],
        edges: [['client','feed'], ['feed','catalog']]
      },
      {
        title: 'Product page and pricing',
        desc: 'Product details load with supplier price, shipping fees, and margins.',
        active: ['catalog','pricing','offers'],
        edges: [['catalog','pricing'], ['pricing','offers']]
      },
      {
        title: 'Place order (often COD)',
        desc: 'Order is created; COD eligibility and fraud checks run.',
        active: ['checkout','orders','risk'],
        edges: [['client','checkout'], ['checkout','risk'], ['checkout','orders']]
      },
      {
        title: 'Supplier assignment',
        desc: 'Order is assigned to supplier; supplier confirms availability and ships.',
        active: ['orders','supplier','inventory'],
        edges: [['orders','supplier'], ['supplier','inventory']]
      },
      {
        title: 'Logistics and tracking',
        desc: 'Carrier pickup, routing, and tracking updates are published.',
        active: ['carrier','tracking','notify'],
        edges: [['supplier','carrier'], ['carrier','tracking'], ['tracking','notify']]
      },
      {
        title: 'Cash collection and settlement',
        desc: 'For COD, cash is collected and settled; ledger reconciles payouts.',
        active: ['cod','ledger','payouts'],
        edges: [['carrier','cod'], ['cod','ledger'], ['ledger','payouts']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns are processed; refunds and supplier chargebacks are handled.',
        active: ['returns','refunds','support'],
        edges: [['tracking','returns'], ['returns','refunds'], ['returns','support']]
      }
    ]
  },

  ajio: {
    title: 'Ajio',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Customer browses catalog; search and ranking select products.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Product page and inventory',
        desc: 'Variant availability, pricing, and offers load with delivery promise.',
        active: ['catalog','inventory','pricing'],
        edges: [['catalog','inventory'], ['catalog','pricing']]
      },
      {
        title: 'Add to cart',
        desc: 'Cart computes totals, promos, taxes, and shipping.',
        active: ['cart','promo','tax'],
        edges: [['client','cart'], ['cart','promo'], ['cart','tax']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Order is placed; payment authorization and risk checks run.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','risk'], ['checkout','payments']]
      },
      {
        title: 'Fulfillment',
        desc: 'Warehouse picks/packs and hands off to carrier; tracking starts.',
        active: ['orders','wms','carrier'],
        edges: [['checkout','orders'], ['orders','wms'], ['wms','carrier']]
      },
      {
        title: 'Tracking and notifications',
        desc: 'Shipment events update order timeline and notify the customer.',
        active: ['tracking','notify','client'],
        edges: [['carrier','tracking'], ['tracking','notify'], ['notify','client']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns pickup and QC; refunds are issued after verification.',
        active: ['returns','qc','refunds'],
        edges: [['tracking','returns'], ['returns','qc'], ['qc','refunds']]
      }
    ]
  },

  zalando: {
    title: 'Zalando',
    steps: [
      {
        title: 'Browse and personalization',
        desc: 'User browses fashion catalog; personalization selects items and promos.',
        active: ['client','catalog','rank'],
        edges: [['client','catalog'], ['catalog','rank']]
      },
      {
        title: 'Product page and availability',
        desc: 'Variant availability and delivery promise are computed by inventory.',
        active: ['catalog','inventory','pricing'],
        edges: [['catalog','inventory'], ['catalog','pricing']]
      },
      {
        title: 'Cart and checkout prep',
        desc: 'Cart totals computed with discounts, taxes, and shipping options.',
        active: ['cart','promo','tax'],
        edges: [['client','cart'], ['cart','promo'], ['cart','tax']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payment is authorized; fraud and address checks run.',
        active: ['checkout','payments','fraud'],
        edges: [['cart','checkout'], ['checkout','fraud'], ['checkout','payments']]
      },
      {
        title: 'Warehouse fulfillment',
        desc: 'Fulfillment center picks/packs and ships; carrier integration posts tracking.',
        active: ['orders','wms','carrier'],
        edges: [['checkout','orders'], ['orders','wms'], ['wms','carrier']]
      },
      {
        title: 'Delivery and notifications',
        desc: 'Delivery events update timeline and notifications are sent.',
        active: ['tracking','notify','client'],
        edges: [['carrier','tracking'], ['tracking','notify'], ['notify','client']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns are common; reverse logistics triggers refunds and restocking.',
        active: ['returns','refunds','inventory'],
        edges: [['tracking','returns'], ['returns','refunds'], ['returns','inventory']]
      }
    ]
  },

  asos: {
    title: 'ASOS',
    steps: [
      {
        title: 'Browse and search',
        desc: 'User browses catalog; search and personalization select products.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Product page',
        desc: 'Product details load with size availability, pricing, and delivery promise.',
        active: ['catalog','inventory','pricing'],
        edges: [['catalog','inventory'], ['catalog','pricing']]
      },
      {
        title: 'Cart',
        desc: 'Cart totals computed with discounts, taxes, and shipping options.',
        active: ['cart','promo','tax'],
        edges: [['client','cart'], ['cart','promo'], ['cart','tax']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Order is placed; payment is authorized; fraud checks may hold.',
        active: ['checkout','payments','fraud'],
        edges: [['cart','checkout'], ['checkout','fraud'], ['checkout','payments']]
      },
      {
        title: 'Fulfillment',
        desc: 'Warehouse picks/packs and ships; carrier integration provides tracking.',
        active: ['orders','wms','carrier'],
        edges: [['checkout','orders'], ['orders','wms'], ['wms','carrier']]
      },
      {
        title: 'Tracking and notifications',
        desc: 'Shipping events update order timeline and send notifications.',
        active: ['tracking','notify','client'],
        edges: [['carrier','tracking'], ['tracking','notify'], ['notify','client']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns process handles reverse logistics and refunds.',
        active: ['returns','refunds','support'],
        edges: [['tracking','returns'], ['returns','refunds'], ['returns','support']]
      }
    ]
  },

  wayfair: {
    title: 'Wayfair',
    steps: [
      {
        title: 'Browse and search',
        desc: 'User searches furniture catalog; ranking considers availability and shipping.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Product details and delivery quote',
        desc: 'Product details load with bulky-item shipping estimates and delivery scheduling.',
        active: ['catalog','shipping','pricing'],
        edges: [['catalog','shipping'], ['catalog','pricing']]
      },
      {
        title: 'Cart and checkout prep',
        desc: 'Cart totals computed; delivery slots and service add-ons may be selected.',
        active: ['cart','delivery','tax'],
        edges: [['client','cart'], ['cart','delivery'], ['cart','tax']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Order is placed; payment is authorized and fraud checks run.',
        active: ['checkout','payments','fraud'],
        edges: [['cart','checkout'], ['checkout','fraud'], ['checkout','payments']]
      },
      {
        title: 'Supplier / warehouse fulfillment',
        desc: 'Order routed to supplier/warehouse; pick/pack and freight booking starts.',
        active: ['orders','wms','supplier'],
        edges: [['checkout','orders'], ['orders','supplier'], ['orders','wms']]
      },
      {
        title: 'Freight and tracking',
        desc: 'Freight carrier tracking updates; delivery appointment is coordinated.',
        active: ['carrier','tracking','notify'],
        edges: [['wms','carrier'], ['carrier','tracking'], ['tracking','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns for bulky items involve reverse logistics; refunds and support cases follow.',
        active: ['returns','refunds','support'],
        edges: [['tracking','returns'], ['returns','support'], ['returns','refunds']]
      }
    ]
  }
};

export function flowForSystem(sys) {
  if (!sys) return null;
  const id = sys.id;
  return FLOWS[id] || null;
}
