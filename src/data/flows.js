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
        edges: [['sender','crypto'], ['keybundle','crypto']]
      },
      {
        title: 'Server relay',
        desc: 'WhatsApp servers relay the encrypted packet without reading the content.',
        active: ['relay'],
        edges: [['crypto','relay'], ['relay','decrypt']]
      },
      {
        title: 'Push notification',
        desc: 'If the recipient is offline, push services wake the app to fetch the message.',
        active: ['push','recipient','relay'],
        edges: [['relay','push'], ['push','recipient']]
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
};

export function flowForSystem(sys) {
  if (!sys) return null;
  const id = sys.id;
  return FLOWS[id] || null;
}
