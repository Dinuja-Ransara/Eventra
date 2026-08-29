/* ============================================
   EVENTARA — Mock Data Layer
   (Simulates an API response for the prototype)
   ============================================ */

const EVENTS = [
  {
    id: "aluth-kalawak-2026",
    title: "Aluth Kalawak — New Year Music Fest",
    category: "music",
    grad: "grad-music",
    image: "sources/aluth kalawak.jpg",
    date: "2026-04-13",
    time: "6:00 PM",
    venue: "Viharamahadevi Open Air Theatre, Colombo",
    city: "Colombo",
    price: 2500,
    currency: "LKR",
    live: false,
    featured: true,
    size: "lg",
    attendees: 4200,
    rating: 4.8,
    reviewsCount: 312,
    description: "Ring in the Sinhala & Tamil New Year with Colombo's biggest open-air music night. Aluth Kalawak brings together the island's most loved live bands for one unforgettable evening of nonstop music, dance and celebration under the stars.",
    lineup: [
      { name: "Sanuka & The Wayo", role: "Headline Act" },
      { name: "Bathiya & Santhush", role: "Special Guest" },
      { name: "Chalana Wijesuriya", role: "Live Band" },
      { name: "DJ Umara", role: "Opening Set" }
    ],
    tiers: [
      { name: "General Standing", price: 2500, desc: "Access to main grounds", left: 800 },
      { name: "VIP Lounge", price: 6500, desc: "Elevated viewing deck + bar", left: 120 },
      { name: "Backstage Pass", price: 15000, desc: "Meet the artists + front row", left: 18 }
    ]
  },
  {
    id: "nada-gama-2026",
    title: "Nada Gama — Village Sound Sessions",
    category: "music",
    grad: "grad-music",
    image: "sources/nadagama.png",
    date: "2026-08-02",
    time: "5:30 PM",
    venue: "Nelum Pokuna Grounds, Colombo",
    city: "Colombo",
    price: 1800,
    currency: "LKR",
    live: true,
    featured: true,
    size: "md",
    attendees: 2100,
    rating: 4.6,
    reviewsCount: 154,
    description: "Nada Gama is a celebration of roots — folk rhythms, baila, and acoustic sessions blended with modern live sound. An intimate outdoor gathering for lovers of authentic Sri Lankan music.",
    lineup: [
      { name: "Sunil Edirisinghe", role: "Headline Act" },
      { name: "Kasun Kalhara", role: "Live Band" },
      { name: "The Gypsies", role: "Support Act" }
    ],
    tiers: [
      { name: "Ground Pass", price: 1800, desc: "General access", left: 400 },
      { name: "Reserved Seating", price: 4200, desc: "Numbered seats close to stage", left: 60 }
    ]
  },
  {
    id: "yogeshawari-night-2026",
    title: "Yogeshawari — A Night of Devotion & Sound",
    category: "music",
    grad: "grad-art",
    image: "sources/yogeshwari.png",
    date: "2026-05-22",
    time: "7:00 PM",
    venue: "BMICH, Colombo",
    city: "Colombo",
    price: 3000,
    currency: "LKR",
    live: false,
    featured: true,
    size: "sm",
    attendees: 1500,
    rating: 4.9,
    reviewsCount: 98,
    description: "Yogeshawari blends devotional music with contemporary orchestration — a soulful evening of classical vocals, strings, and immersive lighting design inside BMICH's main hall.",
    lineup: [
      { name: "Yohani", role: "Headline Vocalist" },
      { name: "Colombo String Ensemble", role: "Orchestra" }
    ],
    tiers: [
      { name: "Balcony", price: 3000, desc: "Upper level seating", left: 220 },
      { name: "Floor Premium", price: 7000, desc: "Front floor seating", left: 45 }
    ]
  },
  {
    id: "code-colombo-2026",
    title: "Code Colombo — Dev Summit",
    category: "tech",
    grad: "grad-tech",
    image: "sources/code colombo.jpg",
    date: "2026-09-10",
    time: "9:00 AM",
    venue: "Shangri-La Colombo",
    city: "Colombo",
    price: 8000,
    currency: "LKR",
    live: false,
    featured: true,
    size: "md",
    attendees: 900,
    rating: 4.7,
    reviewsCount: 76,
    description: "A full day of talks, workshops and networking for Sri Lanka's builders — covering AI, cloud infrastructure, and product engineering from teams shipping at scale.",
    lineup: [
      { name: "Nadeesha Cabral", role: "Keynote Speaker" },
      { name: "99X Technology", role: "Workshop Host" }
    ],
    tiers: [
      { name: "Standard Pass", price: 8000, desc: "Full day access", left: 300 },
      { name: "Workshop Bundle", price: 14000, desc: "Includes hands-on labs", left: 80 }
    ]
  },
  {
    id: "colombo-street-food-2026",
    title: "Colombo Street Food Carnival",
    category: "food",
    grad: "grad-food",
    image: "sources/colombo strrt food.png",
    date: "2026-06-14",
    time: "4:00 PM",
    venue: "Galle Face Green",
    city: "Colombo",
    price: 500,
    currency: "LKR",
    live: false,
    featured: false,
    size: "sm",
    attendees: 6000,
    rating: 4.5,
    reviewsCount: 210,
    description: "Over 80 vendors, live cooking stations, and sunset views at Galle Face — the island's biggest street food gathering, with something for every craving.",
    lineup: [],
    tiers: [
      { name: "Entry Pass", price: 500, desc: "Entry + 1 free drink token", left: 5000 }
    ]
  },
  {
    id: "canvas-art-expo-2026",
    title: "Canvas — Contemporary Art Expo",
    category: "art",
    grad: "grad-art",
    image: "sources/canvas contemporary art expo.jpg",
    date: "2026-07-05",
    time: "10:00 AM",
    venue: "Lionel Wendt Art Centre",
    city: "Colombo",
    price: 1000,
    currency: "LKR",
    live: false,
    featured: false,
    size: "sm",
    attendees: 700,
    rating: 4.4,
    reviewsCount: 44,
    description: "A curated showcase of emerging Sri Lankan visual artists, featuring installations, live painting sessions, and gallery talks.",
    lineup: [],
    tiers: [
      { name: "Day Pass", price: 1000, desc: "Full day gallery access", left: 500 }
    ]
  },
  {
    id: "founders-forum-2026",
    title: "Founders Forum — Startup Summit",
    category: "business",
    grad: "grad-biz",
    image: "sources/founders forum startup summit.jpg",
    date: "2026-10-02",
    time: "8:30 AM",
    venue: "Cinnamon Grand, Colombo",
    city: "Colombo",
    price: 6000,
    currency: "LKR",
    live: false,
    featured: false,
    size: "sm",
    attendees: 550,
    rating: 4.6,
    reviewsCount: 39,
    description: "Founders, investors, and operators come together for a day of pitch sessions, panels, and closed-door investor meetings.",
    lineup: [],
    tiers: [
      { name: "Delegate Pass", price: 6000, desc: "Full access + lunch", left: 200 }
    ]
  },
  {
    id: "island-run-2026",
    title: "Island Run — Colombo 10K",
    category: "sports",
    grad: "grad-sport",
    image: "sources/island run.jpg",
    date: "2026-11-08",
    time: "5:00 AM",
    venue: "Independence Square, Colombo",
    city: "Colombo",
    price: 1500,
    currency: "LKR",
    live: false,
    featured: false,
    size: "sm",
    attendees: 3200,
    rating: 4.7,
    reviewsCount: 88,
    description: "An early morning 10K through Colombo's greenest routes, finishing with a beachside breakfast festival.",
    lineup: [],
    tiers: [
      { name: "Runner Bib", price: 1500, desc: "Includes race kit + medal", left: 900 }
    ]
  },
  {
    id: "eternal-vows-expo-2026",
    title: "Eternal Vows — Wedding Expo",
    category: "wedding",
    grad: "grad-wedding",
    image: "sources/eternal vows.webp",
    date: "2026-09-27",
    time: "10:00 AM",
    venue: "Waters Edge, Battaramulla",
    city: "Colombo",
    price: 300,
    currency: "LKR",
    live: false,
    featured: false,
    size: "sm",
    attendees: 1800,
    rating: 4.3,
    reviewsCount: 61,
    description: "Meet Sri Lanka's top wedding planners, photographers, and designers all under one roof — plus live fashion showcases.",
    lineup: [],
    tiers: [
      { name: "Entry Pass", price: 300, desc: "Full expo access", left: 1200 }
    ]
  }
];

const REVIEWS = [
  { name: "Dilani P.", rating: 5, text: "Best organized music night I've been to in Colombo — sound quality was incredible and the check-in was instant." },
  { name: "Kasun R.", rating: 5, text: "The VIP lounge was worth every rupee. Great views of the stage and the staff were super friendly." },
  { name: "Ishara W.", rating: 4, text: "Amazing lineup, only issue was the queues at the food stalls. Would still go again next year." },
  { name: "Nimal S.", rating: 5, text: "Loved the whole vibe — lighting, sound, crowd energy. Eventara made ticket buying so easy too." }
];

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatPrice(price, currency) {
  return `${currency} ${price.toLocaleString()}`;
}

function getEventById(id) {
  return EVENTS.find(e => e.id === id);
}

function getCategoryIcon(cat) {
  const map = {
    music: "music-2", tech: "cpu", food: "utensils-crossed",
    art: "palette", business: "briefcase", sports: "medal", wedding: "heart"
  };
  return map[cat] || "sparkles";
}