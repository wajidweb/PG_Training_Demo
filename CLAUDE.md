# CLAUDE.md — PG Training Demo Website

## Project Overview

A conversion-optimized service-selling platform for **PG Training** (professional development courses for higher education staff). The demo showcases a full buying experience: landing page → AI chatbot → dynamic pricing → cart → checkout.

Client: Dr. Anton | Timeline: Demo in 1–3 days

---

## Architecture

This project uses a **frontend/backend split architecture**:

```
pg-training-demo/
├── frontend/          ← Next.js 14 (App Router)
│   └── src/
│       ├── app/              ← Next.js pages
│       ├── components/       ← React components
│       ├── data/             ← Static data (for development)
│       ├── lib/              ← Utilities + API client
│       ├── store/            ← Zustand cart store
│       └── types/            ← TypeScript interfaces
│
└── backend/           ← Express.js + MongoDB
    └── src/
        ├── models/           ← Mongoose models
        ├── routes/           ← API routes
        ├── middleware/       ← Express middleware
        ├── seed/             ← Database seed script
        └── lib/               ← Utilities
```

---

## Tech Stack

### Frontend

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | Next.js 14 (App Router) | Fast builds, SSR, file-based routing |
| Language | TypeScript | Type safety across data models |
| Styling | Tailwind CSS | Rapid UI development |
| Components | shadcn/ui | Pre-built accessible components |
| Animations | Framer Motion | Smooth scroll, transitions, chatbot open/close |
| AI Chatbot | OpenAI GPT-4o-mini | Fast, cheap, intelligent sales assistant |
| State (Cart) | Zustand | Lightweight, no boilerplate |
| Icons | Lucide React | Consistent icon set |
| Fonts | Google Fonts (Inter + Playfair Display) | Professional look |

### Backend

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | Express.js | Minimal, flexible Node.js framework |
| Language | TypeScript | Type safety |
| Database | MongoDB Atlas | NoSQL for flexible course data |
| ODM | Mongoose | MongoDB object modeling |
| AI | OpenAI SDK | Chatbot integration |
| Validation | express-validator | Request validation |

---

## Environment Variables

### Frontend (.env.local)
```bash
OPENAI_API_KEY=your-openai-api-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (.env)
```bash
PORT=5000
MONGODB_URI=your-mongodb-atlas-uri-here
OPENAI_API_KEY=your-openai-api-key-here
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

---

## Development Commands

### Frontend
```bash
cd frontend
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build
npm run lint       # ESLint check
```

### Backend
```bash
cd backend
npm run dev       # Start dev server at localhost:5000
npm run build     # TypeScript compilation
npm run seed      # Seed MongoDB with course data
```

---

## API Endpoints

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all active courses |
| GET | `/api/courses/:slug` | Get course by slug |
| GET | `/api/courses/path/:pathId` | Get courses by training path |

### Training Paths
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/paths` | Get all paths with courses |
| GET | `/api/paths/:id` | Get single path with courses |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/:orderNumber` | Get order by number |

### Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message to AI chatbot |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

---

## Data Models

### Course
```typescript
interface ICourse {
  id: string
  slug: string
  code: string
  title: string
  shortDescription: string
  fullDescription: string
  outcomes: string[]
  targetAudience: string[]
  deliveryMethods: IDeliveryMethod[]
  upcomingDates: string[]
  pathId: string
  pricing: ICoursePricing
  offers: IOfferSet
  isActive: boolean
}
```

### TrainingPath
```typescript
interface ITrainingPath {
  id: string
  title: string
  subtitle: string
  description: string
  color: string
  bgColor: string
  icon: string
  courseIds: string[]
  isActive: boolean
}
```

### Order
```typescript
interface IOrder {
  orderNumber: string
  contact: IOrderContact
  items: IOrderItem[]
  subtotal: number
  total: number
  status: 'pending' | 'confirmed' | 'cancelled'
  paymentMethod: string
  notes?: string
}
```

---

## Pricing Logic

```
finalPrice = basePrice
           × participants
           × deliveryMultiplier
           × (1 - volumeDiscount)
           × (1 - offerDiscount)
```

### Delivery Method Multipliers
| Method | Multiplier |
|--------|-----------|
| Online Instructor-Led | 1.0x |
| Online Self-Paced | 0.75x |
| Onsite | 1.3x |

### Volume Discounts
| Participants | Discount |
|-------------|---------|
| 1–4 | 0% |
| 5–9 | 10% |
| 10–19 | 15% |
| 20+ | 20% |

---

## Design System

### Colors (Tailwind config)
```
Primary:    #1B4F72  (deep navy blue — professional)
Secondary:  #2E86C1  (medium blue — links, accents)
Accent:     #F39C12  (amber/gold — CTAs, highlights)
Success:    #27AE60  (green — confirmations)
Danger:     #E74C3C  (red — limited time urgency)
Light:      #F8F9FA  (near-white background)
Dark:       #1A1A2E  (near-black text)
```

### Typography
- Headings: Playfair Display (serif — authoritative, academic)
- Body: Inter (sans-serif — clean, readable)
- Code/prices: JetBrains Mono

---

## Key Decisions & Constraints

1. **MongoDB Atlas for demo** — data is stored in MongoDB, seeded from static data files.
2. **Claude Haiku for chatbot** — cheapest + fastest Claude model. System prompt enforces sales-only behavior.
3. **Pricing is placeholder** — actual prices were not provided by client. Structure is real, numbers are illustrative.
4. **Cart persists in localStorage** via Zustand `persist` middleware.
5. **Mobile-first** — all components built mobile-first, then enhanced for desktop.

---

## Build Phases

### Phase 1 — Demo (completed)
- [x] CLAUDE.md written
- [x] Next.js project initialized
- [x] Data layer populated from PDFs
- [x] Home page (8 blocks)
- [x] One course landing page (Cultural Integration — richest content)
- [x] AI chatbot widget + Claude API route
- [x] Pricing calculator
- [x] Cart (Zustand + CartDrawer)
- [x] Checkout UI (mock — no real payment)

### Phase 2 — Production
- [ ] All course landing pages
- [ ] PGI internship section
- [ ] Real Stripe payment integration
- [ ] Admin panel (content management)
- [ ] User accounts + order history
- [ ] Email confirmations
- [ ] Multi-company support (PGI + PG Training)