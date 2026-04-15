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
