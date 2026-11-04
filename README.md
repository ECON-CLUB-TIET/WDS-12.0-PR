# Wolf of Dalal Street (WDS 12.0) — ECON Club

Official website and team registration portal for **Wolf of Dalal Street (WDS 12.0)**, the flagship live stock-market simulation event organized by **ECON Club, Thapar Institute of Engineering & Technology (TIET)**.

Designed around a *Money Heist* aesthetic, the site blends a single-page event showcase with a dedicated team registration flow backed by **Supabase** (PostgreSQL + Row Level Security + Storage).

---

## Table of Contents

- [Features & Sections](#features--sections)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Environment Variables](#2-environment-variables)
  - [3. Database Setup (Supabase)](#3-database-setup-supabase)
  - [4. Run the Frontend](#4-run-the-frontend)
- [Database Schema & Security Rules](#database-schema--security-rules)
- [Gallery Storage](#gallery-storage)
- [Available Scripts](#available-scripts)

---

## Features & Sections

- **Unified Heist Design System:** Shared design tokens (`--wds-red`, `--wds-black`, `Bebas Neue` display typography, `Inter` body copy) with smooth gradient section seams and a fixed glassmorphism navbar featuring both ECON Club and WDS logos.
- **Hero (`Hero.jsx`):** Full-viewport landing banner with desktop and mobile heist artwork, primary CTAs, and quick navigation.
- **Event Overview (`EventOverview.jsx`):** Scroll-revealed breakdown of the simulation (*The Plan*, *How the Heist Unfolds*, and *Why Join the Crew*), complete with animated falling `₹` banknotes and glitch typography.
- **Event Timeline (`Timeline.jsx`):** Alternating vertical timeline covering Registration, Speaker Session, and Main Trading Day.
- **Photo Gallery (`Gallery.jsx`):** Infinite pause-on-hover marquee and keyboard-accessible lightbox (`Esc`, `←`, `→`) streaming event photographs directly from a public Supabase Storage bucket (`Gallery Photos`).
- **Contact (`Contact.jsx`):** Interactive "Secure Line" communication channels (Email, Call, WhatsApp, Instagram) with hover scan-line effects and a live ticker.
- **Team Registration (`#/register` — `Register.jsx`):**
  - Supports teams of **1 to 4 members** (Member 1 is designated as the Team Leader).
  - Client-side validation for team name, member names, phone numbers, and duplicate roll numbers.
  - Atomic batch insert into Supabase (`public.registrations`) where each team member is stored as an individual row linked by a shared `team_id`.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 + Vite 8 |
| **Styling** | Custom Scoped CSS + Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Icons & Fonts** | `react-icons` (`fa`), Google Fonts (`Bebas Neue`, `Inter`) |
| **Backend / Database** | Supabase (PostgreSQL 15, PostgREST API, Row Level Security) |
| **Media Hosting** | Supabase Storage (`Gallery Photos` public bucket) |

---

## Repository Structure

```text
WDS-12.0-PR/
├── BACKEND/
│   ├── README.md                                          # Backend-specific instructions
│   └── supabase/
│       ├── config.toml                                    # Supabase CLI configuration
│       ├── migrations/
│       │   └── 20261104000000_create_registrations.sql    # Schema, triggers, constraints & RLS
│       └── queries.sql                                    # Organiser SQL queries (team summary)
│
├── FRONTEND/
│   ├── index.html                                         # App entry HTML
│   ├── package.json                                       # Frontend dependencies & scripts
│   ├── vite.config.js                                     # Vite configuration
│   ├── .env.example                                       # Template for Supabase env variables
│   └── src/
│       ├── main.jsx                                       # React DOM root
│       ├── App.jsx                                        # Main layout & `#/register` hash router
│       ├── index.css                                      # Global tokens, reset & section seams
│       ├── App.css                                        # Navbar & Hero styles
│       ├── assets/                                        # Logos (Econ(White).png, wdslogo.png) & backgrounds
│       └── components/
│           ├── Header.jsx                                 # Fixed dual-logo navbar + mobile drawer
│           ├── Hero.jsx                                   # Hero section
│           ├── EventOverview.jsx / EventOverview.css      # Event overview & perks
│           ├── Timeline.jsx                               # 3-phase vertical timeline
│           ├── Gallery.jsx / Gallery.css                  # Marquee gallery & lightbox
│           ├── Contact.jsx / Contact.css                  # Contact cards & ticker
│           └── Register.jsx / Register.css                # 1–4 member team registration page
│
└── README.md                                              # Project documentation
```

---

## Getting Started

### 1. Prerequisites

- **Node.js** `v18+` and **npm**
- A **Supabase** project (free tier works out of the box)

### 2. Environment Variables

Copy `.env.example` to `.env` inside the `FRONTEND/` directory and fill in your Supabase project URL and publishable/anon key:

```bash
cd FRONTEND
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-or-publishable-key>
```

> **Security Note:** Only place your public `anon` / `publishable` key in `FRONTEND/.env`. Never expose the `service_role` key in frontend code.

### 3. Database Setup (Supabase)

Apply the SQL migration in `BACKEND/supabase/migrations/20261104000000_create_registrations.sql`:

- **Via Supabase Dashboard (Recommended):**
  1. Open your Supabase project → **SQL Editor** → **New query**.
  2. Paste the contents of `BACKEND/supabase/migrations/20261104000000_create_registrations.sql` and click **Run**.
- **Via Supabase CLI:**
  ```bash
  cd BACKEND
  npx supabase db push --remote "<your-session-pooler-connection-string>"
  ```

### 4. Run the Frontend

```bash
cd FRONTEND
npm install
npm run dev
```

Open the local URL shown in the terminal (default `http://localhost:5173`). Navigate to `http://localhost:5173/#/register` (or click **Register Now**) to test the registration flow.

---

## Database Schema & Security Rules

The `public.registrations` table stores **one row per team member**, grouped by `team_id`:

| Column | Type | Constraints / Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary key (`gen_random_uuid()`) |
| `created_at` | `timestamptz` | Timestamp (`now()`) |
| `team_id` | `uuid` | Shared UUID across all members of the same team |
| `team_name` | `text` | 2–60 chars; unique across teams (case-insensitive) |
| `member_name` | `text` | 2–100 chars; member's full name |
| `phone` | `text` | 10–15 digits (`^[0-9+\-\s]{10,15}$`) |
| `roll_no` | `text` | Globally unique (`upper(btrim(roll_no))`) so a student cannot join multiple teams |
| `is_leader` | `boolean` | `true` for Member 01 (Team Leader); partial unique index ensures 1 leader per team |

**Database-level enforcement (`enforce_team_rules` trigger + RLS):**
- Maximum **4 members** per `team_id` (`TEAM_FULL`).
- `team_name` cannot be claimed by another `team_id` (`TEAM_NAME_TAKEN`).
- **Row Level Security (RLS)** is enabled: the `anon` role only has `INSERT` permission and cannot `SELECT`, `UPDATE`, or `DELETE` rows.
- Organisers can view a consolidated team list anytime by running `BACKEND/supabase/queries.sql` in the Supabase SQL Editor.

---

## Gallery Storage

Event photos in `Gallery.jsx` are loaded dynamically from a public Supabase Storage bucket named **`Gallery Photos`**:

```text
${VITE_SUPABASE_URL}/storage/v1/object/public/Gallery%20Photos/IMG_0015.JPG ... IMG_0040.JPG
```

Any image that fails to load is automatically filtered out on the client so broken cards never appear in the marquee.

---

## Available Scripts

Run these inside the `FRONTEND/` directory:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build production bundle into `FRONTEND/dist/` |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint across the frontend source |

---

© 2026 **ECON Club**, Thapar Institute of Engineering & Technology. All rights reserved.

