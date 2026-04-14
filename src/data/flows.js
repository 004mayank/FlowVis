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

  ,

  ola: {
    title: 'Ola',
    steps: [
      {
        title: 'Set pickup and destination',
        desc: 'Rider selects pickup/drop; maps and pricing estimate ETA and fare.',
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
        title: 'Trip routing and live ETA',
        desc: 'Routing computes path; ETAs update as traffic and driver location change.',
        active: ['match','routing','maps'],
        edges: [['match','routing'], ['routing','maps']]
      },
      {
        title: 'Live tracking',
        desc: 'Driver location updates stream to the rider through realtime services.',
        active: ['driver','location','realtime','client'],
        edges: [['driver','location'], ['location','realtime'], ['realtime','client']]
      },
      {
        title: 'Complete trip and payment',
        desc: 'Fare finalization runs pricing and payments, then updates receipts.',
        active: ['pricing','payments','ledger'],
        edges: [['pricing','payments'], ['payments','ledger']]
      },
      {
        title: 'Ratings and support',
        desc: 'Ratings feed quality systems; disputes and support flows are triggered.',
        active: ['ratings','support','ledger'],
        edges: [['ledger','ratings'], ['ledger','support']]
      }
    ]
  },

  airbnb: {
    title: 'Airbnb',
    steps: [
      {
        title: 'Search and filter stays',
        desc: 'User searches location/date; ranking selects listings and prices.',
        active: ['client','search','rank'],
        edges: [['client','search'], ['search','rank']]
      },
      {
        title: 'View listing and availability',
        desc: 'Listing details load; availability calendar and rules are checked.',
        active: ['catalog','availability','pricing'],
        edges: [['rank','catalog'], ['catalog','availability'], ['catalog','pricing']]
      },
      {
        title: 'Request to book',
        desc: 'Booking request is created; identity, risk, and policy checks run.',
        active: ['booking','risk','auth'],
        edges: [['client','booking'], ['booking','auth'], ['booking','risk']]
      },
      {
        title: 'Payment authorization',
        desc: 'Payment is authorized; holds and retries are handled securely.',
        active: ['payments','risk','ledger'],
        edges: [['booking','payments'], ['payments','risk'], ['payments','ledger']]
      },
      {
        title: 'Host confirmation and messaging',
        desc: 'Host is notified; messaging coordinates questions and acceptance.',
        active: ['host','messages','notify'],
        edges: [['booking','notify'], ['notify','host'], ['host','messages']]
      },
      {
        title: 'Check-in and trip support',
        desc: 'Itinerary is served; support handles issues, refunds, and changes.',
        active: ['itinerary','support','changes'],
        edges: [['booking','itinerary'], ['itinerary','client'], ['booking','support'], ['booking','changes']]
      },
      {
        title: 'Payouts and reviews',
        desc: 'After stay, payouts settle to host; reviews feed trust and ranking.',
        active: ['payouts','reviews','trust'],
        edges: [['ledger','payouts'], ['booking','reviews'], ['reviews','trust']]
      }
    ]
  },

  'booking-com': {
    title: 'Booking.com',
    steps: [
      {
        title: 'Search hotels and dates',
        desc: 'User searches destination/date; ranking selects properties and prices.',
        active: ['client','search','rank'],
        edges: [['client','search'], ['search','rank']]
      },
      {
        title: 'Check availability and rates',
        desc: 'Availability, rate plans, and cancellation policies are fetched.',
        active: ['inventory','pricing','policies'],
        edges: [['rank','inventory'], ['inventory','pricing'], ['inventory','policies']]
      },
      {
        title: 'Reserve room',
        desc: 'Reservation is created and inventory is held/confirmed.',
        active: ['reservation','inventory','confirm'],
        edges: [['client','reservation'], ['reservation','inventory'], ['reservation','confirm']]
      },
      {
        title: 'Payment and fraud checks',
        desc: 'Payment is authorized (or pay-at-property); fraud checks run.',
        active: ['payments','fraud','ledger'],
        edges: [['reservation','payments'], ['payments','fraud'], ['payments','ledger']]
      },
      {
        title: 'Partner notification',
        desc: 'Property/partner systems are notified and confirmation is sent.',
        active: ['partner','notify','client'],
        edges: [['confirm','notify'], ['notify','partner'], ['notify','client']]
      },
      {
        title: 'Manage booking',
        desc: 'Changes, cancellations, and refunds follow policy and inventory rules.',
        active: ['changes','policies','refunds'],
        edges: [['reservation','changes'], ['changes','policies'], ['changes','refunds']]
      },
      {
        title: 'Reviews and loyalty',
        desc: 'Post-stay reviews and loyalty benefits feed ranking and retention.',
        active: ['reviews','loyalty','rank'],
        edges: [['reservation','reviews'], ['reviews','rank'], ['reservation','loyalty']]
      }
    ]
  },

  makemytrip: {
    title: 'MakeMyTrip',
    steps: [
      {
        title: 'Search flights/hotels',
        desc: 'User searches inventory; aggregators fetch prices and availability.',
        active: ['client','search','aggregator'],
        edges: [['client','search'], ['search','aggregator']]
      },
      {
        title: 'Price and revalidate',
        desc: 'Selected itinerary is revalidated to ensure price and seats/rooms still exist.',
        active: ['revalidate','inventory','pricing'],
        edges: [['aggregator','revalidate'], ['revalidate','inventory'], ['revalidate','pricing']]
      },
      {
        title: 'Traveler details and risk checks',
        desc: 'Passenger details collected; risk and policy checks run.',
        active: ['checkout','risk','auth'],
        edges: [['client','checkout'], ['checkout','auth'], ['checkout','risk']]
      },
      {
        title: 'Payment authorization',
        desc: 'Payment is authorized; retries and alternative methods supported.',
        active: ['payments','gateway','ledger'],
        edges: [['checkout','payments'], ['payments','gateway'], ['payments','ledger']]
      },
      {
        title: 'Booking confirmation',
        desc: 'Reservation is confirmed with airline/hotel systems and PNR is created.',
        active: ['booking','partner','confirm'],
        edges: [['payments','booking'], ['booking','partner'], ['partner','confirm']]
      },
      {
        title: 'Ticketing and itinerary',
        desc: 'Tickets/vouchers issued; itinerary delivered to customer and stored.',
        active: ['ticketing','itinerary','notify'],
        edges: [['confirm','ticketing'], ['ticketing','itinerary'], ['itinerary','notify']]
      },
      {
        title: 'Changes, cancellations, refunds',
        desc: 'Post-booking changes follow policies; refunds are processed via payments.',
        active: ['changes','refunds','support'],
        edges: [['booking','changes'], ['changes','refunds'], ['changes','support']]
      }
    ]
  },

  lyft: {
    title: 'Lyft',
    steps: [
      {
        title: 'Set pickup and destination',
        desc: 'Client geocodes and estimates ETA and fare with pricing service.',
        active: ['client','maps','pricing'],
        edges: [['client','maps'], ['client','pricing']]
      },
      {
        title: 'Request ride',
        desc: 'Ride request is authorized and sent to dispatch.',
        active: ['client','api','auth','dispatch'],
        edges: [['client','api'], ['api','auth'], ['api','dispatch']]
      },
      {
        title: 'Matching nearby drivers',
        desc: 'Dispatch matches drivers using location streams and constraints.',
        active: ['dispatch','location','match'],
        edges: [['location','dispatch'], ['dispatch','match']]
      },
      {
        title: 'Route and ETA updates',
        desc: 'Routing and traffic updates keep ETA current for pickup and dropoff.',
        active: ['match','routing','maps'],
        edges: [['match','routing'], ['routing','maps']]
      },
      {
        title: 'Live tracking',
        desc: 'Realtime updates stream driver location to rider.',
        active: ['driver','location','realtime','client'],
        edges: [['driver','location'], ['location','realtime'], ['realtime','client']]
      },
      {
        title: 'Payment and receipt',
        desc: 'Fare finalization runs pricing and payments then updates receipt.',
        active: ['pricing','payments','ledger'],
        edges: [['pricing','payments'], ['payments','ledger']]
      },
      {
        title: 'Ratings and safety/support',
        desc: 'Ratings and safety tools trigger support flows when needed.',
        active: ['ratings','safety','support'],
        edges: [['ledger','ratings'], ['ledger','support'], ['support','safety']]
      }
    ]
  },

  grab: {
    title: 'Grab',
    steps: [
      {
        title: 'Choose service and location',
        desc: 'User selects ride/food etc.; maps and pricing estimate cost and ETA.',
        active: ['client','maps','pricing'],
        edges: [['client','maps'], ['client','pricing']]
      },
      {
        title: 'Request and authorization',
        desc: 'Request is authorized; context sent to dispatch.',
        active: ['client','api','auth','dispatch'],
        edges: [['client','api'], ['api','auth'], ['api','dispatch']]
      },
      {
        title: 'Matching and supply',
        desc: 'Dispatch matches driver/partner using location stream and constraints.',
        active: ['dispatch','location','match'],
        edges: [['location','dispatch'], ['dispatch','match']]
      },
      {
        title: 'Route and tracking',
        desc: 'Routing computes path; realtime tracking updates the customer.',
        active: ['routing','realtime','client'],
        edges: [['match','routing'], ['routing','realtime'], ['realtime','client']]
      },
      {
        title: 'Complete and charge',
        desc: 'Pricing finalizes fare; payments charge wallet/card and ledger records.',
        active: ['pricing','payments','ledger'],
        edges: [['pricing','payments'], ['payments','ledger']]
      },
      {
        title: 'Promos and rewards',
        desc: 'Rewards and promotions update wallets, points, and retention systems.',
        active: ['promo','rewards','ledger'],
        edges: [['ledger','promo'], ['promo','rewards']]
      },
      {
        title: 'Support and fraud',
        desc: 'Support workflows handle disputes and fraud detection alerts.',
        active: ['support','fraud','risk'],
        edges: [['ledger','support'], ['support','fraud'], ['fraud','risk']]
      }
    ]
  },

  blablacar: {
    title: 'BlaBlaCar',
    steps: [
      {
        title: 'Search rides',
        desc: 'Passenger searches routes and dates; matching finds available rides.',
        active: ['client','search','match'],
        edges: [['client','search'], ['search','match']]
      },
      {
        title: 'View ride details',
        desc: 'Ride details, driver profile, seats, and price are shown.',
        active: ['catalog','profiles','trust'],
        edges: [['match','catalog'], ['catalog','profiles'], ['profiles','trust']]
      },
      {
        title: 'Request seat',
        desc: 'Booking request is created and sent to driver for acceptance.',
        active: ['booking','notify','driver'],
        edges: [['client','booking'], ['booking','notify'], ['notify','driver']]
      },
      {
        title: 'Payment authorization',
        desc: 'Payment is authorized; escrow-like hold until ride completes.',
        active: ['payments','escrow','ledger'],
        edges: [['booking','payments'], ['payments','escrow'], ['escrow','ledger']]
      },
      {
        title: 'Messaging and coordination',
        desc: 'Passenger and driver coordinate pickup via messaging and notifications.',
        active: ['messages','notify','client'],
        edges: [['booking','messages'], ['messages','notify'], ['notify','client']]
      },
      {
        title: 'Ride completion and payout',
        desc: 'After completion, funds release to driver and receipts are issued.',
        active: ['payouts','ledger','notify'],
        edges: [['ledger','payouts'], ['payouts','notify']]
      },
      {
        title: 'Ratings and disputes',
        desc: 'Ratings update trust; disputes and refunds are handled via support.',
        active: ['ratings','support','refunds'],
        edges: [['payouts','ratings'], ['ledger','refunds'], ['refunds','support']]
      }
    ]
  },

  skyscanner: {
    title: 'Skyscanner',
    steps: [
      {
        title: 'Search flights',
        desc: 'User searches routes/dates; metasearch fans out to airlines and OTAs.',
        active: ['client','search','aggregator'],
        edges: [['client','search'], ['search','aggregator']]
      },
      {
        title: 'Aggregate offers',
        desc: 'Results are normalized, deduped, and ranked by price/time/constraints.',
        active: ['normalize','rank','cache'],
        edges: [['aggregator','normalize'], ['normalize','rank'], ['rank','cache']]
      },
      {
        title: 'Filter and sort',
        desc: 'Client applies filters; ranking updates results view and deep links.',
        active: ['client','rank','ui'],
        edges: [['rank','ui'], ['ui','client']]
      },
      {
        title: 'Click-out to partner',
        desc: 'User clicks an offer; Skyscanner redirects to partner with tracking.',
        active: ['redirect','partner','tracking'],
        edges: [['client','redirect'], ['redirect','partner'], ['redirect','tracking']]
      },
      {
        title: 'Partner booking flow',
        desc: 'Booking happens on partner site; conversion events are reported back.',
        active: ['partner','events','tracking'],
        edges: [['partner','events'], ['events','tracking']]
      },
      {
        title: 'Attribution and reporting',
        desc: 'Clicks and conversions feed attribution models and reporting dashboards.',
        active: ['attribution','reports','analytics'],
        edges: [['tracking','attribution'], ['attribution','reports'], ['reports','analytics']]
      }
    ]
  },

  expedia: {
    title: 'Expedia',
    steps: [
      {
        title: 'Search inventory',
        desc: 'User searches flights/hotels/cars; aggregator fetches prices and availability.',
        active: ['client','search','aggregator'],
        edges: [['client','search'], ['search','aggregator']]
      },
      {
        title: 'Select itinerary and revalidate',
        desc: 'Chosen itinerary is revalidated against supplier inventory and pricing.',
        active: ['revalidate','inventory','pricing'],
        edges: [['aggregator','revalidate'], ['revalidate','inventory'], ['revalidate','pricing']]
      },
      {
        title: 'Checkout and traveler details',
        desc: 'Traveler and payment details captured; fraud and policy checks run.',
        active: ['checkout','fraud','risk'],
        edges: [['client','checkout'], ['checkout','fraud'], ['checkout','risk']]
      },
      {
        title: 'Payment authorization',
        desc: 'Payment is authorized and ledger updated; retries and fallbacks handled.',
        active: ['payments','gateway','ledger'],
        edges: [['checkout','payments'], ['payments','gateway'], ['payments','ledger']]
      },
      {
        title: 'Confirm with suppliers',
        desc: 'Reservation confirmed with airline/hotel supplier systems.',
        active: ['booking','supplier','confirm'],
        edges: [['payments','booking'], ['booking','supplier'], ['supplier','confirm']]
      },
      {
        title: 'Itinerary and notifications',
        desc: 'Itinerary is stored and delivered; updates and reminders are sent.',
        active: ['itinerary','notify','client'],
        edges: [['confirm','itinerary'], ['itinerary','notify'], ['notify','client']]
      },
      {
        title: 'Changes, cancellations, refunds',
        desc: 'Post-booking modifications follow policy; refunds and support workflows run.',
        active: ['changes','refunds','support'],
        edges: [['booking','changes'], ['changes','refunds'], ['changes','support']]
      }
    ]
  },

  hopper: {
    title: 'Hopper',
    steps: [
      {
        title: 'Search flights/hotels',
        desc: 'User searches; aggregator fetches offers and shows price timeline.',
        active: ['client','search','aggregator'],
        edges: [['client','search'], ['search','aggregator']]
      },
      {
        title: 'Price prediction',
        desc: 'ML models predict whether prices will rise/fall and recommend wait/book.',
        active: ['ml','pricing','signals'],
        edges: [['aggregator','signals'], ['signals','ml'], ['ml','pricing']]
      },
      {
        title: 'Watch and alerts',
        desc: 'User sets watch; alert pipeline notifies on price changes.',
        active: ['watch','alerts','notify'],
        edges: [['client','watch'], ['watch','alerts'], ['alerts','notify']]
      },
      {
        title: 'Freeze/guarantee (optional)',
        desc: 'Optional price freeze/guarantee uses underwriting and risk rules.',
        active: ['freeze','risk','ledger'],
        edges: [['pricing','freeze'], ['freeze','risk'], ['risk','ledger']]
      },
      {
        title: 'Book itinerary',
        desc: 'Checkout captures traveler details; payment is authorized and booking created.',
        active: ['checkout','payments','booking'],
        edges: [['client','checkout'], ['checkout','payments'], ['payments','booking']]
      },
      {
        title: 'Confirm with suppliers',
        desc: 'Reservation is confirmed with airline/hotel; itinerary generated.',
        active: ['supplier','confirm','itinerary'],
        edges: [['booking','supplier'], ['supplier','confirm'], ['confirm','itinerary']]
      },
      {
        title: 'Support and changes',
        desc: 'Changes, cancellations, and support workflows run; refunds update ledger.',
        active: ['support','changes','refunds'],
        edges: [['itinerary','support'], ['support','changes'], ['changes','refunds']]
      }
    ]
  }

  ,

  spotify: {
    title: 'Spotify',
    steps: [
      {
        title: 'Open app and load home',
        desc: 'Client loads home sections and cached recommendations quickly.',
        active: ['client','home','recos'],
        edges: [['client','home'], ['home','recos']]
      },
      {
        title: 'Personalization and ranking',
        desc: 'Ranking selects mixes and playlists using history, embeddings, and experiments.',
        active: ['recos','rank','ab'],
        edges: [['recos','rank'], ['rank','ab']]
      },
      {
        title: 'Search',
        desc: 'Search queries hit indexing services and return tracks, artists, and playlists.',
        active: ['client','search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'Start playback',
        desc: 'Client requests stream URLs and starts playback from CDN.',
        active: ['client','playback','cdn'],
        edges: [['client','playback'], ['playback','cdn']]
      },
      {
        title: 'DRM / licensing (where needed)',
        desc: 'License checks and playback policy enforce subscription and device limits.',
        active: ['drm','auth','playback'],
        edges: [['playback','drm'], ['drm','auth']]
      },
      {
        title: 'Telemetry and analytics',
        desc: 'Playback events feed analytics to improve recommendations and quality.',
        active: ['metrics','analytics','recos'],
        edges: [['playback','metrics'], ['metrics','analytics'], ['analytics','recos']]
      }
    ]
  },

  youtube: {
    title: 'YouTube',
    steps: [
      {
        title: 'Open app and fetch home feed',
        desc: 'Client requests personalized home feed with caching and fast first paint.',
        active: ['client','home','recos'],
        edges: [['client','home'], ['home','recos']]
      },
      {
        title: 'Ranking and safety checks',
        desc: 'Ranking selects videos using signals and applies policy/safety filters.',
        active: ['recos','rank','safety'],
        edges: [['recos','rank'], ['rank','safety']]
      },
      {
        title: 'Search and retrieval',
        desc: 'Search hits index and retrieval services to return relevant videos.',
        active: ['client','search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'Start playback via CDN',
        desc: 'Player streams segments from CDN with adaptive bitrate.',
        active: ['player','cdn','client'],
        edges: [['cdn','client'], ['client','player']]
      },
      {
        title: 'Ads and monetization',
        desc: 'Ad decisioning selects ads; impressions and clicks are tracked.',
        active: ['ads','auction','metrics'],
        edges: [['player','ads'], ['ads','auction'], ['ads','metrics']]
      },
      {
        title: 'Upload and processing',
        desc: 'Creators upload; transcoding generates renditions and updates catalog.',
        active: ['upload','transcode','catalog'],
        edges: [['client','upload'], ['upload','transcode'], ['transcode','catalog']]
      },
      {
        title: 'Comments and notifications',
        desc: 'Comments/likes write to stores and trigger notification pipelines.',
        active: ['comments','write','notify'],
        edges: [['client','comments'], ['comments','write'], ['write','notify']]
      }
    ]
  },

  'disney-plus': {
    title: 'Disney+',
    steps: [
      {
        title: 'Browse catalog',
        desc: 'Client loads rows and artwork with personalization and caching.',
        active: ['client','catalog','recos'],
        edges: [['client','catalog'], ['catalog','recos']]
      },
      {
        title: 'Select title and policy',
        desc: 'Client fetches title metadata, availability, and playback policy.',
        active: ['catalog','policy','drm'],
        edges: [['catalog','policy'], ['policy','drm']]
      },
      {
        title: 'License and DRM',
        desc: 'Client obtains DRM license and entitlements before playback.',
        active: ['client','drm','auth'],
        edges: [['client','drm'], ['drm','auth']]
      },
      {
        title: 'Stream from CDN',
        desc: 'Playback starts from CDN with adaptive bitrate streaming.',
        active: ['client','cdn','player'],
        edges: [['cdn','client'], ['client','player']]
      },
      {
        title: 'Telemetry and QoE',
        desc: 'Playback telemetry feeds analytics for quality improvements.',
        active: ['metrics','analytics','recos'],
        edges: [['player','metrics'], ['metrics','analytics'], ['analytics','recos']]
      },
      {
        title: 'Profiles and parental controls',
        desc: 'Profiles, watch history, and parental controls update personalization.',
        active: ['profiles','history','recos'],
        edges: [['client','profiles'], ['profiles','history'], ['history','recos']]
      }
    ]
  },

  'prime-video': {
    title: 'Prime Video',
    steps: [
      {
        title: 'Browse home',
        desc: 'Client loads personalized home rows and recommendations.',
        active: ['client','home','recos'],
        edges: [['client','home'], ['home','recos']]
      },
      {
        title: 'Select title',
        desc: 'Client fetches metadata, availability, and playback policy.',
        active: ['catalog','policy','drm'],
        edges: [['home','catalog'], ['catalog','policy'], ['policy','drm']]
      },
      {
        title: 'DRM license',
        desc: 'Client requests DRM license and verifies entitlements.',
        active: ['client','drm','auth'],
        edges: [['client','drm'], ['drm','auth']]
      },
      {
        title: 'Start playback',
        desc: 'Segments stream from CDN with adaptive bitrate switching.',
        active: ['cdn','client','player'],
        edges: [['cdn','client'], ['client','player']]
      },
      {
        title: 'Ads and telemetry',
        desc: 'For ad-supported tiers, ad decisioning runs and telemetry is collected.',
        active: ['ads','metrics','analytics'],
        edges: [['player','ads'], ['player','metrics'], ['metrics','analytics']]
      },
      {
        title: 'Watch history and recos',
        desc: 'Watch events update history, continue-watching, and recommendations.',
        active: ['history','recos','home'],
        edges: [['analytics','history'], ['history','recos'], ['recos','home']]
      }
    ]
  },

  'apple-music': {
    title: 'Apple Music',
    steps: [
      {
        title: 'Open app and load library',
        desc: 'Client syncs library metadata and loads home recommendations.',
        active: ['client','library','recos'],
        edges: [['client','library'], ['library','recos']]
      },
      {
        title: 'Search catalog',
        desc: 'Search hits indexing services to return tracks, artists, and playlists.',
        active: ['client','search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'Select track and entitlement',
        desc: 'Playback policy verifies subscription and region rights.',
        active: ['policy','auth','drm'],
        edges: [['client','policy'], ['policy','auth'], ['policy','drm']]
      },
      {
        title: 'Playback and CDN',
        desc: 'Client requests stream URL and plays from CDN.',
        active: ['client','playback','cdn'],
        edges: [['client','playback'], ['playback','cdn']]
      },
      {
        title: 'Lyrics and metadata',
        desc: 'Lyrics and metadata are fetched alongside playback for UX features.',
        active: ['metadata','lyrics','client'],
        edges: [['playback','metadata'], ['metadata','lyrics'], ['lyrics','client']]
      },
      {
        title: 'Telemetry and personalization',
        desc: 'Listening events feed personalization and recommendations.',
        active: ['metrics','analytics','recos'],
        edges: [['playback','metrics'], ['metrics','analytics'], ['analytics','recos']]
      }
    ]
  },

  twitch: {
    title: 'Twitch',
    steps: [
      {
        title: 'Discover live channels',
        desc: 'Client loads live directory; ranking selects streams based on interest.',
        active: ['client','directory','rank'],
        edges: [['client','directory'], ['directory','rank']]
      },
      {
        title: 'Join stream',
        desc: 'Client requests playback manifest and starts streaming from CDN.',
        active: ['player','cdn','client'],
        edges: [['client','player'], ['cdn','client']]
      },
      {
        title: 'Ingest and transcoding',
        desc: 'Streamer ingest goes to ingest servers; transcoding creates renditions.',
        active: ['ingest','transcode','cdn'],
        edges: [['streamer','ingest'], ['ingest','transcode'], ['transcode','cdn']]
      },
      {
        title: 'Chat realtime',
        desc: 'Chat messages go through realtime messaging and moderation.',
        active: ['chat','realtime','moderation'],
        edges: [['client','chat'], ['chat','realtime'], ['realtime','moderation']]
      },
      {
        title: 'Ads and subscriptions',
        desc: 'Monetization systems handle ads, subs, bits, and payouts.',
        active: ['ads','subs','payouts'],
        edges: [['player','ads'], ['client','subs'], ['subs','payouts']]
      },
      {
        title: 'Telemetry and highlights',
        desc: 'Events feed analytics; clips/highlights pipeline stores moments.',
        active: ['metrics','analytics','clips'],
        edges: [['player','metrics'], ['metrics','analytics'], ['analytics','clips']]
      }
    ]
  },

  telegram: {
    title: 'Telegram',
    steps: [
      {
        title: 'Send message',
        desc: 'Client sends message request to Telegram servers with auth session.',
        active: ['client','api','auth'],
        edges: [['client','api'], ['api','auth']]
      },
      {
        title: 'Server routing',
        desc: 'Servers route message to recipient(s) and store metadata.',
        active: ['router','storage','api'],
        edges: [['api','router'], ['router','storage']]
      },
      {
        title: 'Push notifications',
        desc: 'If recipients are offline, push services wake the app.',
        active: ['push','client','router'],
        edges: [['router','push'], ['push','client']]
      },
      {
        title: 'Media upload',
        desc: 'Media uploads to object storage; CDN serves downloads.',
        active: ['upload','obj','cdn'],
        edges: [['client','upload'], ['upload','obj'], ['obj','cdn']]
      },
      {
        title: 'Groups and channels fanout',
        desc: 'Fanout and caching handle large groups and channel broadcasts.',
        active: ['fanout','cache','router'],
        edges: [['router','fanout'], ['fanout','cache']]
      },
      {
        title: 'Moderation and abuse controls',
        desc: 'Spam controls, reporting, and moderation workflows are applied.',
        active: ['moderation','risk','storage'],
        edges: [['storage','moderation'], ['moderation','risk']]
      }
    ]
  },

  snapchat: {
    title: 'Snapchat',
    steps: [
      {
        title: 'Open app and load camera/feed',
        desc: 'Client loads camera UI and fetches friends and stories metadata.',
        active: ['client','feed','friends'],
        edges: [['client','feed'], ['feed','friends']]
      },
      {
        title: 'Capture snap',
        desc: 'Snap is captured and prepared for upload with filters/AR effects.',
        active: ['client','camera','effects'],
        edges: [['camera','effects'], ['effects','client']]
      },
      {
        title: 'Upload media',
        desc: 'Media uploads to storage; metadata is written for delivery.',
        active: ['upload','storage','write'],
        edges: [['client','upload'], ['upload','storage'], ['upload','write']]
      },
      {
        title: 'Deliver to recipients',
        desc: 'Routing and fanout deliver snaps to recipients with caching.',
        active: ['router','fanout','cache'],
        edges: [['write','router'], ['router','fanout'], ['fanout','cache']]
      },
      {
        title: 'Stories and discovery',
        desc: 'Stories are assembled and ranked; ads may be inserted.',
        active: ['stories','rank','ads'],
        edges: [['cache','stories'], ['stories','rank'], ['rank','ads']]
      },
      {
        title: 'Telemetry and safety',
        desc: 'Events feed analytics; safety and moderation systems enforce policies.',
        active: ['metrics','analytics','moderation'],
        edges: [['client','metrics'], ['metrics','analytics'], ['analytics','moderation']]
      }
    ]
  },

  facebook: {
    title: 'Facebook',
    steps: [
      {
        title: 'Load feed',
        desc: 'Client requests feed; caching and prefetch enable fast rendering.',
        active: ['client','feed','cache'],
        edges: [['client','feed'], ['feed','cache']]
      },
      {
        title: 'Ranking and integrity',
        desc: 'Ranking selects posts; integrity/safety filters apply.',
        active: ['rank','safety','feed'],
        edges: [['feed','rank'], ['rank','safety']]
      },
      {
        title: 'Fetch media',
        desc: 'Media URLs are resolved and content streams from CDN.',
        active: ['media','cdn','client'],
        edges: [['feed','media'], ['media','cdn'], ['cdn','client']]
      },
      {
        title: 'Create post',
        desc: 'Writes go through API and persist to storage; fanout updates timelines.',
        active: ['api','write','fanout'],
        edges: [['client','api'], ['api','write'], ['write','fanout']]
      },
      {
        title: 'Notifications',
        desc: 'Notification pipeline sends updates for likes/comments and friend activity.',
        active: ['notify','push','client'],
        edges: [['fanout','notify'], ['notify','push'], ['push','client']]
      },
      {
        title: 'Analytics and ads',
        desc: 'Engagement events feed analytics and ad targeting/measurement.',
        active: ['metrics','ads','analytics'],
        edges: [['client','metrics'], ['metrics','analytics'], ['analytics','ads']]
      }
    ]
  },

  slack: {
    title: 'Slack',
    steps: [
      {
        title: 'Open workspace and sync',
        desc: 'Client authenticates and syncs channel list and recent messages.',
        active: ['client','auth','sync'],
        edges: [['client','auth'], ['auth','sync']]
      },
      {
        title: 'Send message',
        desc: 'Message goes to API; permissions checked; event is persisted.',
        active: ['api','authz','store'],
        edges: [['client','api'], ['api','authz'], ['api','store']]
      },
      {
        title: 'Fanout and realtime delivery',
        desc: 'Event is fanned out to channel members over realtime gateways.',
        active: ['fanout','realtime','client'],
        edges: [['store','fanout'], ['fanout','realtime'], ['realtime','client']]
      },
      {
        title: 'Search indexing',
        desc: 'Messages are indexed for fast search across workspace history.',
        active: ['index','search','store'],
        edges: [['store','index'], ['index','search']]
      },
      {
        title: 'Files and attachments',
        desc: 'Files upload to object storage; links and previews update messages.',
        active: ['upload','obj','cdn'],
        edges: [['client','upload'], ['upload','obj'], ['obj','cdn']]
      },
      {
        title: 'Integrations and bots',
        desc: 'Apps receive events via webhooks; bots post messages and actions.',
        active: ['apps','webhooks','api'],
        edges: [['fanout','apps'], ['apps','webhooks'], ['webhooks','api']]
      }
    ]
  }

  ,

  dropbox: {
    title: 'Dropbox',
    steps: [
      {
        title: 'Open app and list files',
        desc: 'Client syncs metadata and lists folders quickly using caches.',
        active: ['client','metadata','sync'],
        edges: [['client','metadata'], ['metadata','sync']]
      },
      {
        title: 'Upload file',
        desc: 'Resumable upload streams chunks to storage; retries handle flaky networks.',
        active: ['client','upload','storage'],
        edges: [['client','upload'], ['upload','storage']]
      },
      {
        title: 'Index and search',
        desc: 'Metadata and content indexing power fast search and suggestions.',
        active: ['index','search','metadata'],
        edges: [['metadata','index'], ['index','search']]
      },
      {
        title: 'Sharing and permissions',
        desc: 'Share links and ACLs control access and auditing.',
        active: ['sharing','authz','audit'],
        edges: [['client','sharing'], ['sharing','authz'], ['authz','audit']]
      },
      {
        title: 'Sync across devices',
        desc: 'Sync engine detects changes and propagates updates to devices.',
        active: ['sync','realtime','client'],
        edges: [['storage','sync'], ['sync','realtime'], ['realtime','client']]
      },
      {
        title: 'Versioning and recovery',
        desc: 'Versions and retention allow rollback and recovery after deletions.',
        active: ['versions','storage','support'],
        edges: [['storage','versions'], ['versions','support']]
      }
    ]
  },

  gmail: {
    title: 'Gmail',
    steps: [
      {
        title: 'Sync inbox',
        desc: 'Client syncs inbox with cached threads and labels for fast load.',
        active: ['client','inbox','cache'],
        edges: [['client','inbox'], ['inbox','cache']]
      },
      {
        title: 'Compose and send',
        desc: 'Message is sent through SMTP pipeline with auth and policy checks.',
        active: ['client','send','auth'],
        edges: [['client','send'], ['send','auth']]
      },
      {
        title: 'Spam and security scanning',
        desc: 'Spam classifier and security scanning check attachments and links.',
        active: ['spam','security','send'],
        edges: [['send','spam'], ['spam','security']]
      },
      {
        title: 'Deliver and store',
        desc: 'Mail is delivered and stored; threads and labels are updated.',
        active: ['delivery','store','index'],
        edges: [['security','delivery'], ['delivery','store'], ['store','index']]
      },
      {
        title: 'Search and filters',
        desc: 'Index supports search; filters and rules apply automatically.',
        active: ['search','index','filters'],
        edges: [['index','search'], ['search','filters']]
      },
      {
        title: 'Notifications',
        desc: 'Push notifications inform clients of new mail and updates.',
        active: ['notify','push','client'],
        edges: [['delivery','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  'microsoft-teams': {
    title: 'Microsoft Teams',
    steps: [
      {
        title: 'Sign in and sync teams',
        desc: 'Client authenticates and syncs teams/channels and recent messages.',
        active: ['client','auth','sync'],
        edges: [['client','auth'], ['auth','sync']]
      },
      {
        title: 'Send chat message',
        desc: 'Message is persisted and fanned out via realtime gateways.',
        active: ['api','store','realtime'],
        edges: [['client','api'], ['api','store'], ['store','realtime']]
      },
      {
        title: 'Meetings and signaling',
        desc: 'Meeting join uses signaling and media negotiation to set up calls.',
        active: ['meet','signaling','media'],
        edges: [['client','meet'], ['meet','signaling'], ['signaling','media']]
      },
      {
        title: 'Media relay',
        desc: 'SFU/relay services route audio/video streams for group calls.',
        active: ['media','sfu','client'],
        edges: [['client','media'], ['media','sfu'], ['sfu','client']]
      },
      {
        title: 'Files and collaboration',
        desc: 'Files are stored in cloud storage; permissions and sharing apply.',
        active: ['files','storage','authz'],
        edges: [['client','files'], ['files','storage'], ['storage','authz']]
      },
      {
        title: 'Notifications and compliance',
        desc: 'Notifications deliver updates; compliance tools audit and retain data.',
        active: ['notify','compliance','audit'],
        edges: [['store','notify'], ['store','compliance'], ['compliance','audit']]
      }
    ]
  },

  trello: {
    title: 'Trello',
    steps: [
      {
        title: 'Load boards',
        desc: 'Client fetches boards, lists, cards and permissions with caching.',
        active: ['client','boards','cache'],
        edges: [['client','boards'], ['boards','cache']]
      },
      {
        title: 'Move card (drag/drop)',
        desc: 'Card update is validated and persisted; activity log is updated.',
        active: ['api','store','activity'],
        edges: [['client','api'], ['api','store'], ['store','activity']]
      },
      {
        title: 'Realtime updates',
        desc: 'Board changes are pushed to connected clients for collaboration.',
        active: ['realtime','client','store'],
        edges: [['store','realtime'], ['realtime','client']]
      },
      {
        title: 'Comments and mentions',
        desc: 'Comments persist and trigger notifications to mentioned users.',
        active: ['comments','notify','store'],
        edges: [['client','comments'], ['comments','store'], ['comments','notify']]
      },
      {
        title: 'Attachments',
        desc: 'Attachments upload to object storage and link to cards.',
        active: ['upload','obj','store'],
        edges: [['client','upload'], ['upload','obj'], ['upload','store']]
      },
      {
        title: 'Automation and integrations',
        desc: 'Rules and integrations run actions and post updates back to boards.',
        active: ['automation','apps','api'],
        edges: [['store','automation'], ['automation','apps'], ['apps','api']]
      }
    ]
  },

  asana: {
    title: 'Asana',
    steps: [
      {
        title: 'Load projects and tasks',
        desc: 'Client fetches projects and tasks with caching and permissions.',
        active: ['client','projects','cache'],
        edges: [['client','projects'], ['projects','cache']]
      },
      {
        title: 'Create/update task',
        desc: 'Write is validated and persisted; activity stream updates.',
        active: ['api','store','activity'],
        edges: [['client','api'], ['api','store'], ['store','activity']]
      },
      {
        title: 'Assignments and notifications',
        desc: 'Assignment changes trigger notifications and inbox updates.',
        active: ['notify','inbox','store'],
        edges: [['store','notify'], ['notify','inbox']]
      },
      {
        title: 'Realtime collaboration',
        desc: 'Realtime layer pushes updates to collaborators.',
        active: ['realtime','client','store'],
        edges: [['store','realtime'], ['realtime','client']]
      },
      {
        title: 'Search and reporting',
        desc: 'Indexing powers search, dashboards, and reporting.',
        active: ['index','search','reports'],
        edges: [['store','index'], ['index','search'], ['search','reports']]
      },
      {
        title: 'Automation and integrations',
        desc: 'Rules and integrations run workflows and update tasks.',
        active: ['automation','apps','api'],
        edges: [['store','automation'], ['automation','apps'], ['apps','api']]
      }
    ]
  },

  clickup: {
    title: 'ClickUp',
    steps: [
      {
        title: 'Load workspace',
        desc: 'Client syncs spaces/lists/tasks and permissions.',
        active: ['client','sync','authz'],
        edges: [['client','sync'], ['sync','authz']]
      },
      {
        title: 'Create/update task',
        desc: 'Writes persist task updates; activity log updates.',
        active: ['api','store','activity'],
        edges: [['client','api'], ['api','store'], ['store','activity']]
      },
      {
        title: 'Docs and collaboration',
        desc: 'Docs edits sync and merge in realtime collaboration layer.',
        active: ['docs','realtime','merge'],
        edges: [['client','docs'], ['docs','realtime'], ['realtime','merge']]
      },
      {
        title: 'Notifications',
        desc: 'Changes trigger notifications and mentions across workspace.',
        active: ['notify','push','client'],
        edges: [['store','notify'], ['notify','push'], ['push','client']]
      },
      {
        title: 'Search and dashboards',
        desc: 'Indexing powers search and dashboards across tasks and docs.',
        active: ['index','search','dash'],
        edges: [['store','index'], ['index','search'], ['search','dash']]
      },
      {
        title: 'Automations and integrations',
        desc: 'Automations run and integrations deliver events to external tools.',
        active: ['automation','apps','webhooks'],
        edges: [['store','automation'], ['automation','apps'], ['apps','webhooks']]
      }
    ]
  },

  evernote: {
    title: 'Evernote',
    steps: [
      {
        title: 'Sync notes',
        desc: 'Client syncs notebooks and notes metadata for offline access.',
        active: ['client','sync','metadata'],
        edges: [['client','sync'], ['sync','metadata']]
      },
      {
        title: 'Edit note',
        desc: 'Edits are persisted and conflicts resolved; versions maintained.',
        active: ['editor','store','versions'],
        edges: [['client','editor'], ['editor','store'], ['store','versions']]
      },
      {
        title: 'Attachments',
        desc: 'Images and files upload to object storage and link to notes.',
        active: ['upload','obj','store'],
        edges: [['client','upload'], ['upload','obj'], ['upload','store']]
      },
      {
        title: 'Search indexing',
        desc: 'Indexing supports search and OCR for scanned documents.',
        active: ['index','search','ocr'],
        edges: [['store','index'], ['index','ocr'], ['index','search']]
      },
      {
        title: 'Sharing',
        desc: 'Shared notes use ACLs and link generation with audit logs.',
        active: ['sharing','authz','audit'],
        edges: [['client','sharing'], ['sharing','authz'], ['authz','audit']]
      },
      {
        title: 'Notifications and reminders',
        desc: 'Reminders and notifications keep users engaged.',
        active: ['notify','scheduler','client'],
        edges: [['store','scheduler'], ['scheduler','notify'], ['notify','client']]
      }
    ]
  },

  airtable: {
    title: 'Airtable',
    steps: [
      {
        title: 'Load base and views',
        desc: 'Client fetches schema, views, and records with caching.',
        active: ['client','api','schema'],
        edges: [['client','api'], ['api','schema']]
      },
      {
        title: 'Edit cell',
        desc: 'Write validates types and permissions; records persist to storage.',
        active: ['api','authz','store'],
        edges: [['client','api'], ['api','authz'], ['api','store']]
      },
      {
        title: 'Realtime collaboration',
        desc: 'Realtime updates push edits to collaborators and resolve conflicts.',
        active: ['realtime','client','store'],
        edges: [['store','realtime'], ['realtime','client']]
      },
      {
        title: 'Automations',
        desc: 'Automation engine runs triggers and actions on record changes.',
        active: ['automation','queue','store'],
        edges: [['store','automation'], ['automation','queue']]
      },
      {
        title: 'Integrations and webhooks',
        desc: 'Webhooks deliver change events to external systems.',
        active: ['webhooks','apps','api'],
        edges: [['automation','webhooks'], ['webhooks','apps'], ['apps','api']]
      },
      {
        title: 'Search and analytics',
        desc: 'Indexing supports search and analytics across bases.',
        active: ['index','search','analytics'],
        edges: [['store','index'], ['index','search'], ['search','analytics']]
      }
    ]
  },

  'monday-com': {
    title: 'Monday.com',
    steps: [
      {
        title: 'Load boards',
        desc: 'Client loads boards and items with permissions and caching.',
        active: ['client','boards','cache'],
        edges: [['client','boards'], ['boards','cache']]
      },
      {
        title: 'Update item',
        desc: 'Writes are validated and persisted; activity stream updates.',
        active: ['api','store','activity'],
        edges: [['client','api'], ['api','store'], ['store','activity']]
      },
      {
        title: 'Automation',
        desc: 'Automations trigger actions, notifications, and integrations.',
        active: ['automation','queue','notify'],
        edges: [['store','automation'], ['automation','queue'], ['automation','notify']]
      },
      {
        title: 'Realtime collaboration',
        desc: 'Realtime layer pushes updates to collaborators.',
        active: ['realtime','client','store'],
        edges: [['store','realtime'], ['realtime','client']]
      },
      {
        title: 'Integrations',
        desc: 'Integrations deliver events to external tools via webhooks/API.',
        active: ['apps','webhooks','api'],
        edges: [['automation','apps'], ['apps','webhooks'], ['webhooks','api']]
      },
      {
        title: 'Dashboards and reporting',
        desc: 'Dashboards aggregate data and compute reporting metrics.',
        active: ['reports','analytics','store'],
        edges: [['store','reports'], ['reports','analytics']]
      }
    ]
  },

  zoom: {
    title: 'Zoom',
    steps: [
      {
        title: 'Schedule/join meeting',
        desc: 'Client authenticates and joins meeting using meeting service.',
        active: ['client','auth','meet'],
        edges: [['client','auth'], ['client','meet']]
      },
      {
        title: 'Signaling and negotiation',
        desc: 'Signaling sets up session, exchanges capabilities, and negotiates media.',
        active: ['signaling','media','client'],
        edges: [['meet','signaling'], ['signaling','media']]
      },
      {
        title: 'Media relay (SFU)',
        desc: 'SFU/relay routes audio/video streams and adapts to network conditions.',
        active: ['sfu','media','client'],
        edges: [['client','media'], ['media','sfu'], ['sfu','client']]
      },
      {
        title: 'Recording (optional)',
        desc: 'Cloud recording stores media and generates playback assets.',
        active: ['record','storage','cdn'],
        edges: [['sfu','record'], ['record','storage'], ['storage','cdn']]
      },
      {
        title: 'Chat and reactions',
        desc: 'Meeting chat uses messaging and moderation pipelines.',
        active: ['chat','realtime','moderation'],
        edges: [['client','chat'], ['chat','realtime'], ['realtime','moderation']]
      },
      {
        title: 'Telemetry and QoE',
        desc: 'Metrics feed analytics to improve quality and detect issues.',
        active: ['metrics','analytics','support'],
        edges: [['client','metrics'], ['metrics','analytics'], ['analytics','support']]
      }
    ]
  }

  ,

  discord: {
    title: 'Discord',
    steps: [
      {
        title: 'Open app and sync servers',
        desc: 'Client authenticates and syncs guilds, channels, and recent messages.',
        active: ['client','auth','sync'],
        edges: [['client','auth'], ['auth','sync']]
      },
      {
        title: 'Send message',
        desc: 'Message is persisted and fanned out via realtime gateways.',
        active: ['api','store','realtime'],
        edges: [['client','api'], ['api','store'], ['store','realtime']]
      },
      {
        title: 'Voice join and signaling',
        desc: 'Voice join negotiates media via signaling services.',
        active: ['voice','signaling','media'],
        edges: [['client','voice'], ['voice','signaling'], ['signaling','media']]
      },
      {
        title: 'Media relay',
        desc: 'SFU/relay routes audio/video streams for voice channels.',
        active: ['media','sfu','client'],
        edges: [['client','media'], ['media','sfu'], ['sfu','client']]
      },
      {
        title: 'Moderation and safety',
        desc: 'Spam detection, reporting, and moderation actions are applied.',
        active: ['moderation','risk','store'],
        edges: [['store','moderation'], ['moderation','risk']]
      },
      {
        title: 'Notifications',
        desc: 'Mentions and DMs trigger notifications and push delivery.',
        active: ['notify','push','client'],
        edges: [['store','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  reddit: {
    title: 'Reddit',
    steps: [
      {
        title: 'Load home feed',
        desc: 'Client requests home feed; caching and prefetch speed up rendering.',
        active: ['client','feed','cache'],
        edges: [['client','feed'], ['feed','cache']]
      },
      {
        title: 'Ranking and personalization',
        desc: 'Ranking selects posts using subscriptions, votes, and personalization.',
        active: ['rank','feed','recos'],
        edges: [['feed','rank'], ['rank','recos']]
      },
      {
        title: 'Open post and comments',
        desc: 'Thread service fetches comments tree with pagination and caching.',
        active: ['thread','comments','cache'],
        edges: [['feed','thread'], ['thread','comments'], ['comments','cache']]
      },
      {
        title: 'Vote and comment',
        desc: 'Writes persist votes/comments and update counters safely.',
        active: ['api','write','counters'],
        edges: [['client','api'], ['api','write'], ['write','counters']]
      },
      {
        title: 'Moderation',
        desc: 'Automod and human mod tools enforce community rules.',
        active: ['moderation','policy','risk'],
        edges: [['write','moderation'], ['moderation','policy'], ['policy','risk']]
      },
      {
        title: 'Notifications and messaging',
        desc: 'Replies/mentions trigger notifications and inbox updates.',
        active: ['notify','push','client'],
        edges: [['write','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  linkedin: {
    title: 'LinkedIn',
    steps: [
      {
        title: 'Load feed',
        desc: 'Client requests personalized feed with caching and fast rendering.',
        active: ['client','feed','cache'],
        edges: [['client','feed'], ['feed','cache']]
      },
      {
        title: 'Ranking and relevance',
        desc: 'Ranking selects posts using graph edges, recency, and engagement predictions.',
        active: ['rank','graph','feed'],
        edges: [['feed','rank'], ['rank','graph']]
      },
      {
        title: 'Profile and network graph',
        desc: 'Profile service fetches details and connection graph.',
        active: ['profile','graph','authz'],
        edges: [['client','profile'], ['profile','graph'], ['profile','authz']]
      },
      {
        title: 'Create post',
        desc: 'Writes persist posts; fanout updates feeds and notifications.',
        active: ['api','write','fanout'],
        edges: [['client','api'], ['api','write'], ['write','fanout']]
      },
      {
        title: 'Messaging',
        desc: 'Messages persist and deliver via realtime gateways.',
        active: ['messages','realtime','notify'],
        edges: [['client','messages'], ['messages','realtime'], ['messages','notify']]
      },
      {
        title: 'Jobs and recommendations',
        desc: 'Job search and recommendation models match candidates to roles.',
        active: ['jobs','recos','rank'],
        edges: [['client','jobs'], ['jobs','recos'], ['recos','rank']]
      }
    ]
  },

  signal: {
    title: 'Signal',
    steps: [
      {
        title: 'Compose message',
        desc: 'User composes message locally; client prepares payload.',
        active: ['client','sender'],
        edges: [['sender','client']]
      },
      {
        title: 'End-to-end encryption',
        desc: 'Client encrypts using Signal Protocol and recipient keys.',
        active: ['crypto','keybundle','sender'],
        edges: [['sender','crypto'], ['keybundle','crypto']]
      },
      {
        title: 'Server relay',
        desc: 'Server relays encrypted message without reading content.',
        active: ['relay','server','recipient'],
        edges: [['crypto','relay'], ['relay','recipient']]
      },
      {
        title: 'Push notification',
        desc: 'Push wakes recipient app to fetch and decrypt message.',
        active: ['push','recipient','relay'],
        edges: [['relay','push'], ['push','recipient']]
      },
      {
        title: 'Client decryption',
        desc: 'Recipient verifies and decrypts locally; message is displayed.',
        active: ['decrypt','recipient'],
        edges: [['recipient','decrypt']]
      },
      {
        title: 'Safety and spam controls',
        desc: 'Abuse reporting and rate limits help control spam and harassment.',
        active: ['moderation','risk','server'],
        edges: [['server','moderation'], ['moderation','risk']]
      }
    ]
  },

  threads: {
    title: 'Threads',
    steps: [
      {
        title: 'Load feed',
        desc: 'Client requests feed; caching and prefetch speed up load.',
        active: ['client','feed','cache'],
        edges: [['client','feed'], ['feed','cache']]
      },
      {
        title: 'Ranking and recommendations',
        desc: 'Ranking selects posts using graph signals and safety filters.',
        active: ['rank','recos','safety'],
        edges: [['feed','rank'], ['rank','recos'], ['rank','safety']]
      },
      {
        title: 'Create post',
        desc: 'Post is persisted; fanout updates followers feeds.',
        active: ['api','write','fanout'],
        edges: [['client','api'], ['api','write'], ['write','fanout']]
      },
      {
        title: 'Replies and conversations',
        desc: 'Thread service stores reply tree and serves conversation views.',
        active: ['thread','store','cache'],
        edges: [['write','thread'], ['thread','store'], ['store','cache']]
      },
      {
        title: 'Notifications',
        desc: 'Replies/mentions trigger notifications and push delivery.',
        active: ['notify','push','client'],
        edges: [['write','notify'], ['notify','push'], ['push','client']]
      },
      {
        title: 'Moderation',
        desc: 'Integrity systems enforce rules and handle reports.',
        active: ['moderation','policy','risk'],
        edges: [['store','moderation'], ['moderation','policy'], ['policy','risk']]
      }
    ]
  },

  messenger: {
    title: 'Messenger',
    steps: [
      {
        title: 'Send message',
        desc: 'Client sends message to API with auth session.',
        active: ['client','api','auth'],
        edges: [['client','api'], ['api','auth']]
      },
      {
        title: 'Routing and storage',
        desc: 'Backend routes messages and stores metadata and delivery state.',
        active: ['router','storage','api'],
        edges: [['api','router'], ['router','storage']]
      },
      {
        title: 'Delivery and fanout',
        desc: 'Fanout delivers to recipients and updates inbox state.',
        active: ['fanout','realtime','client'],
        edges: [['router','fanout'], ['fanout','realtime'], ['realtime','client']]
      },
      {
        title: 'Push notifications',
        desc: 'Push notifies offline recipients and wakes apps.',
        active: ['push','notify','client'],
        edges: [['fanout','notify'], ['notify','push'], ['push','client']]
      },
      {
        title: 'Media messages',
        desc: 'Media uploads to storage and serves via CDN.',
        active: ['upload','obj','cdn'],
        edges: [['client','upload'], ['upload','obj'], ['obj','cdn']]
      },
      {
        title: 'Spam and integrity',
        desc: 'Abuse detection and reporting systems enforce policies.',
        active: ['moderation','risk','storage'],
        edges: [['storage','moderation'], ['moderation','risk']]
      }
    ]
  },

  'twitter-x': {
    title: 'Twitter (X)',
    steps: [
      {
        title: 'Load timeline',
        desc: 'Client requests timeline; caching and prefetch improve performance.',
        active: ['client','timeline','cache'],
        edges: [['client','timeline'], ['timeline','cache']]
      },
      {
        title: 'Ranking and relevance',
        desc: 'Ranking selects tweets using graph, follows, and engagement signals.',
        active: ['rank','graph','timeline'],
        edges: [['timeline','rank'], ['rank','graph']]
      },
      {
        title: 'Post tweet',
        desc: 'Write persists tweet; fanout updates followers timelines and search.',
        active: ['api','write','fanout'],
        edges: [['client','api'], ['api','write'], ['write','fanout']]
      },
      {
        title: 'Media upload',
        desc: 'Media uploads to storage and serves via CDN.',
        active: ['upload','obj','cdn'],
        edges: [['client','upload'], ['upload','obj'], ['obj','cdn']]
      },
      {
        title: 'Search and trends',
        desc: 'Indexing powers search and trends detection.',
        active: ['index','search','trends'],
        edges: [['write','index'], ['index','search'], ['search','trends']]
      },
      {
        title: 'Moderation and notifications',
        desc: 'Integrity systems enforce rules; notifications deliver mentions/replies.',
        active: ['moderation','notify','push'],
        edges: [['write','moderation'], ['write','notify'], ['notify','push']]
      }
    ]
  },

  notion: {
    title: 'Notion',
    steps: [
      {
        title: 'Open workspace and sync',
        desc: 'Client syncs workspace pages and permissions for fast load.',
        active: ['client','sync','authz'],
        edges: [['client','sync'], ['sync','authz']]
      },
      {
        title: 'Load page and blocks',
        desc: 'Page blocks are fetched and rendered; caching speeds navigation.',
        active: ['pages','blocks','cache'],
        edges: [['client','pages'], ['pages','blocks'], ['blocks','cache']]
      },
      {
        title: 'Edit and persist',
        desc: 'Edits persist as operations; conflict resolution merges changes.',
        active: ['editor','store','merge'],
        edges: [['client','editor'], ['editor','store'], ['store','merge']]
      },
      {
        title: 'Realtime collaboration',
        desc: 'Realtime gateway broadcasts changes to collaborators.',
        active: ['realtime','client','store'],
        edges: [['store','realtime'], ['realtime','client']]
      },
      {
        title: 'Search indexing',
        desc: 'Indexing powers search across pages and databases.',
        active: ['index','search','store'],
        edges: [['store','index'], ['index','search']]
      },
      {
        title: 'Sharing and permissions',
        desc: 'Sharing links and permissions enforce access and auditing.',
        active: ['sharing','authz','audit'],
        edges: [['client','sharing'], ['sharing','authz'], ['authz','audit']]
      }
    ]
  },

  jira: {
    title: 'Jira',
    steps: [
      {
        title: 'Load projects and boards',
        desc: 'Client fetches projects, boards, and issues with caching and permissions.',
        active: ['client','projects','cache'],
        edges: [['client','projects'], ['projects','cache']]
      },
      {
        title: 'Create/update issue',
        desc: 'Writes validate fields and permissions; issues persist to storage.',
        active: ['api','authz','store'],
        edges: [['client','api'], ['api','authz'], ['api','store']]
      },
      {
        title: 'Workflows and automation',
        desc: 'Workflow engine runs transitions and automations.',
        active: ['workflow','automation','queue'],
        edges: [['store','workflow'], ['workflow','automation'], ['automation','queue']]
      },
      {
        title: 'Search and JQL',
        desc: 'Indexing powers JQL search across issues and comments.',
        active: ['index','search','store'],
        edges: [['store','index'], ['index','search']]
      },
      {
        title: 'Notifications and mentions',
        desc: 'Notifications deliver updates and mentions to users.',
        active: ['notify','email','client'],
        edges: [['workflow','notify'], ['notify','email'], ['email','client']]
      },
      {
        title: 'Reporting',
        desc: 'Dashboards aggregate metrics for sprints and project reporting.',
        active: ['reports','analytics','store'],
        edges: [['store','reports'], ['reports','analytics']]
      }
    ]
  },

  calendly: {
    title: 'Calendly',
    steps: [
      {
        title: 'Load availability',
        desc: 'Calendly pulls availability from connected calendars and rules.',
        active: ['client','availability','calendars'],
        edges: [['client','availability'], ['availability','calendars']]
      },
      {
        title: 'Pick time slot',
        desc: 'User selects a slot; server checks conflicts and holds the slot.',
        active: ['booking','conflicts','hold'],
        edges: [['client','booking'], ['booking','conflicts'], ['conflicts','hold']]
      },
      {
        title: 'Create event',
        desc: 'Event is created in calendars and stored in scheduling system.',
        active: ['events','calendars','store'],
        edges: [['hold','events'], ['events','calendars'], ['events','store']]
      },
      {
        title: 'Notifications and reminders',
        desc: 'Email/SMS reminders and confirmations are sent.',
        active: ['notify','email','sms'],
        edges: [['events','notify'], ['notify','email'], ['notify','sms']]
      },
      {
        title: 'Reschedule/cancel',
        desc: 'Changes update calendars and notify attendees.',
        active: ['changes','calendars','notify'],
        edges: [['client','changes'], ['changes','calendars'], ['changes','notify']]
      },
      {
        title: 'Integrations',
        desc: 'Webhooks and integrations update CRMs and meeting tools.',
        active: ['apps','webhooks','api'],
        edges: [['events','apps'], ['apps','webhooks'], ['webhooks','api']]
      }
    ]
  }
};

export function flowForSystem(sys) {
  if (!sys) return null;
  const id = sys.id;
  return FLOWS[id] || null;
}
