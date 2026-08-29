# Eventra

> A modern, all-in-one platform for discovering, creating, and managing events — from intimate meetups to large-scale music festivals and conferences.

---

## 1. Vision

Most event platforms feel like glorified ticket forms. Eventara aims to feel **alive** — visually rich, fast, social, and smart. The goal is a product that organizers *love to use* and attendees *love to browse*, powered by real-time interactivity, AI assistance, and a UI that doesn't feel like a template. Built to serve every kind of event — from big music nights (Aluth Kalawak, Nada Gama, Yogeshawari-style shows) to weddings, conferences, and community meetups.

---

## 2. Core Feature Set

### 2.1 For Attendees
- 🔍 **Smart Discovery Feed** — personalized "For You" feed based on location, past interests, and social graph (friends attending)
- 🗺️ **Interactive Map View** — browse events on a live map with clustering, filters (date, category, price, distance)
- 🎟️ **Seamless Ticketing** — multi-tier tickets, group bookings, waitlists, dynamic QR/NFC check-in
- 💬 **Social Layer** — comment threads, "who's going" avatars, event chat rooms, invite-a-friend
- 📅 **Smart Calendar Sync** — one-click add to Google/Apple/Outlook calendar with auto reminders
- 🔔 **Real-time Notifications** — price drops, lineup changes, last-minute updates, "starting soon" pings
- ⭐ **Post-event Reviews & Photo Wall** — crowd-sourced photos/videos, ratings feed into recommendations
- ♿ **Accessibility Filters** — wheelchair access, sign language, sensory-friendly tags

### 2.2 For Organizers
- 🛠️ **No-code Event Builder** — drag-and-drop landing page builder with live preview
- 💳 **Integrated Payments & Payouts** — Stripe Connect, multi-currency, coupon/promo engine
- 📊 **Live Analytics Dashboard** — real-time ticket sales, funnel drop-off, traffic sources, heatmaps
- 👥 **Team & Role Management** — invite co-organizers, volunteers, check-in staff with scoped permissions
- 📣 **Built-in Marketing Tools** — email campaigns, auto social-media graphics, referral tracking links
- 🧾 **Custom Registration Forms** — conditional logic, file uploads, waivers/e-signatures
- 🎫 **Check-in App** — offline-capable mobile scanner with duplicate/fraud detection
- 🤝 **Sponsor & Vendor Portal** — booth management, sponsor logo placement, lead capture for exhibitors

### 2.3 Platform-wide / Differentiating Features
- 🤖 **AI Event Assistant** — chatbot that helps attendees find events ("find me a jazz night this weekend under $30") and helps organizers write descriptions, pick pricing, and forecast attendance
- 🧠 **Smart Recommendations Engine** — collaborative filtering + content-based hybrid model
- 🌐 **Hybrid & Virtual Events** — livestream integration (or embed), virtual expo booths, breakout rooms
- 🪙 **NFT/Digital Collectible Tickets (optional module)** — proof-of-attendance collectibles
- 🌗 **Dark/Light Adaptive Theme** with per-event dynamic color theming (extracts palette from event cover image)
- 🗣️ **Multi-language & Localization** — auto-translate event listings
- 📈 **Organizer Reputation & Verified Badge System**
- 🧩 **Public API & Widget Embeds** — organizers can embed a "Buy Tickets" widget on their own site

---

## 3. Modern UI/UX Direction (Not Boring 🚀)

The site should avoid generic "SaaS card grid" clichés. Direction:

- **Bento-grid dynamic homepage** — asymmetric cards of varying sizes instead of uniform grids
- **Motion-first design** — scroll-triggered animations, smooth page transitions (Framer Motion / GSAP), micro-interactions on hover/tap
- **Bold typography** — oversized display fonts for hero sections, mixed with clean sans-serif body text
- **Glassmorphism + soft neumorphism accents** used sparingly for cards/modals
- **Dynamic gradients per event category** (music = neon purple/pink, tech = electric blue, food = warm amber, etc.)
- **Custom cursor & scroll-based parallax** on landing/discovery pages
- **Skeleton loaders & optimistic UI** — no blank white screens ever
- **Command palette (⌘K)** for power users/organizers to jump anywhere instantly
- **Dark mode as a first-class citizen**, not an afterthought
- **Micro-copy with personality** — friendly, human tone instead of corporate-speak
- **3D/interactive hero elements** (e.g., Three.js/Spline confetti, floating ticket stubs) for the landing page

---

## 4. Suggested Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (React) + TypeScript, Tailwind CSS, Framer Motion |
| UI Components | shadcn/ui + custom design system |
| Backend | Node.js (NestJS) or Django REST Framework |
| Database | PostgreSQL (core data) + Redis (caching/sessions) |
| Search | Meilisearch or Elasticsearch (event discovery) |
| Real-time | WebSockets / Socket.io (chat, live notifications) |
| Payments | Stripe Connect |
| Media Storage | AWS S3 / Cloudflare R2 + Cloudflare Images for optimization |
| Maps | Mapbox GL JS |
| AI Layer | Claude API (event assistant, content generation, recommendations) |
| Auth | Auth.js / Clerk (OAuth + email + magic link) |
| Infra | Docker, CI/CD via GitHub Actions, hosted on Vercel/AWS |
| Analytics | PostHog or Mixpanel |
| Mobile (later) | React Native / Expo (shared design tokens with web) |

---

## 5. System Architecture (High-Level)

```
┌─────────────┐      ┌──────────────┐      ┌────────────────┐
│   Web App   │◄────►│   API Layer  │◄────►│   PostgreSQL    │
│ (Next.js)   │      │  (REST/GQL)  │      │   + Redis Cache │
└─────────────┘      └──────┬───────┘      └────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                     ▼
 ┌─────────────┐     ┌──────────────┐     ┌────────────────┐
 │  Payments   │     │  Search/AI   │     │  Notifications │
 │  (Stripe)   │     │  (Meilisearch│     │  (Email/Push/  │
 │             │     │   + Claude)  │     │   WebSocket)   │
 └─────────────┘     └──────────────┘     └────────────────┘
```

---

## 6. Database Entities (Core)

- **User** (attendee, organizer, admin roles)
- **Event** (title, description, media, location, category, tags, status)
- **TicketType** (price, quantity, tier, sale window)
- **Order / Ticket** (QR code, check-in status, owner)
- **Venue**
- **Organization / Team**
- **Review / Comment**
- **Notification**
- **Promo Code**

---

## 7. Development Roadmap

### Phase 1 — MVP (4–6 weeks)
- [ ] Auth & user profiles
- [ ] Event creation (basic form)
- [ ] Event discovery feed + search/filter
- [ ] Ticketing + Stripe checkout
- [ ] Basic organizer dashboard
- [ ] QR check-in

### Phase 2 — Engagement (4 weeks)
- [ ] Social features (comments, "who's going")
- [ ] Notifications (email + push)
- [ ] Calendar sync
- [ ] Reviews & photo wall
- [ ] Map view

### Phase 3 — Growth & Intelligence (4–6 weeks)
- [ ] AI Event Assistant
- [ ] Recommendation engine
- [ ] Marketing tools (campaigns, referral links)
- [ ] Analytics dashboard v2
- [ ] Multi-language support

### Phase 4 — Scale & Polish
- [ ] Hybrid/virtual event support
- [ ] Public API + embeddable widgets
- [ ] Mobile app (React Native)
- [ ] Sponsor/vendor portal
- [ ] Performance & accessibility audit (WCAG 2.1 AA)

---

## 8. Monetization Ideas
- Ticketing service fee (% + flat fee per ticket)
- Organizer subscription tiers (Free / Pro / Enterprise) unlocking advanced analytics, branding removal, priority support
- Featured/promoted event listings
- Sponsor placement fees
- API access tiers for enterprise integrations

---

## 9. Success Metrics
- Time-to-publish an event (organizer efficiency)
- Ticket conversion rate on event pages
- DAU/MAU on discovery feed
- Check-in speed & error rate
- Organizer retention (repeat events created)

---

## 10. Getting Started (to fill in once repo is scaffolded)

```bash
git clone https://github.com/<your-username>/eventara.git
cd eventara
pnpm install
pnpm dev
```

Environment variables, contribution guidelines, and folder structure to be documented as the project scaffolds.

---

## 11. License
MIT (or your preferred license)
