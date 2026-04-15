/**
 * Product flows (steps + diagrams)
 *
 * This file is the source of truth for per-product user/system/architecture flows.
 * Add new products in batches here.
 */

export const FLOWS = {
  line: {
    title: 'LINE',
    steps: [
      {
        title: 'Sign in + session setup',
        desc: 'Client establishes session; auth refresh and device registration completed.',
        active: ['client','auth'],
        edges: [['client','auth']]
      },
      {
        title: 'Send message',
        desc: 'Client posts message; server validates and persists message state.',
        active: ['client','api','storage'],
        edges: [['client','api'], ['api','storage']]
      },
      {
        title: 'Fanout + multi-device sync',
        desc: 'Fanout delivers to online devices via realtime gateways and syncs state across devices.',
        active: ['fanout','realtime','sync','storage'],
        edges: [['storage','fanout'], ['fanout','realtime'], ['realtime','client'], ['storage','sync'], ['sync','client']]
      },
      {
        title: 'Media sharing (upload + CDN)',
        desc: 'Media uploads to object storage; CDN serves downloads and previews.',
        active: ['upload','obj','cdn','client'],
        edges: [['client','upload'], ['upload','obj'], ['obj','cdn'], ['cdn','client']]
      },
      {
        title: 'Stickers + LINE Store commerce',
        desc: 'Sticker catalog and purchases integrate with payments, entitlements, and fraud controls.',
        active: ['catalog','payments','policy','risk','ledger'],
        edges: [['client','catalog'], ['catalog','policy'], ['policy','payments'], ['payments','risk'], ['payments','ledger']]
      },
      {
        title: 'Anti-spam and moderation',
        desc: 'Spam controls and moderation workflows enforce safety.',
        active: ['moderation','risk','storage'],
        edges: [['storage','moderation'], ['moderation','risk']]
      }
    ]
  },

  kakaotalk: {
    title: 'KakaoTalk',
    steps: [
      {
        title: 'Login + contacts sync',
        desc: 'Client authenticates and syncs contacts/friends graph.',
        active: ['client','auth','contacts'],
        edges: [['client','auth'], ['auth','contacts']]
      },
      {
        title: 'Send message',
        desc: 'Message is submitted; server persists state for multi-device sync.',
        active: ['client','api','storage'],
        edges: [['client','api'], ['api','storage']]
      },
      {
        title: 'Realtime delivery + push + sync',
        desc: 'Realtime delivers to online devices; push wakes offline recipients; sync aligns device state.',
        active: ['realtime','fanout','push','notify','sync'],
        edges: [['storage','fanout'], ['fanout','realtime'], ['realtime','client'], ['fanout','notify'], ['notify','push'], ['storage','sync']]
      },
      {
        title: 'Media/file sharing',
        desc: 'Uploads stored in object store; CDN serves downloads and previews.',
        active: ['upload','obj','cdn','client'],
        edges: [['client','upload'], ['upload','obj'], ['obj','cdn'], ['cdn','client']]
      },
      {
        title: 'Payments/commerce (Kakao ecosystem)',
        desc: 'In-chat purchases and payments run through risk and ledgering.',
        active: ['payments','risk','ledger','notify'],
        edges: [['client','payments'], ['payments','risk'], ['risk','ledger'], ['ledger','notify']]
      },
      {
        title: 'Moderation + anti-abuse',
        desc: 'Spam controls, reporting, and moderation enforce policies.',
        active: ['moderation','risk'],
        edges: [['storage','moderation'], ['moderation','risk']]
      }
    ]
  },

  viber: {
    title: 'Viber',
    steps: [
      {
        title: 'Session + identity',
        desc: 'Client authenticates; device keys and session state established.',
        active: ['client','auth'],
        edges: [['client','auth']]
      },
      {
        title: 'Send message (routing + persistence)',
        desc: 'Message is routed and persisted for multi-device delivery and history.',
        active: ['client','api','router','storage','sync'],
        edges: [['client','api'], ['api','router'], ['router','storage'], ['storage','sync']]
      },
      {
        title: 'Delivery + push',
        desc: 'Fanout/realtime delivers to devices; push notifications for offline recipients.',
        active: ['fanout','realtime','push','notify'],
        edges: [['storage','fanout'], ['fanout','realtime'], ['realtime','client'], ['fanout','notify'], ['notify','push']]
      },
      {
        title: 'Media sharing (upload + CDN)',
        desc: 'Media stored in object store; CDN serves media.',
        active: ['upload','obj','cdn','client'],
        edges: [['client','upload'], ['upload','obj'], ['obj','cdn'], ['cdn','client']]
      },
      {
        title: 'Communities and broadcast',
        desc: 'Large groups require caching and fanout optimization.',
        active: ['fanout','cache'],
        edges: [['router','fanout'], ['fanout','cache']]
      },
      {
        title: 'Spam controls',
        desc: 'Anti-spam and moderation systems enforce safety.',
        active: ['moderation','risk'],
        edges: [['storage','moderation'], ['moderation','risk']]
      }
    ]
  },

  hike: {
    title: 'Hike',
    steps: [
      {
        title: 'Login + contact discovery',
        desc: 'Client authenticates and discovers contacts/friends.',
        active: ['client','auth','contacts'],
        edges: [['client','auth'], ['auth','contacts']]
      },
      {
        title: 'Send message',
        desc: 'Message is submitted; persisted for delivery and sync.',
        active: ['client','api','storage'],
        edges: [['client','api'], ['api','storage']]
      },
      {
        title: 'Realtime delivery + notifications',
        desc: 'Fanout/realtime delivers; push notifications wake offline devices.',
        active: ['fanout','realtime','notify','push'],
        edges: [['storage','fanout'], ['fanout','realtime'], ['fanout','notify'], ['notify','push']]
      },
      {
        title: 'Media and stickers',
        desc: 'Media uploaded; stickers catalog served; CDN delivers assets.',
        active: ['upload','obj','cdn','catalog'],
        edges: [['client','upload'], ['upload','obj'], ['obj','cdn'], ['client','catalog']]
      },
      {
        title: 'Groups',
        desc: 'Group messaging uses fanout and caching.',
        active: ['fanout','cache'],
        edges: [['storage','fanout'], ['fanout','cache']]
      },
      {
        title: 'Moderation + anti-abuse',
        desc: 'Spam controls enforce safety policies.',
        active: ['moderation','risk'],
        edges: [['storage','moderation'], ['moderation','risk']]
      }
    ]
  },

  imo: {
    title: 'IMO',
    steps: [
      {
        title: 'Authenticate + presence',
        desc: 'Client establishes session; presence state updated.',
        active: ['client','auth','presence'],
        edges: [['client','auth'], ['auth','presence']]
      },
      {
        title: 'Start chat/call',
        desc: 'Client initiates chat or call; signaling routes session setup.',
        active: ['client','api','signaling'],
        edges: [['client','api'], ['api','signaling']]
      },
      {
        title: 'Realtime media path',
        desc: 'Media flows through relay/SFU where needed; realtime updates flow to peers.',
        active: ['realtime','media','sfu'],
        edges: [['signaling','realtime'], ['realtime','media'], ['media','sfu']]
      },
      {
        title: 'Messaging persistence',
        desc: 'Messages persist for sync and delivery guarantees.',
        active: ['storage','fanout'],
        edges: [['api','storage'], ['storage','fanout']]
      },
      {
        title: 'Notifications',
        desc: 'Push notifications wake offline devices for messages/calls.',
        active: ['notify','push','client'],
        edges: [['fanout','notify'], ['notify','push'], ['push','client']]
      },
      {
        title: 'Safety controls',
        desc: 'Spam, abuse, and moderation enforce platform safety.',
        active: ['moderation','risk'],
        edges: [['storage','moderation'], ['moderation','risk']]
      }
    ]
  },

  'marco-polo': {
    title: 'Marco Polo',
    steps: [
      {
        title: 'Authenticate + threads',
        desc: 'Client authenticates and loads contacts and threads.',
        active: ['client','auth','profiles'],
        edges: [['client','auth'], ['auth','profiles']]
      },
      {
        title: 'Record + upload video message',
        desc: 'User records async video; upload stores asset and metadata.',
        active: ['client','upload','obj','transcode'],
        edges: [['client','upload'], ['upload','obj'], ['obj','transcode']]
      },
      {
        title: 'Process + publish to CDN',
        desc: 'Transcode produces renditions; CDN serves playback to recipients.',
        active: ['transcode','cdn'],
        edges: [['transcode','cdn'], ['cdn','client']]
      },
      {
        title: 'Delivery + notifications',
        desc: 'Recipients notified; thread updates sync across devices.',
        active: ['fanout','notify','push','sync'],
        edges: [['obj','fanout'], ['fanout','notify'], ['notify','push'], ['sync','client']]
      },
      {
        title: 'Playback + telemetry',
        desc: 'Playback events feed analytics and quality signals.',
        active: ['analytics','metrics'],
        edges: [['client','metrics'], ['metrics','analytics']]
      }
    ]
  },

  houseparty: {
    title: 'Houseparty',
    steps: [
      {
        title: 'Login + presence',
        desc: 'Client authenticates; presence updates show who is available.',
        active: ['client','auth','presence'],
        edges: [['client','auth'], ['auth','presence']]
      },
      {
        title: 'Create/join room',
        desc: 'Room created; realtime service tracks participants and state.',
        active: ['realtime','signaling'],
        edges: [['client','signaling'], ['signaling','realtime']]
      },
      {
        title: 'Media session (SFU/relay)',
        desc: 'Audio/video flows through SFU/relay; QoE monitored.',
        active: ['media','sfu','metrics'],
        edges: [['signaling','media'], ['media','sfu'], ['media','metrics']]
      },
      {
        title: 'Chat + notifications',
        desc: 'In-room chat persists; notifications invite friends.',
        active: ['chat','notify','push'],
        edges: [['client','chat'], ['chat','notify'], ['notify','push']]
      },
      {
        title: 'Moderation + safety',
        desc: 'Safety systems handle reporting and abuse prevention.',
        active: ['moderation','risk'],
        edges: [['chat','moderation'], ['moderation','risk']]
      }
    ]
  },

  yubo: {
    title: 'Yubo',
    steps: [
      {
        title: 'Onboard + profile verification',
        desc: 'User onboards; age and safety verification run to prevent abuse.',
        active: ['client','auth','profiles','risk'],
        edges: [['client','auth'], ['auth','profiles'], ['profiles','risk']]
      },
      {
        title: 'Discovery + matching',
        desc: 'Discovery surfaces users and live rooms; matching uses preferences and safety filters.',
        active: ['match','profiles','moderation'],
        edges: [['profiles','match'], ['match','moderation']]
      },
      {
        title: 'Chat + realtime + notifications',
        desc: 'Messaging uses realtime delivery; notifications drive re-engagement.',
        active: ['chat','realtime','notify','push'],
        edges: [['client','chat'], ['chat','realtime'], ['realtime','notify'], ['notify','push']]
      },
      {
        title: 'Live streaming rooms',
        desc: 'Live rooms use signaling and media relay; moderation monitors streams.',
        active: ['signaling','media','moderation'],
        edges: [['client','signaling'], ['signaling','media'], ['media','moderation']]
      },
      {
        title: 'Reporting + enforcement',
        desc: 'Reports and blocks enforce safety policies and reduce abuse.',
        active: ['report','block','risk'],
        edges: [['client','report'], ['report','block'], ['report','risk']]
      }
    ]
  },
  wechat: {
    title: 'WeChat',
    steps: [
      {
        title: 'Open chat and authenticate',
        desc: 'Client loads session; auth refreshes tokens and establishes identity.',
        active: ['client','auth'],
        edges: [['client','auth']]
      },
      {
        title: 'Send a message (sync + realtime)',
        desc: 'Message is written, acknowledged, and routed for realtime delivery.',
        active: ['client','chat','realtime','storage'],
        edges: [['client','chat'], ['chat','realtime'], ['realtime','storage']]
      },
      {
        title: 'Fanout to recipients',
        desc: 'Backend fans out the message to online devices and queues for offline.',
        active: ['storage','fanout','notify'],
        edges: [['storage','fanout'], ['fanout','notify']]
      },
      {
        title: 'Push + delivery on device',
        desc: 'Push wakes offline clients; devices fetch and render the message.',
        active: ['notify','push','client'],
        edges: [['notify','push'], ['push','client']]
      },
      {
        title: 'Share media to Moments',
        desc: 'Media uploads are processed and attached to a social feed post.',
        active: ['client','media','moments'],
        edges: [['client','media'], ['media','moments']]
      },
      {
        title: 'Payments / mini program actions',
        desc: 'Transactions and mini program calls run through risk controls.',
        active: ['client','payments','miniapps','risk'],
        edges: [['client','payments'], ['client','miniapps'], ['payments','risk'], ['miniapps','risk']]
      },
      {
        title: 'Analytics + safety signals',
        desc: 'Events are aggregated to improve delivery, spam control, and UX.',
        active: ['analytics','risk'],
        edges: [['client','analytics']]
      }
    ]
  },

  qq: {
    title: 'QQ',
    steps: [
      {
        title: 'Login and load profile',
        desc: 'Client authenticates and loads user profile and settings.',
        active: ['client','auth','profiles'],
        edges: [['client','auth'], ['auth','profiles']]
      },
      {
        title: 'Start a group chat',
        desc: 'Client posts a message to group chat; groups service resolves members.',
        active: ['client','chat','groups'],
        edges: [['client','chat'], ['chat','groups']]
      },
      {
        title: 'Realtime delivery + store',
        desc: 'Messages stream through realtime and persist to the message store.',
        active: ['realtime','storage'],
        edges: [['groups','realtime'], ['realtime','storage']]
      },
      {
        title: 'Fanout and notifications',
        desc: 'Fanout triggers notify + push for offline recipients.',
        active: ['fanout','notify','push'],
        edges: [['storage','fanout'], ['fanout','notify'], ['notify','push']]
      },
      {
        title: 'Share media / files',
        desc: 'Media is uploaded and linked from chat messages.',
        active: ['media','chat'],
        edges: [['client','media'], ['media','chat']]
      },
      {
        title: 'Games / integrations',
        desc: 'In-app games route through integrations and are surfaced in chats.',
        active: ['games','chat'],
        edges: [['client','games'], ['games','chat']]
      },
      {
        title: 'Moderation + risk',
        desc: 'Safety and anti-abuse checks run on content and accounts.',
        active: ['moderation','risk'],
        edges: [['chat','moderation'], ['moderation','risk']]
      },
      {
        title: 'Analytics',
        desc: 'Telemetry improves performance and abuse detection.',
        active: ['analytics'],
        edges: [['client','analytics']]
      }
    ]
  },

  wink: {
    title: 'Wink',
    steps: [
      {
        title: 'Onboard + profile setup',
        desc: 'User signs up, sets profile, and grants permissions; safety checks run.',
        active: ['client','auth','profiles','risk'],
        edges: [['client','auth'], ['auth','profiles'], ['profiles','risk']]
      },
      {
        title: 'Discovery + matching',
        desc: 'Discovery ranks nearby/compatible users; matching applies preferences and safety filters.',
        active: ['match','profiles','moderation'],
        edges: [['profiles','match'], ['match','moderation']]
      },
      {
        title: 'Chat + realtime',
        desc: 'Messaging uses realtime delivery; notifications drive re-engagement.',
        active: ['chat','realtime','notify','push'],
        edges: [['client','chat'], ['chat','realtime'], ['realtime','notify'], ['notify','push']]
      },
      {
        title: 'Safety: blocks/reports',
        desc: 'Reports, blocks, and enforcement reduce abuse and spam.',
        active: ['report','block','risk'],
        edges: [['client','report'], ['report','block'], ['report','risk']]
      },
      {
        title: 'Analytics',
        desc: 'Telemetry improves match quality and detects abuse patterns.',
        active: ['analytics','risk'],
        edges: [['client','analytics'], ['analytics','risk']]
      }
    ]
  },

  slowly: {
    title: 'Slowly',
    steps: [
      {
        title: 'Sign in + profile preferences',
        desc: 'User signs in; profile and preferences used for matching and delivery rules.',
        active: ['client','auth','profiles'],
        edges: [['client','auth'], ['auth','profiles']]
      },
      {
        title: 'Find pen pals (matching)',
        desc: 'Matching proposes pen pals based on interests, language, and safety constraints.',
        active: ['match','profiles','risk'],
        edges: [['profiles','match'], ['match','risk']]
      },
      {
        title: 'Write a letter',
        desc: 'Letter is created and persisted; delivery time is computed.',
        active: ['messaging','store'],
        edges: [['client','messaging'], ['messaging','store']]
      },
      {
        title: 'Delay queue + delivery',
        desc: 'Delay queue schedules delivery; delivery service releases at computed time.',
        active: ['queue','delivery','notify','push'],
        edges: [['store','queue'], ['queue','delivery'], ['delivery','notify'], ['notify','push']]
      },
      {
        title: 'Moderation + safety',
        desc: 'Abuse/spam controls and moderation enforce policies on messages.',
        active: ['moderation','risk'],
        edges: [['store','moderation'], ['moderation','risk']]
      },
      {
        title: 'Analytics',
        desc: 'Engagement and delivery metrics improve matching and safety systems.',
        active: ['analytics'],
        edges: [['delivery','analytics']]
      }
    ]
  },

  'cult-fit': {
    title: 'Cult.fit',
    steps: [
      {
        title: 'Browse classes + centers',
        desc: 'User browses class catalog, center availability, and schedules.',
        active: ['client','catalog','schedule'],
        edges: [['client','catalog'], ['catalog','schedule']]
      },
      {
        title: 'Membership/entitlement check',
        desc: 'Entitlements and credits validated; eligibility rules applied.',
        active: ['auth','ledger','risk'],
        edges: [['client','auth'], ['auth','ledger'], ['ledger','risk']]
      },
      {
        title: 'Book a slot',
        desc: 'Booking reserves a spot; waitlist logic applies if full.',
        active: ['booking','schedule','notify'],
        edges: [['client','booking'], ['booking','schedule'], ['booking','notify']]
      },
      {
        title: 'Payments (if needed)',
        desc: 'Payments or wallet deductions occur; ledger updated.',
        active: ['payments','ledger'],
        edges: [['booking','payments'], ['payments','ledger']]
      },
      {
        title: 'Coach ops + attendance',
        desc: 'Coach rosters and attendance updates sync to ops systems.',
        active: ['coach','tracking','analytics'],
        edges: [['booking','coach'], ['coach','tracking'], ['tracking','analytics']]
      },
      {
        title: 'Notifications + reminders',
        desc: 'Reminders for class time, changes, and cancellations delivered to user.',
        active: ['notify','push','client'],
        edges: [['notify','push'], ['push','client']]
      }
    ]
  },

  'domino-s': {
    title: 'Domino’s',
    steps: [
      {
        title: 'Browse menu + build cart',
        desc: 'User browses menu; cart updated with customizations and pricing.',
        active: ['client','catalog','cart'],
        edges: [['client','catalog'], ['catalog','cart']]
      },
      {
        title: 'Checkout: address + store selection',
        desc: 'Checkout validates address, selects store, and computes delivery promise.',
        active: ['checkout','orders','pos'],
        edges: [['cart','checkout'], ['checkout','orders'], ['orders','pos']]
      },
      {
        title: 'Payment authorization',
        desc: 'Payment authorized (or COD); ledger updated.',
        active: ['payments','ledger','risk'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','ledger']]
      },
      {
        title: 'Kitchen production',
        desc: 'Order routed to kitchen; status updates (prepping/baking/ready).',
        active: ['kitchen','orders','notify'],
        edges: [['pos','kitchen'], ['kitchen','orders'], ['orders','notify']]
      },
      {
        title: 'Dispatch + tracking',
        desc: 'Delivery dispatched; driver tracking updates the customer timeline.',
        active: ['dispatch','driver','tracking'],
        edges: [['orders','dispatch'], ['dispatch','driver'], ['driver','tracking']]
      },
      {
        title: 'Support, refunds, loyalty',
        desc: 'Issues handled; refunds processed; loyalty and receipts updated.',
        active: ['support','refunds','ledger'],
        edges: [['tracking','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'mcdonald-s-app': {
    title: 'McDonald’s App',
    steps: [
      {
        title: 'Browse menu + offers',
        desc: 'User browses menu; personalized offers and loyalty pricing applied.',
        active: ['client','catalog','offers','loyalty'],
        edges: [['client','catalog'], ['catalog','offers'], ['offers','loyalty']]
      },
      {
        title: 'Build cart + select store',
        desc: 'Cart built; store selection and pickup method (counter/drive-thru/curbside) chosen.',
        active: ['cart','store','checkout'],
        edges: [['client','cart'], ['cart','checkout'], ['checkout','store']]
      },
      {
        title: 'Pay and place order',
        desc: 'Payment authorized; order placed and sent to store POS/kitchen.',
        active: ['payments','orders','store','kitchen'],
        edges: [['checkout','payments'], ['payments','orders'], ['orders','store'], ['store','kitchen']]
      },
      {
        title: 'Prepare order + status updates',
        desc: 'Kitchen prepares; status updates to app; pickup readiness communicated.',
        active: ['kitchen','notify','client'],
        edges: [['kitchen','notify'], ['notify','client']]
      },
      {
        title: 'Loyalty accrual + ledger',
        desc: 'Points accrue; receipts and ledger updated for reconciliation.',
        active: ['loyalty','ledger','analytics'],
        edges: [['orders','loyalty'], ['payments','ledger'], ['ledger','analytics']]
      },
      {
        title: 'Support + refunds',
        desc: 'Refunds and support cases adjust ledger and order records.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'jd-com': {
    title: 'JD.com',
    steps: [
      {
        title: 'Browse/search + ranking',
        desc: 'Search hits index; ranking selects products by price, inventory, and relevance.',
        active: ['client','search','index','rank','catalog'],
        edges: [['client','search'], ['search','index'], ['search','rank'], ['rank','catalog']]
      },
      {
        title: 'PDP: inventory + delivery promise',
        desc: 'PDP composes inventory, pricing, and delivery promise using fulfillment network.',
        active: ['catalog','inventory','checkout'],
        edges: [['catalog','inventory'], ['inventory','checkout']]
      },
      {
        title: 'Cart + checkout',
        desc: 'Cart totals computed; checkout validates address and applies promos.',
        active: ['cart','checkout','risk'],
        edges: [['client','cart'], ['cart','checkout'], ['checkout','risk']]
      },
      {
        title: 'Payments + risk',
        desc: 'Payments authorized; risk checks gate order placement.',
        active: ['payments','risk','ledger'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','ledger']]
      },
      {
        title: 'Fulfillment + carrier tracking',
        desc: 'Fulfillment allocates inventory; carrier tracking updates customer timeline.',
        active: ['fulfillment','carrier','tracking','notify'],
        edges: [['checkout','fulfillment'], ['fulfillment','carrier'], ['carrier','tracking'], ['tracking','notify']]
      },
      {
        title: 'Returns + refunds',
        desc: 'Returns create reverse logistics; refunds update ledger and inventory.',
        active: ['returns','refunds','ledger','inventory'],
        edges: [['tracking','returns'], ['returns','refunds'], ['refunds','ledger'], ['returns','inventory']]
      }
    ]
  },

  roposo: {
    title: 'Roposo',
    steps: [
      {
        title: 'Open feed (ranking + recos)',
        desc: 'Client loads feed; ranking selects videos using signals and safety filters.',
        active: ['client','feed','rank','moderation'],
        edges: [['client','feed'], ['feed','rank'], ['rank','moderation']]
      },
      {
        title: 'Playback (CDN)',
        desc: 'Videos stream from CDN; QoE metrics captured.',
        active: ['cdn','client','metrics'],
        edges: [['cdn','client'], ['client','metrics']]
      },
      {
        title: 'Upload short video',
        desc: 'Upload stored; transcode creates renditions; metadata written.',
        active: ['upload','obj','transcode','write'],
        edges: [['client','upload'], ['upload','obj'], ['obj','transcode'], ['upload','write']]
      },
      {
        title: 'Fanout + notifications',
        desc: 'Fanout updates followers; notifications for engagement.',
        active: ['fanout','notify'],
        edges: [['write','fanout'], ['fanout','notify']]
      },
      {
        title: 'Comments + interactions',
        desc: 'Comments/likes persist; signals update ranking features.',
        active: ['comments','analytics','rank'],
        edges: [['client','comments'], ['comments','analytics'], ['analytics','rank']]
      },
      {
        title: 'Ads + measurement',
        desc: 'Ads inserted; measurement and analytics recorded.',
        active: ['ads','analytics'],
        edges: [['client','ads'], ['ads','analytics']]
      }
    ]
  },

  likee: {
    title: 'Likee',
    steps: [
      {
        title: 'Open feed (rank + safety)',
        desc: 'Client loads feed; ranking selects content and applies moderation filters.',
        active: ['client','feed','rank','moderation'],
        edges: [['client','feed'], ['feed','rank'], ['rank','moderation']]
      },
      {
        title: 'Playback (CDN) + telemetry',
        desc: 'Videos stream from CDN; telemetry captured for QoE and engagement.',
        active: ['cdn','client','metrics','analytics'],
        edges: [['cdn','client'], ['client','metrics'], ['metrics','analytics']]
      },
      {
        title: 'Create + upload video',
        desc: 'Upload stored; transcode creates renditions; metadata written.',
        active: ['upload','obj','transcode','write'],
        edges: [['client','upload'], ['upload','obj'], ['obj','transcode'], ['upload','write']]
      },
      {
        title: 'Fanout + notifications',
        desc: 'Fanout updates followers; notifications for likes/comments.',
        active: ['fanout','notify'],
        edges: [['write','fanout'], ['fanout','notify']]
      },
      {
        title: 'Ads + monetization',
        desc: 'Ads inserted; measurement and analytics recorded.',
        active: ['ads','analytics'],
        edges: [['client','ads'], ['ads','analytics']]
      },
      {
        title: 'Moderation + anti-abuse',
        desc: 'Moderation/risk systems enforce policy and reduce spam.',
        active: ['moderation','risk'],
        edges: [['write','moderation'], ['moderation','risk']]
      }
    ]
  },

  peanut: {
    title: 'Peanut',
    steps: [
      {
        title: 'Create profile and preferences',
        desc: 'User sets up identity and matching preferences.',
        active: ['client','auth','profiles'],
        edges: [['client','auth'], ['auth','profiles']]
      },
      {
        title: 'Discover communities and people',
        desc: 'Discovery surfaces groups, topics, and suggested connections.',
        active: ['discover','matching'],
        edges: [['profiles','discover'], ['discover','matching']]
      },
      {
        title: 'Match and start chat',
        desc: 'A match enables messaging with realtime delivery.',
        active: ['chat','realtime'],
        edges: [['matching','chat'], ['chat','realtime']]
      },
      {
        title: 'Notifications',
        desc: 'Notify and push bring users back for replies and updates.',
        active: ['notify','push','client'],
        edges: [['chat','notify'], ['notify','push'], ['push','client']]
      },
      {
        title: 'Safety: blocks and reports',
        desc: 'Users can block/report; safety systems enforce actions.',
        active: ['safety','report','block'],
        edges: [['client','safety'], ['safety','report'], ['safety','block']]
      },
      {
        title: 'Analytics',
        desc: 'Events inform matching quality and retention improvements.',
        active: ['analytics'],
        edges: [['client','analytics']]
      }
    ]
  },

  fishbowl: {
    title: 'Fishbowl',
    steps: [
      {
        title: 'Verify work identity',
        desc: 'User verifies employment; identity is separated from public posting.',
        active: ['client','auth','identity','anon'],
        edges: [['client','auth'], ['auth','identity'], ['identity','anon']]
      },
      {
        title: 'Browse feed and topics',
        desc: 'Client loads topic feed, personalized to interests and org.',
        active: ['feed','topics'],
        edges: [['client','feed'], ['feed','topics']]
      },
      {
        title: 'Post anonymously',
        desc: 'Post is written via anon layer and stored for distribution.',
        active: ['post','anon'],
        edges: [['client','post'], ['post','anon']]
      },
      {
        title: 'Comments and engagement',
        desc: 'Comment writes update threads; feed reflects new activity.',
        active: ['comments','feed'],
        edges: [['client','comments'], ['comments','feed']]
      },
      {
        title: 'Moderation and policy enforcement',
        desc: 'Content is reviewed; policy decisions apply removals/limits.',
        active: ['moderation','policy'],
        edges: [['post','moderation'], ['moderation','policy']]
      },
      {
        title: 'Search',
        desc: 'Search queries hit an index built from posts and topics.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'Notifications + analytics',
        desc: 'Mentions/replies notify users; analytics tracks community health.',
        active: ['notify','analytics'],
        edges: [['post','notify'], ['post','analytics']]
      }
    ]
  },

  blind: {
    title: 'Blind',
    steps: [
      {
        title: 'Verify work identity',
        desc: 'Users verify workplace; posting remains anonymous to peers.',
        active: ['client','auth','identity','anon'],
        edges: [['client','auth'], ['auth','identity'], ['identity','anon']]
      },
      {
        title: 'Browse channels and feed',
        desc: 'Client loads channel feed and trending discussions.',
        active: ['feed','channels'],
        edges: [['client','feed'], ['feed','channels']]
      },
      {
        title: 'Post and comment',
        desc: 'Writes go through anon layer to stores for threads.',
        active: ['post','comments','anon'],
        edges: [['client','post'], ['post','anon'], ['client','comments']]
      },
      {
        title: 'Moderation, policy, and risk',
        desc: 'Anti-abuse checks and moderation actions enforce rules.',
        active: ['moderation','policy','risk'],
        edges: [['post','moderation'], ['moderation','policy'], ['policy','risk']]
      },
      {
        title: 'Search and indexing',
        desc: 'Search uses an index updated from channel and post writes.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'Notifications + analytics',
        desc: 'Replies and mentions notify; analytics measures abuse and engagement.',
        active: ['notify','analytics'],
        edges: [['post','notify'], ['post','analytics']]
      }
    ]
  },

  polywork: {
    title: 'Polywork',
    steps: [
      {
        title: 'Authenticate and load profile',
        desc: 'Client authenticates and loads identity and profile graph.',
        active: ['client','auth','profiles','graph'],
        edges: [['client','auth'], ['auth','profiles'], ['profiles','graph']]
      },
      {
        title: 'Publish a post / update',
        desc: 'User posts content; it is stored and becomes eligible for feed.',
        active: ['content'],
        edges: [['client','content']]
      },
      {
        title: 'Assemble feed + recommendations',
        desc: 'Feed is built using graph signals and recommendation service.',
        active: ['feed','recommend'],
        edges: [['content','feed'], ['graph','recommend'], ['recommend','feed']]
      },
      {
        title: 'Search across people and work',
        desc: 'Search hits an index built from profiles and content.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'Direct messages and notifications',
        desc: 'Messaging triggers notify + push for replies.',
        active: ['messages','notify','push'],
        edges: [['client','messages'], ['messages','notify'], ['notify','push']]
      },
      {
        title: 'Analytics',
        desc: 'Telemetry improves ranking, recommendations, and spam controls.',
        active: ['analytics'],
        edges: [['feed','analytics']]
      }
    ]
  },

  lunchclub: {
    title: 'Lunchclub',
    steps: [
      {
        title: 'Onboard + connect calendar',
        desc: 'User signs in and connects calendar for availability.',
        active: ['client','auth','profiles','calendar'],
        edges: [['client','auth'], ['auth','profiles'], ['profiles','calendar']]
      },
      {
        title: 'Compute availability',
        desc: 'Availability service derives free slots from calendar events.',
        active: ['availability'],
        edges: [['calendar','availability']]
      },
      {
        title: 'Run matching',
        desc: 'Matching pairs users based on goals, profile signals, and timing.',
        active: ['matching'],
        edges: [['availability','matching']]
      },
      {
        title: 'Schedule meeting',
        desc: 'Scheduling books a slot and sends confirmations.',
        active: ['scheduling','notify','push'],
        edges: [['matching','scheduling'], ['scheduling','notify'], ['notify','push']]
      },
      {
        title: 'Join video call',
        desc: 'Clients join video; session health and feedback are recorded.',
        active: ['video','feedback'],
        edges: [['client','video'], ['video','feedback']]
      },
      {
        title: 'Analytics',
        desc: 'Outcomes improve matching quality and safety.',
        active: ['analytics'],
        edges: [['feedback','analytics']]
      }
    ]
  },

  shapr: {
    title: 'Shapr',
    steps: [
      {
        title: 'Create profile and intent',
        desc: 'User sets up profile and selects intent (networking, hiring, etc.).',
        active: ['client','auth','profiles'],
        edges: [['client','auth'], ['auth','profiles']]
      },
      {
        title: 'Discover and match',
        desc: 'Discovery and matching propose connections.',
        active: ['discover','matching'],
        edges: [['profiles','discover'], ['discover','matching']]
      },
      {
        title: 'Chat after match',
        desc: 'Messaging enabled; realtime delivery provides responsiveness.',
        active: ['chat','realtime'],
        edges: [['matching','chat'], ['chat','realtime']]
      },
      {
        title: 'Notifications',
        desc: 'Notify and push drive re-engagement for messages.',
        active: ['notify','push'],
        edges: [['chat','notify'], ['notify','push']]
      },
      {
        title: 'Safety controls',
        desc: 'Blocks and reports prevent abuse and protect users.',
        active: ['safety','report','block'],
        edges: [['client','safety'], ['safety','report'], ['safety','block']]
      },
      {
        title: 'Analytics',
        desc: 'Telemetry improves match quality and reduces abuse.',
        active: ['analytics'],
        edges: [['client','analytics']]
      }
    ]
  },

  circle: {
    title: 'Circle',
    steps: [
      {
        title: 'Sign in and load community',
        desc: 'User authenticates; membership and community config are loaded.',
        active: ['client','auth','members','communities'],
        edges: [['client','auth'], ['auth','members'], ['members','communities']]
      },
      {
        title: 'Create a post',
        desc: 'Post is stored and distributed to the community feed.',
        active: ['posts'],
        edges: [['client','posts']]
      },
      {
        title: 'Comment and chat',
        desc: 'Comments update threads; chat uses realtime delivery.',
        active: ['comments','chat','realtime'],
        edges: [['client','comments'], ['client','chat'], ['chat','realtime']]
      },
      {
        title: 'Search',
        desc: 'Search queries use an index built from posts and members.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'Moderation and policy',
        desc: 'Moderators enforce rules; policy decisions apply actions.',
        active: ['moderation','policy'],
        edges: [['posts','moderation'], ['moderation','policy']]
      },
      {
        title: 'Notifications and analytics',
        desc: 'Mentions/replies notify members; analytics tracks retention.',
        active: ['notify','analytics'],
        edges: [['posts','notify'], ['posts','analytics']]
      }
    ]
  },

  vimeo: {
    title: 'Vimeo',
    steps: [
      {
        title: 'Creator uploads video',
        desc: 'Client uploads to ingest; object storage persists raw asset.',
        active: ['client','upload','obj'],
        edges: [['client','upload'], ['upload','obj']]
      },
      {
        title: 'Transcode and package',
        desc: 'Transcode produces renditions; packaging prepares HLS/DASH.',
        active: ['transcode','packaging'],
        edges: [['obj','transcode'], ['transcode','packaging']]
      },
      {
        title: 'Publish to catalog + CDN',
        desc: 'Catalog metadata is updated and segments are served via CDN.',
        active: ['catalog','cdn'],
        edges: [['packaging','cdn'], ['packaging','catalog']]
      },
      {
        title: 'Viewer discovers video',
        desc: 'Search hits index and resolves catalog metadata.',
        active: ['search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Playback',
        desc: 'Player requests segments from CDN and streams to client.',
        active: ['player','cdn','client'],
        edges: [['client','player'], ['player','cdn'], ['cdn','client']]
      },
      {
        title: 'Monetization + analytics',
        desc: 'Ads/analytics capture viewing, QoE, and monetization events.',
        active: ['ads','analytics'],
        edges: [['player','ads'], ['player','analytics']]
      },
      {
        title: 'Moderation',
        desc: 'Content is checked for policy violations and takedowns.',
        active: ['moderation'],
        edges: [['upload','moderation']]
      }
    ]
  },

  stripe: {
    title: 'Stripe',
    steps: [
      {
        title: 'Merchant creates PaymentIntent',
        desc: 'Backend creates a PaymentIntent to represent the payment and required actions.',
        active: ['client','api','payments'],
        edges: [['client','api'], ['api','payments']]
      },
      {
        title: 'Collect payment method',
        desc: 'Client collects card / wallet details and tokenizes securely.',
        active: ['client','payments'],
        edges: [['client','payments']]
      },
      {
        title: 'Authenticate (3DS) if needed',
        desc: 'Risk checks may require customer authentication via 3DS flows.',
        active: ['risk','auth'],
        edges: [['payments','risk'], ['risk','auth']]
      },
      {
        title: 'Authorize with network / issuer',
        desc: 'Stripe routes authorization to card networks and issuers.',
        active: ['payments','external','ledger'],
        edges: [['payments','external'], ['external','ledger']]
      },
      {
        title: 'Confirm + webhooks',
        desc: 'Stripe confirms status and notifies merchant via webhooks.',
        active: ['api','notify'],
        edges: [['ledger','api'], ['api','notify']]
      },
      {
        title: 'Capture / settlement',
        desc: 'Funds are captured and later settled; ledger records reconciled.',
        active: ['ledger','analytics'],
        edges: [['payments','ledger'], ['ledger','analytics']]
      }
    ]
  },

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
        title: 'Set pickup + destination (geocoding + ETA)',
        desc: 'Client geocodes and snaps pickup; pricing and ETA services compute estimates using supply and traffic.',
        active: ['client','maps','pricing','eta'],
        edges: [['client','maps'], ['client','pricing'], ['maps','eta']]
      },
      {
        title: 'Request ride (auth + risk)',
        desc: 'Request is authorized; risk checks and payment prechecks may run before dispatch.',
        active: ['client','api','auth','risk','dispatch'],
        edges: [['client','api'], ['api','auth'], ['auth','risk'], ['api','dispatch']]
      },
      {
        title: 'Dispatch + matching',
        desc: 'Dispatch uses realtime driver supply, marketplace constraints, and batching rules to select a driver.',
        active: ['dispatch','location','match','market'],
        edges: [['location','dispatch'], ['dispatch','market'], ['dispatch','match']]
      },
      {
        title: 'Acceptance + route plan',
        desc: 'After acceptance, routing computes the route; pickup ETA and trip ETA are updated continuously.',
        active: ['match','routing','maps','eta'],
        edges: [['match','routing'], ['routing','maps'], ['routing','eta']]
      },
      {
        title: 'Live trip tracking (realtime + notifications)',
        desc: 'Driver location streams update rider UI; notifications cover arrival, pickup, and safety prompts.',
        active: ['driver','location','realtime','notify','client'],
        edges: [['driver','location'], ['location','realtime'], ['realtime','client'], ['realtime','notify'], ['notify','client']]
      },
      {
        title: 'Fare finalization + payments',
        desc: 'Fare computed from time/distance/tolls/promos; payment is captured and ledger is updated.',
        active: ['pricing','payments','ledger','promo'],
        edges: [['pricing','promo'], ['promo','pricing'], ['pricing','payments'], ['payments','ledger']]
      },
      {
        title: 'Driver payout + support/disputes',
        desc: 'Payouts are scheduled; support and disputes adjust ledger and trip state when needed.',
        active: ['ledger','payouts','support','disputes'],
        edges: [['ledger','payouts'], ['ledger','support'], ['support','disputes']]
      }
    ]
  },

  netflix: {
    title: 'Netflix',
    steps: [
      {
        title: 'Open app: home rows + profile context',
        desc: 'Client loads profile context and personalized home rows with caching and experiments.',
        active: ['client','home','recos','ab'],
        edges: [['client','home'], ['home','recos'], ['recos','ab']]
      },
      {
        title: 'Recommendations + ranking',
        desc: 'Ranking uses history, embeddings, and experiments to select titles and artwork variants.',
        active: ['recos','rank','ab','analytics'],
        edges: [['recos','rank'], ['rank','ab'], ['rank','analytics']]
      },
      {
        title: 'Select title: metadata + playback policy',
        desc: 'Client fetches title metadata, encodes, subtitles, and playback policy (geo/device).',
        active: ['client','catalog','drm','auth'],
        edges: [['client','catalog'], ['catalog','auth'], ['catalog','drm']]
      },
      {
        title: 'DRM license + session setup',
        desc: 'Client obtains DRM license and initializes playback session keys.',
        active: ['client','drm','risk'],
        edges: [['client','drm'], ['drm','risk']]
      },
      {
        title: 'Playback from CDN (ABR start)',
        desc: 'Player starts ABR playback by pulling segments from CDN and selecting initial bitrate.',
        active: ['client','cdn','player'],
        edges: [['cdn','client'], ['client','player']]
      },
      {
        title: 'ABR switching + QoE monitoring',
        desc: 'Player adapts bitrate; QoE signals (rebuffering, startup) are monitored.',
        active: ['player','metrics','analytics'],
        edges: [['player','metrics'], ['metrics','analytics']]
      },
      {
        title: 'Telemetry + personalization feedback loop',
        desc: 'Playback events update analytics; signals feed back into recommendations and experiments.',
        active: ['metrics','analytics','recos','ab'],
        edges: [['metrics','analytics'], ['analytics','recos'], ['analytics','ab']]
      }
    ]
  },

  amazon: {
    title: 'Amazon',
    steps: [
      {
        title: 'Open app: personalization + search index warmup',
        desc: 'Client loads homepage modules, recommendations, and primes search/autocomplete.',
        active: ['client','search','catalog','recos'],
        edges: [['client','search'], ['search','catalog'], ['client','recos']]
      },
      {
        title: 'Product detail page (PDP)',
        desc: 'PDP composes content from catalog, pricing, inventory, reviews, and delivery promise.',
        active: ['catalog','pricing','inventory','reviews','promise'],
        edges: [['catalog','pricing'], ['catalog','inventory'], ['catalog','reviews'], ['inventory','promise']]
      },
      {
        title: 'Add to cart + promotions',
        desc: 'Cart updates; promos/coupons, taxes, and shipping options are computed.',
        active: ['client','cart','promo','tax'],
        edges: [['client','cart'], ['cart','promo'], ['cart','tax']]
      },
      {
        title: 'Checkout: address, payment, and risk',
        desc: 'Checkout validates address, runs fraud/risk checks, and authorizes payment.',
        active: ['checkout','payments','risk','auth'],
        edges: [['cart','checkout'], ['checkout','auth'], ['checkout','risk'], ['checkout','payments']]
      },
      {
        title: 'Order placement + inventory reservation',
        desc: 'Order is created; inventory is reserved/allocated and confirmation is issued.',
        active: ['orders','inventory','notify'],
        edges: [['checkout','orders'], ['orders','inventory'], ['orders','notify']]
      },
      {
        title: 'Fulfillment orchestration',
        desc: 'A fulfillment plan selects FC/seller, pick-pack workflows run in WMS, labels generated.',
        active: ['fulfillment','wms','carrier'],
        edges: [['orders','fulfillment'], ['fulfillment','wms'], ['wms','carrier']]
      },
      {
        title: 'Delivery tracking + notifications',
        desc: 'Carrier scans update tracking; customer receives push/email updates and delivery ETAs.',
        active: ['carrier','tracking','notify','client'],
        edges: [['carrier','tracking'], ['tracking','notify'], ['notify','client']]
      },
      {
        title: 'Returns: label, pickup, QC, refund',
        desc: 'Return request creates reverse-logistics; item inspected and refund issued after QC.',
        active: ['returns','carrier','qc','refunds','inventory'],
        edges: [['client','returns'], ['returns','carrier'], ['returns','qc'], ['qc','refunds'], ['returns','inventory']]
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
        title: 'Onboarding: KYC/AML + account provisioning',
        desc: 'User signs up; KYC/AML checks run; accounts and limits are provisioned.',
        active: ['client','kyc','compliance','risk'],
        edges: [['client','kyc'], ['kyc','compliance'], ['compliance','risk']]
      },
      {
        title: 'Funding: top up / bank transfer',
        desc: 'Top ups and transfers are credited; risk rules and holds determine availability.',
        active: ['topup','risk','ledger','bank'],
        edges: [['client','topup'], ['topup','bank'], ['topup','risk'], ['risk','ledger']]
      },
      {
        title: 'Card swipe: authorization + fraud scoring',
        desc: 'Card authorization checks balance/limits and fraud signals before approval.',
        active: ['card','auth','fraud','ledger'],
        edges: [['card','auth'], ['auth','fraud'], ['fraud','ledger']]
      },
      {
        title: 'FX pricing + conversion (when needed)',
        desc: 'FX engine computes rates/markups; conversions booked into ledger (netting/hedging).',
        active: ['fx','pricing','ledger'],
        edges: [['auth','fx'], ['fx','pricing'], ['pricing','ledger']]
      },
      {
        title: 'Ledger + statements + insights',
        desc: 'Double-entry ledger records activity; statements and insights generated.',
        active: ['ledger','statements','analytics'],
        edges: [['ledger','statements'], ['ledger','analytics']]
      },
      {
        title: 'Realtime alerts + disputes/support',
        desc: 'Alerts sent for transactions; disputes/chargebacks create cases and adjust ledger.',
        active: ['notify','support','disputes','ledger'],
        edges: [['ledger','notify'], ['notify','client'], ['ledger','support'], ['support','disputes']]
      }
    ]
  },

  wise: {
    title: 'Wise',
    steps: [
      {
        title: 'Quote: fees, FX rate, delivery ETA',
        desc: 'User enters amount/currency; Wise returns transparent fees and ETA.',
        active: ['client','quote','pricing','fx'],
        edges: [['client','quote'], ['quote','pricing'], ['pricing','fx']]
      },
      {
        title: 'Compliance + funding',
        desc: 'KYC/AML checks run; user funds transfer via bank/card/local rails.',
        active: ['kyc','funding','risk'],
        edges: [['client','kyc'], ['client','funding'], ['funding','risk']]
      },
      {
        title: 'Local collection account',
        desc: 'Funds arrive into a local collection account; ledger records receipt.',
        active: ['collection','bank','ledger'],
        edges: [['funding','collection'], ['collection','bank'], ['collection','ledger']]
      },
      {
        title: 'FX conversion + netting',
        desc: 'FX converts at mid-market with fees; netting reduces cross-border transfers.',
        active: ['fx','netting','ledger'],
        edges: [['ledger','fx'], ['fx','netting'], ['netting','ledger']]
      },
      {
        title: 'Local payout via domestic rails',
        desc: 'Wise pays out locally to recipient bank using domestic rails.',
        active: ['payout','bank','routing'],
        edges: [['ledger','routing'], ['routing','payout'], ['payout','bank']]
      },
      {
        title: 'Tracking + notifications + support',
        desc: 'Status updates sent; failures trigger support workflows and reconciliation.',
        active: ['tracking','notify','support','recon'],
        edges: [['payout','tracking'], ['tracking','notify'], ['notify','client'], ['tracking','support'], ['tracking','recon']]
      }
    ]
  },

  robinhood: {
    title: 'Robinhood',
    steps: [
      {
        title: 'Account opening: KYC/AML + suitability',
        desc: 'User opens account; KYC/AML and suitability rules applied.',
        active: ['client','kyc','compliance','risk'],
        edges: [['client','kyc'], ['kyc','compliance'], ['compliance','risk']]
      },
      {
        title: 'Funding + buying power',
        desc: 'ACH/card funding initiated; risk limits determine instant buying power.',
        active: ['funding','risk','ledger'],
        edges: [['client','funding'], ['funding','risk'], ['risk','ledger']]
      },
      {
        title: 'Market data + quotes',
        desc: 'Quotes, spreads, and halt status delivered via market data services.',
        active: ['marketdata','quotes','client'],
        edges: [['client','marketdata'], ['marketdata','quotes']]
      },
      {
        title: 'Place order (risk + routing)',
        desc: 'Order validated; risk checks apply; routed to venues/market makers.',
        active: ['orders','risk','routing'],
        edges: [['client','orders'], ['orders','risk'], ['orders','routing']]
      },
      {
        title: 'Execution + fills',
        desc: 'Broker routes; fills returned; positions update and confirmations generated.',
        active: ['venue','fills','positions'],
        edges: [['routing','venue'], ['venue','fills'], ['fills','positions']]
      },
      {
        title: 'Clearing + settlement + ledger',
        desc: 'Trades cleared/settled; ledger updates cash and holdings; reconciliations run.',
        active: ['clearing','settlement','ledger','recon'],
        edges: [['positions','clearing'], ['clearing','settlement'], ['settlement','ledger'], ['ledger','recon']]
      },
      {
        title: 'Statements + tax reporting',
        desc: 'Statements, confirmations, and tax docs generated from ledger.',
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
        title: 'Sign in + social context',
        desc: 'User signs in; social graph and privacy defaults load for feed/transactions.',
        active: ['client','auth','social','feed'],
        edges: [['client','auth'], ['auth','social'], ['social','feed']]
      },
      {
        title: 'Create payment/request',
        desc: 'P2P payment/request created; recipient lookup and limits applied.',
        active: ['api','p2p','lookup','risk'],
        edges: [['client','api'], ['api','p2p'], ['p2p','lookup'], ['p2p','risk']]
      },
      {
        title: 'Funding selection + fraud/risk holds',
        desc: 'Funding source chosen (balance/bank/card); fraud/risk may hold or step-up auth.',
        active: ['funding','risk','fraud','auth'],
        edges: [['p2p','funding'], ['funding','risk'], ['risk','fraud'], ['risk','auth']]
      },
      {
        title: 'Ledger posting + balance updates',
        desc: 'Ledger posts debit/credit entries and updates balances atomically.',
        active: ['ledger','balances','p2p'],
        edges: [['p2p','ledger'], ['ledger','balances']]
      },
      {
        title: 'Feed item + notifications',
        desc: 'Transaction metadata updates feed per privacy settings; notifications sent to recipient.',
        active: ['feed','notify','push','social'],
        edges: [['ledger','social'], ['social','feed'], ['ledger','notify'], ['notify','push'], ['push','client']]
      },
      {
        title: 'Cash-out + disputes/refunds',
        desc: 'Cash-out uses bank rails; disputes/refunds create cases and ledger adjustments.',
        active: ['cashout','bank','disputes','support','refunds'],
        edges: [['balances','cashout'], ['cashout','bank'], ['ledger','disputes'], ['disputes','refunds'], ['disputes','support']]
      }
    ]
  },

  binance: {
    title: 'Binance',
    steps: [
      {
        title: 'Sign in + security posture',
        desc: 'MFA/device checks and risk scoring gate trading and withdrawals.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Funding: fiat/crypto deposits',
        desc: 'Fiat deposits depend on bank confirmations; crypto deposits on block confirmations; credited to wallets.',
        active: ['deposit','payments','custody','wallet'],
        edges: [['client','deposit'], ['deposit','payments'], ['deposit','custody'], ['custody','wallet']]
      },
      {
        title: 'Place order (risk + matching engine)',
        desc: 'Order validated; risk checks apply; submitted to matching engine; market data updates in realtime.',
        active: ['orders','match','risk','market'],
        edges: [['client','orders'], ['orders','risk'], ['orders','match'], ['match','market']]
      },
      {
        title: 'Execution + ledger settlement',
        desc: 'Trades execute; ledger settles and updates balances/positions atomically.',
        active: ['match','ledger','positions','recon'],
        edges: [['match','ledger'], ['ledger','positions'], ['ledger','recon']]
      },
      {
        title: 'Custody: hot/cold wallets + approvals',
        desc: 'Custody manages keys and wallet operations with approvals and security controls.',
        active: ['custody','wallet','approvals','risk'],
        edges: [['ledger','custody'], ['custody','wallet'], ['wallet','approvals'], ['approvals','risk']]
      },
      {
        title: 'Withdrawals + AML monitoring',
        desc: 'Withdrawals run AML checks; blockchain/bank broadcast; monitoring triggers alerts.',
        active: ['withdraw','compliance','monitor','wallet'],
        edges: [['wallet','withdraw'], ['withdraw','compliance'], ['compliance','monitor']]
      },
      {
        title: 'Reporting + alerts',
        desc: 'Trade history, tax/export reporting, and alerts produced from ledger.',
        active: ['reports','notify','ledger'],
        edges: [['ledger','reports'], ['ledger','notify'], ['notify','client']]
      }
    ]
  },

  nubank: {
    title: 'Nubank',
    steps: [
      {
        title: 'Onboarding: KYC/AML + credit limits',
        desc: 'User signs up; KYC/AML checks run; credit/account limits provisioned.',
        active: ['client','kyc','compliance','risk'],
        edges: [['client','kyc'], ['kyc','compliance'], ['compliance','risk']]
      },
      {
        title: 'Card purchase authorization',
        desc: 'Authorization checks limits and fraud scoring before approval.',
        active: ['card','auth','fraud'],
        edges: [['card','auth'], ['auth','fraud']]
      },
      {
        title: 'Ledger posting + balances',
        desc: 'Approved transactions posted; balances update and reconciliation events emitted.',
        active: ['ledger','balances','recon'],
        edges: [['auth','ledger'], ['ledger','balances'], ['ledger','recon']]
      },
      {
        title: 'Statements + billing cycle',
        desc: 'Statement cycles compute minimum due, interest, and billing schedules.',
        active: ['statements','billing','ledger'],
        edges: [['ledger','statements'], ['statements','billing']]
      },
      {
        title: 'Insights + realtime alerts',
        desc: 'Spending categories and insights computed; realtime alerts sent to user.',
        active: ['analytics','notify','client'],
        edges: [['ledger','analytics'], ['analytics','notify'], ['notify','client']]
      },
      {
        title: 'Disputes/chargebacks + support',
        desc: 'Disputes create cases; outcomes reconcile with ledger and network reports.',
        active: ['disputes','support','recon'],
        edges: [['ledger','disputes'], ['disputes','support'], ['support','recon']]
      }
    ]
  },

  monzo: {
    title: 'Monzo',
    steps: [
      {
        title: 'Sign up + identity verification',
        desc: 'Identity verification and account provisioning completes; device risk scored.',
        active: ['client','kyc','provision','risk'],
        edges: [['client','kyc'], ['kyc','provision'], ['provision','risk']]
      },
      {
        title: 'Card auth + controls',
        desc: 'Authorization checks limits, controls, and fraud rules.',
        active: ['card','auth','fraud'],
        edges: [['card','auth'], ['auth','fraud']]
      },
      {
        title: 'Ledger posting + pots',
        desc: 'Ledger posts transaction; balances and pots update; events emitted for insights.',
        active: ['ledger','balances','pots','analytics'],
        edges: [['auth','ledger'], ['ledger','balances'], ['balances','pots'], ['ledger','analytics']]
      },
      {
        title: 'Enrichment + insights',
        desc: 'Enrichment categorizes merchants and computes budgets and insights.',
        active: ['enrich','analytics','client'],
        edges: [['ledger','enrich'], ['enrich','analytics'], ['analytics','client']]
      },
      {
        title: 'Realtime notifications',
        desc: 'Real-time notifications sent for transactions and balance changes.',
        active: ['notify','realtime','client'],
        edges: [['ledger','realtime'], ['realtime','notify'], ['notify','client']]
      },
      {
        title: 'Support + disputes + refunds',
        desc: 'Disputes and refunds create cases; ledger adjustments reconcile outcomes.',
        active: ['support','disputes','refunds','recon'],
        edges: [['ledger','refunds'], ['refunds','disputes'], ['disputes','support'], ['support','recon']]
      }
    ]
  },

  dailymotion: {
    title: 'Dailymotion',
    steps: [
      {
        title: 'Open app: home feed + recommendations',
        desc: 'Client loads home feed; recommendations and ranking select videos.',
        active: ['client','home','recos'],
        edges: [['client','home'], ['home','recos']]
      },
      {
        title: 'Search + index retrieval',
        desc: 'Search queries hit index; catalog resolves metadata and availability.',
        active: ['client','search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Playback via CDN (ABR)',
        desc: 'Player streams segments from CDN; QoE metrics captured.',
        active: ['player','cdn','metrics'],
        edges: [['client','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Creator upload + processing',
        desc: 'Uploads stored; transcode produces renditions; packaging publishes to CDN.',
        active: ['upload','obj','transcode','packaging','cdn'],
        edges: [['client','upload'], ['upload','obj'], ['obj','transcode'], ['transcode','packaging'], ['packaging','cdn']]
      },
      {
        title: 'Ads + measurement',
        desc: 'Ad decisioning runs; impressions and clicks measured.',
        active: ['ads','analytics'],
        edges: [['player','ads'], ['ads','analytics']]
      },
      {
        title: 'Telemetry + moderation',
        desc: 'Telemetry feeds analytics; moderation enforces content policies.',
        active: ['metrics','analytics','moderation'],
        edges: [['metrics','analytics'], ['upload','moderation']]
      }
    ]
  },

  rumble: {
    title: 'Rumble',
    steps: [
      {
        title: 'Discover content',
        desc: 'Client loads home feed; recos and ranking select videos.',
        active: ['client','home','recos'],
        edges: [['client','home'], ['home','recos']]
      },
      {
        title: 'Search + catalog',
        desc: 'Search hits index; catalog resolves video metadata.',
        active: ['client','search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Playback + QoE',
        desc: 'Playback streams from CDN; QoE telemetry captured.',
        active: ['player','cdn','metrics'],
        edges: [['client','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Upload + processing',
        desc: 'Creators upload; transcode and packaging publish renditions to CDN.',
        active: ['upload','obj','transcode','packaging','cdn'],
        edges: [['client','upload'], ['upload','obj'], ['obj','transcode'], ['transcode','packaging'], ['packaging','cdn']]
      },
      {
        title: 'Ads and monetization',
        desc: 'Ads run and are measured; analytics supports revenue attribution.',
        active: ['ads','analytics'],
        edges: [['player','ads'], ['ads','analytics']]
      },
      {
        title: 'Moderation + safety',
        desc: 'Moderation and risk controls enforce policy and reduce abuse.',
        active: ['moderation','risk'],
        edges: [['upload','moderation'], ['moderation','risk']]
      }
    ]
  },

  nebula: {
    title: 'Nebula',
    steps: [
      {
        title: 'Authenticate + subscription entitlements',
        desc: 'Client signs in; subscription status checked for access.',
        active: ['client','auth','policy'],
        edges: [['client','auth'], ['auth','policy']]
      },
      {
        title: 'Browse/search catalog',
        desc: 'Search hits index; catalog metadata resolved.',
        active: ['client','search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Playback via CDN',
        desc: 'Player streams from CDN; telemetry captured.',
        active: ['player','cdn','metrics'],
        edges: [['client','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Creator upload pipeline',
        desc: 'Uploads stored; transcode and packaging publish renditions.',
        active: ['upload','obj','transcode','packaging','cdn'],
        edges: [['client','upload'], ['upload','obj'], ['obj','transcode'], ['transcode','packaging'], ['packaging','cdn']]
      },
      {
        title: 'Analytics + moderation',
        desc: 'Analytics informs product decisions; moderation enforces policy.',
        active: ['analytics','moderation'],
        edges: [['metrics','analytics'], ['upload','moderation']]
      }
    ]
  },

  curiositystream: {
    title: 'CuriosityStream',
    steps: [
      {
        title: 'Authenticate + entitlements',
        desc: 'Subscription entitlements validated for access.',
        active: ['client','auth','policy'],
        edges: [['client','auth'], ['auth','policy']]
      },
      {
        title: 'Browse catalog + search',
        desc: 'Search hits index; catalog returns metadata and collections.',
        active: ['client','search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Playback via CDN',
        desc: 'Player streams from CDN; QoE telemetry captured.',
        active: ['player','cdn','metrics'],
        edges: [['client','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Content ingestion + processing',
        desc: 'Ingest pipeline stores assets; transcode and packaging publish.',
        active: ['upload','obj','transcode','packaging','cdn'],
        edges: [['upload','obj'], ['obj','transcode'], ['transcode','packaging'], ['packaging','cdn']]
      },
      {
        title: 'Analytics',
        desc: 'Engagement and QoE metrics feed analytics.',
        active: ['analytics'],
        edges: [['metrics','analytics']]
      }
    ]
  },

  'discovery-plus': {
    title: 'Discovery+',
    steps: [
      {
        title: 'Sign in + subscription check',
        desc: 'Auth and subscription entitlements validated; policy applied.',
        active: ['client','auth','subs','policy'],
        edges: [['client','auth'], ['auth','subs'], ['subs','policy']]
      },
      {
        title: 'Home rows + recommendations',
        desc: 'Home feed assembled; recommendations rank titles.',
        active: ['home','recos','catalog'],
        edges: [['client','home'], ['home','recos'], ['recos','catalog']]
      },
      {
        title: 'Search + index',
        desc: 'Search hits index and resolves catalog metadata.',
        active: ['search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'DRM + playback via CDN',
        desc: 'DRM license issued; player streams from CDN with ABR.',
        active: ['drm','player','cdn','metrics'],
        edges: [['catalog','drm'], ['drm','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Ads (if tiered) + analytics',
        desc: 'Ads inserted where applicable; analytics and QoE measured.',
        active: ['ads','analytics','metrics'],
        edges: [['player','ads'], ['metrics','analytics']]
      }
    ]
  },

  'hbo-go': {
    title: 'HBO Go',
    steps: [
      {
        title: 'Authenticate + entitlements',
        desc: 'User signs in; subscription entitlements validated.',
        active: ['client','auth','subs','policy'],
        edges: [['client','auth'], ['auth','subs'], ['subs','policy']]
      },
      {
        title: 'Browse catalog',
        desc: 'Catalog metadata and availability resolved.',
        active: ['catalog','policy'],
        edges: [['client','catalog'], ['catalog','policy']]
      },
      {
        title: 'DRM + playback',
        desc: 'DRM licenses issued; player streams from CDN; telemetry captured.',
        active: ['drm','player','cdn','metrics'],
        edges: [['catalog','drm'], ['drm','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Analytics',
        desc: 'QoE and engagement metrics feed analytics.',
        active: ['analytics'],
        edges: [['metrics','analytics']]
      }
    ]
  },

  peacock: {
    title: 'Peacock',
    steps: [
      {
        title: 'Sign in + tier/entitlement',
        desc: 'User signs in; entitlement/tier determines ads and access.',
        active: ['client','auth','subs','policy'],
        edges: [['client','auth'], ['auth','subs'], ['subs','policy']]
      },
      {
        title: 'Home + recommendations',
        desc: 'Home rows assembled; recos rank content.',
        active: ['home','recos','catalog'],
        edges: [['client','home'], ['home','recos'], ['recos','catalog']]
      },
      {
        title: 'DRM + playback via CDN',
        desc: 'DRM license issued; player streams from CDN with ABR.',
        active: ['drm','player','cdn','metrics'],
        edges: [['catalog','drm'], ['drm','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Ads + measurement',
        desc: 'Ads inserted; measurement and analytics recorded.',
        active: ['ads','analytics'],
        edges: [['player','ads'], ['metrics','analytics']]
      }
    ]
  },

  sonyliv: {
    title: 'SonyLIV',
    steps: [
      {
        title: 'Sign in + subscription check',
        desc: 'Auth and entitlements validated for premium/live content.',
        active: ['client','auth','subs','policy'],
        edges: [['client','auth'], ['auth','subs'], ['subs','policy']]
      },
      {
        title: 'Browse catalog + recos',
        desc: 'Home rows and recos surface shows and live sports.',
        active: ['home','recos','catalog'],
        edges: [['client','home'], ['home','recos'], ['recos','catalog']]
      },
      {
        title: 'Playback (DRM + CDN)',
        desc: 'DRM license issued; player streams from CDN; QoE measured.',
        active: ['drm','player','cdn','metrics'],
        edges: [['catalog','drm'], ['drm','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Ads + analytics',
        desc: 'Ads inserted where applicable; analytics recorded.',
        active: ['ads','analytics'],
        edges: [['player','ads'], ['metrics','analytics']]
      }
    ]
  },

  zee5: {
    title: 'Zee5',
    steps: [
      {
        title: 'Sign in + subscription tier',
        desc: 'Auth and entitlements validated; policy decides access/ads.',
        active: ['client','auth','subs','policy'],
        edges: [['client','auth'], ['auth','subs'], ['subs','policy']]
      },
      {
        title: 'Home + recommendations',
        desc: 'Home rows assembled; recos rank titles by engagement and preference.',
        active: ['home','recos','catalog'],
        edges: [['client','home'], ['home','recos'], ['recos','catalog']]
      },
      {
        title: 'Playback (DRM + CDN)',
        desc: 'DRM license issued; player streams from CDN; QoE measured.',
        active: ['drm','player','cdn','metrics'],
        edges: [['catalog','drm'], ['drm','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Ads + analytics',
        desc: 'Ads inserted where applicable; analytics recorded.',
        active: ['ads','analytics'],
        edges: [['player','ads'], ['metrics','analytics']]
      }
    ]
  },

  'mx-player': {
    title: 'MX Player',
    steps: [
      {
        title: 'Home feed + recos',
        desc: 'Client loads home feed; recos rank content for engagement.',
        active: ['client','home','recos'],
        edges: [['client','home'], ['home','recos']]
      },
      {
        title: 'Search + index',
        desc: 'Search hits index; catalog resolves metadata.',
        active: ['client','search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Playback via CDN',
        desc: 'Player streams from CDN; telemetry captured; ads may be inserted.',
        active: ['player','cdn','metrics','ads'],
        edges: [['client','player'], ['player','cdn'], ['player','metrics'], ['player','ads']]
      },
      {
        title: 'Analytics',
        desc: 'QoE and engagement metrics feed analytics.',
        active: ['analytics'],
        edges: [['metrics','analytics']]
      }
    ]
  },

  voot: {
    title: 'Voot',
    steps: [
      {
        title: 'Sign in + subscription tier',
        desc: 'Auth and entitlements validated; policy decides access/ads.',
        active: ['client','auth','subs','policy'],
        edges: [['client','auth'], ['auth','subs'], ['subs','policy']]
      },
      {
        title: 'Home rows + recommendations',
        desc: 'Home feed assembled; recos rank content by engagement and preference.',
        active: ['home','recos','catalog'],
        edges: [['client','home'], ['home','recos'], ['recos','catalog']]
      },
      {
        title: 'Search + index',
        desc: 'Search hits index; catalog resolves metadata.',
        active: ['search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'DRM + playback via CDN',
        desc: 'DRM license issued; player streams from CDN; QoE telemetry captured.',
        active: ['drm','player','cdn','metrics'],
        edges: [['catalog','drm'], ['drm','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Ads + analytics',
        desc: 'Ads inserted where applicable; analytics recorded.',
        active: ['ads','analytics'],
        edges: [['player','ads'], ['metrics','analytics']]
      }
    ]
  },

  crunchyroll: {
    title: 'Crunchyroll',
    steps: [
      {
        title: 'Sign in + subscription check',
        desc: 'Auth and subscription entitlements validated; region rights applied.',
        active: ['client','auth','subs','policy'],
        edges: [['client','auth'], ['auth','subs'], ['subs','policy']]
      },
      {
        title: 'Browse/search catalog',
        desc: 'Search hits index; catalog resolves series, episodes, and rights.',
        active: ['search','index','catalog','policy'],
        edges: [['client','search'], ['search','index'], ['index','catalog'], ['catalog','policy']]
      },
      {
        title: 'DRM + playback',
        desc: 'DRM license issued; player streams via CDN with ABR.',
        active: ['drm','player','cdn','metrics'],
        edges: [['catalog','drm'], ['drm','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Ads + measurement (if tiered)',
        desc: 'Ads inserted for ad-supported tiers; measurement recorded.',
        active: ['ads','analytics'],
        edges: [['player','ads'], ['metrics','analytics']]
      },
      {
        title: 'Moderation + safety',
        desc: 'Content and community moderation enforce policy.',
        active: ['moderation','risk'],
        edges: [['catalog','moderation'], ['moderation','risk']]
      }
    ]
  },

  funimation: {
    title: 'Funimation',
    steps: [
      {
        title: 'Sign in + entitlements',
        desc: 'Auth and entitlements validated; rights and device limits applied.',
        active: ['client','auth','subs','policy'],
        edges: [['client','auth'], ['auth','subs'], ['subs','policy']]
      },
      {
        title: 'Browse catalog + search',
        desc: 'Search hits index; catalog resolves metadata and availability.',
        active: ['search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'DRM + playback via CDN',
        desc: 'DRM license issued; player streams from CDN; QoE measured.',
        active: ['drm','player','cdn','metrics'],
        edges: [['catalog','drm'], ['drm','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Ads + analytics',
        desc: 'Ads inserted where applicable; analytics recorded.',
        active: ['ads','analytics'],
        edges: [['player','ads'], ['metrics','analytics']]
      },
      {
        title: 'Moderation',
        desc: 'Moderation enforces content policy and safety controls.',
        active: ['moderation','risk'],
        edges: [['catalog','moderation'], ['moderation','risk']]
      }
    ]
  },

  tubi: {
    title: 'Tubi',
    steps: [
      {
        title: 'Home + recommendations',
        desc: 'Client loads home feed; recos rank content for engagement.',
        active: ['client','home','recos','catalog'],
        edges: [['client','home'], ['home','recos'], ['recos','catalog']]
      },
      {
        title: 'Search + index',
        desc: 'Search hits index; catalog resolves metadata.',
        active: ['client','search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Playback via CDN',
        desc: 'Player streams from CDN with ABR; telemetry captured.',
        active: ['player','cdn','metrics'],
        edges: [['client','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Ads + auction',
        desc: 'Ad decisioning runs auctions; impressions measured.',
        active: ['ads','auction','analytics'],
        edges: [['player','ads'], ['ads','auction'], ['metrics','analytics']]
      },
      {
        title: 'Moderation + analytics',
        desc: 'Policy enforcement and analytics improve safety and quality.',
        active: ['moderation','analytics'],
        edges: [['catalog','moderation'], ['metrics','analytics']]
      }
    ]
  },

  'pluto-tv': {
    title: 'Pluto TV',
    steps: [
      {
        title: 'Home + live guide',
        desc: 'Client loads channel guide and curated rows for live and VOD.',
        active: ['client','home','guide','channels'],
        edges: [['client','home'], ['home','guide'], ['guide','channels']]
      },
      {
        title: 'Select channel/program',
        desc: 'Catalog resolves program metadata and stream manifest.',
        active: ['catalog','channels'],
        edges: [['channels','catalog']]
      },
      {
        title: 'Playback + CDN',
        desc: 'Player streams from CDN; QoE telemetry captured.',
        active: ['player','cdn','metrics'],
        edges: [['client','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Ads + auction',
        desc: 'Ad breaks use auction/decisioning; measurement recorded.',
        active: ['ads','auction','analytics'],
        edges: [['player','ads'], ['ads','auction'], ['metrics','analytics']]
      },
      {
        title: 'Moderation',
        desc: 'Moderation and policy enforcement handle content safety.',
        active: ['moderation'],
        edges: [['catalog','moderation']]
      }
    ]
  },

  plex: {
    title: 'Plex',
    steps: [
      {
        title: 'Sign in + library discovery',
        desc: 'Client authenticates and discovers server libraries and catalogs.',
        active: ['client','auth','library','catalog'],
        edges: [['client','auth'], ['auth','library'], ['library','catalog']]
      },
      {
        title: 'Search + index',
        desc: 'Search queries hit index; catalog resolves metadata.',
        active: ['client','search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Playback + transcode decision',
        desc: 'Player selects direct play vs transcode; relay/CDN serves stream.',
        active: ['player','transcode','cdn','metrics'],
        edges: [['catalog','player'], ['player','transcode'], ['transcode','cdn'], ['player','metrics']]
      },
      {
        title: 'Device sync + casting',
        desc: 'Sync aligns device state; casting and multi-device playback supported.',
        active: ['devices','sync'],
        edges: [['client','sync'], ['sync','devices']]
      },
      {
        title: 'Analytics',
        desc: 'Playback telemetry feeds analytics.',
        active: ['analytics'],
        edges: [['metrics','analytics']]
      }
    ]
  },

  kodi: {
    title: 'Kodi',
    steps: [
      {
        title: 'Local library indexing',
        desc: 'Kodi indexes local/network media into library metadata.',
        active: ['client','library'],
        edges: [['client','library']]
      },
      {
        title: 'Add-ons + sources',
        desc: 'Add-ons connect to external sources and catalogs.',
        active: ['plugins','sources','catalog'],
        edges: [['client','plugins'], ['plugins','sources'], ['sources','catalog']]
      },
      {
        title: 'Playback',
        desc: 'Player streams from files/CDN sources; transcode optional.',
        active: ['player','cdn','transcode'],
        edges: [['catalog','player'], ['player','cdn'], ['player','transcode']]
      },
      {
        title: 'Settings + device control',
        desc: 'Settings and devices control playback and libraries.',
        active: ['settings','devices'],
        edges: [['client','settings'], ['settings','devices']]
      },
      {
        title: 'Telemetry',
        desc: 'Telemetry captures QoE locally or via add-ons.',
        active: ['metrics'],
        edges: [['player','metrics']]
      }
    ]
  },

  'apple-tv': {
    title: 'Apple TV',
    steps: [
      {
        title: 'Sign in + entitlements',
        desc: 'Auth and entitlements validated for Apple TV+ and channel subscriptions.',
        active: ['client','auth','subs','policy'],
        edges: [['client','auth'], ['auth','subs'], ['subs','policy']]
      },
      {
        title: 'Channels + unified catalog',
        desc: 'Channels and catalog unify metadata across providers.',
        active: ['channels','catalog'],
        edges: [['policy','channels'], ['channels','catalog']]
      },
      {
        title: 'Search + index',
        desc: 'Search hits index; catalog resolves availability.',
        active: ['search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'DRM + playback',
        desc: 'DRM license issued; player streams via CDN; telemetry captured.',
        active: ['drm','player','cdn','metrics'],
        edges: [['catalog','drm'], ['drm','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Analytics',
        desc: 'QoE and engagement metrics feed analytics.',
        active: ['analytics'],
        edges: [['metrics','analytics']]
      }
    ]
  },

  'youtube-studio': {
    title: 'YouTube Studio',
    steps: [
      {
        title: 'Authenticate + channel context',
        desc: 'Creator signs in; channel context and permissions loaded.',
        active: ['client','auth','creator'],
        edges: [['client','auth'], ['auth','creator']]
      },
      {
        title: 'Upload + object storage',
        desc: 'Upload stores raw video; resumable uploads handle retries.',
        active: ['upload','obj'],
        edges: [['client','upload'], ['upload','obj']]
      },
      {
        title: 'Transcode + processing pipeline',
        desc: 'Transcode generates renditions; processing runs thumbnails and metadata.',
        active: ['transcode','processing','catalog'],
        edges: [['obj','transcode'], ['transcode','processing'], ['processing','catalog']]
      },
      {
        title: 'Monetization + ads setup',
        desc: 'Monetization eligibility and ad settings configured; policies enforced.',
        active: ['monetization','ads','policy'],
        edges: [['catalog','monetization'], ['monetization','ads'], ['monetization','policy']]
      },
      {
        title: 'Moderation + policy checks',
        desc: 'Content checks and policy enforcement gate publish/monetization.',
        active: ['moderation','policy'],
        edges: [['processing','moderation'], ['moderation','policy']]
      },
      {
        title: 'Analytics + notifications',
        desc: 'Creator analytics computed; notifications sent for strikes and performance.',
        active: ['analytics','notify'],
        edges: [['catalog','analytics'], ['analytics','notify'], ['notify','client']]
      }
    ]
  },

  anchor: {
    title: 'Anchor',
    steps: [
      {
        title: 'Authenticate + creator setup',
        desc: 'Creator signs in; show/profile setup completed.',
        active: ['client','auth','creator'],
        edges: [['client','auth'], ['auth','creator']]
      },
      {
        title: 'Record/edit episode',
        desc: 'Creator records/edits audio; episode draft created.',
        active: ['record','client'],
        edges: [['client','record']]
      },
      {
        title: 'Upload + processing',
        desc: 'Audio uploaded; processing normalizes loudness and produces assets.',
        active: ['upload','obj','processing'],
        edges: [['client','upload'], ['upload','obj'], ['obj','processing']]
      },
      {
        title: 'Publish RSS + distribute',
        desc: 'RSS updated; distribution pushes to podcast directories.',
        active: ['rss','distribution'],
        edges: [['processing','rss'], ['rss','distribution']]
      },
      {
        title: 'Monetization (ads/sponsorships)',
        desc: 'Ads and sponsorship workflows run; revenue tracked.',
        active: ['ads','payments','analytics'],
        edges: [['processing','ads'], ['ads','payments'], ['payments','analytics']]
      },
      {
        title: 'Analytics + support',
        desc: 'Listener analytics computed; support handles content issues and takedowns.',
        active: ['analytics','support'],
        edges: [['processing','analytics'], ['client','support']]
      }
    ]
  },

  'pocket-casts': {
    title: 'Pocket Casts',
    steps: [
      {
        title: 'Sign in + library sync',
        desc: 'Client signs in and syncs subscriptions and listening state across devices.',
        active: ['client','auth','library','sync'],
        edges: [['client','auth'], ['auth','library'], ['library','sync']]
      },
      {
        title: 'RSS polling + feed updates',
        desc: 'Feed updater polls RSS and updates catalog with new episodes.',
        active: ['feed','rss','catalog'],
        edges: [['rss','feed'], ['feed','catalog']]
      },
      {
        title: 'Search + index',
        desc: 'Search hits index and resolves catalog metadata for podcasts/episodes.',
        active: ['client','search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Downloads + playback',
        desc: 'Episodes downloaded from CDN/files; player plays and updates progress.',
        active: ['downloads','cdn','player','sync'],
        edges: [['catalog','downloads'], ['downloads','cdn'], ['cdn','player'], ['player','sync']]
      },
      {
        title: 'Telemetry + analytics',
        desc: 'Playback telemetry feeds analytics for QoE and discovery improvements.',
        active: ['metrics','analytics'],
        edges: [['player','metrics'], ['metrics','analytics']]
      }
    ]
  },

  overcast: {
    title: 'Overcast',
    steps: [
      {
        title: 'Library + settings sync',
        desc: 'Client loads subscriptions, playlists, and playback settings.',
        active: ['client','auth','library','sync'],
        edges: [['client','auth'], ['auth','library'], ['library','sync']]
      },
      {
        title: 'Search + catalog',
        desc: 'Search hits index; catalog resolves podcasts and episodes.',
        active: ['client','search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Download + playback',
        desc: 'Episode downloaded from CDN/files and played; progress saved.',
        active: ['downloads','cdn','player','sync'],
        edges: [['catalog','downloads'], ['downloads','cdn'], ['cdn','player'], ['player','sync']]
      },
      {
        title: 'Smart Speed + Voice Boost',
        desc: 'Playback enhancements run locally while telemetry captures QoE.',
        active: ['smart','metrics'],
        edges: [['player','smart'], ['player','metrics']]
      },
      {
        title: 'Analytics',
        desc: 'Telemetry feeds analytics for feature improvements.',
        active: ['analytics'],
        edges: [['metrics','analytics']]
      }
    ]
  },

  castbox: {
    title: 'Castbox',
    steps: [
      {
        title: 'Home feed + recommendations',
        desc: 'Client loads home feed; recommendations rank shows and episodes.',
        active: ['client','home','recos'],
        edges: [['client','home'], ['home','recos']]
      },
      {
        title: 'Search + index',
        desc: 'Search hits index; catalog resolves metadata.',
        active: ['client','search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'RSS ingest',
        desc: 'RSS sources ingested to keep catalog up to date.',
        active: ['rss','ingest','catalog'],
        edges: [['rss','ingest'], ['ingest','catalog']]
      },
      {
        title: 'Playback + ads',
        desc: 'Player streams/downloads audio; ads may be inserted; telemetry captured.',
        active: ['player','cdn','ads','metrics'],
        edges: [['catalog','player'], ['player','cdn'], ['player','ads'], ['player','metrics']]
      },
      {
        title: 'Moderation + analytics',
        desc: 'Moderation and analytics enforce policy and improve discovery.',
        active: ['moderation','analytics'],
        edges: [['catalog','moderation'], ['metrics','analytics']]
      }
    ]
  },

  audible: {
    title: 'Audible',
    steps: [
      {
        title: 'Browse store + search',
        desc: 'Client browses store; search hits index; catalog resolves audiobook metadata.',
        active: ['client','store','search','index','catalog'],
        edges: [['client','store'], ['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Purchase + entitlements',
        desc: 'Payment processed (credits/subscription); entitlements added to library/ledger.',
        active: ['payments','ledger','library'],
        edges: [['store','payments'], ['payments','ledger'], ['ledger','library']]
      },
      {
        title: 'DRM + download',
        desc: 'DRM licenses issued; downloads served via CDN.',
        active: ['drm','downloads','cdn'],
        edges: [['library','drm'], ['drm','downloads'], ['downloads','cdn']]
      },
      {
        title: 'Playback + bookmarks',
        desc: 'Player plays with bookmarks; progress sync and telemetry captured.',
        active: ['player','metrics'],
        edges: [['cdn','player'], ['player','metrics']]
      },
      {
        title: 'Analytics',
        desc: 'QoE and engagement metrics feed analytics.',
        active: ['analytics'],
        edges: [['metrics','analytics']]
      }
    ]
  },

  storytel: {
    title: 'Storytel',
    steps: [
      {
        title: 'Sign in + subscription policy',
        desc: 'Auth and entitlements validated; policy enforces access and device limits.',
        active: ['client','auth','subs','policy'],
        edges: [['client','auth'], ['auth','subs'], ['subs','policy']]
      },
      {
        title: 'Browse/search catalog',
        desc: 'Search hits index; catalog resolves titles and rights.',
        active: ['client','search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'DRM + playback',
        desc: 'DRM licenses issued; playback streams via CDN; telemetry captured.',
        active: ['drm','player','cdn','metrics'],
        edges: [['catalog','drm'], ['drm','player'], ['player','cdn'], ['player','metrics']]
      },
      {
        title: 'Downloads (offline)',
        desc: 'Offline downloads stored encrypted; synced across devices.',
        active: ['downloads','library'],
        edges: [['catalog','downloads'], ['downloads','library']]
      },
      {
        title: 'Analytics',
        desc: 'Engagement and QoE metrics feed analytics.',
        active: ['analytics'],
        edges: [['metrics','analytics']]
      }
    ]
  },

  scribd: {
    title: 'Scribd',
    steps: [
      {
        title: 'Sign in + subscription check',
        desc: 'Auth and subscription policy validated for access.',
        active: ['client','auth','subs','policy'],
        edges: [['client','auth'], ['auth','subs'], ['subs','policy']]
      },
      {
        title: 'Search + catalog',
        desc: 'Search hits index; catalog resolves books/docs/audiobooks.',
        active: ['client','search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Read/listen (CDN)',
        desc: 'Reader/player streams content via CDN; downloads supported.',
        active: ['reader','cdn','downloads','metrics'],
        edges: [['catalog','reader'], ['reader','cdn'], ['catalog','downloads'], ['reader','metrics']]
      },
      {
        title: 'DRM/policy enforcement',
        desc: 'DRM and policy enforce access rules and device limits.',
        active: ['drm','policy'],
        edges: [['catalog','drm'], ['drm','policy']]
      },
      {
        title: 'Analytics',
        desc: 'Engagement and QoE feed analytics.',
        active: ['analytics'],
        edges: [['metrics','analytics']]
      }
    ]
  },

  kindle: {
    title: 'Kindle',
    steps: [
      {
        title: 'Store browse + purchase',
        desc: 'User browses store; purchases add entitlements to library.',
        active: ['client','store','catalog','library'],
        edges: [['client','store'], ['store','catalog'], ['catalog','library']]
      },
      {
        title: 'Download + DRM',
        desc: 'DRM and downloads deliver encrypted book assets to device.',
        active: ['drm','downloads'],
        edges: [['library','drm'], ['drm','downloads']]
      },
      {
        title: 'Read + sync progress',
        desc: 'Reader updates progress and syncs highlights/bookmarks across devices.',
        active: ['reader','sync'],
        edges: [['downloads','reader'], ['reader','sync']]
      },
      {
        title: 'Search + index',
        desc: 'Search hits index; catalog resolves results.',
        active: ['search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Analytics',
        desc: 'Reading telemetry feeds analytics and recommendations.',
        active: ['metrics','analytics'],
        edges: [['reader','metrics'], ['metrics','analytics']]
      }
    ]
  },

  wattpad: {
    title: 'Wattpad',
    steps: [
      {
        title: 'Open feed + ranking',
        desc: 'Client loads feed; ranking selects stories based on engagement and preferences.',
        active: ['client','feed','rank','stories'],
        edges: [['client','feed'], ['feed','rank'], ['rank','stories']]
      },
      {
        title: 'Search + index',
        desc: 'Search hits index; resolves stories and authors.',
        active: ['client','search','index','stories'],
        edges: [['client','search'], ['search','index'], ['index','stories']]
      },
      {
        title: 'Read chapters',
        desc: 'Chapter content served; reading progress captured.',
        active: ['chapters','analytics'],
        edges: [['stories','chapters'], ['chapters','analytics']]
      },
      {
        title: 'Write/publish',
        desc: 'Writer drafts and publishes chapters; moderation runs.',
        active: ['writer','drafts','chapters','moderation'],
        edges: [['client','writer'], ['writer','drafts'], ['drafts','chapters'], ['chapters','moderation']]
      },
      {
        title: 'Comments + notifications',
        desc: 'Comments persist; notifications sent; safety enforcement applies.',
        active: ['comments','notify','moderation'],
        edges: [['client','comments'], ['comments','notify'], ['comments','moderation']]
      }
    ]
  },

  ghost: {
    title: 'Ghost',
    steps: [
      {
        title: 'Author signs in + writes post',
        desc: 'Author uses editor; post saved and published to site.',
        active: ['client','auth','editor','posts'],
        edges: [['client','auth'], ['auth','editor'], ['editor','posts']]
      },
      {
        title: 'Site render + CDN',
        desc: 'Site renders posts with themes; assets served via CDN.',
        active: ['themes','site','cdn'],
        edges: [['posts','themes'], ['themes','site'], ['site','cdn']]
      },
      {
        title: 'Members + subscriptions',
        desc: 'Members sign up; payments create entitlements.',
        active: ['members','payments'],
        edges: [['site','members'], ['members','payments']]
      },
      {
        title: 'Newsletter sends',
        desc: 'Newsletter composed; emails sent via provider; deliverability tracked.',
        active: ['newsletter','email','analytics'],
        edges: [['posts','newsletter'], ['newsletter','email'], ['email','analytics']]
      },
      {
        title: 'Search + indexing',
        desc: 'Search uses index built from posts/content.',
        active: ['search','index','posts'],
        edges: [['client','search'], ['search','index'], ['index','posts']]
      }
    ]
  },

  beehiiv: {
    title: 'Beehiiv',
    steps: [
      {
        title: 'Author signs in + writes newsletter',
        desc: 'Author uses editor; newsletter post saved and previewed.',
        active: ['client','auth','editor','posts'],
        edges: [['client','auth'], ['auth','editor'], ['editor','posts']]
      },
      {
        title: 'Subscribers + segmentation',
        desc: 'Subscriber lists updated; segmentation selects audience.',
        active: ['subscribers','segmentation'],
        edges: [['subscribers','segmentation']]
      },
      {
        title: 'Send campaign via email',
        desc: 'Newsletter sent via email provider; deliverability monitored.',
        active: ['newsletter','email','deliverability'],
        edges: [['posts','newsletter'], ['newsletter','email'], ['email','deliverability']]
      },
      {
        title: 'Referrals + growth loops',
        desc: 'Referral programs drive growth; analytics measures conversions.',
        active: ['referrals','analytics'],
        edges: [['email','referrals'], ['referrals','analytics']]
      },
      {
        title: 'Monetization',
        desc: 'Paid subscriptions and sponsorships flow through payments and reporting.',
        active: ['payments','analytics'],
        edges: [['subscribers','payments'], ['payments','analytics']]
      }
    ]
  },

  revue: {
    title: 'Revue',
    steps: [
      {
        title: 'Author signs in + drafts issue',
        desc: 'Author logs in, writes in editor, and saves drafts for the next issue.',
        active: ['client','auth','editor','drafts'],
        edges: [['client','auth'], ['auth','editor'], ['editor','drafts']]
      },
      {
        title: 'Curate links + publish issue',
        desc: 'Drafts assembled into an issue and published to the newsletter pipeline.',
        active: ['drafts','issues','newsletter'],
        edges: [['drafts','issues'], ['issues','newsletter']]
      },
      {
        title: 'Subscribers + segmentation',
        desc: 'Subscriber list and segments select the target audience for the issue.',
        active: ['subscribers','segmentation','newsletter'],
        edges: [['subscribers','segmentation'], ['segmentation','newsletter']]
      },
      {
        title: 'Send via email + deliverability',
        desc: 'Newsletter sent via email provider; deliverability tracked and retried.',
        active: ['newsletter','email','deliverability'],
        edges: [['newsletter','email'], ['email','deliverability']]
      },
      {
        title: 'Analytics + monetization',
        desc: 'Opens/clicks feed analytics; paid plans/sponsorships flow to payments.',
        active: ['analytics','payments'],
        edges: [['deliverability','analytics'], ['analytics','payments']]
      }
    ]
  },

  flipboard: {
    title: 'Flipboard',
    steps: [
      {
        title: 'Ingest from sources',
        desc: 'Crawler fetches from sources; ingest pipeline dedupes and normalizes stories.',
        active: ['sources','crawler','ingest','dedupe'],
        edges: [['sources','crawler'], ['crawler','ingest'], ['ingest','dedupe']]
      },
      {
        title: 'Rank + build feed',
        desc: 'Ranking produces personalized feed from topics and user signals.',
        active: ['topics','rank','feed'],
        edges: [['topics','rank'], ['dedupe','rank'], ['rank','feed']]
      },
      {
        title: 'Read in magazine UI',
        desc: 'Client reads stories; content/assets served via CDN.',
        active: ['client','feed','cdn'],
        edges: [['client','feed'], ['feed','cdn']]
      },
      {
        title: 'Search',
        desc: 'Search hits index and returns matching stories to the feed UI.',
        active: ['client','search','index','feed'],
        edges: [['client','search'], ['search','index'], ['index','feed']]
      },
      {
        title: 'Ads + moderation',
        desc: 'Ads served alongside feed; moderation enforces safety/publisher rules.',
        active: ['ads','moderation'],
        edges: [['feed','ads'], ['feed','moderation']]
      },
      {
        title: 'Analytics',
        desc: 'Engagement analytics power ranking and publisher reporting.',
        active: ['analytics'],
        edges: [['feed','analytics']]
      }
    ]
  },

  feedly: {
    title: 'Feedly',
    steps: [
      {
        title: 'Subscribe to feeds + categories',
        desc: 'User subscribes to sources and organizes them into collections/topics.',
        active: ['client','auth','sources','topics'],
        edges: [['client','auth'], ['client','sources'], ['sources','topics']]
      },
      {
        title: 'Fetch RSS + ingest',
        desc: 'Fetcher polls RSS; ingest pipeline stores items and dedupes/normalizes.',
        active: ['rss','fetcher','ingest','dedupe','feeds'],
        edges: [['rss','fetcher'], ['fetcher','ingest'], ['ingest','dedupe'], ['dedupe','feeds']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index to find items across subscribed sources and topics.',
        active: ['client','search','index','feeds'],
        edges: [['client','search'], ['search','index'], ['index','feeds']]
      },
      {
        title: 'ML filtering + prioritization',
        desc: 'ML filters noise and prioritizes important items for the user feed.',
        active: ['ml','feeds'],
        edges: [['feeds','ml'], ['ml','feeds']]
      },
      {
        title: 'Notifications + analytics',
        desc: 'Alerts for tracked topics; analytics improves filtering and ranking.',
        active: ['notify','analytics'],
        edges: [['feeds','analytics'], ['analytics','notify']]
      }
    ]
  },

  inshorts: {
    title: 'Inshorts',
    steps: [
      {
        title: 'Ingest news from sources',
        desc: 'Crawler pulls stories from sources and queues them for summarization.',
        active: ['sources','crawler','summarize'],
        edges: [['sources','crawler'], ['crawler','summarize']]
      },
      {
        title: 'Summarize + editorial pass',
        desc: 'Summaries generated and refined by editorial workflows before publishing.',
        active: ['summarize','editorial'],
        edges: [['summarize','editorial']]
      },
      {
        title: 'Rank + deliver feed',
        desc: 'Ranking selects top cards; feed served to clients with personalization.',
        active: ['rank','feed','client'],
        edges: [['editorial','rank'], ['rank','feed'], ['client','feed']]
      },
      {
        title: 'Search',
        desc: 'Search hits index to find stories/topics for the card UI.',
        active: ['search','index','feed'],
        edges: [['client','search'], ['search','index'], ['index','feed']]
      },
      {
        title: 'Ads + notifications',
        desc: 'Ads served with feed; notifications for breaking news.',
        active: ['ads','notify'],
        edges: [['feed','ads'], ['feed','notify']]
      },
      {
        title: 'Moderation + analytics',
        desc: 'Policy enforcement and analytics feed back into ranking and coverage.',
        active: ['moderation','analytics'],
        edges: [['feed','moderation'], ['feed','analytics']]
      }
    ]
  },

  dailyhunt: {
    title: 'Dailyhunt',
    steps: [
      {
        title: 'Ingest + dedupe sources',
        desc: 'Ingest pipeline pulls from publishers, dedupes, and normalizes items.',
        active: ['sources','ingest','dedupe'],
        edges: [['sources','ingest'], ['ingest','dedupe']]
      },
      {
        title: 'Language + localization',
        desc: 'Language classification/translation supports multi-language feeds.',
        active: ['lang'],
        edges: [['dedupe','lang']]
      },
      {
        title: 'Rank + serve feed',
        desc: 'Ranking builds a personalized feed from localized items.',
        active: ['rank','feed','client'],
        edges: [['lang','rank'], ['rank','feed'], ['client','feed']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index to retrieve stories and topics.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','feed']]
      },
      {
        title: 'Ads + notifications',
        desc: 'Ads monetize the feed; notifications alert on breaking/local news.',
        active: ['ads','notify'],
        edges: [['feed','ads'], ['feed','notify']]
      },
      {
        title: 'Moderation + analytics',
        desc: 'Moderation enforces policy; analytics improves ranking and content mix.',
        active: ['moderation','analytics'],
        edges: [['feed','moderation'], ['feed','analytics']]
      }
    ]
  },

  smartnews: {
    title: 'SmartNews',
    steps: [
      {
        title: 'Ingest from sources',
        desc: 'Crawler and ingest pipeline pull from sources and dedupe/normalize stories.',
        active: ['sources','crawler','ingest','dedupe'],
        edges: [['sources','crawler'], ['crawler','ingest'], ['ingest','dedupe']]
      },
      {
        title: 'Rank + build feed',
        desc: 'Ranking produces a personalized feed for the client app.',
        active: ['rank','feed','client'],
        edges: [['dedupe','rank'], ['rank','feed'], ['client','feed']]
      },
      {
        title: 'Offline caching',
        desc: 'Feed items cached for offline reading; assets served via CDN.',
        active: ['offline','cdn'],
        edges: [['feed','offline'], ['offline','cdn'], ['cdn','client']]
      },
      {
        title: 'Search',
        desc: 'Search uses index to retrieve stories and topics.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'Ads + moderation',
        desc: 'Ads monetize; moderation enforces safety and publisher constraints.',
        active: ['ads','moderation'],
        edges: [['feed','ads'], ['feed','moderation']]
      },
      {
        title: 'Analytics',
        desc: 'Engagement analytics tune ranking and notifications.',
        active: ['analytics'],
        edges: [['feed','analytics']]
      }
    ]
  },

  pocket: {
    title: 'Pocket',
    steps: [
      {
        title: 'Save a link',
        desc: 'User saves a URL; parser extracts readable content and stores it in library.',
        active: ['client','save','parser','library'],
        edges: [['client','save'], ['save','parser'], ['parser','library']]
      },
      {
        title: 'Tag + recommendations',
        desc: 'User adds tags; recommendation engine surfaces related reads.',
        active: ['tags','recommend'],
        edges: [['library','tags'], ['tags','recommend']]
      },
      {
        title: 'Read offline + sync',
        desc: 'Reader caches content offline; reading progress syncs across devices.',
        active: ['read','offline','sync'],
        edges: [['library','read'], ['read','offline'], ['offline','sync']]
      },
      {
        title: 'Search library',
        desc: 'Search hits index built from saved items and returns matches.',
        active: ['search','index','library'],
        edges: [['client','search'], ['search','index'], ['index','library']]
      },
      {
        title: 'Telemetry + analytics',
        desc: 'Reading telemetry feeds analytics for ranking and recommendations.',
        active: ['metrics','analytics'],
        edges: [['read','metrics'], ['metrics','analytics']]
      }
    ]
  },

  instapaper: {
    title: 'Instapaper',
    steps: [
      {
        title: 'Save + parse article',
        desc: 'User saves a link; parser extracts clean text and stores it in library.',
        active: ['client','save','parser','library'],
        edges: [['client','save'], ['save','parser'], ['parser','library']]
      },
      {
        title: 'Read + highlights',
        desc: 'Reader loads text; highlights/notes saved for later retrieval.',
        active: ['read','highlights'],
        edges: [['library','read'], ['read','highlights']]
      },
      {
        title: 'Offline + sync',
        desc: 'Offline copies cached; sync keeps library and progress consistent.',
        active: ['offline','sync'],
        edges: [['read','offline'], ['offline','sync']]
      },
      {
        title: 'Search library',
        desc: 'Search uses index to find saved articles and highlights.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','library']]
      },
      {
        title: 'Telemetry + analytics',
        desc: 'Engagement telemetry feeds analytics for product improvements.',
        active: ['metrics','analytics'],
        edges: [['read','metrics'], ['metrics','analytics']]
      }
    ]
  },

  'google-news': {
    title: 'Google News',
    steps: [
      {
        title: 'Ingest + dedupe sources',
        desc: 'Crawler/ingest pipeline pulls from sources and dedupes/normalizes stories.',
        active: ['sources','crawler','ingest','dedupe'],
        edges: [['sources','crawler'], ['crawler','ingest'], ['ingest','dedupe']]
      },
      {
        title: 'Topic clustering + ranking',
        desc: 'Stories clustered by topic; ranking builds personalized feed.',
        active: ['topics','rank','feed'],
        edges: [['dedupe','topics'], ['topics','rank'], ['rank','feed']]
      },
      {
        title: 'Read + ads',
        desc: 'Client reads feed; ads and cards rendered alongside content.',
        active: ['client','feed','ads'],
        edges: [['client','feed'], ['feed','ads']]
      },
      {
        title: 'Search',
        desc: 'Search hits index to find news and topics.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','feed']]
      },
      {
        title: 'Moderation + analytics',
        desc: 'Policy enforcement and analytics tune ranking and recommendations.',
        active: ['moderation','analytics'],
        edges: [['feed','moderation'], ['feed','analytics']]
      }
    ]
  },

  'apple-news': {
    title: 'Apple News',
    steps: [
      {
        title: 'Ingest publishers + dedupe',
        desc: 'Ingest pipeline pulls from publishers and dedupes/normalizes stories.',
        active: ['sources','ingest','dedupe'],
        edges: [['sources','ingest'], ['ingest','dedupe']]
      },
      {
        title: 'Topics + ranking',
        desc: 'Topics and user signals drive ranking for the personalized feed.',
        active: ['topics','rank','feed'],
        edges: [['dedupe','topics'], ['topics','rank'], ['rank','feed']]
      },
      {
        title: 'News+ subscription access',
        desc: 'Subscription gates premium content; entitlements verified via payments flow.',
        active: ['subscriptions','payments'],
        edges: [['feed','subscriptions'], ['subscriptions','payments']]
      },
      {
        title: 'Read + search',
        desc: 'Client reads feed and searches via index.',
        active: ['client','feed','search','index'],
        edges: [['client','feed'], ['client','search'], ['search','index'], ['index','feed']]
      },
      {
        title: 'Ads + moderation',
        desc: 'Ads monetize free feed; moderation enforces policies and publisher rules.',
        active: ['ads','moderation'],
        edges: [['feed','ads'], ['feed','moderation']]
      },
      {
        title: 'Analytics',
        desc: 'Engagement analytics tune ranking and editorial coverage.',
        active: ['analytics'],
        edges: [['feed','analytics']]
      }
    ]
  },

  newsbreak: {
    title: 'NewsBreak',
    steps: [
      {
        title: 'Ingest + dedupe publishers',
        desc: 'Crawler/ingest pipeline pulls from sources and dedupes/normalizes stories.',
        active: ['sources','crawler','ingest','dedupe'],
        edges: [['sources','crawler'], ['crawler','ingest'], ['ingest','dedupe']]
      },
      {
        title: 'Local personalization',
        desc: 'Localization builds neighborhood/local news mix and context for ranking.',
        active: ['local','rank'],
        edges: [['dedupe','local'], ['local','rank']]
      },
      {
        title: 'Rank + serve feed',
        desc: 'Ranking assembles the feed; client reads and scrolls cards.',
        active: ['rank','feed','client'],
        edges: [['rank','feed'], ['client','feed']]
      },
      {
        title: 'Search',
        desc: 'Search uses index to retrieve stories and topics.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','feed']]
      },
      {
        title: 'Notifications + ads',
        desc: 'Breaking news notifications and ad monetization around feed engagement.',
        active: ['notify','ads'],
        edges: [['feed','notify'], ['feed','ads']]
      },
      {
        title: 'Moderation + analytics',
        desc: 'Policy enforcement and analytics tune ranking and content coverage.',
        active: ['moderation','analytics'],
        edges: [['feed','moderation'], ['feed','analytics']]
      }
    ]
  },

  'reddit-reader-apps': {
    title: 'Reddit Reader apps',
    steps: [
      {
        title: 'OAuth + session',
        desc: 'Client authenticates via OAuth and uses token to call Reddit API.',
        active: ['client','oauth','reddit'],
        edges: [['client','oauth'], ['oauth','reddit']]
      },
      {
        title: 'Load subreddit feeds',
        desc: 'Subreddit listings fetched; feed cached for fast scrolling.',
        active: ['subreddits','feed','cache'],
        edges: [['reddit','subreddits'], ['subreddits','feed'], ['feed','cache']]
      },
      {
        title: 'Open thread + comments',
        desc: 'Comments loaded; actions like upvote/reply go back through API.',
        active: ['comments','reddit'],
        edges: [['feed','comments'], ['comments','reddit']]
      },
      {
        title: 'Media handling',
        desc: 'Images/videos pulled from media/CDN sources and rendered in-app.',
        active: ['media'],
        edges: [['feed','media']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses local index/cache to filter and jump between threads.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','feed']]
      },
      {
        title: 'Telemetry + moderation',
        desc: 'Telemetry and moderation tools manage UX and safety/policy constraints.',
        active: ['telemetry','analytics','moderation'],
        edges: [['feed','telemetry'], ['telemetry','analytics'], ['comments','moderation']]
      }
    ]
  },

  letterboxd: {
    title: 'Letterboxd',
    steps: [
      {
        title: 'Sign in + profile',
        desc: 'User signs in and loads profile and diary context.',
        active: ['client','auth','profiles'],
        edges: [['client','auth'], ['auth','profiles']]
      },
      {
        title: 'Log a film',
        desc: 'User picks a film and logs watch date; diary entry saved.',
        active: ['films','log'],
        edges: [['client','films'], ['films','log']]
      },
      {
        title: 'Rate + review',
        desc: 'User rates and writes review; stored and shown on film pages.',
        active: ['ratings','reviews'],
        edges: [['log','ratings'], ['ratings','reviews']]
      },
      {
        title: 'Lists + social',
        desc: 'Users curate lists and follow others; notifications fired for activity.',
        active: ['lists','social','notify'],
        edges: [['reviews','lists'], ['lists','social'], ['social','notify']]
      },
      {
        title: 'Search + recos',
        desc: 'Search hits index; recommendations suggest films based on taste graph.',
        active: ['search','index','recos'],
        edges: [['client','search'], ['search','index'], ['films','recos']]
      },
      {
        title: 'Analytics',
        desc: 'Engagement analytics tune recommendations and community health.',
        active: ['analytics'],
        edges: [['social','analytics']]
      }
    ]
  },

  imdb: {
    title: 'IMDb',
    steps: [
      {
        title: 'Browse title page',
        desc: 'User opens a title; metadata and media assets load via CDN.',
        active: ['client','titles','media','cdn'],
        edges: [['client','titles'], ['titles','media'], ['media','cdn']]
      },
      {
        title: 'Rate title',
        desc: 'User rating saved and aggregated into title score distribution.',
        active: ['ratings','titles'],
        edges: [['client','ratings'], ['ratings','titles']]
      },
      {
        title: 'Write review + moderation',
        desc: 'User review saved; moderation checks policy before publishing.',
        active: ['reviews','moderation'],
        edges: [['client','reviews'], ['reviews','moderation']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index over titles/people and returns results.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','titles']]
      },
      {
        title: 'Recommendations + ads',
        desc: 'Recommendations surface related titles; ads monetize page views.',
        active: ['recommend','ads'],
        edges: [['titles','recommend'], ['titles','ads']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks engagement and improves ranking/recos.',
        active: ['analytics'],
        edges: [['titles','analytics']]
      }
    ]
  },

  'tv-time': {
    title: 'TV Time',
    steps: [
      {
        title: 'Browse show + episode list',
        desc: 'User browses shows and episodes from catalog metadata.',
        active: ['client','shows','episodes'],
        edges: [['client','shows'], ['shows','episodes']]
      },
      {
        title: 'Track watched episodes',
        desc: 'User marks watched; tracking stored and synced across devices.',
        active: ['tracking','sync'],
        edges: [['client','tracking'], ['tracking','sync']]
      },
      {
        title: 'Reminders + notifications',
        desc: 'Notifications for new episodes, premieres, and watchlist events.',
        active: ['notifications'],
        edges: [['sync','notifications']]
      },
      {
        title: 'Social reactions',
        desc: 'Comments/reactions shared socially and may trigger notifications.',
        active: ['social','notifications'],
        edges: [['client','social'], ['social','notifications']]
      },
      {
        title: 'Search + recommendations',
        desc: 'Search hits index; recommendations suggest next shows to watch.',
        active: ['search','index','recommend'],
        edges: [['client','search'], ['search','index'], ['shows','recommend']]
      },
      {
        title: 'Analytics',
        desc: 'Engagement analytics tune recommendations and alerts.',
        active: ['analytics'],
        edges: [['tracking','analytics']]
      }
    ]
  },

  trakt: {
    title: 'Trakt',
    steps: [
      {
        title: 'OAuth + API session',
        desc: 'Client authenticates via OAuth and calls Trakt API for profile/history.',
        active: ['client','oauth','api','users'],
        edges: [['client','oauth'], ['oauth','api'], ['api','users']]
      },
      {
        title: 'Scrobble playback',
        desc: 'Apps send scrobble events; watch history updated and synced.',
        active: ['scrobble','history','sync'],
        edges: [['client','scrobble'], ['scrobble','history'], ['history','sync']]
      },
      {
        title: 'Lists + sync + webhooks',
        desc: 'Lists/watchlists synced to clients; webhooks notify integrations.',
        active: ['lists','sync','webhooks'],
        edges: [['lists','sync'], ['sync','webhooks']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index; results returned through API and rendered in clients.',
        active: ['search','index','api'],
        edges: [['client','search'], ['search','index'], ['index','api']]
      },
      {
        title: 'Recommendations + analytics',
        desc: 'History drives recommendations; analytics measures engagement and accuracy.',
        active: ['recommend','analytics'],
        edges: [['history','recommend'], ['recommend','analytics']]
      }
    ]
  },

  justwatch: {
    title: 'JustWatch',
    steps: [
      {
        title: 'Ingest provider availability',
        desc: 'Availability collected from streaming providers and merged into catalog.',
        active: ['providers','availability','catalog'],
        edges: [['providers','availability'], ['availability','catalog']]
      },
      {
        title: 'Search + filter',
        desc: 'Search hits index; filters by provider, price, quality, and region.',
        active: ['search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Watchlist + alerts',
        desc: 'User saves watchlist; alerts fire when availability changes.',
        active: ['watchlist','alerts'],
        edges: [['client','watchlist'], ['watchlist','alerts']]
      },
      {
        title: 'Ranking',
        desc: 'Ranking orders results based on popularity and relevance.',
        active: ['rank'],
        edges: [['catalog','rank']]
      },
      {
        title: 'Ads + analytics',
        desc: 'Ads monetize traffic; analytics tune ranking and UX funnels.',
        active: ['ads','analytics'],
        edges: [['catalog','ads'], ['catalog','analytics']]
      }
    ]
  },

  coda: {
    title: 'Coda',
    steps: [
      {
        title: 'Sign in + open doc',
        desc: 'User signs in and opens a doc with tables and views.',
        active: ['client','auth','docs','tables'],
        edges: [['client','auth'], ['auth','docs'], ['docs','tables']]
      },
      {
        title: 'Edit tables + formulas',
        desc: 'Edits trigger formula evaluation and compute jobs.',
        active: ['tables','formulas','compute'],
        edges: [['tables','formulas'], ['formulas','compute']]
      },
      {
        title: 'Realtime collaboration',
        desc: 'Realtime engine syncs changes to collaborators with permissions enforced.',
        active: ['realtime','permissions'],
        edges: [['compute','realtime'], ['docs','permissions'], ['realtime','client']]
      },
      {
        title: 'Packs + integrations',
        desc: 'Packs call external APIs and write data back into tables.',
        active: ['packs','integrations','compute'],
        edges: [['client','packs'], ['packs','integrations'], ['integrations','compute']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across docs, tables, and content.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'Export + analytics',
        desc: 'Exports produce files; analytics track adoption and doc performance.',
        active: ['export','analytics'],
        edges: [['docs','export'], ['docs','analytics']]
      }
    ]
  },

  obsidian: {
    title: 'Obsidian',
    steps: [
      {
        title: 'Open vault + edit note',
        desc: 'User opens local vault and edits Markdown notes.',
        active: ['client','vault','markdown'],
        edges: [['client','vault'], ['vault','markdown']]
      },
      {
        title: 'Links + graph view',
        desc: 'Backlinks and graph computed from links between notes.',
        active: ['links','graph'],
        edges: [['markdown','links'], ['links','graph']]
      },
      {
        title: 'Search + indexing',
        desc: 'Index built from vault content; search returns matches quickly.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','vault']]
      },
      {
        title: 'Sync + cloud',
        desc: 'Sync replicates vault changes to cloud and other devices.',
        active: ['sync','cloud'],
        edges: [['vault','sync'], ['sync','cloud']]
      },
      {
        title: 'Publish site',
        desc: 'Publish turns notes into a hosted site for sharing.',
        active: ['publish'],
        edges: [['vault','publish']]
      },
      {
        title: 'Plugins + safety',
        desc: 'Plugins extend workflows; security controls and backups protect data.',
        active: ['plugins','security','backups'],
        edges: [['client','plugins'], ['vault','security'], ['vault','backups']]
      }
    ]
  },

  'roam-research': {
    title: 'Roam Research',
    steps: [
      {
        title: 'Sign in + open graph',
        desc: 'User opens a graph; blocks and references load.',
        active: ['client','auth','graphs','blocks'],
        edges: [['client','auth'], ['auth','graphs'], ['graphs','blocks']]
      },
      {
        title: 'Block references + indexing',
        desc: 'References/backlinks update; index supports fast queries.',
        active: ['references','index'],
        edges: [['blocks','references'], ['references','index']]
      },
      {
        title: 'Query + filters',
        desc: 'User runs queries; index returns matching blocks/attributes.',
        active: ['query','index','blocks'],
        edges: [['client','query'], ['query','index'], ['index','blocks']]
      },
      {
        title: 'Realtime collaboration',
        desc: 'Realtime sync pushes edits across collaborators and devices.',
        active: ['realtime','sync'],
        edges: [['blocks','realtime'], ['realtime','client'], ['blocks','sync']]
      },
      {
        title: 'Share + export',
        desc: 'Graph/pages shared; exports create backups and portable formats.',
        active: ['share','export','backups'],
        edges: [['blocks','share'], ['share','export'], ['blocks','backups']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics monitor usage patterns and collaboration health.',
        active: ['analytics'],
        edges: [['blocks','analytics']]
      }
    ]
  },

  bear: {
    title: 'Bear',
    steps: [
      {
        title: 'Open notes database',
        desc: 'Client opens local notes database and loads recent notes and tags.',
        active: ['client','vault','tags'],
        edges: [['client','vault'], ['vault','tags']]
      },
      {
        title: 'Write Markdown note',
        desc: 'Editor writes Markdown; changes persisted to notes DB.',
        active: ['editor','markdown','vault'],
        edges: [['client','editor'], ['editor','markdown'], ['markdown','vault']]
      },
      {
        title: 'Search + index',
        desc: 'Index enables fast search across notes and tags.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','vault']]
      },
      {
        title: 'Encrypt + sync',
        desc: 'Sensitive notes encrypted; sync replicates updates to cloud/devices.',
        active: ['encryption','sync','cloud'],
        edges: [['vault','encryption'], ['encryption','sync'], ['sync','cloud']]
      },
      {
        title: 'Export + backups',
        desc: 'Exports generate files; backups protect long-term retention.',
        active: ['export','backups'],
        edges: [['vault','export'], ['vault','backups']]
      },
      {
        title: 'Telemetry + analytics',
        desc: 'Telemetry and analytics track feature usage and reliability.',
        active: ['metrics','analytics'],
        edges: [['client','metrics'], ['metrics','analytics']]
      }
    ]
  },

  craft: {
    title: 'Craft',
    steps: [
      {
        title: 'Sign in + open workspace',
        desc: 'User signs in and loads workspace + doc list.',
        active: ['client','auth','workspace','docs'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','docs']]
      },
      {
        title: 'Edit blocks + realtime sync',
        desc: 'Edits to blocks sync via realtime layer to collaborators and devices.',
        active: ['blocks','realtime','sync'],
        edges: [['docs','blocks'], ['blocks','realtime'], ['realtime','sync']]
      },
      {
        title: 'Share + publish',
        desc: 'Docs shared via links and can be published to the web.',
        active: ['sharing','publish'],
        edges: [['docs','sharing'], ['sharing','publish']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across docs and blocks for fast retrieval.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','docs']]
      },
      {
        title: 'Export + permissions',
        desc: 'Exports generate files; permissions enforce access controls.',
        active: ['export','permissions'],
        edges: [['docs','export'], ['docs','permissions']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics monitors collaboration and content engagement.',
        active: ['analytics'],
        edges: [['docs','analytics']]
      }
    ]
  },

  superhuman: {
    title: 'Superhuman',
    steps: [
      {
        title: 'Connect account + sync inbox',
        desc: 'Auth connects to Gmail/IMAP; sync builds local inbox model.',
        active: ['client','auth','gmail','imap','sync','inbox'],
        edges: [['client','auth'], ['auth','gmail'], ['gmail','sync'], ['sync','inbox'], ['imap','sync']]
      },
      {
        title: 'Search + index',
        desc: 'Index enables instant search across mail and contacts.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','inbox']]
      },
      {
        title: 'Compose + snippets',
        desc: 'Compose uses snippets/templates; send via SMTP/Gmail API.',
        active: ['compose','snippets','send'],
        edges: [['client','compose'], ['compose','snippets'], ['compose','send'], ['send','imap']]
      },
      {
        title: 'Tracking + notifications',
        desc: 'Read receipts and follow-ups drive notifications and reminders.',
        active: ['tracking','notify'],
        edges: [['send','tracking'], ['tracking','notify']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics measures speed, triage efficiency, and productivity habits.',
        active: ['analytics'],
        edges: [['inbox','analytics']]
      }
    ]
  },

  'spark-mail': {
    title: 'Spark Mail',
    steps: [
      {
        title: 'Connect IMAP + sync',
        desc: 'Account connects via IMAP; sync downloads messages and threads.',
        active: ['client','auth','imap','sync','inbox'],
        edges: [['client','auth'], ['auth','imap'], ['imap','sync'], ['sync','inbox']]
      },
      {
        title: 'Smart Inbox categorization',
        desc: 'Smart Inbox classifies mail and prioritizes important threads.',
        active: ['smart','inbox'],
        edges: [['inbox','smart']]
      },
      {
        title: 'Search + index',
        desc: 'Index powers fast search and filters.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','inbox']]
      },
      {
        title: 'Send mail',
        desc: 'Compose and send mail via SMTP.',
        active: ['smtp'],
        edges: [['client','smtp']]
      },
      {
        title: 'Calendar + contacts',
        desc: 'Calendar and contacts integrate to schedule and address messages.',
        active: ['calendar','contacts'],
        edges: [['calendar','client'], ['contacts','client']]
      },
      {
        title: 'Notifications + analytics',
        desc: 'Notifications and analytics help manage inbox workflow.',
        active: ['notify','analytics'],
        edges: [['smart','notify'], ['inbox','analytics']]
      }
    ]
  },

  'newton-mail': {
    title: 'Newton Mail',
    steps: [
      {
        title: 'Connect account + sync',
        desc: 'Account connects via IMAP; sync builds inbox model and threads.',
        active: ['client','auth','imap','sync','inbox'],
        edges: [['client','auth'], ['auth','imap'], ['imap','sync'], ['sync','inbox']]
      },
      {
        title: 'Apply rules',
        desc: 'Rules and automation classify and triage incoming messages.',
        active: ['rules','inbox'],
        edges: [['client','rules'], ['rules','inbox']]
      },
      {
        title: 'Search + index',
        desc: 'Index powers fast search across mailboxes.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','inbox']]
      },
      {
        title: 'Send + tracking',
        desc: 'Send mail via SMTP; tracking monitors opens and follow-ups.',
        active: ['send','tracking'],
        edges: [['client','send'], ['send','smtp'], ['send','tracking']]
      },
      {
        title: 'Notifications + analytics',
        desc: 'Notifications and analytics support productivity features.',
        active: ['notify','analytics'],
        edges: [['tracking','notify'], ['inbox','analytics']]
      }
    ]
  },

  front: {
    title: 'Front',
    steps: [
      {
        title: 'Ingest channels into shared inbox',
        desc: 'Email/chat/social channels ingested, routed, and stored as conversations.',
        active: ['channels','ingest','router','inbox'],
        edges: [['channels','ingest'], ['ingest','router'], ['router','inbox']]
      },
      {
        title: 'Assign owners + SLAs',
        desc: 'Conversations assigned to teammates; notifications enforce SLAs.',
        active: ['assign','notifications'],
        edges: [['inbox','assign'], ['assign','notifications']]
      },
      {
        title: 'Collaborate internally',
        desc: 'Internal comments and @mentions sync via collaboration layer.',
        active: ['collab','inbox'],
        edges: [['client','collab'], ['collab','inbox']]
      },
      {
        title: 'Automation + integrations',
        desc: 'Rules trigger automation and sync context with external systems (CRM, helpdesk).',
        active: ['automation','integrations'],
        edges: [['automation','inbox'], ['inbox','integrations']]
      },
      {
        title: 'Reply + send',
        desc: 'Replies sent back out to channels; audit log captures actions.',
        active: ['send','audit'],
        edges: [['client','send'], ['send','channels'], ['inbox','audit']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics measure response times, workload, and automation impact.',
        active: ['analytics'],
        edges: [['inbox','analytics']]
      }
    ]
  },

  missive: {
    title: 'Missive',
    steps: [
      {
        title: 'Sync inbox',
        desc: 'IMAP sync downloads messages and threads into inbox model.',
        active: ['imap','sync','inbox'],
        edges: [['imap','sync'], ['sync','inbox']]
      },
      {
        title: 'Team collaboration + chat',
        desc: 'Internal chat and collaboration link directly to email threads.',
        active: ['collab','chat'],
        edges: [['client','chat'], ['chat','collab'], ['collab','inbox']]
      },
      {
        title: 'Tasks tied to threads',
        desc: 'Tasks created and linked to threads for follow-up.',
        active: ['tasks'],
        edges: [['client','tasks'], ['tasks','inbox']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across mail and tasks.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','inbox']]
      },
      {
        title: 'Send replies',
        desc: 'Replies sent via SMTP; notifications keep team aligned.',
        active: ['send','notify'],
        edges: [['client','send'], ['send','smtp'], ['analytics','notify']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks workload, response times, and team performance.',
        active: ['analytics'],
        edges: [['inbox','analytics']]
      }
    ]
  },

  'proton-mail': {
    title: 'Proton Mail',
    steps: [
      {
        title: 'Auth + key management',
        desc: 'User authenticates; keys and crypto context prepared for mailbox operations.',
        active: ['client','auth','keys','crypto'],
        edges: [['client','auth'], ['auth','keys'], ['keys','crypto']]
      },
      {
        title: 'Sync encrypted mailbox',
        desc: 'Sync downloads encrypted messages and builds mailbox view.',
        active: ['sync','inbox'],
        edges: [['crypto','sync'], ['sync','inbox']]
      },
      {
        title: 'Search + index',
        desc: 'Index enables mailbox search (metadata/content depending on model).',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','inbox']]
      },
      {
        title: 'Compose + encrypt + send',
        desc: 'Compose encrypted message, send through bridge to SMTP.',
        active: ['send','crypto','bridge','smtp'],
        edges: [['client','send'], ['send','crypto'], ['crypto','bridge'], ['bridge','smtp']]
      },
      {
        title: 'Spam + anti-abuse',
        desc: 'Inbound filtering and anti-abuse protections apply to mailbox.',
        active: ['spam','antiabuse'],
        edges: [['imap','bridge'], ['bridge','spam'], ['spam','inbox'], ['inbox','antiabuse']]
      },
      {
        title: 'Analytics',
        desc: 'Operational analytics monitor deliverability and reliability.',
        active: ['analytics'],
        edges: [['inbox','analytics']]
      }
    ]
  },

  'zoho-mail': {
    title: 'Zoho Mail',
    steps: [
      {
        title: 'Admin policies + spam controls',
        desc: 'Admin sets policies; spam/abuse controls enforce compliance.',
        active: ['admin','policies','spam'],
        edges: [['admin','policies'], ['policies','spam']]
      },
      {
        title: 'Sync mailbox',
        desc: 'IMAP sync builds mailbox model; spam filtering applied.',
        active: ['imap','sync','inbox','spam'],
        edges: [['imap','sync'], ['sync','inbox'], ['spam','inbox']]
      },
      {
        title: 'Search + index',
        desc: 'Index supports search across mail, archive, and metadata.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','inbox']]
      },
      {
        title: 'Send mail',
        desc: 'Outgoing mail sent via SMTP with audit trails.',
        active: ['send','smtp','audit'],
        edges: [['client','send'], ['send','smtp'], ['inbox','audit']]
      },
      {
        title: 'Archive + compliance',
        desc: 'Archiving supports retention and compliance reporting.',
        active: ['archive','audit'],
        edges: [['inbox','archive'], ['archive','audit']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks usage, deliverability, and admin outcomes.',
        active: ['analytics'],
        edges: [['inbox','analytics']]
      }
    ]
  },

  'zoho-crm': {
    title: 'Zoho CRM',
    steps: [
      {
        title: 'Capture lead',
        desc: 'Lead captured via forms/integrations and stored for qualification.',
        active: ['client','leads'],
        edges: [['client','leads']]
      },
      {
        title: 'Convert to contact/account',
        desc: 'Qualified lead converted into contact and account records.',
        active: ['contacts','accounts'],
        edges: [['leads','contacts'], ['contacts','accounts']]
      },
      {
        title: 'Move through pipeline',
        desc: 'Deals tracked through pipeline stages with tasks and reminders.',
        active: ['pipeline','tasks'],
        edges: [['accounts','pipeline'], ['pipeline','tasks']]
      },
      {
        title: 'Automation + workflows',
        desc: 'Automation triggers workflows for follow-ups, scoring, and routing.',
        active: ['automation','workflows'],
        edges: [['pipeline','automation'], ['automation','workflows']]
      },
      {
        title: 'Integrations + email outreach',
        desc: 'Integrations sync context; email outreach sequences update CRM activity.',
        active: ['integrations','email'],
        edges: [['workflows','integrations'], ['integrations','email']]
      },
      {
        title: 'Reports + analytics + audit',
        desc: 'Reports and analytics show performance; audit logs retain compliance trails.',
        active: ['reports','analytics','audit'],
        edges: [['pipeline','reports'], ['reports','analytics'], ['pipeline','audit']]
      }
    ]
  },

  hubspot: {
    title: 'HubSpot',
    steps: [
      {
        title: 'Capture lead + contact',
        desc: 'Leads captured from forms/ads/integrations and stored as contacts.',
        active: ['client','crm','contacts'],
        edges: [['client','crm'], ['crm','contacts']]
      },
      {
        title: 'Enrich company + pipeline',
        desc: 'Contacts linked to companies; deals created and moved through pipeline.',
        active: ['companies','deals','pipeline'],
        edges: [['contacts','companies'], ['contacts','deals'], ['deals','pipeline']]
      },
      {
        title: 'Automation + workflows',
        desc: 'Automation triggers workflows for routing, scoring, and follow-ups.',
        active: ['automation','workflows'],
        edges: [['pipeline','automation'], ['automation','workflows']]
      },
      {
        title: 'Email sequences + tracking',
        desc: 'Email sequences send outreach; tracking records opens/clicks and updates CRM.',
        active: ['email','tracking','analytics'],
        edges: [['workflows','email'], ['email','tracking'], ['tracking','analytics']]
      },
      {
        title: 'Ads + integrations',
        desc: 'Ads and integrations sync audiences, events, and lifecycle stages.',
        active: ['ads','integrations'],
        edges: [['crm','integrations'], ['workflows','ads']]
      },
      {
        title: 'Reports',
        desc: 'Reports measure funnel conversion and team performance.',
        active: ['reports','analytics'],
        edges: [['crm','reports'], ['reports','analytics']]
      }
    ]
  },

  salesforce: {
    title: 'Salesforce',
    steps: [
      {
        title: 'Auth + org context',
        desc: 'User authenticates and loads org metadata and object schema.',
        active: ['client','auth','org','objects'],
        edges: [['client','auth'], ['auth','org'], ['org','objects']]
      },
      {
        title: 'Manage accounts + contacts',
        desc: 'Users create/update accounts and contacts; relationships stored in objects.',
        active: ['accounts','contacts'],
        edges: [['objects','accounts'], ['objects','contacts']]
      },
      {
        title: 'Opportunities + workflow',
        desc: 'Opportunities flow through stages; workflow and Apex automate updates.',
        active: ['opps','workflow','apex'],
        edges: [['objects','opps'], ['opps','workflow'], ['workflow','apex']]
      },
      {
        title: 'Integrations + events',
        desc: 'Events stream changes to integrations and downstream systems.',
        active: ['events','integrations'],
        edges: [['apex','events'], ['events','integrations']]
      },
      {
        title: 'Reporting + analytics',
        desc: 'Reports and analytics dashboards summarize pipeline performance.',
        active: ['reporting','analytics'],
        edges: [['objects','reporting'], ['reporting','analytics']]
      },
      {
        title: 'Audit',
        desc: 'Audit trails support compliance and change tracking.',
        active: ['audit'],
        edges: [['objects','audit']]
      }
    ]
  },

  pipedrive: {
    title: 'Pipedrive',
    steps: [
      {
        title: 'Add lead + contact',
        desc: 'Lead captured and converted into a contact/person record.',
        active: ['leads','contacts'],
        edges: [['client','leads'], ['leads','contacts']]
      },
      {
        title: 'Create deal + pipeline stages',
        desc: 'Deals created and moved across pipeline stages.',
        active: ['deals','pipeline'],
        edges: [['contacts','deals'], ['deals','pipeline']]
      },
      {
        title: 'Activities + reminders',
        desc: 'Activities scheduled (calls, follow-ups); reminders keep reps on track.',
        active: ['activities'],
        edges: [['pipeline','activities']]
      },
      {
        title: 'Automation + email',
        desc: 'Automation triggers email templates and follow-ups; syncs back to CRM.',
        active: ['automation','email'],
        edges: [['pipeline','automation'], ['automation','email']]
      },
      {
        title: 'Integrations',
        desc: 'Integrations sync contacts, calendars, and communication history.',
        active: ['integrations'],
        edges: [['crm','integrations']]
      },
      {
        title: 'Reports + analytics',
        desc: 'Reports and analytics summarize conversions and rep performance.',
        active: ['reports','analytics'],
        edges: [['pipeline','reports'], ['reports','analytics']]
      }
    ]
  },

  freshsales: {
    title: 'Freshsales',
    steps: [
      {
        title: 'Capture lead + scoring',
        desc: 'Leads captured and scored to prioritize outreach.',
        active: ['leads','scoring'],
        edges: [['client','leads'], ['leads','scoring']]
      },
      {
        title: 'Convert + manage accounts',
        desc: 'Leads converted to contacts/accounts; linked to deals.',
        active: ['contacts','accounts','deals'],
        edges: [['leads','contacts'], ['contacts','accounts'], ['contacts','deals']]
      },
      {
        title: 'Automation + workflows',
        desc: 'Automations trigger workflows for follow-ups and routing.',
        active: ['automation'],
        edges: [['deals','automation']]
      },
      {
        title: 'Email + phone outreach',
        desc: 'Sequences and call workflows create activities and update deal status.',
        active: ['email','phone'],
        edges: [['automation','email'], ['automation','phone']]
      },
      {
        title: 'Integrations',
        desc: 'Integrations sync calendars, support tools, and data sources.',
        active: ['integrations'],
        edges: [['crm','integrations']]
      },
      {
        title: 'Reports + analytics',
        desc: 'Reports and analytics track pipeline health and conversion.',
        active: ['reports','analytics'],
        edges: [['deals','reports'], ['reports','analytics']]
      }
    ]
  },

  intercom: {
    title: 'Intercom',
    steps: [
      {
        title: 'Customer opens widget',
        desc: 'Widget opens; bots can answer or route to human support.',
        active: ['widget','bots','inbox'],
        edges: [['client','widget'], ['widget','bots'], ['bots','inbox']]
      },
      {
        title: 'Routing + assignment',
        desc: 'Conversation routed and assigned to teammates; notifications fire.',
        active: ['routing','assign','notify'],
        edges: [['inbox','routing'], ['routing','assign'], ['assign','notify']]
      },
      {
        title: 'KB + tickets',
        desc: 'Support uses knowledge base; issues can become tickets for tracking.',
        active: ['kb','tickets'],
        edges: [['inbox','kb'], ['kb','tickets']]
      },
      {
        title: 'CRM + event tracking',
        desc: 'User profiles and events enrich CRM context and triggers.',
        active: ['crm','events'],
        edges: [['inbox','crm'], ['crm','events']]
      },
      {
        title: 'Integrations',
        desc: 'Integrations sync conversations and tickets with external systems.',
        active: ['integrations'],
        edges: [['events','integrations']]
      },
      {
        title: 'Moderation + analytics',
        desc: 'Moderation enforces policies; analytics tracks resolution performance.',
        active: ['moderation','analytics'],
        edges: [['inbox','moderation'], ['inbox','analytics']]
      }
    ]
  },

  drift: {
    title: 'Drift',
    steps: [
      {
        title: 'Open chat + bot qualification',
        desc: 'Widget opens; bots run playbooks to qualify and capture info.',
        active: ['widget','bots','playbooks'],
        edges: [['client','widget'], ['widget','bots'], ['bots','playbooks']]
      },
      {
        title: 'Route to team inbox',
        desc: 'Qualified leads routed to inbox and assigned to reps.',
        active: ['routing','inbox'],
        edges: [['playbooks','routing'], ['routing','inbox']]
      },
      {
        title: 'Book meetings',
        desc: 'Meetings scheduled; confirmations sent via notifications.',
        active: ['meetings','notify'],
        edges: [['inbox','meetings'], ['meetings','notify']]
      },
      {
        title: 'CRM sync + integrations',
        desc: 'Conversation and lead context synced to CRM and other tools.',
        active: ['crm','integrations'],
        edges: [['inbox','crm'], ['crm','integrations']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks response time, conversion, and playbook performance.',
        active: ['analytics'],
        edges: [['inbox','analytics']]
      }
    ]
  },

  crisp: {
    title: 'Crisp',
    steps: [
      {
        title: 'Chat via widget',
        desc: 'Customer chats via widget; messages stream to inbox.',
        active: ['widget','chat','inbox'],
        edges: [['client','widget'], ['widget','chat'], ['chat','inbox']]
      },
      {
        title: 'Routing + bots',
        desc: 'Routing assigns conversations; bots and KB help deflect tickets.',
        active: ['routing','bots','kb'],
        edges: [['inbox','routing'], ['kb','bots']]
      },
      {
        title: 'CRM context',
        desc: 'CRM links visitors to profiles and conversation history.',
        active: ['crm'],
        edges: [['inbox','crm']]
      },
      {
        title: 'Integrations + notifications',
        desc: 'Integrations sync data; notifications alert teams on priority messages.',
        active: ['integrations','notify'],
        edges: [['crm','integrations'], ['inbox','notify']]
      },
      {
        title: 'Moderation + analytics',
        desc: 'Moderation enforces policies; analytics tracks support performance.',
        active: ['moderation','analytics'],
        edges: [['inbox','moderation'], ['inbox','analytics']]
      }
    ]
  },

  'help-scout': {
    title: 'Help Scout',
    steps: [
      {
        title: 'Ingest mailbox',
        desc: 'Mailboxes ingested into helpdesk inbox and converted to conversations.',
        active: ['mailboxes','ingest','inbox'],
        edges: [['mailboxes','ingest'], ['ingest','inbox']]
      },
      {
        title: 'Assign + notify',
        desc: 'Threads assigned to agents; notifications and SLAs keep queues moving.',
        active: ['assign','notify'],
        edges: [['inbox','assign'], ['assign','notify']]
      },
      {
        title: 'KB + tickets',
        desc: 'Knowledge base articles support deflection; tickets track issues.',
        active: ['kb','tickets'],
        edges: [['inbox','kb'], ['kb','tickets']]
      },
      {
        title: 'Automation + integrations',
        desc: 'Automation tags/routes; integrations sync with CRM and engineering tools.',
        active: ['automation','integrations'],
        edges: [['automation','inbox'], ['inbox','integrations']]
      },
      {
        title: 'Reports + analytics',
        desc: 'Reports measure response time, backlog, and CSAT.',
        active: ['reports','analytics'],
        edges: [['inbox','reports'], ['reports','analytics']]
      }
    ]
  },

  zendesk: {
    title: 'Zendesk',
    steps: [
      {
        title: 'Ingest multi-channel tickets',
        desc: 'Channels ingested and normalized into tickets.',
        active: ['channels','ingest','tickets'],
        edges: [['channels','ingest'], ['ingest','tickets']]
      },
      {
        title: 'Route + assign',
        desc: 'Routing assigns tickets; notifications alert owners and escalate.',
        active: ['routing','assign','notify'],
        edges: [['tickets','routing'], ['routing','assign'], ['assign','notify']]
      },
      {
        title: 'Macros + automation',
        desc: 'Macros accelerate replies; automation applies triggers and SLAs.',
        active: ['macros','automation'],
        edges: [['macros','tickets'], ['automation','tickets']]
      },
      {
        title: 'KB + integrations',
        desc: 'KB articles support deflection; integrations sync to apps and systems.',
        active: ['kb','integrations','apps'],
        edges: [['tickets','kb'], ['tickets','integrations'], ['apps','tickets']]
      },
      {
        title: 'Analytics + audit',
        desc: 'Analytics tracks support performance; audit logs changes for compliance.',
        active: ['analytics','audit'],
        edges: [['tickets','analytics'], ['tickets','audit']]
      }
    ]
  },

  gorgias: {
    title: 'Gorgias',
    steps: [
      {
        title: 'Ingest ecommerce channels',
        desc: 'Email/chat/social channels ingested into tickets for support.',
        active: ['channels','ingest','tickets'],
        edges: [['channels','ingest'], ['ingest','tickets']]
      },
      {
        title: 'Pull order context from Shopify',
        desc: 'Shopify integration pulls order/customer context into ticket view.',
        active: ['shopify','orders','tickets'],
        edges: [['tickets','shopify'], ['shopify','orders'], ['orders','tickets']]
      },
      {
        title: 'Macros + automation + routing',
        desc: 'Macros and automation power quick replies and routing rules.',
        active: ['macros','automation','routing'],
        edges: [['macros','tickets'], ['automation','tickets'], ['tickets','routing']]
      },
      {
        title: 'Integrations + notifications',
        desc: 'Integrations sync with other tools; notifications alert on priority tickets.',
        active: ['integrations','notify'],
        edges: [['tickets','integrations'], ['tickets','notify']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks resolution time, CSAT, and revenue impact.',
        active: ['analytics'],
        edges: [['tickets','analytics']]
      }
    ]
  },

  linear: {
    title: 'Linear',
    steps: [
      {
        title: 'Sign in + load org',
        desc: 'User signs in and loads org, teams, and project context.',
        active: ['client','auth','org','projects'],
        edges: [['client','auth'], ['auth','org'], ['org','projects']]
      },
      {
        title: 'Create issue + triage',
        desc: 'Issue created; triage assigns team, priority, and labels.',
        active: ['issues','triage'],
        edges: [['client','issues'], ['issues','triage']]
      },
      {
        title: 'Workflow + notifications',
        desc: 'Workflow updates status; notifications alert assignees and watchers.',
        active: ['workflow','notifications'],
        edges: [['triage','workflow'], ['workflow','notifications']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across issues/projects to jump quickly.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','issues']]
      },
      {
        title: 'Sync + integrations',
        desc: 'Sync keeps clients consistent; integrations/webhooks update external tools.',
        active: ['sync','integrations','webhooks'],
        edges: [['workflow','sync'], ['sync','integrations'], ['sync','webhooks']]
      },
      {
        title: 'Analytics + audit',
        desc: 'Analytics track cycle time; audit logs changes for compliance.',
        active: ['analytics','audit'],
        edges: [['issues','analytics'], ['issues','audit']]
      }
    ]
  },

  height: {
    title: 'Height',
    steps: [
      {
        title: 'Open workspace + project',
        desc: 'User loads workspace and selects a project view.',
        active: ['client','auth','workspace','projects'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','projects']]
      },
      {
        title: 'Create task + workflow',
        desc: 'Task created; workflow state and ownership assigned.',
        active: ['tasks','workflow'],
        edges: [['client','tasks'], ['tasks','workflow']]
      },
      {
        title: 'Automation + notifications',
        desc: 'Automation triggers rules and notifications for deadlines and changes.',
        active: ['automation','notify'],
        edges: [['workflow','automation'], ['automation','notify']]
      },
      {
        title: 'Docs + chat collaboration',
        desc: 'Docs and chat attach context and sync for team collaboration.',
        active: ['docs','chat'],
        edges: [['tasks','docs'], ['docs','chat']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across tasks/docs for quick navigation.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','tasks']]
      },
      {
        title: 'Integrations + analytics',
        desc: 'Integrations sync with external tools; analytics track delivery metrics.',
        active: ['integrations','analytics'],
        edges: [['tasks','integrations'], ['tasks','analytics']]
      }
    ]
  },

  basecamp: {
    title: 'Basecamp',
    steps: [
      {
        title: 'Sign in + open project',
        desc: 'User signs in and loads project home with tools enabled.',
        active: ['client','auth','projects'],
        edges: [['client','auth'], ['auth','projects']]
      },
      {
        title: 'Messages + to-dos',
        desc: 'Team posts messages and creates to-dos; notifications keep people updated.',
        active: ['messages','todos','notify'],
        edges: [['projects','messages'], ['projects','todos'], ['messages','notify']]
      },
      {
        title: 'Docs + files',
        desc: 'Docs written and files uploaded/served from storage/CDN.',
        active: ['docs','files'],
        edges: [['projects','docs'], ['docs','files']]
      },
      {
        title: 'Schedule + chat',
        desc: 'Schedules coordinate work; chat keeps discussions flowing.',
        active: ['schedule','chat'],
        edges: [['projects','schedule'], ['projects','chat']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across messages, docs, and to-dos.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','projects']]
      },
      {
        title: 'Integrations + analytics',
        desc: 'Integrations sync external context; analytics summarize engagement.',
        active: ['integrations','analytics'],
        edges: [['projects','integrations'], ['projects','analytics']]
      }
    ]
  },

  wrike: {
    title: 'Wrike',
    steps: [
      {
        title: 'Open workspace',
        desc: 'User authenticates and loads workspace with projects and tasks.',
        active: ['client','auth','workspace','projects'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','projects']]
      },
      {
        title: 'Manage tasks + workflow',
        desc: 'Tasks created and moved through workflow; automation triggers rules.',
        active: ['tasks','workflow','automation'],
        edges: [['projects','tasks'], ['tasks','workflow'], ['workflow','automation']]
      },
      {
        title: 'Gantt planning',
        desc: 'Gantt view computes dependencies and schedules.',
        active: ['gantt'],
        edges: [['tasks','gantt']]
      },
      {
        title: 'Files + approvals',
        desc: 'Files attached and reviewed; approvals update task status.',
        active: ['files','approval'],
        edges: [['tasks','files'], ['files','approval'], ['approval','tasks']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across tasks and docs.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','tasks']]
      },
      {
        title: 'Integrations + reports',
        desc: 'Integrations connect tools; reports and analytics track progress.',
        active: ['integrations','reports','analytics'],
        edges: [['tasks','integrations'], ['tasks','reports'], ['reports','analytics']]
      }
    ]
  },

  teamwork: {
    title: 'Teamwork',
    steps: [
      {
        title: 'Create project + tasks',
        desc: 'Projects created; tasks and milestones planned.',
        active: ['projects','tasks','milestones'],
        edges: [['client','projects'], ['projects','tasks'], ['tasks','milestones']]
      },
      {
        title: 'Time tracking + billing',
        desc: 'Time logs captured and used for billing/invoicing workflows.',
        active: ['time','billing'],
        edges: [['client','time'], ['time','billing']]
      },
      {
        title: 'Messages + files',
        desc: 'Team posts messages and shares files; notifications keep stakeholders updated.',
        active: ['messages','files','notify'],
        edges: [['projects','messages'], ['projects','files'], ['messages','notify']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across tasks/messages/files.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','projects']]
      },
      {
        title: 'Integrations + reporting',
        desc: 'Integrations sync external tools; reports/analytics track delivery.',
        active: ['integrations','reports','analytics'],
        edges: [['projects','integrations'], ['projects','reports'], ['reports','analytics']]
      }
    ]
  },

  proofhub: {
    title: 'ProofHub',
    steps: [
      {
        title: 'Project + tasks',
        desc: 'Create project and tasks; workflow states manage progress.',
        active: ['projects','tasks','workflow'],
        edges: [['client','projects'], ['projects','tasks'], ['tasks','workflow']]
      },
      {
        title: 'Files + proofing',
        desc: 'Files uploaded for review; proofing adds markup/comments.',
        active: ['files','proofing'],
        edges: [['tasks','files'], ['files','proofing']]
      },
      {
        title: 'Approvals',
        desc: 'Approvals capture stakeholder sign-off and update workflow status.',
        active: ['approvals','notify'],
        edges: [['proofing','approvals'], ['approvals','notify']]
      },
      {
        title: 'Chat collaboration',
        desc: 'Team chat provides realtime coordination around tasks and reviews.',
        active: ['chat'],
        edges: [['client','chat']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index to find tasks, files, and messages.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','tasks']]
      },
      {
        title: 'Reports + analytics',
        desc: 'Reports and analytics track throughput and review cycle times.',
        active: ['reports','analytics'],
        edges: [['tasks','reports'], ['reports','analytics']]
      }
    ]
  },

  smartsheet: {
    title: 'Smartsheet',
    steps: [
      {
        title: 'Open sheet + rows',
        desc: 'User opens workspace and sheet; rows loaded with permissions enforced.',
        active: ['client','auth','workspace','sheets','rows','permissions'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','sheets'], ['sheets','rows'], ['permissions','sheets']]
      },
      {
        title: 'Formulas + automation',
        desc: 'Edits trigger formula evaluation and automation workflows.',
        active: ['formulas','automation'],
        edges: [['rows','formulas'], ['formulas','automation']]
      },
      {
        title: 'Realtime collaboration',
        desc: 'Realtime updates sync to collaborators.',
        active: ['realtime'],
        edges: [['realtime','client']]
      },
      {
        title: 'Integrations',
        desc: 'Integrations sync sheet changes to external systems.',
        active: ['integrations'],
        edges: [['automation','integrations']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across sheets and attachments.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','sheets']]
      },
      {
        title: 'Export + audit + analytics',
        desc: 'Exports produce files; audit tracks changes; analytics reports usage.',
        active: ['export','audit','analytics'],
        edges: [['sheets','export'], ['sheets','audit'], ['sheets','analytics']]
      }
    ]
  },

  quip: {
    title: 'Quip',
    steps: [
      {
        title: 'Open workspace + doc',
        desc: 'User signs in and opens a doc with embedded spreadsheet.',
        active: ['client','auth','workspace','docs','spreadsheets'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','docs'], ['docs','spreadsheets']]
      },
      {
        title: 'Comments + collaboration',
        desc: 'Comments and realtime collaboration keep teammates aligned.',
        active: ['comments','realtime'],
        edges: [['docs','comments'], ['docs','realtime'], ['realtime','client']]
      },
      {
        title: 'Permissions',
        desc: 'Permissions enforce access and sharing rules.',
        active: ['permissions'],
        edges: [['docs','permissions']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across docs and comments.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','docs']]
      },
      {
        title: 'Export + integrations',
        desc: 'Exports create files; integrations sync with external tools.',
        active: ['export','integrations'],
        edges: [['docs','export'], ['docs','integrations']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics track collaboration and document engagement.',
        active: ['analytics'],
        edges: [['docs','analytics']]
      }
    ]
  },

  notability: {
    title: 'Notability',
    steps: [
      {
        title: 'Create note + ink',
        desc: 'User creates a note and writes with ink tools; content stored in library.',
        active: ['client','library','notes','ink'],
        edges: [['client','library'], ['library','notes'], ['notes','ink']]
      },
      {
        title: 'Record audio',
        desc: 'Audio recorded alongside notes for replay and study.',
        active: ['audio'],
        edges: [['notes','audio']]
      },
      {
        title: 'OCR + indexing',
        desc: 'OCR extracts text; index enables search across handwritten content.',
        active: ['ocr','index'],
        edges: [['notes','ocr'], ['ocr','index']]
      },
      {
        title: 'Search',
        desc: 'Search hits index and returns matching notes/pages.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','notes']]
      },
      {
        title: 'Sync + cloud',
        desc: 'Sync replicates notes and audio to cloud and other devices.',
        active: ['sync','cloud'],
        edges: [['notes','sync'], ['sync','cloud']]
      },
      {
        title: 'Share + export + backups',
        desc: 'Share links and exports generate files; backups protect retention.',
        active: ['share','export','backups'],
        edges: [['notes','share'], ['notes','export'], ['notes','backups']]
      }
    ]
  },

  goodnotes: {
    title: 'GoodNotes',
    steps: [
      {
        title: 'Create notebook + template',
        desc: 'User creates notebook and selects templates/paper styles.',
        active: ['client','library','notebooks','templates'],
        edges: [['client','library'], ['library','notebooks'], ['notebooks','templates']]
      },
      {
        title: 'Write with ink',
        desc: 'Ink strokes persisted to notebook pages.',
        active: ['ink','notebooks'],
        edges: [['notebooks','ink']]
      },
      {
        title: 'OCR + indexing',
        desc: 'OCR extracts text; index enables fast search.',
        active: ['ocr','index'],
        edges: [['notebooks','ocr'], ['ocr','index']]
      },
      {
        title: 'Search',
        desc: 'Search uses index across notebooks and pages.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','notebooks']]
      },
      {
        title: 'Sync + cloud',
        desc: 'Sync replicates notebooks to cloud and other devices.',
        active: ['sync','cloud'],
        edges: [['notebooks','sync'], ['sync','cloud']]
      },
      {
        title: 'Export + share + backup',
        desc: 'Exports generate PDFs; sharing sends links/files; backups protect retention.',
        active: ['export','share','backup'],
        edges: [['notebooks','export'], ['notebooks','share'], ['notebooks','backup']]
      }
    ]
  },

  xmind: {
    title: 'XMind',
    steps: [
      {
        title: 'Open map library',
        desc: 'User opens the library and selects a mind map.',
        active: ['client','library','maps'],
        edges: [['client','library'], ['library','maps']]
      },
      {
        title: 'Edit nodes + themes',
        desc: 'User edits nodes and applies themes/styles to structure ideas.',
        active: ['nodes','themes','maps'],
        edges: [['maps','nodes'], ['nodes','themes']]
      },
      {
        title: 'Search + index',
        desc: 'Index enables searching across maps and content.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','maps']]
      },
      {
        title: 'Sync to cloud',
        desc: 'Sync keeps maps consistent across devices via cloud.',
        active: ['sync','cloud'],
        edges: [['maps','sync'], ['sync','cloud']]
      },
      {
        title: 'Share + export',
        desc: 'Share links and export to images/PDF for collaboration.',
        active: ['share','export'],
        edges: [['maps','share'], ['maps','export']]
      },
      {
        title: 'Plugins + analytics',
        desc: 'Add-ons extend workflows; analytics monitor usage and reliability.',
        active: ['plugins','analytics'],
        edges: [['client','plugins'], ['maps','analytics']]
      }
    ]
  },

  mindnode: {
    title: 'MindNode',
    steps: [
      {
        title: 'Open map',
        desc: 'User opens a mind map from library and loads nodes.',
        active: ['client','library','maps','nodes'],
        edges: [['client','library'], ['library','maps'], ['maps','nodes']]
      },
      {
        title: 'Styles + templates',
        desc: 'User applies styles and templates to organize the map.',
        active: ['styles','templates'],
        edges: [['nodes','styles'], ['templates','maps']]
      },
      {
        title: 'Search + index',
        desc: 'Index enables quick search across map content.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','maps']]
      },
      {
        title: 'Sync',
        desc: 'Sync replicates maps to cloud for multi-device access.',
        active: ['sync','cloud'],
        edges: [['maps','sync'], ['sync','cloud']]
      },
      {
        title: 'Export + share',
        desc: 'Exports produce files; sharing sends links to collaborators.',
        active: ['export','share'],
        edges: [['maps','export'], ['maps','share']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics track feature usage and performance.',
        active: ['analytics'],
        edges: [['maps','analytics']]
      }
    ]
  },

  miro: {
    title: 'Miro',
    steps: [
      {
        title: 'Sign in + open board',
        desc: 'User signs in, selects org/team, and opens a board.',
        active: ['client','auth','org','boards'],
        edges: [['client','auth'], ['auth','org'], ['org','boards']]
      },
      {
        title: 'Edit objects + realtime',
        desc: 'Objects created/edited; realtime layer syncs cursors and updates.',
        active: ['objects','realtime'],
        edges: [['boards','objects'], ['objects','realtime'], ['realtime','client']]
      },
      {
        title: 'Comments + permissions',
        desc: 'Comments added; permissions enforce access and sharing rules.',
        active: ['comments','permissions'],
        edges: [['boards','comments'], ['permissions','boards']]
      },
      {
        title: 'Templates',
        desc: 'Templates bootstrap common workflows (workshops, sprints, diagrams).',
        active: ['templates'],
        edges: [['templates','boards']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across boards and objects.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','boards']]
      },
      {
        title: 'Integrations + export + audit',
        desc: 'Integrations connect tools; export produces files; audit tracks changes.',
        active: ['integrations','export','audit','analytics'],
        edges: [['boards','integrations'], ['boards','export'], ['boards','audit'], ['boards','analytics']]
      }
    ]
  },

  figjam: {
    title: 'FigJam',
    steps: [
      {
        title: 'Sign in + open file',
        desc: 'User signs in, selects team, and opens a FigJam board/file.',
        active: ['client','auth','teams','boards'],
        edges: [['client','auth'], ['auth','teams'], ['teams','boards']]
      },
      {
        title: 'Realtime collaboration',
        desc: 'Realtime engine syncs edits, cursors, and presence.',
        active: ['realtime'],
        edges: [['boards','realtime'], ['realtime','client']]
      },
      {
        title: 'Comments + permissions',
        desc: 'Comments for async feedback; permissions enforce access.',
        active: ['comments','permissions'],
        edges: [['boards','comments'], ['permissions','boards']]
      },
      {
        title: 'Templates + integrations',
        desc: 'Templates speed setup; integrations connect to external tools.',
        active: ['templates','integrations'],
        edges: [['templates','boards'], ['boards','integrations']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across files and objects.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','boards']]
      },
      {
        title: 'Export + analytics',
        desc: 'Exports produce files; analytics track collaboration engagement.',
        active: ['export','analytics'],
        edges: [['boards','export'], ['boards','analytics']]
      }
    ]
  },

  whimsical: {
    title: 'Whimsical',
    steps: [
      {
        title: 'Open workspace + board',
        desc: 'User signs in and opens boards/diagrams/docs in a workspace.',
        active: ['client','auth','workspace','boards'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','boards']]
      },
      {
        title: 'Create diagrams + docs',
        desc: 'Diagrams and docs created/edited with realtime collaboration.',
        active: ['diagrams','docs','realtime'],
        edges: [['boards','diagrams'], ['boards','docs'], ['boards','realtime'], ['realtime','client']]
      },
      {
        title: 'Comments + permissions',
        desc: 'Comments provide feedback; permissions enforce sharing rules.',
        active: ['comments','permissions'],
        edges: [['boards','comments'], ['permissions','boards']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across boards/diagrams/docs.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','boards']]
      },
      {
        title: 'Templates + export',
        desc: 'Templates speed setup; exports create files for sharing.',
        active: ['templates','export'],
        edges: [['templates','boards'], ['boards','export']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics track usage and collaboration patterns.',
        active: ['analytics'],
        edges: [['boards','analytics']]
      }
    ]
  },

  lucidchart: {
    title: 'Lucidchart',
    steps: [
      {
        title: 'Open doc',
        desc: 'User signs in and opens a diagram doc in a workspace.',
        active: ['client','auth','workspace','docs'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','docs']]
      },
      {
        title: 'Edit shapes + render',
        desc: 'Shapes edited; renderer produces layout/visual output and updates doc.',
        active: ['shapes','render','docs'],
        edges: [['docs','shapes'], ['shapes','render'], ['render','docs']]
      },
      {
        title: 'Realtime + comments',
        desc: 'Realtime collaboration and comments support teamwork.',
        active: ['realtime','comments'],
        edges: [['docs','realtime'], ['docs','comments'], ['realtime','client']]
      },
      {
        title: 'Permissions',
        desc: 'Permissions enforce access and sharing controls.',
        active: ['permissions'],
        edges: [['permissions','docs']]
      },
      {
        title: 'Search + index',
        desc: 'Search uses index across docs and shape metadata.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','docs']]
      },
      {
        title: 'Integrations + export + audit',
        desc: 'Integrations connect tools; exports create files; audit tracks changes.',
        active: ['integrations','export','audit','analytics'],
        edges: [['docs','integrations'], ['docs','export'], ['docs','audit'], ['docs','analytics']]
      }
    ]
  },

  'draw-io': {
    title: 'Draw.io',
    steps: [
      {
        title: 'Open diagram file',
        desc: 'User opens a diagram file from local or cloud storage.',
        active: ['client','files','storage'],
        edges: [['client','files'], ['files','storage']]
      },
      {
        title: 'Edit shapes + render',
        desc: 'Editor updates shapes and renderer produces diagram output.',
        active: ['editor','shapes','render'],
        edges: [['files','editor'], ['editor','shapes'], ['shapes','render']]
      },
      {
        title: 'Search + index',
        desc: 'Index enables search across diagram names and metadata.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','files']]
      },
      {
        title: 'Sync to cloud',
        desc: 'Files stored and synced via cloud provider.',
        active: ['storage','cloud'],
        edges: [['storage','cloud']]
      },
      {
        title: 'Share + export',
        desc: 'Share links and export to image/PDF for distribution.',
        active: ['share','export'],
        edges: [['files','share'], ['files','export']]
      },
      {
        title: 'Integrations + analytics',
        desc: 'Integrations connect to external systems; analytics monitor usage.',
        active: ['integrations','analytics'],
        edges: [['files','integrations'], ['files','analytics']]
      }
    ]
  },

  toggl: {
    title: 'Toggl',
    steps: [
      {
        title: 'Open workspace + project',
        desc: 'User selects workspace and project for tracking time.',
        active: ['client','auth','workspace','projects'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','projects']]
      },
      {
        title: 'Start timer + create entry',
        desc: 'Timer starts and creates time entries that sync to backend.',
        active: ['timer','entries','sync'],
        edges: [['client','timer'], ['timer','entries'], ['entries','sync']]
      },
      {
        title: 'Reports + billing',
        desc: 'Reports summarize time; billing links rates and invoicing context.',
        active: ['reports','billing'],
        edges: [['entries','reports'], ['reports','billing']]
      },
      {
        title: 'Integrations',
        desc: 'Integrations sync time entries to PM and invoicing tools.',
        active: ['integrations'],
        edges: [['sync','integrations']]
      },
      {
        title: 'Export',
        desc: 'Exports create CSV/PDF for payroll or invoicing workflows.',
        active: ['export'],
        edges: [['entries','export']]
      },
      {
        title: 'Analytics + audit',
        desc: 'Analytics monitor adoption; audit tracks entry changes.',
        active: ['analytics','audit'],
        edges: [['entries','analytics'], ['entries','audit']]
      }
    ]
  },

  clockify: {
    title: 'Clockify',
    steps: [
      {
        title: 'Track time',
        desc: 'Timer creates entries for projects in a workspace.',
        active: ['client','auth','timer','entries'],
        edges: [['client','auth'], ['client','timer'], ['timer','entries']]
      },
      {
        title: 'Approval workflow',
        desc: 'Entries reviewed/approved before reporting and billing.',
        active: ['approval','reports'],
        edges: [['entries','approval'], ['approval','reports']]
      },
      {
        title: 'Reports + billing',
        desc: 'Reports summarize time; billing applies rates and budgets.',
        active: ['reports','billing'],
        edges: [['reports','billing']]
      },
      {
        title: 'Sync + integrations',
        desc: 'Sync and integrations push time data to external systems.',
        active: ['sync','integrations'],
        edges: [['entries','sync'], ['sync','integrations']]
      },
      {
        title: 'Export',
        desc: 'Exports create files for payroll, clients, or accounting.',
        active: ['export'],
        edges: [['entries','export']]
      },
      {
        title: 'Analytics + audit',
        desc: 'Analytics track usage; audit logs entry changes.',
        active: ['analytics','audit'],
        edges: [['entries','analytics'], ['entries','audit']]
      }
    ]
  },

  harvest: {
    title: 'Harvest',
    steps: [
      {
        title: 'Track time entries',
        desc: 'Timer creates time entries against projects in a workspace.',
        active: ['client','auth','timer','entries'],
        edges: [['client','auth'], ['client','timer'], ['timer','entries']]
      },
      {
        title: 'Generate invoices',
        desc: 'Entries roll up into invoices and billing totals.',
        active: ['invoices','billing'],
        edges: [['entries','invoices'], ['invoices','billing']]
      },
      {
        title: 'Collect payments',
        desc: 'Payments collected through provider; invoice status updated.',
        active: ['payments'],
        edges: [['billing','payments']]
      },
      {
        title: 'Reports',
        desc: 'Reports summarize utilization and profitability.',
        active: ['reports'],
        edges: [['entries','reports']]
      },
      {
        title: 'Integrations + export',
        desc: 'Integrations sync to accounting; exports create CSV/PDF.',
        active: ['integrations','export'],
        edges: [['projects','integrations'], ['entries','export']]
      },
      {
        title: 'Analytics + audit',
        desc: 'Analytics track trends; audit logs entry and invoice changes.',
        active: ['analytics','audit'],
        edges: [['entries','analytics'], ['entries','audit']]
      }
    ]
  },

  rescuetime: {
    title: 'RescueTime',
    steps: [
      {
        title: 'Track activity on device',
        desc: 'Agent records app/website activity and sends to collector.',
        active: ['client','agent','collector'],
        edges: [['client','agent'], ['agent','collector']]
      },
      {
        title: 'Classify + apply rules',
        desc: 'Events classified into categories and tagged by user rules.',
        active: ['classify','rules','storage'],
        edges: [['collector','storage'], ['storage','classify'], ['classify','rules']]
      },
      {
        title: 'Dashboards + goals',
        desc: 'Dashboards visualize time; goals evaluate productivity targets.',
        active: ['dashboards','goals'],
        edges: [['rules','dashboards'], ['dashboards','goals']]
      },
      {
        title: 'Alerts',
        desc: 'Alerts fire when distraction thresholds or goals are breached.',
        active: ['alerts'],
        edges: [['goals','alerts']]
      },
      {
        title: 'Reports + integrations',
        desc: 'Reports exported or shared via API and integrations.',
        active: ['reports','api','integrations'],
        edges: [['storage','reports'], ['reports','api'], ['api','integrations']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics aggregates trends and supports product insights.',
        active: ['analytics'],
        edges: [['reports','analytics']]
      }
    ]
  },

  freedom: {
    title: 'Freedom',
    steps: [
      {
        title: 'Sign in + device setup',
        desc: 'User signs in and registers devices to receive block sessions.',
        active: ['client','auth','devices'],
        edges: [['client','auth'], ['auth','devices']]
      },
      {
        title: 'Create profiles + blocklists',
        desc: 'Profiles define blocklists and app/site categories to block.',
        active: ['profiles','blocklists','policy'],
        edges: [['devices','profiles'], ['profiles','blocklists'], ['blocklists','policy']]
      },
      {
        title: 'Schedule sessions',
        desc: 'Scheduler creates blocking sessions and pushes policy to enforcers.',
        active: ['scheduler','sync'],
        edges: [['policy','scheduler'], ['scheduler','sync']]
      },
      {
        title: 'Enforce via DNS/VPN',
        desc: 'Enforcer blocks sites/apps using DNS/VPN techniques.',
        active: ['enforcer','dns','vpn'],
        edges: [['sync','enforcer'], ['enforcer','dns'], ['enforcer','vpn']]
      },
      {
        title: 'Analytics + support',
        desc: 'Analytics monitor sessions; support resolves device/policy issues.',
        active: ['analytics','support'],
        edges: [['enforcer','analytics'], ['client','support']]
      }
    ]
  },

  'cold-turkey': {
    title: 'Cold Turkey',
    steps: [
      {
        title: 'Configure rules + blocklists',
        desc: 'User defines blocklists and schedules; rules stored locally.',
        active: ['client','rules','blocklists'],
        edges: [['client','rules'], ['rules','blocklists']]
      },
      {
        title: 'Scheduler triggers enforcement',
        desc: 'Scheduler activates enforcer at configured times.',
        active: ['scheduler','enforcer'],
        edges: [['blocklists','scheduler'], ['scheduler','enforcer']]
      },
      {
        title: 'Block using hosts/firewall',
        desc: 'Enforcer applies blocks through hosts file and firewall rules.',
        active: ['hosts','firewall'],
        edges: [['enforcer','hosts'], ['enforcer','firewall']]
      },
      {
        title: 'Reports + analytics',
        desc: 'Reports summarize blocks; analytics tracks usage and outcomes.',
        active: ['reports','analytics'],
        edges: [['enforcer','reports'], ['reports','analytics']]
      },
      {
        title: 'Backups + export',
        desc: 'Backups protect configuration; export shares settings across devices.',
        active: ['backups','export'],
        edges: [['rules','backups'], ['rules','export']]
      }
    ]
  },

  sunsama: {
    title: 'Sunsama',
    steps: [
      {
        title: 'Connect calendar + tasks',
        desc: 'User connects calendar and task sources; planner loads the day.',
        active: ['client','auth','calendar','tasks','planner'],
        edges: [['client','auth'], ['auth','calendar'], ['auth','tasks'], ['calendar','planner']]
      },
      {
        title: 'Plan day + prioritize',
        desc: 'Planner prioritizes tasks and groups work for focused execution.',
        active: ['planner','tasks'],
        edges: [['tasks','planner']]
      },
      {
        title: 'Timebox into calendar',
        desc: 'Timeboxing creates calendar blocks and sync pushes updates.',
        active: ['timebox','sync'],
        edges: [['planner','timebox'], ['timebox','sync'], ['sync','calendar']]
      },
      {
        title: 'Integrations + notifications',
        desc: 'Integrations update external tools; notifications remind about blocks.',
        active: ['integrations','notifications'],
        edges: [['tasks','integrations'], ['planner','notifications']]
      },
      {
        title: 'Reports + analytics',
        desc: 'Reports summarize planned vs done; analytics tracks habits.',
        active: ['reports','analytics'],
        edges: [['planner','analytics'], ['analytics','reports']]
      }
    ]
  },

  motion: {
    title: 'Motion',
    steps: [
      {
        title: 'Connect calendar + tasks',
        desc: 'User connects calendar and task list; Motion ingests availability.',
        active: ['client','auth','calendar','tasks'],
        edges: [['client','auth'], ['auth','calendar'], ['auth','tasks']]
      },
      {
        title: 'Constraints + optimization',
        desc: 'Constraints captured; optimizer computes schedule proposal.',
        active: ['constraints','optimizer'],
        edges: [['tasks','constraints'], ['constraints','optimizer']]
      },
      {
        title: 'Schedule + sync',
        desc: 'Schedule written; sync pushes events to calendar and updates tasks.',
        active: ['schedule','sync'],
        edges: [['optimizer','schedule'], ['schedule','sync'], ['sync','calendar']]
      },
      {
        title: 'Notifications',
        desc: 'Notifications alert for upcoming tasks and schedule changes.',
        active: ['notifications'],
        edges: [['sync','notifications']]
      },
      {
        title: 'Integrations + analytics',
        desc: 'Integrations sync with PM tools; analytics measures adherence.',
        active: ['integrations','analytics','reports'],
        edges: [['schedule','integrations'], ['schedule','analytics'], ['analytics','reports']]
      }
    ]
  },

  'reclaim-ai': {
    title: 'Reclaim AI',
    steps: [
      {
        title: 'Connect calendar + tasks',
        desc: 'Calendar and tasks connected; habits and preferences loaded.',
        active: ['client','auth','calendar','tasks','habits'],
        edges: [['client','auth'], ['auth','calendar'], ['auth','tasks'], ['auth','habits']]
      },
      {
        title: 'Optimize schedule',
        desc: 'Optimizer balances tasks, habits, and meetings into schedule.',
        active: ['optimizer','schedule'],
        edges: [['tasks','optimizer'], ['habits','optimizer'], ['optimizer','schedule']]
      },
      {
        title: 'Sync to calendar + notify',
        desc: 'Sync writes events to calendar and notifies on changes.',
        active: ['sync','notifications'],
        edges: [['schedule','sync'], ['sync','calendar'], ['sync','notifications']]
      },
      {
        title: 'Integrations',
        desc: 'Integrations keep tasks and schedules in sync with external tools.',
        active: ['integrations'],
        edges: [['sync','integrations']]
      },
      {
        title: 'Analytics + reports',
        desc: 'Analytics track schedule health; reports summarize utilization.',
        active: ['analytics','reports'],
        edges: [['schedule','analytics'], ['analytics','reports']]
      }
    ]
  },

  fantastical: {
    title: 'Fantastical',
    steps: [
      {
        title: 'Connect calendars (CalDAV)',
        desc: 'User connects CalDAV sources; calendars synced locally.',
        active: ['client','auth','caldav','calendar'],
        edges: [['client','auth'], ['auth','caldav'], ['caldav','calendar']]
      },
      {
        title: 'Natural language entry',
        desc: 'NLP parses text into event/task details and creates events.',
        active: ['nlp','events','tasks'],
        edges: [['client','nlp'], ['nlp','events'], ['nlp','tasks']]
      },
      {
        title: 'Sync + notifications',
        desc: 'Sync pushes updates to calendar sources; notifications remind.',
        active: ['sync','notifications'],
        edges: [['events','sync'], ['sync','notifications'], ['sync','caldav']]
      },
      {
        title: 'Search + index',
        desc: 'Index powers search across events and calendars.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','events']]
      },
      {
        title: 'Integrations + analytics',
        desc: 'Integrations connect services; analytics track usage patterns.',
        active: ['integrations','analytics'],
        edges: [['events','integrations'], ['events','analytics']]
      }
    ]
  },

  outlook: {
    title: 'Outlook',
    steps: [
      {
        title: 'Auth + sync Exchange',
        desc: 'User signs in; Exchange sync loads mailbox and calendar state.',
        active: ['client','auth','exchange','mailbox','calendar'],
        edges: [['client','auth'], ['auth','exchange'], ['exchange','mailbox'], ['exchange','calendar']]
      },
      {
        title: 'Spam + policy enforcement',
        desc: 'Spam filtering and policy controls apply to inbound mail.',
        active: ['antispam','policy'],
        edges: [['mailbox','antispam'], ['antispam','policy']]
      },
      {
        title: 'Search + index',
        desc: 'Index powers fast search across mail, contacts, and calendar items.',
        active: ['search','index'],
        edges: [['client','search'], ['search','index'], ['index','mailbox']]
      },
      {
        title: 'Send mail + notifications',
        desc: 'Send mail via Exchange; notifications alert for replies and calendar events.',
        active: ['send','notifications'],
        edges: [['client','send'], ['send','exchange'], ['exchange','notifications']]
      },
      {
        title: 'Contacts + sync + analytics',
        desc: 'Contacts sync; analytics track usage and reliability.',
        active: ['contacts','sync','analytics'],
        edges: [['exchange','contacts'], ['mailbox','sync'], ['mailbox','analytics']]
      }
    ]
  },

  'zoho-books': {
    title: 'Zoho Books',
    steps: [
      {
        title: 'Set up org + customers',
        desc: 'Org set up; customers added for invoicing.',
        active: ['client','auth','org','customers'],
        edges: [['client','auth'], ['auth','org'], ['org','customers']]
      },
      {
        title: 'Create invoice + collect payment',
        desc: 'Invoices created and sent; payments collected via provider.',
        active: ['invoices','payments'],
        edges: [['customers','invoices'], ['invoices','payments']]
      },
      {
        title: 'Log expenses + tax',
        desc: 'Expenses categorized; tax rules applied for compliance.',
        active: ['expenses','tax'],
        edges: [['client','expenses'], ['expenses','tax']]
      },
      {
        title: 'Bank feeds + reconciliation',
        desc: 'Banking feeds imported; reconciliation matches transactions.',
        active: ['banking','reconcile'],
        edges: [['banking','reconcile']]
      },
      {
        title: 'Reports + analytics + audit',
        desc: 'Reports summarize finances; analytics/audit support compliance.',
        active: ['reports','analytics','audit'],
        edges: [['reconcile','reports'], ['reports','analytics'], ['org','audit']]
      },
      {
        title: 'Integrations',
        desc: 'Integrations sync accounting with CRM, e-commerce, and payroll tools.',
        active: ['integrations'],
        edges: [['org','integrations']]
      }
    ]
  },

  quickbooks: {
    title: 'QuickBooks',
    steps: [
      {
        title: 'Set up company',
        desc: 'Company profile set up; chart of accounts and permissions configured.',
        active: ['client','auth','company'],
        edges: [['client','auth'], ['auth','company']]
      },
      {
        title: 'Invoices + payments',
        desc: 'Invoices sent to customers and paid via payment provider.',
        active: ['customers','invoices','payments'],
        edges: [['company','customers'], ['customers','invoices'], ['invoices','payments']]
      },
      {
        title: 'Expenses + bank feeds',
        desc: 'Expenses recorded and imported from banking feeds.',
        active: ['expenses','banking'],
        edges: [['client','expenses'], ['banking','reconcile']]
      },
      {
        title: 'Reconciliation + tax',
        desc: 'Reconcile transactions; tax calculations and filing workflows.',
        active: ['reconcile','tax'],
        edges: [['banking','reconcile'], ['reconcile','tax']]
      },
      {
        title: 'Payroll',
        desc: 'Payroll runs and postings update books and tax withholdings.',
        active: ['payroll','tax'],
        edges: [['company','payroll'], ['payroll','tax']]
      },
      {
        title: 'Reports + audit + analytics',
        desc: 'Reports summarize finances; audit logs changes; analytics track trends.',
        active: ['reports','audit','analytics'],
        edges: [['reconcile','reports'], ['company','audit'], ['reports','analytics']]
      },
      {
        title: 'Integrations',
        desc: 'Integrations connect banks, payroll, e-commerce, and tax services.',
        active: ['integrations'],
        edges: [['company','integrations']]
      }
    ]
  },

  xero: {
    title: 'Xero',
    steps: [
      {
        title: 'Set up org + ledger',
        desc: 'User sets up org and chart of accounts; ledger becomes source of truth.',
        active: ['client','auth','org','ledger'],
        edges: [['client','auth'], ['auth','org'], ['org','ledger']]
      },
      {
        title: 'Invoice + collect payments',
        desc: 'Invoices created and sent; payments collected through provider.',
        active: ['invoices','payments'],
        edges: [['ledger','invoices'], ['invoices','payments']]
      },
      {
        title: 'Expenses + tax',
        desc: 'Expenses logged; tax rules applied for compliance and reporting.',
        active: ['expenses','tax'],
        edges: [['client','expenses'], ['expenses','tax']]
      },
      {
        title: 'Bank feeds + reconciliation',
        desc: 'Bank feeds imported and reconciled against ledger transactions.',
        active: ['bankfeeds','reconcile'],
        edges: [['bankfeeds','reconcile'], ['reconcile','ledger']]
      },
      {
        title: 'Reports + analytics + audit',
        desc: 'Reports summarize finances; analytics shows trends; audit logs changes.',
        active: ['reports','analytics','audit'],
        edges: [['ledger','reports'], ['reports','analytics'], ['ledger','audit']]
      },
      {
        title: 'Integrations',
        desc: 'Integrations sync accounting data with payroll, CRM, and e-commerce systems.',
        active: ['integrations'],
        edges: [['org','integrations']]
      }
    ]
  },

  freshbooks: {
    title: 'FreshBooks',
    steps: [
      {
        title: 'Set up clients + projects',
        desc: 'Create clients and projects for time and invoicing workflows.',
        active: ['client','auth','org','clients','projects'],
        edges: [['client','auth'], ['auth','org'], ['org','clients'], ['clients','projects']]
      },
      {
        title: 'Track time',
        desc: 'Time tracked against projects and billable rates.',
        active: ['time','projects'],
        edges: [['client','time'], ['projects','time']]
      },
      {
        title: 'Create invoices + payments',
        desc: 'Invoices generated from time/expenses; payments collected via provider.',
        active: ['invoices','payments'],
        edges: [['time','invoices'], ['expenses','invoices'], ['invoices','payments']]
      },
      {
        title: 'Log expenses + tax',
        desc: 'Expenses categorized; tax rules applied for reports.',
        active: ['expenses','tax'],
        edges: [['client','expenses'], ['expenses','tax']]
      },
      {
        title: 'Integrations',
        desc: 'Integrations sync invoices, payments, and contacts to external systems.',
        active: ['integrations'],
        edges: [['org','integrations']]
      },
      {
        title: 'Reports + analytics + audit',
        desc: 'Reports summarize profitability; analytics shows trends; audit logs changes.',
        active: ['reports','analytics','audit'],
        edges: [['org','reports'], ['reports','analytics'], ['org','audit']]
      }
    ]
  },

  wave: {
    title: 'Wave',
    steps: [
      {
        title: 'Set up org + ledger',
        desc: 'Org configured; ledger stores accounting transactions.',
        active: ['client','auth','org','ledger'],
        edges: [['client','auth'], ['auth','org'], ['org','ledger']]
      },
      {
        title: 'Invoices + payments',
        desc: 'Invoices created; payments collected and reconciled into ledger.',
        active: ['invoices','payments'],
        edges: [['ledger','invoices'], ['invoices','payments'], ['payments','ledger']]
      },
      {
        title: 'Expenses + tax',
        desc: 'Expenses logged and categorized; tax applied for compliance.',
        active: ['expenses','tax'],
        edges: [['client','expenses'], ['expenses','tax']]
      },
      {
        title: 'Banking + reconciliation',
        desc: 'Banking feeds imported; reconciliation matches transactions.',
        active: ['banking','reconcile'],
        edges: [['banking','reconcile'], ['reconcile','ledger']]
      },
      {
        title: 'Payroll',
        desc: 'Payroll postings update ledger and tax flows.',
        active: ['payroll'],
        edges: [['org','payroll'], ['payroll','ledger']]
      },
      {
        title: 'Reports + analytics + audit',
        desc: 'Reports summarize financials; analytics shows trends; audit logs changes.',
        active: ['reports','analytics','audit'],
        edges: [['ledger','reports'], ['reports','analytics'], ['ledger','audit']]
      }
    ]
  },

  'stripe-atlas': {
    title: 'Stripe Atlas',
    steps: [
      {
        title: 'Sign up + incorporate',
        desc: 'Founder signs up and completes incorporation workflow.',
        active: ['client','auth','incorporation'],
        edges: [['client','auth'], ['auth','incorporation']]
      },
      {
        title: 'KYC + banking setup',
        desc: 'KYC verification and banking account setup completed.',
        active: ['kyc','bank'],
        edges: [['incorporation','kyc'], ['kyc','bank']]
      },
      {
        title: 'Enable payments + merchant account',
        desc: 'Payments enabled; merchant account provisioned and configured.',
        active: ['payments','merchant','dashboard'],
        edges: [['bank','payments'], ['payments','merchant'], ['merchant','dashboard']]
      },
      {
        title: 'Docs + support',
        desc: 'Docs and support help founders complete setup and compliance.',
        active: ['docs','support'],
        edges: [['dashboard','docs'], ['docs','support']]
      },
      {
        title: 'Integrations + analytics + audit',
        desc: 'Integrations connect services; analytics and audit track activity and compliance.',
        active: ['integrations','analytics','audit'],
        edges: [['dashboard','integrations'], ['dashboard','analytics'], ['dashboard','audit']]
      }
    ]
  },

  paddle: {
    title: 'Paddle',
    steps: [
      {
        title: 'Set up catalog + checkout',
        desc: 'Merchant configures catalog and embeds checkout.',
        active: ['client','auth','catalog','checkout'],
        edges: [['client','auth'], ['auth','catalog'], ['catalog','checkout']]
      },
      {
        title: 'Tax + payments',
        desc: 'Tax calculated; payments processed.',
        active: ['tax','payments'],
        edges: [['checkout','tax'], ['checkout','payments']]
      },
      {
        title: 'Subscriptions + entitlements',
        desc: 'Subscriptions created; entitlements provision access for end users.',
        active: ['subscriptions','entitlements'],
        edges: [['payments','subscriptions'], ['subscriptions','entitlements']]
      },
      {
        title: 'Invoices',
        desc: 'Invoices issued for billing and compliance.',
        active: ['invoices'],
        edges: [['subscriptions','invoices']]
      },
      {
        title: 'Webhooks + integrations',
        desc: 'Webhooks send events to integrations and merchant systems.',
        active: ['webhooks','integrations'],
        edges: [['subscriptions','webhooks'], ['webhooks','integrations']]
      },
      {
        title: 'Analytics + audit',
        desc: 'Analytics and audit support monitoring, disputes, and compliance.',
        active: ['analytics','audit'],
        edges: [['subscriptions','analytics'], ['subscriptions','audit']]
      }
    ]
  },

  chargebee: {
    title: 'Chargebee',
    steps: [
      {
        title: 'Catalog + plans',
        desc: 'Merchant configures catalog and pricing plans.',
        active: ['client','auth','catalog','plans'],
        edges: [['client','auth'], ['auth','catalog'], ['catalog','plans']]
      },
      {
        title: 'Customers + subscriptions',
        desc: 'Customers subscribe; subscription lifecycle tracked.',
        active: ['customers','subscriptions'],
        edges: [['plans','customers'], ['customers','subscriptions']]
      },
      {
        title: 'Billing + invoices + payments',
        desc: 'Billing generates invoices; payments collected via provider.',
        active: ['billing','invoices','payments'],
        edges: [['subscriptions','billing'], ['billing','invoices'], ['invoices','payments']]
      },
      {
        title: 'Tax + dunning',
        desc: 'Tax computed; dunning retries failed payments and updates subscription status.',
        active: ['tax','dunning'],
        edges: [['invoices','tax'], ['payments','dunning'], ['dunning','subscriptions']]
      },
      {
        title: 'Webhooks + integrations',
        desc: 'Webhooks push lifecycle events to integrations and internal systems.',
        active: ['webhooks','integrations'],
        edges: [['subscriptions','webhooks'], ['webhooks','integrations']]
      },
      {
        title: 'Analytics + audit',
        desc: 'Analytics measure MRR/churn; audit tracks changes and compliance.',
        active: ['analytics','audit'],
        edges: [['subscriptions','analytics'], ['subscriptions','audit']]
      }
    ]
  },

  recurly: {
    title: 'Recurly',
    steps: [
      {
        title: 'Catalog + customers',
        desc: 'Merchant sets catalog; customers created for subscriptions.',
        active: ['client','auth','catalog','customers'],
        edges: [['client','auth'], ['auth','catalog'], ['catalog','customers']]
      },
      {
        title: 'Subscriptions + billing',
        desc: 'Subscriptions created; billing schedules invoices and renewals.',
        active: ['subscriptions','billing'],
        edges: [['customers','subscriptions'], ['subscriptions','billing']]
      },
      {
        title: 'Invoices + payments',
        desc: 'Invoices issued; payments collected and settled.',
        active: ['invoices','payments'],
        edges: [['billing','invoices'], ['invoices','payments']]
      },
      {
        title: 'Tax + dunning',
        desc: 'Tax computed; dunning retries failures and manages churn recovery.',
        active: ['tax','dunning'],
        edges: [['invoices','tax'], ['payments','dunning'], ['dunning','subscriptions']]
      },
      {
        title: 'Webhooks + integrations',
        desc: 'Webhooks deliver events to integrations and data pipelines.',
        active: ['webhooks','integrations'],
        edges: [['subscriptions','webhooks'], ['webhooks','integrations']]
      },
      {
        title: 'Analytics + audit',
        desc: 'Analytics track revenue and churn; audit logs changes.',
        active: ['analytics','audit'],
        edges: [['subscriptions','analytics'], ['subscriptions','audit']]
      }
    ]
  },

  mailchimp: {
    title: 'Mailchimp',
    steps: [
      {
        title: 'Import audience + segments',
        desc: 'Audience imported and segmented for targeting.',
        active: ['client','auth','audience','segments'],
        edges: [['client','auth'], ['auth','audience'], ['audience','segments']]
      },
      {
        title: 'Build campaign in editor',
        desc: 'Campaign created and composed in editor.',
        active: ['campaigns','editor'],
        edges: [['segments','campaigns'], ['campaigns','editor']]
      },
      {
        title: 'Automation + send',
        desc: 'Automation triggers sends; deliverability monitored.',
        active: ['automation','send','deliverability'],
        edges: [['editor','automation'], ['automation','send'], ['send','deliverability']]
      },
      {
        title: 'Tracking + reports',
        desc: 'Opens/clicks tracked; reports and analytics summarize performance.',
        active: ['tracking','reports','analytics'],
        edges: [['send','tracking'], ['tracking','reports'], ['reports','analytics']]
      },
      {
        title: 'Integrations + compliance',
        desc: 'Integrations sync contacts and events; compliance handles opt-outs and policies.',
        active: ['integrations','compliance'],
        edges: [['audience','integrations'], ['campaigns','compliance']]
      }
    ]
  },

  convertkit: {
    title: 'ConvertKit',
    steps: [
      {
        title: 'Capture subscriber via form',
        desc: 'Subscriber signs up via form; stored and tagged.',
        active: ['forms','subscribers','tags'],
        edges: [['forms','subscribers'], ['subscribers','tags']]
      },
      {
        title: 'Segments + campaigns',
        desc: 'Segments built from tags; campaigns authored for nurture sequences.',
        active: ['segments','campaigns'],
        edges: [['tags','segments'], ['segments','campaigns']]
      },
      {
        title: 'Automation + send',
        desc: 'Automation triggers sends; deliverability monitored.',
        active: ['automation','send','deliverability'],
        edges: [['campaigns','automation'], ['automation','send'], ['send','deliverability']]
      },
      {
        title: 'Commerce + payments',
        desc: 'Sell digital products; payments collected and reconciled.',
        active: ['commerce','payments'],
        edges: [['subscribers','commerce'], ['commerce','payments']]
      },
      {
        title: 'Integrations + reporting',
        desc: 'Integrations sync events; analytics and reports summarize growth.',
        active: ['integrations','analytics','reports'],
        edges: [['subscribers','integrations'], ['send','analytics'], ['analytics','reports']]
      }
    ]
  },

  activecampaign: {
    title: 'ActiveCampaign',
    steps: [
      {
        title: 'Import contacts + segment',
        desc: 'Contacts imported and segmented for targeting.',
        active: ['client','auth','contacts','segments'],
        edges: [['client','auth'], ['auth','contacts'], ['contacts','segments']]
      },
      {
        title: 'Create campaign + automation',
        desc: 'Campaigns created; automation orchestrates multi-step journeys.',
        active: ['campaigns','automation'],
        edges: [['segments','campaigns'], ['campaigns','automation']]
      },
      {
        title: 'Send + deliverability + tracking',
        desc: 'Sends executed; deliverability monitored; tracking captures engagement.',
        active: ['send','deliverability','tracking'],
        edges: [['automation','send'], ['send','deliverability'], ['send','tracking']]
      },
      {
        title: 'CRM pipelines',
        desc: 'CRM and pipelines track leads through stages based on engagement.',
        active: ['crm','pipelines'],
        edges: [['contacts','crm'], ['crm','pipelines']]
      },
      {
        title: 'Reports + analytics + compliance',
        desc: 'Reports/analytics summarize performance; compliance manages consent.',
        active: ['reports','analytics','compliance'],
        edges: [['tracking','reports'], ['reports','analytics'], ['campaigns','compliance']]
      },
      {
        title: 'Integrations',
        desc: 'Integrations sync events and data with external systems.',
        active: ['integrations'],
        edges: [['contacts','integrations']]
      }
    ]
  },

  klaviyo: {
    title: 'Klaviyo',
    steps: [
      {
        title: 'Ingest profiles + events',
        desc: 'Profiles and events flow in from ecommerce integrations and tracking.',
        active: ['client','auth','profiles','events'],
        edges: [['client','auth'], ['auth','profiles'], ['profiles','events']]
      },
      {
        title: 'Segment audience',
        desc: 'Segments computed from profiles and event history.',
        active: ['segments'],
        edges: [['events','segments']]
      },
      {
        title: 'Campaigns + flows',
        desc: 'Campaigns and automated flows created using templates.',
        active: ['campaigns','flows','templates'],
        edges: [['segments','campaigns'], ['campaigns','templates'], ['campaigns','flows']]
      },
      {
        title: 'Send + deliverability',
        desc: 'Sends executed; deliverability safeguards reputation and inbox placement.',
        active: ['send','deliverability'],
        edges: [['flows','send'], ['send','deliverability']]
      },
      {
        title: 'Tracking + analytics',
        desc: 'Opens/clicks tracked and feed analytics dashboards.',
        active: ['tracking','analytics'],
        edges: [['send','tracking'], ['tracking','analytics']]
      },
      {
        title: 'Integrations + compliance',
        desc: 'Integrations sync back conversions; compliance manages consent/opt-outs.',
        active: ['integrations','compliance'],
        edges: [['events','integrations'], ['profiles','compliance']]
      }
    ]
  },

  sendgrid: {
    title: 'SendGrid',
    steps: [
      {
        title: 'Authenticate via API/SMTP',
        desc: 'Client authenticates and submits mail via API or SMTP.',
        active: ['client','auth','api','smtp'],
        edges: [['client','auth'], ['auth','api'], ['auth','smtp']]
      },
      {
        title: 'Build message from template + list',
        desc: 'Templates and lists/segments determine personalization and audience.',
        active: ['templates','lists','segments'],
        edges: [['lists','segments'], ['templates','api'], ['segments','send']]
      },
      {
        title: 'Queue send + MTA',
        desc: 'Send queued; MTA handles delivery using IP pools.',
        active: ['send','mta','ip-pool'],
        edges: [['api','send'], ['send','mta'], ['mta','ip-pool']]
      },
      {
        title: 'Deliverability + suppression',
        desc: 'Deliverability monitoring updates suppression lists (bounces/complaints).',
        active: ['deliverability','suppression'],
        edges: [['mta','deliverability'], ['deliverability','suppression']]
      },
      {
        title: 'Tracking + webhooks',
        desc: 'Events tracked and delivered to clients via webhooks.',
        active: ['tracking','webhooks'],
        edges: [['mta','tracking'], ['tracking','webhooks']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics aggregates send, deliverability, and engagement metrics.',
        active: ['analytics'],
        edges: [['tracking','analytics']]
      }
    ]
  },

  'brevo-sendinblue': {
    title: 'Brevo (Sendinblue)',
    steps: [
      {
        title: 'Import contacts + segments',
        desc: 'Contacts imported and segmented for targeting.',
        active: ['client','auth','contacts','segments'],
        edges: [['client','auth'], ['auth','contacts'], ['contacts','segments']]
      },
      {
        title: 'Create campaign + automation',
        desc: 'Campaigns and automation journeys authored.',
        active: ['campaigns','automation'],
        edges: [['segments','campaigns'], ['campaigns','automation']]
      },
      {
        title: 'Send via email/SMS',
        desc: 'Automation triggers email and SMS sends.',
        active: ['send','email','sms'],
        edges: [['automation','send'], ['send','email'], ['send','sms']]
      },
      {
        title: 'Deliverability + tracking',
        desc: 'Deliverability monitored; engagement tracked.',
        active: ['deliverability','tracking'],
        edges: [['send','deliverability'], ['send','tracking']]
      },
      {
        title: 'CRM + analytics + compliance',
        desc: 'CRM stores engagement context; analytics and compliance manage reporting/consent.',
        active: ['crm','analytics','compliance'],
        edges: [['tracking','crm'], ['tracking','analytics'], ['contacts','compliance']]
      },
      {
        title: 'Integrations',
        desc: 'Integrations sync conversions and lifecycle stages to external tools.',
        active: ['integrations'],
        edges: [['crm','integrations']]
      }
    ]
  },

  'canva-docs': {
    title: 'Canva Docs',
    steps: [
      {
        title: 'Open workspace + doc',
        desc: 'User opens workspace and loads doc with permissions enforced.',
        active: ['client','auth','workspace','docs','permissions'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','docs'], ['permissions','docs']]
      },
      {
        title: 'Edit blocks + assets',
        desc: 'Blocks edited; assets pulled from library and served via CDN.',
        active: ['blocks','assets','cdn'],
        edges: [['docs','blocks'], ['assets','cdn']]
      },
      {
        title: 'Realtime + comments',
        desc: 'Realtime collaboration syncs edits; comments support review.',
        active: ['realtime','comments'],
        edges: [['docs','realtime'], ['realtime','client'], ['docs','comments']]
      },
      {
        title: 'Templates + export',
        desc: 'Templates bootstrap content; exports generate shareable files.',
        active: ['templates','export'],
        edges: [['templates','docs'], ['docs','export']]
      },
      {
        title: 'Share + search',
        desc: 'Sharing controls access; search uses index to find docs quickly.',
        active: ['share','search','index'],
        edges: [['docs','share'], ['client','search'], ['search','index'], ['index','docs']]
      }
    ]
  },

  gamma: {
    title: 'Gamma',
    steps: [
      {
        title: 'Create deck',
        desc: 'User creates a deck and adds cards/pages.',
        active: ['client','auth','workspace','decks','cards'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','decks'], ['decks','cards']]
      },
      {
        title: 'Generate content + assets',
        desc: 'Generator produces drafts; assets stored and served via CDN.',
        active: ['generator','assets','cdn'],
        edges: [['cards','generator'], ['assets','cdn']]
      },
      {
        title: 'Collaboration + comments',
        desc: 'Collab sync and comments support teamwork and review.',
        active: ['collab','comments'],
        edges: [['decks','collab'], ['collab','client'], ['decks','comments']]
      },
      {
        title: 'Publish/share + export',
        desc: 'Publish to web, share links, and export to PDF.',
        active: ['publish','share','export'],
        edges: [['decks','publish'], ['decks','export'], ['decks','share']]
      },
      {
        title: 'Analytics + billing',
        desc: 'Analytics tracks views/engagement; billing manages subscriptions.',
        active: ['analytics','billing'],
        edges: [['decks','analytics'], ['analytics','billing']]
      }
    ]
  },

  tome: {
    title: 'Tome',
    steps: [
      {
        title: 'Create deck + pages',
        desc: 'User creates a deck and edits pages.',
        active: ['client','auth','workspace','decks','pages'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','decks'], ['decks','pages']]
      },
      {
        title: 'Generate content + assets',
        desc: 'Generator helps author; assets served via CDN.',
        active: ['generator','assets','cdn'],
        edges: [['pages','generator'], ['assets','cdn']]
      },
      {
        title: 'Collab + comments',
        desc: 'Collaboration syncs changes; comments for review.',
        active: ['collab','comments'],
        edges: [['decks','collab'], ['collab','client'], ['decks','comments']]
      },
      {
        title: 'Publish/share + export',
        desc: 'Publish to web, share links, and export deck.',
        active: ['publish','share','export'],
        edges: [['decks','publish'], ['decks','export'], ['decks','share']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics track views and engagement.',
        active: ['analytics'],
        edges: [['decks','analytics']]
      }
    ]
  },

  pitch: {
    title: 'Pitch',
    steps: [
      {
        title: 'Open deck + slides',
        desc: 'User opens deck and edits slides.',
        active: ['client','auth','workspace','decks','slides'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','decks'], ['decks','slides']]
      },
      {
        title: 'Templates + assets',
        desc: 'Templates and assets used to build slide content; assets served via CDN.',
        active: ['templates','assets','cdn'],
        edges: [['templates','slides'], ['assets','cdn']]
      },
      {
        title: 'Realtime collaboration + comments',
        desc: 'Realtime sync and comments support teamwork.',
        active: ['realtime','comments'],
        edges: [['decks','realtime'], ['realtime','client'], ['decks','comments']]
      },
      {
        title: 'Permissions + export',
        desc: 'Permissions control access; export generates PDF/PPT.',
        active: ['permissions','export'],
        edges: [['permissions','decks'], ['decks','export']]
      },
      {
        title: 'Present + integrations + analytics',
        desc: 'Present mode; integrations sync; analytics track engagement.',
        active: ['present','integrations','analytics'],
        edges: [['decks','present'], ['decks','integrations'], ['decks','analytics']]
      }
    ]
  },

  'beautiful-ai': {
    title: 'Beautiful.ai',
    steps: [
      {
        title: 'Create deck',
        desc: 'User creates a deck and adds slides.',
        active: ['client','auth','workspace','decks','slides'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','decks'], ['decks','slides']]
      },
      {
        title: 'Designer + templates',
        desc: 'Designer applies layout rules; templates speed composition.',
        active: ['designer','templates'],
        edges: [['slides','designer'], ['templates','slides']]
      },
      {
        title: 'Assets + CDN',
        desc: 'Assets stored and served via CDN.',
        active: ['assets','cdn'],
        edges: [['slides','assets'], ['assets','cdn']]
      },
      {
        title: 'Share + export + present',
        desc: 'Share links; export; present mode for live presentations.',
        active: ['share','export','present'],
        edges: [['decks','share'], ['decks','export'], ['decks','present']]
      },
      {
        title: 'Analytics + billing',
        desc: 'Analytics track engagement; billing manages subscription tiers.',
        active: ['analytics','billing'],
        edges: [['decks','analytics'], ['analytics','billing']]
      }
    ]
  },

  loom: {
    title: 'Loom',
    steps: [
      {
        title: 'Record video',
        desc: 'Recorder captures screen/cam; upload queue created.',
        active: ['client','auth','recorder','upload'],
        edges: [['client','auth'], ['auth','recorder'], ['recorder','upload']]
      },
      {
        title: 'Transcode + store',
        desc: 'Video transcoded and stored; CDN serves playback.',
        active: ['transcode','storage','cdn'],
        edges: [['upload','transcode'], ['transcode','storage'], ['storage','cdn']]
      },
      {
        title: 'Play + comments',
        desc: 'Player streams from CDN; viewers comment on timeline.',
        active: ['player','comments'],
        edges: [['client','player'], ['player','cdn'], ['player','comments']]
      },
      {
        title: 'Sharing + search',
        desc: 'Sharing controls access; search/index enables discovery.',
        active: ['sharing','search','index'],
        edges: [['storage','sharing'], ['client','search'], ['search','index'], ['index','storage']]
      },
      {
        title: 'Integrations + analytics',
        desc: 'Integrations embed videos in tools; analytics track engagement.',
        active: ['integrations','analytics'],
        edges: [['storage','integrations'], ['player','analytics']]
      }
    ]
  },

  'screen-studio': {
    title: 'Screen Studio',
    steps: [
      {
        title: 'Record + edit timeline',
        desc: 'Record screen; edit on timeline with effects.',
        active: ['client','recorder','timeline','effects'],
        edges: [['client','recorder'], ['recorder','timeline'], ['timeline','effects']]
      },
      {
        title: 'Render + export',
        desc: 'Render pipeline exports final video to library.',
        active: ['render','export','library'],
        edges: [['effects','render'], ['render','export'], ['export','library']]
      },
      {
        title: 'Store + share',
        desc: 'Store locally and share links/files.',
        active: ['storage','share'],
        edges: [['library','storage'], ['library','share']]
      },
      {
        title: 'Upload + CDN',
        desc: 'Upload to hosting; CDN serves the video.',
        active: ['upload','cdn'],
        edges: [['library','upload'], ['upload','cdn']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics track usage and performance.',
        active: ['analytics'],
        edges: [['library','analytics']]
      }
    ]
  },

  descript: {
    title: 'Descript',
    steps: [
      {
        title: 'Import media + transcribe',
        desc: 'Media imported into project; transcription generates editable text.',
        active: ['client','auth','projects','media','transcribe'],
        edges: [['client','auth'], ['auth','projects'], ['projects','media'], ['media','transcribe']]
      },
      {
        title: 'Edit via text + timeline',
        desc: 'Editor edits transcript; timeline updates audio/video cuts.',
        active: ['editor','timeline'],
        edges: [['transcribe','editor'], ['editor','timeline']]
      },
      {
        title: 'AI cleanup tools',
        desc: 'AI tools remove filler words, enhance audio, generate captions.',
        active: ['ai'],
        edges: [['timeline','ai']]
      },
      {
        title: 'Render + store',
        desc: 'Render produces final output; stored and served via CDN.',
        active: ['render','storage','cdn'],
        edges: [['ai','render'], ['render','storage'], ['storage','cdn']]
      },
      {
        title: 'Export + publish',
        desc: 'Export files; publish to external platforms.',
        active: ['export','publish'],
        edges: [['storage','export'], ['storage','publish']]
      },
      {
        title: 'Collaboration + analytics',
        desc: 'Collaboration sync; analytics tracks usage and performance.',
        active: ['collab','analytics'],
        edges: [['projects','collab'], ['projects','analytics']]
      }
    ]
  },

  riverside: {
    title: 'Riverside',
    steps: [
      {
        title: 'Create studio + room',
        desc: 'Host creates studio and invites participants to a room.',
        active: ['client','auth','studio','rooms'],
        edges: [['client','auth'], ['auth','studio'], ['studio','rooms']]
      },
      {
        title: 'Record locally',
        desc: 'Each participant records high-quality local files during session.',
        active: ['recording','local'],
        edges: [['rooms','recording'], ['recording','local']]
      },
      {
        title: 'Upload + sync',
        desc: 'Local recordings uploaded and synced to backend.',
        active: ['upload','sync'],
        edges: [['local','upload'], ['upload','sync']]
      },
      {
        title: 'Transcode + store',
        desc: 'Transcode produces web-friendly formats; stored and served via CDN.',
        active: ['transcode','storage','cdn'],
        edges: [['sync','transcode'], ['transcode','storage'], ['storage','cdn']]
      },
      {
        title: 'Edit + export',
        desc: 'Editor trims and exports final episode.',
        active: ['editor','export'],
        edges: [['storage','editor'], ['editor','export']]
      },
      {
        title: 'Share + analytics',
        desc: 'Share links to media; analytics track engagement.',
        active: ['share','analytics'],
        edges: [['storage','share'], ['storage','analytics']]
      }
    ]
  },

  veed: {
    title: 'VEED',
    steps: [
      {
        title: 'Start project + upload assets',
        desc: 'Create project and upload video/audio assets.',
        active: ['client','auth','projects','upload','assets'],
        edges: [['client','auth'], ['auth','projects'], ['projects','upload'], ['upload','assets']]
      },
      {
        title: 'Edit timeline',
        desc: 'Timeline editing, captions, and overlays.',
        active: ['timeline'],
        edges: [['assets','timeline']]
      },
      {
        title: 'AI tools',
        desc: 'AI tools for subtitles, cleanup, and background removal.',
        active: ['ai'],
        edges: [['timeline','ai']]
      },
      {
        title: 'Render + store + CDN',
        desc: 'Render outputs; stored and served via CDN.',
        active: ['render','storage','cdn'],
        edges: [['ai','render'], ['render','storage'], ['storage','cdn']]
      },
      {
        title: 'Publish + export',
        desc: 'Publish to platforms and export files.',
        active: ['publish','export'],
        edges: [['storage','publish'], ['storage','export']]
      },
      {
        title: 'Templates + collaboration + analytics',
        desc: 'Templates speed creation; collab sync; analytics track usage.',
        active: ['templates','collab','analytics'],
        edges: [['templates','projects'], ['projects','collab'], ['projects','analytics']]
      }
    ]
  },

  kapwing: {
    title: 'Kapwing',
    steps: [
      {
        title: 'Open workspace + project',
        desc: 'User opens workspace and creates a project.',
        active: ['client','auth','workspace','projects'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','projects']]
      },
      {
        title: 'Upload assets + edit timeline',
        desc: 'Assets uploaded; timeline editing performed with collaboration.',
        active: ['upload','assets','timeline','collab'],
        edges: [['projects','upload'], ['upload','assets'], ['assets','timeline'], ['projects','collab']]
      },
      {
        title: 'Render + store + CDN',
        desc: 'Render output stored and served via CDN.',
        active: ['render','storage','cdn'],
        edges: [['timeline','render'], ['render','storage'], ['storage','cdn']]
      },
      {
        title: 'Publish + export',
        desc: 'Publish and export assets for distribution.',
        active: ['publish','export'],
        edges: [['storage','publish'], ['storage','export']]
      },
      {
        title: 'Templates + analytics',
        desc: 'Templates accelerate workflows; analytics track engagement.',
        active: ['templates','analytics'],
        edges: [['templates','projects'], ['projects','analytics']]
      }
    ]
  },

  runway: {
    title: 'Runway',
    steps: [
      {
        title: 'Create project + assets',
        desc: 'User creates project and uploads assets into workspace.',
        active: ['client','auth','workspace','projects','assets'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','projects'], ['projects','assets']]
      },
      {
        title: 'Select model',
        desc: 'Choose model and parameters for generation or editing.',
        active: ['models'],
        edges: [['projects','models']]
      },
      {
        title: 'GPU render',
        desc: 'GPU jobs render outputs and store results.',
        active: ['gpu','render','storage'],
        edges: [['models','gpu'], ['gpu','render'], ['render','storage']]
      },
      {
        title: 'CDN + publish/export',
        desc: 'Serve via CDN, publish to platforms, or export files.',
        active: ['cdn','publish','export'],
        edges: [['storage','cdn'], ['storage','publish'], ['storage','export']]
      },
      {
        title: 'Collaboration + analytics + billing',
        desc: 'Collab workflows; analytics track usage; billing manages credits.',
        active: ['collab','analytics','billing'],
        edges: [['projects','collab'], ['projects','analytics'], ['analytics','billing']]
      }
    ]
  },

  synthesia: {
    title: 'Synthesia',
    steps: [
      {
        title: 'Write script + pick avatar',
        desc: 'User writes script and selects avatar/template.',
        active: ['client','auth','workspace','scripts','avatars'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','scripts'], ['scripts','avatars']]
      },
      {
        title: 'TTS + render',
        desc: 'TTS generates voice; render produces avatar video.',
        active: ['tts','render'],
        edges: [['scripts','tts'], ['tts','render'], ['avatars','render']]
      },
      {
        title: 'Review',
        desc: 'Review and approvals before publishing.',
        active: ['review'],
        edges: [['render','review']]
      },
      {
        title: 'Store + CDN',
        desc: 'Store output and serve via CDN.',
        active: ['storage','cdn'],
        edges: [['review','storage'], ['storage','cdn']]
      },
      {
        title: 'Publish/export + integrations',
        desc: 'Publish and export; integrate with LMS and content systems.',
        active: ['publish','export','integrations'],
        edges: [['storage','publish'], ['storage','export'], ['workspace','integrations']]
      },
      {
        title: 'Analytics + billing',
        desc: 'Analytics track usage; billing manages seats/credits.',
        active: ['analytics','billing'],
        edges: [['storage','analytics'], ['analytics','billing']]
      }
    ]
  },

  pictory: {
    title: 'Pictory',
    steps: [
      {
        title: 'Create project + script',
        desc: 'User creates project and writes/imports script.',
        active: ['client','auth','projects','scripts'],
        edges: [['client','auth'], ['auth','projects'], ['projects','scripts']]
      },
      {
        title: 'Select assets + TTS',
        desc: 'Pick stock assets and generate narration via TTS.',
        active: ['assets','tts','editor'],
        edges: [['scripts','tts'], ['assets','editor'], ['tts','editor']]
      },
      {
        title: 'Render + store + CDN',
        desc: 'Render outputs; store and serve via CDN.',
        active: ['render','storage','cdn'],
        edges: [['editor','render'], ['render','storage'], ['storage','cdn']]
      },
      {
        title: 'Publish/export',
        desc: 'Publish to platforms or export file.',
        active: ['publish','export'],
        edges: [['storage','publish'], ['storage','export']]
      },
      {
        title: 'Integrations + analytics',
        desc: 'Integrations connect channels; analytics track performance.',
        active: ['integrations','analytics'],
        edges: [['projects','integrations'], ['storage','analytics']]
      }
    ]
  },

  freeletics: {
    title: 'Freeletics',
    steps: [
      {
        title: 'Profile + plan selection',
        desc: 'User signs in, sets profile, and selects training plan.',
        active: ['client','auth','profile','plans'],
        edges: [['client','auth'], ['auth','profile'], ['profile','plans']]
      },
      {
        title: 'Coach generates workouts',
        desc: 'Coach selects workouts based on plan and performance.',
        active: ['coach','workouts'],
        edges: [['plans','coach'], ['coach','workouts']]
      },
      {
        title: 'Track sessions + adapt',
        desc: 'Tracking captures completed sessions and adapts plan.',
        active: ['tracking','coach'],
        edges: [['client','tracking'], ['tracking','coach']]
      },
      {
        title: 'Nutrition + notifications',
        desc: 'Nutrition plans support training; notifications drive adherence.',
        active: ['nutrition','notifications'],
        edges: [['nutrition','coach'], ['coach','notifications']]
      },
      {
        title: 'Subscriptions + payments',
        desc: 'Subscription managed via payments provider.',
        active: ['subscriptions','payments'],
        edges: [['client','subscriptions'], ['subscriptions','payments']]
      },
      {
        title: 'Analytics + support',
        desc: 'Analytics track engagement; support handles issues.',
        active: ['analytics','support'],
        edges: [['workouts','analytics'], ['client','support']]
      }
    ]
  },

  fitbod: {
    title: 'Fitbod',
    steps: [
      {
        title: 'Profile + planner',
        desc: 'User sets profile and planner builds a workout plan.',
        active: ['client','auth','profile','planner'],
        edges: [['client','auth'], ['auth','profile'], ['profile','planner']]
      },
      {
        title: 'Exercise library + workouts',
        desc: 'Library feeds workouts generated by planner.',
        active: ['library','workouts'],
        edges: [['library','planner'], ['planner','workouts']]
      },
      {
        title: 'Tracking + recovery',
        desc: 'Track sessions; recovery model updates future workouts.',
        active: ['tracking','recovery'],
        edges: [['client','tracking'], ['tracking','recovery']]
      },
      {
        title: 'Wearables + sync',
        desc: 'Wearables sync signals; sync keeps devices consistent.',
        active: ['wearables','sync'],
        edges: [['wearables','tracking'], ['tracking','sync']]
      },
      {
        title: 'Subscriptions + payments',
        desc: 'Premium access managed via subscriptions and payments.',
        active: ['subscriptions','payments'],
        edges: [['client','subscriptions'], ['subscriptions','payments']]
      },
      {
        title: 'Analytics + notifications',
        desc: 'Analytics track progress; notifications drive adherence.',
        active: ['analytics','notifications'],
        edges: [['workouts','analytics'], ['planner','notifications']]
      }
    ]
  },

  centr: {
    title: 'Centr',
    steps: [
      {
        title: 'Profile + programs',
        desc: 'User sets profile and selects programs for workouts and nutrition.',
        active: ['client','auth','profile','programs'],
        edges: [['client','auth'], ['auth','profile'], ['profile','programs']]
      },
      {
        title: 'Workouts + streaming',
        desc: 'Workout videos streamed; progress tracked.',
        active: ['workouts','streaming'],
        edges: [['programs','workouts'], ['streaming','workouts']]
      },
      {
        title: 'Nutrition + recipes',
        desc: 'Nutrition plans and recipes support coaching.',
        active: ['nutrition','recipes'],
        edges: [['programs','nutrition'], ['nutrition','recipes']]
      },
      {
        title: 'Coach + community + notifications',
        desc: 'Coach and community features drive adherence and motivation.',
        active: ['coach','community','notifications'],
        edges: [['programs','coach'], ['client','community'], ['coach','notifications']]
      },
      {
        title: 'Subscriptions + payments',
        desc: 'Subscriptions managed via payment provider.',
        active: ['subscriptions','payments'],
        edges: [['client','subscriptions'], ['subscriptions','payments']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics track engagement and content performance.',
        active: ['analytics'],
        edges: [['workouts','analytics']]
      }
    ]
  },

  sweat: {
    title: 'Sweat',
    steps: [
      {
        title: 'Sign in + select program',
        desc: 'User signs in, sets profile, and selects a program and training plan.',
        active: ['client','auth','profile','programs','plans'],
        edges: [['client','auth'], ['auth','profile'], ['profile','programs'], ['programs','plans']]
      },
      {
        title: 'Stream workout video',
        desc: 'Workout video streamed for the session.',
        active: ['workouts','video','streaming'],
        edges: [['plans','workouts'], ['workouts','video'], ['video','streaming']]
      },
      {
        title: 'Track session + analytics',
        desc: 'Tracking logs completion; analytics summarizes progress and engagement.',
        active: ['tracking','analytics'],
        edges: [['client','tracking'], ['tracking','analytics']]
      },
      {
        title: 'Community + notifications',
        desc: 'Community features and notifications drive adherence.',
        active: ['community','notifications'],
        edges: [['client','community'], ['community','notifications']]
      },
      {
        title: 'Subscription + payments',
        desc: 'Subscription status managed via payments provider.',
        active: ['subscriptions','payments'],
        edges: [['client','subscriptions'], ['subscriptions','payments']]
      }
    ]
  },

  '8fit': {
    title: '8fit',
    steps: [
      {
        title: 'Profile + goals',
        desc: 'User sets profile and goals for workout and nutrition planning.',
        active: ['client','auth','profile','goals'],
        edges: [['client','auth'], ['auth','profile'], ['profile','goals']]
      },
      {
        title: 'Plans + workouts',
        desc: 'Plans generated and workouts scheduled based on goals.',
        active: ['plans','workouts','coach'],
        edges: [['goals','plans'], ['plans','workouts'], ['plans','coach']]
      },
      {
        title: 'Nutrition + recipes',
        desc: 'Nutrition plan created; recipes recommended and tracked.',
        active: ['nutrition','recipes'],
        edges: [['plans','nutrition'], ['nutrition','recipes']]
      },
      {
        title: 'Tracking + notifications',
        desc: 'Tracking logs adherence; notifications prompt sessions and meals.',
        active: ['tracking','notifications'],
        edges: [['client','tracking'], ['coach','notifications']]
      },
      {
        title: 'Subscriptions + payments + analytics',
        desc: 'Premium subscription managed; analytics summarizes progress.',
        active: ['subscriptions','payments','analytics'],
        edges: [['client','subscriptions'], ['subscriptions','payments'], ['tracking','analytics']]
      }
    ]
  },

  seven: {
    title: 'Seven',
    steps: [
      {
        title: 'Pick plan + workout',
        desc: 'User picks a plan and starts a workout.',
        active: ['client','auth','plans','workouts'],
        edges: [['client','auth'], ['auth','plans'], ['plans','workouts']]
      },
      {
        title: 'Timer + tracking',
        desc: 'Timer runs the 7-minute workout; tracking logs completion.',
        active: ['timer','tracking'],
        edges: [['workouts','timer'], ['timer','tracking']]
      },
      {
        title: 'Streaks + reminders',
        desc: 'Streaks updated; reminders scheduled to maintain habit.',
        active: ['streaks','reminders'],
        edges: [['tracking','streaks'], ['streaks','reminders']]
      },
      {
        title: 'Subscriptions + payments',
        desc: 'Subscription unlocks plans; payments managed externally.',
        active: ['subscriptions','payments'],
        edges: [['client','subscriptions'], ['subscriptions','payments']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics summarizes habit adherence and feature usage.',
        active: ['analytics'],
        edges: [['tracking','analytics']]
      }
    ]
  },

  jefit: {
    title: 'JEFIT',
    steps: [
      {
        title: 'Plan workout from library',
        desc: 'User builds workout plan using exercise library and templates.',
        active: ['client','auth','library','planner','workouts'],
        edges: [['client','auth'], ['auth','library'], ['library','planner'], ['planner','workouts']]
      },
      {
        title: 'Track sets + progress',
        desc: 'Tracking logs sets/reps/weights; progress metrics updated.',
        active: ['tracking','progress'],
        edges: [['client','tracking'], ['tracking','progress']]
      },
      {
        title: 'Community + notifications',
        desc: 'Community features and notifications drive retention.',
        active: ['community','notifications'],
        edges: [['client','community'], ['community','notifications']]
      },
      {
        title: 'Ads + subscriptions + payments',
        desc: 'Freemium model with ads; subscriptions and payments unlock premium.',
        active: ['ads','subscriptions','payments'],
        edges: [['ads','analytics'], ['client','subscriptions'], ['subscriptions','payments']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics summarizes engagement and workout adherence.',
        active: ['analytics'],
        edges: [['workouts','analytics']]
      }
    ]
  },

  strong: {
    title: 'Strong',
    steps: [
      {
        title: 'Create workout template',
        desc: 'User creates templates for recurring workouts.',
        active: ['client','auth','templates'],
        edges: [['client','auth'], ['auth','templates']]
      },
      {
        title: 'Run timer + track sets',
        desc: 'Timer and tracking record sets/reps and rest intervals.',
        active: ['workouts','timer','tracking'],
        edges: [['templates','workouts'], ['workouts','timer'], ['timer','tracking']]
      },
      {
        title: 'PRs + progress',
        desc: 'PRs updated and stored as progress milestones.',
        active: ['pr'],
        edges: [['tracking','pr']]
      },
      {
        title: 'Sync + cloud + export',
        desc: 'Sync saves to cloud; exports create backups/files.',
        active: ['sync','cloud','export'],
        edges: [['tracking','sync'], ['sync','cloud'], ['workouts','export']]
      },
      {
        title: 'Subscriptions + analytics',
        desc: 'Premium unlocks features; analytics tracks usage.',
        active: ['subscriptions','analytics'],
        edges: [['client','subscriptions'], ['tracking','analytics']]
      }
    ]
  },

  'nike-run-club': {
    title: 'Nike Run Club',
    steps: [
      {
        title: 'Start run + GPS',
        desc: 'User starts a run; GPS and wearables capture signals.',
        active: ['client','auth','runs','gps','wearables'],
        edges: [['client','auth'], ['auth','runs'], ['gps','tracking'], ['wearables','tracking']]
      },
      {
        title: 'Track run + sync',
        desc: 'Tracking logs pace/distance; sync saves to backend.',
        active: ['tracking','sync'],
        edges: [['runs','tracking'], ['tracking','sync']]
      },
      {
        title: 'Coach + plans',
        desc: 'Coach recommends plans based on history and goals.',
        active: ['coach','plans'],
        edges: [['tracking','coach'], ['coach','plans']]
      },
      {
        title: 'Community + notifications',
        desc: 'Community challenges and notifications drive habit.',
        active: ['community','notifications'],
        edges: [['community','notifications']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics summarizes performance and engagement.',
        active: ['analytics'],
        edges: [['sync','analytics']]
      }
    ]
  },

  'adidas-running': {
    title: 'Adidas Running',
    steps: [
      {
        title: 'Start activity',
        desc: 'User starts an activity; GPS and wearables capture data.',
        active: ['client','auth','activities','gps','wearables'],
        edges: [['client','auth'], ['auth','activities'], ['gps','tracking'], ['wearables','tracking']]
      },
      {
        title: 'Track + sync',
        desc: 'Tracking logs activity and sync saves session data.',
        active: ['tracking','sync'],
        edges: [['activities','tracking'], ['tracking','sync']]
      },
      {
        title: 'Coach + plans',
        desc: 'Coach and plans adapt training based on history.',
        active: ['coach','plans'],
        edges: [['tracking','coach'], ['coach','plans']]
      },
      {
        title: 'Challenges + community',
        desc: 'Challenges and community features drive retention.',
        active: ['challenges','community'],
        edges: [['plans','challenges'], ['challenges','community']]
      },
      {
        title: 'Notifications + analytics',
        desc: 'Notifications and analytics support adherence and insights.',
        active: ['notifications','analytics'],
        edges: [['community','notifications'], ['sync','analytics']]
      }
    ]
  },

  mapmyrun: {
    title: 'MapMyRun',
    steps: [
      {
        title: 'Plan route',
        desc: 'User plans routes and saves them for runs.',
        active: ['client','auth','routes'],
        edges: [['client','auth'], ['auth','routes']]
      },
      {
        title: 'Track run',
        desc: 'GPS and wearables capture run data into tracking.',
        active: ['gps','wearables','tracking'],
        edges: [['gps','tracking'], ['wearables','tracking']]
      },
      {
        title: 'Sync + analytics',
        desc: 'Sync saves activity; analytics summarizes stats.',
        active: ['sync','analytics'],
        edges: [['tracking','sync'], ['sync','analytics']]
      },
      {
        title: 'Community + challenges',
        desc: 'Share activities in community and join challenges.',
        active: ['community','challenges','notifications'],
        edges: [['routes','community'], ['challenges','community'], ['community','notifications']]
      }
    ]
  },

  runkeeper: {
    title: 'Runkeeper',
    steps: [
      {
        title: 'Start run',
        desc: 'GPS captures run; tracking logs pace/distance.',
        active: ['client','auth','activities','gps','tracking'],
        edges: [['client','auth'], ['auth','activities'], ['gps','tracking'], ['activities','tracking']]
      },
      {
        title: 'Coach + plans',
        desc: 'Plans recommended and adapted based on tracking.',
        active: ['coach','plans'],
        edges: [['tracking','coach'], ['coach','plans']]
      },
      {
        title: 'Sync + wearables',
        desc: 'Sync keeps devices consistent; wearables enrich signals.',
        active: ['sync','wearables'],
        edges: [['tracking','sync'], ['wearables','tracking']]
      },
      {
        title: 'Community + notifications + analytics',
        desc: 'Community and notifications drive habit; analytics summarizes progress.',
        active: ['community','notifications','analytics'],
        edges: [['community','notifications'], ['sync','analytics']]
      },
      {
        title: 'Subscriptions',
        desc: 'Premium subscription unlocks coaching and advanced metrics.',
        active: ['subscriptions'],
        edges: [['client','subscriptions']]
      }
    ]
  },

  peloton: {
    title: 'Peloton',
    steps: [
      {
        title: 'Sign in + subscription',
        desc: 'User signs in; subscription and payments authorize content access.',
        active: ['client','auth','subscriptions','payments'],
        edges: [['client','auth'], ['auth','subscriptions'], ['subscriptions','payments']]
      },
      {
        title: 'Select class + stream',
        desc: 'User selects class; streaming serves content (live or on-demand).',
        active: ['classes','streaming','live'],
        edges: [['profile','classes'], ['classes','streaming'], ['streaming','live']]
      },
      {
        title: 'Device tracking + leaderboard',
        desc: 'Connected devices stream metrics; leaderboard updates in real time.',
        active: ['devices','tracking','leaderboard'],
        edges: [['devices','tracking'], ['tracking','leaderboard']]
      },
      {
        title: 'Music integration',
        desc: 'Music metadata integrated into class experience.',
        active: ['music'],
        edges: [['music','streaming']]
      },
      {
        title: 'Community + notifications + analytics',
        desc: 'Community features and notifications drive engagement; analytics summarize usage.',
        active: ['community','notifications','analytics'],
        edges: [['tracking','analytics'], ['community','notifications']]
      }
    ]
  },

  zwift: {
    title: 'Zwift',
    steps: [
      {
        title: 'Sign in + join world',
        desc: 'User signs in; matchmaking places them into a world/instance.',
        active: ['client','auth','profile','matchmaking','world'],
        edges: [['client','auth'], ['auth','profile'], ['profile','matchmaking'], ['matchmaking','world']]
      },
      {
        title: 'Connect devices + telemetry',
        desc: 'Trainer/power meter streams telemetry into realtime session.',
        active: ['devices','telemetry','realtime'],
        edges: [['devices','telemetry'], ['telemetry','realtime']]
      },
      {
        title: 'Physics + ride state',
        desc: 'Physics engine updates ride state and positions in the world.',
        active: ['physics','rides'],
        edges: [['telemetry','physics'], ['physics','rides'], ['rides','world']]
      },
      {
        title: 'Leaderboards + events',
        desc: 'Leaderboards and event participation computed from ride telemetry.',
        active: ['leaderboards','events'],
        edges: [['rides','leaderboards'], ['leaderboards','events']]
      },
      {
        title: 'Sync + analytics',
        desc: 'Sessions synced to profile; analytics summarizes performance.',
        active: ['sync','analytics'],
        edges: [['rides','sync'], ['sync','analytics']]
      },
      {
        title: 'Subscription',
        desc: 'Subscription gates access to world and events.',
        active: ['subscriptions'],
        edges: [['subscriptions','auth']]
      }
    ]
  },

  trainerize: {
    title: 'Trainerize',
    steps: [
      {
        title: 'Coach creates plans',
        desc: 'Coach builds plans for clients including workouts and nutrition.',
        active: ['coach','clients','plans','workouts','nutrition'],
        edges: [['coach','plans'], ['plans','workouts'], ['plans','nutrition'], ['coach','clients']]
      },
      {
        title: 'Client check-ins',
        desc: 'Client submits check-ins; coach reviews and adjusts plans.',
        active: ['checkins','coach','plans'],
        edges: [['client','checkins'], ['checkins','coach'], ['coach','plans']]
      },
      {
        title: 'Messaging',
        desc: 'Two-way messaging supports accountability and guidance.',
        active: ['messages'],
        edges: [['client','messages'], ['messages','coach']]
      },
      {
        title: 'Subscriptions + payments',
        desc: 'Billing and subscriptions managed via payment provider.',
        active: ['subscriptions','payments'],
        edges: [['subscriptions','payments']]
      },
      {
        title: 'Integrations + analytics + notifications',
        desc: 'Integrations sync activity; analytics measures adherence; notifications remind.',
        active: ['integrations','analytics','notifications'],
        edges: [['clients','integrations'], ['workouts','analytics'], ['coach','notifications']]
      }
    ]
  },

  mysugr: {
    title: 'mySugr',
    steps: [
      {
        title: 'Capture glucose logs',
        desc: 'User logs glucose and related events; devices can sync readings.',
        active: ['client','auth','glucose','logs','devices','sync'],
        edges: [['client','auth'], ['auth','glucose'], ['glucose','logs'], ['devices','sync'], ['sync','logs']]
      },
      {
        title: 'Log carbs + insulin',
        desc: 'Carbs and insulin logged and linked to glucose context.',
        active: ['carbs','insulin','logs'],
        edges: [['carbs','logs'], ['insulin','logs']]
      },
      {
        title: 'Insights + reports',
        desc: 'Insights generated; reports prepared for sharing with clinicians.',
        active: ['insights','reports'],
        edges: [['logs','insights'], ['insights','reports']]
      },
      {
        title: 'Coaching + integrations',
        desc: 'Coaching programs and integrations support adherence and data sharing.',
        active: ['coach','integrations'],
        edges: [['reports','coach'], ['logs','integrations']]
      },
      {
        title: 'Privacy + analytics',
        desc: 'Privacy controls manage data; analytics aggregates trends.',
        active: ['privacy','analytics'],
        edges: [['privacy','logs'], ['logs','analytics']]
      }
    ]
  },

  'glucose-buddy': {
    title: 'Glucose Buddy',
    steps: [
      {
        title: 'Log glucose + meds',
        desc: 'User logs glucose and medication events; devices can sync readings.',
        active: ['client','auth','glucose','logs','meds','devices','sync'],
        edges: [['client','auth'], ['auth','glucose'], ['glucose','logs'], ['meds','logs'], ['devices','sync'], ['sync','logs']]
      },
      {
        title: 'Insights + reports',
        desc: 'Insights and reports summarize trends and adherence.',
        active: ['insights','reports'],
        edges: [['logs','insights'], ['insights','reports']]
      },
      {
        title: 'Reminders',
        desc: 'Reminders nudge logging and medication schedules.',
        active: ['reminders'],
        edges: [['logs','reminders']]
      },
      {
        title: 'Integrations + privacy + analytics',
        desc: 'Integrations share data; privacy controls access; analytics aggregates trends.',
        active: ['integrations','privacy','analytics'],
        edges: [['logs','integrations'], ['privacy','logs'], ['reports','analytics']]
      }
    ]
  },

  flo: {
    title: 'Flo',
    steps: [
      {
        title: 'Track cycle + symptoms',
        desc: 'User logs cycle and symptoms into profile.',
        active: ['client','auth','profile','cycle','symptoms'],
        edges: [['client','auth'], ['auth','profile'], ['profile','cycle'], ['cycle','symptoms']]
      },
      {
        title: 'Predictions + insights',
        desc: 'Predictions generated for cycle phases and reminders.',
        active: ['predictions'],
        edges: [['symptoms','predictions']]
      },
      {
        title: 'Content + community + coach',
        desc: 'Content and community support; coach provides personalized guidance.',
        active: ['content','community','coach'],
        edges: [['predictions','coach'], ['content','community']]
      },
      {
        title: 'Subscriptions + payments',
        desc: 'Premium subscription billed via payments provider.',
        active: ['subscriptions','payments'],
        edges: [['subscriptions','payments']]
      },
      {
        title: 'Notifications + analytics + privacy',
        desc: 'Notifications remind; analytics aggregates trends; privacy controls data.',
        active: ['notifications','analytics','privacy'],
        edges: [['predictions','notifications'], ['cycle','analytics'], ['privacy','profile']]
      }
    ]
  },

  clue: {
    title: 'Clue',
    steps: [
      {
        title: 'Track cycle + symptoms',
        desc: 'User logs cycle and symptoms; tracking stream persists entries.',
        active: ['client','auth','profile','cycle','tracking','symptoms'],
        edges: [['client','auth'], ['auth','profile'], ['profile','cycle'], ['tracking','symptoms']]
      },
      {
        title: 'Predictions + insights',
        desc: 'Predictions and insights produced from tracking history.',
        active: ['predictions','insights'],
        edges: [['symptoms','predictions'], ['predictions','insights']]
      },
      {
        title: 'Content',
        desc: 'Educational content supports decisions and context.',
        active: ['content'],
        edges: [['content','insights']]
      },
      {
        title: 'Subscriptions + payments',
        desc: 'Premium subscription billed via payments provider.',
        active: ['subscriptions','payments'],
        edges: [['subscriptions','payments']]
      },
      {
        title: 'Notifications + analytics + privacy',
        desc: 'Notifications for reminders; analytics aggregates trends; privacy controls data.',
        active: ['notifications','analytics','privacy'],
        edges: [['insights','notifications'], ['cycle','analytics'], ['privacy','profile']]
      }
    ]
  },

  ovia: {
    title: 'Ovia',
    steps: [
      {
        title: 'Track cycle/pregnancy',
        desc: 'User logs tracking data for cycle or pregnancy journey.',
        active: ['client','auth','profile','tracking','pregnancy','cycle'],
        edges: [['client','auth'], ['auth','profile'], ['profile','tracking'], ['tracking','pregnancy'], ['tracking','cycle']]
      },
      {
        title: 'Insights + content',
        desc: 'Insights produced and linked to relevant content.',
        active: ['insights','content'],
        edges: [['tracking','insights'], ['insights','content']]
      },
      {
        title: 'Coach + community',
        desc: 'Coach guidance and community discussions support adherence.',
        active: ['coach','community'],
        edges: [['insights','coach'], ['coach','community']]
      },
      {
        title: 'Payments + notifications',
        desc: 'Payments for premium; notifications provide reminders and tips.',
        active: ['payments','notifications'],
        edges: [['client','payments'], ['insights','notifications']]
      },
      {
        title: 'Analytics + privacy',
        desc: 'Analytics summarizes engagement; privacy controls access.',
        active: ['analytics','privacy'],
        edges: [['tracking','analytics'], ['privacy','profile']]
      }
    ]
  },

  betterhelp: {
    title: 'BetterHelp',
    steps: [
      {
        title: 'Onboarding + matching',
        desc: 'User completes profile; matching pairs them with a therapist.',
        active: ['client','auth','profile','matching','therapists'],
        edges: [['client','auth'], ['auth','profile'], ['profile','matching'], ['matching','therapists']]
      },
      {
        title: 'Schedule sessions',
        desc: 'Sessions scheduled and stored for continuity.',
        active: ['sessions'],
        edges: [['therapists','sessions']]
      },
      {
        title: 'Chat + video',
        desc: 'Therapy delivered via chat and video sessions.',
        active: ['chat','video'],
        edges: [['sessions','chat'], ['sessions','video']]
      },
      {
        title: 'Billing + payments',
        desc: 'Billing cycles and payments handle subscription access.',
        active: ['billing','payments'],
        edges: [['billing','payments']]
      },
      {
        title: 'Support + compliance + analytics',
        desc: 'Support resolves issues; compliance enforces policy; analytics tracks outcomes.',
        active: ['support','compliance','analytics','notifications'],
        edges: [['sessions','compliance'], ['sessions','analytics'], ['sessions','notifications'], ['client','support']]
      }
    ]
  },

  talkspace: {
    title: 'Talkspace',
    steps: [
      {
        title: 'Onboarding + matching',
        desc: 'User completes profile and matched to therapist.',
        active: ['client','auth','profile','matching','therapists'],
        edges: [['client','auth'], ['auth','profile'], ['profile','matching'], ['matching','therapists']]
      },
      {
        title: 'Sessions + messaging',
        desc: 'Sessions scheduled; async messaging supports ongoing therapy.',
        active: ['sessions','messages'],
        edges: [['therapists','sessions'], ['sessions','messages']]
      },
      {
        title: 'Video visits',
        desc: 'Live video visits for therapy sessions.',
        active: ['video'],
        edges: [['sessions','video']]
      },
      {
        title: 'Billing + payments',
        desc: 'Billing and payments manage subscription access.',
        active: ['billing','payments'],
        edges: [['billing','payments']]
      },
      {
        title: 'Support + compliance + analytics',
        desc: 'Support and compliance guardrails; analytics tracks engagement/outcomes.',
        active: ['support','compliance','analytics','notifications'],
        edges: [['sessions','compliance'], ['sessions','analytics'], ['sessions','notifications'], ['client','support']]
      }
    ]
  },

  wysa: {
    title: 'Wysa',
    steps: [
      {
        title: 'Chatbot sessions',
        desc: 'User chats with chatbot; content modules used for exercises.',
        active: ['client','auth','chatbot','content'],
        edges: [['client','auth'], ['auth','chatbot'], ['chatbot','content']]
      },
      {
        title: 'Check-ins',
        desc: 'Check-ins track mood and progress over time.',
        active: ['checkins'],
        edges: [['chatbot','checkins']]
      },
      {
        title: 'Human coach sessions',
        desc: 'Optional human coach sessions scheduled and stored.',
        active: ['coach','sessions'],
        edges: [['checkins','coach'], ['coach','sessions']]
      },
      {
        title: 'Notifications',
        desc: 'Notifications drive habit and session reminders.',
        active: ['notifications'],
        edges: [['sessions','notifications']]
      },
      {
        title: 'Subscriptions + payments',
        desc: 'Premium plans billed via payments provider.',
        active: ['subscriptions','payments'],
        edges: [['subscriptions','payments']]
      },
      {
        title: 'Privacy + compliance + analytics',
        desc: 'Privacy and compliance controls; analytics aggregates engagement and outcomes.',
        active: ['privacy','compliance','analytics'],
        edges: [['privacy','profile'], ['compliance','sessions'], ['sessions','analytics']]
      }
    ]
  },

  youper: {
    title: 'Youper',
    steps: [
      {
        title: 'Onboarding + chatbot entry',
        desc: 'User signs in, sets profile, and starts a chatbot session.',
        active: ['client','auth','profile','chatbot'],
        edges: [['client','auth'], ['auth','profile'], ['profile','chatbot']]
      },
      {
        title: 'Mood + journaling',
        desc: 'User logs mood and journals; entries feed insights.',
        active: ['mood','journals','insights'],
        edges: [['chatbot','mood'], ['mood','journals'], ['journals','insights']]
      },
      {
        title: 'Plans + content',
        desc: 'Plans and content modules recommended based on insights.',
        active: ['plans','content'],
        edges: [['insights','plans'], ['plans','content']]
      },
      {
        title: 'Coach + notifications',
        desc: 'Optional coach guidance and notifications drive adherence.',
        active: ['coach','notifications'],
        edges: [['insights','coach'], ['coach','notifications']]
      },
      {
        title: 'Subscription + privacy + analytics',
        desc: 'Subscription billed; privacy controls data; analytics aggregates outcomes.',
        active: ['subscriptions','payments','privacy','analytics'],
        edges: [['subscriptions','payments'], ['privacy','profile'], ['insights','analytics']]
      }
    ]
  },

  minddoc: {
    title: 'MindDoc',
    steps: [
      {
        title: 'Mood + journaling',
        desc: 'User logs mood and journal entries over time.',
        active: ['client','auth','profile','mood','journals'],
        edges: [['client','auth'], ['auth','profile'], ['profile','mood'], ['mood','journals']]
      },
      {
        title: 'Assessments',
        desc: 'Assessments capture structured signals for mental health screening.',
        active: ['assessments'],
        edges: [['journals','assessments']]
      },
      {
        title: 'Insights + plans',
        desc: 'Insights produced; plans recommended for coping and routines.',
        active: ['insights','plans'],
        edges: [['assessments','insights'], ['insights','plans']]
      },
      {
        title: 'Content + notifications',
        desc: 'Content modules delivered and notifications remind adherence.',
        active: ['content','notifications'],
        edges: [['plans','content'], ['insights','notifications']]
      },
      {
        title: 'Export + analytics + privacy',
        desc: 'Export reports; analytics aggregates trends; privacy controls data.',
        active: ['export','analytics','privacy'],
        edges: [['insights','export'], ['insights','analytics'], ['privacy','profile']]
      }
    ]
  },

  sanvello: {
    title: 'Sanvello',
    steps: [
      {
        title: 'Tools + mood tracking',
        desc: 'User uses CBT tools and logs mood/check-ins.',
        active: ['client','auth','tools','tracking','mood'],
        edges: [['client','auth'], ['auth','tools'], ['tools','tracking'], ['tracking','mood']]
      },
      {
        title: 'Journaling + plans',
        desc: 'Journals feed plans and exercises.',
        active: ['journals','plans'],
        edges: [['mood','journals'], ['journals','plans']]
      },
      {
        title: 'Coach + community + notifications',
        desc: 'Optional coach/community support and notifications drive adherence.',
        active: ['coach','community','notifications'],
        edges: [['plans','coach'], ['coach','community'], ['community','notifications']]
      },
      {
        title: 'Subscriptions + payments',
        desc: 'Premium access billed via payments provider.',
        active: ['subscriptions','payments'],
        edges: [['subscriptions','payments']]
      },
      {
        title: 'Analytics + privacy',
        desc: 'Analytics aggregates trends; privacy controls data access.',
        active: ['analytics','privacy'],
        edges: [['tracking','analytics'], ['privacy','profile']]
      }
    ]
  },

  fabulous: {
    title: 'Fabulous',
    steps: [
      {
        title: 'Set habits + routines',
        desc: 'User creates habit goals and routines.',
        active: ['client','auth','profile','habits','routines'],
        edges: [['client','auth'], ['auth','profile'], ['profile','habits'], ['habits','routines']]
      },
      {
        title: 'Coach guidance',
        desc: 'Coach content provides prompts and structured guidance.',
        active: ['coach','content'],
        edges: [['routines','coach'], ['content','coach']]
      },
      {
        title: 'Challenges + tracking',
        desc: 'Challenges and tracking log completion and streaks.',
        active: ['challenges','tracking'],
        edges: [['coach','challenges'], ['routines','tracking']]
      },
      {
        title: 'Notifications',
        desc: 'Notifications remind daily routines.',
        active: ['notifications'],
        edges: [['tracking','notifications']]
      },
      {
        title: 'Subscriptions + payments + analytics',
        desc: 'Premium subscription billed; analytics aggregates adherence.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['tracking','analytics']]
      }
    ]
  },

  stoic: {
    title: 'Stoic',
    steps: [
      {
        title: 'Journal with prompts',
        desc: 'User journals using prompts; mood logged.',
        active: ['client','auth','journals','prompts','mood'],
        edges: [['client','auth'], ['auth','journals'], ['prompts','journals'], ['journals','mood']]
      },
      {
        title: 'Streaks + reminders',
        desc: 'Streaks updated and reminders scheduled.',
        active: ['streaks','reminders'],
        edges: [['mood','streaks'], ['streaks','reminders']]
      },
      {
        title: 'Content',
        desc: 'Stoic content and lessons delivered based on journaling.',
        active: ['content'],
        edges: [['journals','content']]
      },
      {
        title: 'Export + privacy',
        desc: 'Export journals; privacy controls protect data.',
        active: ['export','privacy'],
        edges: [['journals','export'], ['privacy','profile']]
      },
      {
        title: 'Subscriptions + payments + analytics',
        desc: 'Premium billed; analytics aggregates engagement.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['journals','analytics']]
      }
    ]
  },

  reflectly: {
    title: 'Reflectly',
    steps: [
      {
        title: 'Daily journaling + mood',
        desc: 'User journals daily and logs mood.',
        active: ['client','auth','profile','journals','mood'],
        edges: [['client','auth'], ['auth','profile'], ['profile','journals'], ['journals','mood']]
      },
      {
        title: 'Insights + prompts',
        desc: 'Insights generated and prompts guide reflection.',
        active: ['insights','prompts'],
        edges: [['journals','insights'], ['insights','prompts']]
      },
      {
        title: 'Content + streaks',
        desc: 'Content delivered; streaks tracked for habit building.',
        active: ['content','streaks'],
        edges: [['prompts','content'], ['mood','streaks']]
      },
      {
        title: 'Notifications + privacy',
        desc: 'Notifications remind journaling; privacy controls data.',
        active: ['notifications','privacy'],
        edges: [['insights','notifications'], ['privacy','profile']]
      },
      {
        title: 'Subscriptions + payments + analytics',
        desc: 'Premium billed; analytics aggregates engagement.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['journals','analytics']]
      }
    ]
  },

  daylio: {
    title: 'Daylio',
    steps: [
      {
        title: 'Log mood + activities',
        desc: 'User logs mood and activities; journals store notes.',
        active: ['client','auth','profile','mood','activities','journals'],
        edges: [['client','auth'], ['auth','profile'], ['profile','mood'], ['mood','activities'], ['activities','journals']]
      },
      {
        title: 'Stats + insights',
        desc: 'Stats computed and insights generated from history.',
        active: ['stats','insights'],
        edges: [['journals','stats'], ['stats','insights']]
      },
      {
        title: 'Reminders',
        desc: 'Reminders support daily logging habit.',
        active: ['reminders'],
        edges: [['insights','reminders']]
      },
      {
        title: 'Export + sync',
        desc: 'Export and sync support backups and multi-device use.',
        active: ['export','sync'],
        edges: [['stats','export'], ['journals','sync']]
      },
      {
        title: 'Analytics + privacy',
        desc: 'Analytics aggregates engagement; privacy controls data.',
        active: ['analytics','privacy'],
        edges: [['sync','analytics'], ['privacy','profile']]
      }
    ]
  },

  'sleep-cycle': {
    title: 'Sleep Cycle',
    steps: [
      {
        title: 'Collect sleep signals',
        desc: 'Sensors collect sleep signals during the night.',
        active: ['client','auth','profile','sleep','sensors'],
        edges: [['client','auth'], ['auth','profile'], ['profile','sleep'], ['sensors','sleep']]
      },
      {
        title: 'Process + sleep stages',
        desc: 'Processing derives sleep stages and patterns.',
        active: ['processing','stages'],
        edges: [['sleep','processing'], ['processing','stages']]
      },
      {
        title: 'Smart alarm',
        desc: 'Alarm triggers in optimal window based on stages.',
        active: ['alarm'],
        edges: [['stages','alarm']]
      },
      {
        title: 'Insights + sound',
        desc: 'Insights summarize sleep; sound features support sleep hygiene.',
        active: ['insights','sound'],
        edges: [['stages','insights'], ['sound','sleep']]
      },
      {
        title: 'Subscription + analytics + privacy',
        desc: 'Premium billed; analytics aggregates trends; privacy controls data.',
        active: ['subscriptions','payments','analytics','privacy'],
        edges: [['subscriptions','payments'], ['sleep','analytics'], ['privacy','profile']]
      }
    ]
  },

  sleepscore: {
    title: 'SleepScore',
    steps: [
      {
        title: 'Collect sleep data',
        desc: 'Sensors collect sleep signals and sessions are recorded.',
        active: ['client','auth','profile','sleep','sensors'],
        edges: [['client','auth'], ['auth','profile'], ['profile','sleep'], ['sensors','sleep']]
      },
      {
        title: 'Processing + score',
        desc: 'Processing computes sleep score and quality metrics.',
        active: ['processing','score'],
        edges: [['sleep','processing'], ['processing','score']]
      },
      {
        title: 'Recommendations + insights',
        desc: 'Recommendations generated from score; insights explain drivers.',
        active: ['recommendations','insights'],
        edges: [['score','recommendations'], ['recommendations','insights']]
      },
      {
        title: 'Devices + sync + analytics',
        desc: 'Device ecosystem sync; analytics aggregates trends.',
        active: ['devices','sync','analytics'],
        edges: [['devices','sync'], ['sync','analytics']]
      },
      {
        title: 'Subscriptions + privacy',
        desc: 'Premium access billed; privacy controls data.',
        active: ['subscriptions','payments','privacy'],
        edges: [['subscriptions','payments'], ['privacy','profile']]
      }
    ]
  },

  'calm-sleep': {
    title: 'Calm Sleep',
    steps: [
      {
        title: 'Browse catalog',
        desc: 'User browses the sleep catalog and selects an audio track.',
        active: ['client','auth','profile','catalog','audio'],
        edges: [['client','auth'], ['auth','profile'], ['profile','catalog'], ['catalog','audio']]
      },
      {
        title: 'CDN streaming + downloads',
        desc: 'Audio streams via CDN and can be downloaded for offline use.',
        active: ['cdn','downloads'],
        edges: [['audio','cdn'], ['cdn','downloads']]
      },
      {
        title: 'Sleep session',
        desc: 'Playback supports sleep session and bedtime routine.',
        active: ['sleep','recommendations'],
        edges: [['downloads','sleep'], ['sleep','recommendations']]
      },
      {
        title: 'Subscription + notifications + analytics',
        desc: 'Subscription billed; notifications encourage routine; analytics tracks engagement.',
        active: ['subscriptions','payments','notifications','analytics'],
        edges: [['subscriptions','payments'], ['recommendations','notifications'], ['sleep','analytics']]
      }
    ]
  },

  'insight-timer': {
    title: 'Insight Timer',
    steps: [
      {
        title: 'Browse catalog',
        desc: 'User signs in and browses meditation and course catalog.',
        active: ['client','auth','profile','catalog'],
        edges: [['client','auth'], ['auth','profile'], ['profile','catalog']]
      },
      {
        title: 'Play audio + downloads',
        desc: 'Audio plays and can be downloaded for offline sessions.',
        active: ['audio','downloads'],
        edges: [['catalog','audio'], ['audio','downloads']]
      },
      {
        title: 'Live sessions + community',
        desc: 'Live meditation sessions and community features engage users.',
        active: ['live','community'],
        edges: [['audio','live'], ['live','community']]
      },
      {
        title: 'Recommendations + notifications',
        desc: 'Recommendations personalize next sessions; notifications drive habit.',
        active: ['recommendations','notifications'],
        edges: [['downloads','recommendations'], ['recommendations','notifications']]
      },
      {
        title: 'Subscriptions + payments + analytics',
        desc: 'Subscription billed; analytics measures engagement and retention.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['audio','analytics']]
      }
    ]
  },

  balance: {
    title: 'Balance',
    steps: [
      {
        title: 'Assessment',
        desc: 'User completes assessment to personalize meditation plan.',
        active: ['client','auth','profile','assessment'],
        edges: [['client','auth'], ['auth','profile'], ['profile','assessment']]
      },
      {
        title: 'Plan + sessions',
        desc: 'Plan generated; sessions scheduled and delivered.',
        active: ['plan','sessions','audio'],
        edges: [['assessment','plan'], ['plan','sessions'], ['sessions','audio']]
      },
      {
        title: 'Progress + reminders',
        desc: 'Progress tracked; reminders keep the habit.',
        active: ['progress','reminders'],
        edges: [['sessions','progress'], ['progress','reminders']]
      },
      {
        title: 'Subscription + privacy + analytics',
        desc: 'Subscription billed; privacy controls data; analytics tracks engagement.',
        active: ['subscriptions','payments','privacy','analytics'],
        edges: [['subscriptions','payments'], ['sessions','analytics'], ['privacy','profile']]
      }
    ]
  },

  aura: {
    title: 'Aura',
    steps: [
      {
        title: 'Personalized recommendations',
        desc: 'Recommendations personalize catalog and sleep content.',
        active: ['client','auth','profile','recommendations','catalog'],
        edges: [['client','auth'], ['auth','profile'], ['profile','recommendations'], ['recommendations','catalog']]
      },
      {
        title: 'Play audio + downloads',
        desc: 'Audio and stories play; downloads support offline use.',
        active: ['audio','stories','downloads'],
        edges: [['catalog','audio'], ['stories','audio'], ['audio','downloads']]
      },
      {
        title: 'Sleep experience + notifications',
        desc: 'Sleep sessions tracked; notifications drive routine.',
        active: ['sleep','notifications'],
        edges: [['downloads','sleep'], ['sleep','notifications']]
      },
      {
        title: 'Subscriptions + payments + analytics + privacy',
        desc: 'Subscription billed; analytics tracks engagement; privacy controls data.',
        active: ['subscriptions','payments','analytics','privacy'],
        edges: [['subscriptions','payments'], ['audio','analytics'], ['privacy','profile']]
      }
    ]
  },

  noom: {
    title: 'Noom',
    steps: [
      {
        title: 'Onboarding + goals',
        desc: 'User signs in and sets weight/health goals.',
        active: ['client','auth','profile','goals'],
        edges: [['client','auth'], ['auth','profile'], ['profile','goals']]
      },
      {
        title: 'Food logging',
        desc: 'User logs meals using food database; logging stream persists.',
        active: ['logging','food'],
        edges: [['goals','logging'], ['logging','food']]
      },
      {
        title: 'Lessons + coach messaging',
        desc: 'Lessons delivered; coach supports via messaging.',
        active: ['lessons','coach','messages'],
        edges: [['logging','coach'], ['coach','messages'], ['lessons','groups']]
      },
      {
        title: 'Groups + notifications',
        desc: 'Group engagement and notifications build adherence.',
        active: ['groups','notifications'],
        edges: [['groups','notifications']]
      },
      {
        title: 'Subscriptions + payments + analytics + privacy',
        desc: 'Subscription billed; analytics aggregates trends; privacy controls data.',
        active: ['subscriptions','payments','analytics','privacy'],
        edges: [['subscriptions','payments'], ['logging','analytics'], ['privacy','profile']]
      }
    ]
  },

  lifesum: {
    title: 'Lifesum',
    steps: [
      {
        title: 'Goals + food logging',
        desc: 'User sets goals and logs meals against food database.',
        active: ['client','auth','profile','goals','logging','food'],
        edges: [['client','auth'], ['auth','profile'], ['profile','goals'], ['goals','logging'], ['logging','food']]
      },
      {
        title: 'Recipes + plans',
        desc: 'Recipes recommended and plans created for diet adherence.',
        active: ['recipes','plans'],
        edges: [['food','recipes'], ['recipes','plans']]
      },
      {
        title: 'Tracking + insights',
        desc: 'Tracking and insights summarize nutrition and progress.',
        active: ['tracking','insights'],
        edges: [['logging','tracking'], ['tracking','insights']]
      },
      {
        title: 'Notifications + subscription + privacy + analytics',
        desc: 'Notifications remind; subscription billed; privacy and analytics manage data.',
        active: ['notifications','subscriptions','payments','privacy','analytics'],
        edges: [['insights','notifications'], ['subscriptions','payments'], ['tracking','analytics'], ['privacy','profile']]
      }
    ]
  },

  yazio: {
    title: 'Yazio',
    steps: [
      {
        title: 'Goals + scan foods',
        desc: 'User sets goals and scans foods to log meals.',
        active: ['client','auth','profile','goals','scanner','food'],
        edges: [['client','auth'], ['auth','profile'], ['profile','goals'], ['scanner','food']]
      },
      {
        title: 'Logging + plans',
        desc: 'Logging persists meals and contributes to plans.',
        active: ['logging','plans'],
        edges: [['food','logging'], ['logging','plans']]
      },
      {
        title: 'Tracking + insights + notifications',
        desc: 'Tracking and insights summarize progress; notifications remind.',
        active: ['tracking','insights','notifications'],
        edges: [['plans','tracking'], ['tracking','insights'], ['insights','notifications']]
      },
      {
        title: 'Subscription + payments + analytics',
        desc: 'Premium billed; analytics aggregates engagement.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['tracking','analytics']]
      }
    ]
  },

  fooducate: {
    title: 'Fooducate',
    steps: [
      {
        title: 'Scan + grade food',
        desc: 'User scans product and receives nutrition grading.',
        active: ['client','auth','profile','scanner','food','grading'],
        edges: [['client','auth'], ['auth','profile'], ['profile','scanner'], ['scanner','food'], ['food','grading']]
      },
      {
        title: 'Alternatives + plans',
        desc: 'Alternatives recommended and plans suggested.',
        active: ['alternatives','plans'],
        edges: [['grading','alternatives'], ['alternatives','plans']]
      },
      {
        title: 'Tracking + content + notifications',
        desc: 'Tracking logs choices; content educates; notifications drive habit.',
        active: ['tracking','content','notifications'],
        edges: [['plans','tracking'], ['tracking','content'], ['content','notifications']]
      },
      {
        title: 'Ads + subscription + payments + analytics',
        desc: 'Freemium monetization via ads and subscriptions; analytics measures engagement.',
        active: ['ads','subscriptions','payments','analytics'],
        edges: [['ads','analytics'], ['subscriptions','payments'], ['tracking','analytics']]
      }
    ]
  },

  eatsure: {
    title: 'EatSure',
    steps: [
      {
        title: 'Search + build cart',
        desc: 'User searches catalog and adds menu items to cart.',
        active: ['client','auth','search','catalog','menu','cart'],
        edges: [['client','auth'], ['auth','search'], ['search','catalog'], ['catalog','menu'], ['menu','cart']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['checkout','payments','orders'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Dispatch + delivery',
        desc: 'Dispatch assigns delivery; notifications update status.',
        active: ['dispatch','delivery','notifications'],
        edges: [['orders','dispatch'], ['dispatch','delivery'], ['orders','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support handles issues; analytics aggregates order metrics.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  dunzo: {
    title: 'Dunzo',
    steps: [
      {
        title: 'Create task + price',
        desc: 'User creates a delivery/errand task; pricing estimated.',
        active: ['client','auth','catalog','tasks','pricing'],
        edges: [['client','auth'], ['auth','catalog'], ['catalog','tasks'], ['tasks','pricing']]
      },
      {
        title: 'Order + dispatch courier',
        desc: 'Order created; dispatch assigns courier.',
        active: ['orders','dispatch','couriers'],
        edges: [['pricing','orders'], ['orders','dispatch'], ['dispatch','couriers']]
      },
      {
        title: 'Routing + tracking',
        desc: 'Routing optimizes path; tracking updates user.',
        active: ['routing','tracking','notifications'],
        edges: [['couriers','routing'], ['routing','tracking'], ['orders','notifications']]
      },
      {
        title: 'Payment + support + analytics',
        desc: 'Payments processed; support resolves issues; analytics aggregates performance.',
        active: ['payments','support','analytics'],
        edges: [['orders','payments'], ['client','support'], ['orders','analytics']]
      }
    ]
  },

  postmates: {
    title: 'Postmates',
    steps: [
      {
        title: 'Browse + cart',
        desc: 'User searches restaurants/stores and adds items to cart.',
        active: ['client','auth','search','catalog','menu','cart'],
        edges: [['client','auth'], ['auth','search'], ['search','catalog'], ['catalog','menu'], ['menu','cart']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['checkout','payments','orders'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Dispatch + courier routing',
        desc: 'Dispatch assigns courier; routing planned; tracking updates user.',
        active: ['dispatch','couriers','routing','tracking'],
        edges: [['orders','dispatch'], ['dispatch','couriers'], ['couriers','routing'], ['routing','tracking']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications update status; support resolves issues; analytics aggregates performance.',
        active: ['notifications','support','analytics'],
        edges: [['orders','notifications'], ['client','support'], ['orders','analytics']]
      }
    ]
  },

  chownow: {
    title: 'ChowNow',
    steps: [
      {
        title: 'Search + build cart',
        desc: 'User searches restaurants and builds a cart from menus.',
        active: ['client','auth','search','catalog','menu','cart'],
        edges: [['client','auth'], ['auth','search'], ['search','catalog'], ['catalog','menu'], ['menu','cart']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['checkout','payments','orders'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Restaurant + POS fulfillment',
        desc: 'Order routed to restaurant systems and POS for preparation.',
        active: ['restaurants','pos','orders'],
        edges: [['orders','restaurants'], ['orders','pos']]
      },
      {
        title: 'Dispatch + delivery + notifications',
        desc: 'Dispatch coordinates delivery; notifications update status.',
        active: ['dispatch','delivery','notifications'],
        edges: [['orders','dispatch'], ['dispatch','delivery'], ['orders','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics aggregates order metrics.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  ritual: {
    title: 'Ritual',
    steps: [
      {
        title: 'Discovery + menu',
        desc: 'User discovers nearby pickup options and views menu.',
        active: ['client','auth','discovery','catalog','menu'],
        edges: [['client','auth'], ['auth','discovery'], ['discovery','catalog'], ['catalog','menu']]
      },
      {
        title: 'Cart + checkout + payment',
        desc: 'User checks out and pays; order created.',
        active: ['cart','checkout','payments','orders'],
        edges: [['menu','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Kitchen prep + status',
        desc: 'Kitchen receives order and status updates stream to app.',
        active: ['kitchen','status','notifications'],
        edges: [['orders','kitchen'], ['kitchen','status'], ['orders','notifications']]
      },
      {
        title: 'Pickup',
        desc: 'Pickup flow coordinates arrival and handoff.',
        active: ['pickup'],
        edges: [['status','pickup']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support and analytics for order outcomes and reliability.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  'deliveroo-rider': {
    title: 'Deliveroo Rider',
    steps: [
      {
        title: 'Go online + availability',
        desc: 'Rider authenticates and sets availability for dispatch.',
        active: ['rider','auth','availability'],
        edges: [['rider','auth'], ['auth','availability']]
      },
      {
        title: 'Receive assignment',
        desc: 'Assignments delivered to rider app.',
        active: ['assignments','notifications'],
        edges: [['availability','assignments'], ['assignments','notifications']]
      },
      {
        title: 'Routing + navigation + tracking',
        desc: 'Routing planned, navigation used, and tracking updates dispatched.',
        active: ['routing','navigation','tracking'],
        edges: [['assignments','routing'], ['routing','navigation'], ['navigation','tracking']]
      },
      {
        title: 'Proof of delivery + payouts',
        desc: 'Proof captured; payouts calculated and executed.',
        active: ['proof','payouts'],
        edges: [['tracking','proof'], ['proof','payouts']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics monitors performance.',
        active: ['support','analytics'],
        edges: [['rider','support'], ['tracking','analytics']]
      }
    ]
  },

  talabat: {
    title: 'Talabat',
    steps: [
      {
        title: 'Browse + cart',
        desc: 'User browses restaurants and builds cart.',
        active: ['client','auth','search','catalog','menu','cart'],
        edges: [['client','auth'], ['auth','search'], ['search','catalog'], ['catalog','menu'], ['menu','cart']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['checkout','payments','orders'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Dispatch + courier tracking',
        desc: 'Dispatch assigns courier; tracking updates customer.',
        active: ['dispatch','couriers','tracking','notifications'],
        edges: [['orders','dispatch'], ['dispatch','couriers'], ['couriers','tracking'], ['orders','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics aggregates operations.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  'careem-food': {
    title: 'Careem Food',
    steps: [
      {
        title: 'Browse + cart',
        desc: 'User browses menus and builds cart.',
        active: ['client','auth','search','catalog','menu','cart'],
        edges: [['client','auth'], ['auth','search'], ['search','catalog'], ['catalog','menu'], ['menu','cart']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['checkout','payments','orders'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Dispatch captains + tracking',
        desc: 'Dispatch assigns captains; tracking updates customer.',
        active: ['dispatch','captains','tracking','notifications'],
        edges: [['orders','dispatch'], ['dispatch','captains'], ['captains','tracking'], ['orders','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics aggregates operations.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  glovo: {
    title: 'Glovo',
    steps: [
      {
        title: 'Browse stores + cart',
        desc: 'User browses stores and builds cart for delivery.',
        active: ['client','auth','search','catalog','stores','cart'],
        edges: [['client','auth'], ['auth','search'], ['search','catalog'], ['catalog','stores'], ['stores','cart']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['checkout','payments','orders'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Dispatch + routing + tracking',
        desc: 'Dispatch assigns courier; routing planned; tracking updates user.',
        active: ['dispatch','couriers','routing','tracking','notifications'],
        edges: [['orders','dispatch'], ['dispatch','couriers'], ['couriers','routing'], ['routing','tracking'], ['orders','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics aggregates operations.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  'bolt-food': {
    title: 'Bolt Food',
    steps: [
      {
        title: 'Browse + cart',
        desc: 'User browses menus and builds cart.',
        active: ['client','auth','search','catalog','menu','cart'],
        edges: [['client','auth'], ['auth','search'], ['search','catalog'], ['catalog','menu'], ['menu','cart']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['checkout','payments','orders'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Dispatch + tracking',
        desc: 'Dispatch assigns courier; tracking updates customer.',
        active: ['dispatch','couriers','tracking','notifications'],
        edges: [['orders','dispatch'], ['dispatch','couriers'], ['couriers','tracking'], ['orders','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics aggregates operations.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  foodpanda: {
    title: 'Foodpanda',
    steps: [
      {
        title: 'Browse + cart',
        desc: 'User browses menus and builds cart.',
        active: ['client','auth','search','catalog','menu','cart'],
        edges: [['client','auth'], ['auth','search'], ['search','catalog'], ['catalog','menu'], ['menu','cart']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['checkout','payments','orders'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Dispatch riders + tracking',
        desc: 'Dispatch assigns rider; tracking updates customer.',
        active: ['dispatch','riders','tracking','notifications'],
        edges: [['orders','dispatch'], ['dispatch','riders'], ['riders','tracking'], ['orders','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics aggregates operations.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  skipthedishes: {
    title: 'SkipTheDishes',
    steps: [
      {
        title: 'Browse + cart',
        desc: 'User browses menus and builds cart.',
        active: ['client','auth','search','catalog','menu','cart'],
        edges: [['client','auth'], ['auth','search'], ['search','catalog'], ['catalog','menu'], ['menu','cart']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['checkout','payments','orders'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Dispatch + tracking',
        desc: 'Dispatch assigns courier; tracking updates customer.',
        active: ['dispatch','couriers','tracking','notifications'],
        edges: [['orders','dispatch'], ['dispatch','couriers'], ['couriers','tracking'], ['orders','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics aggregates operations.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  menulog: {
    title: 'Menulog',
    steps: [
      {
        title: 'Browse + cart',
        desc: 'User browses menus and builds cart.',
        active: ['client','auth','search','catalog','menu','cart'],
        edges: [['client','auth'], ['auth','search'], ['search','catalog'], ['catalog','menu'], ['menu','cart']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['checkout','payments','orders'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Dispatch + tracking',
        desc: 'Dispatch assigns courier; tracking updates customer.',
        active: ['dispatch','couriers','tracking','notifications'],
        edges: [['orders','dispatch'], ['dispatch','couriers'], ['couriers','tracking'], ['orders','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics aggregates operations.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  'zomato-business': {
    title: 'Zomato Business',
    steps: [
      {
        title: 'Sign in + view dashboard',
        desc: 'Merchant logs in and views operational dashboard.',
        active: ['merchant','auth','dashboard'],
        edges: [['merchant','auth'], ['auth','dashboard']]
      },
      {
        title: 'Update menus + inventory',
        desc: 'Menus, inventory, and pricing maintained for ordering apps.',
        active: ['menus','inventory','pricing'],
        edges: [['dashboard','menus'], ['menus','inventory'], ['inventory','pricing']]
      },
      {
        title: 'Manage orders + KDS',
        desc: 'Orders monitored; KDS integration supports kitchen operations.',
        active: ['orders','kds'],
        edges: [['pricing','orders'], ['orders','kds']]
      },
      {
        title: 'Settlements + ads',
        desc: 'Settlements/reconciliation and ads/campaign tools.',
        active: ['settlements','ads'],
        edges: [['orders','settlements'], ['ads','analytics']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications for spikes/issues; support workflows; analytics performance.',
        active: ['notifications','support','analytics'],
        edges: [['orders','notifications'], ['merchant','support'], ['orders','analytics']]
      }
    ]
  },

  'swiggy-instamart': {
    title: 'Swiggy Instamart',
    steps: [
      {
        title: 'Browse catalog + inventory',
        desc: 'User browses quick-commerce catalog backed by inventory.',
        active: ['client','auth','search','catalog','inventory'],
        edges: [['client','auth'], ['auth','search'], ['search','catalog'], ['catalog','inventory']]
      },
      {
        title: 'Cart + checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['cart','checkout','payments','orders'],
        edges: [['inventory','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Picking',
        desc: 'Picking/packing in dark store prepares the order.',
        active: ['picking'],
        edges: [['orders','picking']]
      },
      {
        title: 'Dispatch + courier tracking',
        desc: 'Dispatch assigns courier; tracking and notifications update status.',
        active: ['dispatch','couriers','tracking','notifications'],
        edges: [['picking','dispatch'], ['dispatch','couriers'], ['couriers','tracking'], ['orders','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support handles issues; analytics aggregates fulfillment KPIs.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  'uber-eats-driver': {
    title: 'Uber Eats Driver',
    steps: [
      {
        title: 'Go online + get offers',
        desc: 'Driver authenticates, sets availability, and receives offers.',
        active: ['driver','auth','availability','offers'],
        edges: [['driver','auth'], ['auth','availability'], ['availability','offers']]
      },
      {
        title: 'Accept + pickup',
        desc: 'Accept offer and head to pickup location.',
        active: ['accept','pickup','routing','navigation'],
        edges: [['offers','accept'], ['accept','routing'], ['routing','navigation'], ['accept','pickup']]
      },
      {
        title: 'Tracking + dropoff',
        desc: 'Tracking updates; dropoff completes delivery.',
        active: ['tracking','dropoff','notifications'],
        edges: [['pickup','tracking'], ['tracking','dropoff'], ['tracking','notifications']]
      },
      {
        title: 'Proof + payouts',
        desc: 'Proof captured; payouts calculated and executed.',
        active: ['proof','payouts'],
        edges: [['dropoff','proof'], ['proof','payouts']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support handles issues; analytics monitors performance.',
        active: ['support','analytics'],
        edges: [['driver','support'], ['tracking','analytics']]
      }
    ]
  },

  'domino-s-tracker': {
    title: 'Domino\u2019s Tracker',
    steps: [
      {
        title: 'Authenticate + load order',
        desc: 'User authenticates and loads order details for tracking.',
        active: ['client','auth','order'],
        edges: [['client','auth'], ['auth','order']]
      },
      {
        title: 'Store + kitchen updates',
        desc: 'Store and kitchen systems update status events.',
        active: ['store','kitchen','status'],
        edges: [['order','store'], ['store','kitchen'], ['kitchen','status']]
      },
      {
        title: 'Dispatch + driver tracking',
        desc: 'Dispatch assigns driver; tracking updates location/status.',
        active: ['dispatch','driver','tracking'],
        edges: [['status','dispatch'], ['dispatch','driver'], ['driver','tracking']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications update customer; support handles issues; analytics aggregates SLA.',
        active: ['notifications','support','analytics'],
        edges: [['tracking','notifications'], ['client','support'], ['order','analytics']]
      }
    ]
  },

  'starbucks-app': {
    title: 'Starbucks App',
    steps: [
      {
        title: 'Sign in + choose store',
        desc: 'User signs in and selects a store for pickup.',
        active: ['client','auth','profile','stores'],
        edges: [['client','auth'], ['auth','profile'], ['profile','stores']]
      },
      {
        title: 'Build order + checkout',
        desc: 'User builds cart from menu and checks out.',
        active: ['menu','cart','checkout','payments','orders'],
        edges: [['stores','menu'], ['menu','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Pickup + notifications',
        desc: 'Pickup flow and notifications update order readiness.',
        active: ['pickup','notifications'],
        edges: [['orders','pickup'], ['orders','notifications']]
      },
      {
        title: 'Loyalty + rewards',
        desc: 'Loyalty accrues points and rewards for redemptions.',
        active: ['loyalty','rewards'],
        edges: [['orders','loyalty'], ['loyalty','rewards']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks app engagement and order performance.',
        active: ['analytics'],
        edges: [['orders','analytics']]
      }
    ]
  },

  'kfc-app': {
    title: 'KFC App',
    steps: [
      {
        title: 'Browse menu + deals',
        desc: 'User browses stores, menu, and deals.',
        active: ['client','auth','stores','menu','deals'],
        edges: [['client','auth'], ['auth','stores'], ['stores','menu'], ['menu','deals']]
      },
      {
        title: 'Cart + checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['cart','checkout','payments','orders'],
        edges: [['deals','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Pickup/delivery + notifications',
        desc: 'Pickup or delivery; notifications update status.',
        active: ['pickup','delivery','notifications'],
        edges: [['orders','pickup'], ['orders','delivery'], ['orders','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics aggregates order metrics.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  'burger-king-app': {
    title: 'Burger King App',
    steps: [
      {
        title: 'Store + menu + deals',
        desc: 'User selects store, browses menu, and applies deals.',
        active: ['client','auth','profile','stores','menu','deals'],
        edges: [['client','auth'], ['auth','profile'], ['profile','stores'], ['stores','menu'], ['menu','deals']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['cart','checkout','payments','orders'],
        edges: [['deals','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Pickup/delivery + notifications',
        desc: 'Pickup or delivery; notifications update status.',
        active: ['pickup','delivery','notifications'],
        edges: [['orders','pickup'], ['orders','delivery'], ['orders','notifications']]
      },
      {
        title: 'Loyalty',
        desc: 'Loyalty accrues points/rewards for purchases.',
        active: ['loyalty'],
        edges: [['orders','loyalty']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics aggregates behavior and order performance.',
        active: ['analytics'],
        edges: [['orders','analytics']]
      }
    ]
  },

  'taco-bell-app': {
    title: 'Taco Bell App',
    steps: [
      {
        title: 'Browse + customize',
        desc: 'User browses menu and customizes items.',
        active: ['client','auth','stores','menu','customize'],
        edges: [['client','auth'], ['auth','stores'], ['stores','menu'], ['menu','customize']]
      },
      {
        title: 'Cart + checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['cart','checkout','payments','orders'],
        edges: [['customize','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Pickup/delivery + loyalty',
        desc: 'Pickup or delivery; loyalty accrues points; notifications update status.',
        active: ['pickup','delivery','loyalty','notifications'],
        edges: [['orders','pickup'], ['orders','delivery'], ['orders','loyalty'], ['orders','notifications']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics aggregates behavior and order performance.',
        active: ['analytics'],
        edges: [['orders','analytics']]
      }
    ]
  },

  'pizza-hut-app': {
    title: 'Pizza Hut App',
    steps: [
      {
        title: 'Browse + customize + deals',
        desc: 'User browses menu, customizes pizzas, and applies deals.',
        active: ['client','auth','stores','menu','customize','deals'],
        edges: [['client','auth'], ['auth','stores'], ['stores','menu'], ['menu','customize'], ['customize','deals']]
      },
      {
        title: 'Cart + checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['cart','checkout','payments','orders'],
        edges: [['deals','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Kitchen + delivery + notifications',
        desc: 'Kitchen prepares order; delivery fulfills; notifications update status.',
        active: ['kitchen','delivery','notifications'],
        edges: [['orders','kitchen'], ['kitchen','delivery'], ['orders','notifications']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics aggregates behavior and order performance.',
        active: ['analytics'],
        edges: [['orders','analytics']]
      }
    ]
  },

  'baskin-robbins-app': {
    title: 'Baskin Robbins App',
    steps: [
      {
        title: 'Browse + customize',
        desc: 'User browses menu and customizes ice cream/cakes.',
        active: ['client','auth','stores','menu','customize'],
        edges: [['client','auth'], ['auth','stores'], ['stores','menu'], ['menu','customize']]
      },
      {
        title: 'Cart + checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['cart','checkout','payments','orders'],
        edges: [['customize','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Pickup/delivery + offers + loyalty',
        desc: 'Fulfillment via pickup/delivery; offers and loyalty applied; notifications update status.',
        active: ['pickup','delivery','offers','loyalty','notifications'],
        edges: [['orders','pickup'], ['orders','delivery'], ['orders','offers'], ['offers','loyalty'], ['orders','notifications']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics aggregates behavior and order performance.',
        active: ['analytics'],
        edges: [['orders','analytics']]
      }
    ]
  },

  'dunkin-app': {
    title: 'Dunkin App',
    steps: [
      {
        title: 'Sign in + pick store',
        desc: 'User signs in and selects a nearby store for pickup.',
        active: ['client','auth','profile','stores'],
        edges: [['client','auth'], ['auth','profile'], ['profile','stores']]
      },
      {
        title: 'Build order + checkout',
        desc: 'User builds cart from menu and checks out.',
        active: ['menu','cart','checkout','payments','orders'],
        edges: [['stores','menu'], ['menu','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Pickup + notifications',
        desc: 'Pickup workflow and notifications update order readiness.',
        active: ['pickup','notifications'],
        edges: [['orders','pickup'], ['orders','notifications']]
      },
      {
        title: 'Loyalty + offers',
        desc: 'Loyalty accrues points; offers apply discounts and promos.',
        active: ['loyalty','offers'],
        edges: [['orders','loyalty'], ['offers','cart']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks engagement and order performance.',
        active: ['analytics'],
        edges: [['orders','analytics']]
      }
    ]
  },

  'blue-apron': {
    title: 'Blue Apron',
    steps: [
      {
        title: 'Choose plan + recipes',
        desc: 'User selects plan and recipes for the week.',
        active: ['client','auth','profile','plans','recipes'],
        edges: [['client','auth'], ['auth','profile'], ['profile','plans'], ['plans','recipes']]
      },
      {
        title: 'Cart + checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['cart','checkout','payments','orders'],
        edges: [['recipes','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Inventory + warehouse picking',
        desc: 'Inventory allocated and warehouse picks/assembles kits.',
        active: ['inventory','warehouse'],
        edges: [['orders','inventory'], ['inventory','warehouse']]
      },
      {
        title: 'Shipping + notifications',
        desc: 'Shipping fulfilled; notifications keep user updated.',
        active: ['shipping','notifications'],
        edges: [['warehouse','shipping'], ['orders','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support handles issues; analytics aggregates fulfillment KPIs.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  hellofresh: {
    title: 'HelloFresh',
    steps: [
      {
        title: 'Preferences + meal selection',
        desc: 'User sets preferences and selects meals for plan.',
        active: ['client','auth','profile','preferences','plans','recipes'],
        edges: [['client','auth'], ['auth','profile'], ['profile','preferences'], ['preferences','plans'], ['plans','recipes']]
      },
      {
        title: 'Cart + checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['cart','checkout','payments','orders'],
        edges: [['recipes','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Inventory + fulfillment + shipping',
        desc: 'Inventory allocated; fulfillment packs kits; shipping delivered.',
        active: ['inventory','fulfillment','shipping'],
        edges: [['orders','inventory'], ['inventory','fulfillment'], ['fulfillment','shipping']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications update status; support handles issues; analytics tracks KPIs.',
        active: ['notifications','support','analytics'],
        edges: [['orders','notifications'], ['client','support'], ['orders','analytics']]
      }
    ]
  },

  freshly: {
    title: 'Freshly',
    steps: [
      {
        title: 'Browse meals + checkout',
        desc: 'User browses prepared meals and checks out.',
        active: ['client','auth','profile','catalog','meals','cart','checkout'],
        edges: [['client','auth'], ['auth','profile'], ['profile','catalog'], ['catalog','meals'], ['meals','cart'], ['cart','checkout']]
      },
      {
        title: 'Payment + order creation',
        desc: 'Payment processed and order created.',
        active: ['payments','orders'],
        edges: [['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Kitchen + shipping',
        desc: 'Kitchen prepares meals; shipping delivers.',
        active: ['kitchen','inventory','shipping'],
        edges: [['orders','inventory'], ['inventory','kitchen'], ['kitchen','shipping']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications update status; support resolves issues; analytics tracks KPIs.',
        active: ['notifications','support','analytics'],
        edges: [['orders','notifications'], ['client','support'], ['orders','analytics']]
      }
    ]
  },

  gousto: {
    title: 'Gousto',
    steps: [
      {
        title: 'Choose recipes',
        desc: 'User selects weekly recipes and plan.',
        active: ['client','auth','profile','plans','recipes'],
        edges: [['client','auth'], ['auth','profile'], ['profile','plans'], ['plans','recipes']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['cart','checkout','payments','orders'],
        edges: [['recipes','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Inventory + fulfillment + shipping',
        desc: 'Inventory allocated; fulfillment packs kits; shipping delivered.',
        active: ['inventory','fulfillment','shipping'],
        edges: [['orders','inventory'], ['inventory','fulfillment'], ['fulfillment','shipping']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications update status; support handles issues; analytics tracks KPIs.',
        active: ['notifications','support','analytics'],
        edges: [['orders','notifications'], ['client','support'], ['orders','analytics']]
      }
    ]
  },

  everyplate: {
    title: 'EveryPlate',
    steps: [
      {
        title: 'Select plan + recipes',
        desc: 'User selects plan and recipes for the week.',
        active: ['client','auth','profile','plans','recipes'],
        edges: [['client','auth'], ['auth','profile'], ['profile','plans'], ['plans','recipes']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['cart','checkout','payments','orders'],
        edges: [['recipes','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Fulfillment + shipping',
        desc: 'Fulfillment packs kits from inventory; shipping delivers.',
        active: ['inventory','fulfillment','shipping'],
        edges: [['orders','inventory'], ['inventory','fulfillment'], ['fulfillment','shipping']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications update status; support resolves issues; analytics tracks KPIs.',
        active: ['notifications','support','analytics'],
        edges: [['orders','notifications'], ['client','support'], ['orders','analytics']]
      }
    ]
  },

  'home-chef': {
    title: 'Home Chef',
    steps: [
      {
        title: 'Select meals',
        desc: 'User selects meals/recipes and plan.',
        active: ['client','auth','profile','plans','recipes'],
        edges: [['client','auth'], ['auth','profile'], ['profile','plans'], ['plans','recipes']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout creates order and processes payment.',
        active: ['cart','checkout','payments','orders'],
        edges: [['recipes','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Fulfillment + shipping',
        desc: 'Fulfillment packs kits from inventory; shipping delivered.',
        active: ['inventory','fulfillment','shipping'],
        edges: [['orders','inventory'], ['inventory','fulfillment'], ['fulfillment','shipping']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications update status; support resolves issues; analytics tracks KPIs.',
        active: ['notifications','support','analytics'],
        edges: [['orders','notifications'], ['client','support'], ['orders','analytics']]
      }
    ]
  },

  rome2rio: {
    title: 'Rome2Rio',
    steps: [
      {
        title: 'Search routes',
        desc: 'User searches multi-modal routes between locations.',
        active: ['client','auth','search','routes'],
        edges: [['client','auth'], ['auth','search'], ['search','routes']]
      },
      {
        title: 'Provider availability + pricing',
        desc: 'Providers supply availability; pricing computed.',
        active: ['providers','availability','pricing'],
        edges: [['routes','providers'], ['providers','availability'], ['availability','pricing']]
      },
      {
        title: 'Booking + payment',
        desc: 'Booking created and payment processed.',
        active: ['booking','payments','tickets'],
        edges: [['pricing','booking'], ['booking','payments'], ['booking','tickets']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications deliver ticket/updates; support handles changes; analytics tracks funnel.',
        active: ['notifications','support','analytics'],
        edges: [['tickets','notifications'], ['client','support'], ['search','analytics']]
      }
    ]
  },

  omio: {
    title: 'Omio',
    steps: [
      {
        title: 'Search inventory',
        desc: 'User searches train/bus/flight inventory via providers.',
        active: ['client','auth','search','inventory','providers'],
        edges: [['client','auth'], ['auth','search'], ['search','inventory'], ['inventory','providers']]
      },
      {
        title: 'Pricing + booking',
        desc: 'Pricing computed and booking created.',
        active: ['pricing','booking','payments'],
        edges: [['providers','pricing'], ['pricing','booking'], ['booking','payments']]
      },
      {
        title: 'Tickets + account',
        desc: 'Tickets issued and stored in account.',
        active: ['tickets','account'],
        edges: [['booking','tickets'], ['tickets','account']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications deliver updates; support handles changes; analytics tracks funnel.',
        active: ['notifications','support','analytics'],
        edges: [['tickets','notifications'], ['client','support'], ['search','analytics']]
      }
    ]
  },

  agoda: {
    title: 'Agoda',
    steps: [
      {
        title: 'Search hotels',
        desc: 'User searches hotel inventory and availability via partners.',
        active: ['client','auth','search','inventory','partners'],
        edges: [['client','auth'], ['auth','search'], ['search','inventory'], ['inventory','partners']]
      },
      {
        title: 'Pricing + booking + payment',
        desc: 'Pricing computed; booking created; payment processed.',
        active: ['pricing','booking','payments'],
        edges: [['partners','pricing'], ['pricing','booking'], ['booking','payments']]
      },
      {
        title: 'Confirmation + notifications',
        desc: 'Confirmation generated and notifications sent.',
        active: ['confirmation','notifications'],
        edges: [['booking','confirmation'], ['confirmation','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support handles changes/cancellations; analytics tracks conversion.',
        active: ['support','analytics'],
        edges: [['client','support'], ['search','analytics']]
      }
    ]
  },

  hostelworld: {
    title: 'Hostelworld',
    steps: [
      {
        title: 'Search hostels',
        desc: 'User searches hostel inventory via host partners.',
        active: ['client','auth','search','inventory','hostels'],
        edges: [['client','auth'], ['auth','search'], ['search','inventory'], ['inventory','hostels']]
      },
      {
        title: 'Pricing + booking + payment',
        desc: 'Pricing computed; booking created; payment processed.',
        active: ['pricing','booking','payments'],
        edges: [['hostels','pricing'], ['pricing','booking'], ['booking','payments']]
      },
      {
        title: 'Confirmation + notifications',
        desc: 'Confirmation generated; notifications sent.',
        active: ['confirmation','notifications'],
        edges: [['booking','confirmation'], ['confirmation','notifications']]
      },
      {
        title: 'Messages + reviews',
        desc: 'Messaging with hostels and review submission after stay.',
        active: ['messages','reviews'],
        edges: [['booking','messages'], ['booking','reviews']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support handles changes; analytics tracks conversion and outcomes.',
        active: ['support','analytics'],
        edges: [['client','support'], ['search','analytics']]
      }
    ]
  },

  'trip-com': {
    title: 'Trip.com',
    steps: [
      {
        title: 'Search inventory',
        desc: 'User searches flights/hotels via partner inventory.',
        active: ['client','auth','search','inventory','partners'],
        edges: [['client','auth'], ['auth','search'], ['search','inventory'], ['inventory','partners']]
      },
      {
        title: 'Pricing + booking + payment',
        desc: 'Pricing computed; booking created; payment processed.',
        active: ['pricing','booking','payments'],
        edges: [['partners','pricing'], ['pricing','booking'], ['booking','payments']]
      },
      {
        title: 'Confirmation + itinerary',
        desc: 'Confirmation generated and itinerary assembled.',
        active: ['confirmation','itinerary'],
        edges: [['booking','confirmation'], ['confirmation','itinerary']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications deliver updates; support handles changes; analytics tracks funnel.',
        active: ['notifications','support','analytics'],
        edges: [['itinerary','notifications'], ['client','support'], ['search','analytics']]
      }
    ]
  },

  cleartrip: {
    title: 'Cleartrip',
    steps: [
      {
        title: 'Search flights',
        desc: 'User searches flight inventory via airline partners.',
        active: ['client','auth','search','inventory','airlines'],
        edges: [['client','auth'], ['auth','search'], ['search','inventory'], ['inventory','airlines']]
      },
      {
        title: 'Offers + pricing',
        desc: 'Offers applied and pricing computed.',
        active: ['offers','pricing'],
        edges: [['airlines','pricing'], ['offers','pricing']]
      },
      {
        title: 'Booking + payment + confirmation',
        desc: 'Booking created, payment processed, confirmation generated.',
        active: ['booking','payments','confirmation'],
        edges: [['pricing','booking'], ['booking','payments'], ['booking','confirmation']]
      },
      {
        title: 'Itinerary + notifications + support',
        desc: 'Itinerary delivered; notifications and support for changes.',
        active: ['itinerary','notifications','support'],
        edges: [['confirmation','itinerary'], ['itinerary','notifications'], ['client','support']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks conversion and booking outcomes.',
        active: ['analytics'],
        edges: [['search','analytics']]
      }
    ]
  },

  yatra: {
    title: 'Yatra',
    steps: [
      {
        title: 'Search inventory',
        desc: 'User searches flights/hotels via partner inventory.',
        active: ['client','auth','search','inventory','partners'],
        edges: [['client','auth'], ['auth','search'], ['search','inventory'], ['inventory','partners']]
      },
      {
        title: 'Pricing + booking + payment',
        desc: 'Pricing computed; booking created; payment processed.',
        active: ['pricing','booking','payments'],
        edges: [['partners','pricing'], ['pricing','booking'], ['booking','payments']]
      },
      {
        title: 'Confirmation + itinerary + notifications',
        desc: 'Confirmation generated; itinerary assembled; notifications sent.',
        active: ['confirmation','itinerary','notifications'],
        edges: [['booking','confirmation'], ['confirmation','itinerary'], ['itinerary','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support handles changes; analytics tracks funnel.',
        active: ['support','analytics'],
        edges: [['client','support'], ['search','analytics']]
      }
    ]
  },

  ixigo: {
    title: 'ixigo',
    steps: [
      {
        title: 'Search trains/buses/flights',
        desc: 'User searches inventory via providers.',
        active: ['client','auth','search','inventory','providers'],
        edges: [['client','auth'], ['auth','search'], ['search','inventory'], ['inventory','providers']]
      },
      {
        title: 'Pricing + booking + payment',
        desc: 'Pricing computed; booking created; payment processed.',
        active: ['pricing','booking','payments','tickets'],
        edges: [['providers','pricing'], ['pricing','booking'], ['booking','payments'], ['booking','tickets']]
      },
      {
        title: 'PNR + alerts',
        desc: 'PNR status tracked; alerts inform delays/changes.',
        active: ['pnr','alerts','notifications'],
        edges: [['tickets','pnr'], ['pnr','alerts'], ['alerts','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support handles changes; analytics tracks conversion and outcomes.',
        active: ['support','analytics'],
        edges: [['client','support'], ['search','analytics']]
      }
    ]
  },

  redbus: {
    title: 'RedBus',
    steps: [
      {
        title: 'Search routes + seats',
        desc: 'User searches operators and selects seats.',
        active: ['client','auth','search','inventory','operators','seats'],
        edges: [['client','auth'], ['auth','search'], ['search','inventory'], ['inventory','operators'], ['operators','seats']]
      },
      {
        title: 'Booking + payment',
        desc: 'Booking created and payment processed.',
        active: ['booking','payments','ticket'],
        edges: [['seats','booking'], ['booking','payments'], ['booking','ticket']]
      },
      {
        title: 'PNR + boarding + notifications',
        desc: 'PNR stored; boarding instructions and notifications sent.',
        active: ['pnr','boarding','notifications'],
        edges: [['ticket','pnr'], ['ticket','boarding'], ['ticket','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support handles changes; analytics tracks funnel.',
        active: ['support','analytics'],
        edges: [['client','support'], ['search','analytics']]
      }
    ]
  },

  flixbus: {
    title: 'FlixBus',
    steps: [
      {
        title: 'Search routes + seats',
        desc: 'User searches routes and selects seats.',
        active: ['client','auth','search','inventory','routes','seats'],
        edges: [['client','auth'], ['auth','search'], ['search','inventory'], ['inventory','routes'], ['routes','seats']]
      },
      {
        title: 'Booking + payment + ticket',
        desc: 'Booking created, payment processed, ticket issued.',
        active: ['booking','payments','ticket'],
        edges: [['seats','booking'], ['booking','payments'], ['booking','ticket']]
      },
      {
        title: 'Boarding + notifications',
        desc: 'Boarding instructions and notifications sent.',
        active: ['boarding','notifications'],
        edges: [['ticket','boarding'], ['ticket','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support handles changes; analytics tracks conversion.',
        active: ['support','analytics'],
        edges: [['client','support'], ['search','analytics']]
      }
    ]
  },

  'blablacar-daily': {
    title: 'BlaBlaCar Daily',
    steps: [
      {
        title: 'Profile + matching',
        desc: 'User profile used to match rides and commuters.',
        active: ['client','auth','profile','matches','rides'],
        edges: [['client','auth'], ['auth','profile'], ['profile','matches'], ['matches','rides']]
      },
      {
        title: 'Messaging + routing',
        desc: 'Messaging coordinates pickup; routing supports commute.',
        active: ['messaging','routing'],
        edges: [['rides','messaging'], ['rides','routing']]
      },
      {
        title: 'Payments + payouts',
        desc: 'Payments collected and payouts distributed to drivers.',
        active: ['payments','payouts'],
        edges: [['rides','payments'], ['payments','payouts']]
      },
      {
        title: 'Ratings + safety + notifications',
        desc: 'Ratings and safety systems manage trust; notifications update users.',
        active: ['ratings','safety','notifications'],
        edges: [['rides','ratings'], ['safety','support'], ['rides','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics tracks marketplace health.',
        active: ['support','analytics'],
        edges: [['client','support'], ['rides','analytics']]
      }
    ]
  },

  turo: {
    title: 'Turo',
    steps: [
      {
        title: 'Search listings',
        desc: 'User searches car listings and availability.',
        active: ['client','auth','search','listings','availability'],
        edges: [['client','auth'], ['auth','search'], ['search','listings'], ['listings','availability']]
      },
      {
        title: 'Pricing + booking + payment',
        desc: 'Pricing computed; booking created; payment processed.',
        active: ['pricing','booking','payments'],
        edges: [['availability','pricing'], ['pricing','booking'], ['booking','payments']]
      },
      {
        title: 'Insurance + handoff',
        desc: 'Insurance coverage selected and handoff coordinated.',
        active: ['insurance','handoff','notifications'],
        edges: [['booking','insurance'], ['booking','handoff'], ['handoff','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support handles issues; analytics tracks marketplace health.',
        active: ['support','analytics'],
        edges: [['client','support'], ['booking','analytics']]
      }
    ]
  },

  getaround: {
    title: 'Getaround',
    steps: [
      {
        title: 'Search + booking',
        desc: 'User searches listings and books an available car.',
        active: ['client','auth','search','listings','availability','booking'],
        edges: [['client','auth'], ['auth','search'], ['search','listings'], ['listings','availability'], ['availability','booking']]
      },
      {
        title: 'Payment + car access',
        desc: 'Payment processed and car access unlocked.',
        active: ['payments','access'],
        edges: [['booking','payments'], ['booking','access']]
      },
      {
        title: 'Telematics + analytics',
        desc: 'Telematics streams trip data; analytics aggregates usage.',
        active: ['telematics','analytics'],
        edges: [['access','telematics'], ['telematics','analytics']]
      },
      {
        title: 'Notifications + support',
        desc: 'Notifications for trip events; support resolves issues.',
        active: ['notifications','support'],
        edges: [['booking','notifications'], ['client','support']]
      }
    ]
  },

  zipcar: {
    title: 'Zipcar',
    steps: [
      {
        title: 'Search fleet + availability',
        desc: 'User searches nearby cars and checks availability.',
        active: ['client','auth','profile','search','fleet','availability'],
        edges: [['client','auth'], ['auth','profile'], ['profile','search'], ['search','fleet'], ['fleet','availability']]
      },
      {
        title: 'Booking + payment',
        desc: 'Booking created and payment authorized.',
        active: ['booking','payments','billing'],
        edges: [['availability','booking'], ['booking','payments'], ['booking','billing']]
      },
      {
        title: 'Unlock + telematics',
        desc: 'Car access unlocks; telematics streams trip data.',
        active: ['access','telematics','notifications'],
        edges: [['booking','access'], ['access','telematics'], ['booking','notifications']]
      },
      {
        title: 'Billing + analytics + support',
        desc: 'Billing finalizes charges; analytics monitors fleet; support handles issues.',
        active: ['billing','analytics','support'],
        edges: [['telematics','billing'], ['booking','analytics'], ['client','support']]
      }
    ]
  },

  lime: {
    title: 'Lime',
    steps: [
      {
        title: 'Find scooter on map',
        desc: 'User authenticates and finds nearby scooter on map.',
        active: ['client','auth','map','fleet','availability'],
        edges: [['client','auth'], ['auth','map'], ['map','fleet'], ['fleet','availability']]
      },
      {
        title: 'Unlock + ride telemetry',
        desc: 'Unlock starts ride; telematics streams telemetry.',
        active: ['unlock','ride','telematics'],
        edges: [['availability','unlock'], ['unlock','ride'], ['ride','telematics']]
      },
      {
        title: 'Pricing + payment',
        desc: 'Pricing computed and payment processed.',
        active: ['pricing','payments'],
        edges: [['ride','pricing'], ['pricing','payments']]
      },
      {
        title: 'Safety + notifications + analytics',
        desc: 'Safety checks and support; notifications for rules; analytics tracks usage.',
        active: ['safety','support','notifications','analytics'],
        edges: [['telematics','safety'], ['safety','support'], ['ride','notifications'], ['ride','analytics']]
      }
    ]
  },

  bird: {
    title: 'Bird',
    steps: [
      {
        title: 'Discover + unlock',
        desc: 'User finds scooter and unlocks it.',
        active: ['client','auth','map','fleet','availability','unlock'],
        edges: [['client','auth'], ['auth','map'], ['map','fleet'], ['fleet','availability'], ['availability','unlock']]
      },
      {
        title: 'Ride + telematics',
        desc: 'Ride session tracked via telematics.',
        active: ['ride','telematics'],
        edges: [['unlock','ride'], ['ride','telematics']]
      },
      {
        title: 'Pricing + payment',
        desc: 'Pricing computed and payment processed.',
        active: ['pricing','payments'],
        edges: [['ride','pricing'], ['pricing','payments']]
      },
      {
        title: 'Safety + support + analytics',
        desc: 'Safety policies and support workflows; analytics aggregates usage.',
        active: ['safety','support','analytics','notifications'],
        edges: [['telematics','safety'], ['safety','support'], ['ride','analytics'], ['ride','notifications']]
      }
    ]
  },

  tier: {
    title: 'Tier',
    steps: [
      {
        title: 'Find vehicle + unlock',
        desc: 'User finds vehicle and unlocks it.',
        active: ['client','auth','map','fleet','availability','unlock'],
        edges: [['client','auth'], ['auth','map'], ['map','fleet'], ['fleet','availability'], ['availability','unlock']]
      },
      {
        title: 'Ride + telemetry',
        desc: 'Ride tracked via telematics.',
        active: ['ride','telematics'],
        edges: [['unlock','ride'], ['ride','telematics']]
      },
      {
        title: 'Pricing + payment',
        desc: 'Pricing computed and payment processed.',
        active: ['pricing','payments'],
        edges: [['ride','pricing'], ['pricing','payments']]
      },
      {
        title: 'Safety + notifications + analytics',
        desc: 'Safety and support workflows; notifications and analytics.',
        active: ['safety','support','notifications','analytics'],
        edges: [['telematics','safety'], ['safety','support'], ['ride','notifications'], ['ride','analytics']]
      }
    ]
  },

  bolt: {
    title: 'Bolt',
    steps: [
      {
        title: 'Request ride',
        desc: 'Rider signs in and requests a ride.',
        active: ['client','auth','request','pricing'],
        edges: [['client','auth'], ['auth','request'], ['request','pricing']]
      },
      {
        title: 'Matching + dispatch',
        desc: 'Matching assigns a driver; routing computed.',
        active: ['matching','drivers','routing'],
        edges: [['request','matching'], ['matching','drivers'], ['drivers','routing']]
      },
      {
        title: 'Tracking + payment',
        desc: 'Trip tracked; payment processed at end.',
        active: ['tracking','payments','notifications'],
        edges: [['drivers','tracking'], ['pricing','payments'], ['tracking','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics tracks marketplace health.',
        active: ['support','analytics'],
        edges: [['client','support'], ['tracking','analytics']]
      }
    ]
  },

  careem: {
    title: 'Careem',
    steps: [
      {
        title: 'Request ride',
        desc: 'Rider signs in and requests ride with price estimate.',
        active: ['client','auth','request','pricing'],
        edges: [['client','auth'], ['auth','request'], ['request','pricing']]
      },
      {
        title: 'Matching captains + routing',
        desc: 'Matching assigns captain; routing computed and tracked.',
        active: ['matching','captains','routing','tracking'],
        edges: [['request','matching'], ['matching','captains'], ['captains','tracking'], ['routing','tracking']]
      },
      {
        title: 'Payment + notifications',
        desc: 'Payment processed; notifications update rider.',
        active: ['payments','notifications'],
        edges: [['pricing','payments'], ['tracking','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics monitors performance.',
        active: ['support','analytics'],
        edges: [['client','support'], ['tracking','analytics']]
      }
    ]
  },

  'free-now': {
    title: 'Free Now',
    steps: [
      {
        title: 'Request taxi',
        desc: 'User requests taxi with pricing estimate.',
        active: ['client','auth','request','pricing'],
        edges: [['client','auth'], ['auth','request'], ['request','pricing']]
      },
      {
        title: 'Dispatch taxis',
        desc: 'Dispatch assigns taxi and begins tracking.',
        active: ['dispatch','taxis','tracking'],
        edges: [['request','dispatch'], ['dispatch','taxis'], ['taxis','tracking']]
      },
      {
        title: 'Payment + notifications',
        desc: 'Payment processed and notifications update ride status.',
        active: ['payments','notifications'],
        edges: [['pricing','payments'], ['tracking','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics tracks dispatch/ETA metrics.',
        active: ['support','analytics'],
        edges: [['client','support'], ['tracking','analytics']]
      }
    ]
  },

  grabtaxi: {
    title: 'GrabTaxi',
    steps: [
      {
        title: 'Request ride',
        desc: 'Rider requests a taxi/ride with price estimate.',
        active: ['client','auth','request','pricing'],
        edges: [['client','auth'], ['auth','request'], ['request','pricing']]
      },
      {
        title: 'Matching + routing',
        desc: 'Matching assigns driver; routing computed and tracked.',
        active: ['matching','drivers','routing','tracking'],
        edges: [['request','matching'], ['matching','drivers'], ['drivers','tracking'], ['routing','tracking']]
      },
      {
        title: 'Payment + notifications',
        desc: 'Payment processed; notifications update rider.',
        active: ['payments','notifications'],
        edges: [['pricing','payments'], ['tracking','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics tracks marketplace health.',
        active: ['support','analytics'],
        edges: [['client','support'], ['tracking','analytics']]
      }
    ]
  },

  gojek: {
    title: 'Gojek',
    steps: [
      {
        title: 'Choose service + request',
        desc: 'User picks service and requests a driver.',
        active: ['client','auth','services','request'],
        edges: [['client','auth'], ['auth','services'], ['services','request']]
      },
      {
        title: 'Matching + tracking',
        desc: 'Matching assigns driver; tracking updates.',
        active: ['matching','drivers','routing','tracking'],
        edges: [['request','matching'], ['matching','drivers'], ['drivers','tracking'], ['routing','tracking']]
      },
      {
        title: 'Wallet + payments',
        desc: 'Wallet handles payments for services.',
        active: ['wallet','payments'],
        edges: [['wallet','payments']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications update; support resolves issues; analytics monitors platform.',
        active: ['notifications','support','analytics'],
        edges: [['tracking','notifications'], ['client','support'], ['tracking','analytics']]
      }
    ]
  },

  moovit: {
    title: 'Moovit',
    steps: [
      {
        title: 'Plan trip',
        desc: 'User plans trip using transit data and routes.',
        active: ['client','auth','map','transit','routes'],
        edges: [['client','auth'], ['auth','map'], ['map','transit'], ['transit','routes']]
      },
      {
        title: 'Realtime updates + alerts',
        desc: 'Realtime feeds and alerts inform delays and service changes.',
        active: ['realtime','alerts','notifications'],
        edges: [['routes','realtime'], ['realtime','alerts'], ['alerts','notifications']]
      },
      {
        title: 'Tickets + payments',
        desc: 'Tickets purchased via payments provider.',
        active: ['tickets','payments'],
        edges: [['tickets','payments']]
      },
      {
        title: 'Ads + analytics',
        desc: 'Ads monetization and analytics for engagement/route performance.',
        active: ['ads','analytics'],
        edges: [['ads','analytics'], ['routes','analytics']]
      }
    ]
  },

  citymapper: {
    title: 'Citymapper',
    steps: [
      {
        title: 'Plan route',
        desc: 'User plans a route using transit data and maps.',
        active: ['client','auth','map','transit','routes'],
        edges: [['client','auth'], ['auth','map'], ['map','transit'], ['transit','routes']]
      },
      {
        title: 'Realtime + alerts',
        desc: 'Realtime feeds and alerts update route decisions.',
        active: ['realtime','alerts','notifications'],
        edges: [['routes','realtime'], ['realtime','alerts'], ['alerts','notifications']]
      },
      {
        title: 'Tickets + payments',
        desc: 'Tickets purchased via payments provider.',
        active: ['tickets','payments'],
        edges: [['tickets','payments']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics aggregates route and engagement metrics.',
        active: ['analytics'],
        edges: [['routes','analytics']]
      }
    ]
  },

  'transit-app': {
    title: 'Transit App',
    steps: [
      {
        title: 'Plan trip + crowd signals',
        desc: 'Trip planned with crowd-sourced signals and schedules.',
        active: ['client','auth','map','transit','routes','crowd'],
        edges: [['client','auth'], ['auth','map'], ['map','transit'], ['transit','routes'], ['crowd','alerts']]
      },
      {
        title: 'Realtime + alerts',
        desc: 'Realtime updates and alerts drive rerouting decisions.',
        active: ['realtime','alerts','notifications'],
        edges: [['routes','realtime'], ['realtime','alerts'], ['alerts','notifications']]
      },
      {
        title: 'Tickets + payments',
        desc: 'Tickets purchased via payments provider.',
        active: ['tickets','payments'],
        edges: [['tickets','payments']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks engagement and trip outcomes.',
        active: ['analytics'],
        edges: [['routes','analytics']]
      }
    ]
  },

  'google-trips-legacy': {
    title: 'Google Trips (legacy)',
    steps: [
      {
        title: 'Import reservations',
        desc: 'Imports pull reservations from Gmail and Calendar.',
        active: ['client','auth','imports','gmail','calendar','privacy'],
        edges: [['client','auth'], ['auth','imports'], ['imports','gmail'], ['imports','calendar'], ['privacy','imports']]
      },
      {
        title: 'Build itinerary + offline',
        desc: 'Itinerary assembled and cached offline.',
        active: ['itinerary','reservations','offline'],
        edges: [['gmail','reservations'], ['calendar','itinerary'], ['itinerary','offline']]
      },
      {
        title: 'Maps + recommendations',
        desc: 'Maps and recommendations enrich the itinerary.',
        active: ['maps','recommendations'],
        edges: [['itinerary','maps'], ['itinerary','recommendations']]
      },
      {
        title: 'Notifications + analytics',
        desc: 'Notifications for upcoming items; analytics tracks usage.',
        active: ['notifications','analytics'],
        edges: [['recommendations','notifications'], ['itinerary','analytics']]
      }
    ]
  },

  roadtrippers: {
    title: 'Roadtrippers',
    steps: [
      {
        title: 'Plan road trip',
        desc: 'User plans trip in planner with maps/places.',
        active: ['client','auth','planner','maps','places','routes'],
        edges: [['client','auth'], ['auth','planner'], ['planner','maps'], ['maps','places'], ['places','routes']]
      },
      {
        title: 'Share route',
        desc: 'Sharing links route with friends or collaborators.',
        active: ['shared'],
        edges: [['routes','shared']]
      },
      {
        title: 'Bookings + payments',
        desc: 'Bookings routed to partners; payments processed.',
        active: ['bookings','partners','payments'],
        edges: [['routes','bookings'], ['bookings','partners'], ['bookings','payments']]
      },
      {
        title: 'Notifications + analytics',
        desc: 'Notifications for itinerary events; analytics tracks conversion.',
        active: ['notifications','analytics'],
        edges: [['bookings','notifications'], ['routes','analytics']]
      }
    ]
  },

  parkmobile: {
    title: 'ParkMobile',
    steps: [
      {
        title: 'Find parking location',
        desc: 'User finds location/zone on map and starts session.',
        active: ['client','auth','map','locations','sessions'],
        edges: [['client','auth'], ['auth','map'], ['map','locations'], ['locations','sessions']]
      },
      {
        title: 'Pay + receipt',
        desc: 'Payment processed and receipt stored.',
        active: ['payments','receipts'],
        edges: [['sessions','payments'], ['payments','receipts']]
      },
      {
        title: 'Meter + enforcement',
        desc: 'Meter/enforcement systems validate session.',
        active: ['meters','enforcement'],
        edges: [['sessions','meters'], ['sessions','enforcement']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications for expiry; support handles disputes; analytics tracks usage.',
        active: ['notifications','support','analytics'],
        edges: [['sessions','notifications'], ['client','support'], ['sessions','analytics']]
      }
    ]
  },

  spothero: {
    title: 'SpotHero',
    steps: [
      {
        title: 'Search inventory',
        desc: 'User searches parking inventory from garages.',
        active: ['client','auth','search','inventory','garages'],
        edges: [['client','auth'], ['auth','search'], ['search','inventory'], ['inventory','garages']]
      },
      {
        title: 'Pricing + booking + payment',
        desc: 'Pricing computed; booking created; payment processed.',
        active: ['pricing','booking','payments'],
        edges: [['garages','pricing'], ['pricing','booking'], ['booking','payments']]
      },
      {
        title: 'QR pass + access',
        desc: 'QR pass issued and used for garage access.',
        active: ['qr','access','notifications'],
        edges: [['booking','qr'], ['qr','access'], ['booking','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics tracks conversion.',
        active: ['support','analytics'],
        edges: [['client','support'], ['booking','analytics']]
      }
    ]
  },

  'openai-playground': {
    title: 'OpenAI Playground',
    steps: [
      {
        title: 'Auth + select model',
        desc: 'User authenticates, selects project and model, configures prompt.',
        active: ['client','auth','projects','prompts','models'],
        edges: [['client','auth'], ['auth','projects'], ['projects','prompts'], ['prompts','models']]
      },
      {
        title: 'Run inference',
        desc: 'Inference runs with optional tools and files.',
        active: ['inference','tools','files'],
        edges: [['models','inference'], ['tools','inference'], ['files','inference']]
      },
      {
        title: 'Logging + analytics',
        desc: 'Runs logged; analytics summarizes usage.',
        active: ['logging','analytics'],
        edges: [['inference','logging'], ['logging','analytics']]
      },
      {
        title: 'Safety + rate limits + billing',
        desc: 'Safety policies and rate limits enforced; billing tracks cost.',
        active: ['safety','rateLimits','billing'],
        edges: [['inference','safety'], ['rateLimits','inference'], ['billing','analytics']]
      }
    ]
  },

  'anthropic-claude': {
    title: 'Anthropic Claude',
    steps: [
      {
        title: 'Workspace + project setup',
        desc: 'User authenticates, chooses workspace/project, and sets prompt.',
        active: ['client','auth','workspaces','projects','prompts'],
        edges: [['client','auth'], ['auth','workspaces'], ['workspaces','projects'], ['projects','prompts']]
      },
      {
        title: 'Model inference + tools',
        desc: 'Inference runs; tools and files augment context.',
        active: ['models','inference','tools','files'],
        edges: [['prompts','models'], ['models','inference'], ['tools','inference'], ['files','inference']]
      },
      {
        title: 'Logging + analytics',
        desc: 'Requests logged; analytics summarizes usage.',
        active: ['logging','analytics'],
        edges: [['inference','logging'], ['logging','analytics']]
      },
      {
        title: 'Safety + rate limits + billing',
        desc: 'Safety policies and rate limits enforced; billing tracks usage.',
        active: ['safety','rateLimits','billing'],
        edges: [['inference','safety'], ['rateLimits','inference'], ['billing','analytics']]
      }
    ]
  },

  'perplexity-ai': {
    title: 'Perplexity AI',
    steps: [
      {
        title: 'Ask question',
        desc: 'User submits query; retrieval pulls web sources.',
        active: ['client','auth','query','retrieval','web'],
        edges: [['client','auth'], ['auth','query'], ['query','retrieval'], ['retrieval','web']]
      },
      {
        title: 'Rank + answer + citations',
        desc: 'Ranking selects sources; answer generated with citations.',
        active: ['ranking','answer','citations'],
        edges: [['web','ranking'], ['ranking','answer'], ['answer','citations']]
      },
      {
        title: 'History + subscriptions',
        desc: 'History saved; subscription tier gates features.',
        active: ['history','subscriptions','billing'],
        edges: [['answer','history'], ['subscriptions','billing']]
      },
      {
        title: 'Safety + analytics',
        desc: 'Safety checks and analytics monitor outcomes.',
        active: ['safety','analytics'],
        edges: [['answer','safety'], ['answer','analytics']]
      }
    ]
  },

  poe: {
    title: 'Poe',
    steps: [
      {
        title: 'Pick bot + start chat',
        desc: 'User authenticates, picks a bot from marketplace, and starts chat.',
        active: ['client','auth','bots','marketplace','chat'],
        edges: [['client','auth'], ['auth','bots'], ['bots','marketplace'], ['marketplace','chat']]
      },
      {
        title: 'Provider routing + inference',
        desc: 'Routing selects provider; inference executes and returns responses.',
        active: ['routing','providers','inference'],
        edges: [['chat','routing'], ['routing','providers'], ['providers','inference']]
      },
      {
        title: 'Safety + notifications',
        desc: 'Safety moderation applied; notifications for updates and mentions.',
        active: ['safety','notifications'],
        edges: [['inference','safety'], ['inference','notifications']]
      },
      {
        title: 'Subscriptions + billing + analytics',
        desc: 'Subscription billed; analytics tracks usage and bot performance.',
        active: ['subscriptions','billing','analytics'],
        edges: [['subscriptions','billing'], ['inference','analytics']]
      }
    ]
  },

  'character-ai': {
    title: 'Character AI',
    steps: [
      {
        title: 'Pick character + start chat',
        desc: 'User signs in, browses characters, and starts a chat.',
        active: ['client','auth','characters','chat'],
        edges: [['client','auth'], ['auth','characters'], ['characters','chat']]
      },
      {
        title: 'Moderation + memory',
        desc: 'Moderation filters content; memory stores conversation context.',
        active: ['moderation','memory'],
        edges: [['chat','moderation'], ['chat','memory'], ['memory','chat']]
      },
      {
        title: 'Recommendations + notifications',
        desc: 'Recommendations suggest next characters; notifications re-engage.',
        active: ['recommendations','notifications'],
        edges: [['chat','recommendations'], ['recommendations','notifications']]
      },
      {
        title: 'Subscriptions + billing + analytics',
        desc: 'Subscription billed; analytics tracks engagement and retention.',
        active: ['subscriptions','billing','analytics'],
        edges: [['subscriptions','billing'], ['chat','analytics']]
      }
    ]
  },

  replit: {
    title: 'Replit',
    steps: [
      {
        title: 'Create repl',
        desc: 'User authenticates, selects workspace, and creates a repl.',
        active: ['client','auth','workspaces','repls','editor'],
        edges: [['client','auth'], ['auth','workspaces'], ['workspaces','repls'], ['repls','editor']]
      },
      {
        title: 'Install deps + run',
        desc: 'Dependencies installed; runtime executes in containers.',
        active: ['deps','runtime','containers','logs'],
        edges: [['repls','deps'], ['deps','runtime'], ['runtime','containers'], ['runtime','logs']]
      },
      {
        title: 'Deploy + hosting',
        desc: 'Deploy builds and publishes to hosting.',
        active: ['deploy','hosting'],
        edges: [['containers','deploy'], ['deploy','hosting']]
      },
      {
        title: 'Secrets + billing + analytics',
        desc: 'Secrets used for env vars; billing and analytics track usage.',
        active: ['secrets','billing','analytics'],
        edges: [['secrets','containers'], ['billing','analytics'], ['logs','analytics']]
      }
    ]
  },

  codesandbox: {
    title: 'CodeSandbox',
    steps: [
      {
        title: 'Create sandbox',
        desc: 'User authenticates and creates a sandbox from templates/projects.',
        active: ['client','auth','templates','projects','sandboxes','editor'],
        edges: [['client','auth'], ['auth','templates'], ['templates','projects'], ['projects','sandboxes'], ['sandboxes','editor']]
      },
      {
        title: 'Run container + preview',
        desc: 'Dependencies installed; container runs; preview updates.',
        active: ['deps','containers','preview'],
        edges: [['sandboxes','deps'], ['deps','containers'], ['containers','preview']]
      },
      {
        title: 'Collaboration',
        desc: 'Real-time collaboration and sharing in sandbox.',
        active: ['collab'],
        edges: [['sandboxes','collab']]
      },
      {
        title: 'Deploy + hosting + analytics',
        desc: 'Deploy publishes to hosting; analytics tracks usage; billing for paid tiers.',
        active: ['deploy','hosting','analytics','billing'],
        edges: [['containers','deploy'], ['deploy','hosting'], ['projects','analytics'], ['billing','analytics']]
      }
    ]
  },

  stackblitz: {
    title: 'StackBlitz',
    steps: [
      {
        title: 'Open project',
        desc: 'User authenticates and opens project/workspace in editor.',
        active: ['client','auth','projects','workspaces','editor'],
        edges: [['client','auth'], ['auth','projects'], ['projects','workspaces'], ['workspaces','editor']]
      },
      {
        title: 'WebContainers run + preview',
        desc: 'Deps resolved; WebContainers run app; preview updates.',
        active: ['deps','webcontainers','preview'],
        edges: [['workspaces','deps'], ['deps','webcontainers'], ['webcontainers','preview']]
      },
      {
        title: 'Deploy + hosting',
        desc: 'Deploy publishes to hosting.',
        active: ['deploy','hosting'],
        edges: [['webcontainers','deploy'], ['deploy','hosting']]
      },
      {
        title: 'Collab + billing + analytics',
        desc: 'Collaboration; billing and analytics track usage.',
        active: ['collab','billing','analytics'],
        edges: [['workspaces','collab'], ['billing','analytics'], ['projects','analytics']]
      }
    ]
  },

  glitch: {
    title: 'Glitch',
    steps: [
      {
        title: 'Create project',
        desc: 'User authenticates and creates a project in editor.',
        active: ['client','auth','projects','editor'],
        edges: [['client','auth'], ['auth','projects'], ['projects','editor']]
      },
      {
        title: 'Run app + assets',
        desc: 'Runtime executes in containers; assets served.',
        active: ['runtime','containers','assets'],
        edges: [['editor','runtime'], ['runtime','containers'], ['assets','hosting']]
      },
      {
        title: 'Deploy + hosting',
        desc: 'Deploy publishes to hosting.',
        active: ['deploy','hosting'],
        edges: [['deploy','hosting']]
      },
      {
        title: 'Community + billing + analytics',
        desc: 'Community features; billing and analytics track usage.',
        active: ['community','billing','analytics'],
        edges: [['projects','community'], ['billing','analytics'], ['projects','analytics']]
      }
    ]
  },

  codespaces: {
    title: 'Codespaces',
    steps: [
      {
        title: 'Launch codespace',
        desc: 'User authenticates and launches codespace from repo.',
        active: ['client','auth','repos','codespaces','editor'],
        edges: [['client','auth'], ['auth','repos'], ['repos','codespaces'], ['codespaces','editor']]
      },
      {
        title: 'Build devcontainer + secrets',
        desc: 'Devcontainer config builds container; secrets injected.',
        active: ['devcontainers','containers','secrets'],
        edges: [['codespaces','devcontainers'], ['devcontainers','containers'], ['secrets','containers']]
      },
      {
        title: 'Ports + preview',
        desc: 'Ports forwarded and preview accessed.',
        active: ['ports','preview'],
        edges: [['containers','ports'], ['ports','preview']]
      },
      {
        title: 'Logs + billing + analytics',
        desc: 'Logs collected; billing and analytics track usage.',
        active: ['logs','billing','analytics'],
        edges: [['containers','logs'], ['logs','analytics'], ['billing','analytics']]
      }
    ]
  },

  sourcegraph: {
    title: 'Sourcegraph',
    steps: [
      {
        title: 'Sync repos + index',
        desc: 'Repos synced; indexing builds searchable code graph.',
        active: ['client','auth','repos','indexing'],
        edges: [['client','auth'], ['auth','repos'], ['repos','indexing']]
      },
      {
        title: 'Search + code intel',
        desc: 'Search queries and code intelligence results.',
        active: ['search','codeintel'],
        edges: [['indexing','search'], ['indexing','codeintel']]
      },
      {
        title: 'Embeddings + assistant',
        desc: 'Embeddings power semantic search; assistant answers questions.',
        active: ['embeddings','assistant'],
        edges: [['indexing','embeddings'], ['search','assistant']]
      },
      {
        title: 'Audit + security + analytics',
        desc: 'Audit logs and security controls; analytics tracks usage; billing for tiers.',
        active: ['audit','security','analytics','billing'],
        edges: [['audit','security'], ['assistant','analytics'], ['billing','analytics']]
      }
    ]
  },

  sentry: {
    title: 'Sentry',
    steps: [
      {
        title: 'Send events',
        desc: 'SDKs send events to ingest and storage.',
        active: ['sdks','ingest','events'],
        edges: [['sdks','ingest'], ['ingest','events']]
      },
      {
        title: 'Issues + releases',
        desc: 'Events grouped into issues; releases correlate deploys.',
        active: ['issues','releases'],
        edges: [['events','issues'], ['releases','issues']]
      },
      {
        title: 'Alerts + integrations',
        desc: 'Alerts trigger and route to integrations.',
        active: ['alerts','integrations','dashboards'],
        edges: [['issues','alerts'], ['alerts','integrations'], ['events','dashboards']]
      },
      {
        title: 'Analytics + billing',
        desc: 'Analytics tracks usage and team health; billing for quota.',
        active: ['analytics','billing'],
        edges: [['dashboards','analytics'], ['billing','analytics']]
      }
    ]
  },

  datadog: {
    title: 'Datadog',
    steps: [
      {
        title: 'Collect telemetry',
        desc: 'Agents collect metrics/logs/traces and send to ingest.',
        active: ['agents','metrics','logs','traces','ingest'],
        edges: [['agents','ingest'], ['agents','metrics'], ['agents','logs'], ['agents','traces']]
      },
      {
        title: 'Store + dashboards',
        desc: 'Ingest stores telemetry; dashboards visualize.',
        active: ['storage','dashboards'],
        edges: [['ingest','storage'], ['storage','dashboards']]
      },
      {
        title: 'Alerts + integrations',
        desc: 'Alerts trigger and route to integrations.',
        active: ['alerts','integrations'],
        edges: [['dashboards','alerts'], ['alerts','integrations']]
      },
      {
        title: 'Analytics + billing',
        desc: 'Analytics summarizes usage; billing tracks consumption.',
        active: ['analytics','billing'],
        edges: [['storage','analytics'], ['billing','analytics']]
      }
    ]
  },

  'new-relic': {
    title: 'New Relic',
    steps: [
      {
        title: 'Collect telemetry',
        desc: 'Agents and telemetry pipeline collect metrics/logs/traces.',
        active: ['agents','telemetry','metrics','logs','traces','ingest'],
        edges: [['agents','ingest'], ['telemetry','metrics'], ['telemetry','logs'], ['telemetry','traces']]
      },
      {
        title: 'Store + dashboards',
        desc: 'Ingest stores telemetry; dashboards visualize.',
        active: ['storage','dashboards'],
        edges: [['ingest','storage'], ['storage','dashboards']]
      },
      {
        title: 'Alerts + integrations',
        desc: 'Alerts trigger and route to integrations.',
        active: ['alerts','integrations'],
        edges: [['dashboards','alerts'], ['alerts','integrations']]
      },
      {
        title: 'Analytics + billing',
        desc: 'Analytics summarizes usage; billing tracks consumption.',
        active: ['analytics','billing'],
        edges: [['storage','analytics'], ['billing','analytics']]
      }
    ]
  },

  logrocket: {
    title: 'LogRocket',
    steps: [
      {
        title: 'Capture session',
        desc: 'SDK captures session replay, errors, and performance signals.',
        active: ['client','auth','sdk','ingest','sessions'],
        edges: [['client','auth'], ['sdk','ingest'], ['ingest','sessions']]
      },
      {
        title: 'Replay + errors + perf',
        desc: 'Sessions analyzed into replay, errors, and performance views.',
        active: ['replay','errors','perf'],
        edges: [['sessions','replay'], ['sessions','errors'], ['sessions','perf']]
      },
      {
        title: 'Alerts + integrations',
        desc: 'Alerts fire and route to integrations.',
        active: ['alerts','integrations'],
        edges: [['errors','alerts'], ['alerts','integrations']]
      },
      {
        title: 'Dashboards + analytics + billing',
        desc: 'Dashboards and analytics summarize; billing tracks usage.',
        active: ['dashboards','analytics','billing'],
        edges: [['replay','dashboards'], ['dashboards','analytics'], ['billing','analytics']]
      }
    ]
  },

  supabase: {
    title: 'Supabase',
    steps: [
      {
        title: 'Create project',
        desc: 'User authenticates and creates a project.',
        active: ['client','auth','projects','admin'],
        edges: [['client','auth'], ['auth','projects'], ['projects','admin']]
      },
      {
        title: 'Use API + database',
        desc: 'API reads/writes database and storage.',
        active: ['api','db','storage'],
        edges: [['api','db'], ['api','storage']]
      },
      {
        title: 'Realtime + edge functions',
        desc: 'Realtime updates and edge/functions compute.',
        active: ['realtime','edge','functions'],
        edges: [['db','realtime'], ['edge','functions']]
      },
      {
        title: 'Security + logs + billing',
        desc: 'Security policies, logs/analytics, and billing for usage.',
        active: ['security','logs','analytics','billing'],
        edges: [['functions','logs'], ['logs','analytics'], ['billing','analytics']]
      }
    ]
  },

  planetscale: {
    title: 'PlanetScale',
    steps: [
      {
        title: 'Create DB + branches',
        desc: 'Org creates DB and branches for safe schema changes.',
        active: ['client','auth','orgs','db','branches'],
        edges: [['client','auth'], ['auth','orgs'], ['orgs','db'], ['db','branches']]
      },
      {
        title: 'Migrations + backups',
        desc: 'Schema migrations applied; backups maintained.',
        active: ['schema','migrations','backups'],
        edges: [['schema','migrations'], ['db','backups'], ['migrations','db']]
      },
      {
        title: 'Connect + query + observability',
        desc: 'Connectors run queries and observability tracks performance.',
        active: ['connectors','query','observability'],
        edges: [['connectors','query'], ['query','observability']]
      },
      {
        title: 'Security + billing',
        desc: 'Security policies and billing for usage.',
        active: ['security','billing'],
        edges: [['security','db'], ['billing','observability']]
      }
    ]
  },

  railway: {
    title: 'Railway',
    steps: [
      {
        title: 'Connect repo + build',
        desc: 'Repo connected; builds run and artifacts produced.',
        active: ['client','auth','projects','repos','builds'],
        edges: [['client','auth'], ['auth','projects'], ['projects','repos'], ['repos','builds']]
      },
      {
        title: 'Deploy to runtime',
        desc: 'Deploy publishes build to runtime services.',
        active: ['deploy','runtime','services'],
        edges: [['builds','deploy'], ['deploy','runtime'], ['deploy','services']]
      },
      {
        title: 'DB + secrets',
        desc: 'DB provisioned and secrets injected.',
        active: ['db','secrets'],
        edges: [['services','db'], ['secrets','runtime']]
      },
      {
        title: 'Logs + metrics + alerts + billing',
        desc: 'Observability and billing/alerts for deployments.',
        active: ['logs','metrics','alerts','billing'],
        edges: [['runtime','logs'], ['runtime','metrics'], ['alerts','client'], ['billing','projects']]
      }
    ]
  },

  'fly-io': {
    title: 'Fly.io',
    steps: [
      {
        title: 'Deploy app to regions',
        desc: 'App deployed and placed in regions; machines started.',
        active: ['client','auth','apps','deploy','regions','machines'],
        edges: [['client','auth'], ['auth','apps'], ['apps','deploy'], ['deploy','regions'], ['regions','machines']]
      },
      {
        title: 'Network + volumes + secrets',
        desc: 'Network configured, volumes attached, secrets injected.',
        active: ['network','volumes','secrets'],
        edges: [['machines','network'], ['machines','volumes'], ['secrets','machines']]
      },
      {
        title: 'Edge + observability',
        desc: 'Edge routes traffic; logs/metrics collected; alerts fire.',
        active: ['edge','logs','metrics','alerts'],
        edges: [['machines','edge'], ['machines','logs'], ['machines','metrics'], ['alerts','client']]
      },
      {
        title: 'Billing',
        desc: 'Billing tracks resource consumption.',
        active: ['billing'],
        edges: [['billing','apps']]
      }
    ]
  },

  'v0-dev': {
    title: 'V0.dev',
    steps: [
      {
        title: 'Prompt + generate UI',
        desc: 'User prompts; generation produces components and preview.',
        active: ['client','auth','projects','prompts','generation','components','preview'],
        edges: [['client','auth'], ['auth','projects'], ['projects','prompts'], ['prompts','generation'], ['generation','components'], ['components','preview']]
      },
      {
        title: 'Export + git + deploy',
        desc: 'Export code, commit to git, and deploy.',
        active: ['export','git','deploy'],
        edges: [['components','export'], ['export','git'], ['git','deploy']]
      },
      {
        title: 'Safety + billing + analytics',
        desc: 'Safety checks; billing and analytics track usage.',
        active: ['safety','billing','analytics'],
        edges: [['generation','safety'], ['billing','analytics']]
      }
    ]
  },

  'bolt-new': {
    title: 'Bolt.new',
    steps: [
      {
        title: 'Prompt + generate app',
        desc: 'User prompts; generation creates code in editor.',
        active: ['client','auth','prompts','generation','editor'],
        edges: [['client','auth'], ['auth','prompts'], ['prompts','generation'], ['generation','editor']]
      },
      {
        title: 'Sandbox + preview',
        desc: 'Sandbox runs app; preview updates.',
        active: ['sandbox','preview'],
        edges: [['generation','sandbox'], ['sandbox','preview']]
      },
      {
        title: 'Deploy + git + analytics',
        desc: 'Deploy publishes; git sync optional; analytics and billing track usage.',
        active: ['deploy','git','analytics','billing','safety'],
        edges: [['sandbox','deploy'], ['git','deploy'], ['billing','analytics'], ['generation','safety']]
      }
    ]
  },

  cursor: {
    title: 'Cursor',
    steps: [
      {
        title: 'Index repo',
        desc: 'Workspace connects repo and builds index/context.',
        active: ['client','auth','workspace','repo','indexing','context'],
        edges: [['client','auth'], ['auth','workspace'], ['workspace','repo'], ['repo','indexing'], ['indexing','context']]
      },
      {
        title: 'Chat + completions',
        desc: 'Chat and code completion use context and models.',
        active: ['chat','completion','models','tools'],
        edges: [['context','chat'], ['context','completion'], ['models','completion'], ['tools','chat']]
      },
      {
        title: 'Telemetry + safety + billing',
        desc: 'Telemetry collected; safety enforced; billing and analytics track usage.',
        active: ['telemetry','safety','billing','analytics'],
        edges: [['telemetry','analytics'], ['completion','safety'], ['billing','analytics']]
      }
    ]
  },

  tabnine: {
    title: 'Tabnine',
    steps: [
      {
        title: 'IDE plugin + context',
        desc: 'IDE plugin collects context under policies.',
        active: ['client','auth','ide','plugins','context','policies'],
        edges: [['ide','plugins'], ['plugins','context'], ['policies','completion']]
      },
      {
        title: 'Model completion',
        desc: 'Models generate completions and return suggestions.',
        active: ['models','completion'],
        edges: [['context','models'], ['models','completion']]
      },
      {
        title: 'Admin + security + telemetry',
        desc: 'Admin manages org settings; security and telemetry/analytics.',
        active: ['admin','security','telemetry','analytics','billing'],
        edges: [['admin','security'], ['completion','telemetry'], ['telemetry','analytics'], ['billing','analytics']]
      }
    ]
  },

  render: {
    title: 'Render',
    steps: [
      {
        title: 'Connect repo + configure service',
        desc: 'User connects repo, configures service, and sets env/secrets.',
        active: ['client','auth','projects','repos','services','secrets'],
        edges: [['client','auth'], ['auth','projects'], ['projects','repos'], ['repos','services'], ['secrets','services']]
      },
      {
        title: 'Build + deploy',
        desc: 'Build runs and deploy publishes to runtime.',
        active: ['builds','deploy','runtime'],
        edges: [['repos','builds'], ['builds','deploy'], ['deploy','runtime']]
      },
      {
        title: 'Logs + metrics + alerts + billing',
        desc: 'Observability and billing/alerts for running services.',
        active: ['logs','metrics','alerts','billing','analytics'],
        edges: [['runtime','logs'], ['runtime','metrics'], ['alerts','services'], ['billing','analytics']]
      }
    ]
  },

  codeium: {
    title: 'Codeium',
    steps: [
      {
        title: 'IDE plugin + context',
        desc: 'IDE plugin collects context under policies.',
        active: ['client','auth','ide','plugins','context','policies'],
        edges: [['client','auth'], ['ide','plugins'], ['plugins','context'], ['policies','completion']]
      },
      {
        title: 'Completions + chat',
        desc: 'Models generate completions and chat responses.',
        active: ['models','completion','chat'],
        edges: [['context','models'], ['models','completion'], ['context','chat']]
      },
      {
        title: 'Telemetry + security + billing',
        desc: 'Telemetry and analytics; security controls; billing for teams.',
        active: ['telemetry','security','billing','analytics'],
        edges: [['completion','telemetry'], ['telemetry','analytics'], ['billing','analytics']]
      }
    ]
  },

  'hugging-face': {
    title: 'Hugging Face',
    steps: [
      {
        title: 'Browse models + datasets',
        desc: 'User authenticates and browses models/datasets/repos.',
        active: ['client','auth','models','datasets','repos'],
        edges: [['client','auth'], ['auth','models'], ['auth','datasets'], ['auth','repos']]
      },
      {
        title: 'Inference + Spaces',
        desc: 'Run inference and interact with Spaces apps.',
        active: ['inference','spaces','cdn'],
        edges: [['models','inference'], ['spaces','cdn']]
      },
      {
        title: 'Training + community + billing',
        desc: 'Training jobs run; community interactions; billing and analytics.',
        active: ['training','community','billing','analytics','security'],
        edges: [['datasets','training'], ['community','analytics'], ['billing','analytics'], ['security','repos']]
      }
    ]
  },

  replicate: {
    title: 'Replicate',
    steps: [
      {
        title: 'Pick model',
        desc: 'User authenticates and selects model from registry.',
        active: ['client','auth','models','registry'],
        edges: [['client','auth'], ['auth','models'], ['models','registry']]
      },
      {
        title: 'Inference job + queue',
        desc: 'Inference enqueued and executed by GPU workers.',
        active: ['inference','queue','workers','gpu'],
        edges: [['registry','inference'], ['inference','queue'], ['queue','workers'], ['workers','gpu']]
      },
      {
        title: 'Store outputs + safety + billing',
        desc: 'Outputs stored; safety/rate limits enforced; billing and analytics track usage.',
        active: ['storage','safety','rateLimits','billing','analytics'],
        edges: [['workers','storage'], ['safety','inference'], ['rateLimits','inference'], ['billing','analytics']]
      }
    ]
  },

  'stability-ai': {
    title: 'Stability AI',
    steps: [
      {
        title: 'Call API + run inference',
        desc: 'Client calls API and runs image inference.',
        active: ['client','auth','api','models','inference'],
        edges: [['client','auth'], ['auth','api'], ['models','inference'], ['api','inference']]
      },
      {
        title: 'Queue + GPU execution',
        desc: 'Jobs queued and executed on GPU.',
        active: ['queue','gpu','storage'],
        edges: [['inference','queue'], ['queue','gpu'], ['gpu','storage']]
      },
      {
        title: 'Filter + rate limits + billing',
        desc: 'Content filter and rate limits enforced; billing and analytics track usage.',
        active: ['contentFilter','rateLimits','billing','analytics','support'],
        edges: [['contentFilter','inference'], ['rateLimits','api'], ['billing','analytics'], ['support','client']]
      }
    ]
  },

  midjourney: {
    title: 'Midjourney',
    steps: [
      {
        title: 'Prompt via Discord',
        desc: 'User prompts via Discord; prompt enters queue.',
        active: ['client','auth','discord','prompts','queue'],
        edges: [['client','auth'], ['discord','prompts'], ['prompts','queue']]
      },
      {
        title: 'GPU generation + upscale',
        desc: 'GPU renders images and upscale variants.',
        active: ['gpu','models','gallery','upscale'],
        edges: [['queue','gpu'], ['models','gpu'], ['gpu','gallery'], ['gallery','upscale']]
      },
      {
        title: 'Moderation + subscriptions + analytics',
        desc: 'Moderation applied; subscriptions billed; analytics tracks usage.',
        active: ['moderation','subscriptions','billing','notifications','analytics'],
        edges: [['prompts','moderation'], ['subscriptions','billing'], ['gallery','analytics'], ['moderation','notifications']]
      }
    ]
  },

  'leonardo-ai': {
    title: 'Leonardo AI',
    steps: [
      {
        title: 'Prompt + inference',
        desc: 'User prompts and runs inference with selected models.',
        active: ['client','auth','prompts','models','inference','queue'],
        edges: [['client','auth'], ['auth','prompts'], ['prompts','inference'], ['models','inference'], ['inference','queue']]
      },
      {
        title: 'GPU output + assets',
        desc: 'GPU renders outputs stored as assets; editor used for tweaks.',
        active: ['gpu','assets','editor'],
        edges: [['queue','gpu'], ['gpu','assets'], ['assets','editor']]
      },
      {
        title: 'Moderation + subscriptions + analytics',
        desc: 'Moderation and notifications; subscriptions billed; analytics tracks usage.',
        active: ['moderation','subscriptions','billing','notifications','analytics'],
        edges: [['moderation','notifications'], ['subscriptions','billing'], ['assets','analytics']]
      }
    ]
  },

  runpod: {
    title: 'RunPod',
    steps: [
      {
        title: 'Provision pod',
        desc: 'User provisions pod with GPU and image.',
        active: ['client','auth','pods','gpu','images'],
        edges: [['client','auth'], ['auth','pods'], ['pods','gpu'], ['images','deploy']]
      },
      {
        title: 'Deploy + run jobs',
        desc: 'Deploy environment and run jobs via queue.',
        active: ['deploy','jobs','queue'],
        edges: [['pods','deploy'], ['deploy','jobs'], ['jobs','queue']]
      },
      {
        title: 'Storage + network + logs + billing',
        desc: 'Storage and networking; logs and analytics; billing tracks usage.',
        active: ['storage','network','logs','analytics','billing'],
        edges: [['jobs','storage'], ['network','jobs'], ['jobs','logs'], ['logs','analytics'], ['billing','analytics']]
      }
    ]
  },

  paperspace: {
    title: 'Paperspace',
    steps: [
      {
        title: 'Create machine',
        desc: 'User creates project and provisions GPU machine with image.',
        active: ['client','auth','projects','machines','gpu','images'],
        edges: [['client','auth'], ['auth','projects'], ['projects','machines'], ['machines','gpu'], ['images','machines']]
      },
      {
        title: 'Notebooks + jobs',
        desc: 'Notebooks used interactively; jobs run for training/inference.',
        active: ['notebooks','jobs','storage'],
        edges: [['machines','notebooks'], ['notebooks','jobs'], ['jobs','storage']]
      },
      {
        title: 'Logs + network + billing',
        desc: 'Logs collected; network configured; billing/analytics track usage.',
        active: ['logs','network','billing','analytics'],
        edges: [['jobs','logs'], ['network','machines'], ['logs','analytics'], ['billing','analytics']]
      }
    ]
  },

  kaggle: {
    title: 'Kaggle',
    steps: [
      {
        title: 'Use datasets + notebooks',
        desc: 'User authenticates, uses datasets in notebooks/kernels with GPU.',
        active: ['client','auth','datasets','notebooks','kernels','gpu'],
        edges: [['client','auth'], ['auth','datasets'], ['datasets','notebooks'], ['notebooks','kernels'], ['kernels','gpu']]
      },
      {
        title: 'Competitions + submissions',
        desc: 'Compete, submit predictions, and track leaderboard.',
        active: ['competitions','submissions','leaderboard'],
        edges: [['competitions','submissions'], ['submissions','leaderboard']]
      },
      {
        title: 'Models + community + analytics',
        desc: 'Models stored; community collaboration; analytics for engagement.',
        active: ['models','storage','community','analytics'],
        edges: [['kernels','storage'], ['storage','models'], ['community','competitions'], ['competitions','analytics']]
      }
    ]
  },

  colab: {
    title: 'Colab',
    steps: [
      {
        title: 'Open notebook from Drive',
        desc: 'User authenticates and opens notebook from Drive.',
        active: ['client','auth','drive','notebooks'],
        edges: [['client','auth'], ['auth','drive'], ['drive','notebooks']]
      },
      {
        title: 'Run kernel on GPU runtime',
        desc: 'Kernel runs in runtime with optional GPU and packages.',
        active: ['kernels','runtime','gpu','packages'],
        edges: [['notebooks','kernels'], ['kernels','runtime'], ['runtime','gpu'], ['packages','runtime']]
      },
      {
        title: 'Store outputs + share',
        desc: 'Outputs stored; sharing links notebook with collaborators.',
        active: ['storage','sharing'],
        edges: [['runtime','storage'], ['notebooks','sharing']]
      },
      {
        title: 'Logs + analytics + billing',
        desc: 'Logs captured; analytics tracks usage; billing for pro tiers.',
        active: ['logs','analytics','billing'],
        edges: [['runtime','logs'], ['logs','analytics'], ['billing','analytics']]
      }
    ]
  },

  jupyter: {
    title: 'Jupyter',
    steps: [
      {
        title: 'Open notebook',
        desc: 'User authenticates and opens notebook with kernel.',
        active: ['client','auth','notebooks','kernels'],
        edges: [['client','auth'], ['auth','notebooks'], ['notebooks','kernels']]
      },
      {
        title: 'Execute cells',
        desc: 'Kernel executes code using runtime and packages; storage persists.',
        active: ['runtime','packages','storage'],
        edges: [['kernels','runtime'], ['packages','runtime'], ['runtime','storage']]
      },
      {
        title: 'Extensions + security',
        desc: 'Extensions added; security controls access.',
        active: ['extensions','security'],
        edges: [['extensions','runtime'], ['security','runtime']]
      },
      {
        title: 'Sharing + logs + analytics',
        desc: 'Sharing notebooks; logs and analytics track usage.',
        active: ['sharing','logs','analytics'],
        edges: [['notebooks','sharing'], ['runtime','logs'], ['logs','analytics']]
      }
    ]
  },

  airbyte: {
    title: 'Airbyte',
    steps: [
      {
        title: 'Configure connectors',
        desc: 'User configures source and destination connectors.',
        active: ['client','auth','sources','destinations','connectors','catalog'],
        edges: [['client','auth'], ['sources','connectors'], ['destinations','connectors'], ['catalog','connectors']]
      },
      {
        title: 'Schedule sync',
        desc: 'Scheduler triggers sync runs executed by workers.',
        active: ['scheduler','workers','sync'],
        edges: [['connectors','scheduler'], ['scheduler','workers'], ['workers','sync']]
      },
      {
        title: 'Move data + store state',
        desc: 'Sync moves data to destination and stores state/logs.',
        active: ['storage','monitoring'],
        edges: [['sync','storage'], ['sync','monitoring']]
      },
      {
        title: 'Alerts + analytics',
        desc: 'Alerts fire on failures; analytics tracks throughput and reliability.',
        active: ['alerts','analytics'],
        edges: [['monitoring','alerts'], ['sync','analytics']]
      }
    ]
  },

  n8n: {
    title: 'n8n',
    steps: [
      {
        title: 'Design workflow',
        desc: 'User designs workflows with triggers and nodes.',
        active: ['client','auth','workflows','triggers','nodes'],
        edges: [['client','auth'], ['auth','workflows'], ['workflows','triggers'], ['workflows','nodes']]
      },
      {
        title: 'Execute via queue + workers',
        desc: 'Triggers fire executions; queued and processed by workers calling integrations.',
        active: ['executions','queue','workers','integrations'],
        edges: [['triggers','executions'], ['executions','queue'], ['queue','workers'], ['workers','integrations']]
      },
      {
        title: 'Secrets + logs',
        desc: 'Secrets injected; logs stored for debugging.',
        active: ['secrets','logs'],
        edges: [['secrets','nodes'], ['executions','logs']]
      },
      {
        title: 'Analytics + alerts',
        desc: 'Analytics summarizes runs; alerts notify on failures.',
        active: ['analytics','alerts'],
        edges: [['logs','analytics'], ['alerts','client']]
      }
    ]
  },

  zapier: {
    title: 'Zapier',
    steps: [
      {
        title: 'Create zap',
        desc: 'User creates zaps with triggers and actions.',
        active: ['client','auth','zaps','triggers','actions'],
        edges: [['client','auth'], ['auth','zaps'], ['zaps','triggers'], ['zaps','actions']]
      },
      {
        title: 'Run executions',
        desc: 'Triggers fire executions; queue processes actions via integrations.',
        active: ['executions','queue','integrations'],
        edges: [['triggers','executions'], ['executions','queue'], ['queue','integrations'], ['integrations','actions']]
      },
      {
        title: 'Secrets + logs',
        desc: 'Secrets manage credentials; logs stored for troubleshooting.',
        active: ['secrets','logs'],
        edges: [['secrets','integrations'], ['executions','logs']]
      },
      {
        title: 'Analytics + alerts + billing',
        desc: 'Analytics and alerts track automation health; billing tracks usage.',
        active: ['analytics','alerts','billing'],
        edges: [['logs','analytics'], ['alerts','client'], ['billing','analytics']]
      }
    ]
  },

  'make-integromat': {
    title: 'Make (Integromat)',
    steps: [
      {
        title: 'Build scenario',
        desc: 'User builds scenario with modules and triggers.',
        active: ['client','auth','scenarios','modules','triggers'],
        edges: [['client','auth'], ['auth','scenarios'], ['scenarios','modules'], ['scenarios','triggers']]
      },
      {
        title: 'Execute scenario',
        desc: 'Triggers create executions queued and processed by workers.',
        active: ['executions','queue','workers','integrations'],
        edges: [['triggers','executions'], ['executions','queue'], ['queue','workers'], ['workers','integrations']]
      },
      {
        title: 'Secrets + billing',
        desc: 'Secrets manage credentials; billing tracks usage.',
        active: ['secrets','billing'],
        edges: [['secrets','modules'], ['billing','analytics']]
      },
      {
        title: 'Analytics + alerts',
        desc: 'Analytics and alerts track automation health.',
        active: ['analytics','alerts'],
        edges: [['executions','analytics'], ['alerts','client']]
      }
    ]
  },

  retool: {
    title: 'Retool',
    steps: [
      {
        title: 'Build app UI',
        desc: 'User builds app UI in editor with components.',
        active: ['client','auth','apps','editor','components'],
        edges: [['client','auth'], ['auth','apps'], ['apps','editor'], ['editor','components']]
      },
      {
        title: 'Connect data + run queries',
        desc: 'Queries run through connectors and return data.',
        active: ['queries','connectors','data'],
        edges: [['editor','queries'], ['queries','connectors'], ['connectors','data']]
      },
      {
        title: 'Permissions + audit',
        desc: 'Permissions enforced; audit trails kept.',
        active: ['permissions','audit'],
        edges: [['permissions','queries'], ['audit','apps']]
      },
      {
        title: 'Deploy + billing + analytics',
        desc: 'Deploy app; billing and analytics track usage.',
        active: ['deploy','billing','analytics'],
        edges: [['apps','deploy'], ['billing','analytics'], ['audit','analytics']]
      }
    ]
  },

  'roblox-studio': {
    title: 'Roblox Studio',
    steps: [
      {
        title: 'Edit project + assets',
        desc: 'Developer edits project and manages assets.',
        active: ['client','auth','projects','editor','assets'],
        edges: [['client','auth'], ['auth','projects'], ['projects','editor'], ['editor','assets']]
      },
      {
        title: 'Publish to servers',
        desc: 'Publish pushes build to servers; datastore stores state.',
        active: ['publish','servers','datastore'],
        edges: [['projects','publish'], ['publish','servers'], ['projects','datastore']]
      },
      {
        title: 'Moderation + payments',
        desc: 'Moderation and payments handle UGC and monetization.',
        active: ['moderation','payments','notifications'],
        edges: [['moderation','publish'], ['payments','analytics'], ['publish','notifications']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks engagement and performance.',
        active: ['analytics'],
        edges: [['servers','analytics']]
      }
    ]
  },

  'epic-games-store': {
    title: 'Epic Games Store',
    steps: [
      {
        title: 'Browse + cart',
        desc: 'User browses catalog/storefront and adds to cart.',
        active: ['client','auth','catalog','storefront','cart'],
        edges: [['client','auth'], ['auth','storefront'], ['storefront','catalog'], ['catalog','cart']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout processes payment and creates order.',
        active: ['checkout','payments','orders'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Library + downloads',
        desc: 'Order adds game to library; downloads via CDN.',
        active: ['library','downloads','cdn'],
        edges: [['orders','library'], ['library','downloads'], ['downloads','cdn']]
      },
      {
        title: 'Notifications + support + analytics',
        desc: 'Notifications and support; analytics tracks funnel.',
        active: ['notifications','support','analytics'],
        edges: [['orders','notifications'], ['client','support'], ['orders','analytics']]
      }
    ]
  },

  steam: {
    title: 'Steam',
    steps: [
      {
        title: 'Browse store + purchase',
        desc: 'User browses store, builds cart, and purchases.',
        active: ['client','auth','store','catalog','cart','checkout','payments','orders'],
        edges: [['client','auth'], ['auth','store'], ['store','catalog'], ['catalog','cart'], ['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Library + downloads',
        desc: 'Order adds to library; downloads through CDN.',
        active: ['library','downloads','cdn'],
        edges: [['orders','library'], ['library','downloads'], ['downloads','cdn']]
      },
      {
        title: 'Community + friends',
        desc: 'Community and friends features drive engagement.',
        active: ['community','friends','notifications'],
        edges: [['community','friends'], ['community','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics tracks funnel and engagement.',
        active: ['support','analytics'],
        edges: [['client','support'], ['orders','analytics']]
      }
    ]
  },

  'xbox-app': {
    title: 'Xbox App',
    steps: [
      {
        title: 'Sign in + open store',
        desc: 'User signs in and opens the store catalog.',
        active: ['client','auth','profile','store','catalog'],
        edges: [['client','auth'], ['auth','profile'], ['profile','store'], ['store','catalog']]
      },
      {
        title: 'Purchase / claim entitlement',
        desc: 'Payments and subscriptions handle purchases and entitlements.',
        active: ['payments','subscriptions','library'],
        edges: [['store','payments'], ['subscriptions','payments'], ['payments','library']]
      },
      {
        title: 'Install + cloud',
        desc: 'Library items download; cloud saves and cloud gaming integrate.',
        active: ['downloads','cloud'],
        edges: [['library','downloads'], ['downloads','cloud']]
      },
      {
        title: 'Multiplayer + chat + notifications',
        desc: 'Session services and chat support play and coordination.',
        active: ['multiplayer','chat','notifications'],
        edges: [['multiplayer','chat'], ['chat','notifications']]
      },
      {
        title: 'Analytics',
        desc: 'Telemetry tracks engagement and store funnel.',
        active: ['analytics'],
        edges: [['library','analytics']]
      }
    ]
  },

  'playstation-app': {
    title: 'PlayStation App',
    steps: [
      {
        title: 'Sign in + browse store',
        desc: 'User signs in and browses store/catalog.',
        active: ['client','auth','profile','store','catalog'],
        edges: [['client','auth'], ['auth','profile'], ['profile','store'], ['store','catalog']]
      },
      {
        title: 'Purchase / subscription entitlement',
        desc: 'Payments/subscriptions create entitlements in library.',
        active: ['payments','subscriptions','library'],
        edges: [['store','payments'], ['subscriptions','payments'], ['payments','library']]
      },
      {
        title: 'Downloads + cloud',
        desc: 'Downloads and cloud save integrate across console/app.',
        active: ['downloads','cloud'],
        edges: [['library','downloads'], ['downloads','cloud']]
      },
      {
        title: 'Parties + chat',
        desc: 'Parties and chat coordinate play; notifications update events.',
        active: ['parties','chat','notifications'],
        edges: [['parties','chat'], ['chat','notifications']]
      },
      {
        title: 'Analytics',
        desc: 'Engagement telemetry powers dashboards and recommendations.',
        active: ['analytics'],
        edges: [['library','analytics']]
      }
    ]
  },

  'discord-nitro': {
    title: 'Discord Nitro',
    steps: [
      {
        title: 'Join servers + chat',
        desc: 'User signs in and uses server chat and voice.',
        active: ['client','auth','servers','chat','voice'],
        edges: [['client','auth'], ['auth','servers'], ['servers','chat'], ['servers','voice']]
      },
      {
        title: 'Streaming + CDN',
        desc: 'Streaming features rely on media delivery and CDN.',
        active: ['streaming','cdn'],
        edges: [['voice','streaming'], ['cdn','streaming']]
      },
      {
        title: 'Subscribe to Nitro',
        desc: 'Subscription creates billing state and unlocks perks.',
        active: ['subscriptions','billing','payments','perks'],
        edges: [['subscriptions','billing'], ['billing','payments'], ['payments','perks']]
      },
      {
        title: 'Perks applied',
        desc: 'Perks like emoji, boosts, and uploads apply to servers.',
        active: ['emoji','servers'],
        edges: [['perks','servers'], ['emoji','cdn']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support handles issues; analytics tracks retention and ARPU.',
        active: ['support','analytics'],
        edges: [['chat','analytics'], ['support','client']]
      }
    ]
  },

  'battle-net': {
    title: 'Battle.net',
    steps: [
      {
        title: 'Browse catalog + cart',
        desc: 'User signs in, browses store/catalog, and adds items to cart.',
        active: ['client','auth','store','catalog','cart'],
        edges: [['client','auth'], ['auth','store'], ['store','catalog'], ['catalog','cart']]
      },
      {
        title: 'Checkout + order',
        desc: 'Checkout processes payment and creates order/entitlement.',
        active: ['checkout','payments','orders'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Library + downloads + CDN',
        desc: 'Order adds to library; downloads via CDN.',
        active: ['library','downloads','cdn'],
        edges: [['orders','library'], ['library','downloads'], ['downloads','cdn']]
      },
      {
        title: 'Friends + chat',
        desc: 'Social layer supports friends and chat.',
        active: ['friends','chat','notifications'],
        edges: [['friends','chat'], ['orders','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support handles issues; analytics tracks funnel and engagement.',
        active: ['support','analytics'],
        edges: [['support','client'], ['orders','analytics']]
      }
    ]
  },

  'riot-client': {
    title: 'Riot Client',
    steps: [
      {
        title: 'Sign in + select game',
        desc: 'User signs in and selects a game title.',
        active: ['client','auth','account','games'],
        edges: [['client','auth'], ['auth','account'], ['account','games']]
      },
      {
        title: 'Patch + download via CDN',
        desc: 'Client checks patches and downloads builds via CDN.',
        active: ['patches','downloads','cdn'],
        edges: [['games','patches'], ['patches','downloads'], ['downloads','cdn']]
      },
      {
        title: 'Store purchases',
        desc: 'Payments process in-client purchases for cosmetics.',
        active: ['store','payments'],
        edges: [['store','payments']]
      },
      {
        title: 'Social + notifications',
        desc: 'Friends/chat and notifications coordinate sessions.',
        active: ['friends','chat','notifications'],
        edges: [['friends','chat'], ['chat','notifications']]
      },
      {
        title: 'Anti-cheat + analytics',
        desc: 'Anti-cheat enforces integrity; analytics tracks performance.',
        active: ['antiCheat','analytics'],
        edges: [['antiCheat','games'], ['games','analytics']]
      }
    ]
  },

  gog: {
    title: 'GOG',
    steps: [
      {
        title: 'Browse + cart',
        desc: 'User signs in and browses catalog then adds to cart.',
        active: ['client','auth','store','catalog','cart'],
        edges: [['client','auth'], ['auth','store'], ['store','catalog'], ['catalog','cart']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Checkout processes payment and creates order.',
        active: ['checkout','payments','orders'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','orders']]
      },
      {
        title: 'Library + downloads',
        desc: 'Order adds titles to library; downloads use CDN.',
        active: ['library','downloads','cdn'],
        edges: [['orders','library'], ['library','downloads'], ['downloads','cdn']]
      },
      {
        title: 'Community + notifications',
        desc: 'Community activity triggers notifications.',
        active: ['community','notifications'],
        edges: [['community','notifications']]
      },
      {
        title: 'Support + analytics',
        desc: 'Support resolves issues; analytics tracks funnel and engagement.',
        active: ['support','analytics'],
        edges: [['support','client'], ['orders','analytics']]
      }
    ]
  },

  'itch-io': {
    title: 'itch.io',
    steps: [
      {
        title: 'Browse indie catalog',
        desc: 'User signs in and browses the indie catalog/store.',
        active: ['client','auth','store','catalog'],
        edges: [['client','auth'], ['auth','store'], ['store','catalog']]
      },
      {
        title: 'Creator uploads build',
        desc: 'Creators upload builds; CDN serves downloads.',
        active: ['creators','uploads','cdn'],
        edges: [['creators','uploads'], ['uploads','cdn']]
      },
      {
        title: 'Purchase + payout',
        desc: 'Payments handle purchase; payouts distribute to creators.',
        active: ['payments','payouts','library'],
        edges: [['catalog','payments'], ['payments','library'], ['payments','payouts']]
      },
      {
        title: 'Download + community',
        desc: 'Library downloads and community features drive engagement.',
        active: ['downloads','community','notifications'],
        edges: [['library','downloads'], ['community','notifications']]
      },
      {
        title: 'Analytics + support',
        desc: 'Analytics tracks funnel; support resolves issues.',
        active: ['analytics','support'],
        edges: [['downloads','analytics'], ['support','client']]
      }
    ]
  },

  'game-jolt': {
    title: 'Game Jolt',
    steps: [
      {
        title: 'Sign in + discover games',
        desc: 'User signs in and discovers games via catalog.',
        active: ['client','auth','games','catalog'],
        edges: [['client','auth'], ['auth','catalog'], ['catalog','games']]
      },
      {
        title: 'Community uploads + CDN',
        desc: 'Community uploads builds/media; CDN distributes.',
        active: ['community','uploads','cdn'],
        edges: [['community','uploads'], ['uploads','cdn']]
      },
      {
        title: 'Downloads',
        desc: 'Users download builds through CDN.',
        active: ['downloads','cdn'],
        edges: [['games','downloads'], ['downloads','cdn']]
      },
      {
        title: 'Payments + payouts',
        desc: 'Payments process purchases; payouts pay creators.',
        active: ['payments','payouts'],
        edges: [['payments','payouts']]
      },
      {
        title: 'Moderation + analytics',
        desc: 'Moderation keeps content safe; analytics tracks engagement.',
        active: ['moderation','notifications','analytics'],
        edges: [['moderation','notifications'], ['games','analytics']]
      }
    ]
  },

  miniclip: {
    title: 'Miniclip',
    steps: [
      {
        title: 'Start session',
        desc: 'User signs in and starts a game session.',
        active: ['client','auth','games','sessions'],
        edges: [['client','auth'], ['auth','games'], ['games','sessions']]
      },
      {
        title: 'Leaderboard updates',
        desc: 'Scores update leaderboards and profiles.',
        active: ['leaderboards','profiles'],
        edges: [['sessions','leaderboards'], ['leaderboards','profiles']]
      },
      {
        title: 'Ads + IAP',
        desc: 'Ads monetize sessions; IAP uses payments.',
        active: ['ads','iap','payments'],
        edges: [['ads','games'], ['iap','payments']]
      },
      {
        title: 'Friends + notifications',
        desc: 'Friends and notifications drive re-engagement.',
        active: ['friends','notifications'],
        edges: [['friends','notifications']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks retention and monetization.',
        active: ['analytics'],
        edges: [['sessions','analytics']]
      }
    ]
  },

  poki: {
    title: 'Poki',
    steps: [
      {
        title: 'Discover + launch game',
        desc: 'User discovers games via catalog and launches via CDN.',
        active: ['client','auth','catalog','games','cdn'],
        edges: [['client','auth'], ['auth','catalog'], ['catalog','games'], ['games','cdn']]
      },
      {
        title: 'Ads + measurement',
        desc: 'Ad stack monetizes play; analytics measures performance.',
        active: ['ads','analytics'],
        edges: [['games','ads'], ['ads','analytics']]
      },
      {
        title: 'Profiles + recommendations',
        desc: 'Profiles feed recommendation engine for better discovery.',
        active: ['profiles','recommendations'],
        edges: [['profiles','recommendations']]
      },
      {
        title: 'Moderation + support',
        desc: 'Moderation and support handle safety and issues.',
        active: ['moderation','support','notifications'],
        edges: [['moderation','support'], ['support','notifications']]
      }
    ]
  },

  crazygames: {
    title: 'CrazyGames',
    steps: [
      {
        title: 'Browse + launch game',
        desc: 'User browses catalog and launches game via CDN.',
        active: ['client','catalog','games','cdn'],
        edges: [['client','catalog'], ['catalog','games'], ['games','cdn']]
      },
      {
        title: 'Ads + analytics',
        desc: 'Ads monetize sessions; analytics measures performance.',
        active: ['ads','analytics'],
        edges: [['games','ads'], ['ads','analytics']]
      },
      {
        title: 'Profiles + recommendations',
        desc: 'Profiles feed recommendations for discovery loops.',
        active: ['profiles','recs'],
        edges: [['profiles','recs'], ['analytics','recs']]
      },
      {
        title: 'Moderation + support',
        desc: 'Moderation and support handle issues and safety.',
        active: ['moderation','support','notifications'],
        edges: [['moderation','support'], ['support','notifications']]
      }
    ]
  },

  'armor-games': {
    title: 'Armor Games',
    steps: [
      {
        title: 'Browse + play',
        desc: 'User browses catalog and plays via CDN.',
        active: ['client','catalog','games','cdn'],
        edges: [['client','catalog'], ['catalog','games'], ['games','cdn']]
      },
      {
        title: 'Publisher uploads',
        desc: 'Publishers upload builds that are served by CDN.',
        active: ['publisher','uploads','cdn'],
        edges: [['publisher','uploads'], ['uploads','cdn']]
      },
      {
        title: 'Ads + analytics',
        desc: 'Ads drive monetization; analytics tracks engagement.',
        active: ['ads','analytics'],
        edges: [['games','ads'], ['ads','analytics']]
      },
      {
        title: 'Community + moderation',
        desc: 'Community features require moderation and notifications.',
        active: ['community','moderation','notifications'],
        edges: [['community','moderation'], ['moderation','notifications']]
      }
    ]
  },

  kongregate: {
    title: 'Kongregate',
    steps: [
      {
        title: 'Sign in + play',
        desc: 'User signs in, browses catalog, and launches game via CDN.',
        active: ['client','auth','catalog','games','cdn'],
        edges: [['client','auth'], ['auth','catalog'], ['catalog','games'], ['games','cdn']]
      },
      {
        title: 'SDK events (badges/leaderboards)',
        desc: 'Game SDK reports achievements and scores.',
        active: ['sdk','badges','leaderboards'],
        edges: [['games','sdk'], ['sdk','badges'], ['sdk','leaderboards']]
      },
      {
        title: 'Ads + payments',
        desc: 'Ads monetize play; payments handle virtual goods.',
        active: ['ads','payments','profiles'],
        edges: [['games','ads'], ['payments','profiles']]
      },
      {
        title: 'Community + moderation',
        desc: 'Community content is moderated; notifications keep users engaged.',
        active: ['community','moderation','notifications'],
        edges: [['community','moderation'], ['profiles','notifications']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics aggregates gameplay and monetization metrics.',
        active: ['analytics'],
        edges: [['leaderboards','analytics'], ['ads','analytics']]
      }
    ]
  },

  'coolmath-games': {
    title: 'Coolmath Games',
    steps: [
      {
        title: 'Browse + launch',
        desc: 'User browses catalog and launches game via CDN.',
        active: ['client','catalog','games','cdn'],
        edges: [['client','catalog'], ['catalog','games'], ['games','cdn']]
      },
      {
        title: 'Ads + analytics',
        desc: 'Ad stack monetizes sessions; analytics measures performance.',
        active: ['ads','analytics'],
        edges: [['games','ads'], ['ads','analytics']]
      },
      {
        title: 'Recommendations',
        desc: 'Recommendations improve discovery loops.',
        active: ['recommendations'],
        edges: [['analytics','recommendations']]
      },
      {
        title: 'Support + moderation',
        desc: 'Support handles issues; moderation handles safety.',
        active: ['support','moderation','notifications'],
        edges: [['moderation','support'], ['support','notifications']]
      }
    ]
  },

  lichess: {
    title: 'Lichess',
    steps: [
      {
        title: 'Login + find match',
        desc: 'User authenticates, enters lobby, and matchmaking starts game.',
        active: ['client','auth','lobby','matchmaking','game'],
        edges: [['client','auth'], ['auth','lobby'], ['lobby','matchmaking'], ['matchmaking','game']]
      },
      {
        title: 'Realtime play',
        desc: 'Moves stream via realtime channels; game state updates.',
        active: ['realtime','game'],
        edges: [['game','realtime']]
      },
      {
        title: 'Analysis + puzzles',
        desc: 'Post-game analysis and puzzle training loop.',
        active: ['analysis','puzzles'],
        edges: [['game','analysis'], ['analysis','puzzles']]
      },
      {
        title: 'Ratings + profiles',
        desc: 'Rating updates and profile stats.',
        active: ['ratings','profiles'],
        edges: [['game','ratings'], ['ratings','profiles']]
      },
      {
        title: 'Anti-cheat + moderation',
        desc: 'Anti-cheat signals flow into moderation actions and notifications.',
        active: ['antiCheat','moderation','notifications'],
        edges: [['antiCheat','moderation'], ['moderation','notifications']]
      }
    ]
  },

  'chess-com': {
    title: 'Chess.com',
    steps: [
      {
        title: 'Login + match',
        desc: 'User authenticates, enters lobby, and matchmaking starts game.',
        active: ['client','auth','lobby','matchmaking','game'],
        edges: [['client','auth'], ['auth','lobby'], ['lobby','matchmaking'], ['matchmaking','game']]
      },
      {
        title: 'Realtime play',
        desc: 'Moves stream via realtime channels; game state updates.',
        active: ['realtime','game'],
        edges: [['game','realtime']]
      },
      {
        title: 'Lessons + puzzles',
        desc: 'Lessons and puzzles drive skill improvement.',
        active: ['lessons','puzzles'],
        edges: [['lessons','puzzles']]
      },
      {
        title: 'Subscription billing',
        desc: 'Billing unlocks premium lessons and analysis.',
        active: ['billing','notifications'],
        edges: [['lessons','billing'], ['billing','notifications']]
      },
      {
        title: 'Anti-cheat + analytics',
        desc: 'Anti-cheat flags feed moderation; analytics tracks engagement.',
        active: ['antiCheat','analytics'],
        edges: [['antiCheat','moderation'], ['game','analytics']]
      }
    ]
  },

  memrise: {
    title: 'Memrise',
    steps: [
      {
        title: 'Choose course + lesson',
        desc: 'User signs in and starts a lesson from a course.',
        active: ['client','auth','courses','lessons'],
        edges: [['client','auth'], ['auth','courses'], ['courses','lessons']]
      },
      {
        title: 'Spaced repetition review',
        desc: 'SRS schedules review and updates progress.',
        active: ['srs','progress'],
        edges: [['lessons','srs'], ['srs','progress']]
      },
      {
        title: 'Audio + speaking practice',
        desc: 'Audio and speaking exercises feed quizzes.',
        active: ['audio','speaking','quizzes'],
        edges: [['audio','lessons'], ['speaking','quizzes'], ['quizzes','progress']]
      },
      {
        title: 'Recommendations + analytics',
        desc: 'Recommendations personalize next lessons; analytics measures retention.',
        active: ['recommendations','analytics'],
        edges: [['progress','recommendations'], ['billing','analytics']]
      },
      {
        title: 'Billing + notifications',
        desc: 'Billing for premium features; notifications drive re-engagement.',
        active: ['billing','notifications'],
        edges: [['billing','analytics'], ['notifications','client']]
      }
    ]
  },

  babbel: {
    title: 'Babbel',
    steps: [
      {
        title: 'Placement + course selection',
        desc: 'User signs in, takes placement, and selects course level.',
        active: ['client','auth','placement','courses'],
        edges: [['client','auth'], ['auth','placement'], ['placement','courses']]
      },
      {
        title: 'Lesson + practice loop',
        desc: 'Lessons and practice exercises update progress.',
        active: ['lessons','practice','progress'],
        edges: [['courses','lessons'], ['lessons','practice'], ['practice','progress']]
      },
      {
        title: 'Audio + speaking',
        desc: 'Audio and speaking exercises reinforce learning.',
        active: ['audio','speaking'],
        edges: [['audio','lessons'], ['speaking','practice']]
      },
      {
        title: 'Subscription billing',
        desc: 'Billing manages subscriptions and renewals; notifications for retention.',
        active: ['billing','notifications','analytics'],
        edges: [['billing','analytics'], ['support','notifications']]
      },
      {
        title: 'Support',
        desc: 'Support resolves account and billing issues.',
        active: ['support'],
        edges: [['support','client']]
      }
    ]
  },

  busuu: {
    title: 'Busuu',
    steps: [
      {
        title: 'Start lesson + practice',
        desc: 'User signs in and completes lessons and practice.',
        active: ['client','auth','courses','lessons','practice'],
        edges: [['client','auth'], ['auth','courses'], ['courses','lessons'], ['lessons','practice']]
      },
      {
        title: 'Community review',
        desc: 'Learners submit exercises and receive community reviews.',
        active: ['community','review','notifications'],
        edges: [['practice','community'], ['community','review'], ['review','notifications']]
      },
      {
        title: 'Audio + speaking',
        desc: 'Audio and speaking exercises reinforce pronunciation.',
        active: ['audio','speaking'],
        edges: [['audio','lessons'], ['audio','speaking']]
      },
      {
        title: 'Progress + analytics',
        desc: 'Progress updates and analytics measure outcomes.',
        active: ['progress','analytics'],
        edges: [['practice','progress'], ['billing','analytics']]
      },
      {
        title: 'Billing',
        desc: 'Billing manages subscriptions.',
        active: ['billing'],
        edges: [['billing','analytics']]
      }
    ]
  },

  quizlet: {
    title: 'Quizlet',
    steps: [
      {
        title: 'Create or open study set',
        desc: 'User signs in and creates/opens a study set in the editor.',
        active: ['client','auth','sets','editor'],
        edges: [['client','auth'], ['auth','sets'], ['sets','editor']]
      },
      {
        title: 'Study modes + quizzes',
        desc: 'Study modes and quizzes update progress.',
        active: ['study','quizzes','progress'],
        edges: [['sets','study'], ['study','quizzes'], ['quizzes','progress']]
      },
      {
        title: 'Search + recommendations',
        desc: 'Search and recommendations help discover sets.',
        active: ['search','recommendations'],
        edges: [['search','recommendations'], ['analytics','recommendations']]
      },
      {
        title: 'Moderation + billing',
        desc: 'Moderation for content; billing for premium features.',
        active: ['moderation','billing','notifications'],
        edges: [['moderation','notifications'], ['billing','analytics']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks study performance and retention.',
        active: ['analytics'],
        edges: [['progress','analytics']]
      }
    ]
  },

  skillshare: {
    title: 'Skillshare',
    steps: [
      {
        title: 'Browse catalog + open class',
        desc: 'User signs in, browses catalog, and opens a class.',
        active: ['client','auth','catalog','classes'],
        edges: [['client','auth'], ['auth','catalog'], ['catalog','classes']]
      },
      {
        title: 'Stream video via CDN',
        desc: 'Video playback served via CDN with analytics instrumentation.',
        active: ['video','cdn','analytics'],
        edges: [['classes','video'], ['video','cdn'], ['video','analytics']]
      },
      {
        title: 'Project + community',
        desc: 'Learners post projects; community interactions trigger notifications.',
        active: ['projects','community','notifications'],
        edges: [['classes','projects'], ['projects','community'], ['community','notifications']]
      },
      {
        title: 'Creator publishing + monetization',
        desc: 'Creator tools publish classes; subscriptions/payments handle monetization.',
        active: ['creator','subscriptions','payments'],
        edges: [['creator','classes'], ['subscriptions','payments']]
      },
      {
        title: 'Recommendations',
        desc: 'Recommendations use engagement analytics to suggest next classes.',
        active: ['recommendations','analytics'],
        edges: [['analytics','recommendations']]
      }
    ]
  },

  masterclass: {
    title: 'MasterClass',
    steps: [
      {
        title: 'Sign in + pick series',
        desc: 'User signs in and selects a series from catalog.',
        active: ['client','auth','catalog','series'],
        edges: [['client','auth'], ['auth','catalog'], ['catalog','series']]
      },
      {
        title: 'Stream lessons',
        desc: 'Video streams via CDN; downloads support offline viewing.',
        active: ['video','cdn','downloads'],
        edges: [['series','video'], ['video','cdn'], ['video','downloads']]
      },
      {
        title: 'Subscriptions + billing',
        desc: 'Subscriptions/billing manage access and renewals.',
        active: ['subscriptions','billing','notifications'],
        edges: [['subscriptions','billing'], ['billing','notifications']]
      },
      {
        title: 'Profiles + recommendations',
        desc: 'Profiles and engagement power recommendations.',
        active: ['profiles','recommendations','analytics'],
        edges: [['profiles','recommendations'], ['series','analytics'], ['analytics','recommendations']]
      },
      {
        title: 'Support',
        desc: 'Support resolves account and playback issues.',
        active: ['support'],
        edges: [['support','client']]
      }
    ]
  },

  edx: {
    title: 'edX',
    steps: [
      {
        title: 'Enroll in course',
        desc: 'User signs in, browses catalog, and enrolls.',
        active: ['client','auth','catalog','courses','profiles'],
        edges: [['client','auth'], ['auth','catalog'], ['catalog','courses'], ['auth','profiles']]
      },
      {
        title: 'Consume content',
        desc: 'Course content and videos served via CDN.',
        active: ['content','video','cdn'],
        edges: [['courses','content'], ['content','video'], ['video','cdn']]
      },
      {
        title: 'Assessments + grading',
        desc: 'Assessments submitted; grading updates progress and results.',
        active: ['assessments','grading'],
        edges: [['content','assessments'], ['assessments','grading']]
      },
      {
        title: 'Certificates + payments',
        desc: 'Payments unlock verified certificates and issuance.',
        active: ['payments','certificates'],
        edges: [['payments','certificates'], ['grading','certificates']]
      },
      {
        title: 'Forums + notifications + analytics',
        desc: 'Forums drive engagement; notifications and analytics track outcomes.',
        active: ['forums','notifications','analytics'],
        edges: [['forums','notifications'], ['courses','analytics']]
      }
    ]
  },

  brainly: {
    title: 'Brainly',
    steps: [
      {
        title: 'Ask question',
        desc: 'User signs in and posts a question.',
        active: ['client','auth','questions'],
        edges: [['client','auth'], ['auth','questions']]
      },
      {
        title: 'Search + answer',
        desc: 'Search finds similar threads; answers are posted and ranked.',
        active: ['search','answers','reputation'],
        edges: [['questions','search'], ['search','answers'], ['answers','reputation']]
      },
      {
        title: 'AI assist',
        desc: 'AI assists in explaining solutions and summarizing.',
        active: ['ai','answers'],
        edges: [['answers','ai']]
      },
      {
        title: 'Moderation + notifications',
        desc: 'Moderation enforces policies; notifications keep users engaged.',
        active: ['moderation','notifications'],
        edges: [['moderation','answers'], ['answers','notifications']]
      },
      {
        title: 'Subscriptions + analytics',
        desc: 'Subscriptions/payments unlock features; analytics tracks funnel.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['answers','analytics']]
      }
    ]
  },

  photomath: {
    title: 'Photomath',
    steps: [
      {
        title: 'Scan problem',
        desc: 'User scans a math problem using the camera.',
        active: ['client','camera'],
        edges: [['client','camera']]
      },
      {
        title: 'OCR + solve',
        desc: 'OCR extracts expression; solver computes solution.',
        active: ['ocr','solver'],
        edges: [['camera','ocr'], ['ocr','solver']]
      },
      {
        title: 'Show step-by-step',
        desc: 'Steps and explanations delivered from content store.',
        active: ['steps','content'],
        edges: [['solver','steps'], ['steps','content']]
      },
      {
        title: 'Practice',
        desc: 'Practice recommendations and exercises reinforce learning.',
        active: ['practice','analytics'],
        edges: [['content','practice'], ['solver','analytics']]
      },
      {
        title: 'Subscriptions',
        desc: 'Premium features managed via subscriptions/payments.',
        active: ['subscriptions','payments','notifications'],
        edges: [['subscriptions','payments'], ['payments','notifications']]
      }
    ]
  },

  socratic: {
    title: 'Socratic',
    steps: [
      {
        title: 'Capture question',
        desc: 'User captures a question with the camera.',
        active: ['client','camera'],
        edges: [['client','camera']]
      },
      {
        title: 'OCR + query',
        desc: 'OCR extracts text; query is built for search.',
        active: ['ocr','query','search'],
        edges: [['camera','ocr'], ['ocr','query'], ['query','search']]
      },
      {
        title: 'Answers + explanations',
        desc: 'Search returns answers and explanation content.',
        active: ['answers','content'],
        edges: [['search','answers'], ['answers','content']]
      },
      {
        title: 'Recommendations + feedback',
        desc: 'Recommendations personalize; feedback improves quality.',
        active: ['recommendations','feedback','analytics'],
        edges: [['content','recommendations'], ['feedback','analytics'], ['recommendations','analytics']]
      },
      {
        title: 'Notifications',
        desc: 'Notifications drive follow-up learning.',
        active: ['notifications'],
        edges: [['notifications','client']]
      }
    ]
  },

  remind: {
    title: 'Remind',
    steps: [
      {
        title: 'Create class + roster',
        desc: 'Teacher creates class and manages roster.',
        active: ['client','auth','classes','roster'],
        edges: [['client','auth'], ['auth','classes'], ['classes','roster']]
      },
      {
        title: 'Send message',
        desc: 'Messages go through messaging service and fan out notifications.',
        active: ['messaging','notifications'],
        edges: [['classes','messaging'], ['messaging','notifications']]
      },
      {
        title: 'Attachments',
        desc: 'Attachments stored and delivered to the class.',
        active: ['attachments'],
        edges: [['messaging','attachments'], ['attachments','classes']]
      },
      {
        title: 'Admin + integrations',
        desc: 'Admin and integrations support school-wide setup.',
        active: ['admin','integrations'],
        edges: [['admin','integrations']]
      },
      {
        title: 'Moderation + analytics + billing',
        desc: 'Moderation enforces policies; analytics and billing track usage.',
        active: ['moderation','analytics','billing'],
        edges: [['moderation','messaging'], ['messaging','analytics'], ['billing','analytics']]
      }
    ]
  },

  classdojo: {
    title: 'ClassDojo',
    steps: [
      {
        title: 'Set up classroom',
        desc: 'Teacher creates classroom and student roster.',
        active: ['client','auth','classrooms','students'],
        edges: [['client','auth'], ['auth','classrooms'], ['classrooms','students']]
      },
      {
        title: 'Points + feed updates',
        desc: 'Behavior points update feed and parent views.',
        active: ['points','feed','notifications'],
        edges: [['students','points'], ['points','feed'], ['feed','notifications']]
      },
      {
        title: 'Messaging',
        desc: 'Messaging with parents and announcements drive engagement.',
        active: ['messaging','notifications'],
        edges: [['feed','messaging'], ['messaging','notifications']]
      },
      {
        title: 'Portfolios',
        desc: 'Student portfolios store artifacts and share updates.',
        active: ['portfolios','notifications'],
        edges: [['students','portfolios'], ['portfolios','notifications']]
      },
      {
        title: 'Moderation + billing + analytics',
        desc: 'Moderation ensures safety; billing and analytics track usage.',
        active: ['moderation','billing','analytics'],
        edges: [['moderation','feed'], ['billing','analytics'], ['feed','analytics']]
      }
    ]
  },

  seesaw: {
    title: 'Seesaw',
    steps: [
      {
        title: 'Assign work',
        desc: 'Teacher creates assignment for a class.',
        active: ['client','auth','classes','assignments'],
        edges: [['client','auth'], ['auth','classes'], ['classes','assignments']]
      },
      {
        title: 'Student submission',
        desc: 'Students submit work; submissions stored in portfolio.',
        active: ['submissions','portfolio'],
        edges: [['assignments','submissions'], ['submissions','portfolio']]
      },
      {
        title: 'Feedback + messaging',
        desc: 'Teacher feedback and messaging notify parents/students.',
        active: ['feedback','messaging','notifications'],
        edges: [['portfolio','feedback'], ['feedback','notifications'], ['messaging','notifications']]
      },
      {
        title: 'Moderation + integrations',
        desc: 'Moderation for safety; integrations sync rosters/classes.',
        active: ['moderation','integrations'],
        edges: [['moderation','portfolio'], ['integrations','classes']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks engagement and learning outcomes.',
        active: ['analytics'],
        edges: [['portfolio','analytics']]
      }
    ]
  },

  blackboard: {
    title: 'Blackboard',
    steps: [
      {
        title: 'Access course',
        desc: 'User signs in and opens a course with content.',
        active: ['client','auth','courses','content'],
        edges: [['client','auth'], ['auth','courses'], ['courses','content']]
      },
      {
        title: 'Assignments + submissions',
        desc: 'Students submit assignments; submissions stored and queued for grading.',
        active: ['assignments','submissions'],
        edges: [['courses','assignments'], ['assignments','submissions']]
      },
      {
        title: 'Grading + gradebook',
        desc: 'Grading updates gradebook and triggers notifications.',
        active: ['grading','gradebook','notifications'],
        edges: [['submissions','grading'], ['grading','gradebook'], ['gradebook','notifications']]
      },
      {
        title: 'Discussions',
        desc: 'Discussion threads drive engagement and announcements.',
        active: ['discussions','notifications'],
        edges: [['courses','discussions'], ['discussions','notifications']]
      },
      {
        title: 'Integrations + admin + analytics',
        desc: 'Integrations and admin manage institution setup; analytics measures usage; billing for enterprise.',
        active: ['integrations','admin','analytics','billing'],
        edges: [['integrations','admin'], ['admin','analytics'], ['billing','analytics']]
      }
    ]
  },

  moodle: {
    title: 'Moodle',
    steps: [
      {
        title: 'Login + open course',
        desc: 'User authenticates and opens a course site.',
        active: ['client','auth','courses','content'],
        edges: [['client','auth'], ['auth','courses'], ['courses','content']]
      },
      {
        title: 'Assignments + submissions',
        desc: 'Assignments are created and student submissions stored.',
        active: ['assignments','submissions'],
        edges: [['courses','assignments'], ['assignments','submissions']]
      },
      {
        title: 'Grading + gradebook',
        desc: 'Grading updates gradebook and notifies students.',
        active: ['grading','gradebook','notifications'],
        edges: [['submissions','grading'], ['grading','gradebook'], ['gradebook','notifications']]
      },
      {
        title: 'Forums + messaging',
        desc: 'Forums and messaging drive engagement and announcements.',
        active: ['forums','messaging','notifications'],
        edges: [['courses','forums'], ['forums','messaging'], ['messaging','notifications']]
      },
      {
        title: 'Plugins + analytics',
        desc: 'Plugins/integrations extend LMS; analytics tracks usage.',
        active: ['plugins','integrations','analytics'],
        edges: [['plugins','integrations'], ['courses','analytics']]
      }
    ]
  },

  'canvas-lms': {
    title: 'Canvas LMS',
    steps: [
      {
        title: 'Authenticate + select course',
        desc: 'User signs in via SSO and selects a course.',
        active: ['client','auth','sso','courses'],
        edges: [['client','auth'], ['auth','sso'], ['sso','courses']]
      },
      {
        title: 'Content + modules',
        desc: 'Course content and modules delivered to learners.',
        active: ['content','modules'],
        edges: [['courses','modules'], ['modules','content']]
      },
      {
        title: 'Assignments + submissions',
        desc: 'Students submit work; submissions stored and queued for grading.',
        active: ['assignments','submissions','grading'],
        edges: [['courses','assignments'], ['assignments','submissions'], ['submissions','grading']]
      },
      {
        title: 'Gradebook + notifications',
        desc: 'Grades update gradebook and notify students.',
        active: ['gradebook','notifications'],
        edges: [['grading','gradebook'], ['gradebook','notifications']]
      },
      {
        title: 'Integrations + analytics',
        desc: 'LTI/integrations connect tools; analytics reports outcomes.',
        active: ['integrations','analytics','admin'],
        edges: [['integrations','courses'], ['admin','integrations'], ['courses','analytics']]
      }
    ]
  },

  'google-classroom': {
    title: 'Google Classroom',
    steps: [
      {
        title: 'Sign in + join class',
        desc: 'Teacher/student signs in and joins a class.',
        active: ['client','auth','classes','roster'],
        edges: [['client','auth'], ['auth','classes'], ['classes','roster']]
      },
      {
        title: 'Post assignment',
        desc: 'Teacher posts assignment with Drive attachments.',
        active: ['assignments','drive','content'],
        edges: [['classes','assignments'], ['assignments','drive'], ['drive','content']]
      },
      {
        title: 'Submission + grading',
        desc: 'Students submit via Drive; grading updates gradebook.',
        active: ['submissions','grading','gradebook'],
        edges: [['content','submissions'], ['submissions','grading'], ['grading','gradebook']]
      },
      {
        title: 'Stream + notifications',
        desc: 'Class stream and comments generate notifications.',
        active: ['stream','notifications'],
        edges: [['classes','stream'], ['stream','notifications']]
      },
      {
        title: 'Admin + analytics',
        desc: 'Admin policies and analytics across classes.',
        active: ['admin','analytics'],
        edges: [['admin','classes'], ['classes','analytics']]
      }
    ]
  },

  noteflight: {
    title: 'Noteflight',
    steps: [
      {
        title: 'Create score in editor',
        desc: 'User signs in and creates a score in the notation editor.',
        active: ['client','auth','editor','scores'],
        edges: [['client','auth'], ['auth','editor'], ['editor','scores']]
      },
      {
        title: 'Playback + instruments',
        desc: 'Playback renders with instrument library and audio engine.',
        active: ['playback','instruments','audio'],
        edges: [['scores','playback'], ['playback','instruments'], ['instruments','audio']]
      },
      {
        title: 'Share + collaborate',
        desc: 'Sharing and collaboration features with comments.',
        active: ['sharing','collaboration','comments'],
        edges: [['scores','sharing'], ['sharing','collaboration'], ['collaboration','comments']]
      },
      {
        title: 'Export + printing',
        desc: 'Export to PDF/MIDI and printing pipeline.',
        active: ['export','storage'],
        edges: [['scores','export'], ['export','storage']]
      },
      {
        title: 'Subscriptions + analytics',
        desc: 'Billing/subscriptions for premium; analytics tracks usage.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['scores','analytics']]
      }
    ]
  },

  yousician: {
    title: 'Yousician',
    steps: [
      {
        title: 'Start lesson + calibration',
        desc: 'User signs in and starts lesson; microphone calibration runs.',
        active: ['client','auth','lessons','calibration'],
        edges: [['client','auth'], ['auth','lessons'], ['lessons','calibration']]
      },
      {
        title: 'Real-time note detection',
        desc: 'Audio capture feeds pitch detection and scoring engine.',
        active: ['audio','detection','scoring'],
        edges: [['client','audio'], ['audio','detection'], ['detection','scoring']]
      },
      {
        title: 'Feedback + progression',
        desc: 'Feedback updates progression, streaks, and recommendations.',
        active: ['feedback','progress','recommendations'],
        edges: [['scoring','feedback'], ['feedback','progress'], ['progress','recommendations']]
      },
      {
        title: 'Practice sessions + leaderboard',
        desc: 'Sessions stored; leaderboards and achievements update.',
        active: ['sessions','leaderboards','achievements'],
        edges: [['lessons','sessions'], ['sessions','leaderboards'], ['sessions','achievements']]
      },
      {
        title: 'Subscription billing + analytics',
        desc: 'Premium access via subscriptions; analytics tracks retention.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['sessions','analytics']]
      }
    ]
  },

  'simply-piano': {
    title: 'Simply Piano',
    steps: [
      {
        title: 'Start lesson',
        desc: 'User starts a piano lesson and sets up mic input.',
        active: ['client','auth','lessons','audio'],
        edges: [['client','auth'], ['auth','lessons'], ['client','audio']]
      },
      {
        title: 'Listen + detect notes',
        desc: 'Audio detection and scoring provide real-time feedback.',
        active: ['detection','scoring','feedback'],
        edges: [['audio','detection'], ['detection','scoring'], ['scoring','feedback']]
      },
      {
        title: 'Progress tracking',
        desc: 'Progress updates and recommendations plan next lessons.',
        active: ['progress','recommendations'],
        edges: [['feedback','progress'], ['progress','recommendations']]
      },
      {
        title: 'Subscription + billing',
        desc: 'Subscriptions unlock content; payments manage renewals.',
        active: ['subscriptions','payments','notifications'],
        edges: [['subscriptions','payments'], ['payments','notifications']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks engagement and completion rates.',
        active: ['analytics'],
        edges: [['progress','analytics']]
      }
    ]
  },

  'fender-play': {
    title: 'Fender Play',
    steps: [
      {
        title: 'Browse courses + start lesson',
        desc: 'User signs in, selects course, and starts a lesson.',
        active: ['client','auth','catalog','courses','lessons'],
        edges: [['client','auth'], ['auth','catalog'], ['catalog','courses'], ['courses','lessons']]
      },
      {
        title: 'Video + exercises',
        desc: 'Video delivered via CDN; exercises tracked in progress.',
        active: ['video','cdn','exercises','progress'],
        edges: [['lessons','video'], ['video','cdn'], ['lessons','exercises'], ['exercises','progress']]
      },
      {
        title: 'Practice tracking',
        desc: 'Practice sessions update streaks and recommendations.',
        active: ['sessions','recommendations'],
        edges: [['progress','sessions'], ['sessions','recommendations']]
      },
      {
        title: 'Subscription billing',
        desc: 'Subscriptions unlock full catalog; billing and notifications.',
        active: ['subscriptions','payments','notifications'],
        edges: [['subscriptions','payments'], ['payments','notifications']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks lesson completion and retention.',
        active: ['analytics'],
        edges: [['sessions','analytics']]
      }
    ]
  },

  'ultimate-guitar': {
    title: 'Ultimate Guitar',
    steps: [
      {
        title: 'Search tabs',
        desc: 'User searches tabs/chords and opens a tab page.',
        active: ['client','auth','search','tabs'],
        edges: [['client','search'], ['search','tabs'], ['client','auth']]
      },
      {
        title: 'Playback + tools',
        desc: 'Playback tools like metronome and transposer run.',
        active: ['playback','tools'],
        edges: [['tabs','playback'], ['playback','tools']]
      },
      {
        title: 'Community contributions',
        desc: 'Users upload/edit tabs; moderation ensures quality.',
        active: ['uploads','moderation','profiles'],
        edges: [['profiles','uploads'], ['uploads','moderation']]
      },
      {
        title: 'Subscriptions + ads',
        desc: 'Subscriptions/payments for premium; ads monetize free tier.',
        active: ['subscriptions','payments','ads'],
        edges: [['subscriptions','payments'], ['ads','analytics']]
      },
      {
        title: 'Analytics + notifications',
        desc: 'Analytics tracks engagement; notifications for favorites.',
        active: ['analytics','notifications'],
        edges: [['tabs','analytics'], ['notifications','client']]
      }
    ]
  },

  garageband: {
    title: 'GarageBand',
    steps: [
      {
        title: 'Create project',
        desc: 'User creates a project and selects instruments/loops.',
        active: ['client','projects','instruments','loops'],
        edges: [['client','projects'], ['projects','instruments'], ['projects','loops']]
      },
      {
        title: 'Record + edit tracks',
        desc: 'Recording and editing produce track assets.',
        active: ['recording','editing','tracks'],
        edges: [['instruments','recording'], ['recording','tracks'], ['tracks','editing']]
      },
      {
        title: 'Mix + effects',
        desc: 'Mixer applies effects chain and automation.',
        active: ['mixer','effects'],
        edges: [['tracks','mixer'], ['mixer','effects']]
      },
      {
        title: 'Export',
        desc: 'Export bounces project to audio file and saves to storage.',
        active: ['export','storage'],
        edges: [['mixer','export'], ['export','storage']]
      },
      {
        title: 'Share',
        desc: 'Sharing to services / iCloud collaboration if enabled.',
        active: ['sharing','cloud'],
        edges: [['storage','sharing'], ['sharing','cloud']]
      }
    ]
  },

  'fl-studio-mobile': {
    title: 'FL Studio Mobile',
    steps: [
      {
        title: 'Create project + instruments',
        desc: 'User creates a project and adds instruments/samples.',
        active: ['client','projects','instruments','samples'],
        edges: [['client','projects'], ['projects','instruments'], ['projects','samples']]
      },
      {
        title: 'Sequence + record',
        desc: 'Sequencer records patterns and clips.',
        active: ['sequencer','recording','tracks'],
        edges: [['instruments','sequencer'], ['sequencer','tracks'], ['tracks','recording']]
      },
      {
        title: 'Mix + effects',
        desc: 'Mixer and effects chain shape sound.',
        active: ['mixer','effects'],
        edges: [['tracks','mixer'], ['mixer','effects']]
      },
      {
        title: 'Export + cloud',
        desc: 'Export project and optionally sync to cloud.',
        active: ['export','storage','cloud'],
        edges: [['mixer','export'], ['export','storage'], ['storage','cloud']]
      },
      {
        title: 'Analytics',
        desc: 'Usage analytics and crash logs.',
        active: ['analytics','logs'],
        edges: [['client','analytics'], ['client','logs']]
      }
    ]
  },

  bandlab: {
    title: 'BandLab',
    steps: [
      {
        title: 'Create project in cloud studio',
        desc: 'User signs in and creates project in web/mobile studio.',
        active: ['client','auth','projects','studio'],
        edges: [['client','auth'], ['auth','projects'], ['projects','studio']]
      },
      {
        title: 'Record + collaborate',
        desc: 'Recording stored in cloud; collaboration merges revisions.',
        active: ['recording','storage','collaboration'],
        edges: [['studio','recording'], ['recording','storage'], ['storage','collaboration']]
      },
      {
        title: 'Mix + publish',
        desc: 'Mixing pipeline and publishing to community feed.',
        active: ['mixer','effects','publish','community'],
        edges: [['storage','mixer'], ['mixer','effects'], ['effects','publish'], ['publish','community']]
      },
      {
        title: 'Social + notifications',
        desc: 'Likes/comments/follows generate notifications.',
        active: ['social','notifications'],
        edges: [['community','social'], ['social','notifications']]
      },
      {
        title: 'Analytics + monetization',
        desc: 'Analytics for creators; subscriptions/payments for features.',
        active: ['analytics','subscriptions','payments'],
        edges: [['publish','analytics'], ['subscriptions','payments']]
      }
    ]
  },

  soundtrap: {
    title: 'Soundtrap',
    steps: [
      {
        title: 'Create project',
        desc: 'User signs in and creates project in browser studio.',
        active: ['client','auth','projects','studio'],
        edges: [['client','auth'], ['auth','projects'], ['projects','studio']]
      },
      {
        title: 'Record + loops',
        desc: 'Record audio/MIDI and add loops/samples.',
        active: ['recording','loops','samples'],
        edges: [['studio','recording'], ['studio','loops'], ['loops','samples']]
      },
      {
        title: 'Collaboration',
        desc: 'Real-time collaboration syncs changes and versions.',
        active: ['collaboration','versions'],
        edges: [['studio','collaboration'], ['collaboration','versions']]
      },
      {
        title: 'Export + publishing',
        desc: 'Export mixes and optionally publish/share.',
        active: ['export','storage','sharing'],
        edges: [['studio','export'], ['export','storage'], ['storage','sharing']]
      },
      {
        title: 'Subscriptions + analytics',
        desc: 'Subscriptions manage access; analytics track usage.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['projects','analytics']]
      }
    ]
  },

  splice: {
    title: 'Splice',
    steps: [
      {
        title: 'Browse sounds catalog',
        desc: 'User signs in and browses sounds/packs.',
        active: ['client','auth','catalog','sounds'],
        edges: [['client','auth'], ['auth','catalog'], ['catalog','sounds']]
      },
      {
        title: 'Download via CDN',
        desc: 'Sounds are delivered via CDN to local workstation.',
        active: ['cdn','downloads'],
        edges: [['sounds','cdn'], ['cdn','downloads']]
      },
      {
        title: 'Studio sync / backup',
        desc: 'Project backup and versioning syncs with cloud.',
        active: ['projects','sync','versions'],
        edges: [['downloads','projects'], ['projects','sync'], ['sync','versions']]
      },
      {
        title: 'Subscriptions + payments',
        desc: 'Subscriptions manage credits and billing.',
        active: ['subscriptions','payments','billing'],
        edges: [['subscriptions','payments'], ['payments','billing']]
      },
      {
        title: 'Recommendations + analytics',
        desc: 'Recommendations for sounds; analytics for engagement.',
        active: ['recommendations','analytics'],
        edges: [['analytics','recommendations'], ['catalog','analytics']]
      }
    ]
  },

  'adobe-express': {
    title: 'Adobe Express',
    steps: [
      {
        title: 'Start design',
        desc: 'User signs in and starts a template-based design.',
        active: ['client','auth','templates','editor'],
        edges: [['client','auth'], ['auth','templates'], ['templates','editor']]
      },
      {
        title: 'Assets + fonts',
        desc: 'Assets and fonts pulled from libraries/CDN.',
        active: ['assets','fonts','cdn'],
        edges: [['editor','assets'], ['assets','cdn'], ['fonts','cdn']]
      },
      {
        title: 'Export + publish',
        desc: 'Export renders media and publishes/share links.',
        active: ['render','export','sharing'],
        edges: [['editor','render'], ['render','export'], ['export','sharing']]
      },
      {
        title: 'Team collaboration',
        desc: 'Collaboration and comments support teams.',
        active: ['collaboration','comments'],
        edges: [['editor','collaboration'], ['collaboration','comments']]
      },
      {
        title: 'Subscriptions + analytics',
        desc: 'Creative Cloud subscriptions and analytics.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['export','analytics']]
      }
    ]
  },

  picsart: {
    title: 'PicsArt',
    steps: [
      {
        title: 'Edit photo/video',
        desc: 'User opens editor and imports media assets.',
        active: ['client','auth','editor','media'],
        edges: [['client','auth'], ['auth','editor'], ['editor','media']]
      },
      {
        title: 'Apply effects + AI tools',
        desc: 'Effects and AI tools process media and update previews.',
        active: ['effects','ai','render'],
        edges: [['editor','effects'], ['effects','ai'], ['ai','render']]
      },
      {
        title: 'Export + share',
        desc: 'Export media and share/publish.',
        active: ['export','sharing'],
        edges: [['render','export'], ['export','sharing']]
      },
      {
        title: 'Community + notifications',
        desc: 'Community feed interactions generate notifications.',
        active: ['community','notifications'],
        edges: [['sharing','community'], ['community','notifications']]
      },
      {
        title: 'Subscriptions + analytics',
        desc: 'Premium subscription; analytics tracks engagement.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['export','analytics']]
      }
    ]
  },

  snapseed: {
    title: 'Snapseed',
    steps: [
      {
        title: 'Import photo',
        desc: 'User imports photo into editor.',
        active: ['client','editor','media'],
        edges: [['client','editor'], ['editor','media']]
      },
      {
        title: 'Apply edits',
        desc: 'Filters and tools applied locally; render updates preview.',
        active: ['effects','render'],
        edges: [['media','effects'], ['effects','render']]
      },
      {
        title: 'Export',
        desc: 'Export writes edited image to device storage.',
        active: ['export','storage'],
        edges: [['render','export'], ['export','storage']]
      },
      {
        title: 'Share',
        desc: 'Share to external apps.',
        active: ['sharing'],
        edges: [['storage','sharing']]
      }
    ]
  },

  'lightroom-mobile': {
    title: 'Lightroom Mobile',
    steps: [
      {
        title: 'Sign in + import',
        desc: 'User signs in and imports photos.',
        active: ['client','auth','library','media'],
        edges: [['client','auth'], ['auth','library'], ['client','media']]
      },
      {
        title: 'Edit + presets',
        desc: 'Edits and presets applied; previews rendered.',
        active: ['editor','presets','render'],
        edges: [['library','editor'], ['editor','presets'], ['presets','render']]
      },
      {
        title: 'Cloud sync',
        desc: 'Cloud sync stores originals/edits and enables cross-device.',
        active: ['cloud','sync','storage'],
        edges: [['library','sync'], ['sync','cloud'], ['cloud','storage']]
      },
      {
        title: 'Export + share',
        desc: 'Export images and share externally.',
        active: ['export','sharing'],
        edges: [['render','export'], ['export','sharing']]
      },
      {
        title: 'Subscription billing + analytics',
        desc: 'Subscriptions manage premium features; analytics tracks usage.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['export','analytics']]
      }
    ]
  },

  'vsco-editor': {
    title: 'VSCO Editor',
    steps: [
      {
        title: 'Import + edit',
        desc: 'User imports photos and edits with presets.',
        active: ['client','auth','library','editor','presets'],
        edges: [['client','auth'], ['auth','library'], ['library','editor'], ['editor','presets']]
      },
      {
        title: 'Render + export',
        desc: 'Render previews and export edited images.',
        active: ['render','export'],
        edges: [['presets','render'], ['render','export']]
      },
      {
        title: 'Publish to community',
        desc: 'Publish to VSCO community; notifications for interactions.',
        active: ['community','notifications'],
        edges: [['export','community'], ['community','notifications']]
      },
      {
        title: 'Subscription',
        desc: 'Membership unlocks presets and tools.',
        active: ['subscriptions','payments'],
        edges: [['subscriptions','payments']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks engagement and retention.',
        active: ['analytics'],
        edges: [['community','analytics']]
      }
    ]
  },

  facetune: {
    title: 'Facetune',
    steps: [
      {
        title: 'Import portrait',
        desc: 'User imports portrait into editor.',
        active: ['client','editor','media'],
        edges: [['client','editor'], ['editor','media']]
      },
      {
        title: 'AI retouch',
        desc: 'AI retouch models apply edits and render results.',
        active: ['ai','effects','render'],
        edges: [['media','ai'], ['ai','effects'], ['effects','render']]
      },
      {
        title: 'Export + share',
        desc: 'Export edited image and share.',
        active: ['export','sharing'],
        edges: [['render','export'], ['export','sharing']]
      },
      {
        title: 'Subscription',
        desc: 'Premium tools unlocked via subscription billing.',
        active: ['subscriptions','payments'],
        edges: [['subscriptions','payments']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks usage and conversion.',
        active: ['analytics'],
        edges: [['export','analytics']]
      }
    ]
  },

  remini: {
    title: 'Remini',
    steps: [
      {
        title: 'Upload photo',
        desc: 'User uploads a photo to enhance.',
        active: ['client','media','upload'],
        edges: [['client','media'], ['media','upload']]
      },
      {
        title: 'AI enhancement',
        desc: 'Enhancement pipeline runs on AI backend and returns result.',
        active: ['ai','render'],
        edges: [['upload','ai'], ['ai','render']]
      },
      {
        title: 'Export',
        desc: 'User exports enhanced image to storage.',
        active: ['export','storage'],
        edges: [['render','export'], ['export','storage']]
      },
      {
        title: 'Subscription + billing',
        desc: 'Subscriptions manage credits and premium enhancements.',
        active: ['subscriptions','payments','notifications'],
        edges: [['subscriptions','payments'], ['payments','notifications']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks throughput and retention.',
        active: ['analytics'],
        edges: [['render','analytics']]
      }
    ]
  },

  lensa: {
    title: 'Lensa',
    steps: [
      {
        title: 'Import selfies',
        desc: 'User imports selfies into app for editing.',
        active: ['client','media','editor'],
        edges: [['client','media'], ['media','editor']]
      },
      {
        title: 'AI filters / avatars',
        desc: 'AI backend generates edits/avatars and returns renders.',
        active: ['ai','render','effects'],
        edges: [['editor','ai'], ['ai','render'], ['render','effects']]
      },
      {
        title: 'Export + share',
        desc: 'Export images and share externally.',
        active: ['export','sharing'],
        edges: [['effects','export'], ['export','sharing']]
      },
      {
        title: 'Subscription billing',
        desc: 'Subscriptions and payments manage premium features.',
        active: ['subscriptions','payments'],
        edges: [['subscriptions','payments']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks conversion and usage.',
        active: ['analytics'],
        edges: [['export','analytics']]
      }
    ]
  },

  'capcut-editor': {
    title: 'CapCut Editor',
    steps: [
      {
        title: 'Import clips',
        desc: 'User imports clips into timeline editor.',
        active: ['client','editor','media','timeline'],
        edges: [['client','editor'], ['editor','media'], ['media','timeline']]
      },
      {
        title: 'Edit + effects',
        desc: 'Effects, transitions, and templates applied to timeline.',
        active: ['effects','templates','render'],
        edges: [['timeline','effects'], ['effects','templates'], ['templates','render']]
      },
      {
        title: 'AI tools',
        desc: 'AI tools like captions/background removal run and update render.',
        active: ['ai','render'],
        edges: [['timeline','ai'], ['ai','render']]
      },
      {
        title: 'Export + publish',
        desc: 'Export video and publish/share.',
        active: ['export','sharing'],
        edges: [['render','export'], ['export','sharing']]
      },
      {
        title: 'Analytics + monetization',
        desc: 'Analytics for exports; subscription/billing for premium.',
        active: ['analytics','subscriptions','payments'],
        edges: [['export','analytics'], ['subscriptions','payments']]
      }
    ]
  },

  inshot: {
    title: 'InShot',
    steps: [
      {
        title: 'Import + edit',
        desc: 'User imports media and edits in timeline.',
        active: ['client','editor','media','timeline'],
        edges: [['client','editor'], ['editor','media'], ['media','timeline']]
      },
      {
        title: 'Effects + music',
        desc: 'Effects and music library applied; render preview updates.',
        active: ['effects','music','render'],
        edges: [['timeline','effects'], ['effects','render'], ['music','timeline']]
      },
      {
        title: 'Export + share',
        desc: 'Export video to storage and share.',
        active: ['export','storage','sharing'],
        edges: [['render','export'], ['export','storage'], ['storage','sharing']]
      },
      {
        title: 'Ads + subscriptions',
        desc: 'Ads monetize free tier; subscriptions remove ads and unlock features.',
        active: ['ads','subscriptions','payments'],
        edges: [['ads','analytics'], ['subscriptions','payments']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks usage and conversion.',
        active: ['analytics'],
        edges: [['export','analytics']]
      }
    ]
  },

  'vn-editor': {
    title: 'VN Editor',
    steps: [
      {
        title: 'Edit timeline',
        desc: 'User imports clips and edits timeline.',
        active: ['client','editor','media','timeline'],
        edges: [['client','editor'], ['editor','media'], ['media','timeline']]
      },
      {
        title: 'Transitions + effects',
        desc: 'Effects applied and rendered into preview.',
        active: ['effects','render'],
        edges: [['timeline','effects'], ['effects','render']]
      },
      {
        title: 'Export',
        desc: 'Export final video to storage.',
        active: ['export','storage'],
        edges: [['render','export'], ['export','storage']]
      },
      {
        title: 'Share',
        desc: 'Share externally.',
        active: ['sharing'],
        edges: [['storage','sharing']]
      }
    ]
  },

  kinemaster: {
    title: 'Kinemaster',
    steps: [
      {
        title: 'Project + timeline',
        desc: 'User creates project and edits timeline.',
        active: ['client','auth','projects','timeline','editor'],
        edges: [['client','auth'], ['auth','projects'], ['projects','timeline'], ['timeline','editor']]
      },
      {
        title: 'Assets + effects',
        desc: 'Asset store downloads effects and templates.',
        active: ['assets','effects','store'],
        edges: [['store','assets'], ['assets','effects']]
      },
      {
        title: 'Render + export',
        desc: 'Render pipeline exports final video.',
        active: ['render','export','storage'],
        edges: [['editor','render'], ['render','export'], ['export','storage']]
      },
      {
        title: 'Subscription billing',
        desc: 'Subscriptions/payments unlock premium assets.',
        active: ['subscriptions','payments'],
        edges: [['subscriptions','payments']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks creation and export funnel.',
        active: ['analytics'],
        edges: [['export','analytics']]
      }
    ]
  },

  filmorago: {
    title: 'FilmoraGo',
    steps: [
      {
        title: 'Import + edit',
        desc: 'User imports clips and edits timeline with templates.',
        active: ['client','editor','media','timeline','templates'],
        edges: [['client','editor'], ['editor','media'], ['media','timeline'], ['timeline','templates']]
      },
      {
        title: 'Effects + music',
        desc: 'Effects and music added; render preview updates.',
        active: ['effects','music','render'],
        edges: [['templates','effects'], ['effects','render'], ['music','timeline']]
      },
      {
        title: 'Export + share',
        desc: 'Export to storage and share.',
        active: ['export','storage','sharing'],
        edges: [['render','export'], ['export','storage'], ['storage','sharing']]
      },
      {
        title: 'Subscriptions',
        desc: 'Subscriptions manage premium assets and exports.',
        active: ['subscriptions','payments'],
        edges: [['subscriptions','payments']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks engagement and conversion.',
        active: ['analytics'],
        edges: [['export','analytics']]
      }
    ]
  },

  'alight-motion': {
    title: 'Alight Motion',
    steps: [
      {
        title: 'Create motion project',
        desc: 'User creates motion graphics project with layers.',
        active: ['client','editor','projects','timeline'],
        edges: [['client','editor'], ['editor','projects'], ['projects','timeline']]
      },
      {
        title: 'Effects + keyframes',
        desc: 'Effects and keyframes applied; render preview updates.',
        active: ['effects','keyframes','render'],
        edges: [['timeline','keyframes'], ['keyframes','effects'], ['effects','render']]
      },
      {
        title: 'Asset packs',
        desc: 'Asset packs downloaded and used in projects.',
        active: ['assets','store'],
        edges: [['store','assets'], ['assets','timeline']]
      },
      {
        title: 'Export',
        desc: 'Export render to storage and share.',
        active: ['export','storage','sharing'],
        edges: [['render','export'], ['export','storage'], ['storage','sharing']]
      },
      {
        title: 'Subscriptions + analytics',
        desc: 'Subscriptions unlock features; analytics tracks usage.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['export','analytics']]
      }
    ]
  },

  mojo: {
    title: 'Mojo',
    steps: [
      {
        title: 'Choose template',
        desc: 'User chooses a story template in editor.',
        active: ['client','templates','editor'],
        edges: [['client','templates'], ['templates','editor']]
      },
      {
        title: 'Edit + assets',
        desc: 'Assets and typography applied; render updates.',
        active: ['assets','fonts','render'],
        edges: [['editor','assets'], ['assets','fonts'], ['fonts','render']]
      },
      {
        title: 'Export + share',
        desc: 'Export story and share.',
        active: ['export','sharing'],
        edges: [['render','export'], ['export','sharing']]
      },
      {
        title: 'Subscriptions + analytics',
        desc: 'Premium templates via subscriptions; analytics tracks usage.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['export','analytics']]
      }
    ]
  },

  unfold: {
    title: 'Unfold',
    steps: [
      {
        title: 'Select template',
        desc: 'User selects template for story/content.',
        active: ['client','templates','editor'],
        edges: [['client','templates'], ['templates','editor']]
      },
      {
        title: 'Design + assets',
        desc: 'Editor uses assets and fonts; renders previews.',
        active: ['assets','fonts','render'],
        edges: [['editor','assets'], ['assets','fonts'], ['fonts','render']]
      },
      {
        title: 'Export + share',
        desc: 'Export to device and share.',
        active: ['export','sharing'],
        edges: [['render','export'], ['export','sharing']]
      },
      {
        title: 'Subscription + analytics',
        desc: 'Subscriptions unlock packs; analytics tracks engagement.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['export','analytics']]
      }
    ]
  },

  linktree: {
    title: 'Linktree',
    steps: [
      {
        title: 'Create page',
        desc: 'Creator signs in and creates link page.',
        active: ['client','auth','editor','pages'],
        edges: [['client','auth'], ['auth','pages'], ['pages','editor']]
      },
      {
        title: 'Add links + analytics',
        desc: 'Links configured; analytics tracks clicks.',
        active: ['links','analytics'],
        edges: [['editor','links'], ['links','analytics']]
      },
      {
        title: 'Publish + CDN',
        desc: 'Page published and served via CDN.',
        active: ['publish','cdn'],
        edges: [['pages','publish'], ['publish','cdn']]
      },
      {
        title: 'Monetization',
        desc: 'Pro subscriptions unlock features and integrations.',
        active: ['subscriptions','payments','integrations'],
        edges: [['subscriptions','payments'], ['editor','integrations']]
      },
      {
        title: 'Notifications',
        desc: 'Notifications for milestones and creator updates.',
        active: ['notifications'],
        edges: [['notifications','client']]
      }
    ]
  },

  beacons: {
    title: 'Beacons',
    steps: [
      {
        title: 'Build creator page',
        desc: 'Creator signs in and builds a landing page.',
        active: ['client','auth','pages','editor'],
        edges: [['client','auth'], ['auth','pages'], ['pages','editor']]
      },
      {
        title: 'Add links + email capture',
        desc: 'Links and lead capture configured; contacts stored.',
        active: ['links','forms','contacts'],
        edges: [['editor','links'], ['editor','forms'], ['forms','contacts']]
      },
      {
        title: 'Publish + CDN',
        desc: 'Published site served via CDN; analytics tracks clicks.',
        active: ['publish','cdn','analytics'],
        edges: [['pages','publish'], ['publish','cdn'], ['links','analytics']]
      },
      {
        title: 'Monetization',
        desc: 'Subscriptions/payments unlock features and storefronts.',
        active: ['subscriptions','payments','store'],
        edges: [['subscriptions','payments'], ['payments','store']]
      }
    ]
  },

  'stan-store': {
    title: 'Stan Store',
    steps: [
      {
        title: 'Create storefront',
        desc: 'Creator signs in and configures storefront.',
        active: ['client','auth','store','products'],
        edges: [['client','auth'], ['auth','store'], ['store','products']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Customer purchases; payments create order and access.',
        active: ['checkout','payments','orders'],
        edges: [['products','checkout'], ['checkout','payments'], ['payments','orders']]
      },
      {
        title: 'Digital delivery',
        desc: 'Digital goods delivered; email/notifications sent.',
        active: ['delivery','email','notifications'],
        edges: [['orders','delivery'], ['delivery','email'], ['email','notifications']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks conversion and revenue.',
        active: ['analytics'],
        edges: [['orders','analytics']]
      }
    ]
  },

  gumroad: {
    title: 'Gumroad',
    steps: [
      {
        title: 'Publish product',
        desc: 'Creator publishes digital product with assets.',
        active: ['client','auth','products','assets'],
        edges: [['client','auth'], ['auth','products'], ['products','assets']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Customer purchases; payments create order.',
        active: ['checkout','payments','orders'],
        edges: [['products','checkout'], ['checkout','payments'], ['payments','orders']]
      },
      {
        title: 'Delivery + emails',
        desc: 'Digital delivery and email receipts/download links.',
        active: ['delivery','email','notifications'],
        edges: [['orders','delivery'], ['delivery','email'], ['email','notifications']]
      },
      {
        title: 'Payouts',
        desc: 'Payouts send creator earnings.',
        active: ['payouts'],
        edges: [['payments','payouts']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks sales funnel and revenue.',
        active: ['analytics'],
        edges: [['orders','analytics']]
      }
    ]
  },

  'lemon-squeezy': {
    title: 'Lemon Squeezy',
    steps: [
      {
        title: 'Create product + license',
        desc: 'Creator configures product, pricing, and licensing.',
        active: ['client','auth','products','licenses'],
        edges: [['client','auth'], ['auth','products'], ['products','licenses']]
      },
      {
        title: 'Checkout + tax',
        desc: 'Checkout processes tax/VAT and payment.',
        active: ['checkout','tax','payments'],
        edges: [['products','checkout'], ['checkout','tax'], ['checkout','payments']]
      },
      {
        title: 'Order + delivery',
        desc: 'Orders created; license keys and downloads delivered.',
        active: ['orders','delivery','email'],
        edges: [['payments','orders'], ['orders','delivery'], ['delivery','email']]
      },
      {
        title: 'Subscriptions',
        desc: 'Subscriptions manage renewals and invoicing.',
        active: ['subscriptions','billing','notifications'],
        edges: [['orders','subscriptions'], ['subscriptions','billing'], ['billing','notifications']]
      },
      {
        title: 'Analytics + payouts',
        desc: 'Analytics tracks revenue; payouts to creators.',
        active: ['analytics','payouts'],
        edges: [['orders','analytics'], ['payments','payouts']]
      }
    ]
  },

  'ko-fi': {
    title: 'Ko-fi',
    steps: [
      {
        title: 'Creator page setup',
        desc: 'Creator signs in and sets up page and goals.',
        active: ['client','auth','pages','goals'],
        edges: [['client','auth'], ['auth','pages'], ['pages','goals']]
      },
      {
        title: 'Supporter donation',
        desc: 'Supporter makes a one-time donation via payments.',
        active: ['checkout','payments','orders'],
        edges: [['pages','checkout'], ['checkout','payments'], ['payments','orders']]
      },
      {
        title: 'Memberships',
        desc: 'Membership subscriptions unlock posts and perks.',
        active: ['subscriptions','posts','notifications'],
        edges: [['orders','subscriptions'], ['subscriptions','posts'], ['posts','notifications']]
      },
      {
        title: 'Digital products',
        desc: 'Creators sell digital products and deliver downloads.',
        active: ['products','delivery','email'],
        edges: [['products','checkout'], ['orders','delivery'], ['delivery','email']]
      },
      {
        title: 'Analytics + payouts',
        desc: 'Analytics tracks supporters; payouts transfer earnings.',
        active: ['analytics','payouts'],
        edges: [['orders','analytics'], ['payments','payouts']]
      }
    ]
  },

  patreon: {
    title: 'Patreon',
    steps: [
      {
        title: 'Creator sets tiers',
        desc: 'Creator signs in and configures membership tiers and benefits.',
        active: ['client','auth','creator','tiers'],
        edges: [['client','auth'], ['auth','creator'], ['creator','tiers']]
      },
      {
        title: 'Patron subscribes',
        desc: 'Patron subscribes; payments create subscription state.',
        active: ['subscriptions','payments','billing'],
        edges: [['tiers','subscriptions'], ['subscriptions','payments'], ['payments','billing']]
      },
      {
        title: 'Content posts',
        desc: 'Creator posts content; patrons access gated content.',
        active: ['posts','access','notifications'],
        edges: [['creator','posts'], ['posts','access'], ['access','notifications']]
      },
      {
        title: 'Community messaging',
        desc: 'Messages and community comments drive engagement.',
        active: ['community','messaging'],
        edges: [['posts','community'], ['community','messaging']]
      },
      {
        title: 'Payouts + analytics',
        desc: 'Payouts distribute earnings; analytics tracks retention.',
        active: ['payouts','analytics'],
        edges: [['payments','payouts'], ['subscriptions','analytics']]
      }
    ]
  },

  'buy-me-a-coffee': {
    title: 'Buy Me a Coffee',
    steps: [
      {
        title: 'Creator page setup',
        desc: 'Creator sets up profile, goals, and offerings.',
        active: ['client','auth','pages','products'],
        edges: [['client','auth'], ['auth','pages'], ['pages','products']]
      },
      {
        title: 'Supporter purchase/donation',
        desc: 'Supporter buys a coffee or product via checkout.',
        active: ['checkout','payments','orders'],
        edges: [['products','checkout'], ['checkout','payments'], ['payments','orders']]
      },
      {
        title: 'Delivery + messages',
        desc: 'Thank-you messages and delivery for digital products.',
        active: ['delivery','messaging','notifications'],
        edges: [['orders','delivery'], ['delivery','messaging'], ['messaging','notifications']]
      },
      {
        title: 'Memberships',
        desc: 'Membership subscriptions unlock posts and perks.',
        active: ['subscriptions','posts'],
        edges: [['orders','subscriptions'], ['subscriptions','posts']]
      },
      {
        title: 'Analytics + payouts',
        desc: 'Analytics tracks supporters; payouts transfer earnings.',
        active: ['analytics','payouts'],
        edges: [['orders','analytics'], ['payments','payouts']]
      }
    ]
  },

  subbly: {
    title: 'Subbly',
    steps: [
      {
        title: 'Create subscription products',
        desc: 'Merchant sets up subscription products and plans.',
        active: ['client','auth','products','plans'],
        edges: [['client','auth'], ['auth','products'], ['products','plans']]
      },
      {
        title: 'Checkout + subscriptions',
        desc: 'Customer checks out; subscription created with billing schedule.',
        active: ['checkout','subscriptions','billing'],
        edges: [['products','checkout'], ['checkout','subscriptions'], ['subscriptions','billing']]
      },
      {
        title: 'Payments + renewals',
        desc: 'Payments process recurring renewals and invoices.',
        active: ['payments','invoices','notifications'],
        edges: [['billing','payments'], ['payments','invoices'], ['invoices','notifications']]
      },
      {
        title: 'Fulfillment',
        desc: 'Orders flow to fulfillment/shipping integrations.',
        active: ['orders','fulfillment','integrations'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','integrations']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics tracks churn, LTV, and renewals.',
        active: ['analytics'],
        edges: [['subscriptions','analytics']]
      }
    ]
  },

  teachable: {
    title: 'Teachable',
    steps: [
      {
        title: 'Build course',
        desc: 'Creator builds course curriculum and uploads content.',
        active: ['client','auth','creator','courses','content'],
        edges: [['client','auth'], ['auth','creator'], ['creator','courses'], ['courses','content']]
      },
      {
        title: 'Checkout + enrollment',
        desc: 'Student purchases; enrollment and access granted.',
        active: ['checkout','payments','enrollments','access'],
        edges: [['courses','checkout'], ['checkout','payments'], ['payments','enrollments'], ['enrollments','access']]
      },
      {
        title: 'Consume lessons',
        desc: 'Lessons delivered via CDN/video delivery.',
        active: ['video','cdn'],
        edges: [['content','video'], ['video','cdn']]
      },
      {
        title: 'Progress + quizzes',
        desc: 'Progress tracking and quizzes/assignments.',
        active: ['progress','quizzes','certificates'],
        edges: [['access','progress'], ['progress','quizzes'], ['quizzes','certificates']]
      },
      {
        title: 'Payouts + analytics',
        desc: 'Payouts to creators; analytics for conversion and retention.',
        active: ['payouts','analytics','email'],
        edges: [['payments','payouts'], ['enrollments','analytics'], ['email','notifications']]
      }
    ]
  },

  kajabi: {
    title: 'Kajabi',
    steps: [
      {
        title: 'Create product + site',
        desc: 'Creator builds site, products, and content.',
        active: ['client','auth','site','products','content'],
        edges: [['client','auth'], ['auth','site'], ['site','products'], ['products','content']]
      },
      {
        title: 'Marketing funnel',
        desc: 'Email, landing pages, and automation nurture leads.',
        active: ['funnels','email','automation'],
        edges: [['site','funnels'], ['funnels','email'], ['email','automation']]
      },
      {
        title: 'Checkout + payments',
        desc: 'Checkout processes payments and creates memberships.',
        active: ['checkout','payments','memberships'],
        edges: [['products','checkout'], ['checkout','payments'], ['payments','memberships']]
      },
      {
        title: 'Deliver content + community',
        desc: 'Members access content; community and notifications engage.',
        active: ['access','community','notifications'],
        edges: [['memberships','access'], ['access','community'], ['community','notifications']]
      },
      {
        title: 'Analytics + payouts',
        desc: 'Analytics measures funnel and retention; payouts for affiliates.',
        active: ['analytics','affiliates','payouts'],
        edges: [['funnels','analytics'], ['affiliates','payouts']]
      }
    ]
  },

  podia: {
    title: 'Podia',
    steps: [
      {
        title: 'Create products',
        desc: 'Creator creates courses, downloads, and memberships.',
        active: ['client','auth','products','content'],
        edges: [['client','auth'], ['auth','products'], ['products','content']]
      },
      {
        title: 'Checkout + payment',
        desc: 'Customers purchase; payments create orders and access.',
        active: ['checkout','payments','orders','access'],
        edges: [['products','checkout'], ['checkout','payments'], ['payments','orders'], ['orders','access']]
      },
      {
        title: 'Email marketing',
        desc: 'Email sequences and newsletters engage customers.',
        active: ['email','automation','analytics'],
        edges: [['products','email'], ['email','automation'], ['email','analytics']]
      },
      {
        title: 'Community + messaging',
        desc: 'Community and messaging support members.',
        active: ['community','messaging','notifications'],
        edges: [['access','community'], ['community','messaging'], ['messaging','notifications']]
      },
      {
        title: 'Payouts',
        desc: 'Payouts for creators and affiliates.',
        active: ['payouts','affiliates'],
        edges: [['payments','payouts'], ['affiliates','payouts']]
      }
    ]
  },

  'circle-so': {
    title: 'Circle.so',
    steps: [
      {
        title: 'Create community space',
        desc: 'Admin creates community and spaces with access rules.',
        active: ['client','auth','communities','spaces','permissions'],
        edges: [['client','auth'], ['auth','communities'], ['communities','spaces'], ['spaces','permissions']]
      },
      {
        title: 'Members join + post',
        desc: 'Members join, post discussions, and interact.',
        active: ['posts','feeds','notifications'],
        edges: [['spaces','posts'], ['posts','feeds'], ['feeds','notifications']]
      },
      {
        title: 'Messaging + events',
        desc: 'Messaging and events drive engagement.',
        active: ['messaging','events'],
        edges: [['communities','messaging'], ['spaces','events']]
      },
      {
        title: 'Integrations + automation',
        desc: 'Integrations and automations connect tools and workflows.',
        active: ['integrations','automation'],
        edges: [['integrations','communities'], ['automation','integrations']]
      },
      {
        title: 'Subscriptions + analytics',
        desc: 'Subscriptions/billing for paid communities; analytics tracks engagement.',
        active: ['subscriptions','payments','analytics'],
        edges: [['subscriptions','payments'], ['communities','analytics']]
      }
    ]
  },

  chime: {
    title: 'Chime',
    steps: [
      {
        title: 'Account opening: KYC, device, partner bank setup',
        desc: 'User signs up; identity checks, fraud screening, and account provisioning run (often with partner bank rails).',
        active: ['client','kyc','compliance','risk'],
        edges: [['client','kyc'], ['kyc','compliance'], ['compliance','risk']]
      },
      {
        title: 'Direct deposit + funds availability',
        desc: 'Payroll ACH deposits arrive; availability rules decide when balance becomes spendable.',
        active: ['bank','deposit','ledger','balances'],
        edges: [['bank','deposit'], ['deposit','ledger'], ['ledger','balances']]
      },
      {
        title: 'Card swipe: authorization + fraud scoring',
        desc: 'Card auth checks balance and runs fraud/velocity signals before approval/decline.',
        active: ['card','auth','fraud','risk'],
        edges: [['card','auth'], ['auth','fraud'], ['fraud','risk']]
      },
      {
        title: 'Ledger posting + SpotMe overdraft',
        desc: 'Ledger posts transactions; SpotMe/overdraft rules may allow negative balance within limits.',
        active: ['ledger','balances','overdraft'],
        edges: [['auth','ledger'], ['ledger','balances'], ['balances','overdraft']]
      },
      {
        title: 'Realtime alerts + insights',
        desc: 'Transactions trigger push notifications; enrichment powers insights and budgeting.',
        active: ['notify','realtime','analytics','client'],
        edges: [['ledger','realtime'], ['realtime','notify'], ['notify','client'], ['ledger','analytics']]
      },
      {
        title: 'Disputes, chargebacks, refunds',
        desc: 'Disputes open cases; refunds and chargebacks reconcile with network/bank and ledger adjustments.',
        active: ['disputes','support','refunds','recon'],
        edges: [['ledger','disputes'], ['disputes','support'], ['support','refunds'], ['refunds','recon']]
      }
    ]
  }

  shopify: {
    title: 'Shopify',
    steps: [
      {
        title: 'Storefront render (theme + CDN)',
        desc: 'Buyer loads theme assets via CDN; storefront API renders collections and product lists.',
        active: ['client','storefront','catalog','cdn'],
        edges: [['client','storefront'], ['storefront','catalog'], ['cdn','client']]
      },
      {
        title: 'PDP: variants, inventory, pricing rules',
        desc: 'PDP composes variants, inventory by location, pricing/discount rules, and media.',
        active: ['catalog','inventory','pricing'],
        edges: [['catalog','inventory'], ['catalog','pricing']]
      },
      {
        title: 'Cart and shipping rates',
        desc: 'Cart updates; shipping rates and taxes are estimated using address and carrier tables.',
        active: ['cart','tax','shipping'],
        edges: [['client','cart'], ['cart','shipping'], ['cart','tax']]
      },
      {
        title: 'Checkout session + fraud screening',
        desc: 'Checkout session is created; risk engine screens for fraud and chargeback likelihood.',
        active: ['checkout','risk','auth'],
        edges: [['cart','checkout'], ['checkout','auth'], ['checkout','risk']]
      },
      {
        title: 'Payments (Shopify Payments / gateway)',
        desc: 'Payment is authorized via Shopify Payments or external gateways; retries and 3DS supported.',
        active: ['payments','external','checkout'],
        edges: [['checkout','payments'], ['payments','external']]
      },
      {
        title: 'Order creation + merchant admin + webhooks',
        desc: 'Order is persisted; merchant admin updates; webhooks/apps receive events.',
        active: ['orders','merchant','notify','webhooks'],
        edges: [['payments','orders'], ['orders','merchant'], ['orders','notify'], ['orders','webhooks']]
      },
      {
        title: 'Fulfillment + inventory adjustments',
        desc: 'Fulfillment (merchant/WMS/3PL) picks/pack/ships; inventory is decremented and reconciled.',
        active: ['fulfillment','wms','inventory','carrier'],
        edges: [['orders','fulfillment'], ['fulfillment','wms'], ['wms','carrier'], ['orders','inventory']]
      },
      {
        title: 'Tracking, returns, refunds',
        desc: 'Tracking events update order status; returns/refunds flow through payments and inventory restock.',
        active: ['tracking','returns','refunds','payments'],
        edges: [['carrier','tracking'], ['tracking','returns'], ['returns','refunds'], ['refunds','payments']]
      }
    ]
  },

  etsy: {
    title: 'Etsy',
    steps: [
      {
        title: 'Search + discovery (personalized marketplace)',
        desc: 'Buyer searches; ranking blends relevance, trust signals, and personalization.',
        active: ['client','search','rank','catalog'],
        edges: [['client','search'], ['search','rank'], ['rank','catalog']]
      },
      {
        title: 'Listing page: seller policies + shipping profile',
        desc: 'Listing details are composed with seller policies, shipping profiles, and reviews.',
        active: ['catalog','seller','reviews','shipping'],
        edges: [['catalog','seller'], ['catalog','reviews'], ['seller','shipping']]
      },
      {
        title: 'Cart across shops',
        desc: 'Cart aggregates items across different shops; totals computed per seller and destination.',
        active: ['cart','pricing','tax'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','tax']]
      },
      {
        title: 'Checkout: payment + fraud hold',
        desc: 'Payment is authorized; fraud checks may place holds or require additional verification.',
        active: ['checkout','payments','fraud','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['checkout','fraud'], ['fraud','risk']]
      },
      {
        title: 'Order routing to seller + messaging',
        desc: 'Order is created and routed to the seller; buyer-seller messaging supports coordination.',
        active: ['orders','seller','messages','notify'],
        edges: [['checkout','orders'], ['orders','seller'], ['orders','messages'], ['orders','notify']]
      },
      {
        title: 'Seller fulfillment + tracking',
        desc: 'Seller fulfills order, purchases label, ships, and posts tracking updates.',
        active: ['seller','carrier','tracking'],
        edges: [['seller','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Cases, disputes, refunds',
        desc: 'Case management resolves issues; refunds affect seller performance and risk controls.',
        active: ['cases','refunds','risk','support'],
        edges: [['orders','cases'], ['cases','support'], ['cases','refunds'], ['cases','risk']]
      }
    ]
  },

  ebay: {
    title: 'eBay',
    steps: [
      {
        title: 'Search + browse listings',
        desc: 'Buyer searches; ranking blends relevance, seller reputation, and price/shipping.',
        active: ['client','search','rank','catalog'],
        edges: [['client','search'], ['search','rank'], ['rank','catalog']]
      },
      {
        title: 'Listing detail + trust signals',
        desc: 'PDP composes listing data with seller reputation, return policy, and shipping promise.',
        active: ['catalog','seller','trust','promise'],
        edges: [['catalog','seller'], ['seller','trust'], ['catalog','promise']]
      },
      {
        title: 'Auction bid or Buy It Now',
        desc: 'Auctions update in realtime; Buy It Now reserves the item and locks the price.',
        active: ['auction','orders','inventory','realtime'],
        edges: [['client','auction'], ['auction','realtime'], ['auction','orders'], ['orders','inventory']]
      },
      {
        title: 'Checkout: address, payments, fraud',
        desc: 'Checkout validates address, runs fraud checks, and authorizes payment.',
        active: ['checkout','payments','fraud','risk'],
        edges: [['orders','checkout'], ['checkout','payments'], ['checkout','fraud'], ['fraud','risk']]
      },
      {
        title: 'Managed payments: escrow and payout timing',
        desc: 'Funds may be held in escrow and released on delivery confirmation and policy rules.',
        active: ['escrow','ledger','seller'],
        edges: [['payments','escrow'], ['escrow','ledger'], ['ledger','seller']]
      },
      {
        title: 'Shipping + tracking',
        desc: 'Seller ships; carrier tracking updates order state and notify the buyer.',
        active: ['seller','carrier','tracking','notify'],
        edges: [['checkout','seller'], ['seller','carrier'], ['carrier','tracking'], ['tracking','notify']]
      },
      {
        title: 'Returns, disputes, chargebacks',
        desc: 'Returns and disputes go through case management; refunds update ledger and escrow.',
        active: ['returns','cases','refunds','escrow'],
        edges: [['tracking','returns'], ['returns','cases'], ['cases','refunds'], ['refunds','escrow']]
      }
    ]
  },

  flipkart: {
    title: 'Flipkart',
    steps: [
      {
        title: 'Browse + search + personalization',
        desc: 'Search and recommendations blend relevance, price, inventory, and user intent.',
        active: ['client','search','catalog','rank'],
        edges: [['client','search'], ['search','rank'], ['rank','catalog']]
      },
      {
        title: 'PDP: pricing, offers, delivery promise',
        desc: 'Product details compose pricing, promotions, and delivery promise by pincode.',
        active: ['catalog','pricing','offers','promise'],
        edges: [['catalog','pricing'], ['pricing','offers'], ['catalog','promise']]
      },
      {
        title: 'Cart + coupons + taxes',
        desc: 'Cart updates totals; coupons, taxes, and shipping fees are computed.',
        active: ['cart','promo','tax'],
        edges: [['client','cart'], ['cart','promo'], ['cart','tax']]
      },
      {
        title: 'Checkout: payments + COD eligibility + risk',
        desc: 'Checkout authorizes payment or validates COD eligibility with fraud/risk checks.',
        active: ['checkout','payments','risk','cod'],
        edges: [['cart','checkout'], ['checkout','risk'], ['checkout','payments'], ['checkout','cod']]
      },
      {
        title: 'Order creation + inventory allocation',
        desc: 'Order is created; inventory allocated to FC/seller; picking tasks generated.',
        active: ['orders','inventory','wms'],
        edges: [['checkout','orders'], ['orders','inventory'], ['orders','wms']]
      },
      {
        title: 'Fulfillment + last-mile tracking',
        desc: 'Warehouse pick-pack-ship; carrier scans update tracking and customer timeline.',
        active: ['wms','carrier','tracking','notify'],
        edges: [['wms','carrier'], ['carrier','tracking'], ['tracking','notify']]
      },
      {
        title: 'Returns: pickup, QC, refund',
        desc: 'Returns create reverse pickup; QC determines refund and restock disposition.',
        active: ['returns','qc','refunds','inventory','support'],
        edges: [['orders','returns'], ['returns','qc'], ['qc','refunds'], ['returns','inventory'], ['returns','support']]
      }
    ]
  },

  myntra: {
    title: 'Myntra',
    steps: [
      {
        title: 'Personalized fashion discovery',
        desc: 'Home feed and search blend trends, personalization, and category navigation.',
        active: ['client','catalog','rank','search'],
        edges: [['client','catalog'], ['catalog','rank'], ['client','search']]
      },
      {
        title: 'PDP: size/variant availability + offers',
        desc: 'PDP composes size availability, brand content, pricing, and offers.',
        active: ['catalog','inventory','offers','pricing'],
        edges: [['catalog','inventory'], ['catalog','offers'], ['catalog','pricing']]
      },
      {
        title: 'Bag + coupons + taxes',
        desc: 'Bag/cart updates totals, coupons, taxes, and delivery fee estimates.',
        active: ['cart','promo','tax'],
        edges: [['client','cart'], ['cart','promo'], ['cart','tax']]
      },
      {
        title: 'Checkout: payment + COD eligibility + risk',
        desc: 'Payment authorization or COD eligibility checks run; fraud/risk checks gate order.',
        active: ['checkout','payments','risk','cod'],
        edges: [['cart','checkout'], ['checkout','risk'], ['checkout','payments'], ['checkout','cod']]
      },
      {
        title: 'Order creation + fulfillment planning',
        desc: 'Order is created; fulfillment plan chooses warehouse/seller and generates pick tasks.',
        active: ['orders','wms','inventory'],
        edges: [['checkout','orders'], ['orders','wms'], ['orders','inventory']]
      },
      {
        title: 'Shipping + delivery tracking',
        desc: 'Carrier pickup; tracking updates push customer timeline and notifications.',
        active: ['carrier','tracking','notify','client'],
        edges: [['wms','carrier'], ['carrier','tracking'], ['tracking','notify'], ['notify','client']]
      },
      {
        title: 'Returns: pickup, QC, refund',
        desc: 'Returns are picked up; QC determines refund and inventory disposition.',
        active: ['returns','qc','refunds','inventory','support'],
        edges: [['tracking','returns'], ['returns','qc'], ['qc','refunds'], ['returns','inventory'], ['returns','support']]
      }
    ]
  },

  meesho: {
    title: 'Meesho',
    steps: [
      {
        title: 'Discovery feed (WhatsApp-first commerce)',
        desc: 'User discovers low-cost products via feeds, social sharing, and lightweight product pages.',
        active: ['client','feed','catalog','rank'],
        edges: [['client','feed'], ['feed','rank'], ['rank','catalog']]
      },
      {
        title: 'PDP: supplier price, shipping fee, margin',
        desc: 'Product details compose supplier price, shipping, COD eligibility, and margins.',
        active: ['catalog','pricing','offers','risk'],
        edges: [['catalog','pricing'], ['pricing','offers'], ['offers','risk']]
      },
      {
        title: 'Place order: COD + fraud checks',
        desc: 'Order creation runs fraud checks; COD orders require eligibility and address validation.',
        active: ['checkout','orders','risk','cod'],
        edges: [['client','checkout'], ['checkout','risk'], ['checkout','cod'], ['checkout','orders']]
      },
      {
        title: 'Supplier assignment + confirmation',
        desc: 'Order routes to supplier; supplier confirms availability and creates shipment.',
        active: ['orders','supplier','inventory','wms'],
        edges: [['orders','supplier'], ['supplier','inventory'], ['supplier','wms']]
      },
      {
        title: 'Logistics + last-mile tracking',
        desc: 'Carrier pickup and routing; tracking timeline updates are pushed to the user.',
        active: ['carrier','tracking','notify','client'],
        edges: [['supplier','carrier'], ['carrier','tracking'], ['tracking','notify'], ['notify','client']]
      },
      {
        title: 'COD cash collection + settlement',
        desc: 'For COD, cash is collected; settlements reconcile payouts and returns leakage.',
        active: ['cod','ledger','payouts','recon'],
        edges: [['carrier','cod'], ['cod','ledger'], ['ledger','payouts'], ['ledger','recon']]
      },
      {
        title: 'Returns + refunds + supplier chargebacks',
        desc: 'Returns create reverse logistics; refunds and supplier chargebacks are reconciled.',
        active: ['returns','refunds','support','supplier'],
        edges: [['tracking','returns'], ['returns','refunds'], ['returns','support'], ['returns','supplier']]
      }
    ]
  },

  ajio: {
    title: 'Ajio',
    steps: [
      {
        title: 'Browse + search + personalization',
        desc: 'Search and ranking surface products using inventory, price, and user intent.',
        active: ['client','search','catalog','rank'],
        edges: [['client','search'], ['search','rank'], ['rank','catalog']]
      },
      {
        title: 'PDP: variants, inventory, pricing, delivery promise',
        desc: 'PDP composes variant availability, pricing, offers, and delivery promise.',
        active: ['catalog','inventory','pricing','offers','promise'],
        edges: [['catalog','inventory'], ['catalog','pricing'], ['pricing','offers'], ['inventory','promise']]
      },
      {
        title: 'Cart: promos, taxes, shipping',
        desc: 'Cart totals computed; promos/coupons and shipping fees applied.',
        active: ['cart','promo','tax','shipping'],
        edges: [['client','cart'], ['cart','promo'], ['cart','tax'], ['cart','shipping']]
      },
      {
        title: 'Checkout: auth, risk, payment',
        desc: 'Checkout validates address, runs risk checks, and authorizes payment.',
        active: ['checkout','auth','risk','payments'],
        edges: [['cart','checkout'], ['checkout','auth'], ['checkout','risk'], ['checkout','payments']]
      },
      {
        title: 'Order creation + allocation',
        desc: 'Order is created; inventory allocated and pick tasks are generated.',
        active: ['orders','inventory','wms'],
        edges: [['checkout','orders'], ['orders','inventory'], ['orders','wms']]
      },
      {
        title: 'Shipping + tracking + notifications',
        desc: 'Carrier pickup; tracking timeline updates and notifications are pushed to the user.',
        active: ['carrier','tracking','notify','client'],
        edges: [['wms','carrier'], ['carrier','tracking'], ['tracking','notify'], ['notify','client']]
      },
      {
        title: 'Returns, QC, refunds',
        desc: 'Returns generate reverse pickup; QC gates refunds and restocking.',
        active: ['returns','qc','refunds','support','inventory'],
        edges: [['tracking','returns'], ['returns','qc'], ['qc','refunds'], ['returns','support'], ['returns','inventory']]
      }
    ]
  },

  zalando: {
    title: 'Zalando',
    steps: [
      {
        title: 'Discovery + search (fashion personalization)',
        desc: 'Search and discovery are personalized by brand affinity, sizes, and trends.',
        active: ['client','search','catalog','rank'],
        edges: [['client','search'], ['search','rank'], ['rank','catalog']]
      },
      {
        title: 'PDP: variants, size availability, pricing, promise',
        desc: 'PDP composes size availability by warehouse, pricing, and delivery promise.',
        active: ['catalog','inventory','pricing','promise'],
        edges: [['catalog','inventory'], ['catalog','pricing'], ['inventory','promise']]
      },
      {
        title: 'Cart + promotions',
        desc: 'Cart totals, promos, and taxes computed; shipping options determined.',
        active: ['cart','promo','tax','shipping'],
        edges: [['client','cart'], ['cart','promo'], ['cart','tax'], ['cart','shipping']]
      },
      {
        title: 'Checkout: auth, risk, payment',
        desc: 'Checkout validates address, runs fraud screening, and authorizes payment.',
        active: ['checkout','auth','risk','payments'],
        edges: [['cart','checkout'], ['checkout','auth'], ['checkout','risk'], ['checkout','payments']]
      },
      {
        title: 'Fulfillment + carrier handoff',
        desc: 'Warehouse picks/packs; carrier handoff and tracking events update order timeline.',
        active: ['orders','wms','carrier','tracking'],
        edges: [['checkout','orders'], ['orders','wms'], ['wms','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Delivery notifications',
        desc: 'Delivery events update timeline and notifications are sent.',
        active: ['tracking','notify','client'],
        edges: [['tracking','notify'], ['notify','client']]
      },
      {
        title: 'Returns (high frequency) + refund',
        desc: 'Returns create reverse logistics; inspection/QC gates refund and restock.',
        active: ['returns','qc','refunds','inventory','support'],
        edges: [['tracking','returns'], ['returns','qc'], ['qc','refunds'], ['returns','inventory'], ['returns','support']]
      }
    ]
  },

  asos: {
    title: 'ASOS',
    steps: [
      {
        title: 'Browse + search (fast fashion discovery)',
        desc: 'Search and discovery optimize for trends, size availability, and conversion.',
        active: ['client','search','catalog','rank'],
        edges: [['client','search'], ['search','rank'], ['rank','catalog']]
      },
      {
        title: 'PDP: variants, inventory, promotions',
        desc: 'PDP composes variants, inventory, pricing, and promotions.',
        active: ['catalog','inventory','pricing','offers'],
        edges: [['catalog','inventory'], ['catalog','pricing'], ['pricing','offers']]
      },
      {
        title: 'Basket: totals + shipping',
        desc: 'Basket totals computed; promos, taxes, and shipping rates applied.',
        active: ['cart','promo','tax','shipping'],
        edges: [['client','cart'], ['cart','promo'], ['cart','tax'], ['cart','shipping']]
      },
      {
        title: 'Checkout: address validation + fraud + payment',
        desc: 'Checkout validates address, runs fraud screening, and authorizes payment.',
        active: ['checkout','auth','risk','payments'],
        edges: [['cart','checkout'], ['checkout','auth'], ['checkout','risk'], ['checkout','payments']]
      },
      {
        title: 'Fulfillment + delivery tracking',
        desc: 'Warehouse picks/packs; carrier tracking updates the order timeline.',
        active: ['orders','wms','carrier','tracking','notify'],
        edges: [['checkout','orders'], ['orders','wms'], ['wms','carrier'], ['carrier','tracking'], ['tracking','notify']]
      },
      {
        title: 'Customer updates',
        desc: 'Shipping events update order timeline and send notifications.',
        active: ['tracking','notify','client'],
        edges: [['tracking','notify'], ['notify','client']]
      },
      {
        title: 'Returns + refunds',
        desc: 'Returns flow through reverse logistics and QC; refunds issued and inventory updated.',
        active: ['returns','qc','refunds','inventory','support'],
        edges: [['tracking','returns'], ['returns','qc'], ['qc','refunds'], ['returns','inventory'], ['returns','support']]
      }
    ]
  },

  wayfair: {
    title: 'Wayfair',
    steps: [
      {
        title: 'Browse + search (large catalog)',
        desc: 'Search and recommendations filter massive inventory with faceting and availability.',
        active: ['client','search','catalog','rank'],
        edges: [['client','search'], ['search','rank'], ['rank','catalog']]
      },
      {
        title: 'PDP: delivery promise + freight rules',
        desc: 'Delivery promise and shipping rules (freight/white glove) are computed.',
        active: ['catalog','pricing','promise','shipping'],
        edges: [['catalog','pricing'], ['pricing','shipping'], ['shipping','promise']]
      },
      {
        title: 'Cart: services + delivery slot',
        desc: 'Cart includes services (assembly/white glove) and delivery slot selection.',
        active: ['cart','services','delivery','tax'],
        edges: [['client','cart'], ['cart','services'], ['cart','delivery'], ['cart','tax']]
      },
      {
        title: 'Checkout: address + fraud + payment',
        desc: 'Checkout validates address, runs fraud screening, and authorizes payment.',
        active: ['checkout','auth','risk','payments'],
        edges: [['cart','checkout'], ['checkout','auth'], ['checkout','risk'], ['checkout','payments']]
      },
      {
        title: 'Fulfillment: multi-origin + freight booking',
        desc: 'Order may split across suppliers; freight booking and warehouse workflows start.',
        active: ['orders','wms','supplier','carrier'],
        edges: [['checkout','orders'], ['orders','supplier'], ['orders','wms'], ['wms','carrier']]
      },
      {
        title: 'Tracking + appointment scheduling',
        desc: 'Tracking updates flow; delivery appointment is coordinated for bulky items.',
        active: ['carrier','tracking','notify','schedule'],
        edges: [['carrier','tracking'], ['tracking','notify'], ['tracking','schedule']]
      },
      {
        title: 'Returns: pickup, inspection, refund',
        desc: 'Bulky-item returns require pickup scheduling; inspection gates refund and disposition.',
        active: ['returns','schedule','qc','refunds','support'],
        edges: [['tracking','returns'], ['returns','schedule'], ['returns','qc'], ['qc','refunds'], ['returns','support']]
      }
    ]
  }

  ola: {
    title: 'Ola',
    steps: [
      {
        title: 'Set pickup + destination (geo + ETA)',
        desc: 'Client geocodes pickup/drop; ETA and fare estimates computed from supply and traffic.',
        active: ['client','maps','pricing','eta'],
        edges: [['client','maps'], ['client','pricing'], ['maps','eta']]
      },
      {
        title: 'Request ride (auth + risk)',
        desc: 'Request is authorized; risk checks/payment prechecks may run before dispatch.',
        active: ['client','api','auth','risk','dispatch'],
        edges: [['client','api'], ['api','auth'], ['auth','risk'], ['api','dispatch']]
      },
      {
        title: 'Dispatch + matching',
        desc: 'Dispatch uses realtime supply and constraints (category, incentives, batching) to match drivers.',
        active: ['dispatch','location','match','market'],
        edges: [['location','dispatch'], ['dispatch','market'], ['dispatch','match']]
      },
      {
        title: 'Route plan + live ETAs',
        desc: 'Routing computes path; pickup/drop ETAs update as traffic and driver location change.',
        active: ['match','routing','maps','eta'],
        edges: [['match','routing'], ['routing','maps'], ['routing','eta']]
      },
      {
        title: 'Live tracking + notifications',
        desc: 'Driver location streams to rider; notifications cover arrival, pickup, and safety prompts.',
        active: ['driver','location','realtime','notify','client'],
        edges: [['driver','location'], ['location','realtime'], ['realtime','client'], ['realtime','notify'], ['notify','client']]
      },
      {
        title: 'Fare finalization + payments',
        desc: 'Fare computed from time/distance/tolls/promos; payment captured and ledger updated.',
        active: ['pricing','payments','ledger','promo'],
        edges: [['pricing','promo'], ['promo','pricing'], ['pricing','payments'], ['payments','ledger']]
      },
      {
        title: 'Ratings, disputes, support',
        desc: 'Ratings feed quality loops; disputes/support adjust ledger and marketplace rules.',
        active: ['ratings','support','disputes','ledger'],
        edges: [['ledger','ratings'], ['ledger','support'], ['support','disputes']]
      }
    ]
  },

  airbnb: {
    title: 'Airbnb',
    steps: [
      {
        title: 'Search + filter stays (ranking + pricing)',
        desc: 'Search queries are ranked; pricing shows nightly rate, fees, and availability constraints.',
        active: ['client','search','rank','pricing'],
        edges: [['client','search'], ['search','rank'], ['rank','pricing']]
      },
      {
        title: 'Listing details + calendar availability',
        desc: 'Listing page composes photos, house rules, calendar availability, and total price breakdown.',
        active: ['catalog','availability','pricing','policies'],
        edges: [['rank','catalog'], ['catalog','availability'], ['catalog','pricing'], ['catalog','policies']]
      },
      {
        title: 'Request to book / Instant Book decisioning',
        desc: 'Booking request created; identity verification, trust/risk scoring, and policy checks run.',
        active: ['booking','auth','risk','trust'],
        edges: [['client','booking'], ['booking','auth'], ['booking','risk'], ['risk','trust']]
      },
      {
        title: 'Payment authorization + holds',
        desc: 'Payment is authorized; holds, installments (if supported), and retries are handled securely.',
        active: ['payments','risk','ledger'],
        edges: [['booking','payments'], ['payments','risk'], ['payments','ledger']]
      },
      {
        title: 'Host confirmation + messaging',
        desc: 'Host notified to accept/decline; messaging supports questions and coordination.',
        active: ['host','messages','notify','client'],
        edges: [['booking','notify'], ['notify','host'], ['host','messages'], ['messages','client']]
      },
      {
        title: 'Trip lifecycle: itinerary, changes, support',
        desc: 'Itinerary delivered; changes/cancellations follow policies; support handles incidents and refunds.',
        active: ['itinerary','changes','support','refunds','policies'],
        edges: [['booking','itinerary'], ['itinerary','client'], ['booking','changes'], ['changes','policies'], ['booking','support'], ['support','refunds']]
      },
      {
        title: 'Payouts + reviews (trust loop)',
        desc: 'After stay, payout settles to host; reviews update trust and future ranking.',
        active: ['payouts','reviews','trust','ledger'],
        edges: [['ledger','payouts'], ['booking','reviews'], ['reviews','trust'], ['trust','rank']]
      }
    ]
  },

  'booking-com': {
    title: 'Booking.com',
    steps: [
      {
        title: 'Search properties + dates',
        desc: 'Search results ranked by relevance, price, reviews, and availability constraints.',
        active: ['client','search','rank','pricing'],
        edges: [['client','search'], ['search','rank'], ['rank','pricing']]
      },
      {
        title: 'Availability + rate plans + policies',
        desc: 'Rate plans, cancellation policies, and room inventory are resolved (often via partner/channel manager).',
        active: ['inventory','pricing','policies','partner'],
        edges: [['rank','inventory'], ['inventory','pricing'], ['inventory','policies'], ['inventory','partner']]
      },
      {
        title: 'Reserve room (hold + confirm)',
        desc: 'Reservation created; inventory held/confirmed and confirmation number generated.',
        active: ['reservation','inventory','confirm'],
        edges: [['client','reservation'], ['reservation','inventory'], ['reservation','confirm']]
      },
      {
        title: 'Payment model + fraud checks',
        desc: 'Payment may be pay-now, pay-later, or pay-at-property; fraud screening runs on bookings.',
        active: ['payments','fraud','ledger','risk'],
        edges: [['reservation','payments'], ['payments','fraud'], ['fraud','risk'], ['payments','ledger']]
      },
      {
        title: 'Partner/property notification',
        desc: 'Property systems/channel managers are notified; confirmation delivered to guest.',
        active: ['partner','notify','client'],
        edges: [['confirm','notify'], ['notify','partner'], ['notify','client']]
      },
      {
        title: 'Manage booking (changes/cancel/refund)',
        desc: 'Changes and cancellations follow policy; inventory updated; refunds processed when applicable.',
        active: ['changes','policies','refunds','inventory','support'],
        edges: [['reservation','changes'], ['changes','policies'], ['changes','inventory'], ['changes','refunds'], ['changes','support']]
      },
      {
        title: 'Post-stay: reviews + loyalty',
        desc: 'Reviews and loyalty benefits feed ranking, trust, and retention loops.',
        active: ['reviews','loyalty','rank','trust'],
        edges: [['reservation','reviews'], ['reviews','trust'], ['trust','rank'], ['reservation','loyalty']]
      }
    ]
  },

  makemytrip: {
    title: 'MakeMyTrip',
    steps: [
      {
        title: 'Search flights/hotels (aggregator fanout)',
        desc: 'Metasearch/aggregator fans out to airlines/hotels/partners for prices and availability.',
        active: ['client','search','aggregator','cache'],
        edges: [['client','search'], ['search','aggregator'], ['aggregator','cache']]
      },
      {
        title: 'Price revalidation (anti-stale inventory)',
        desc: 'Selected itinerary is revalidated to ensure price and seats/rooms are still available.',
        active: ['revalidate','inventory','pricing','partner'],
        edges: [['aggregator','revalidate'], ['revalidate','partner'], ['revalidate','inventory'], ['revalidate','pricing']]
      },
      {
        title: 'Traveler details + policy + risk',
        desc: 'Passenger details captured; policy rules and fraud/risk checks applied.',
        active: ['checkout','auth','risk','policies'],
        edges: [['client','checkout'], ['checkout','auth'], ['checkout','risk'], ['checkout','policies']]
      },
      {
        title: 'Payments (multiple methods) + retries',
        desc: 'Payment is authorized via gateway/UPI/cards; retries and fallbacks supported.',
        active: ['payments','gateway','ledger','risk'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','gateway'], ['payments','ledger']]
      },
      {
        title: 'Booking confirmation + PNR/voucher',
        desc: 'Reservation is confirmed with airline/hotel systems; PNR/voucher generated.',
        active: ['booking','partner','confirm','inventory'],
        edges: [['payments','booking'], ['booking','partner'], ['partner','confirm'], ['confirm','inventory']]
      },
      {
        title: 'Ticketing + itinerary delivery',
        desc: 'Tickets/vouchers issued; itinerary stored and delivered with reminders.',
        active: ['ticketing','itinerary','notify','client'],
        edges: [['confirm','ticketing'], ['ticketing','itinerary'], ['itinerary','notify'], ['notify','client']]
      },
      {
        title: 'Changes/cancellations + support + refunds',
        desc: 'Post-booking modifications follow supplier policies; refunds and support workflows run.',
        active: ['changes','refunds','support','policies'],
        edges: [['booking','changes'], ['changes','policies'], ['changes','refunds'], ['changes','support']]
      }
    ]
  },

  lyft: {
    title: 'Lyft',
    steps: [
      {
        title: 'Set pickup + destination (geo + ETA)',
        desc: 'Client geocodes pickup/drop; ETA and fare estimates computed from supply and traffic.',
        active: ['client','maps','pricing','eta'],
        edges: [['client','maps'], ['client','pricing'], ['maps','eta']]
      },
      {
        title: 'Request ride (auth + risk)',
        desc: 'Request authorized; risk checks/payment prechecks may run before dispatch.',
        active: ['client','api','auth','risk','dispatch'],
        edges: [['client','api'], ['api','auth'], ['auth','risk'], ['api','dispatch']]
      },
      {
        title: 'Dispatch + matching',
        desc: 'Dispatch uses realtime supply and marketplace rules to match drivers.',
        active: ['dispatch','location','match','market'],
        edges: [['location','dispatch'], ['dispatch','market'], ['dispatch','match']]
      },
      {
        title: 'Route plan + live ETAs',
        desc: 'Routing computes path; pickup/drop ETAs update with traffic and location changes.',
        active: ['match','routing','maps','eta'],
        edges: [['match','routing'], ['routing','maps'], ['routing','eta']]
      },
      {
        title: 'Live tracking + notifications',
        desc: 'Driver location streams to rider; notifications cover arrival/pickup/safety prompts.',
        active: ['driver','location','realtime','notify','client'],
        edges: [['driver','location'], ['location','realtime'], ['realtime','client'], ['realtime','notify'], ['notify','client']]
      },
      {
        title: 'Fare finalization + payments',
        desc: 'Fare computed from time/distance/tolls/promos; payment captured and ledger updated.',
        active: ['pricing','payments','ledger','promo'],
        edges: [['pricing','promo'], ['promo','pricing'], ['pricing','payments'], ['payments','ledger']]
      },
      {
        title: 'Ratings, safety, support',
        desc: 'Ratings feed quality loops; safety tools and support flows handle incidents/disputes.',
        active: ['ratings','safety','support','disputes'],
        edges: [['ledger','ratings'], ['ledger','support'], ['support','safety'], ['support','disputes']]
      }
    ]
  },

  grab: {
    title: 'Grab',
    steps: [
      {
        title: 'Choose service + locations (superapp entry)',
        desc: 'User selects ride/food/etc.; maps and pricing compute estimates and availability.',
        active: ['client','maps','pricing','market'],
        edges: [['client','maps'], ['client','pricing'], ['pricing','market']]
      },
      {
        title: 'Request (auth + risk)',
        desc: 'Request authorized; risk checks and wallet/payment checks may run before dispatch.',
        active: ['client','api','auth','risk','dispatch'],
        edges: [['client','api'], ['api','auth'], ['auth','risk'], ['api','dispatch']]
      },
      {
        title: 'Dispatch + matching',
        desc: 'Dispatch matches driver/partner using realtime supply and marketplace constraints.',
        active: ['dispatch','location','match','market'],
        edges: [['location','dispatch'], ['dispatch','market'], ['dispatch','match']]
      },
      {
        title: 'Route plan + realtime tracking',
        desc: 'Routing computes path; realtime location updates stream to client.',
        active: ['routing','realtime','client','notify'],
        edges: [['match','routing'], ['routing','realtime'], ['realtime','client'], ['realtime','notify']]
      },
      {
        title: 'Fare finalization + wallet/card charge',
        desc: 'Fare computed; payments charge wallet/card and ledger records the trip.',
        active: ['pricing','payments','ledger','promo'],
        edges: [['pricing','promo'], ['promo','pricing'], ['pricing','payments'], ['payments','ledger']]
      },
      {
        title: 'Promos + rewards ecosystem',
        desc: 'Promos and rewards update points/wallets and drive retention loops.',
        active: ['promo','rewards','ledger','analytics'],
        edges: [['ledger','promo'], ['promo','rewards'], ['rewards','ledger'], ['ledger','analytics']]
      },
      {
        title: 'Support, disputes, fraud',
        desc: 'Support workflows handle disputes; fraud/risk systems monitor abuse and chargebacks.',
        active: ['support','fraud','risk','disputes'],
        edges: [['ledger','support'], ['support','disputes'], ['ledger','fraud'], ['fraud','risk']]
      }
    ]
  },

  blablacar: {
    title: 'BlaBlaCar',
    steps: [
      {
        title: 'Search rides (matching supply)',
        desc: 'Passenger searches routes/dates; matching ranks rides by trust, detour, and price.',
        active: ['client','search','match','rank'],
        edges: [['client','search'], ['search','match'], ['match','rank']]
      },
      {
        title: 'View ride details + trust signals',
        desc: 'Ride details composed with driver profile, reviews, verification, and cancellation rules.',
        active: ['catalog','profiles','trust','policies'],
        edges: [['rank','catalog'], ['catalog','profiles'], ['profiles','trust'], ['catalog','policies']]
      },
      {
        title: 'Request seat (availability hold)',
        desc: 'Seat request created; availability held and driver is notified to accept.',
        active: ['booking','notify','driver','inventory'],
        edges: [['client','booking'], ['booking','inventory'], ['booking','notify'], ['notify','driver']]
      },
      {
        title: 'Payment authorization + escrow hold',
        desc: 'Payment authorized; escrow holds funds until ride completion/confirmation.',
        active: ['payments','escrow','ledger','risk'],
        edges: [['booking','payments'], ['payments','risk'], ['payments','escrow'], ['escrow','ledger']]
      },
      {
        title: 'Messaging + coordination',
        desc: 'Passenger and driver coordinate pickup via in-app messaging and notifications.',
        active: ['messages','notify','client'],
        edges: [['booking','messages'], ['messages','notify'], ['notify','client']]
      },
      {
        title: 'Completion confirmation + payout',
        desc: 'After completion, funds are released to driver; receipts and confirmations sent.',
        active: ['payouts','ledger','notify','driver'],
        edges: [['escrow','ledger'], ['ledger','payouts'], ['payouts','notify'], ['notify','driver']]
      },
      {
        title: 'Ratings, disputes, refunds',
        desc: 'Ratings update trust; disputes and refunds run through case management and ledger adjustments.',
        active: ['ratings','support','refunds','trust','ledger'],
        edges: [['payouts','ratings'], ['ratings','trust'], ['ledger','refunds'], ['refunds','support']]
      }
    ]
  },

  skyscanner: {
    title: 'Skyscanner',
    steps: [
      {
        title: 'Search flights (metasearch fanout)',
        desc: 'Query fans out to airline/OTA partners; caches and throttles manage load.',
        active: ['client','search','aggregator','cache'],
        edges: [['client','search'], ['search','aggregator'], ['aggregator','cache']]
      },
      {
        title: 'Normalize + dedupe + rank offers',
        desc: 'Offers normalized and deduped; rank orders by price, duration, stops, and user constraints.',
        active: ['normalize','rank','cache','pricing'],
        edges: [['aggregator','normalize'], ['normalize','rank'], ['rank','cache'], ['normalize','pricing']]
      },
      {
        title: 'Filters, sorting, and price alerts',
        desc: 'Client filters/sorts; optional price alerts subscribe to fare changes.',
        active: ['client','rank','ui','alerts'],
        edges: [['rank','ui'], ['ui','client'], ['client','alerts']]
      },
      {
        title: 'Click-out (redirect + tracking)',
        desc: 'User clicks an offer; redirect to partner includes attribution and tracking.',
        active: ['redirect','partner','tracking','attribution'],
        edges: [['client','redirect'], ['redirect','partner'], ['redirect','tracking'], ['tracking','attribution']]
      },
      {
        title: 'Partner booking + conversion events',
        desc: 'Booking happens on partner; conversion events and postbacks reported back.',
        active: ['partner','events','tracking'],
        edges: [['partner','events'], ['events','tracking']]
      },
      {
        title: 'Attribution + reporting',
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
        title: 'Search inventory (multi-vertical aggregator)',
        desc: 'User searches flights/hotels/cars; aggregator fans out to suppliers with caching.',
        active: ['client','search','aggregator','cache'],
        edges: [['client','search'], ['search','aggregator'], ['aggregator','cache']]
      },
      {
        title: 'Select itinerary + price revalidation',
        desc: 'Chosen itinerary is revalidated against supplier inventory and pricing to avoid stale offers.',
        active: ['revalidate','inventory','pricing','supplier'],
        edges: [['aggregator','revalidate'], ['revalidate','supplier'], ['revalidate','inventory'], ['revalidate','pricing']]
      },
      {
        title: 'Checkout: traveler details + policy + fraud',
        desc: 'Traveler details captured; policy and fraud/risk checks applied before payment.',
        active: ['checkout','auth','risk','policies'],
        edges: [['client','checkout'], ['checkout','auth'], ['checkout','risk'], ['checkout','policies']]
      },
      {
        title: 'Payments + retries',
        desc: 'Payment authorized via gateway; retries/fallbacks supported; ledger updated.',
        active: ['payments','gateway','ledger','risk'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','gateway'], ['payments','ledger']]
      },
      {
        title: 'Confirm with suppliers',
        desc: 'Reservation confirmed with airline/hotel supplier systems; confirmation ids stored.',
        active: ['booking','supplier','confirm','inventory'],
        edges: [['payments','booking'], ['booking','supplier'], ['supplier','confirm'], ['confirm','inventory']]
      },
      {
        title: 'Itinerary delivery + reminders',
        desc: 'Itinerary stored and delivered; reminders and updates sent across channels.',
        active: ['itinerary','notify','client'],
        edges: [['confirm','itinerary'], ['itinerary','notify'], ['notify','client']]
      },
      {
        title: 'Changes/cancellations + refunds',
        desc: 'Post-booking modifications follow supplier policies; refunds and support workflows run.',
        active: ['changes','refunds','support','policies'],
        edges: [['booking','changes'], ['changes','policies'], ['changes','refunds'], ['changes','support']]
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
        title: 'Open app: home rows + personalization',
        desc: 'Client loads home rows; personalization uses watch history and experiments.',
        active: ['client','home','recos','history','ab'],
        edges: [['client','home'], ['home','recos'], ['history','recos'], ['recos','ab']]
      },
      {
        title: 'Select title: catalog + entitlements',
        desc: 'Client fetches metadata; policy verifies entitlements, region rights, and device limits.',
        active: ['catalog','policy','auth','drm'],
        edges: [['home','catalog'], ['catalog','policy'], ['policy','auth'], ['policy','drm']]
      },
      {
        title: 'DRM license + session setup',
        desc: 'Client obtains DRM license and starts playback session.',
        active: ['client','drm','auth'],
        edges: [['client','drm'], ['drm','auth']]
      },
      {
        title: 'Playback via CDN (ABR)',
        desc: 'Player streams segments from CDN with ABR and QoE monitoring.',
        active: ['cdn','client','player','metrics'],
        edges: [['cdn','client'], ['client','player'], ['player','metrics']]
      },
      {
        title: 'Ads (where applicable) + telemetry',
        desc: 'Ad decisioning runs for ad-supported content; telemetry collected for QoE and engagement.',
        active: ['ads','auction','metrics','analytics'],
        edges: [['player','ads'], ['ads','auction'], ['player','metrics'], ['metrics','analytics']]
      },
      {
        title: 'History + continue-watching loop',
        desc: 'Watch events update history/continue-watching; signals improve recos and surfacing.',
        active: ['history','recos','home','analytics'],
        edges: [['analytics','history'], ['history','recos'], ['recos','home']]
      }
    ]
  },

  'apple-music': {
    title: 'Apple Music',
    steps: [
      {
        title: 'Open app: library sync + For You',
        desc: 'Client syncs library metadata and loads personalized recommendations.',
        active: ['client','library','recos'],
        edges: [['client','library'], ['library','recos']]
      },
      {
        title: 'Search + index',
        desc: 'Search hits index; results filtered by region rights and subscription.',
        active: ['client','search','index','policy'],
        edges: [['client','search'], ['search','index'], ['index','policy']]
      },
      {
        title: 'Entitlement + licensing',
        desc: 'Policy verifies subscription/device limits and region rights; licenses issued when required.',
        active: ['policy','auth','drm','risk'],
        edges: [['client','policy'], ['policy','auth'], ['policy','drm'], ['auth','risk']]
      },
      {
        title: 'Playback via CDN',
        desc: 'Client requests stream URL/manifest and plays from CDN with caching.',
        active: ['client','playback','cdn'],
        edges: [['client','playback'], ['playback','cdn'], ['cdn','client']]
      },
      {
        title: 'Lyrics/metadata + sharing',
        desc: 'Lyrics/metadata fetched; sharing updates engagement and discovery signals.',
        active: ['metadata','lyrics','client','sharing'],
        edges: [['playback','metadata'], ['metadata','lyrics'], ['lyrics','client'], ['client','sharing']]
      },
      {
        title: 'Telemetry + personalization loop',
        desc: 'Listening events feed analytics and improve recommendations and mixes.',
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

  // NOTE: Prime Video and Apple Music are defined earlier in this file.

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
        title: 'Open app: feed + graph context',
        desc: 'Client loads feed with caching/prefetch; graph context shapes ranking candidates.',
        active: ['client','feed','cache','graph'],
        edges: [['client','feed'], ['feed','cache'], ['feed','graph']]
      },
      {
        title: 'Ranking + integrity',
        desc: 'Ranking selects posts; integrity/safety systems downrank or remove harmful content.',
        active: ['rank','safety','feed','moderation'],
        edges: [['feed','rank'], ['rank','safety'], ['safety','moderation']]
      },
      {
        title: 'Media fetch (CDN)',
        desc: 'Media URLs resolved; content streams from CDN with caching.',
        active: ['media','cdn','client'],
        edges: [['feed','media'], ['media','cdn'], ['cdn','client']]
      },
      {
        title: 'Create post (writes + fanout)',
        desc: 'Writes persist to storage; fanout updates feeds and notifications.',
        active: ['api','write','fanout','notify'],
        edges: [['client','api'], ['api','write'], ['write','fanout'], ['fanout','notify']]
      },
      {
        title: 'Notifications + realtime updates',
        desc: 'Notifications and realtime channels deliver likes/comments and friend activity updates.',
        active: ['notify','push','realtime','client'],
        edges: [['fanout','notify'], ['notify','push'], ['push','client'], ['fanout','realtime'], ['realtime','client']]
      },
      {
        title: 'Analytics + ads measurement',
        desc: 'Engagement events feed analytics; ads measurement/targeting systems consume signals.',
        active: ['metrics','analytics','ads'],
        edges: [['client','metrics'], ['metrics','analytics'], ['analytics','ads']]
      }
    ]
  },

  slack: {
    title: 'Slack',
    steps: [
      {
        title: 'Open workspace: auth + state sync',
        desc: 'Client authenticates and syncs workspace state, channels, and recent events.',
        active: ['client','auth','sync','presence'],
        edges: [['client','auth'], ['auth','sync'], ['sync','presence']]
      },
      {
        title: 'Send message (authz + persistence)',
        desc: 'Message hits API; authz checks run; event persisted to message store.',
        active: ['client','api','authz','store'],
        edges: [['client','api'], ['api','authz'], ['api','store']]
      },
      {
        title: 'Fanout + realtime delivery',
        desc: 'Event fanned out to channel members over realtime gateways; clients ack receipt.',
        active: ['fanout','realtime','client'],
        edges: [['store','fanout'], ['fanout','realtime'], ['realtime','client']]
      },
      {
        title: 'Search indexing',
        desc: 'Messages and files are indexed for fast search across workspace history.',
        active: ['index','search','store'],
        edges: [['store','index'], ['index','search']]
      },
      {
        title: 'Files/attachments + previews',
        desc: 'Files upload to object storage; previews/thumbnails generated and served via CDN.',
        active: ['upload','obj','cdn','preview'],
        edges: [['client','upload'], ['upload','obj'], ['obj','cdn'], ['upload','preview']]
      },
      {
        title: 'Apps, bots, and workflows',
        desc: 'Apps receive events via webhooks; bots/workflows post messages and actions.',
        active: ['apps','webhooks','api','workflow'],
        edges: [['fanout','apps'], ['apps','webhooks'], ['webhooks','api'], ['apps','workflow']]
      }
    ]
  }

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

  duolingo: {
    title: 'Duolingo',
    steps: [
      {
        title: 'Open app and load today’s path',
        desc: 'Client syncs user state, streak, and recommended lesson path.',
        active: ['client','auth','state','recos'],
        edges: [['client','auth'], ['auth','state'], ['state','recos']]
      },
      {
        title: 'Start lesson',
        desc: 'Lesson content and exercise set are fetched and cached.',
        active: ['lessons','content','cache'],
        edges: [['client','lessons'], ['lessons','content'], ['content','cache']]
      },
      {
        title: 'Exercise evaluation',
        desc: 'Answers are evaluated; hints and checks run in the grading engine.',
        active: ['exercise','grade','nlp'],
        edges: [['client','exercise'], ['exercise','grade'], ['grade','nlp']]
      },
      {
        title: 'Progress and streak update',
        desc: 'Progress writes update streaks, XP, crowns, and skill mastery.',
        active: ['progress','write','state'],
        edges: [['grade','progress'], ['progress','write'], ['write','state']]
      },
      {
        title: 'Personalization feedback loop',
        desc: 'Events feed ranking/personalization to adjust next lessons.',
        active: ['events','rank','recos'],
        edges: [['progress','events'], ['events','rank'], ['rank','recos']]
      },
      {
        title: 'Notifications',
        desc: 'Reminders and streak alerts are scheduled and pushed.',
        active: ['notify','scheduler','push'],
        edges: [['state','scheduler'], ['scheduler','notify'], ['notify','push']]
      }
    ]
  },

  coursera: {
    title: 'Coursera',
    steps: [
      {
        title: 'Browse catalog',
        desc: 'Client loads catalog search and recommendation modules.',
        active: ['client','catalog','search'],
        edges: [['client','catalog'], ['catalog','search']]
      },
      {
        title: 'Enroll in course',
        desc: 'Enrollment is created; entitlements and payments are verified.',
        active: ['enroll','payments','entitlements'],
        edges: [['client','enroll'], ['enroll','payments'], ['payments','entitlements']]
      },
      {
        title: 'Stream lecture video',
        desc: 'Playback uses CDN and adaptive streaming with progress tracking.',
        active: ['player','cdn','progress'],
        edges: [['client','player'], ['player','cdn'], ['player','progress']]
      },
      {
        title: 'Submit assignment',
        desc: 'Submissions are stored; grading runs (auto or peer) and results persist.',
        active: ['assignments','submissions','grading'],
        edges: [['client','assignments'], ['assignments','submissions'], ['submissions','grading']]
      },
      {
        title: 'Certificates',
        desc: 'Completion triggers certificate issuance and verification links.',
        active: ['completion','certs','verify'],
        edges: [['grading','completion'], ['completion','certs'], ['certs','verify']]
      },
      {
        title: 'Notifications',
        desc: 'Deadlines and updates trigger email/push notifications.',
        active: ['notify','email','push'],
        edges: [['completion','notify'], ['notify','email'], ['notify','push']]
      }
    ]
  },

  'khan-academy': {
    title: 'Khan Academy',
    steps: [
      {
        title: 'Load dashboard',
        desc: 'Client loads courses, skill map, and learner progress state.',
        active: ['client','dashboard','state'],
        edges: [['client','dashboard'], ['dashboard','state']]
      },
      {
        title: 'Start practice',
        desc: 'Practice engine selects items and fetches content assets.',
        active: ['practice','content','cache'],
        edges: [['client','practice'], ['practice','content'], ['content','cache']]
      },
      {
        title: 'Evaluate answers',
        desc: 'Grading checks answers and generates hints/steps.',
        active: ['grade','hints','practice'],
        edges: [['practice','grade'], ['grade','hints']]
      },
      {
        title: 'Update mastery',
        desc: 'Mastery model updates skill levels and persistence.',
        active: ['mastery','write','state'],
        edges: [['grade','mastery'], ['mastery','write'], ['write','state']]
      },
      {
        title: 'Recommendations',
        desc: 'Next practice and lessons are recommended based on mastery and goals.',
        active: ['recos','rank','dashboard'],
        edges: [['state','recos'], ['recos','rank'], ['rank','dashboard']]
      },
      {
        title: 'Teacher/classroom insights',
        desc: 'Classroom dashboards aggregate progress for teachers.',
        active: ['classroom','analytics','warehouse'],
        edges: [['state','analytics'], ['analytics','warehouse'], ['warehouse','classroom']]
      }
    ]
  },

  udemy: {
    title: 'Udemy',
    steps: [
      {
        title: 'Discover course',
        desc: 'Search and recommendations surface courses with pricing and reviews.',
        active: ['client','catalog','rank'],
        edges: [['client','catalog'], ['catalog','rank']]
      },
      {
        title: 'Purchase',
        desc: 'Checkout processes payment and grants course access.',
        active: ['checkout','payments','entitlements'],
        edges: [['client','checkout'], ['checkout','payments'], ['payments','entitlements']]
      },
      {
        title: 'Stream content',
        desc: 'Video is served via CDN; progress is tracked.',
        active: ['player','cdn','progress'],
        edges: [['client','player'], ['player','cdn'], ['player','progress']]
      },
      {
        title: 'Q&A / discussions',
        desc: 'Learners post questions and instructors reply; notifications sent.',
        active: ['discuss','store','notify'],
        edges: [['client','discuss'], ['discuss','store'], ['store','notify']]
      },
      {
        title: 'Reviews',
        desc: 'Ratings and reviews persist and influence ranking.',
        active: ['reviews','write','rank'],
        edges: [['client','reviews'], ['reviews','write'], ['write','rank']]
      },
      {
        title: 'Recommendations loop',
        desc: 'Engagement events feed personalization and email campaigns.',
        active: ['events','recos','email'],
        edges: [['progress','events'], ['events','recos'], ['recos','email']]
      }
    ]
  },

  medium: {
    title: 'Medium',
    steps: [
      {
        title: 'Load home feed',
        desc: 'Client loads personalized feed with caching and ranking.',
        active: ['client','feed','rank'],
        edges: [['client','feed'], ['feed','rank']]
      },
      {
        title: 'Open article',
        desc: 'Content is fetched and rendered; assets served via CDN.',
        active: ['content','cdn','cache'],
        edges: [['feed','content'], ['content','cdn'], ['content','cache']]
      },
      {
        title: 'Claps and responses',
        desc: 'Interactions persist and update counters and recommendations.',
        active: ['interactions','write','counters'],
        edges: [['client','interactions'], ['interactions','write'], ['write','counters']]
      },
      {
        title: 'Publish story',
        desc: 'Author writes; story is stored, indexed, and distributed.',
        active: ['editor','store','index'],
        edges: [['client','editor'], ['editor','store'], ['store','index']]
      },
      {
        title: 'Subscriptions and paywall',
        desc: 'Entitlements enforce access; payments manage subscriptions.',
        active: ['paywall','entitlements','payments'],
        edges: [['content','paywall'], ['paywall','entitlements'], ['entitlements','payments']]
      },
      {
        title: 'Email digests',
        desc: 'Digest scheduler sends curated recommendations by email.',
        active: ['scheduler','email','recos'],
        edges: [['rank','recos'], ['recos','scheduler'], ['scheduler','email']]
      }
    ]
  },

  substack: {
    title: 'Substack',
    steps: [
      {
        title: 'Browse newsletters',
        desc: 'Discovery surfaces newsletters using search and ranking.',
        active: ['client','discovery','search'],
        edges: [['client','discovery'], ['discovery','search']]
      },
      {
        title: 'Subscribe',
        desc: 'Subscription purchase creates entitlements and recurring billing.',
        active: ['checkout','payments','entitlements'],
        edges: [['client','checkout'], ['checkout','payments'], ['payments','entitlements']]
      },
      {
        title: 'Read post',
        desc: 'Content is fetched and served; paywall enforces access.',
        active: ['content','cdn','paywall'],
        edges: [['client','content'], ['content','cdn'], ['content','paywall']]
      },
      {
        title: 'Publish email',
        desc: 'Writer publishes; email pipeline fans out to subscribers.',
        active: ['editor','send','fanout'],
        edges: [['client','editor'], ['editor','send'], ['send','fanout']]
      },
      {
        title: 'Deliver and track',
        desc: 'Delivery logs opens/clicks and updates analytics dashboards.',
        active: ['delivery','events','analytics'],
        edges: [['fanout','delivery'], ['delivery','events'], ['events','analytics']]
      },
      {
        title: 'Comments and moderation',
        desc: 'Comments persist; moderation tools enforce rules.',
        active: ['comments','moderation','risk'],
        edges: [['client','comments'], ['comments','moderation'], ['moderation','risk']]
      }
    ]
  },

  quora: {
    title: 'Quora',
    steps: [
      {
        title: 'Load feed',
        desc: 'Client loads personalized feed with ranking and caching.',
        active: ['client','feed','rank'],
        edges: [['client','feed'], ['feed','rank']]
      },
      {
        title: 'Ask question',
        desc: 'Question write persists and routes to topics/experts.',
        active: ['api','write','routing'],
        edges: [['client','api'], ['api','write'], ['write','routing']]
      },
      {
        title: 'Answer and edit',
        desc: 'Answers persist, revisions stored, and indexed for search.',
        active: ['answers','versions','index'],
        edges: [['client','answers'], ['answers','versions'], ['versions','index']]
      },
      {
        title: 'Upvotes and ranking',
        desc: 'Votes update counters and impact feed ranking.',
        active: ['votes','counters','rank'],
        edges: [['client','votes'], ['votes','counters'], ['counters','rank']]
      },
      {
        title: 'Notifications',
        desc: 'Replies/mentions trigger notifications and push.',
        active: ['notify','push','client'],
        edges: [['answers','notify'], ['notify','push'], ['push','client']]
      },
      {
        title: 'Moderation',
        desc: 'Policy and integrity systems handle spam and abuse reports.',
        active: ['moderation','policy','risk'],
        edges: [['write','moderation'], ['moderation','policy'], ['policy','risk']]
      }
    ]
  },

  pinterest: {
    title: 'Pinterest',
    steps: [
      {
        title: 'Load home feed',
        desc: 'Client loads home feed using ranking and caching.',
        active: ['client','feed','rank'],
        edges: [['client','feed'], ['feed','rank']]
      },
      {
        title: 'Recommendation pipeline',
        desc: 'Candidate generation and ranking produce personalized pins.',
        active: ['recos','rank','graph'],
        edges: [['feed','recos'], ['recos','rank'], ['rank','graph']]
      },
      {
        title: 'Open pin',
        desc: 'Pin content and images are served via media service and CDN.',
        active: ['pin','media','cdn'],
        edges: [['feed','pin'], ['pin','media'], ['media','cdn']]
      },
      {
        title: 'Save pin',
        desc: 'Save action persists to boards and updates graph signals.',
        active: ['save','write','graph'],
        edges: [['client','save'], ['save','write'], ['write','graph']]
      },
      {
        title: 'Search',
        desc: 'Search uses index and ranking to return relevant pins.',
        active: ['search','index','rank'],
        edges: [['client','search'], ['search','index'], ['search','rank']]
      },
      {
        title: 'Ads and measurement',
        desc: 'Ads selection and measurement track conversions and attribution.',
        active: ['ads','auction','analytics'],
        edges: [['feed','ads'], ['ads','auction'], ['auction','analytics']]
      }
    ]
  },

  'uber-eats': {
    title: 'Uber Eats',
    steps: [
      {
        title: 'Browse restaurants',
        desc: 'Client loads catalog, menus, and availability with caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Create cart and checkout',
        desc: 'Cart is priced; promos applied; payment intent created.',
        active: ['cart','pricing','payments'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','payments']]
      },
      {
        title: 'Place order',
        desc: 'Order is created and routed to restaurant; acceptance tracked.',
        active: ['orders','dispatch','restaurant'],
        edges: [['payments','orders'], ['orders','dispatch'], ['dispatch','restaurant']]
      },
      {
        title: 'Courier assignment',
        desc: 'Dispatch assigns courier; courier app receives job.',
        active: ['dispatch','courier','realtime'],
        edges: [['dispatch','courier'], ['courier','realtime']]
      },
      {
        title: 'Live tracking',
        desc: 'Location updates stream; ETA and tracking updates shown to user.',
        active: ['location','eta','client'],
        edges: [['courier','location'], ['location','eta'], ['eta','client']]
      },
      {
        title: 'Post-order support',
        desc: 'Refunds/issues handled via support workflows and ledger adjustments.',
        active: ['support','refunds','ledger'],
        edges: [['orders','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  doordash: {
    title: 'DoorDash',
    steps: [
      {
        title: 'Browse stores',
        desc: 'Client loads catalog and menus with availability and caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Checkout',
        desc: 'Pricing, fees, and promos applied; payment intent created.',
        active: ['cart','pricing','payments'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','payments']]
      },
      {
        title: 'Create order',
        desc: 'Order is created and sent to merchant for acceptance.',
        active: ['orders','merchant','dispatch'],
        edges: [['payments','orders'], ['orders','merchant'], ['orders','dispatch']]
      },
      {
        title: 'Dasher assignment',
        desc: 'Dispatch assigns a dasher and sends job to courier app.',
        active: ['dispatch','courier','realtime'],
        edges: [['dispatch','courier'], ['courier','realtime']]
      },
      {
        title: 'Tracking and ETA',
        desc: 'Location updates stream; ETA model updates client tracking.',
        active: ['location','eta','client'],
        edges: [['courier','location'], ['location','eta'], ['eta','client']]
      },
      {
        title: 'Support and refunds',
        desc: 'Issues handled via support workflows and refunds in ledger.',
        active: ['support','refunds','ledger'],
        edges: [['orders','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  }

  figma: {
    title: 'Figma',
    steps: [
      {
        title: 'Open file',
        desc: 'Client loads file metadata and document snapshot; caches for fast render.',
        active: ['client','auth','files','cache'],
        edges: [['client','auth'], ['client','files'], ['files','cache']]
      },
      {
        title: 'Collaborative edits',
        desc: 'Edits are sent as operations; realtime service broadcasts to collaborators.',
        active: ['editor','realtime','ops'],
        edges: [['client','editor'], ['editor','ops'], ['ops','realtime']]
      },
      {
        title: 'Conflict resolution',
        desc: 'Server merges concurrent operations and persists document state.',
        active: ['merge','store','ops'],
        edges: [['ops','merge'], ['merge','store']]
      },
      {
        title: 'Comments and mentions',
        desc: 'Comments persist and trigger notifications and mentions.',
        active: ['comments','notify','push'],
        edges: [['client','comments'], ['comments','notify'], ['notify','push']]
      },
      {
        title: 'Assets and exports',
        desc: 'Export jobs render images/PDFs and serve via CDN.',
        active: ['export','render','cdn'],
        edges: [['client','export'], ['export','render'], ['render','cdn']]
      },
      {
        title: 'Permissions and sharing',
        desc: 'Sharing links and permissions enforce access; auditing records changes.',
        active: ['sharing','authz','audit'],
        edges: [['client','sharing'], ['sharing','authz'], ['authz','audit']]
      }
    ]
  },

  canva: {
    title: 'Canva',
    steps: [
      {
        title: 'Open design',
        desc: 'Client loads design metadata, pages, and assets with caching.',
        active: ['client','designs','cache'],
        edges: [['client','designs'], ['designs','cache']]
      },
      {
        title: 'Edit and autosave',
        desc: 'Edits persist as operations; autosave writes to store.',
        active: ['editor','ops','store'],
        edges: [['client','editor'], ['editor','ops'], ['ops','store']]
      },
      {
        title: 'Collaboration',
        desc: 'Realtime service broadcasts changes and cursors to collaborators.',
        active: ['realtime','presence','client'],
        edges: [['store','realtime'], ['realtime','client'], ['realtime','presence']]
      },
      {
        title: 'Templates and assets',
        desc: 'Template search and asset library fetch images/fonts/videos.',
        active: ['templates','search','assets'],
        edges: [['client','templates'], ['templates','search'], ['search','assets']]
      },
      {
        title: 'Export',
        desc: 'Render pipeline generates PDF/PNG/MP4; served via CDN.',
        active: ['export','render','cdn'],
        edges: [['client','export'], ['export','render'], ['render','cdn']]
      },
      {
        title: 'Billing and entitlements',
        desc: 'Pro features are gated by entitlements and subscription billing.',
        active: ['paywall','entitlements','payments'],
        edges: [['export','paywall'], ['paywall','entitlements'], ['entitlements','payments']]
      }
    ]
  },

  photoshop: {
    title: 'Adobe Photoshop',
    steps: [
      {
        title: 'Open project',
        desc: 'Client loads local/cloud document and asset references.',
        active: ['client','files','assets'],
        edges: [['client','files'], ['files','assets']]
      },
      {
        title: 'Edit operations',
        desc: 'Edits apply filters and layers; GPU pipeline renders preview.',
        active: ['editor','render','gpu'],
        edges: [['client','editor'], ['editor','render'], ['render','gpu']]
      },
      {
        title: 'Autosave / versioning',
        desc: 'Versions and autosave persist snapshots to store.',
        active: ['versions','store','sync'],
        edges: [['editor','versions'], ['versions','store'], ['store','sync']]
      },
      {
        title: 'Cloud sync',
        desc: 'Sync service uploads changes; resolves conflicts and merges.',
        active: ['sync','merge','store'],
        edges: [['sync','merge'], ['merge','store']]
      },
      {
        title: 'Export',
        desc: 'Export pipeline generates final files and shares links.',
        active: ['export','cdn','sharing'],
        edges: [['client','export'], ['export','cdn'], ['export','sharing']]
      },
      {
        title: 'Entitlements',
        desc: 'Licensing checks entitlements and validates subscription.',
        active: ['auth','entitlements','payments'],
        edges: [['client','auth'], ['auth','entitlements'], ['entitlements','payments']]
      }
    ]
  },

  'google-maps': {
    title: 'Google Maps',
    steps: [
      {
        title: 'Search place',
        desc: 'Client searches POIs; index and ranking return results.',
        active: ['client','search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'Load map tiles',
        desc: 'Tile service serves vector/raster tiles via CDN with caching.',
        active: ['tiles','cdn','cache'],
        edges: [['client','tiles'], ['tiles','cdn'], ['tiles','cache']]
      },
      {
        title: 'Routing',
        desc: 'Route engine computes path using traffic and road graph.',
        active: ['routing','graph','traffic'],
        edges: [['client','routing'], ['routing','graph'], ['traffic','routing']]
      },
      {
        title: 'Navigation updates',
        desc: 'Location stream updates ETA and reroutes when needed.',
        active: ['location','eta','routing'],
        edges: [['client','location'], ['location','eta'], ['eta','routing']]
      },
      {
        title: 'Reviews and photos',
        desc: 'UGC writes persist reviews/photos and update place profiles.',
        active: ['ugc','store','moderation'],
        edges: [['client','ugc'], ['ugc','store'], ['ugc','moderation']]
      },
      {
        title: 'Ads',
        desc: 'Sponsored results and promoted pins are selected and measured.',
        active: ['ads','auction','analytics'],
        edges: [['search','ads'], ['ads','auction'], ['auction','analytics']]
      }
    ]
  },

  waze: {
    title: 'Waze',
    steps: [
      {
        title: 'Load map and nearby',
        desc: 'Client loads tiles and nearby roads with caching.',
        active: ['client','tiles','cache'],
        edges: [['client','tiles'], ['tiles','cache']]
      },
      {
        title: 'Live traffic',
        desc: 'Location pings stream into traffic aggregation and ETA models.',
        active: ['location','traffic','eta'],
        edges: [['client','location'], ['location','traffic'], ['traffic','eta']]
      },
      {
        title: 'Routing',
        desc: 'Route engine computes route using incidents and traffic.',
        active: ['routing','graph','traffic'],
        edges: [['client','routing'], ['routing','graph'], ['traffic','routing']]
      },
      {
        title: 'Report incident',
        desc: 'User reports hazards; moderation and validation apply.',
        active: ['reports','moderation','store'],
        edges: [['client','reports'], ['reports','moderation'], ['reports','store']]
      },
      {
        title: 'Community validation',
        desc: 'Crowd signals validate incidents and update map state.',
        active: ['signals','rank','traffic'],
        edges: [['reports','signals'], ['signals','rank'], ['rank','traffic']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts for hazards and reroutes are pushed to client.',
        active: ['notify','push','client'],
        edges: [['traffic','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  zomato: {
    title: 'Zomato',
    steps: [
      {
        title: 'Browse restaurants',
        desc: 'Client loads catalog and menus with caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Checkout',
        desc: 'Pricing and promos applied; payment intent created.',
        active: ['cart','pricing','payments'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','payments']]
      },
      {
        title: 'Create order',
        desc: 'Order is created and sent to restaurant; acceptance tracked.',
        active: ['orders','restaurant','dispatch'],
        edges: [['payments','orders'], ['orders','restaurant'], ['orders','dispatch']]
      },
      {
        title: 'Delivery assignment',
        desc: 'Dispatch assigns courier; realtime updates begin.',
        active: ['dispatch','courier','realtime'],
        edges: [['dispatch','courier'], ['courier','realtime']]
      },
      {
        title: 'Tracking and ETA',
        desc: 'Location stream updates ETA and client tracking.',
        active: ['location','eta','client'],
        edges: [['courier','location'], ['location','eta'], ['eta','client']]
      },
      {
        title: 'Support and refunds',
        desc: 'Issues handled; refunds posted to ledger and payment reversals.',
        active: ['support','refunds','ledger'],
        edges: [['orders','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  swiggy: {
    title: 'Swiggy',
    steps: [
      {
        title: 'Browse restaurants',
        desc: 'Client loads catalog and menus with caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Checkout',
        desc: 'Pricing and promos applied; payment intent created.',
        active: ['cart','pricing','payments'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','payments']]
      },
      {
        title: 'Create order',
        desc: 'Order is created and sent to restaurant; acceptance tracked.',
        active: ['orders','restaurant','dispatch'],
        edges: [['payments','orders'], ['orders','restaurant'], ['orders','dispatch']]
      },
      {
        title: 'Delivery assignment',
        desc: 'Dispatch assigns courier; realtime updates begin.',
        active: ['dispatch','courier','realtime'],
        edges: [['dispatch','courier'], ['courier','realtime']]
      },
      {
        title: 'Tracking and ETA',
        desc: 'Location stream updates ETA and client tracking.',
        active: ['location','eta','client'],
        edges: [['courier','location'], ['location','eta'], ['eta','client']]
      },
      {
        title: 'Support and refunds',
        desc: 'Issues handled; refunds posted to ledger and payment reversals.',
        active: ['support','refunds','ledger'],
        edges: [['orders','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  instacart: {
    title: 'Instacart',
    steps: [
      {
        title: 'Browse inventory',
        desc: 'Client loads store inventory, pricing, and availability.',
        active: ['client','catalog','inventory'],
        edges: [['client','catalog'], ['catalog','inventory']]
      },
      {
        title: 'Checkout',
        desc: 'Cart is priced; substitutions rules applied; payment authorized.',
        active: ['cart','pricing','payments'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','payments']]
      },
      {
        title: 'Shopper assignment',
        desc: 'Dispatch assigns a shopper; job delivered to shopper app.',
        active: ['dispatch','shopper','realtime'],
        edges: [['payments','dispatch'], ['dispatch','shopper'], ['shopper','realtime']]
      },
      {
        title: 'Picking and substitutions',
        desc: 'Picker updates item status; substitutions approvals flow to user.',
        active: ['picking','updates','notify'],
        edges: [['shopper','picking'], ['picking','updates'], ['updates','notify']]
      },
      {
        title: 'Delivery tracking',
        desc: 'Location updates stream; ETA updates shown to user.',
        active: ['location','eta','client'],
        edges: [['shopper','location'], ['location','eta'], ['eta','client']]
      },
      {
        title: 'Support and refunds',
        desc: 'Issues handled; refunds posted to ledger and payment reversals.',
        active: ['support','refunds','ledger'],
        edges: [['dispatch','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  coinmarketcap: {
    title: 'CoinMarketCap',
    steps: [
      {
        title: 'Load markets page',
        desc: 'Client requests listings; cache and CDN serve hot data fast.',
        active: ['client','api','cache'],
        edges: [['client','api'], ['api','cache']]
      },
      {
        title: 'Ingest exchange feeds',
        desc: 'Connectors ingest exchange/DEX price feeds into streaming pipeline.',
        active: ['connectors','stream','normalize'],
        edges: [['connectors','stream'], ['stream','normalize']]
      },
      {
        title: 'Aggregate prices',
        desc: 'Aggregation computes index prices and 24h metrics.',
        active: ['aggregate','timeseries','store'],
        edges: [['normalize','aggregate'], ['aggregate','timeseries'], ['timeseries','store']]
      },
      {
        title: 'Serve APIs',
        desc: 'API serves listings, charts, and metadata with caching.',
        active: ['api','store','cache'],
        edges: [['api','store'], ['store','cache']]
      },
      {
        title: 'Alerts',
        desc: 'Price alerts trigger notifications and emails.',
        active: ['alerts','notify','email'],
        edges: [['timeseries','alerts'], ['alerts','notify'], ['alerts','email']]
      },
      {
        title: 'Ads and analytics',
        desc: 'Ads selection and analytics track engagement and conversions.',
        active: ['ads','auction','analytics'],
        edges: [['api','ads'], ['ads','auction'], ['auction','analytics']]
      }
    ]
  }

  'apple-photos': {
    title: 'Apple Photos',
    steps: [
      {
        title: 'Sync library',
        desc: 'Client syncs photo library metadata and thumbnails.',
        active: ['client','auth','metadata','cache'],
        edges: [['client','auth'], ['auth','metadata'], ['metadata','cache']]
      },
      {
        title: 'Upload photo',
        desc: 'Upload pipeline stores photo blobs and updates metadata.',
        active: ['upload','storage','metadata'],
        edges: [['client','upload'], ['upload','storage'], ['upload','metadata']]
      },
      {
        title: 'Generate derivatives',
        desc: 'Processing generates thumbnails, previews, and HEIC/JPEG variants.',
        active: ['processing','derivatives','storage'],
        edges: [['storage','processing'], ['processing','derivatives'], ['derivatives','storage']]
      },
      {
        title: 'Search and indexing',
        desc: 'Indexing supports search by people/places/objects.',
        active: ['index','search','ml'],
        edges: [['metadata','index'], ['index','search'], ['index','ml']]
      },
      {
        title: 'Memories and suggestions',
        desc: 'ML pipeline builds memories/suggestions and personalized highlights.',
        active: ['ml','recos','feed'],
        edges: [['ml','recos'], ['recos','feed']]
      },
      {
        title: 'Sharing',
        desc: 'Shared albums enforce permissions and send invites/notifications.',
        active: ['sharing','authz','notify'],
        edges: [['client','sharing'], ['sharing','authz'], ['sharing','notify']]
      }
    ]
  },

  'google-photos': {
    title: 'Google Photos',
    steps: [
      {
        title: 'Backup sync',
        desc: 'Client syncs metadata and upload queue; manages resumable uploads.',
        active: ['client','auth','backup','upload'],
        edges: [['client','auth'], ['client','backup'], ['backup','upload']]
      },
      {
        title: 'Upload and store',
        desc: 'Uploads land in object storage and update photo metadata store.',
        active: ['upload','obj','metadata'],
        edges: [['upload','obj'], ['upload','metadata']]
      },
      {
        title: 'Processing pipeline',
        desc: 'Processing generates thumbnails, deduping, and formats.',
        active: ['processing','derivatives','obj'],
        edges: [['obj','processing'], ['processing','derivatives'], ['derivatives','obj']]
      },
      {
        title: 'ML labeling',
        desc: 'Vision models label people/places/objects for search.',
        active: ['ml','labels','index'],
        edges: [['processing','ml'], ['ml','labels'], ['labels','index']]
      },
      {
        title: 'Search',
        desc: 'Search queries index and returns results quickly with caching.',
        active: ['search','index','cache'],
        edges: [['client','search'], ['search','index'], ['search','cache']]
      },
      {
        title: 'Sharing',
        desc: 'Sharing links and shared albums enforce access and send notifications.',
        active: ['sharing','authz','notify'],
        edges: [['client','sharing'], ['sharing','authz'], ['sharing','notify']]
      }
    ]
  },

  icloud: {
    title: 'iCloud',
    steps: [
      {
        title: 'Sign in',
        desc: 'Client authenticates and loads account services and entitlements.',
        active: ['client','auth','entitlements'],
        edges: [['client','auth'], ['auth','entitlements']]
      },
      {
        title: 'Sync metadata',
        desc: 'Sync engine fetches metadata for files/contacts/photos as needed.',
        active: ['sync','metadata','cache'],
        edges: [['client','sync'], ['sync','metadata'], ['metadata','cache']]
      },
      {
        title: 'Upload content',
        desc: 'Uploads store blobs and update metadata; conflict handling applies.',
        active: ['upload','storage','versions'],
        edges: [['client','upload'], ['upload','storage'], ['upload','versions']]
      },
      {
        title: 'Share link',
        desc: 'Share links are created with permissions and audit logs.',
        active: ['sharing','authz','audit'],
        edges: [['client','sharing'], ['sharing','authz'], ['authz','audit']]
      },
      {
        title: 'Realtime updates',
        desc: 'Realtime notifications and deltas keep devices in sync.',
        active: ['realtime','push','client'],
        edges: [['sync','realtime'], ['realtime','push'], ['push','client']]
      },
      {
        title: 'Billing',
        desc: 'Storage plans and billing manage quota and renewals.',
        active: ['billing','payments','quota'],
        edges: [['entitlements','quota'], ['quota','billing'], ['billing','payments']]
      }
    ]
  },

  onedrive: {
    title: 'OneDrive',
    steps: [
      {
        title: 'Sync files',
        desc: 'Client syncs folder metadata and recent changes; uses caching.',
        active: ['client','auth','metadata','sync'],
        edges: [['client','auth'], ['client','sync'], ['sync','metadata']]
      },
      {
        title: 'Upload',
        desc: 'Resumable upload stores blobs and updates metadata store.',
        active: ['upload','storage','metadata'],
        edges: [['client','upload'], ['upload','storage'], ['upload','metadata']]
      },
      {
        title: 'Sharing',
        desc: 'Sharing links enforce permissions and audit events.',
        active: ['sharing','authz','audit'],
        edges: [['client','sharing'], ['sharing','authz'], ['authz','audit']]
      },
      {
        title: 'Realtime updates',
        desc: 'Change notifications and delta sync keep clients updated.',
        active: ['realtime','push','client'],
        edges: [['metadata','realtime'], ['realtime','push'], ['push','client']]
      },
      {
        title: 'Search',
        desc: 'Indexing supports search across documents and files.',
        active: ['index','search','metadata'],
        edges: [['metadata','index'], ['index','search']]
      },
      {
        title: 'Ransomware detection',
        desc: 'Safety service detects anomalies and supports restore/versioning.',
        active: ['safety','versions','support'],
        edges: [['storage','safety'], ['safety','versions'], ['versions','support']]
      }
    ]
  },

  wetransfer: {
    title: 'WeTransfer',
    steps: [
      {
        title: 'Create transfer',
        desc: 'Client creates transfer metadata and gets upload URLs.',
        active: ['client','api','metadata'],
        edges: [['client','api'], ['api','metadata']]
      },
      {
        title: 'Upload files',
        desc: 'Uploads go to object store; progress tracked.',
        active: ['upload','obj','cdn'],
        edges: [['client','upload'], ['upload','obj'], ['obj','cdn']]
      },
      {
        title: 'Virus scan',
        desc: 'Scan pipeline checks files and quarantines threats.',
        active: ['scan','risk','obj'],
        edges: [['obj','scan'], ['scan','risk']]
      },
      {
        title: 'Generate download link',
        desc: 'Signed links are created with expiry and access rules.',
        active: ['links','authz','metadata'],
        edges: [['metadata','links'], ['links','authz']]
      },
      {
        title: 'Notify recipients',
        desc: 'Email notifications send download links and tracking.',
        active: ['notify','email','tracking'],
        edges: [['links','notify'], ['notify','email'], ['email','tracking']]
      },
      {
        title: 'Download',
        desc: 'Recipients download via CDN; usage tracked for analytics.',
        active: ['cdn','analytics','tracking'],
        edges: [['cdn','tracking'], ['tracking','analytics']]
      }
    ]
  },

  'stripe-connect': {
    title: 'Stripe Connect',
    steps: [
      {
        title: 'Onboard connected account',
        desc: 'Platform creates connected account; KYC and verification run.',
        active: ['platform','connect','kyc'],
        edges: [['platform','connect'], ['connect','kyc']]
      },
      {
        title: 'Create payment',
        desc: 'PaymentIntent created; risk and auth flows execute.',
        active: ['api','pi','risk'],
        edges: [['platform','api'], ['api','pi'], ['pi','risk']]
      },
      {
        title: 'Route funds',
        desc: 'Funds routed to connected account with fees and splits.',
        active: ['routing','ledger','balances'],
        edges: [['pi','routing'], ['routing','ledger'], ['ledger','balances']]
      },
      {
        title: 'Payouts',
        desc: 'Payout scheduler triggers payouts to bank accounts.',
        active: ['payouts','scheduler','bank'],
        edges: [['balances','payouts'], ['payouts','scheduler'], ['scheduler','bank']]
      },
      {
        title: 'Disputes and refunds',
        desc: 'Refunds and disputes update ledger and compliance records.',
        active: ['refunds','disputes','ledger'],
        edges: [['api','refunds'], ['refunds','ledger'], ['ledger','disputes']]
      },
      {
        title: 'Reporting',
        desc: 'Reports and reconciliation are generated for platform and accounts.',
        active: ['reports','recon','analytics'],
        edges: [['ledger','reports'], ['reports','recon'], ['recon','analytics']]
      }
    ]
  },

  razorpay: {
    title: 'Razorpay',
    steps: [
      {
        title: 'Merchant creates order + opens checkout',
        desc: 'Merchant backend creates an order; client loads Razorpay Checkout with amount, currency, and metadata.',
        active: ['merchant','api','orders','client'],
        edges: [['merchant','api'], ['api','orders'], ['merchant','client']]
      },
      {
        title: 'Select method (UPI/cards/netbanking) + risk checks',
        desc: 'Checkout supports multiple Indian rails; risk screening gates the attempt before routing.',
        active: ['client','payments','risk','routing'],
        edges: [['client','payments'], ['payments','risk'], ['risk','routing']]
      },
      {
        title: 'Authorize/capture on rails',
        desc: 'Routes to bank/PSP/acquirer; success/failure returned and captured when applicable.',
        active: ['routing','bank','capture','ledger'],
        edges: [['routing','bank'], ['bank','capture'], ['capture','ledger']]
      },
      {
        title: 'Webhook + reconciliation events',
        desc: 'Status events delivered to merchant; retries and idempotency ensure consistency.',
        active: ['events','webhooks','merchant','notify'],
        edges: [['ledger','events'], ['events','webhooks'], ['webhooks','merchant'], ['events','notify']]
      },
      {
        title: 'Settlements/payouts',
        desc: 'Settlement batches reconcile with bank reports and schedule merchant payouts.',
        active: ['settlement','recon','merchant','ledger'],
        edges: [['ledger','settlement'], ['settlement','recon'], ['settlement','merchant']]
      },
      {
        title: 'Refunds + disputes + reporting',
        desc: 'Refunds/chargebacks adjust ledger; reporting supports finance ops and audits.',
        active: ['refunds','disputes','reports','ledger'],
        edges: [['merchant','refunds'], ['refunds','ledger'], ['ledger','disputes'], ['ledger','reports']]
      }
    ]
  },

  phonepe: {
    title: 'PhonePe',
    steps: [
      {
        title: 'Initiate UPI payment (QR/UPI ID)',
        desc: 'User scans QR or selects contact; app creates a UPI intent and validates context.',
        active: ['client','auth','payments','upi'],
        edges: [['client','auth'], ['client','payments'], ['payments','upi']]
      },
      {
        title: 'UPI PIN + device/risk checks',
        desc: 'User enters UPI PIN; device binding and risk checks gate submission to PSP/banks.',
        active: ['auth','risk','routing'],
        edges: [['auth','risk'], ['risk','routing']]
      },
      {
        title: 'Route via PSP + UPI switch + bank auth',
        desc: 'Routes to PSP/UPI switch and payer bank; success/failure returned with reference ids.',
        active: ['psp','switch','bank','status'],
        edges: [['routing','psp'], ['psp','switch'], ['switch','bank'], ['bank','status']]
      },
      {
        title: 'Ledgering + receipt + callbacks',
        desc: 'Ledger entries recorded; receipt shown; merchant callbacks/webhooks notified.',
        active: ['ledger','notify','webhooks','merchant','client'],
        edges: [['status','ledger'], ['ledger','notify'], ['notify','client'], ['ledger','webhooks'], ['webhooks','merchant']]
      },
      {
        title: 'Reconciliation + settlements',
        desc: 'Reconciliation aligns PSP/bank reports; merchant settlements happen for QR payments.',
        active: ['recon','settlements','ledger'],
        edges: [['ledger','recon'], ['recon','settlements']]
      },
      {
        title: 'Disputes, reversals, refunds, analytics',
        desc: 'Failures/disputes create cases; reversals/refunds processed; analytics monitors fraud and performance.',
        active: ['disputes','refunds','analytics','risk'],
        edges: [['ledger','disputes'], ['disputes','refunds'], ['ledger','analytics'], ['analytics','risk']]
      }
    ]
  },

  groww: {
    title: 'Groww',
    steps: [
      {
        title: 'KYC and account setup',
        desc: 'User completes KYC; brokerage account is created.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Add funds',
        desc: 'Payments add funds; ledger updates balances.',
        active: ['payments','ledger','wallet'],
        edges: [['client','payments'], ['payments','ledger'], ['ledger','wallet']]
      },
      {
        title: 'Place order',
        desc: 'Order routed to broker/exchange; risk checks apply.',
        active: ['orders','risk','broker'],
        edges: [['client','orders'], ['orders','risk'], ['orders','broker']]
      },
      {
        title: 'Execution and settlement',
        desc: 'Execution updates positions; settlement reconciles cash/holdings.',
        active: ['execution','positions','settlement'],
        edges: [['broker','execution'], ['execution','positions'], ['positions','settlement']]
      },
      {
        title: 'Portfolio analytics',
        desc: 'Analytics compute P&L, charts, and holdings summaries.',
        active: ['analytics','warehouse','portfolio'],
        edges: [['positions','analytics'], ['analytics','warehouse'], ['warehouse','portfolio']]
      },
      {
        title: 'Withdraw funds',
        desc: 'Withdrawals move funds to bank; compliance checks apply.',
        active: ['withdraw','bank','compliance'],
        edges: [['client','withdraw'], ['withdraw','compliance'], ['withdraw','bank']]
      }
    ]
  },

  cred: {
    title: 'CRED',
    steps: [
      {
        title: 'Link cards and fetch bills',
        desc: 'User links cards; bill fetchers aggregate statements and due dates.',
        active: ['client','linking','billfetch'],
        edges: [['client','linking'], ['linking','billfetch']]
      },
      {
        title: 'Show bill and recommendations',
        desc: 'Bill UI shows totals; offers and rewards personalized.',
        active: ['billfetch','offers','rank'],
        edges: [['billfetch','offers'], ['offers','rank']]
      },
      {
        title: 'Pay bill',
        desc: 'Payment intent created; routed via payment rails; ledger updated.',
        active: ['payments','routing','ledger'],
        edges: [['client','payments'], ['payments','routing'], ['routing','ledger']]
      },
      {
        title: 'Confirm and notify',
        desc: 'Status updates delivered; receipts and notifications sent.',
        active: ['status','notify','push'],
        edges: [['ledger','status'], ['status','notify'], ['notify','push']]
      },
      {
        title: 'Rewards and cashback',
        desc: 'Rewards computed; wallet updated and offers tracked.',
        active: ['rewards','wallet','analytics'],
        edges: [['status','rewards'], ['rewards','wallet'], ['rewards','analytics']]
      },
      {
        title: 'Fraud and risk',
        desc: 'Risk engine monitors transactions and prevents fraud.',
        active: ['risk','fraud','ledger'],
        edges: [['payments','risk'], ['risk','fraud'], ['fraud','ledger']]
      }
    ]
  }

  tinder: {
    title: 'Tinder',
    steps: [
      {
        title: 'Open app and fetch recommendations',
        desc: 'Client authenticates and fetches a ranked stack of profiles.',
        active: ['client','auth','recos','rank'],
        edges: [['client','auth'], ['auth','recos'], ['recos','rank']]
      },
      {
        title: 'Swipe action',
        desc: 'Like/Pass is recorded; signals update ranking and candidate generation.',
        active: ['swipes','write','signals'],
        edges: [['client','swipes'], ['swipes','write'], ['write','signals']]
      },
      {
        title: 'Matchmaking',
        desc: 'Mutual likes create a match and open messaging.',
        active: ['match','store','chat'],
        edges: [['signals','match'], ['match','store'], ['match','chat']]
      },
      {
        title: 'Send message',
        desc: 'Messages persist and deliver via realtime gateways.',
        active: ['chat','realtime','notify'],
        edges: [['client','chat'], ['chat','realtime'], ['chat','notify']]
      },
      {
        title: 'Safety and moderation',
        desc: 'Safety systems monitor abuse reports and spam signals.',
        active: ['moderation','risk','policy'],
        edges: [['chat','moderation'], ['moderation','risk'], ['moderation','policy']]
      },
      {
        title: 'Subscriptions',
        desc: 'Premium features gated by entitlements and billing.',
        active: ['paywall','entitlements','payments'],
        edges: [['client','paywall'], ['paywall','entitlements'], ['entitlements','payments']]
      }
    ]
  },

  bumble: {
    title: 'Bumble',
    steps: [
      {
        title: 'Fetch recommendations',
        desc: 'Client loads ranked candidates using preferences and location.',
        active: ['client','auth','recos','rank'],
        edges: [['client','auth'], ['auth','recos'], ['recos','rank']]
      },
      {
        title: 'Swipe and signals',
        desc: 'Swipes persist and update ranking signals and filters.',
        active: ['swipes','write','signals'],
        edges: [['client','swipes'], ['swipes','write'], ['write','signals']]
      },
      {
        title: 'Match creation',
        desc: 'Mutual likes create a match and open chat.',
        active: ['match','store','chat'],
        edges: [['signals','match'], ['match','store'], ['match','chat']]
      },
      {
        title: 'First message flow',
        desc: 'Messaging rules (e.g., first message) enforced and notified.',
        active: ['rules','notify','chat'],
        edges: [['match','rules'], ['rules','notify'], ['notify','chat']]
      },
      {
        title: 'Realtime messaging',
        desc: 'Messages persist and deliver via realtime gateways.',
        active: ['chat','realtime','push'],
        edges: [['chat','realtime'], ['realtime','push'], ['push','client']]
      },
      {
        title: 'Safety and verification',
        desc: 'Photo verification and abuse monitoring improve trust.',
        active: ['verify','moderation','risk'],
        edges: [['client','verify'], ['verify','moderation'], ['moderation','risk']]
      }
    ]
  },

  hinge: {
    title: 'Hinge',
    steps: [
      {
        title: 'Load curated feed',
        desc: 'Client loads curated candidates and prompts with ranking.',
        active: ['client','recos','rank'],
        edges: [['client','recos'], ['recos','rank']]
      },
      {
        title: 'Like with comment',
        desc: 'Likes with comments persist and trigger notification to recipient.',
        active: ['likes','comments','notify'],
        edges: [['client','likes'], ['likes','comments'], ['comments','notify']]
      },
      {
        title: 'Matchmaking',
        desc: 'Mutual engagement creates match and enables chat.',
        active: ['match','store','chat'],
        edges: [['likes','match'], ['match','store'], ['match','chat']]
      },
      {
        title: 'Conversation and delivery',
        desc: 'Messages persist and deliver via realtime gateways.',
        active: ['chat','realtime','push'],
        edges: [['chat','realtime'], ['realtime','push'], ['push','client']]
      },
      {
        title: 'Profile integrity',
        desc: 'Moderation checks spam, fake accounts, and reported content.',
        active: ['moderation','risk','policy'],
        edges: [['chat','moderation'], ['moderation','risk'], ['moderation','policy']]
      },
      {
        title: 'Premium preferences',
        desc: 'Premium filters and boosts gated by entitlements.',
        active: ['entitlements','paywall','payments'],
        edges: [['client','paywall'], ['paywall','entitlements'], ['entitlements','payments']]
      }
    ]
  },

  zerodha: {
    title: 'Zerodha',
    steps: [
      {
        title: 'Login and KYC status',
        desc: 'User authenticates and account/KYC status is validated.',
        active: ['client','auth','kyc'],
        edges: [['client','auth'], ['auth','kyc']]
      },
      {
        title: 'Add funds',
        desc: 'Payments add funds; ledger updates balances.',
        active: ['payments','ledger','wallet'],
        edges: [['client','payments'], ['payments','ledger'], ['ledger','wallet']]
      },
      {
        title: 'Place order',
        desc: 'Order validated; risk checks; routed to broker/exchange.',
        active: ['orders','risk','broker'],
        edges: [['client','orders'], ['orders','risk'], ['orders','broker']]
      },
      {
        title: 'Execution',
        desc: 'Execution updates positions and order status.',
        active: ['execution','positions','status'],
        edges: [['broker','execution'], ['execution','positions'], ['execution','status']]
      },
      {
        title: 'Settlement and reports',
        desc: 'Settlement reconciles cash/holdings; reports generated.',
        active: ['settlement','reports','warehouse'],
        edges: [['positions','settlement'], ['settlement','reports'], ['reports','warehouse']]
      },
      {
        title: 'Withdraw funds',
        desc: 'Withdrawals to bank with compliance checks.',
        active: ['withdraw','bank','compliance'],
        edges: [['client','withdraw'], ['withdraw','compliance'], ['withdraw','bank']]
      }
    ]
  },

  upstox: {
    title: 'Upstox',
    steps: [
      {
        title: 'Login',
        desc: 'Authentication and device checks complete.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Market data',
        desc: 'Streaming market data delivered to client watchlists.',
        active: ['marketdata','stream','client'],
        edges: [['marketdata','stream'], ['stream','client']]
      },
      {
        title: 'Place order',
        desc: 'Order validated and routed to broker/exchange.',
        active: ['orders','risk','broker'],
        edges: [['client','orders'], ['orders','risk'], ['orders','broker']]
      },
      {
        title: 'Execution and positions',
        desc: 'Execution updates positions and portfolio state.',
        active: ['execution','positions','ledger'],
        edges: [['broker','execution'], ['execution','positions'], ['positions','ledger']]
      },
      {
        title: 'Reports',
        desc: 'Reports and statements generated from warehouse.',
        active: ['reports','warehouse','analytics'],
        edges: [['positions','warehouse'], ['warehouse','reports'], ['reports','analytics']]
      },
      {
        title: 'Withdraw',
        desc: 'Withdrawals to bank with compliance checks.',
        active: ['withdraw','bank','compliance'],
        edges: [['client','withdraw'], ['withdraw','compliance'], ['withdraw','bank']]
      }
    ]
  },

  'angel-one': {
    title: 'Angel One',
    steps: [
      {
        title: 'Login and KYC',
        desc: 'User logs in; KYC/account status validated.',
        active: ['client','auth','kyc'],
        edges: [['client','auth'], ['auth','kyc']]
      },
      {
        title: 'Market data stream',
        desc: 'Quotes and charts stream to client.',
        active: ['marketdata','stream','client'],
        edges: [['marketdata','stream'], ['stream','client']]
      },
      {
        title: 'Place order',
        desc: 'Order validated and routed; risk controls apply.',
        active: ['orders','risk','broker'],
        edges: [['client','orders'], ['orders','risk'], ['orders','broker']]
      },
      {
        title: 'Execution',
        desc: 'Execution updates positions and order status.',
        active: ['execution','positions','status'],
        edges: [['broker','execution'], ['execution','positions'], ['execution','status']]
      },
      {
        title: 'Settlement and ledger',
        desc: 'Settlement reconciles cash/holdings; ledger updated.',
        active: ['settlement','ledger','reports'],
        edges: [['positions','settlement'], ['settlement','ledger'], ['ledger','reports']]
      },
      {
        title: 'Support and compliance',
        desc: 'Compliance checks and support workflows handle issues.',
        active: ['compliance','support','audit'],
        edges: [['ledger','compliance'], ['compliance','audit'], ['support','client']]
      }
    ]
  },

  paytm: {
    title: 'Paytm',
    steps: [
      {
        title: 'Authenticate',
        desc: 'User signs in; device binding and risk checks run.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Create payment intent',
        desc: 'Payment intent created; routed to wallet/UPI/card/bank rails.',
        active: ['payments','routing','upi'],
        edges: [['client','payments'], ['payments','routing'], ['routing','upi']]
      },
      {
        title: 'Authorize and update ledger',
        desc: 'Authorization completes; ledger updates balances and status.',
        active: ['bank','status','ledger'],
        edges: [['upi','bank'], ['bank','status'], ['status','ledger']]
      },
      {
        title: 'Merchant callbacks',
        desc: 'Webhooks/callbacks notify merchants and generate receipts.',
        active: ['webhooks','merchant','notify'],
        edges: [['status','webhooks'], ['webhooks','merchant'], ['status','notify']]
      },
      {
        title: 'Recharge/bills',
        desc: 'Bill pay flows integrate with billers and update ledger.',
        active: ['billpay','billers','ledger'],
        edges: [['client','billpay'], ['billpay','billers'], ['billpay','ledger']]
      },
      {
        title: 'Insights',
        desc: 'Analytics aggregates transactions and user insights.',
        active: ['analytics','warehouse','reports'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['warehouse','reports']]
      }
    ]
  },

  gpay: {
    title: 'GPay',
    steps: [
      {
        title: 'Authenticate',
        desc: 'User authenticates and device binding/risk checks run.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Create UPI payment',
        desc: 'UPI payment intent created and routed to UPI rails.',
        active: ['payments','routing','upi'],
        edges: [['client','payments'], ['payments','routing'], ['routing','upi']]
      },
      {
        title: 'Bank authorization',
        desc: 'Bank authorizes and returns status; ledger updated.',
        active: ['bank','status','ledger'],
        edges: [['upi','bank'], ['bank','status'], ['status','ledger']]
      },
      {
        title: 'Rewards and offers',
        desc: 'Rewards computed and offers personalized.',
        active: ['rewards','offers','rank'],
        edges: [['status','rewards'], ['rewards','offers'], ['offers','rank']]
      },
      {
        title: 'Notifications',
        desc: 'Payment confirmations and reminders delivered via push.',
        active: ['notify','push','client'],
        edges: [['status','notify'], ['notify','push'], ['push','client']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics aggregates payments, retention, and funnel metrics.',
        active: ['analytics','warehouse','reports'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['warehouse','reports']]
      }
    ]
  },

  aadhaar: {
    title: 'Aadhaar',
    steps: [
      {
        title: 'Enrollment capture',
        desc: 'Biometrics and demographics captured and packaged securely.',
        active: ['enrollment','biometrics','client'],
        edges: [['enrollment','biometrics'], ['biometrics','client']]
      },
      {
        title: 'Validation and dedupe',
        desc: 'Validation checks data quality; dedupe matches against registry.',
        active: ['validation','dedupe','registry'],
        edges: [['client','validation'], ['validation','dedupe'], ['dedupe','registry']]
      },
      {
        title: 'Issue Aadhaar',
        desc: 'UID issued; credentials generated and stored.',
        active: ['issuer','registry','credentials'],
        edges: [['dedupe','issuer'], ['issuer','registry'], ['issuer','credentials']]
      },
      {
        title: 'Authentication request',
        desc: 'Auth request validated; matching run against biometrics/OTP.',
        active: ['auth','matching','otp'],
        edges: [['client','auth'], ['auth','otp'], ['auth','matching']]
      },
      {
        title: 'Response and logging',
        desc: 'Auth response returned; audit logs persisted.',
        active: ['response','audit','store'],
        edges: [['matching','response'], ['response','audit'], ['audit','store']]
      },
      {
        title: 'eKYC',
        desc: 'eKYC returns verified attributes to relying party.',
        active: ['ekyc','authz','client'],
        edges: [['auth','ekyc'], ['ekyc','authz'], ['authz','client']]
      }
    ]
  },

  digilocker: {
    title: 'DigiLocker',
    steps: [
      {
        title: 'Sign in',
        desc: 'User signs in and links identity (Aadhaar/phone).',
        active: ['client','auth','linking'],
        edges: [['client','auth'], ['auth','linking']]
      },
      {
        title: 'Fetch issuer documents',
        desc: 'Requests documents from issuer APIs and caches metadata.',
        active: ['issuers','api','cache'],
        edges: [['client','api'], ['api','issuers'], ['api','cache']]
      },
      {
        title: 'Store vault',
        desc: 'Documents stored in vault with encryption and metadata.',
        active: ['vault','storage','metadata'],
        edges: [['issuers','vault'], ['vault','storage'], ['vault','metadata']]
      },
      {
        title: 'Share document',
        desc: 'Share link/consent created; authz enforced and audited.',
        active: ['sharing','authz','audit'],
        edges: [['client','sharing'], ['sharing','authz'], ['authz','audit']]
      },
      {
        title: 'Verify document',
        desc: 'Verification checks issuer signatures and validity.',
        active: ['verify','signatures','issuers'],
        edges: [['vault','verify'], ['verify','signatures'], ['signatures','issuers']]
      },
      {
        title: 'Notifications',
        desc: 'Notifications for shares and fetch status delivered via push.',
        active: ['notify','push','client'],
        edges: [['sharing','notify'], ['notify','push'], ['push','client']]
      }
    ]
  }

  klarna: {
    title: 'Klarna',
    steps: [
      {
        title: 'Select Klarna at checkout',
        desc: 'Customer selects Klarna; merchant creates a Klarna session with cart + identity signals.',
        active: ['client','checkout','merchant','api'],
        edges: [['client','checkout'], ['checkout','merchant'], ['merchant','api']]
      },
      {
        title: 'Risk + credit decisioning',
        desc: 'Identity verification, fraud screening, and credit eligibility checks are executed.',
        active: ['risk','auth','decision','identity'],
        edges: [['api','risk'], ['risk','identity'], ['risk','auth'], ['risk','decision']]
      },
      {
        title: 'Authorize BNPL plan',
        desc: 'Klarna authorizes the pay-later plan; authorization returned for order placement.',
        active: ['orders','authz','merchant','ledger'],
        edges: [['decision','orders'], ['orders','authz'], ['authz','merchant'], ['orders','ledger']]
      },
      {
        title: 'Fulfillment confirmation + capture',
        desc: 'Merchant confirms shipment; capture triggers settlement and ledger updates.',
        active: ['capture','ledger','settlement','merchant'],
        edges: [['merchant','capture'], ['capture','ledger'], ['ledger','settlement']]
      },
      {
        title: 'Installment billing + collections',
        desc: 'Billing schedules installments; collections handles failed payments and reminders.',
        active: ['billing','payments','collections','notify'],
        edges: [['settlement','billing'], ['billing','payments'], ['billing','collections'], ['billing','notify']]
      },
      {
        title: 'Returns, refunds, disputes',
        desc: 'Refunds adjust installment schedule; disputes/returns are handled with merchant coordination.',
        active: ['refunds','disputes','merchant','ledger','billing'],
        edges: [['client','disputes'], ['disputes','refunds'], ['refunds','ledger'], ['refunds','billing'], ['refunds','merchant']]
      }
    ]
  },

  daraz: {
    title: 'Daraz',
    steps: [
      {
        title: 'Browse + search (marketplace)',
        desc: 'Search and discovery blend relevance, price, and inventory with caching.',
        active: ['client','search','catalog','rank'],
        edges: [['client','search'], ['search','rank'], ['rank','catalog']]
      },
      {
        title: 'Cart: pricing + promos',
        desc: 'Cart totals calculated with promos, taxes, and delivery fees.',
        active: ['cart','pricing','promos','tax','shipping'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos'], ['cart','tax'], ['cart','shipping']]
      },
      {
        title: 'Checkout: payments + risk',
        desc: 'Payment intent created; fraud/risk checks gate and retries handle failures.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','risk'], ['checkout','payments']]
      },
      {
        title: 'Order + inventory reservation',
        desc: 'Order is created; inventory reserved and confirmation sent to customer and seller.',
        active: ['orders','inventory','notify','seller'],
        edges: [['payments','orders'], ['orders','inventory'], ['orders','notify'], ['orders','seller']]
      },
      {
        title: 'Fulfillment (3PL/seller) + tracking',
        desc: 'Fulfillment processes shipment; logistics updates tracking timeline.',
        active: ['fulfillment','carrier','tracking','notify'],
        edges: [['orders','fulfillment'], ['fulfillment','carrier'], ['carrier','tracking'], ['tracking','notify']]
      },
      {
        title: 'Returns, disputes, refunds',
        desc: 'Returns/disputes go through policy and inspections; refunds adjust ledger and payment status.',
        active: ['returns','refunds','ledger','support','risk'],
        edges: [['client','returns'], ['returns','support'], ['returns','refunds'], ['refunds','ledger'], ['returns','risk']]
      }
    ]
  },

  shopee: {
    title: 'Shopee',
    steps: [
      {
        title: 'Home feed + deals personalization',
        desc: 'Home feed ranks deals using personalization, price, and engagement signals.',
        active: ['client','feed','rank','catalog'],
        edges: [['client','feed'], ['feed','rank'], ['rank','catalog']]
      },
      {
        title: 'Search + index',
        desc: 'Search queries hit index; ranking applies relevance and conversion models.',
        active: ['client','search','index','rank'],
        edges: [['client','search'], ['search','index'], ['search','rank']]
      },
      {
        title: 'Cart + checkout (pricing, promos, risk)',
        desc: 'Cart priced with promos; checkout runs risk checks and authorizes payment.',
        active: ['cart','pricing','payments','risk'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','payments'], ['payments','risk']]
      },
      {
        title: 'Order + escrow',
        desc: 'Order created; escrow holds funds until delivery/acceptance.',
        active: ['orders','escrow','ledger','seller'],
        edges: [['payments','orders'], ['orders','escrow'], ['escrow','ledger'], ['orders','seller']]
      },
      {
        title: 'Logistics + last-mile tracking',
        desc: 'Logistics assigns carrier; tracking updates are published and user notified.',
        active: ['logistics','carrier','tracking','notify'],
        edges: [['orders','logistics'], ['logistics','carrier'], ['carrier','tracking'], ['tracking','notify']]
      },
      {
        title: 'Disputes, returns, refunds',
        desc: 'Disputes and refunds adjust escrow/ledger and notify buyer/seller.',
        active: ['returns','refunds','notify','escrow','support'],
        edges: [['client','returns'], ['returns','support'], ['returns','refunds'], ['refunds','escrow'], ['refunds','notify']]
      }
    ]
  },

  lazada: {
    title: 'Lazada',
    steps: [
      {
        title: 'Browse catalog',
        desc: 'Client loads catalog and recommendations with caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Add to cart',
        desc: 'Cart service persists items and calculates totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Payment',
        desc: 'Payment intent created; risk checks applied.',
        active: ['payments','risk','ledger'],
        edges: [['client','payments'], ['payments','risk'], ['payments','ledger']]
      },
      {
        title: 'Order creation',
        desc: 'Order created; inventory reserved; confirmation sent.',
        active: ['orders','inventory','notify'],
        edges: [['payments','orders'], ['orders','inventory'], ['orders','notify']]
      },
      {
        title: 'Fulfillment',
        desc: 'Warehouse/3PL ships; tracking updates delivered.',
        active: ['fulfillment','carrier','tracking'],
        edges: [['orders','fulfillment'], ['fulfillment','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Customer support',
        desc: 'Support handles issues; refunds/returns processed.',
        active: ['support','returns','refunds'],
        edges: [['client','support'], ['support','returns'], ['returns','refunds']]
      }
    ]
  },

  nykaa: {
    title: 'Nykaa',
    steps: [
      {
        title: 'Discover and search',
        desc: 'Client browses catalog; search uses index and ranking.',
        active: ['client','search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'Add to cart',
        desc: 'Cart persists items; pricing and promos applied.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payment intent created; risk checks and payment rails invoked.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Order and inventory',
        desc: 'Order created; inventory reserved; fulfillment queued.',
        active: ['orders','inventory','fulfillment'],
        edges: [['payments','orders'], ['orders','inventory'], ['orders','fulfillment']]
      },
      {
        title: 'Shipping and tracking',
        desc: 'Carrier ships; tracking updates delivered to client.',
        active: ['carrier','tracking','notify'],
        edges: [['fulfillment','carrier'], ['carrier','tracking'], ['tracking','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns processed; refunds posted and notified.',
        active: ['returns','refunds','notify'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','notify']]
      }
    ]
  },

  'booking-com': {
    title: 'Booking.com',
    steps: [
      {
        title: 'Search stays',
        desc: 'Client searches inventory; ranking and pricing return results.',
        active: ['client','search','inventory'],
        edges: [['client','search'], ['search','inventory']]
      },
      {
        title: 'View property',
        desc: 'Property details, availability, and reviews are loaded with caching.',
        active: ['details','availability','cache'],
        edges: [['search','details'], ['details','availability'], ['details','cache']]
      },
      {
        title: 'Reserve',
        desc: 'Reservation hold created; pricing confirmed.',
        active: ['booking','pricing','hold'],
        edges: [['client','booking'], ['booking','pricing'], ['pricing','hold']]
      },
      {
        title: 'Payment',
        desc: 'Payment processed; fraud checks and confirmation.',
        active: ['payments','risk','ledger'],
        edges: [['booking','payments'], ['payments','risk'], ['payments','ledger']]
      },
      {
        title: 'Confirm with property',
        desc: 'Booking is confirmed with property system/channel manager.',
        active: ['partner','confirm','notify'],
        edges: [['ledger','confirm'], ['confirm','partner'], ['confirm','notify']]
      },
      {
        title: 'Post-booking changes',
        desc: 'Cancellations/changes update inventory and trigger refunds.',
        active: ['changes','refunds','inventory'],
        edges: [['client','changes'], ['changes','inventory'], ['changes','refunds']]
      }
    ]
  },

  'disney-plus': {
    title: 'Disney+',
    steps: [
      {
        title: 'Open app and authenticate',
        desc: 'Client authenticates and fetches entitlements and profile.',
        active: ['client','auth','entitlements'],
        edges: [['client','auth'], ['auth','entitlements']]
      },
      {
        title: 'Load home',
        desc: 'Home API returns personalized rows using recos and caching.',
        active: ['home','recos','cache'],
        edges: [['client','home'], ['home','recos'], ['home','cache']]
      },
      {
        title: 'Select title',
        desc: 'Catalog returns metadata and playback eligibility.',
        active: ['catalog','drm','player'],
        edges: [['home','catalog'], ['catalog','drm'], ['catalog','player']]
      },
      {
        title: 'Start playback',
        desc: 'Playback session created; CDN serves video segments.',
        active: ['playback','cdn','player'],
        edges: [['player','playback'], ['playback','cdn']]
      },
      {
        title: 'Ads (if applicable)',
        desc: 'Ad decisioning inserts ads and measures impressions.',
        active: ['ads','auction','analytics'],
        edges: [['playback','ads'], ['ads','auction'], ['auction','analytics']]
      },
      {
        title: 'Quality telemetry',
        desc: 'QoE metrics and events stream to analytics.',
        active: ['metrics','analytics','warehouse'],
        edges: [['player','metrics'], ['metrics','analytics'], ['analytics','warehouse']]
      }
    ]
  },

  soundcloud: {
    title: 'SoundCloud',
    steps: [
      {
        title: 'Load home feed',
        desc: 'Client loads home feed using recommendations and caching.',
        active: ['client','home','recos'],
        edges: [['client','home'], ['home','recos']]
      },
      {
        title: 'Search tracks',
        desc: 'Search queries index and returns ranked results.',
        active: ['search','index','rank'],
        edges: [['client','search'], ['search','index'], ['search','rank']]
      },
      {
        title: 'Start playback',
        desc: 'Playback session created; CDN serves audio segments.',
        active: ['playback','cdn','player'],
        edges: [['client','player'], ['player','playback'], ['playback','cdn']]
      },
      {
        title: 'Upload track',
        desc: 'Upload pipeline stores audio; transcode and catalog updates run.',
        active: ['upload','transcode','catalog'],
        edges: [['client','upload'], ['upload','transcode'], ['transcode','catalog']]
      },
      {
        title: 'Monetization',
        desc: 'Ads/subscriptions enforce entitlements and payouts.',
        active: ['ads','entitlements','ledger'],
        edges: [['playback','ads'], ['ads','entitlements'], ['entitlements','ledger']]
      },
      {
        title: 'Analytics',
        desc: 'Plays and engagement events stream to analytics.',
        active: ['events','analytics','warehouse'],
        edges: [['playback','events'], ['events','analytics'], ['analytics','warehouse']]
      }
    ]
  },

  jiocinema: {
    title: 'JioCinema',
    steps: [
      {
        title: 'Authenticate',
        desc: 'Client authenticates and loads subscription entitlements.',
        active: ['client','auth','entitlements'],
        edges: [['client','auth'], ['auth','entitlements']]
      },
      {
        title: 'Load home',
        desc: 'Home API returns personalized recommendations with caching.',
        active: ['home','recos','cache'],
        edges: [['client','home'], ['home','recos'], ['home','cache']]
      },
      {
        title: 'Select content',
        desc: 'Catalog returns metadata and playback eligibility.',
        active: ['catalog','drm','player'],
        edges: [['home','catalog'], ['catalog','drm'], ['catalog','player']]
      },
      {
        title: 'Playback',
        desc: 'Playback session created; CDN serves video segments.',
        active: ['playback','cdn','player'],
        edges: [['player','playback'], ['playback','cdn']]
      },
      {
        title: 'Live events',
        desc: 'Live streaming uses ingest, transcode and edge distribution.',
        active: ['ingest','transcode','cdn'],
        edges: [['ingest','transcode'], ['transcode','cdn']]
      },
      {
        title: 'QoE analytics',
        desc: 'QoE metrics and events stream to analytics warehouse.',
        active: ['metrics','analytics','warehouse'],
        edges: [['player','metrics'], ['metrics','analytics'], ['analytics','warehouse']]
      }
    ]
  },

  hotstar: {
    title: 'Hotstar',
    steps: [
      {
        title: 'Authenticate',
        desc: 'Client authenticates and loads entitlements and profile.',
        active: ['client','auth','entitlements'],
        edges: [['client','auth'], ['auth','entitlements']]
      },
      {
        title: 'Load home',
        desc: 'Home API returns personalized rows using recos and caching.',
        active: ['home','recos','cache'],
        edges: [['client','home'], ['home','recos'], ['home','cache']]
      },
      {
        title: 'Select title',
        desc: 'Catalog returns metadata and playback eligibility.',
        active: ['catalog','drm','player'],
        edges: [['home','catalog'], ['catalog','drm'], ['catalog','player']]
      },
      {
        title: 'Playback',
        desc: 'Playback session created; CDN serves segments.',
        active: ['playback','cdn','player'],
        edges: [['player','playback'], ['playback','cdn']]
      },
      {
        title: 'Ads',
        desc: 'Ad decisioning inserts ads and measures impressions.',
        active: ['ads','auction','analytics'],
        edges: [['playback','ads'], ['ads','auction'], ['auction','analytics']]
      },
      {
        title: 'QoE analytics',
        desc: 'QoE metrics stream to analytics warehouse.',
        active: ['metrics','analytics','warehouse'],
        edges: [['player','metrics'], ['metrics','analytics'], ['analytics','warehouse']]
      }
    ]
  }

  headspace: {
    title: 'Headspace',
    steps: [
      {
        title: 'Open app and personalize',
        desc: 'Client authenticates and loads preferences and today’s plan.',
        active: ['client','auth','profile','recos'],
        edges: [['client','auth'], ['auth','profile'], ['profile','recos']]
      },
      {
        title: 'Browse content',
        desc: 'Catalog and search return sessions with caching.',
        active: ['catalog','search','cache'],
        edges: [['client','catalog'], ['client','search'], ['catalog','cache']]
      },
      {
        title: 'Start session',
        desc: 'Playback service streams audio; progress is tracked.',
        active: ['playback','cdn','progress'],
        edges: [['client','playback'], ['playback','cdn'], ['playback','progress']]
      },
      {
        title: 'Complete and update streak',
        desc: 'Completion writes update streaks and goals.',
        active: ['completion','write','profile'],
        edges: [['progress','completion'], ['completion','write'], ['write','profile']]
      },
      {
        title: 'Recommendations loop',
        desc: 'Engagement events feed personalization.',
        active: ['events','rank','recos'],
        edges: [['completion','events'], ['events','rank'], ['rank','recos']]
      },
      {
        title: 'Reminders',
        desc: 'Reminder scheduler triggers push notifications.',
        active: ['scheduler','notify','push'],
        edges: [['profile','scheduler'], ['scheduler','notify'], ['notify','push']]
      }
    ]
  },

  calm: {
    title: 'Calm',
    steps: [
      {
        title: 'Authenticate and load home',
        desc: 'Client authenticates and loads home feed and preferences.',
        active: ['client','auth','home'],
        edges: [['client','auth'], ['auth','home']]
      },
      {
        title: 'Discover content',
        desc: 'Catalog and recommendations surface meditations and sleep stories.',
        active: ['catalog','recos','rank'],
        edges: [['home','catalog'], ['home','recos'], ['recos','rank']]
      },
      {
        title: 'Start playback',
        desc: 'Playback streams audio via CDN; progress tracked.',
        active: ['playback','cdn','progress'],
        edges: [['client','playback'], ['playback','cdn'], ['playback','progress']]
      },
      {
        title: 'Completion tracking',
        desc: 'Completion writes update streaks and goals.',
        active: ['completion','write','profile'],
        edges: [['progress','completion'], ['completion','write'], ['write','profile']]
      },
      {
        title: 'Subscription entitlements',
        desc: 'Premium content gated by entitlements and billing.',
        active: ['paywall','entitlements','payments'],
        edges: [['catalog','paywall'], ['paywall','entitlements'], ['entitlements','payments']]
      },
      {
        title: 'Reminders',
        desc: 'Reminder scheduler triggers push notifications.',
        active: ['scheduler','notify','push'],
        edges: [['profile','scheduler'], ['scheduler','notify'], ['notify','push']]
      }
    ]
  },

  'nike-training-club': {
    title: 'Nike Training Club',
    steps: [
      {
        title: 'Load training plan',
        desc: 'Client loads plan, workouts, and user profile state.',
        active: ['client','auth','plans'],
        edges: [['client','auth'], ['auth','plans']]
      },
      {
        title: 'Browse workouts',
        desc: 'Catalog and recommendations surface workouts.',
        active: ['catalog','recos','rank'],
        edges: [['plans','catalog'], ['catalog','recos'], ['recos','rank']]
      },
      {
        title: 'Start workout',
        desc: 'Media streams instructions; telemetry tracks session progress.',
        active: ['player','cdn','telemetry'],
        edges: [['client','player'], ['player','cdn'], ['player','telemetry']]
      },
      {
        title: 'Log completion',
        desc: 'Completion updates user stats and streaks.',
        active: ['completion','write','profile'],
        edges: [['telemetry','completion'], ['completion','write'], ['write','profile']]
      },
      {
        title: 'Personalization',
        desc: 'Events feed recommendations and plan adjustments.',
        active: ['events','rank','recos'],
        edges: [['completion','events'], ['events','rank'], ['rank','recos']]
      },
      {
        title: 'Notifications',
        desc: 'Reminders and achievements trigger notifications.',
        active: ['notify','push','client'],
        edges: [['profile','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  myfitnesspal: {
    title: 'MyFitnessPal',
    steps: [
      {
        title: 'Load dashboard',
        desc: 'Client loads goals, diary, and recent logs.',
        active: ['client','auth','dashboard'],
        edges: [['client','auth'], ['auth','dashboard']]
      },
      {
        title: 'Search food',
        desc: 'Search queries index and returns food items.',
        active: ['search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Log meal',
        desc: 'Meal log writes persist and update nutrition totals.',
        active: ['logging','write','totals'],
        edges: [['client','logging'], ['logging','write'], ['write','totals']]
      },
      {
        title: 'Sync devices',
        desc: 'Integrations sync steps/workouts and update totals.',
        active: ['integrations','sync','totals'],
        edges: [['integrations','sync'], ['sync','totals']]
      },
      {
        title: 'Insights',
        desc: 'Analytics computes trends and insights for the user.',
        active: ['analytics','warehouse','insights'],
        edges: [['write','analytics'], ['analytics','warehouse'], ['warehouse','insights']]
      },
      {
        title: 'Notifications',
        desc: 'Reminders and goal alerts delivered via push.',
        active: ['notify','push','client'],
        edges: [['dashboard','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  cultfit: {
    title: 'Cult.fit',
    steps: [
      {
        title: 'Load classes',
        desc: 'Client loads class schedule and nearby centers.',
        active: ['client','auth','catalog'],
        edges: [['client','auth'], ['auth','catalog']]
      },
      {
        title: 'Select slot',
        desc: 'Availability check and hold slot for booking.',
        active: ['availability','hold','booking'],
        edges: [['catalog','availability'], ['availability','hold'], ['hold','booking']]
      },
      {
        title: 'Payment',
        desc: 'Payment processed; membership entitlements validated.',
        active: ['payments','entitlements','ledger'],
        edges: [['booking','payments'], ['payments','entitlements'], ['payments','ledger']]
      },
      {
        title: 'Confirm booking',
        desc: 'Booking confirmed and notifications sent.',
        active: ['booking','notify','push'],
        edges: [['ledger','booking'], ['booking','notify'], ['notify','push']]
      },
      {
        title: 'Attendance',
        desc: 'Check-in updates attendance and user stats.',
        active: ['checkin','write','profile'],
        edges: [['client','checkin'], ['checkin','write'], ['write','profile']]
      },
      {
        title: 'Insights',
        desc: 'Analytics computes streaks and class insights.',
        active: ['analytics','warehouse','insights'],
        edges: [['write','analytics'], ['analytics','warehouse'], ['warehouse','insights']]
      }
    ]
  },

  fitbit: {
    title: 'Fitbit',
    steps: [
      {
        title: 'Device sync',
        desc: 'Device uploads activity data; sync pipeline ingests and stores.',
        active: ['device','sync','ingest'],
        edges: [['device','sync'], ['sync','ingest']]
      },
      {
        title: 'Store timeseries',
        desc: 'Timeseries stored and aggregated for dashboards.',
        active: ['timeseries','store','aggregate'],
        edges: [['ingest','timeseries'], ['timeseries','store'], ['timeseries','aggregate']]
      },
      {
        title: 'Compute metrics',
        desc: 'Metrics compute steps, sleep, heart rate summaries.',
        active: ['metrics','aggregate','profile'],
        edges: [['aggregate','metrics'], ['metrics','profile']]
      },
      {
        title: 'Dashboard',
        desc: 'Client loads dashboard using cache and APIs.',
        active: ['client','dashboard','cache'],
        edges: [['client','dashboard'], ['dashboard','cache']]
      },
      {
        title: 'Insights',
        desc: 'Analytics generates insights and recommendations.',
        active: ['analytics','recos','warehouse'],
        edges: [['metrics','analytics'], ['analytics','warehouse'], ['analytics','recos']]
      },
      {
        title: 'Notifications',
        desc: 'Goals and reminders trigger notifications and push.',
        active: ['notify','push','client'],
        edges: [['profile','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  strava: {
    title: 'Strava',
    steps: [
      {
        title: 'Upload activity',
        desc: 'Client uploads activity; ingest pipeline parses and stores.',
        active: ['client','upload','ingest'],
        edges: [['client','upload'], ['upload','ingest']]
      },
      {
        title: 'Process and compute',
        desc: 'Processing computes pace, segments, and stats.',
        active: ['processing','segments','metrics'],
        edges: [['ingest','processing'], ['processing','segments'], ['processing','metrics']]
      },
      {
        title: 'Store and index',
        desc: 'Activity stored and indexed for search and feeds.',
        active: ['store','index','search'],
        edges: [['processing','store'], ['store','index'], ['index','search']]
      },
      {
        title: 'Social feed',
        desc: 'Feed service ranks and serves friends activities.',
        active: ['feed','rank','cache'],
        edges: [['store','feed'], ['feed','rank'], ['feed','cache']]
      },
      {
        title: 'Kudos and comments',
        desc: 'Interactions persist and trigger notifications.',
        active: ['interactions','notify','push'],
        edges: [['client','interactions'], ['interactions','notify'], ['notify','push']]
      },
      {
        title: 'Challenges',
        desc: 'Challenges compute progress and leaderboards.',
        active: ['challenges','leaderboards','analytics'],
        edges: [['metrics','challenges'], ['challenges','leaderboards'], ['leaderboards','analytics']]
      }
    ]
  },

  healthifyme: {
    title: 'HealthifyMe',
    steps: [
      {
        title: 'Load plan',
        desc: 'Client loads goals, diet plan, and coach messages.',
        active: ['client','auth','plans'],
        edges: [['client','auth'], ['auth','plans']]
      },
      {
        title: 'Log meal',
        desc: 'Meal logging writes persist and update nutrition totals.',
        active: ['logging','write','totals'],
        edges: [['client','logging'], ['logging','write'], ['write','totals']]
      },
      {
        title: 'Workout tracking',
        desc: 'Workout events sync and update totals.',
        active: ['workouts','sync','totals'],
        edges: [['client','workouts'], ['workouts','sync'], ['sync','totals']]
      },
      {
        title: 'Coach interactions',
        desc: 'Chat/messages persist and notify coach and user.',
        active: ['chat','realtime','notify'],
        edges: [['client','chat'], ['chat','realtime'], ['chat','notify']]
      },
      {
        title: 'Insights',
        desc: 'Analytics computes trends and personalized recommendations.',
        active: ['analytics','recos','warehouse'],
        edges: [['write','analytics'], ['analytics','warehouse'], ['analytics','recos']]
      },
      {
        title: 'Reminders',
        desc: 'Reminders trigger notifications and push.',
        active: ['notify','push','client'],
        edges: [['plans','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  deliveroo: {
    title: 'Deliveroo',
    steps: [
      {
        title: 'Browse restaurants',
        desc: 'Client loads catalog and menus with caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Checkout',
        desc: 'Pricing, fees, promos applied; payment intent created.',
        active: ['cart','pricing','payments'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','payments']]
      },
      {
        title: 'Create order',
        desc: 'Order created and sent to restaurant; dispatch begins.',
        active: ['orders','restaurant','dispatch'],
        edges: [['payments','orders'], ['orders','restaurant'], ['orders','dispatch']]
      },
      {
        title: 'Courier assignment',
        desc: 'Dispatch assigns courier; realtime updates begin.',
        active: ['dispatch','courier','realtime'],
        edges: [['dispatch','courier'], ['courier','realtime']]
      },
      {
        title: 'Tracking and ETA',
        desc: 'Location stream updates ETA and client tracking.',
        active: ['location','eta','client'],
        edges: [['courier','location'], ['location','eta'], ['eta','client']]
      },
      {
        title: 'Support and refunds',
        desc: 'Issues handled; refunds posted to ledger.',
        active: ['support','refunds','ledger'],
        edges: [['orders','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  grubhub: {
    title: 'Grubhub',
    steps: [
      {
        title: 'Browse restaurants',
        desc: 'Client loads catalog and menus with caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Checkout',
        desc: 'Pricing and promos applied; payment intent created.',
        active: ['cart','pricing','payments'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','payments']]
      },
      {
        title: 'Create order',
        desc: 'Order created and sent to restaurant; dispatch begins.',
        active: ['orders','restaurant','dispatch'],
        edges: [['payments','orders'], ['orders','restaurant'], ['orders','dispatch']]
      },
      {
        title: 'Driver assignment',
        desc: 'Dispatch assigns courier; realtime updates begin.',
        active: ['dispatch','courier','realtime'],
        edges: [['dispatch','courier'], ['courier','realtime']]
      },
      {
        title: 'Tracking and ETA',
        desc: 'Location stream updates ETA and client tracking.',
        active: ['location','eta','client'],
        edges: [['courier','location'], ['location','eta'], ['eta','client']]
      },
      {
        title: 'Support and refunds',
        desc: 'Issues handled; refunds posted to ledger.',
        active: ['support','refunds','ledger'],
        edges: [['orders','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  dominos: {
    title: 'Domino’s',
    steps: [
      {
        title: 'Browse menu',
        desc: 'Client loads menu, offers, and store availability with caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Build order',
        desc: 'Cart and pricing compute totals, coupons, and delivery fees.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and pay',
        desc: 'Payment intent created; authorization completes; ledger updated.',
        active: ['payments','risk','ledger'],
        edges: [['cart','payments'], ['payments','risk'], ['payments','ledger']]
      },
      {
        title: 'Send to store',
        desc: 'Order routed to store POS/kitchen system; confirmation returned.',
        active: ['orders','pos','notify'],
        edges: [['ledger','orders'], ['orders','pos'], ['orders','notify']]
      },
      {
        title: 'Pizza tracker',
        desc: 'Status updates stream from store and delivery to client tracker.',
        active: ['tracking','realtime','client'],
        edges: [['pos','tracking'], ['tracking','realtime'], ['realtime','client']]
      },
      {
        title: 'Support and refunds',
        desc: 'Issues handled; refunds processed and ledger adjusted.',
        active: ['support','refunds','ledger'],
        edges: [['orders','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'mcdonalds-app': {
    title: 'McDonald’s App',
    steps: [
      {
        title: 'Browse menu and deals',
        desc: 'Client loads menu, deals, and store availability with caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Build cart',
        desc: 'Cart persists items; pricing and promos applied.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Order and payment',
        desc: 'Payment intent created; risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['cart','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Send to store',
        desc: 'Order sent to store POS/kitchen; prep status updated.',
        active: ['pos','kitchen','tracking'],
        edges: [['orders','pos'], ['pos','kitchen'], ['kitchen','tracking']]
      },
      {
        title: 'Pickup or delivery tracking',
        desc: 'Status updates stream to client; notifications sent.',
        active: ['tracking','notify','push'],
        edges: [['tracking','notify'], ['notify','push'], ['push','client']]
      },
      {
        title: 'Loyalty and offers',
        desc: 'Loyalty points update and offers personalized.',
        active: ['loyalty','ledger','rank'],
        edges: [['orders','loyalty'], ['loyalty','ledger'], ['loyalty','rank']]
      }
    ]
  },

  'google-pay': {
    title: 'Google Pay',
    steps: [
      {
        title: 'Authenticate',
        desc: 'User authenticates; device binding and risk checks run.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Create payment',
        desc: 'Payment intent created; routed to UPI rails.',
        active: ['payments','routing','upi'],
        edges: [['client','payments'], ['payments','routing'], ['routing','upi']]
      },
      {
        title: 'Authorization',
        desc: 'Bank authorizes; status returned; ledger updated.',
        active: ['bank','status','ledger'],
        edges: [['upi','bank'], ['bank','status'], ['status','ledger']]
      },
      {
        title: 'Merchant callback',
        desc: 'Callbacks/webhooks notify merchant and create receipts.',
        active: ['webhooks','merchant','notify'],
        edges: [['status','webhooks'], ['webhooks','merchant'], ['status','notify']]
      },
      {
        title: 'Rewards',
        desc: 'Rewards computed and offers personalized.',
        active: ['rewards','offers','rank'],
        edges: [['status','rewards'], ['rewards','offers'], ['offers','rank']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics aggregates payments and funnel metrics.',
        active: ['analytics','warehouse','reports'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['warehouse','reports']]
      }
    ]
  },

  bhim: {
    title: 'BHIM',
    steps: [
      {
        title: 'Authenticate and link bank',
        desc: 'User authenticates and links bank account; risk checks run.',
        active: ['client','auth','bank','risk'],
        edges: [['client','auth'], ['auth','bank'], ['auth','risk']]
      },
      {
        title: 'Create UPI payment',
        desc: 'Payment intent created and routed to UPI switch.',
        active: ['payments','routing','upi'],
        edges: [['client','payments'], ['payments','routing'], ['routing','upi']]
      },
      {
        title: 'Authorization',
        desc: 'Bank authorizes and returns status; ledger updated.',
        active: ['bank','status','ledger'],
        edges: [['upi','bank'], ['bank','status'], ['status','ledger']]
      },
      {
        title: 'Receipts and notifications',
        desc: 'Receipt generated; push notifications delivered.',
        active: ['receipts','notify','push'],
        edges: [['status','receipts'], ['receipts','notify'], ['notify','push']]
      },
      {
        title: 'Disputes and reversals',
        desc: 'Dispute filed; reversal/chargeback flows update ledger.',
        active: ['disputes','refunds','ledger'],
        edges: [['client','disputes'], ['disputes','refunds'], ['refunds','ledger']]
      },
      {
        title: 'Reports',
        desc: 'Analytics aggregates transactions and generates reports.',
        active: ['analytics','warehouse','reports'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['warehouse','reports']]
      }
    ]
  },

  'hdfc-bank-app': {
    title: 'HDFC Bank App',
    steps: [
      {
        title: 'Login',
        desc: 'Authenticate user; device binding and risk checks run.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Fetch accounts',
        desc: 'Core banking fetches balances and transactions; cache used.',
        active: ['accounts','core','cache'],
        edges: [['client','accounts'], ['accounts','core'], ['core','cache']]
      },
      {
        title: 'Transfer funds',
        desc: 'Payment created and routed to IMPS or NEFT rails.',
        active: ['payments','routing','imps'],
        edges: [['client','payments'], ['payments','routing'], ['routing','imps']]
      },
      {
        title: 'Execute in core banking',
        desc: 'Core banking executes debit/credit and updates ledger.',
        active: ['core','ledger','status'],
        edges: [['imps','core'], ['core','ledger'], ['core','status']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered via SMS, email, and push.',
        active: ['notify','sms','push'],
        edges: [['status','notify'], ['notify','sms'], ['notify','push']]
      },
      {
        title: 'Statements and reports',
        desc: 'Reporting compiles statements and exports.',
        active: ['reports','warehouse','exports'],
        edges: [['ledger','reports'], ['reports','warehouse'], ['reports','exports']]
      }
    ]
  },

  'icici-imobile': {
    title: 'ICICI iMobile',
    steps: [
      {
        title: 'Login',
        desc: 'Authenticate user; device binding and risk checks run.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Fetch accounts',
        desc: 'Core banking fetches balances and transactions; cache used.',
        active: ['accounts','core','cache'],
        edges: [['client','accounts'], ['accounts','core'], ['core','cache']]
      },
      {
        title: 'Transfer funds',
        desc: 'Payment created and routed to IMPS, NEFT, or RTGS rails.',
        active: ['payments','routing','imps'],
        edges: [['client','payments'], ['payments','routing'], ['routing','imps']]
      },
      {
        title: 'Execute in core banking',
        desc: 'Core banking executes debit/credit and updates ledger.',
        active: ['core','ledger','status'],
        edges: [['imps','core'], ['core','ledger'], ['core','status']]
      },
      {
        title: 'Beneficiary management',
        desc: 'Beneficiary add/edit uses approvals and risk controls.',
        active: ['beneficiaries','approvals','risk'],
        edges: [['client','beneficiaries'], ['beneficiaries','approvals'], ['approvals','risk']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered via push and SMS.',
        active: ['notify','push','sms'],
        edges: [['status','notify'], ['notify','push'], ['notify','sms']]
      }
    ]
  },

  'axis-mobile': {
    title: 'Axis Mobile',
    steps: [
      {
        title: 'Login',
        desc: 'Authenticate user; device binding and risk checks run.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Fetch accounts',
        desc: 'Core banking fetches balances and transactions; cache used.',
        active: ['accounts','core','cache'],
        edges: [['client','accounts'], ['accounts','core'], ['core','cache']]
      },
      {
        title: 'Pay bills',
        desc: 'Bill payment routed to biller network and confirmed.',
        active: ['billpay','routing','biller'],
        edges: [['client','billpay'], ['billpay','routing'], ['routing','biller']]
      },
      {
        title: 'Transfers',
        desc: 'Transfers routed to IMPS/NEFT and executed in core banking.',
        active: ['payments','routing','imps'],
        edges: [['client','payments'], ['payments','routing'], ['routing','imps']]
      },
      {
        title: 'Ledger and status',
        desc: 'Core banking updates ledger and returns status.',
        active: ['core','ledger','status'],
        edges: [['imps','core'], ['core','ledger'], ['core','status']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered via push, SMS, and email.',
        active: ['notify','push','sms'],
        edges: [['status','notify'], ['notify','push'], ['notify','sms']]
      }
    ]
  },

  'kotak-811': {
    title: 'Kotak 811',
    steps: [
      {
        title: 'Onboarding',
        desc: 'KYC onboarding verifies identity and creates account in core banking.',
        active: ['client','kyc','core'],
        edges: [['client','kyc'], ['kyc','core']]
      },
      {
        title: 'Login',
        desc: 'Authenticate user; device binding and risk checks run.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Fetch accounts',
        desc: 'Core banking fetches balances and transactions; cache used.',
        active: ['accounts','core','cache'],
        edges: [['client','accounts'], ['accounts','core'], ['core','cache']]
      },
      {
        title: 'Transfers',
        desc: 'Transfers routed to IMPS/NEFT and executed in core banking.',
        active: ['payments','routing','imps'],
        edges: [['client','payments'], ['payments','routing'], ['routing','imps']]
      },
      {
        title: 'Cards and controls',
        desc: 'Card management updates limits and controls with approvals.',
        active: ['cards','controls','approvals'],
        edges: [['client','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered via push and SMS.',
        active: ['notify','push','sms'],
        edges: [['payments','notify'], ['notify','push'], ['notify','sms']]
      }
    ]
  },

  gitlab: {
    title: 'GitLab',
    steps: [
      {
        title: 'Authenticate and load project',
        desc: 'Client authenticates; loads project metadata and permissions.',
        active: ['client','auth','projects'],
        edges: [['client','auth'], ['auth','projects']]
      },
      {
        title: 'Clone and push',
        desc: 'Git operations hit git-http/ssh; object storage and cache used.',
        active: ['git','storage','cache'],
        edges: [['client','git'], ['git','storage'], ['git','cache']]
      },
      {
        title: 'Create merge request',
        desc: 'Merge request created; hooks fire; CI pipeline created.',
        active: ['mrs','hooks','ci'],
        edges: [['client','mrs'], ['mrs','hooks'], ['hooks','ci']]
      },
      {
        title: 'CI pipeline',
        desc: 'Runner executes jobs; artifacts stored; statuses updated.',
        active: ['runner','artifacts','status'],
        edges: [['ci','runner'], ['runner','artifacts'], ['ci','status']]
      },
      {
        title: 'Review and approvals',
        desc: 'Code review comments and approvals persisted; notifications sent.',
        active: ['reviews','approvals','notify'],
        edges: [['mrs','reviews'], ['reviews','approvals'], ['approvals','notify']]
      },
      {
        title: 'Merge and deploy',
        desc: 'Merge updates repo; CD deploy triggers; metrics updated.',
        active: ['merge','deploy','metrics'],
        edges: [['approvals','merge'], ['merge','deploy'], ['deploy','metrics']]
      }
    ]
  },

  'stack-overflow': {
    title: 'Stack Overflow',
    steps: [
      {
        title: 'Search and browse',
        desc: 'Client searches; index and cache serve results.',
        active: ['client','search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'Open question',
        desc: 'Question fetched; related content and recommendations loaded.',
        active: ['questions','cache','recos'],
        edges: [['search','questions'], ['questions','cache'], ['questions','recos']]
      },
      {
        title: 'Post answer',
        desc: 'Answer write persists; moderation and spam checks run.',
        active: ['answers','write','moderation'],
        edges: [['client','answers'], ['answers','write'], ['write','moderation']]
      },
      {
        title: 'Voting and reputation',
        desc: 'Votes update reputation; leaderboards computed.',
        active: ['votes','rep','leaderboards'],
        edges: [['client','votes'], ['votes','rep'], ['rep','leaderboards']]
      },
      {
        title: 'Notifications',
        desc: 'Events trigger notifications and emails.',
        active: ['events','notify','email'],
        edges: [['write','events'], ['events','notify'], ['notify','email']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics aggregates engagement and content metrics.',
        active: ['analytics','warehouse','reports'],
        edges: [['events','analytics'], ['analytics','warehouse'], ['warehouse','reports']]
      }
    ]
  }

  postman: {
    title: 'Postman',
    steps: [
      {
        title: 'Sign in and load workspaces',
        desc: 'Client authenticates and loads workspace state.',
        active: ['client','auth','workspaces'],
        edges: [['client','auth'], ['auth','workspaces']]
      },
      {
        title: 'Create request',
        desc: 'Request builder persists drafts and environment variables.',
        active: ['builder','env','store'],
        edges: [['client','builder'], ['builder','env'], ['builder','store']]
      },
      {
        title: 'Send request',
        desc: 'Runtime sends request; proxy/cert handling; response returned.',
        active: ['runtime','network','client'],
        edges: [['builder','runtime'], ['runtime','network'], ['network','client']]
      },
      {
        title: 'Save to collection',
        desc: 'Collections persisted; sync updates collaborators.',
        active: ['collections','sync','realtime'],
        edges: [['builder','collections'], ['collections','sync'], ['sync','realtime']]
      },
      {
        title: 'Run tests',
        desc: 'Runner executes scripts; results stored; reports generated.',
        active: ['runner','results','reports'],
        edges: [['collections','runner'], ['runner','results'], ['results','reports']]
      },
      {
        title: 'Publish docs',
        desc: 'Docs generated and published; notifications sent.',
        active: ['docs','publish','notify'],
        edges: [['collections','docs'], ['docs','publish'], ['publish','notify']]
      }
    ]
  },

  vercel: {
    title: 'Vercel',
    steps: [
      {
        title: 'Connect repo',
        desc: 'Authenticate and connect Git provider; import project.',
        active: ['client','auth','git'],
        edges: [['client','auth'], ['auth','git']]
      },
      {
        title: 'Create deployment',
        desc: 'Build created from commit; build pipeline starts.',
        active: ['deployments','build','queue'],
        edges: [['git','deployments'], ['deployments','build'], ['build','queue']]
      },
      {
        title: 'Build and artifacts',
        desc: 'Build runs and stores artifacts in storage.',
        active: ['builder','artifacts','storage'],
        edges: [['queue','builder'], ['builder','artifacts'], ['artifacts','storage']]
      },
      {
        title: 'Edge rollout',
        desc: 'Deploy edge config and routes to CDN/edge network.',
        active: ['edge','cdn','routing'],
        edges: [['storage','edge'], ['edge','cdn'], ['edge','routing']]
      },
      {
        title: 'Observability',
        desc: 'Logs and metrics collected for the deployment.',
        active: ['logs','metrics','analytics'],
        edges: [['routing','logs'], ['routing','metrics'], ['metrics','analytics']]
      },
      {
        title: 'Rollback',
        desc: 'Rollback switches traffic to previous deployment.',
        active: ['routing','traffic','deployments'],
        edges: [['client','routing'], ['routing','traffic'], ['traffic','deployments']]
      }
    ]
  },

  netlify: {
    title: 'Netlify',
    steps: [
      {
        title: 'Connect repo',
        desc: 'Authenticate and connect Git provider; import site.',
        active: ['client','auth','git'],
        edges: [['client','auth'], ['auth','git']]
      },
      {
        title: 'Trigger build',
        desc: 'Build triggered by webhook; build pipeline starts.',
        active: ['webhooks','build','queue'],
        edges: [['git','webhooks'], ['webhooks','build'], ['build','queue']]
      },
      {
        title: 'Build and publish',
        desc: 'Build runs and publishes assets to CDN/storage.',
        active: ['builder','artifacts','cdn'],
        edges: [['queue','builder'], ['builder','artifacts'], ['artifacts','cdn']]
      },
      {
        title: 'Functions',
        desc: 'Serverless functions deployed and routed at edge.',
        active: ['functions','routing','edge'],
        edges: [['builder','functions'], ['functions','routing'], ['routing','edge']]
      },
      {
        title: 'Forms and identity',
        desc: 'Forms submissions and identity auth handled via services.',
        active: ['forms','identity','store'],
        edges: [['client','forms'], ['forms','store'], ['client','identity']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics aggregates site traffic and performance.',
        active: ['analytics','warehouse','reports'],
        edges: [['edge','analytics'], ['analytics','warehouse'], ['warehouse','reports']]
      }
    ]
  },

  'firebase-console': {
    title: 'Firebase Console',
    steps: [
      {
        title: 'Sign in',
        desc: 'Admin authenticates and loads project list.',
        active: ['client','auth','projects'],
        edges: [['client','auth'], ['auth','projects']]
      },
      {
        title: 'Configure services',
        desc: 'Changes apply to service configs; stored and validated.',
        active: ['config','store','validate'],
        edges: [['client','config'], ['config','store'], ['store','validate']]
      },
      {
        title: 'Deploy rules',
        desc: 'Rules deployed and rolled out to runtime.',
        active: ['rules','deploy','routing'],
        edges: [['config','rules'], ['rules','deploy'], ['deploy','routing']]
      },
      {
        title: 'Monitor usage',
        desc: 'Metrics and logs displayed; analytics aggregated.',
        active: ['metrics','logs','analytics'],
        edges: [['routing','metrics'], ['routing','logs'], ['metrics','analytics']]
      },
      {
        title: 'Crash & performance',
        desc: 'Crash reports and performance traces ingested.',
        active: ['crash','traces','warehouse'],
        edges: [['client','crash'], ['crash','traces'], ['traces','warehouse']]
      },
      {
        title: 'Alerts',
        desc: 'Alerts configured and notifications delivered.',
        active: ['alerts','notify','email'],
        edges: [['analytics','alerts'], ['alerts','notify'], ['notify','email']]
      }
    ]
  },

  'aws-console': {
    title: 'AWS Console',
    steps: [
      {
        title: 'Sign in',
        desc: 'Admin authenticates (IAM/SAML) and loads account context.',
        active: ['client','auth','iam'],
        edges: [['client','auth'], ['auth','iam']]
      },
      {
        title: 'Browse services',
        desc: 'Console loads service catalog and account resources.',
        active: ['catalog','resources','cache'],
        edges: [['client','catalog'], ['catalog','cache'], ['catalog','resources']]
      },
      {
        title: 'Apply config change',
        desc: 'API call sent; change validated and executed in control plane.',
        active: ['api','validate','controlplane'],
        edges: [['client','api'], ['api','validate'], ['validate','controlplane']]
      },
      {
        title: 'Provision resources',
        desc: 'Provisioning creates resources and updates state.',
        active: ['provision','state','events'],
        edges: [['controlplane','provision'], ['provision','state'], ['provision','events']]
      },
      {
        title: 'Audit and logging',
        desc: 'Audit logs stored; metrics aggregated.',
        active: ['audit','logs','metrics'],
        edges: [['events','audit'], ['audit','logs'], ['logs','metrics']]
      },
      {
        title: 'Alerts',
        desc: 'Alerts configured and notifications delivered.',
        active: ['alerts','notify','email'],
        edges: [['metrics','alerts'], ['alerts','notify'], ['notify','email']]
      }
    ]
  },

  affirm: {
    title: 'Affirm',
    steps: [
      {
        title: 'Choose pay-over-time',
        desc: 'Client selects Affirm at checkout; session created.',
        active: ['client','merchant','checkout'],
        edges: [['merchant','checkout'], ['client','checkout']]
      },
      {
        title: 'Underwriting',
        desc: 'Risk and underwriting evaluate user and cart.',
        active: ['risk','underwriting','decision'],
        edges: [['checkout','risk'], ['risk','underwriting'], ['underwriting','decision']]
      },
      {
        title: 'Create loan',
        desc: 'Loan created; auth holds; order confirmed to merchant.',
        active: ['loan','authz','orders'],
        edges: [['decision','loan'], ['loan','authz'], ['authz','orders']]
      },
      {
        title: 'Capture and settle',
        desc: 'Capture funds and settle to merchant; ledger updated.',
        active: ['capture','settlement','ledger'],
        edges: [['orders','capture'], ['capture','settlement'], ['settlement','ledger']]
      },
      {
        title: 'Billing and collections',
        desc: 'Installments billed; collections handle delinquencies.',
        active: ['billing','payments','collections'],
        edges: [['loan','billing'], ['billing','payments'], ['billing','collections']]
      },
      {
        title: 'Disputes and refunds',
        desc: 'Dispute/refund flows adjust ledger and merchant settlement.',
        active: ['disputes','refunds','ledger'],
        edges: [['client','disputes'], ['disputes','refunds'], ['refunds','ledger']]
      }
    ]
  },

  afterpay: {
    title: 'Afterpay',
    steps: [
      {
        title: 'Select installment option',
        desc: 'Client selects Afterpay; session created with merchant.',
        active: ['client','merchant','checkout'],
        edges: [['merchant','checkout'], ['client','checkout']]
      },
      {
        title: 'Risk decision',
        desc: 'Risk checks and decisioning approve or decline.',
        active: ['risk','decision','auth'],
        edges: [['checkout','risk'], ['risk','decision'], ['decision','auth']]
      },
      {
        title: 'Order authorization',
        desc: 'Authorization created; order confirmed.',
        active: ['authz','orders','notify'],
        edges: [['auth','authz'], ['authz','orders'], ['orders','notify']]
      },
      {
        title: 'Capture and settlement',
        desc: 'Capture funds and settle to merchant; ledger updated.',
        active: ['capture','settlement','ledger'],
        edges: [['orders','capture'], ['capture','settlement'], ['settlement','ledger']]
      },
      {
        title: 'Installments',
        desc: 'Installments billed and collected.',
        active: ['billing','payments','collections'],
        edges: [['orders','billing'], ['billing','payments'], ['billing','collections']]
      },
      {
        title: 'Returns and disputes',
        desc: 'Returns and disputes trigger refunds and ledger adjustments.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  brex: {
    title: 'Brex',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'Business onboarding runs KYC/KYB and creates account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Issue cards',
        desc: 'Card issuance and controls configured.',
        active: ['cards','controls','approvals'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Authorize spend',
        desc: 'Authorization checks limits and risk; approval returned.',
        active: ['authz','risk','decision'],
        edges: [['cards','authz'], ['authz','risk'], ['risk','decision']]
      },
      {
        title: 'Capture and ledger',
        desc: 'Capture transactions and post to ledger.',
        active: ['capture','ledger','reports'],
        edges: [['decision','capture'], ['capture','ledger'], ['ledger','reports']]
      },
      {
        title: 'Expenses',
        desc: 'Receipts and expense management workflows.',
        active: ['expenses','ocr','store'],
        edges: [['client','expenses'], ['expenses','ocr'], ['ocr','store']]
      },
      {
        title: 'Payouts',
        desc: 'Payouts routed via ACH/wires; status notified.',
        active: ['payouts','routing','notify'],
        edges: [['ledger','payouts'], ['payouts','routing'], ['routing','notify']]
      }
    ]
  },

  ramp: {
    title: 'Ramp',
    steps: [
      {
        title: 'Onboard and KYB',
        desc: 'Business onboarding runs KYB and creates accounts.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Card controls',
        desc: 'Issue cards and configure controls and policies.',
        active: ['cards','controls','policies'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','policies']]
      },
      {
        title: 'Authorize transaction',
        desc: 'Authorization checks risk and policies; decision returned.',
        active: ['authz','risk','decision'],
        edges: [['cards','authz'], ['authz','risk'], ['risk','decision']]
      },
      {
        title: 'Ledger and accounting sync',
        desc: 'Transactions posted to ledger and synced to accounting.',
        active: ['ledger','sync','integrations'],
        edges: [['decision','ledger'], ['ledger','sync'], ['sync','integrations']]
      },
      {
        title: 'Expenses and receipts',
        desc: 'Receipts ingested; OCR extracts data; reimbursements tracked.',
        active: ['expenses','ocr','store'],
        edges: [['client','expenses'], ['expenses','ocr'], ['ocr','store']]
      },
      {
        title: 'Insights',
        desc: 'Analytics computes savings and spend insights.',
        active: ['analytics','warehouse','reports'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['warehouse','reports']]
      }
    ]
  },

  mercury: {
    title: 'Mercury',
    steps: [
      {
        title: 'Onboard and KYB',
        desc: 'Business onboarding runs KYB and creates banking account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Login and dashboards',
        desc: 'Client authenticates and loads balances and transactions.',
        active: ['client','auth','accounts'],
        edges: [['client','auth'], ['auth','accounts']]
      },
      {
        title: 'ACH transfer',
        desc: 'Transfer created and routed to ACH network.',
        active: ['payments','routing','ach'],
        edges: [['client','payments'], ['payments','routing'], ['routing','ach']]
      },
      {
        title: 'Core banking execution',
        desc: 'Core posts ledger entries and returns status.',
        active: ['core','ledger','status'],
        edges: [['ach','core'], ['core','ledger'], ['core','status']]
      },
      {
        title: 'Cards',
        desc: 'Card issuance and controls managed for business cards.',
        active: ['cards','controls','approvals'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Notifications and reports',
        desc: 'Notifications sent; reports compiled for export.',
        active: ['notify','reports','exports'],
        edges: [['status','notify'], ['ledger','reports'], ['reports','exports']]
      }
    ]
  }

  square: {
    title: 'Square',
    steps: [
      {
        title: 'Merchant signs in',
        desc: 'Merchant authenticates; device/session established.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Create checkout',
        desc: 'Catalog items and pricing loaded; order created.',
        active: ['catalog','pricing','orders'],
        edges: [['client','catalog'], ['catalog','pricing'], ['pricing','orders']]
      },
      {
        title: 'Authorize payment',
        desc: 'Payment authorization runs risk and card network auth.',
        active: ['payments','authz','network'],
        edges: [['orders','payments'], ['payments','authz'], ['authz','network']]
      },
      {
        title: 'Capture and receipt',
        desc: 'Capture posts to ledger; receipt generated; notifications sent.',
        active: ['capture','ledger','notify'],
        edges: [['network','capture'], ['capture','ledger'], ['capture','notify']]
      },
      {
        title: 'Payouts',
        desc: 'Settlement batches payouts to merchant bank account.',
        active: ['settlement','payouts','bank'],
        edges: [['ledger','settlement'], ['settlement','payouts'], ['payouts','bank']]
      },
      {
        title: 'Disputes and refunds',
        desc: 'Disputes/refunds adjust ledger and notify merchant.',
        active: ['disputes','refunds','ledger'],
        edges: [['client','disputes'], ['disputes','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'stripe-dashboard': {
    title: 'Stripe Dashboard',
    steps: [
      {
        title: 'Sign in',
        desc: 'Admin authenticates; org and permissions loaded.',
        active: ['client','auth','org'],
        edges: [['client','auth'], ['auth','org']]
      },
      {
        title: 'View payments',
        desc: 'Payments list queried; search index and cache used.',
        active: ['payments','search','cache'],
        edges: [['client','payments'], ['payments','search'], ['payments','cache']]
      },
      {
        title: 'Create refund',
        desc: 'Refund created; ledger updated; notification queued.',
        active: ['refunds','ledger','notify'],
        edges: [['payments','refunds'], ['refunds','ledger'], ['refunds','notify']]
      },
      {
        title: 'Dispute management',
        desc: 'Dispute details loaded; evidence submitted to network.',
        active: ['disputes','evidence','network'],
        edges: [['client','disputes'], ['disputes','evidence'], ['evidence','network']]
      },
      {
        title: 'Payouts',
        desc: 'Payouts view loads settlement batches and bank status.',
        active: ['payouts','settlement','bank'],
        edges: [['client','payouts'], ['payouts','settlement'], ['settlement','bank']]
      },
      {
        title: 'Reports',
        desc: 'Analytics aggregates and exports reports.',
        active: ['analytics','warehouse','exports'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['warehouse','exports']]
      }
    ]
  },

  'wise-business': {
    title: 'Wise Business',
    steps: [
      {
        title: 'Onboard and KYB',
        desc: 'Business onboarding runs KYB and creates account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Fund account',
        desc: 'Funding via bank transfer/card; ledger updated.',
        active: ['funding','payments','ledger'],
        edges: [['client','funding'], ['funding','payments'], ['payments','ledger']]
      },
      {
        title: 'Create transfer',
        desc: 'Transfer created; FX quote computed; routing selected.',
        active: ['transfers','fx','routing'],
        edges: [['client','transfers'], ['transfers','fx'], ['fx','routing']]
      },
      {
        title: 'Compliance checks',
        desc: 'Risk/compliance checks run before execution.',
        active: ['risk','compliance','decision'],
        edges: [['routing','risk'], ['risk','compliance'], ['compliance','decision']]
      },
      {
        title: 'Payout',
        desc: 'Payout executed via local rails; status updated; notifications sent.',
        active: ['payouts','rails','notify'],
        edges: [['decision','payouts'], ['payouts','rails'], ['payouts','notify']]
      },
      {
        title: 'Reconciliation',
        desc: 'Reconciliation and reports generated for accounting export.',
        active: ['recon','reports','exports'],
        edges: [['ledger','recon'], ['recon','reports'], ['reports','exports']]
      }
    ]
  },

  payoneer: {
    title: 'Payoneer',
    steps: [
      {
        title: 'Onboard and verify',
        desc: 'KYC verifies user and creates account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Receive funds',
        desc: 'Incoming payments credited; ledger updated; balance shown.',
        active: ['incoming','ledger','accounts'],
        edges: [['incoming','ledger'], ['ledger','accounts']]
      },
      {
        title: 'Withdraw to bank',
        desc: 'Withdrawal created; routed to bank rails.',
        active: ['withdrawals','routing','bank'],
        edges: [['client','withdrawals'], ['withdrawals','routing'], ['routing','bank']]
      },
      {
        title: 'Compliance',
        desc: 'Risk/compliance checks run before payout.',
        active: ['risk','compliance','decision'],
        edges: [['withdrawals','risk'], ['risk','compliance'], ['compliance','decision']]
      },
      {
        title: 'Payout execution',
        desc: 'Payout executed; status updated; notifications sent.',
        active: ['payouts','status','notify'],
        edges: [['decision','payouts'], ['payouts','status'], ['status','notify']]
      },
      {
        title: 'Reporting',
        desc: 'Reports and exports generated for the user.',
        active: ['reports','warehouse','exports'],
        edges: [['ledger','reports'], ['reports','warehouse'], ['warehouse','exports']]
      }
    ]
  },

  remitly: {
    title: 'Remitly',
    steps: [
      {
        title: 'Onboard and verify',
        desc: 'KYC verifies user and creates account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Create transfer',
        desc: 'Transfer created; recipient and payout method selected.',
        active: ['transfers','recipients','routing'],
        edges: [['client','transfers'], ['transfers','recipients'], ['recipients','routing']]
      },
      {
        title: 'Fund transfer',
        desc: 'User funds transfer via card/bank; ledger updated.',
        active: ['funding','payments','ledger'],
        edges: [['transfers','funding'], ['funding','payments'], ['payments','ledger']]
      },
      {
        title: 'Compliance checks',
        desc: 'Risk/compliance checks run before payout.',
        active: ['risk','compliance','decision'],
        edges: [['transfers','risk'], ['risk','compliance'], ['compliance','decision']]
      },
      {
        title: 'Payout',
        desc: 'Payout executed via partner/rails; status updated; notify user.',
        active: ['payouts','partners','notify'],
        edges: [['decision','payouts'], ['payouts','partners'], ['payouts','notify']]
      },
      {
        title: 'Support and refunds',
        desc: 'Issues handled; refunds and reversals update ledger.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  worldremit: {
    title: 'WorldRemit',
    steps: [
      {
        title: 'Onboard and verify',
        desc: 'KYC verifies user and creates account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Create transfer',
        desc: 'Transfer created; recipient and payout method selected.',
        active: ['transfers','recipients','routing'],
        edges: [['client','transfers'], ['transfers','recipients'], ['recipients','routing']]
      },
      {
        title: 'Fund transfer',
        desc: 'User funds transfer via card/bank; ledger updated.',
        active: ['funding','payments','ledger'],
        edges: [['transfers','funding'], ['funding','payments'], ['payments','ledger']]
      },
      {
        title: 'Compliance checks',
        desc: 'Risk/compliance checks run before payout.',
        active: ['risk','compliance','decision'],
        edges: [['transfers','risk'], ['risk','compliance'], ['compliance','decision']]
      },
      {
        title: 'Payout',
        desc: 'Payout executed via partners; status updated; notify user.',
        active: ['payouts','partners','notify'],
        edges: [['decision','payouts'], ['payouts','partners'], ['payouts','notify']]
      },
      {
        title: 'Support and refunds',
        desc: 'Issues handled; refunds and reversals update ledger.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'western-union-app': {
    title: 'Western Union App',
    steps: [
      {
        title: 'Onboard and verify',
        desc: 'KYC verifies user and creates account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Create transfer',
        desc: 'Transfer created; payout method (cash pickup/bank) selected.',
        active: ['transfers','recipients','routing'],
        edges: [['client','transfers'], ['transfers','recipients'], ['recipients','routing']]
      },
      {
        title: 'Fund transfer',
        desc: 'User funds transfer via card/bank; ledger updated.',
        active: ['funding','payments','ledger'],
        edges: [['transfers','funding'], ['funding','payments'], ['payments','ledger']]
      },
      {
        title: 'Compliance checks',
        desc: 'Risk/compliance checks run before payout.',
        active: ['risk','compliance','decision'],
        edges: [['transfers','risk'], ['risk','compliance'], ['compliance','decision']]
      },
      {
        title: 'Payout',
        desc: 'Payout executed via agent network/rails; status updated; notify user.',
        active: ['payouts','agents','notify'],
        edges: [['decision','payouts'], ['payouts','agents'], ['payouts','notify']]
      },
      {
        title: 'Support and refunds',
        desc: 'Issues handled; refunds and reversals update ledger.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  moneygram: {
    title: 'MoneyGram',
    steps: [
      {
        title: 'Onboard and verify',
        desc: 'KYC verifies user and creates account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Create transfer',
        desc: 'Transfer created; recipient and payout method selected.',
        active: ['transfers','recipients','routing'],
        edges: [['client','transfers'], ['transfers','recipients'], ['recipients','routing']]
      },
      {
        title: 'Fund transfer',
        desc: 'User funds transfer via card/bank; ledger updated.',
        active: ['funding','payments','ledger'],
        edges: [['transfers','funding'], ['funding','payments'], ['payments','ledger']]
      },
      {
        title: 'Compliance checks',
        desc: 'Risk/compliance checks run before payout.',
        active: ['risk','compliance','decision'],
        edges: [['transfers','risk'], ['risk','compliance'], ['compliance','decision']]
      },
      {
        title: 'Payout',
        desc: 'Payout executed via agent network/rails; status updated; notify user.',
        active: ['payouts','agents','notify'],
        edges: [['decision','payouts'], ['payouts','agents'], ['payouts','notify']]
      },
      {
        title: 'Support and refunds',
        desc: 'Issues handled; refunds and reversals update ledger.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  zelle: {
    title: 'Zelle',
    steps: [
      {
        title: 'Enroll',
        desc: 'User enrolls phone/email; bank linkage and verification.',
        active: ['client','enroll','bank'],
        edges: [['client','enroll'], ['enroll','bank']]
      },
      {
        title: 'Create payment',
        desc: 'Payment created; routing to bank rails established.',
        active: ['payments','routing','bank'],
        edges: [['client','payments'], ['payments','routing'], ['routing','bank']]
      },
      {
        title: 'Authorization',
        desc: 'Bank authorizes and returns status; ledger updated.',
        active: ['authz','status','ledger'],
        edges: [['bank','authz'], ['authz','status'], ['status','ledger']]
      },
      {
        title: 'Recipient notification',
        desc: 'Recipient notified; can claim if not enrolled.',
        active: ['notify','recipient','claim'],
        edges: [['status','notify'], ['notify','recipient'], ['recipient','claim']]
      },
      {
        title: 'Settlement',
        desc: 'Settlement posts final entries and reconciliation.',
        active: ['settlement','recon','ledger'],
        edges: [['status','settlement'], ['settlement','recon'], ['recon','ledger']]
      },
      {
        title: 'Disputes',
        desc: 'Dispute handling and reversals adjust ledger.',
        active: ['disputes','refunds','ledger'],
        edges: [['client','disputes'], ['disputes','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'apple-pay': {
    title: 'Apple Pay',
    steps: [
      {
        title: 'Provision card',
        desc: 'Device provisioning tokenizes card with network and issuer.',
        active: ['device','tokenization','issuer'],
        edges: [['device','tokenization'], ['tokenization','issuer']]
      },
      {
        title: 'Initiate payment',
        desc: 'User approves; payment request created; cryptogram generated.',
        active: ['client','crypto','payments'],
        edges: [['client','payments'], ['client','crypto'], ['crypto','payments']]
      },
      {
        title: 'Authorization',
        desc: 'Network routes to issuer; risk checks; auth response returned.',
        active: ['network','risk','issuer'],
        edges: [['payments','network'], ['network','issuer'], ['issuer','risk']]
      },
      {
        title: 'Capture and settlement',
        desc: 'Merchant captures; settlement batches; ledger updated.',
        active: ['capture','settlement','ledger'],
        edges: [['issuer','capture'], ['capture','settlement'], ['settlement','ledger']]
      },
      {
        title: 'Receipts and notifications',
        desc: 'Receipts stored; notifications delivered to device.',
        active: ['receipts','notify','device'],
        edges: [['capture','receipts'], ['receipts','notify'], ['notify','device']]
      },
      {
        title: 'Disputes and chargebacks',
        desc: 'Dispute and chargeback flows adjust ledger and merchant status.',
        active: ['disputes','chargebacks','ledger'],
        edges: [['client','disputes'], ['disputes','chargebacks'], ['chargebacks','ledger']]
      }
    ]
  }

  'samsung-pay': {
    title: 'Samsung Pay',
    steps: [
      {
        title: 'Provision card',
        desc: 'Device provisioning tokenizes card with network and issuer.',
        active: ['device','tokenization','issuer'],
        edges: [['device','tokenization'], ['tokenization','issuer']]
      },
      {
        title: 'Initiate payment',
        desc: 'User approves; payment request created; cryptogram generated.',
        active: ['client','crypto','payments'],
        edges: [['client','payments'], ['client','crypto'], ['crypto','payments']]
      },
      {
        title: 'Authorization',
        desc: 'Network routes to issuer; risk checks; auth response returned.',
        active: ['network','risk','issuer'],
        edges: [['payments','network'], ['network','issuer'], ['issuer','risk']]
      },
      {
        title: 'Capture and settlement',
        desc: 'Merchant captures; settlement batches; ledger updated.',
        active: ['capture','settlement','ledger'],
        edges: [['issuer','capture'], ['capture','settlement'], ['settlement','ledger']]
      },
      {
        title: 'Receipts and notifications',
        desc: 'Receipts stored; notifications delivered to device.',
        active: ['receipts','notify','device'],
        edges: [['capture','receipts'], ['receipts','notify'], ['notify','device']]
      },
      {
        title: 'Disputes and chargebacks',
        desc: 'Dispute and chargeback flows adjust ledger and merchant status.',
        active: ['disputes','chargebacks','ledger'],
        edges: [['client','disputes'], ['disputes','chargebacks'], ['chargebacks','ledger']]
      }
    ]
  },

  'google-wallet': {
    title: 'Google Wallet',
    steps: [
      {
        title: 'Add card or pass',
        desc: 'Provision card/pass; tokenization and issuer validation.',
        active: ['client','tokenization','issuer'],
        edges: [['client','tokenization'], ['tokenization','issuer']]
      },
      {
        title: 'Sync wallet',
        desc: 'Wallet sync stores passes and entitlements; cache used.',
        active: ['sync','store','cache'],
        edges: [['client','sync'], ['sync','store'], ['store','cache']]
      },
      {
        title: 'Pay with wallet',
        desc: 'Payment request created; routed to network and issuer.',
        active: ['payments','network','issuer'],
        edges: [['client','payments'], ['payments','network'], ['network','issuer']]
      },
      {
        title: 'Authorization',
        desc: 'Issuer authorizes; status returned; ledger updated.',
        active: ['risk','status','ledger'],
        edges: [['issuer','risk'], ['issuer','status'], ['status','ledger']]
      },
      {
        title: 'Receipts',
        desc: 'Receipts stored; notifications delivered.',
        active: ['receipts','notify','client'],
        edges: [['status','receipts'], ['receipts','notify'], ['notify','client']]
      },
      {
        title: 'Insights',
        desc: 'Analytics aggregates wallet usage and payments.',
        active: ['analytics','warehouse','reports'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['warehouse','reports']]
      }
    ]
  },

  mobikwik: {
    title: 'MobiKwik',
    steps: [
      {
        title: 'Login and load wallet',
        desc: 'User authenticates; wallet balance and offers loaded.',
        active: ['client','auth','wallet'],
        edges: [['client','auth'], ['auth','wallet']]
      },
      {
        title: 'Add money',
        desc: 'Top-up created; payments processed; ledger updated.',
        active: ['topup','payments','ledger'],
        edges: [['client','topup'], ['topup','payments'], ['payments','ledger']]
      },
      {
        title: 'UPI payment',
        desc: 'UPI payment intent created; routed to bank; status returned.',
        active: ['payments','upi','bank'],
        edges: [['client','payments'], ['payments','upi'], ['upi','bank']]
      },
      {
        title: 'Bill pay',
        desc: 'Bill payment routed to biller network; status updated.',
        active: ['billpay','routing','biller'],
        edges: [['client','billpay'], ['billpay','routing'], ['routing','biller']]
      },
      {
        title: 'Cashback and offers',
        desc: 'Cashback computed; offers personalized.',
        active: ['rewards','offers','rank'],
        edges: [['ledger','rewards'], ['rewards','offers'], ['offers','rank']]
      },
      {
        title: 'Support and disputes',
        desc: 'Disputes and refunds adjust ledger and notify user.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  freecharge: {
    title: 'Freecharge',
    steps: [
      {
        title: 'Login and load home',
        desc: 'User authenticates; home offers and wallet state loaded.',
        active: ['client','auth','home'],
        edges: [['client','auth'], ['auth','home']]
      },
      {
        title: 'Mobile recharge',
        desc: 'Recharge request created; payment processed; biller fulfilled.',
        active: ['recharge','payments','biller'],
        edges: [['client','recharge'], ['recharge','payments'], ['payments','biller']]
      },
      {
        title: 'UPI payment',
        desc: 'UPI payment routed to bank; status returned; ledger updated.',
        active: ['upi','bank','ledger'],
        edges: [['client','upi'], ['upi','bank'], ['bank','ledger']]
      },
      {
        title: 'Bill pay',
        desc: 'Bill payment routed to biller network; status updated.',
        active: ['billpay','routing','biller'],
        edges: [['client','billpay'], ['billpay','routing'], ['routing','biller']]
      },
      {
        title: 'Cashback',
        desc: 'Cashback computed and applied; notifications sent.',
        active: ['rewards','ledger','notify'],
        edges: [['ledger','rewards'], ['rewards','ledger'], ['rewards','notify']]
      },
      {
        title: 'Support and refunds',
        desc: 'Support handles issues; refunds adjust ledger.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'zerodha-kite': {
    title: 'Zerodha Kite',
    steps: [
      {
        title: 'Login and load markets',
        desc: 'User authenticates; watchlists and market data stream starts.',
        active: ['client','auth','marketdata'],
        edges: [['client','auth'], ['auth','marketdata']]
      },
      {
        title: 'Quote and depth',
        desc: 'Quotes served from cache/index; orderbook depth loaded.',
        active: ['quotes','cache','orderbook'],
        edges: [['client','quotes'], ['quotes','cache'], ['quotes','orderbook']]
      },
      {
        title: 'Place order',
        desc: 'Order created; risk checks; routed to exchange.',
        active: ['orders','risk','exchange'],
        edges: [['client','orders'], ['orders','risk'], ['orders','exchange']]
      },
      {
        title: 'Execution and fills',
        desc: 'Fills stream back; positions updated; ledger posted.',
        active: ['fills','positions','ledger'],
        edges: [['exchange','fills'], ['fills','positions'], ['positions','ledger']]
      },
      {
        title: 'P&L and reporting',
        desc: 'Analytics computes P&L; reports generated.',
        active: ['analytics','warehouse','reports'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['warehouse','reports']]
      },
      {
        title: 'Withdraw or add funds',
        desc: 'Funds transfer routed to bank rails; status notified.',
        active: ['payments','routing','bank'],
        edges: [['client','payments'], ['payments','routing'], ['routing','bank']]
      }
    ]
  },

  indmoney: {
    title: 'INDmoney',
    steps: [
      {
        title: 'Onboard and link accounts',
        desc: 'User onboarding and linking broker/bank accounts.',
        active: ['client','auth','integrations'],
        edges: [['client','auth'], ['auth','integrations']]
      },
      {
        title: 'Sync portfolio',
        desc: 'Sync ingests holdings and transactions; store updated.',
        active: ['sync','ingest','store'],
        edges: [['integrations','sync'], ['sync','ingest'], ['ingest','store']]
      },
      {
        title: 'Net worth dashboard',
        desc: 'Dashboard served from cache and analytics aggregates.',
        active: ['dashboard','cache','analytics'],
        edges: [['client','dashboard'], ['dashboard','cache'], ['store','analytics']]
      },
      {
        title: 'Invest / trade',
        desc: 'Order created; risk checks; routed to broker.',
        active: ['orders','risk','broker'],
        edges: [['client','orders'], ['orders','risk'], ['orders','broker']]
      },
      {
        title: 'Insights',
        desc: 'Analytics generates insights and recommendations.',
        active: ['analytics','warehouse','recos'],
        edges: [['store','analytics'], ['analytics','warehouse'], ['warehouse','recos']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered for goals and market moves.',
        active: ['notify','push','client'],
        edges: [['analytics','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  'et-money': {
    title: 'ET Money',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'User onboarding and KYC for investment products.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Browse funds',
        desc: 'Catalog and recommendations surface funds and plans.',
        active: ['catalog','recos','rank'],
        edges: [['client','catalog'], ['catalog','recos'], ['recos','rank']]
      },
      {
        title: 'Start SIP / invest',
        desc: 'Order created; payments routed; ledger updated.',
        active: ['orders','payments','ledger'],
        edges: [['client','orders'], ['orders','payments'], ['payments','ledger']]
      },
      {
        title: 'NAV and portfolio updates',
        desc: 'Ingest NAV updates; portfolio recomputed.',
        active: ['ingest','portfolio','analytics'],
        edges: [['ingest','portfolio'], ['portfolio','analytics']]
      },
      {
        title: 'Reports',
        desc: 'Reporting and exports generated for tax and performance.',
        active: ['reports','warehouse','exports'],
        edges: [['ledger','reports'], ['reports','warehouse'], ['warehouse','exports']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered for SIP status and market moves.',
        active: ['notify','push','client'],
        edges: [['reports','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  slice: {
    title: 'Slice',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'User onboarding runs KYC and creates account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Issue card / credit line',
        desc: 'Card issued; limits and controls configured.',
        active: ['cards','controls','limits'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','limits']]
      },
      {
        title: 'Authorize spend',
        desc: 'Authorization checks risk and limits; decision returned.',
        active: ['authz','risk','decision'],
        edges: [['cards','authz'], ['authz','risk'], ['risk','decision']]
      },
      {
        title: 'Ledger and statements',
        desc: 'Transactions posted to ledger; statements generated.',
        active: ['ledger','billing','reports'],
        edges: [['decision','ledger'], ['ledger','billing'], ['billing','reports']]
      },
      {
        title: 'Repayment',
        desc: 'Repayment routed via UPI/bank; status updated.',
        active: ['payments','upi','status'],
        edges: [['client','payments'], ['payments','upi'], ['upi','status']]
      },
      {
        title: 'Collections and disputes',
        desc: 'Collections handle delinquencies; disputes/refunds adjust ledger.',
        active: ['collections','disputes','refunds'],
        edges: [['billing','collections'], ['client','disputes'], ['disputes','refunds']]
      }
    ]
  },

  jupiter: {
    title: 'Jupiter',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'Onboarding runs KYC and creates account in core banking.',
        active: ['client','kyc','core'],
        edges: [['client','kyc'], ['kyc','core']]
      },
      {
        title: 'Login and dashboards',
        desc: 'Client authenticates and loads balances and transactions.',
        active: ['client','auth','accounts'],
        edges: [['client','auth'], ['auth','accounts']]
      },
      {
        title: 'UPI payments',
        desc: 'UPI payment routed to bank; status returned; ledger updated.',
        active: ['payments','upi','ledger'],
        edges: [['client','payments'], ['payments','upi'], ['upi','ledger']]
      },
      {
        title: 'Cards',
        desc: 'Card issuance and controls managed.',
        active: ['cards','controls','approvals'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Insights',
        desc: 'Analytics computes spending insights and budgets.',
        active: ['analytics','warehouse','reports'],
        edges: [['accounts','analytics'], ['analytics','warehouse'], ['warehouse','reports']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered via push and SMS.',
        active: ['notify','push','sms'],
        edges: [['ledger','notify'], ['notify','push'], ['notify','sms']]
      }
    ]
  },

  'fi-money': {
    title: 'Fi Money',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'Onboarding runs KYC and creates account in core banking.',
        active: ['client','kyc','core'],
        edges: [['client','kyc'], ['kyc','core']]
      },
      {
        title: 'Login and dashboards',
        desc: 'Client authenticates and loads balances and transactions.',
        active: ['client','auth','accounts'],
        edges: [['client','auth'], ['auth','accounts']]
      },
      {
        title: 'Payments and transfers',
        desc: 'Payments routed to UPI/IMPS and executed in core.',
        active: ['payments','routing','upi'],
        edges: [['client','payments'], ['payments','routing'], ['routing','upi']]
      },
      {
        title: 'Ledger and status',
        desc: 'Core posts ledger entries and returns status.',
        active: ['core','ledger','status'],
        edges: [['upi','core'], ['core','ledger'], ['core','status']]
      },
      {
        title: 'Insights',
        desc: 'Analytics computes spending insights and smart money rules.',
        active: ['analytics','warehouse','rules'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['analytics','rules']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered via push and SMS.',
        active: ['notify','push','sms'],
        edges: [['status','notify'], ['notify','push'], ['notify','sms']]
      }
    ]
  }

  niyo: {
    title: 'Niyo',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'Onboarding runs KYC and creates account in core banking.',
        active: ['client','kyc','core'],
        edges: [['client','kyc'], ['kyc','core']]
      },
      {
        title: 'Login and dashboard',
        desc: 'Client authenticates and loads balances and transactions.',
        active: ['client','auth','accounts'],
        edges: [['client','auth'], ['auth','accounts']]
      },
      {
        title: 'Cards',
        desc: 'Card issuance and controls managed; approvals applied.',
        active: ['cards','controls','approvals'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Payments and transfers',
        desc: 'Payments routed to UPI/IMPS and executed in core.',
        active: ['payments','routing','upi'],
        edges: [['client','payments'], ['payments','routing'], ['routing','upi']]
      },
      {
        title: 'Ledger and status',
        desc: 'Core posts ledger entries and returns status.',
        active: ['core','ledger','status'],
        edges: [['upi','core'], ['core','ledger'], ['core','status']]
      },
      {
        title: 'Insights and alerts',
        desc: 'Analytics computes insights; notifications sent.',
        active: ['analytics','warehouse','notify'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['analytics','notify']]
      }
    ]
  },

  ynab: {
    title: 'YNAB',
    steps: [
      {
        title: 'Sign in',
        desc: 'Client authenticates and loads budgets.',
        active: ['client','auth','budgets'],
        edges: [['client','auth'], ['auth','budgets']]
      },
      {
        title: 'Sync accounts',
        desc: 'Bank integrations sync transactions and balances.',
        active: ['integrations','sync','ingest'],
        edges: [['budgets','integrations'], ['integrations','sync'], ['sync','ingest']]
      },
      {
        title: 'Categorize transactions',
        desc: 'Rules and suggestions categorize; writes persist.',
        active: ['rules','categorize','write'],
        edges: [['ingest','rules'], ['rules','categorize'], ['categorize','write']]
      },
      {
        title: 'Update budget',
        desc: 'Budget allocations update; reports recomputed.',
        active: ['budgets','ledger','reports'],
        edges: [['write','ledger'], ['ledger','budgets'], ['budgets','reports']]
      },
      {
        title: 'Goals and alerts',
        desc: 'Goals tracked; alerts generated for overspend.',
        active: ['goals','notify','client'],
        edges: [['budgets','goals'], ['goals','notify'], ['notify','client']]
      },
      {
        title: 'Analytics',
        desc: 'Analytics aggregates trends and produces insights.',
        active: ['analytics','warehouse','insights'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['warehouse','insights']]
      }
    ]
  },

  mint: {
    title: 'Mint',
    steps: [
      {
        title: 'Sign in and link accounts',
        desc: 'Client authenticates and links bank/credit accounts.',
        active: ['client','auth','integrations'],
        edges: [['client','auth'], ['auth','integrations']]
      },
      {
        title: 'Sync transactions',
        desc: 'Sync pulls transactions; ingest pipeline stores and indexes.',
        active: ['sync','ingest','store'],
        edges: [['integrations','sync'], ['sync','ingest'], ['ingest','store']]
      },
      {
        title: 'Categorize',
        desc: 'Rules and ML categorize spending; budgets updated.',
        active: ['rules','categorize','budgets'],
        edges: [['store','rules'], ['rules','categorize'], ['categorize','budgets']]
      },
      {
        title: 'Alerts',
        desc: 'Alerts generated for bills and unusual spend.',
        active: ['alerts','notify','email'],
        edges: [['budgets','alerts'], ['alerts','notify'], ['notify','email']]
      },
      {
        title: 'Credit monitoring',
        desc: 'Credit score and monitoring updates ingested.',
        active: ['credit','ingest','reports'],
        edges: [['credit','ingest'], ['ingest','reports']]
      },
      {
        title: 'Insights',
        desc: 'Analytics aggregates trends and generates insights.',
        active: ['analytics','warehouse','insights'],
        edges: [['store','analytics'], ['analytics','warehouse'], ['warehouse','insights']]
      }
    ]
  },

  pocketguard: {
    title: 'PocketGuard',
    steps: [
      {
        title: 'Link accounts',
        desc: 'Client links bank accounts and verifies access.',
        active: ['client','auth','integrations'],
        edges: [['client','auth'], ['auth','integrations']]
      },
      {
        title: 'Sync transactions',
        desc: 'Sync pulls transactions; ingest stores and indexes.',
        active: ['sync','ingest','index'],
        edges: [['integrations','sync'], ['sync','ingest'], ['ingest','index']]
      },
      {
        title: 'Compute In-My-Pocket',
        desc: 'Rules compute spendable amount and budgets.',
        active: ['rules','budgets','dashboard'],
        edges: [['index','rules'], ['rules','budgets'], ['budgets','dashboard']]
      },
      {
        title: 'Bill tracking',
        desc: 'Bills detected; reminders scheduled.',
        active: ['bills','scheduler','notify'],
        edges: [['index','bills'], ['bills','scheduler'], ['scheduler','notify']]
      },
      {
        title: 'Savings suggestions',
        desc: 'Recommendations generated for subscriptions and spend.',
        active: ['recos','rank','dashboard'],
        edges: [['rules','recos'], ['recos','rank'], ['rank','dashboard']]
      },
      {
        title: 'Insights',
        desc: 'Analytics aggregates trends and produces insights.',
        active: ['analytics','warehouse','reports'],
        edges: [['index','analytics'], ['analytics','warehouse'], ['warehouse','reports']]
      }
    ]
  },

  acorns: {
    title: 'Acorns',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'KYC verifies identity and creates investment account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Link bank and cards',
        desc: 'Integrations link cards/bank to track spend.',
        active: ['integrations','auth','sync'],
        edges: [['client','integrations'], ['integrations','auth'], ['integrations','sync']]
      },
      {
        title: 'Round-ups',
        desc: 'Round-up engine computes spare change and creates transfer.',
        active: ['roundups','transfers','payments'],
        edges: [['sync','roundups'], ['roundups','transfers'], ['transfers','payments']]
      },
      {
        title: 'Invest',
        desc: 'Invest service allocates portfolio and places trades.',
        active: ['invest','portfolio','broker'],
        edges: [['payments','invest'], ['invest','portfolio'], ['portfolio','broker']]
      },
      {
        title: 'Ledger and statements',
        desc: 'Ledger updated; statements and reports generated.',
        active: ['ledger','reports','warehouse'],
        edges: [['broker','ledger'], ['ledger','reports'], ['reports','warehouse']]
      },
      {
        title: 'Notifications',
        desc: 'Notifications sent for investments and performance.',
        active: ['notify','push','client'],
        edges: [['invest','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  stash: {
    title: 'Stash',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'KYC verifies identity and creates investment account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Fund account',
        desc: 'Funding via ACH/card; ledger updated.',
        active: ['funding','payments','ledger'],
        edges: [['client','funding'], ['funding','payments'], ['payments','ledger']]
      },
      {
        title: 'Browse investments',
        desc: 'Catalog and recommendations surface portfolios.',
        active: ['catalog','recos','rank'],
        edges: [['client','catalog'], ['catalog','recos'], ['recos','rank']]
      },
      {
        title: 'Invest',
        desc: 'Order created; routed to broker; portfolio updated.',
        active: ['orders','broker','portfolio'],
        edges: [['client','orders'], ['orders','broker'], ['broker','portfolio']]
      },
      {
        title: 'Ledger and reporting',
        desc: 'Ledger updated; reports and statements generated.',
        active: ['ledger','reports','warehouse'],
        edges: [['portfolio','ledger'], ['ledger','reports'], ['reports','warehouse']]
      },
      {
        title: 'Notifications',
        desc: 'Notifications sent for orders and price alerts.',
        active: ['notify','push','client'],
        edges: [['orders','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  sofi: {
    title: 'SoFi',
    steps: [
      {
        title: 'Onboard and identity',
        desc: 'Onboarding and identity verification create accounts.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Login and dashboard',
        desc: 'Client authenticates and loads products (banking, invest, loans).',
        active: ['client','auth','dashboard'],
        edges: [['client','auth'], ['auth','dashboard']]
      },
      {
        title: 'Bank transfers',
        desc: 'Transfers routed via ACH; core posts ledger.',
        active: ['payments','routing','ach'],
        edges: [['client','payments'], ['payments','routing'], ['routing','ach']]
      },
      {
        title: 'Invest',
        desc: 'Orders routed to broker; positions and ledger updated.',
        active: ['orders','broker','positions'],
        edges: [['dashboard','orders'], ['orders','broker'], ['broker','positions']]
      },
      {
        title: 'Loans',
        desc: 'Loan origination and servicing with risk and billing.',
        active: ['loans','risk','billing'],
        edges: [['dashboard','loans'], ['loans','risk'], ['loans','billing']]
      },
      {
        title: 'Insights',
        desc: 'Analytics aggregates and generates insights and offers.',
        active: ['analytics','warehouse','recos'],
        edges: [['dashboard','analytics'], ['analytics','warehouse'], ['warehouse','recos']]
      }
    ]
  },

  'ally-bank': {
    title: 'Ally Bank',
    steps: [
      {
        title: 'Login',
        desc: 'Authenticate user; risk checks and session established.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Fetch accounts',
        desc: 'Core banking fetches balances and transactions; cache used.',
        active: ['accounts','core','cache'],
        edges: [['client','accounts'], ['accounts','core'], ['core','cache']]
      },
      {
        title: 'Transfers',
        desc: 'Transfers routed to ACH and executed in core banking.',
        active: ['payments','routing','ach'],
        edges: [['client','payments'], ['payments','routing'], ['routing','ach']]
      },
      {
        title: 'Ledger and status',
        desc: 'Core posts ledger entries and returns status.',
        active: ['core','ledger','status'],
        edges: [['ach','core'], ['core','ledger'], ['core','status']]
      },
      {
        title: 'Cards',
        desc: 'Card management updates controls and approvals.',
        active: ['cards','controls','approvals'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered via push and email.',
        active: ['notify','push','email'],
        edges: [['status','notify'], ['notify','push'], ['notify','email']]
      }
    ]
  },

  varo: {
    title: 'Varo',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'Onboarding runs KYC and creates account in core banking.',
        active: ['client','kyc','core'],
        edges: [['client','kyc'], ['kyc','core']]
      },
      {
        title: 'Login and dashboard',
        desc: 'Client authenticates and loads balances and transactions.',
        active: ['client','auth','accounts'],
        edges: [['client','auth'], ['auth','accounts']]
      },
      {
        title: 'Transfers',
        desc: 'Transfers routed to ACH and executed in core.',
        active: ['payments','routing','ach'],
        edges: [['client','payments'], ['payments','routing'], ['routing','ach']]
      },
      {
        title: 'Ledger and status',
        desc: 'Core posts ledger entries and returns status.',
        active: ['core','ledger','status'],
        edges: [['ach','core'], ['core','ledger'], ['core','status']]
      },
      {
        title: 'Cards',
        desc: 'Card management updates controls and approvals.',
        active: ['cards','controls','approvals'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered via push and email.',
        active: ['notify','push','email'],
        edges: [['status','notify'], ['notify','push'], ['notify','email']]
      }
    ]
  },

  current: {
    title: 'Current',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'Onboarding runs KYC and creates account in core banking.',
        active: ['client','kyc','core'],
        edges: [['client','kyc'], ['kyc','core']]
      },
      {
        title: 'Login and dashboard',
        desc: 'Client authenticates and loads balances and transactions.',
        active: ['client','auth','accounts'],
        edges: [['client','auth'], ['auth','accounts']]
      },
      {
        title: 'Transfers',
        desc: 'Transfers routed to ACH and executed in core.',
        active: ['payments','routing','ach'],
        edges: [['client','payments'], ['payments','routing'], ['routing','ach']]
      },
      {
        title: 'Ledger and status',
        desc: 'Core posts ledger entries and returns status.',
        active: ['core','ledger','status'],
        edges: [['ach','core'], ['core','ledger'], ['core','status']]
      },
      {
        title: 'Cards and controls',
        desc: 'Card issuance and controls managed; approvals applied.',
        active: ['cards','controls','approvals'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered via push and email.',
        active: ['notify','push','email'],
        edges: [['status','notify'], ['notify','push'], ['notify','email']]
      }
    ]
  }

  aspiration: {
    title: 'Aspiration',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'Onboarding runs KYC and creates account in core banking.',
        active: ['client','kyc','core'],
        edges: [['client','kyc'], ['kyc','core']]
      },
      {
        title: 'Login and dashboard',
        desc: 'Client authenticates and loads balances and transactions.',
        active: ['client','auth','accounts'],
        edges: [['client','auth'], ['auth','accounts']]
      },
      {
        title: 'Transfers',
        desc: 'Transfers routed to ACH and executed in core.',
        active: ['payments','routing','ach'],
        edges: [['client','payments'], ['payments','routing'], ['routing','ach']]
      },
      {
        title: 'Ledger and status',
        desc: 'Core posts ledger entries and returns status.',
        active: ['core','ledger','status'],
        edges: [['ach','core'], ['core','ledger'], ['core','status']]
      },
      {
        title: 'Cards',
        desc: 'Card management updates controls and approvals.',
        active: ['cards','controls','approvals'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Insights and impact',
        desc: 'Analytics computes insights; notifications sent.',
        active: ['analytics','warehouse','notify'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['analytics','notify']]
      }
    ]
  },

  'starling-bank': {
    title: 'Starling Bank',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'Onboarding runs KYC and creates account in core banking.',
        active: ['client','kyc','core'],
        edges: [['client','kyc'], ['kyc','core']]
      },
      {
        title: 'Login and dashboard',
        desc: 'Client authenticates and loads balances and transactions.',
        active: ['client','auth','accounts'],
        edges: [['client','auth'], ['auth','accounts']]
      },
      {
        title: 'Payments',
        desc: 'Payments routed to UK rails; status returned; ledger updated.',
        active: ['payments','routing','status'],
        edges: [['client','payments'], ['payments','routing'], ['routing','status']]
      },
      {
        title: 'Ledger and reconciliation',
        desc: 'Ledger updated; reconciliation runs.',
        active: ['ledger','recon','reports'],
        edges: [['status','ledger'], ['ledger','recon'], ['recon','reports']]
      },
      {
        title: 'Cards and controls',
        desc: 'Card controls managed; approvals applied.',
        active: ['cards','controls','approvals'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered via push and email.',
        active: ['notify','push','email'],
        edges: [['status','notify'], ['notify','push'], ['notify','email']]
      }
    ]
  },

  tinkoff: {
    title: 'Tinkoff',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'Onboarding runs KYC and creates account in core banking.',
        active: ['client','kyc','core'],
        edges: [['client','kyc'], ['kyc','core']]
      },
      {
        title: 'Login and dashboard',
        desc: 'Client authenticates and loads balances and transactions.',
        active: ['client','auth','accounts'],
        edges: [['client','auth'], ['auth','accounts']]
      },
      {
        title: 'Cards',
        desc: 'Card issuance and controls managed; approvals applied.',
        active: ['cards','controls','approvals'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Payments',
        desc: 'Transfers routed to rails; status returned; ledger updated.',
        active: ['payments','routing','status'],
        edges: [['client','payments'], ['payments','routing'], ['routing','status']]
      },
      {
        title: 'Loans',
        desc: 'Loan origination and servicing with risk and billing.',
        active: ['loans','risk','billing'],
        edges: [['accounts','loans'], ['loans','risk'], ['loans','billing']]
      },
      {
        title: 'Insights',
        desc: 'Analytics aggregates and generates insights.',
        active: ['analytics','warehouse','reports'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['warehouse','reports']]
      }
    ]
  },

  paysera: {
    title: 'Paysera',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'Onboarding runs KYC and creates account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Login and balances',
        desc: 'Client authenticates and loads balances and transactions.',
        active: ['client','auth','accounts'],
        edges: [['client','auth'], ['auth','accounts']]
      },
      {
        title: 'Transfers',
        desc: 'Transfers routed via SEPA; status returned; ledger updated.',
        active: ['payments','routing','sepa'],
        edges: [['client','payments'], ['payments','routing'], ['routing','sepa']]
      },
      {
        title: 'Core execution',
        desc: 'Core posts ledger entries and returns status.',
        active: ['core','ledger','status'],
        edges: [['sepa','core'], ['core','ledger'], ['core','status']]
      },
      {
        title: 'Cards',
        desc: 'Card management updates controls and approvals.',
        active: ['cards','controls','approvals'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered via push and email.',
        active: ['notify','push','email'],
        edges: [['status','notify'], ['notify','push'], ['notify','email']]
      }
    ]
  },

  curve: {
    title: 'Curve',
    steps: [
      {
        title: 'Provision card',
        desc: 'User provisions card and links underlying cards.',
        active: ['client','tokenization','cards'],
        edges: [['client','tokenization'], ['tokenization','cards']]
      },
      {
        title: 'Authorize payment',
        desc: 'Authorization routed to underlying card; risk checks run.',
        active: ['authz','routing','risk'],
        edges: [['client','authz'], ['authz','routing'], ['authz','risk']]
      },
      {
        title: 'Network processing',
        desc: 'Network routes and returns approval; status stored.',
        active: ['network','status','ledger'],
        edges: [['routing','network'], ['network','status'], ['status','ledger']]
      },
      {
        title: 'Go Back in Time',
        desc: 'Re-route transaction to different underlying card.',
        active: ['retries','routing','ledger'],
        edges: [['ledger','retries'], ['retries','routing'], ['retries','ledger']]
      },
      {
        title: 'Rewards',
        desc: 'Rewards computed and offers personalized.',
        active: ['rewards','offers','rank'],
        edges: [['ledger','rewards'], ['rewards','offers'], ['offers','rank']]
      },
      {
        title: 'Disputes and refunds',
        desc: 'Disputes/refunds adjust ledger and notify user.',
        active: ['disputes','refunds','notify'],
        edges: [['client','disputes'], ['disputes','refunds'], ['refunds','notify']]
      }
    ]
  },

  'wise-card': {
    title: 'Wise Card',
    steps: [
      {
        title: 'Issue card',
        desc: 'Card issued; tokenization and controls configured.',
        active: ['cards','tokenization','controls'],
        edges: [['cards','tokenization'], ['cards','controls']]
      },
      {
        title: 'Authorize spend',
        desc: 'Authorization checks FX balance and risk; decision returned.',
        active: ['authz','fx','risk'],
        edges: [['client','authz'], ['authz','fx'], ['authz','risk']]
      },
      {
        title: 'Capture and ledger',
        desc: 'Capture posts to ledger and updates balances.',
        active: ['capture','ledger','balances'],
        edges: [['authz','capture'], ['capture','ledger'], ['ledger','balances']]
      },
      {
        title: 'FX conversion',
        desc: 'FX engine converts at rate and posts adjustments.',
        active: ['fx','rates','ledger'],
        edges: [['balances','fx'], ['fx','rates'], ['fx','ledger']]
      },
      {
        title: 'Notifications',
        desc: 'Spend notifications sent to user.',
        active: ['notify','push','client'],
        edges: [['capture','notify'], ['notify','push'], ['push','client']]
      },
      {
        title: 'Disputes and chargebacks',
        desc: 'Disputes/chargebacks handled; ledger adjusted.',
        active: ['disputes','chargebacks','ledger'],
        edges: [['client','disputes'], ['disputes','chargebacks'], ['chargebacks','ledger']]
      }
    ]
  },

  cashplus: {
    title: 'Cashplus',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'Onboarding runs KYC and creates account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Login and balances',
        desc: 'Client authenticates and loads balances and transactions.',
        active: ['client','auth','accounts'],
        edges: [['client','auth'], ['auth','accounts']]
      },
      {
        title: 'Transfers',
        desc: 'Transfers routed via rails; status returned; ledger updated.',
        active: ['payments','routing','status'],
        edges: [['client','payments'], ['payments','routing'], ['routing','status']]
      },
      {
        title: 'Core execution',
        desc: 'Core posts ledger entries and returns status.',
        active: ['core','ledger','status'],
        edges: [['routing','core'], ['core','ledger'], ['core','status']]
      },
      {
        title: 'Cards',
        desc: 'Card management updates controls and approvals.',
        active: ['cards','controls','approvals'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered via push and email.',
        active: ['notify','push','email'],
        edges: [['status','notify'], ['notify','push'], ['notify','email']]
      }
    ]
  },

  bunq: {
    title: 'Bunq',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'Onboarding runs KYC and creates account.',
        active: ['client','kyc','core'],
        edges: [['client','kyc'], ['kyc','core']]
      },
      {
        title: 'Login and dashboard',
        desc: 'Client authenticates and loads balances and transactions.',
        active: ['client','auth','accounts'],
        edges: [['client','auth'], ['auth','accounts']]
      },
      {
        title: 'Payments',
        desc: 'Payments routed via SEPA/iDEAL; status returned; ledger updated.',
        active: ['payments','routing','sepa'],
        edges: [['client','payments'], ['payments','routing'], ['routing','sepa']]
      },
      {
        title: 'Ledger and reconciliation',
        desc: 'Ledger updated; reconciliation runs.',
        active: ['ledger','recon','reports'],
        edges: [['sepa','ledger'], ['ledger','recon'], ['recon','reports']]
      },
      {
        title: 'Cards and controls',
        desc: 'Card controls managed; approvals applied.',
        active: ['cards','controls','approvals'],
        edges: [['accounts','cards'], ['cards','controls'], ['controls','approvals']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered via push and email.',
        active: ['notify','push','email'],
        edges: [['ledger','notify'], ['notify','push'], ['notify','email']]
      }
    ]
  },

  'paytm-money': {
    title: 'Paytm Money',
    steps: [
      {
        title: 'Onboard and KYC',
        desc: 'KYC verifies identity and creates investment account.',
        active: ['client','kyc','accounts'],
        edges: [['client','kyc'], ['kyc','accounts']]
      },
      {
        title: 'Browse products',
        desc: 'Catalog and recommendations surface funds/stocks.',
        active: ['catalog','recos','rank'],
        edges: [['client','catalog'], ['catalog','recos'], ['recos','rank']]
      },
      {
        title: 'Place order',
        desc: 'Order created; payments routed; broker/exchange execution.',
        active: ['orders','payments','broker'],
        edges: [['client','orders'], ['orders','payments'], ['orders','broker']]
      },
      {
        title: 'Portfolio update',
        desc: 'Positions updated; ledger posted; statements generated.',
        active: ['positions','ledger','reports'],
        edges: [['broker','positions'], ['positions','ledger'], ['ledger','reports']]
      },
      {
        title: 'Withdrawals',
        desc: 'Withdrawals routed to bank rails; status updated.',
        active: ['withdrawals','routing','bank'],
        edges: [['client','withdrawals'], ['withdrawals','routing'], ['routing','bank']]
      },
      {
        title: 'Notifications',
        desc: 'Alerts delivered for orders and market moves.',
        active: ['notify','push','client'],
        edges: [['reports','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  kucoin: {
    title: 'KuCoin',
    steps: [
      {
        title: 'Sign in',
        desc: 'User authenticates; risk checks and session established.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Deposit',
        desc: 'Deposit address issued; chain monitoring credits account.',
        active: ['wallet','monitor','ledger'],
        edges: [['client','wallet'], ['wallet','monitor'], ['monitor','ledger']]
      },
      {
        title: 'Place order',
        desc: 'Order created; matched in orderbook; trades executed.',
        active: ['orders','orderbook','matching'],
        edges: [['client','orders'], ['orders','orderbook'], ['orderbook','matching']]
      },
      {
        title: 'Settlement',
        desc: 'Trades settled; balances updated; ledger posted.',
        active: ['settlement','balances','ledger'],
        edges: [['matching','settlement'], ['settlement','balances'], ['balances','ledger']]
      },
      {
        title: 'Withdraw',
        desc: 'Withdrawal created; compliance checks; blockchain broadcast.',
        active: ['withdrawals','compliance','broadcast'],
        edges: [['client','withdrawals'], ['withdrawals','compliance'], ['compliance','broadcast']]
      },
      {
        title: 'Alerts and analytics',
        desc: 'Alerts delivered; analytics aggregates trading activity.',
        active: ['notify','analytics','warehouse'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['analytics','notify']]
      }
    ]
  }

  kraken: {
    title: 'Kraken',
    steps: [
      {
        title: 'Sign in',
        desc: 'User authenticates; risk checks and session established.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Deposit',
        desc: 'Deposit address issued; chain monitoring credits account.',
        active: ['wallet','monitor','ledger'],
        edges: [['client','wallet'], ['wallet','monitor'], ['monitor','ledger']]
      },
      {
        title: 'Place order',
        desc: 'Order created; matched in orderbook; trades executed.',
        active: ['orders','orderbook','matching'],
        edges: [['client','orders'], ['orders','orderbook'], ['orderbook','matching']]
      },
      {
        title: 'Settlement',
        desc: 'Trades settled; balances updated; ledger posted.',
        active: ['settlement','balances','ledger'],
        edges: [['matching','settlement'], ['settlement','balances'], ['balances','ledger']]
      },
      {
        title: 'Withdraw',
        desc: 'Withdrawal created; compliance checks; blockchain broadcast.',
        active: ['withdrawals','compliance','broadcast'],
        edges: [['client','withdrawals'], ['withdrawals','compliance'], ['compliance','broadcast']]
      },
      {
        title: 'Alerts and analytics',
        desc: 'Alerts delivered; analytics aggregates trading activity.',
        active: ['notify','analytics','warehouse'],
        edges: [['ledger','analytics'], ['analytics','warehouse'], ['analytics','notify']]
      }
    ]
  },

  bitstamp: {
    title: 'Bitstamp',
    steps: [
      {
        title: 'Sign in',
        desc: 'User authenticates; risk checks and session established.',
        active: ['client','auth','risk'],
        edges: [['client','auth'], ['auth','risk']]
      },
      {
        title: 'Deposit',
        desc: 'Deposit address issued; chain monitoring credits account.',
        active: ['wallet','monitor','ledger'],
        edges: [['client','wallet'], ['wallet','monitor'], ['monitor','ledger']]
      },
      {
        title: 'Place order',
        desc: 'Order created; matched in orderbook; trades executed.',
        active: ['orders','orderbook','matching'],
        edges: [['client','orders'], ['orders','orderbook'], ['orderbook','matching']]
      },
      {
        title: 'Settlement',
        desc: 'Trades settled; balances updated; ledger posted.',
        active: ['settlement','balances','ledger'],
        edges: [['matching','settlement'], ['settlement','balances'], ['balances','ledger']]
      },
      {
        title: 'Withdraw',
        desc: 'Withdrawal created; compliance checks; blockchain broadcast.',
        active: ['withdrawals','compliance','broadcast'],
        edges: [['client','withdrawals'], ['withdrawals','compliance'], ['compliance','broadcast']]
      },
      {
        title: 'Support and reports',
        desc: 'Support handles issues; reports/exports generated.',
        active: ['support','reports','exports'],
        edges: [['client','support'], ['ledger','reports'], ['reports','exports']]
      }
    ]
  },

  temu: {
    title: 'Temu',
    steps: [
      {
        title: 'Browse products',
        desc: 'Client loads feed/search with ranking and caching.',
        active: ['client','feed','rank'],
        edges: [['client','feed'], ['feed','rank']]
      },
      {
        title: 'Search and details',
        desc: 'Search queries index; catalog returns details; cache used.',
        active: ['search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment and shipping',
        desc: 'Orders sent to fulfillment; carrier ships; tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger and notify user.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  shein: {
    title: 'Shein',
    steps: [
      {
        title: 'Browse collections',
        desc: 'Client loads feed/search with ranking and caching.',
        active: ['client','feed','rank'],
        edges: [['client','feed'], ['feed','rank']]
      },
      {
        title: 'Search and details',
        desc: 'Search queries index; catalog returns details; cache used.',
        active: ['search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment and shipping',
        desc: 'Orders sent to fulfillment; carrier ships; tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger and notify user.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  aliexpress: {
    title: 'AliExpress',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads feed/search with ranking and caching.',
        active: ['client','search','rank'],
        edges: [['client','search'], ['search','rank']]
      },
      {
        title: 'Product details',
        desc: 'Catalog returns details; pricing and promos applied.',
        active: ['catalog','pricing','promos'],
        edges: [['search','catalog'], ['catalog','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout',
        desc: 'Checkout validates address and inventory hold.',
        active: ['checkout','inventory','hold'],
        edges: [['client','checkout'], ['checkout','inventory'], ['inventory','hold']]
      },
      {
        title: 'Payment',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Fulfillment',
        desc: 'Fulfillment dispatches; carrier ships; tracking updates.',
        active: ['fulfillment','carrier','tracking'],
        edges: [['orders','fulfillment'], ['fulfillment','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Disputes and refunds',
        desc: 'Disputes/refunds handled; ledger adjusted.',
        active: ['disputes','refunds','ledger'],
        edges: [['client','disputes'], ['disputes','refunds'], ['refunds','ledger']]
      }
    ]
  },

  taobao: {
    title: 'Taobao',
    steps: [
      {
        title: 'Browse feed',
        desc: 'Client loads feed with ranking and caching.',
        active: ['client','feed','rank'],
        edges: [['client','feed'], ['feed','rank']]
      },
      {
        title: 'Search and details',
        desc: 'Search queries index; catalog returns details.',
        active: ['search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Cart and checkout',
        desc: 'Cart persists; checkout validates address and inventory hold.',
        active: ['cart','checkout','hold'],
        edges: [['client','cart'], ['cart','checkout'], ['checkout','hold']]
      },
      {
        title: 'Payment and order',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Fulfillment and tracking',
        desc: 'Fulfillment dispatches; tracking updates.',
        active: ['fulfillment','tracking','notify'],
        edges: [['orders','fulfillment'], ['fulfillment','tracking'], ['tracking','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  tmall: {
    title: 'Tmall',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads feed/search with ranking and caching.',
        active: ['client','search','rank'],
        edges: [['client','search'], ['search','rank']]
      },
      {
        title: 'Product details',
        desc: 'Catalog returns details; pricing and promos applied.',
        active: ['catalog','pricing','promos'],
        edges: [['search','catalog'], ['catalog','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout',
        desc: 'Checkout validates address and inventory hold.',
        active: ['checkout','inventory','hold'],
        edges: [['client','checkout'], ['checkout','inventory'], ['inventory','hold']]
      },
      {
        title: 'Payment and order',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Fulfillment',
        desc: 'Fulfillment dispatches; tracking updates.',
        active: ['fulfillment','tracking','notify'],
        edges: [['orders','fulfillment'], ['fulfillment','tracking'], ['tracking','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  jdcom: {
    title: 'JD.com',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads feed/search with ranking and caching.',
        active: ['client','search','rank'],
        edges: [['client','search'], ['search','rank']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and order',
        desc: 'Checkout validates inventory; order created.',
        active: ['checkout','inventory','orders'],
        edges: [['cart','checkout'], ['checkout','inventory'], ['checkout','orders']]
      },
      {
        title: 'Payment',
        desc: 'Payment processed with risk checks; ledger updated.',
        active: ['payments','risk','ledger'],
        edges: [['orders','payments'], ['payments','risk'], ['payments','ledger']]
      },
      {
        title: 'Fulfillment and tracking',
        desc: 'Fulfillment dispatches; carrier ships; tracking updates.',
        active: ['fulfillment','carrier','tracking'],
        edges: [['orders','fulfillment'], ['fulfillment','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  rakuten: {
    title: 'Rakuten',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads catalog and search with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment',
        desc: 'Orders sent to fulfillment; tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Cashback and rewards',
        desc: 'Rewards computed and credited; notifications sent.',
        active: ['rewards','ledger','notify'],
        edges: [['orders','rewards'], ['rewards','ledger'], ['rewards','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'mercado-libre': {
    title: 'Mercado Libre',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment and shipping',
        desc: 'Orders sent to fulfillment; carrier ships; tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Marketplace protection',
        desc: 'Disputes and fraud handling protect buyers/sellers.',
        active: ['disputes','risk','support'],
        edges: [['orders','risk'], ['client','disputes'], ['disputes','support']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  }

  noon: {
    title: 'Noon',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment and shipping',
        desc: 'Orders sent to fulfillment; carrier ships; tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Support and disputes',
        desc: 'Support handles issues and disputes.',
        active: ['support','disputes','notify'],
        edges: [['orders','support'], ['client','disputes'], ['disputes','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  jumia: {
    title: 'Jumia',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment and shipping',
        desc: 'Orders sent to fulfillment; carrier ships; tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Cash on delivery',
        desc: 'COD reconciliation posts to ledger and updates status.',
        active: ['cod','recon','ledger'],
        edges: [['orders','cod'], ['cod','recon'], ['recon','ledger']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  vinted: {
    title: 'Vinted',
    steps: [
      {
        title: 'Browse listings',
        desc: 'Client loads feed/search with ranking and caching.',
        active: ['client','feed','rank'],
        edges: [['client','feed'], ['feed','rank']]
      },
      {
        title: 'Listing details',
        desc: 'Catalog returns listing details; images served via CDN.',
        active: ['catalog','cdn','cache'],
        edges: [['feed','catalog'], ['catalog','cdn'], ['catalog','cache']]
      },
      {
        title: 'Buy and pay (escrow)',
        desc: 'Payment captured into escrow; order created.',
        active: ['checkout','payments','escrow'],
        edges: [['client','checkout'], ['checkout','payments'], ['payments','escrow']]
      },
      {
        title: 'Shipping label',
        desc: 'Shipping label generated; carrier tracking starts.',
        active: ['shipping','carrier','tracking'],
        edges: [['escrow','shipping'], ['shipping','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Delivery and release',
        desc: 'Delivery confirmed; escrow released to seller; ledger updated.',
        active: ['delivery','payouts','ledger'],
        edges: [['tracking','delivery'], ['delivery','payouts'], ['payouts','ledger']]
      },
      {
        title: 'Disputes and refunds',
        desc: 'Disputes/refunds adjust escrow and ledger.',
        active: ['disputes','refunds','ledger'],
        edges: [['client','disputes'], ['disputes','refunds'], ['refunds','ledger']]
      }
    ]
  },

  depop: {
    title: 'Depop',
    steps: [
      {
        title: 'Browse listings',
        desc: 'Client loads feed/search with ranking and caching.',
        active: ['client','feed','rank'],
        edges: [['client','feed'], ['feed','rank']]
      },
      {
        title: 'Listing details',
        desc: 'Catalog returns listing details; images served via CDN.',
        active: ['catalog','cdn','cache'],
        edges: [['feed','catalog'], ['catalog','cdn'], ['catalog','cache']]
      },
      {
        title: 'Checkout and pay',
        desc: 'Payment processed; order created; notifications sent.',
        active: ['checkout','payments','orders'],
        edges: [['client','checkout'], ['checkout','payments'], ['payments','orders']]
      },
      {
        title: 'Shipping',
        desc: 'Shipping label generated; carrier tracking starts.',
        active: ['shipping','carrier','tracking'],
        edges: [['orders','shipping'], ['shipping','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Payouts',
        desc: 'Delivery confirmed; payouts released; ledger updated.',
        active: ['payouts','ledger','notify'],
        edges: [['tracking','payouts'], ['payouts','ledger'], ['payouts','notify']]
      },
      {
        title: 'Support and refunds',
        desc: 'Support handles issues; refunds adjust ledger.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  poshmark: {
    title: 'Poshmark',
    steps: [
      {
        title: 'Browse listings',
        desc: 'Client loads feed/search with ranking and caching.',
        active: ['client','feed','rank'],
        edges: [['client','feed'], ['feed','rank']]
      },
      {
        title: 'Offers and negotiation',
        desc: 'Offers sent; realtime updates delivered.',
        active: ['offers','realtime','notify'],
        edges: [['client','offers'], ['offers','realtime'], ['realtime','notify']]
      },
      {
        title: 'Checkout and escrow',
        desc: 'Payment captured to escrow; order created.',
        active: ['checkout','payments','escrow'],
        edges: [['client','checkout'], ['checkout','payments'], ['payments','escrow']]
      },
      {
        title: 'Shipping label',
        desc: 'Label generated; carrier tracking starts.',
        active: ['shipping','carrier','tracking'],
        edges: [['escrow','shipping'], ['shipping','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Delivery and release',
        desc: 'Delivery confirmed; escrow released to seller.',
        active: ['delivery','payouts','ledger'],
        edges: [['tracking','delivery'], ['delivery','payouts'], ['payouts','ledger']]
      },
      {
        title: 'Disputes and refunds',
        desc: 'Disputes/refunds adjust escrow and ledger.',
        active: ['disputes','refunds','ledger'],
        edges: [['client','disputes'], ['disputes','refunds'], ['refunds','ledger']]
      }
    ]
  },

  carousell: {
    title: 'Carousell',
    steps: [
      {
        title: 'Browse listings',
        desc: 'Client loads feed/search with ranking and caching.',
        active: ['client','feed','rank'],
        edges: [['client','feed'], ['feed','rank']]
      },
      {
        title: 'Chat seller',
        desc: 'In-app chat uses realtime messaging and notifications.',
        active: ['chat','realtime','notify'],
        edges: [['client','chat'], ['chat','realtime'], ['chat','notify']]
      },
      {
        title: 'Checkout and pay',
        desc: 'Payment processed; order created.',
        active: ['checkout','payments','orders'],
        edges: [['client','checkout'], ['checkout','payments'], ['payments','orders']]
      },
      {
        title: 'Shipping',
        desc: 'Shipping label generated; tracking updates.',
        active: ['shipping','carrier','tracking'],
        edges: [['orders','shipping'], ['shipping','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Payouts',
        desc: 'Delivery confirmed; payouts released; ledger updated.',
        active: ['payouts','ledger','notify'],
        edges: [['tracking','payouts'], ['payouts','ledger'], ['payouts','notify']]
      },
      {
        title: 'Support and refunds',
        desc: 'Support handles issues; refunds adjust ledger.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  olx: {
    title: 'OLX',
    steps: [
      {
        title: 'Browse listings',
        desc: 'Client loads search and listings with caching.',
        active: ['client','search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'View listing',
        desc: 'Listing details loaded; images served via CDN.',
        active: ['catalog','cdn','cache'],
        edges: [['index','catalog'], ['catalog','cdn'], ['catalog','cache']]
      },
      {
        title: 'Chat',
        desc: 'Chat uses realtime messaging and notifications.',
        active: ['chat','realtime','notify'],
        edges: [['client','chat'], ['chat','realtime'], ['chat','notify']]
      },
      {
        title: 'Lead and conversion',
        desc: 'Leads tracked; analytics measures conversion funnel.',
        active: ['leads','events','analytics'],
        edges: [['chat','leads'], ['leads','events'], ['events','analytics']]
      },
      {
        title: 'Trust and safety',
        desc: 'Risk and moderation detect fraud and abuse.',
        active: ['risk','moderation','reports'],
        edges: [['events','risk'], ['risk','moderation'], ['moderation','reports']]
      },
      {
        title: 'Notifications',
        desc: 'Notifications delivered for messages and leads.',
        active: ['notify','push','client'],
        edges: [['leads','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  quikr: {
    title: 'Quikr',
    steps: [
      {
        title: 'Browse listings',
        desc: 'Client loads search and listings with caching.',
        active: ['client','search','index'],
        edges: [['client','search'], ['search','index']]
      },
      {
        title: 'View listing',
        desc: 'Listing details loaded; images served via CDN.',
        active: ['catalog','cdn','cache'],
        edges: [['index','catalog'], ['catalog','cdn'], ['catalog','cache']]
      },
      {
        title: 'Chat',
        desc: 'Chat uses realtime messaging and notifications.',
        active: ['chat','realtime','notify'],
        edges: [['client','chat'], ['chat','realtime'], ['chat','notify']]
      },
      {
        title: 'Lead and conversion',
        desc: 'Leads tracked; analytics measures conversion funnel.',
        active: ['leads','events','analytics'],
        edges: [['chat','leads'], ['leads','events'], ['events','analytics']]
      },
      {
        title: 'Trust and safety',
        desc: 'Risk and moderation detect fraud and abuse.',
        active: ['risk','moderation','reports'],
        edges: [['events','risk'], ['risk','moderation'], ['moderation','reports']]
      },
      {
        title: 'Notifications',
        desc: 'Notifications delivered for messages and leads.',
        active: ['notify','push','client'],
        edges: [['leads','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  'facebook-marketplace': {
    title: 'Facebook Marketplace',
    steps: [
      {
        title: 'Browse listings',
        desc: 'Client loads feed/search with ranking and caching.',
        active: ['client','feed','rank'],
        edges: [['client','feed'], ['feed','rank']]
      },
      {
        title: 'View listing',
        desc: 'Listing details loaded; images served via CDN.',
        active: ['catalog','cdn','cache'],
        edges: [['feed','catalog'], ['catalog','cdn'], ['catalog','cache']]
      },
      {
        title: 'Message seller',
        desc: 'Messenger chat uses realtime messaging and notifications.',
        active: ['chat','realtime','notify'],
        edges: [['client','chat'], ['chat','realtime'], ['chat','notify']]
      },
      {
        title: 'Payments (if enabled)',
        desc: 'Payments processed; escrow/ledger updated.',
        active: ['payments','escrow','ledger'],
        edges: [['chat','payments'], ['payments','escrow'], ['escrow','ledger']]
      },
      {
        title: 'Trust and safety',
        desc: 'Risk and moderation detect fraud and abuse.',
        active: ['risk','moderation','reports'],
        edges: [['chat','risk'], ['risk','moderation'], ['moderation','reports']]
      },
      {
        title: 'Notifications',
        desc: 'Notifications delivered for messages and offers.',
        active: ['notify','push','client'],
        edges: [['chat','notify'], ['notify','push'], ['push','client']]
      }
    ]
  },

  wish: {
    title: 'Wish',
    steps: [
      {
        title: 'Browse products',
        desc: 'Client loads feed/search with ranking and caching.',
        active: ['client','feed','rank'],
        edges: [['client','feed'], ['feed','rank']]
      },
      {
        title: 'Search and details',
        desc: 'Search queries index; catalog returns details; cache used.',
        active: ['search','index','catalog'],
        edges: [['client','search'], ['search','index'], ['index','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment and tracking',
        desc: 'Fulfillment dispatches; tracking updates; notifications sent.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  }

  banggood: {
    title: 'Banggood',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout',
        desc: 'Checkout validates address and inventory hold.',
        active: ['checkout','inventory','hold'],
        edges: [['cart','checkout'], ['checkout','inventory'], ['inventory','hold']]
      },
      {
        title: 'Payment and order',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Fulfillment and tracking',
        desc: 'Fulfillment dispatches; carrier ships; tracking updates.',
        active: ['fulfillment','carrier','tracking'],
        edges: [['orders','fulfillment'], ['fulfillment','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  gearbest: {
    title: 'Gearbest',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout',
        desc: 'Checkout validates address and inventory hold.',
        active: ['checkout','inventory','hold'],
        edges: [['cart','checkout'], ['checkout','inventory'], ['inventory','hold']]
      },
      {
        title: 'Payment and order',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Fulfillment and tracking',
        desc: 'Fulfillment dispatches; carrier ships; tracking updates.',
        active: ['fulfillment','carrier','tracking'],
        edges: [['orders','fulfillment'], ['fulfillment','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  overstock: {
    title: 'Overstock',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Order and fulfillment',
        desc: 'Order created; fulfillment ships; tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Support',
        desc: 'Support handles issues and cancellations.',
        active: ['support','orders','notify'],
        edges: [['client','support'], ['support','orders'], ['support','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  houzz: {
    title: 'Houzz',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'View product and inspiration',
        desc: 'Catalog loads product details and images via CDN.',
        active: ['catalog','cdn','recos'],
        edges: [['catalog','cdn'], ['catalog','recos']]
      },
      {
        title: 'Message pro',
        desc: 'Messaging uses realtime and notifications.',
        active: ['chat','realtime','notify'],
        edges: [['client','chat'], ['chat','realtime'], ['chat','notify']]
      },
      {
        title: 'Checkout',
        desc: 'Cart and checkout; payment processed with risk checks.',
        active: ['cart','checkout','payments'],
        edges: [['client','cart'], ['cart','checkout'], ['checkout','payments']]
      },
      {
        title: 'Fulfillment',
        desc: 'Orders fulfilled and shipped; tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Returns and support',
        desc: 'Support and returns handled; refunds adjust ledger.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  '1mg': {
    title: '1mg',
    steps: [
      {
        title: 'Browse medicines',
        desc: 'Client searches catalog; recommendations and cache used.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Upload prescription',
        desc: 'Prescription uploaded; verification workflow starts.',
        active: ['upload','verification','pharmacy'],
        edges: [['client','upload'], ['upload','verification'], ['verification','pharmacy']]
      },
      {
        title: 'Cart and checkout',
        desc: 'Cart persists; checkout computes pricing and availability.',
        active: ['cart','pricing','checkout'],
        edges: [['client','cart'], ['cart','pricing'], ['cart','checkout']]
      },
      {
        title: 'Payment and order',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Fulfillment and delivery',
        desc: 'Fulfillment dispatches; courier delivers; tracking updates.',
        active: ['fulfillment','courier','tracking'],
        edges: [['orders','fulfillment'], ['fulfillment','courier'], ['courier','tracking']]
      },
      {
        title: 'Support and refunds',
        desc: 'Support handles issues; refunds adjust ledger.',
        active: ['support','refunds','ledger'],
        edges: [['orders','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  pharmeasy: {
    title: 'PharmEasy',
    steps: [
      {
        title: 'Browse medicines',
        desc: 'Client searches catalog; recommendations and cache used.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Upload prescription',
        desc: 'Prescription uploaded; verification workflow starts.',
        active: ['upload','verification','pharmacy'],
        edges: [['client','upload'], ['upload','verification'], ['verification','pharmacy']]
      },
      {
        title: 'Cart and checkout',
        desc: 'Cart persists; checkout computes pricing and availability.',
        active: ['cart','pricing','checkout'],
        edges: [['client','cart'], ['cart','pricing'], ['cart','checkout']]
      },
      {
        title: 'Payment and order',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Fulfillment and delivery',
        desc: 'Fulfillment dispatches; courier delivers; tracking updates.',
        active: ['fulfillment','courier','tracking'],
        edges: [['orders','fulfillment'], ['fulfillment','courier'], ['courier','tracking']]
      },
      {
        title: 'Support and refunds',
        desc: 'Support handles issues; refunds adjust ledger.',
        active: ['support','refunds','ledger'],
        edges: [['orders','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  netmeds: {
    title: 'Netmeds',
    steps: [
      {
        title: 'Browse medicines',
        desc: 'Client searches catalog; recommendations and cache used.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Upload prescription',
        desc: 'Prescription uploaded; verification workflow starts.',
        active: ['upload','verification','pharmacy'],
        edges: [['client','upload'], ['upload','verification'], ['verification','pharmacy']]
      },
      {
        title: 'Cart and checkout',
        desc: 'Cart persists; checkout computes pricing and availability.',
        active: ['cart','pricing','checkout'],
        edges: [['client','cart'], ['cart','pricing'], ['cart','checkout']]
      },
      {
        title: 'Payment and order',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Fulfillment and delivery',
        desc: 'Fulfillment dispatches; courier delivers; tracking updates.',
        active: ['fulfillment','courier','tracking'],
        edges: [['orders','fulfillment'], ['fulfillment','courier'], ['courier','tracking']]
      },
      {
        title: 'Support and refunds',
        desc: 'Support handles issues; refunds adjust ledger.',
        active: ['support','refunds','ledger'],
        edges: [['orders','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  firstcry: {
    title: 'FirstCry',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment and shipping',
        desc: 'Orders sent to fulfillment; carrier ships; tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Support',
        desc: 'Support handles issues and cancellations.',
        active: ['support','orders','notify'],
        edges: [['client','support'], ['support','orders'], ['support','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  lenskart: {
    title: 'Lenskart',
    steps: [
      {
        title: 'Browse products',
        desc: 'Client searches catalog; recommendations and cache used.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Try-on and fitting',
        desc: 'Try-on experience loads assets and personalization.',
        active: ['tryon','cdn','recos'],
        edges: [['client','tryon'], ['tryon','cdn'], ['tryon','recos']]
      },
      {
        title: 'Cart and checkout',
        desc: 'Cart persists; checkout computes pricing and availability.',
        active: ['cart','pricing','checkout'],
        edges: [['client','cart'], ['cart','pricing'], ['cart','checkout']]
      },
      {
        title: 'Payment and order',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Fulfillment',
        desc: 'Lab/fulfillment dispatches; tracking updates.',
        active: ['fulfillment','tracking','notify'],
        edges: [['orders','fulfillment'], ['fulfillment','tracking'], ['tracking','notify']]
      },
      {
        title: 'Support and returns',
        desc: 'Support handles issues; returns/refunds adjust ledger.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  pepperfry: {
    title: 'Pepperfry',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment and delivery',
        desc: 'Large-item fulfillment scheduled; delivery tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Installation',
        desc: 'Installation scheduled and completed; notifications sent.',
        active: ['installation','scheduler','notify'],
        edges: [['orders','installation'], ['installation','scheduler'], ['scheduler','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  }

  'urban-ladder': {
    title: 'Urban Ladder',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment and delivery',
        desc: 'Large-item fulfillment scheduled; delivery tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Installation',
        desc: 'Installation scheduled and completed; notifications sent.',
        active: ['installation','scheduler','notify'],
        edges: [['orders','installation'], ['installation','scheduler'], ['scheduler','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'tata-cliq': {
    title: 'Tata Cliq',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout',
        desc: 'Checkout validates address and inventory hold.',
        active: ['checkout','inventory','hold'],
        edges: [['cart','checkout'], ['checkout','inventory'], ['inventory','hold']]
      },
      {
        title: 'Payment and order',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Fulfillment and tracking',
        desc: 'Fulfillment dispatches; carrier ships; tracking updates.',
        active: ['fulfillment','carrier','tracking'],
        edges: [['orders','fulfillment'], ['fulfillment','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  snapdeal: {
    title: 'Snapdeal',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout',
        desc: 'Checkout validates address and inventory hold.',
        active: ['checkout','inventory','hold'],
        edges: [['cart','checkout'], ['checkout','inventory'], ['inventory','hold']]
      },
      {
        title: 'Payment and order',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Fulfillment and tracking',
        desc: 'Fulfillment dispatches; carrier ships; tracking updates.',
        active: ['fulfillment','carrier','tracking'],
        edges: [['orders','fulfillment'], ['fulfillment','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  bigbasket: {
    title: 'BigBasket',
    steps: [
      {
        title: 'Browse groceries',
        desc: 'Client loads catalog and search with caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Cart and slot selection',
        desc: 'Cart persists; delivery slots and availability checked.',
        active: ['cart','availability','hold'],
        edges: [['client','cart'], ['cart','availability'], ['availability','hold']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Picking and packing',
        desc: 'Fulfillment picks items and packs; inventory updated.',
        active: ['fulfillment','inventory','orders'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','inventory']]
      },
      {
        title: 'Last-mile delivery',
        desc: 'Courier assigned; tracking updates; notifications sent.',
        active: ['courier','tracking','notify'],
        edges: [['fulfillment','courier'], ['courier','tracking'], ['tracking','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  blinkit: {
    title: 'Blinkit',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads catalog and search with caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Store fulfillment',
        desc: 'Dark store picks and packs; inventory updated.',
        active: ['orders','fulfillment','inventory'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','inventory']]
      },
      {
        title: 'Rider dispatch',
        desc: 'Courier assigned; realtime tracking and ETA updates.',
        active: ['courier','realtime','eta'],
        edges: [['fulfillment','courier'], ['courier','realtime'], ['realtime','eta']]
      },
      {
        title: 'Support and refunds',
        desc: 'Support handles issues; refunds adjust ledger.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  zepto: {
    title: 'Zepto',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads catalog and search with caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Store fulfillment',
        desc: 'Micro-warehouse picks and packs; inventory updated.',
        active: ['orders','fulfillment','inventory'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','inventory']]
      },
      {
        title: 'Courier dispatch',
        desc: 'Courier assigned; realtime tracking and ETA updates.',
        active: ['courier','realtime','eta'],
        edges: [['fulfillment','courier'], ['courier','realtime'], ['realtime','eta']]
      },
      {
        title: 'Support and refunds',
        desc: 'Support handles issues; refunds adjust ledger.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  shipt: {
    title: 'Shipt',
    steps: [
      {
        title: 'Browse stores',
        desc: 'Client loads catalog and store availability.',
        active: ['client','catalog','availability'],
        edges: [['client','catalog'], ['catalog','availability']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Shopper assignment',
        desc: 'Shopper assigned; realtime updates start.',
        active: ['dispatch','shopper','realtime'],
        edges: [['payments','dispatch'], ['dispatch','shopper'], ['shopper','realtime']]
      },
      {
        title: 'Substitutions and delivery',
        desc: 'Substitution approvals and delivery tracking.',
        active: ['substitutions','tracking','notify'],
        edges: [['realtime','substitutions'], ['shopper','tracking'], ['tracking','notify']]
      },
      {
        title: 'Support and refunds',
        desc: 'Support handles issues; refunds adjust ledger.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'costco-app': {
    title: 'Costco App',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Membership',
        desc: 'Membership status and entitlements checked.',
        active: ['membership','entitlements','auth'],
        edges: [['client','auth'], ['auth','membership'], ['membership','entitlements']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment and tracking',
        desc: 'Fulfillment dispatches; tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'walmart-app': {
    title: 'Walmart App',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Pickup or delivery',
        desc: 'Store fulfillment or delivery; tracking updates.',
        active: ['fulfillment','tracking','notify'],
        edges: [['payments','fulfillment'], ['fulfillment','tracking'], ['tracking','notify']]
      },
      {
        title: 'Substitutions',
        desc: 'Substitution approvals and updates to customer.',
        active: ['substitutions','realtime','client'],
        edges: [['fulfillment','substitutions'], ['substitutions','realtime'], ['realtime','client']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'target-app': {
    title: 'Target App',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and deals',
        desc: 'Cart persists; deals and promos applied.',
        active: ['cart','promos','pricing'],
        edges: [['client','cart'], ['cart','promos'], ['promos','pricing']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Pickup or delivery',
        desc: 'Store fulfillment or delivery; tracking updates.',
        active: ['fulfillment','tracking','notify'],
        edges: [['payments','fulfillment'], ['fulfillment','tracking'], ['tracking','notify']]
      },
      {
        title: 'Loyalty',
        desc: 'Loyalty points and offers updated.',
        active: ['loyalty','ledger','rank'],
        edges: [['orders','loyalty'], ['loyalty','ledger'], ['loyalty','rank']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  }

  'best-buy-app': {
    title: 'Best Buy App',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Product details',
        desc: 'Catalog returns details; pricing and promos applied.',
        active: ['catalog','pricing','promos'],
        edges: [['search','catalog'], ['catalog','pricing'], ['pricing','promos']]
      },
      {
        title: 'Cart and checkout',
        desc: 'Cart persists; checkout validates inventory and delivery options.',
        active: ['cart','checkout','inventory'],
        edges: [['client','cart'], ['cart','checkout'], ['checkout','inventory']]
      },
      {
        title: 'Payment and order',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Pickup or delivery',
        desc: 'Fulfillment dispatches; tracking updates; notifications sent.',
        active: ['fulfillment','tracking','notify'],
        edges: [['orders','fulfillment'], ['fulfillment','tracking'], ['tracking','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  newegg: {
    title: 'Newegg',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Product details',
        desc: 'Catalog returns details; pricing and promos applied.',
        active: ['catalog','pricing','promos'],
        edges: [['search','catalog'], ['catalog','pricing'], ['pricing','promos']]
      },
      {
        title: 'Cart and checkout',
        desc: 'Cart persists; checkout validates inventory and shipping options.',
        active: ['cart','checkout','inventory'],
        edges: [['client','cart'], ['cart','checkout'], ['checkout','inventory']]
      },
      {
        title: 'Payment and order',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Fulfillment and tracking',
        desc: 'Fulfillment ships; tracking updates; notifications sent.',
        active: ['fulfillment','carrier','tracking'],
        edges: [['orders','fulfillment'], ['fulfillment','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'wayfair-app': {
    title: 'Wayfair App',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Delivery scheduling',
        desc: 'Delivery scheduled; tracking updates; notifications sent.',
        active: ['fulfillment','scheduler','tracking'],
        edges: [['payments','fulfillment'], ['fulfillment','scheduler'], ['scheduler','tracking']]
      },
      {
        title: 'Installation',
        desc: 'Installation scheduled and completed.',
        active: ['installation','scheduler','notify'],
        edges: [['fulfillment','installation'], ['installation','scheduler'], ['scheduler','notify']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  chewy: {
    title: 'Chewy',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Autoship setup',
        desc: 'Subscription/autoship configured and stored.',
        active: ['subscriptions','scheduler','billing'],
        edges: [['client','subscriptions'], ['subscriptions','scheduler'], ['subscriptions','billing']]
      },
      {
        title: 'Cart and checkout',
        desc: 'Cart persists; checkout validates inventory.',
        active: ['cart','checkout','inventory'],
        edges: [['client','cart'], ['cart','checkout'], ['checkout','inventory']]
      },
      {
        title: 'Payment and order',
        desc: 'Payment processed with risk checks; order created.',
        active: ['payments','risk','orders'],
        edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']]
      },
      {
        title: 'Fulfillment and tracking',
        desc: 'Fulfillment ships; tracking updates; notifications sent.',
        active: ['fulfillment','carrier','tracking'],
        edges: [['orders','fulfillment'], ['fulfillment','carrier'], ['carrier','tracking']]
      },
      {
        title: 'Support and refunds',
        desc: 'Support handles issues; refunds adjust ledger.',
        active: ['support','refunds','ledger'],
        edges: [['client','support'], ['support','refunds'], ['refunds','ledger']]
      }
    ]
  },

  zappos: {
    title: 'Zappos',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment and tracking',
        desc: 'Fulfillment ships; tracking updates; notifications sent.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Easy returns',
        desc: 'Returns workflow and reverse logistics.',
        active: ['returns','carrier','refunds'],
        edges: [['client','returns'], ['returns','carrier'], ['returns','refunds']]
      },
      {
        title: 'Refunds',
        desc: 'Refunds processed and ledger updated.',
        active: ['refunds','ledger','notify'],
        edges: [['returns','refunds'], ['refunds','ledger'], ['refunds','notify']]
      }
    ]
  },

  stockx: {
    title: 'StockX',
    steps: [
      {
        title: 'Browse market',
        desc: 'Client loads listings and market data with caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Place bid or ask',
        desc: 'Orderbook updates; matching engine matches trades.',
        active: ['orderbook','matching','orders'],
        edges: [['client','orders'], ['orders','orderbook'], ['orderbook','matching']]
      },
      {
        title: 'Payment and escrow',
        desc: 'Buyer payment captured; escrow held; ledger updated.',
        active: ['payments','escrow','ledger'],
        edges: [['matching','payments'], ['payments','escrow'], ['escrow','ledger']]
      },
      {
        title: 'Authentication',
        desc: 'Item shipped to auth center; authenticity verified.',
        active: ['shipping','authcenter','verification'],
        edges: [['orders','shipping'], ['shipping','authcenter'], ['authcenter','verification']]
      },
      {
        title: 'Payouts',
        desc: 'After verification, payout released to seller.',
        active: ['payouts','ledger','notify'],
        edges: [['verification','payouts'], ['payouts','ledger'], ['payouts','notify']]
      },
      {
        title: 'Disputes and refunds',
        desc: 'Disputes/refunds adjust escrow and ledger.',
        active: ['disputes','refunds','ledger'],
        edges: [['client','disputes'], ['disputes','refunds'], ['refunds','ledger']]
      }
    ]
  },

  goat: {
    title: 'GOAT',
    steps: [
      {
        title: 'Browse market',
        desc: 'Client loads listings and market data with caching.',
        active: ['client','catalog','cache'],
        edges: [['client','catalog'], ['catalog','cache']]
      },
      {
        title: 'Place offer',
        desc: 'Offers recorded; matching selects seller.',
        active: ['offers','matching','orders'],
        edges: [['client','offers'], ['offers','matching'], ['matching','orders']]
      },
      {
        title: 'Payment and escrow',
        desc: 'Buyer payment captured; escrow held; ledger updated.',
        active: ['payments','escrow','ledger'],
        edges: [['orders','payments'], ['payments','escrow'], ['escrow','ledger']]
      },
      {
        title: 'Authentication',
        desc: 'Item shipped to auth center; authenticity verified.',
        active: ['shipping','authcenter','verification'],
        edges: [['orders','shipping'], ['shipping','authcenter'], ['authcenter','verification']]
      },
      {
        title: 'Delivery and payout',
        desc: 'Delivery confirmed; payout released; notifications sent.',
        active: ['delivery','payouts','notify'],
        edges: [['verification','delivery'], ['delivery','payouts'], ['payouts','notify']]
      },
      {
        title: 'Disputes and refunds',
        desc: 'Disputes/refunds adjust escrow and ledger.',
        active: ['disputes','refunds','ledger'],
        edges: [['client','disputes'], ['disputes','refunds'], ['refunds','ledger']]
      }
    ]
  },

  farfetch: {
    title: 'Farfetch',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Partner fulfillment',
        desc: 'Orders routed to partner boutiques; carrier ships; tracking updates.',
        active: ['orders','partners','tracking'],
        edges: [['payments','orders'], ['orders','partners'], ['partners','tracking']]
      },
      {
        title: 'Customs and duties',
        desc: 'Customs computation and clearance updates.',
        active: ['customs','risk','ledger'],
        edges: [['orders','customs'], ['customs','risk'], ['customs','ledger']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  ssense: {
    title: 'Ssense',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment and tracking',
        desc: 'Fulfillment dispatches; carrier ships; tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Customs and duties',
        desc: 'Customs computation and clearance updates.',
        active: ['customs','risk','ledger'],
        edges: [['orders','customs'], ['customs','risk'], ['customs','ledger']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  },

  'mr-porter': {
    title: 'Mr Porter',
    steps: [
      {
        title: 'Browse and search',
        desc: 'Client loads search and catalog with caching.',
        active: ['client','search','catalog'],
        edges: [['client','search'], ['search','catalog']]
      },
      {
        title: 'Cart and pricing',
        desc: 'Cart persists; pricing and promos compute totals.',
        active: ['cart','pricing','promos'],
        edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']]
      },
      {
        title: 'Checkout and payment',
        desc: 'Payments processed with risk checks; order created.',
        active: ['checkout','payments','risk'],
        edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']]
      },
      {
        title: 'Fulfillment and tracking',
        desc: 'Fulfillment dispatches; carrier ships; tracking updates.',
        active: ['orders','fulfillment','tracking'],
        edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']]
      },
      {
        title: 'Customs and duties',
        desc: 'Customs computation and clearance updates.',
        active: ['customs','risk','ledger'],
        edges: [['orders','customs'], ['customs','risk'], ['customs','ledger']]
      },
      {
        title: 'Returns and refunds',
        desc: 'Returns handled; refunds adjust ledger.',
        active: ['returns','refunds','ledger'],
        edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']]
      }
    ]
  }

  'net-a-porter': {
    title: 'Net-a-Porter',
    steps: [
      { title: 'Browse and search', desc: 'Client loads search and catalog with caching.', active: ['client','search','catalog'], edges: [['client','search'], ['search','catalog']] },
      { title: 'Cart and pricing', desc: 'Cart persists; pricing and promos compute totals.', active: ['cart','pricing','promos'], edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']] },
      { title: 'Checkout and payment', desc: 'Checkout validates; payments processed with risk checks; order created.', active: ['checkout','payments','risk'], edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']] },
      { title: 'Fulfillment and tracking', desc: 'Fulfillment dispatches; tracking updates; notifications sent.', active: ['orders','fulfillment','tracking'], edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']] },
      { title: 'Concierge support', desc: 'Support handles delivery changes and issues.', active: ['support','notify','ledger'], edges: [['client','support'], ['support','notify'], ['support','ledger']] },
      { title: 'Returns and refunds', desc: 'Returns handled; refunds adjust ledger.', active: ['returns','refunds','ledger'], edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']] }
    ]
  },

  rebag: {
    title: 'Rebag',
    steps: [
      { title: 'Browse and valuation', desc: 'Client browses catalog and requests valuation.', active: ['client','catalog','valuation'], edges: [['client','catalog'], ['catalog','valuation']] },
      { title: 'Offer and checkout', desc: 'Offer created; checkout runs pricing and promos.', active: ['offers','checkout','pricing'], edges: [['valuation','offers'], ['offers','checkout'], ['checkout','pricing']] },
      { title: 'Payment and order', desc: 'Payment processed with risk checks; order created.', active: ['payments','risk','orders'], edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']] },
      { title: 'Authentication', desc: 'Item routed to auth center; verification completed.', active: ['shipping','authcenter','verification'], edges: [['orders','shipping'], ['shipping','authcenter'], ['authcenter','verification']] },
      { title: 'Payout or store credit', desc: 'Payout issued; ledger updated; notifications sent.', active: ['payouts','ledger','notify'], edges: [['verification','payouts'], ['payouts','ledger'], ['payouts','notify']] },
      { title: 'Disputes and refunds', desc: 'Disputes/refunds adjust ledger.', active: ['disputes','refunds','ledger'], edges: [['client','disputes'], ['disputes','refunds'], ['refunds','ledger']] }
    ]
  },

  'the-realreal': {
    title: 'The RealReal',
    steps: [
      { title: 'Consignment intake', desc: 'Consignor schedules intake; item created in catalog.', active: ['client','intake','catalog'], edges: [['client','intake'], ['intake','catalog']] },
      { title: 'Authentication and pricing', desc: 'Auth center verifies; pricing set; listing published.', active: ['authcenter','verification','pricing'], edges: [['catalog','authcenter'], ['authcenter','verification'], ['verification','pricing']] },
      { title: 'Buyer checkout', desc: 'Buyer checks out; payments and risk checks run.', active: ['checkout','payments','risk'], edges: [['client','checkout'], ['checkout','payments'], ['payments','risk']] },
      { title: 'Order fulfillment', desc: 'Fulfillment ships; tracking updates; notifications sent.', active: ['orders','fulfillment','tracking'], edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']] },
      { title: 'Consignor payout', desc: 'Payout issued to consignor; ledger updated.', active: ['payouts','ledger','notify'], edges: [['orders','payouts'], ['payouts','ledger'], ['payouts','notify']] },
      { title: 'Returns and disputes', desc: 'Returns and disputes adjust refunds and ledger.', active: ['returns','refunds','disputes'], edges: [['client','returns'], ['returns','refunds'], ['refunds','disputes']] }
    ]
  },

  grailed: {
    title: 'Grailed',
    steps: [
      { title: 'Browse and listings', desc: 'Client browses listings and catalog.', active: ['client','catalog','search'], edges: [['client','search'], ['search','catalog']] },
      { title: 'Offer negotiation', desc: 'Offers negotiated and stored; notifications sent.', active: ['offers','notify','chat'], edges: [['client','offers'], ['offers','chat'], ['offers','notify']] },
      { title: 'Checkout and payment', desc: 'Payments processed with risk checks; order created.', active: ['checkout','payments','risk'], edges: [['offers','checkout'], ['checkout','payments'], ['payments','risk']] },
      { title: 'Shipping and tracking', desc: 'Seller ships; tracking updates; notifications sent.', active: ['orders','shipping','tracking'], edges: [['payments','orders'], ['orders','shipping'], ['shipping','tracking']] },
      { title: 'Payouts', desc: 'Payout released after confirmation; ledger updated.', active: ['payouts','ledger','notify'], edges: [['tracking','payouts'], ['payouts','ledger'], ['payouts','notify']] },
      { title: 'Disputes and refunds', desc: 'Disputes/refunds adjust ledger.', active: ['disputes','refunds','ledger'], edges: [['client','disputes'], ['disputes','refunds'], ['refunds','ledger']] }
    ]
  },

  'etsy-seller': {
    title: 'Etsy Seller',
    steps: [
      { title: 'List product', desc: 'Seller creates listing; catalog updated.', active: ['client','listings','catalog'], edges: [['client','listings'], ['listings','catalog']] },
      { title: 'Orders and messages', desc: 'Order and message notifications; support tools.', active: ['orders','notify','support'], edges: [['catalog','orders'], ['orders','notify'], ['client','support']] },
      { title: 'Fulfillment', desc: 'Shipping label purchase; tracking updates.', active: ['fulfillment','carrier','tracking'], edges: [['orders','fulfillment'], ['fulfillment','carrier'], ['carrier','tracking']] },
      { title: 'Payments and deposits', desc: 'Payouts issued; ledger updated.', active: ['payouts','ledger','payments'], edges: [['orders','payments'], ['payments','payouts'], ['payouts','ledger']] },
      { title: 'Ads and analytics', desc: 'Ads and analytics updated for seller.', active: ['ads','analytics','catalog'], edges: [['listings','ads'], ['ads','analytics'], ['analytics','catalog']] },
      { title: 'Returns and cases', desc: 'Cases, refunds, and ledger adjustments.', active: ['returns','refunds','ledger'], edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']] }
    ]
  },

  'shopify-admin': {
    title: 'Shopify Admin',
    steps: [
      { title: 'Manage products', desc: 'Admin creates products; catalog and inventory updated.', active: ['client','catalog','inventory'], edges: [['client','catalog'], ['catalog','inventory']] },
      { title: 'Orders and fulfillment', desc: 'Orders viewed; fulfillment workflows triggered.', active: ['orders','fulfillment','tracking'], edges: [['catalog','orders'], ['orders','fulfillment'], ['fulfillment','tracking']] },
      { title: 'Payments and payouts', desc: 'Payments, risk, and payouts managed.', active: ['payments','risk','payouts'], edges: [['orders','payments'], ['payments','risk'], ['payments','payouts']] },
      { title: 'Apps and webhooks', desc: 'Apps integrate via webhooks and APIs.', active: ['apps','webhooks','api'], edges: [['client','apps'], ['apps','webhooks'], ['webhooks','api']] },
      { title: 'Analytics', desc: 'Reports and analytics generated.', active: ['analytics','warehouse','catalog'], edges: [['orders','analytics'], ['analytics','warehouse'], ['warehouse','catalog']] },
      { title: 'Refunds and disputes', desc: 'Refunds/disputes processed; ledger updated.', active: ['refunds','disputes','ledger'], edges: [['orders','refunds'], ['refunds','disputes'], ['refunds','ledger']] }
    ]
  },

  ecwid: {
    title: 'Ecwid',
    steps: [
      { title: 'Store setup', desc: 'Merchant sets up store; catalog and settings saved.', active: ['client','catalog','settings'], edges: [['client','settings'], ['settings','catalog']] },
      { title: 'Embed storefront', desc: 'Storefront embedded; API serves catalog and cart.', active: ['client','api','catalog'], edges: [['client','api'], ['api','catalog']] },
      { title: 'Checkout and payment', desc: 'Checkout; payments and risk checks run.', active: ['checkout','payments','risk'], edges: [['api','checkout'], ['checkout','payments'], ['payments','risk']] },
      { title: 'Orders and fulfillment', desc: 'Orders created; fulfillment and tracking updated.', active: ['orders','fulfillment','tracking'], edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']] },
      { title: 'Marketing', desc: 'Promos and email notifications run.', active: ['promos','notify','analytics'], edges: [['catalog','promos'], ['promos','notify'], ['orders','analytics']] },
      { title: 'Refunds', desc: 'Refunds processed; ledger updated.', active: ['refunds','ledger','support'], edges: [['orders','refunds'], ['refunds','ledger'], ['client','support']] }
    ]
  },

  'squarespace-commerce': {
    title: 'Squarespace Commerce',
    steps: [
      { title: 'Site and product setup', desc: 'Merchant configures site and catalog.', active: ['client','cms','catalog'], edges: [['client','cms'], ['cms','catalog']] },
      { title: 'Storefront browse', desc: 'Client browses; CDN/cache serves pages and catalog.', active: ['client','cdn','catalog'], edges: [['client','cdn'], ['cdn','catalog']] },
      { title: 'Checkout and payment', desc: 'Checkout; payments and risk checks run.', active: ['checkout','payments','risk'], edges: [['catalog','checkout'], ['checkout','payments'], ['payments','risk']] },
      { title: 'Orders and fulfillment', desc: 'Orders created; fulfillment and tracking updated.', active: ['orders','fulfillment','tracking'], edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']] },
      { title: 'Email and marketing', desc: 'Email campaigns and notifications sent.', active: ['marketing','notify','analytics'], edges: [['client','marketing'], ['marketing','notify'], ['orders','analytics']] },
      { title: 'Refunds and support', desc: 'Refunds processed; support handles issues.', active: ['refunds','ledger','support'], edges: [['orders','refunds'], ['refunds','ledger'], ['client','support']] }
    ]
  },

  'wix-stores': {
    title: 'Wix Stores',
    steps: [
      { title: 'Store setup', desc: 'Merchant configures site and catalog.', active: ['client','cms','catalog'], edges: [['client','cms'], ['cms','catalog']] },
      { title: 'Browse and cart', desc: 'Client browses; cart persists; pricing and promos applied.', active: ['client','cart','pricing'], edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']] },
      { title: 'Checkout and payment', desc: 'Checkout; payments and risk checks run.', active: ['checkout','payments','risk'], edges: [['cart','checkout'], ['checkout','payments'], ['payments','risk']] },
      { title: 'Orders and fulfillment', desc: 'Orders created; fulfillment and tracking updated.', active: ['orders','fulfillment','tracking'], edges: [['payments','orders'], ['orders','fulfillment'], ['fulfillment','tracking']] },
      { title: 'Marketing and CRM', desc: 'Marketing automations and analytics updated.', active: ['marketing','crm','analytics'], edges: [['client','marketing'], ['marketing','crm'], ['orders','analytics']] },
      { title: 'Refunds and support', desc: 'Refunds processed; support handles issues.', active: ['refunds','ledger','support'], edges: [['orders','refunds'], ['refunds','ledger'], ['client','support']] }
    ]
  },

  magento: {
    title: 'Magento',
    steps: [
      { title: 'Catalog and storefront', desc: 'Storefront serves catalog and search.', active: ['client','search','catalog'], edges: [['client','search'], ['search','catalog']] },
      { title: 'Cart and promos', desc: 'Cart persists; pricing and promos applied.', active: ['cart','pricing','promos'], edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']] },
      { title: 'Checkout', desc: 'Checkout validates inventory and shipping options.', active: ['checkout','inventory','fulfillment'], edges: [['cart','checkout'], ['checkout','inventory'], ['checkout','fulfillment']] },
      { title: 'Payments and risk', desc: 'Payments processed with risk checks; order created.', active: ['payments','risk','orders'], edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']] },
      { title: 'Fulfillment and tracking', desc: 'Fulfillment ships; tracking updates; notifications sent.', active: ['fulfillment','tracking','notify'], edges: [['orders','fulfillment'], ['fulfillment','tracking'], ['tracking','notify']] },
      { title: 'Returns and refunds', desc: 'Returns handled; refunds adjust ledger.', active: ['returns','refunds','ledger'], edges: [['client','returns'], ['returns','refunds'], ['refunds','ledger']] }
    ]
  }

  woocommerce: {
    title: 'WooCommerce',
    steps: [
      { title: 'Storefront browse', desc: 'Client browses products; catalog and search respond.', active: ['client','search','catalog'], edges: [['client','search'], ['search','catalog']] },
      { title: 'Cart and pricing', desc: 'Cart persists; pricing and promos applied.', active: ['cart','pricing','promos'], edges: [['client','cart'], ['cart','pricing'], ['pricing','promos']] },
      { title: 'Checkout', desc: 'Checkout validates inventory and shipping.', active: ['checkout','inventory','fulfillment'], edges: [['cart','checkout'], ['checkout','inventory'], ['checkout','fulfillment']] },
      { title: 'Payments', desc: 'Payment processed with risk checks; order created.', active: ['payments','risk','orders'], edges: [['checkout','payments'], ['payments','risk'], ['payments','orders']] },
      { title: 'Fulfillment & tracking', desc: 'Fulfillment ships; tracking updates; notifications sent.', active: ['fulfillment','tracking','notify'], edges: [['orders','fulfillment'], ['fulfillment','tracking'], ['tracking','notify']] },
      { title: 'Refunds', desc: 'Refunds processed and ledger updated.', active: ['refunds','ledger','support'], edges: [['orders','refunds'], ['refunds','ledger'], ['client','support']] }
    ]
  },

  bereal: {
    title: 'BeReal',
    steps: [
      { title: 'Daily prompt', desc: 'Client receives prompt and schedules capture.', active: ['client','notify','scheduler'], edges: [['notify','client'], ['client','scheduler']] },
      { title: 'Capture & upload', desc: 'Client captures and uploads media; object storage persists.', active: ['client','upload','obj'], edges: [['client','upload'], ['upload','obj']] },
      { title: 'Post creation', desc: 'Post metadata stored; feed updated.', active: ['write','store','feed'], edges: [['upload','write'], ['write','store'], ['store','feed']] },
      { title: 'Friends feed', desc: 'Feed served and ranked; cache helps latency.', active: ['client','feed','rank'], edges: [['client','feed'], ['feed','rank']] },
      { title: 'Reactions & comments', desc: 'Interactions stored and fanned out; notifications sent.', active: ['comments','fanout','notify'], edges: [['client','comments'], ['comments','fanout'], ['fanout','notify']] },
      { title: 'Moderation', desc: 'Safety checks run and actions recorded.', active: ['safety','reports','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  mastodon: {
    title: 'Mastodon',
    steps: [
      { title: 'Timeline fetch', desc: 'Client loads home timeline; cache and store serve posts.', active: ['client','feed','cache'], edges: [['client','feed'], ['feed','cache']] },
      { title: 'Post a toot', desc: 'Post written to store and indexed.', active: ['write','store','index'], edges: [['client','write'], ['write','store'], ['store','index']] },
      { title: 'Federation outbound', desc: 'Outbox publishes to other instances.', active: ['outbox','queue','network'], edges: [['store','outbox'], ['outbox','queue'], ['queue','network']] },
      { title: 'Federation inbound', desc: 'Inbox receives and stores remote posts.', active: ['network','inbox','store'], edges: [['network','inbox'], ['inbox','store']] },
      { title: 'Notifications', desc: 'Mentions and follows generate notifications.', active: ['notify','fanout','client'], edges: [['store','fanout'], ['fanout','notify'], ['notify','client']] },
      { title: 'Moderation', desc: 'Reports and blocks applied per instance policies.', active: ['reports','safety','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  clubhouse: {
    title: 'Clubhouse',
    steps: [
      { title: 'Discover rooms', desc: 'Client loads rooms and recommendations.', active: ['client','feed','recos'], edges: [['client','feed'], ['feed','recos']] },
      { title: 'Join room', desc: 'Presence updated; realtime session established.', active: ['presence','realtime','auth'], edges: [['client','auth'], ['auth','presence'], ['presence','realtime']] },
      { title: 'Audio session', desc: 'Media service relays audio; CDN edge assists.', active: ['media','network','realtime'], edges: [['client','media'], ['media','network'], ['network','realtime']] },
      { title: 'Moderation tools', desc: 'Moderation events stored and enforced.', active: ['safety','store','notify'], edges: [['realtime','safety'], ['safety','store'], ['safety','notify']] },
      { title: 'Invites & follows', desc: 'Social graph updates and notifications.', active: ['graph','fanout','notify'], edges: [['client','graph'], ['graph','fanout'], ['fanout','notify']] },
      { title: 'Replays', desc: 'Replays stored and served on demand.', active: ['obj','cdn','client'], edges: [['media','obj'], ['obj','cdn'], ['cdn','client']] }
    ]
  },

  geneva: {
    title: 'Geneva',
    steps: [
      { title: 'Communities', desc: 'Client browses communities and channels.', active: ['client','search','catalog'], edges: [['client','search'], ['search','catalog']] },
      { title: 'Post message', desc: 'Message written; fanout to members.', active: ['write','fanout','notify'], edges: [['client','write'], ['write','fanout'], ['fanout','notify']] },
      { title: 'Realtime updates', desc: 'Realtime stream pushes updates to clients.', active: ['realtime','stream','client'], edges: [['write','stream'], ['stream','realtime'], ['realtime','client']] },
      { title: 'Events', desc: 'Events created and reminders scheduled.', active: ['events','scheduler','notify'], edges: [['client','events'], ['events','scheduler'], ['scheduler','notify']] },
      { title: 'Moderation', desc: 'Reports and moderation actions stored.', active: ['reports','safety','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] },
      { title: 'Media sharing', desc: 'Uploads stored and served via CDN.', active: ['upload','obj','cdn'], edges: [['client','upload'], ['upload','obj'], ['obj','cdn']] }
    ]
  },

  'geneva-groups': {
    title: 'Geneva Groups',
    steps: [
      { title: 'Group creation', desc: 'Group metadata stored; invites prepared.', active: ['client','write','store'], edges: [['client','write'], ['write','store']] },
      { title: 'Invites', desc: 'Invites sent; notifications delivered.', active: ['fanout','notify','client'], edges: [['store','fanout'], ['fanout','notify'], ['notify','client']] },
      { title: 'Channel messaging', desc: 'Messages written and delivered in realtime.', active: ['write','stream','realtime'], edges: [['client','write'], ['write','stream'], ['stream','realtime']] },
      { title: 'Member roles', desc: 'AuthZ and roles enforced.', active: ['authz','store','api'], edges: [['client','api'], ['api','authz'], ['authz','store']] },
      { title: 'Events & RSVPs', desc: 'Events scheduled and reminders sent.', active: ['events','scheduler','notify'], edges: [['client','events'], ['events','scheduler'], ['scheduler','notify']] },
      { title: 'Moderation', desc: 'Reports and safety actions logged.', active: ['reports','safety','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  nextdoor: {
    title: 'Nextdoor',
    steps: [
      { title: 'Neighborhood feed', desc: 'Client loads local feed; ranking and safety applied.', active: ['client','feed','rank'], edges: [['client','feed'], ['feed','rank']] },
      { title: 'Create post', desc: 'Post written to store and indexed.', active: ['write','store','index'], edges: [['client','write'], ['write','store'], ['store','index']] },
      { title: 'Comments & thanks', desc: 'Interactions stored; notifications sent.', active: ['comments','notify','fanout'], edges: [['client','comments'], ['comments','fanout'], ['fanout','notify']] },
      { title: 'Marketplace', desc: 'Listings managed with catalog and messaging.', active: ['catalog','chat','notify'], edges: [['client','catalog'], ['catalog','chat'], ['chat','notify']] },
      { title: 'Local services', desc: 'Recommendations and leads tracked.', active: ['recos','store','analytics'], edges: [['feed','recos'], ['recos','store'], ['store','analytics']] },
      { title: 'Reports', desc: 'Reports reviewed; moderation actions stored.', active: ['reports','safety','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  meetup: {
    title: 'Meetup',
    steps: [
      { title: 'Discover events', desc: 'Client searches and browses events.', active: ['client','search','catalog'], edges: [['client','search'], ['search','catalog']] },
      { title: 'Create event', desc: 'Organizer creates event; stored and indexed.', active: ['events','store','index'], edges: [['client','events'], ['events','store'], ['store','index']] },
      { title: 'RSVP', desc: 'RSVP stored; capacity checks run.', active: ['rsvp','risk','store'], edges: [['client','rsvp'], ['rsvp','risk'], ['risk','store']] },
      { title: 'Reminders', desc: 'Scheduler sends notifications.', active: ['scheduler','notify','client'], edges: [['events','scheduler'], ['scheduler','notify'], ['notify','client']] },
      { title: 'Check-in', desc: 'Attendance recorded and analytics updated.', active: ['checkin','store','analytics'], edges: [['client','checkin'], ['checkin','store'], ['store','analytics']] },
      { title: 'Messaging', desc: 'Group messaging and announcements.', active: ['chat','fanout','notify'], edges: [['client','chat'], ['chat','fanout'], ['fanout','notify']] }
    ]
  },

  amino: {
    title: 'Amino',
    steps: [
      { title: 'Communities feed', desc: 'Client loads community feed and recommendations.', active: ['client','feed','recos'], edges: [['client','feed'], ['feed','recos']] },
      { title: 'Create post', desc: 'Post written and indexed.', active: ['write','store','index'], edges: [['client','write'], ['write','store'], ['store','index']] },
      { title: 'Chat', desc: 'Realtime chat messages delivered.', active: ['chat','realtime','stream'], edges: [['client','chat'], ['chat','stream'], ['stream','realtime']] },
      { title: 'Notifications', desc: 'Mentions and follows trigger notifications.', active: ['fanout','notify','client'], edges: [['store','fanout'], ['fanout','notify'], ['notify','client']] },
      { title: 'Media', desc: 'Uploads stored and served via CDN.', active: ['upload','obj','cdn'], edges: [['client','upload'], ['upload','obj'], ['obj','cdn']] },
      { title: 'Moderation', desc: 'Reports and safety actions stored.', active: ['reports','safety','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  vsco: {
    title: 'VSCO',
    steps: [
      { title: 'Browse feed', desc: 'Client loads feed; ranking and cache applied.', active: ['client','feed','cache'], edges: [['client','feed'], ['feed','cache']] },
      { title: 'Edit photo', desc: 'Editor applies filters and saves draft.', active: ['editor','store','assets'], edges: [['client','editor'], ['editor','assets'], ['editor','store']] },
      { title: 'Upload & publish', desc: 'Upload to object store; publish metadata.', active: ['upload','obj','write'], edges: [['client','upload'], ['upload','obj'], ['upload','write']] },
      { title: 'CDN delivery', desc: 'CDN serves media to clients.', active: ['cdn','obj','client'], edges: [['obj','cdn'], ['cdn','client']] },
      { title: 'Likes & comments', desc: 'Interactions stored; notifications sent.', active: ['comments','fanout','notify'], edges: [['client','comments'], ['comments','fanout'], ['fanout','notify']] },
      { title: 'Moderation', desc: 'Safety and reporting workflows applied.', active: ['reports','safety','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  }

  flickr: {
    title: 'Flickr',
    steps: [
      { title: 'Browse photos', desc: 'Client loads feeds and albums; cache accelerates.', active: ['client','feed','cache'], edges: [['client','feed'], ['feed','cache']] },
      { title: 'Upload photo', desc: 'Upload to object store; metadata written.', active: ['upload','obj','write'], edges: [['client','upload'], ['upload','obj'], ['upload','write']] },
      { title: 'Photo pages', desc: 'Serve photo page via CDN; fetch metadata from store.', active: ['cdn','store','client'], edges: [['store','cdn'], ['cdn','client']] },
      { title: 'Search', desc: 'Index powers search and discovery.', active: ['search','index','catalog'], edges: [['client','search'], ['search','index'], ['index','catalog']] },
      { title: 'Comments and favorites', desc: 'Interactions stored; notifications sent.', active: ['comments','fanout','notify'], edges: [['client','comments'], ['comments','fanout'], ['fanout','notify']] },
      { title: 'Moderation', desc: 'Reports and safety actions applied.', active: ['reports','safety','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  imgur: {
    title: 'Imgur',
    steps: [
      { title: 'Browse gallery', desc: 'Client loads gallery feed; ranking selects posts.', active: ['client','feed','rank'], edges: [['client','feed'], ['feed','rank']] },
      { title: 'Upload image', desc: 'Upload to object store; metadata written.', active: ['upload','obj','write'], edges: [['client','upload'], ['upload','obj'], ['upload','write']] },
      { title: 'CDN serve', desc: 'CDN serves media at scale.', active: ['cdn','obj','client'], edges: [['obj','cdn'], ['cdn','client']] },
      { title: 'Votes and comments', desc: 'Votes/comments stored; feed updates.', active: ['comments','store','feed'], edges: [['client','comments'], ['comments','store'], ['store','feed']] },
      { title: 'Notifications', desc: 'Fanout sends notifications for replies/mentions.', active: ['fanout','notify','client'], edges: [['store','fanout'], ['fanout','notify'], ['notify','client']] },
      { title: 'Safety', desc: 'Abuse checks and reports processed.', active: ['safety','reports','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  tumblr: {
    title: 'Tumblr',
    steps: [
      { title: 'Dashboard feed', desc: 'Client loads dashboard; ranking and cache applied.', active: ['client','feed','rank'], edges: [['client','feed'], ['feed','rank']] },
      { title: 'Create post', desc: 'Post written to store and indexed.', active: ['write','store','index'], edges: [['client','write'], ['write','store'], ['store','index']] },
      { title: 'Media upload', desc: 'Uploads stored and served via CDN.', active: ['upload','obj','cdn'], edges: [['client','upload'], ['upload','obj'], ['obj','cdn']] },
      { title: 'Reblogs', desc: 'Fanout updates followers feeds.', active: ['fanout','feed','notify'], edges: [['store','fanout'], ['fanout','feed'], ['fanout','notify']] },
      { title: 'Messages', desc: 'Chat messages delivered in realtime.', active: ['chat','stream','realtime'], edges: [['client','chat'], ['chat','stream'], ['stream','realtime']] },
      { title: 'Moderation', desc: 'Reports reviewed and actions logged.', active: ['reports','safety','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  'hive-social': {
    title: 'Hive Social',
    steps: [
      { title: 'Home feed', desc: 'Client loads feed; ranking selects posts.', active: ['client','feed','rank'], edges: [['client','feed'], ['feed','rank']] },
      { title: 'Post content', desc: 'Post written to store; media uploaded.', active: ['write','store','upload'], edges: [['client','write'], ['write','store'], ['client','upload']] },
      { title: 'Media delivery', desc: 'CDN serves media from object store.', active: ['obj','cdn','client'], edges: [['upload','obj'], ['obj','cdn'], ['cdn','client']] },
      { title: 'Notifications', desc: 'Fanout sends notifications for interactions.', active: ['fanout','notify','client'], edges: [['store','fanout'], ['fanout','notify'], ['notify','client']] },
      { title: 'Search', desc: 'Index powers search and discovery.', active: ['search','index','store'], edges: [['client','search'], ['search','index'], ['index','store']] },
      { title: 'Safety', desc: 'Reports and abuse checks processed.', active: ['reports','safety','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  lemon8: {
    title: 'Lemon8',
    steps: [
      { title: 'Discover feed', desc: 'Client loads discovery feed; ranking and recos applied.', active: ['client','feed','recos'], edges: [['client','feed'], ['feed','recos']] },
      { title: 'Create post', desc: 'Post metadata written; media uploaded.', active: ['write','store','upload'], edges: [['client','write'], ['write','store'], ['client','upload']] },
      { title: 'Media serving', desc: 'Object store + CDN deliver media.', active: ['obj','cdn','client'], edges: [['upload','obj'], ['obj','cdn'], ['cdn','client']] },
      { title: 'Comments', desc: 'Comments stored; fanout updates.', active: ['comments','fanout','notify'], edges: [['client','comments'], ['comments','fanout'], ['fanout','notify']] },
      { title: 'Search', desc: 'Index powers search and hashtags.', active: ['search','index','store'], edges: [['client','search'], ['search','index'], ['index','store']] },
      { title: 'Moderation', desc: 'Safety checks and reports handled.', active: ['safety','reports','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  koo: {
    title: 'Koo',
    steps: [
      { title: 'Timeline', desc: 'Client loads timeline; ranking and cache used.', active: ['client','feed','cache'], edges: [['client','feed'], ['feed','cache']] },
      { title: 'Create post', desc: 'Post written to store and indexed.', active: ['write','store','index'], edges: [['client','write'], ['write','store'], ['store','index']] },
      { title: 'Notifications', desc: 'Fanout sends notifications for mentions/replies.', active: ['fanout','notify','client'], edges: [['store','fanout'], ['fanout','notify'], ['notify','client']] },
      { title: 'Search', desc: 'Index powers search and discovery.', active: ['search','index','store'], edges: [['client','search'], ['search','index'], ['index','store']] },
      { title: 'Messages', desc: 'Chat delivered via realtime stream.', active: ['chat','stream','realtime'], edges: [['client','chat'], ['chat','stream'], ['stream','realtime']] },
      { title: 'Moderation', desc: 'Reports reviewed and actions stored.', active: ['reports','safety','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  sharechat: {
    title: 'ShareChat',
    steps: [
      { title: 'Feed', desc: 'Client loads vernacular feed; recos and ranking applied.', active: ['client','feed','recos'], edges: [['client','feed'], ['feed','recos']] },
      { title: 'Create post', desc: 'Post written; media uploaded.', active: ['write','store','upload'], edges: [['client','write'], ['write','store'], ['client','upload']] },
      { title: 'Media delivery', desc: 'CDN serves media from object store.', active: ['obj','cdn','client'], edges: [['upload','obj'], ['obj','cdn'], ['cdn','client']] },
      { title: 'Comments & likes', desc: 'Interactions stored; notifications sent.', active: ['comments','fanout','notify'], edges: [['client','comments'], ['comments','fanout'], ['fanout','notify']] },
      { title: 'Search', desc: 'Index powers search and hashtags.', active: ['search','index','store'], edges: [['client','search'], ['search','index'], ['index','store']] },
      { title: 'Safety', desc: 'Abuse checks and reports processed.', active: ['safety','reports','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  moj: {
    title: 'Moj',
    steps: [
      { title: 'Short-video feed', desc: 'Client loads feed; ranking selects videos.', active: ['client','feed','rank'], edges: [['client','feed'], ['feed','rank']] },
      { title: 'Upload video', desc: 'Upload stored; transcoding pipeline runs.', active: ['upload','obj','transcode'], edges: [['client','upload'], ['upload','obj'], ['obj','transcode']] },
      { title: 'CDN playback', desc: 'CDN serves video segments.', active: ['cdn','obj','client'], edges: [['obj','cdn'], ['cdn','client']] },
      { title: 'Engagement', desc: 'Likes/comments stored; notifications.', active: ['comments','fanout','notify'], edges: [['client','comments'], ['comments','fanout'], ['fanout','notify']] },
      { title: 'Creator tools', desc: 'Analytics and payouts tracked.', active: ['analytics','ledger','store'], edges: [['store','analytics'], ['analytics','ledger'], ['ledger','store']] },
      { title: 'Safety', desc: 'Moderation and reports handled.', active: ['reports','safety','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  josh: {
    title: 'Josh',
    steps: [
      { title: 'Video feed', desc: 'Client loads feed; ranking selects videos.', active: ['client','feed','rank'], edges: [['client','feed'], ['feed','rank']] },
      { title: 'Upload', desc: 'Upload to object store; transcode pipeline prepares playback.', active: ['upload','obj','transcode'], edges: [['client','upload'], ['upload','obj'], ['obj','transcode']] },
      { title: 'Playback', desc: 'CDN delivers video segments.', active: ['cdn','obj','client'], edges: [['obj','cdn'], ['cdn','client']] },
      { title: 'Engagement', desc: 'Likes/comments stored; notifications sent.', active: ['comments','fanout','notify'], edges: [['client','comments'], ['comments','fanout'], ['fanout','notify']] },
      { title: 'Search', desc: 'Index powers search and discovery.', active: ['search','index','store'], edges: [['client','search'], ['search','index'], ['index','store']] },
      { title: 'Safety', desc: 'Reports and moderation actions stored.', active: ['reports','safety','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  },

  chingari: {
    title: 'Chingari',
    steps: [
      { title: 'Video feed', desc: 'Client loads feed; ranking selects videos.', active: ['client','feed','rank'], edges: [['client','feed'], ['feed','rank']] },
      { title: 'Upload', desc: 'Upload to object store; transcode pipeline prepares playback.', active: ['upload','obj','transcode'], edges: [['client','upload'], ['upload','obj'], ['obj','transcode']] },
      { title: 'Playback', desc: 'CDN delivers video segments.', active: ['cdn','obj','client'], edges: [['obj','cdn'], ['cdn','client']] },
      { title: 'Engagement', desc: 'Likes/comments stored; notifications sent.', active: ['comments','fanout','notify'], edges: [['client','comments'], ['comments','fanout'], ['fanout','notify']] },
      { title: 'Creator earnings', desc: 'Earnings tracked in ledger; payouts triggered.', active: ['ledger','payouts','store'], edges: [['store','ledger'], ['ledger','payouts'], ['payouts','store']] },
      { title: 'Safety', desc: 'Reports and moderation actions stored.', active: ['reports','safety','store'], edges: [['client','reports'], ['reports','safety'], ['safety','store']] }
    ]
  }
};

export function flowForSystem(sys) {
  if (!sys) return null;
  const id = sys.id;
  return FLOWS[id] || null;
}
