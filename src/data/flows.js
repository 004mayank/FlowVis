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
  }
};

export function flowForSystem(sys) {
  if (!sys) return null;
  const id = sys.id;
  return FLOWS[id] || null;
}
