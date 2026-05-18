# 🚀 Startup Tracker

**Startup Tracker** is a full-stack web application for discovering, tracking, and managing startups in the venture capital ecosystem. Built with **Laravel**, **Inertia.js**, and **React**, it delivers a premium single-page application experience with real-time news from Hacker News, multi-dimensional data filtering, Google OAuth authentication, and a full admin dashboard.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Folder Structure](#-folder-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#️-installation--setup)
- [Running the Application](#️-running-the-application)
- [Database Seeding](#-database-seeding)
- [Feature Details](#-feature-details)
  - [Google OAuth Authentication](#1-google-oauth-authentication)
  - [Startup Explorer & Filtering](#2-startup-explorer--filtering)
  - [YCombinator News Feed](#3-ycombinator-hacker-news-feed)
  - [Bookmarking & Upvoting](#4-bookmarking--upvoting)
  - [Admin Dashboard](#5-admin-dashboard)
  - [Notifications](#6-notifications)
  - [Support Page](#7-support-page)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Authors](#-authors)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Google OAuth** | Sign in with Google via Laravel Socialite with automatic account linking |
| **Startup Directory** | Browse, search, and filter startups by week, sector, and keywords |
| **Startup Submissions** | Authenticated users can submit new startups with a rich creation form |
| **Bookmarking** | Save startups to a personal watchlist for quick access |
| **Upvoting** | Community-driven upvote system to surface the best startups |
| **News Feed** | Real-time news powered by the Hacker News Firebase API, sorted by upvotes |
| **Admin Dashboard** | Full CRUD for startups and user management with role-based access |
| **Notifications** | In-app notification system for new startups, upvotes, and account events |
| **Analytics** | Interactive funding trend charts and sector breakdown visualizations |
| **Command Palette** | Quick-search any startup with `Cmd+K` / `Ctrl+K` |
| **Support Page** | Contact form for user inquiries |
| **Two-Factor Auth** | Optional 2FA setup via Laravel Fortify |

---

## 💻 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Laravel 13.x (PHP 8.3+) |
| **Frontend** | React 19.x with TypeScript |
| **SPA Bridge** | Inertia.js v3 |
| **Styling** | Tailwind CSS v4 with custom Material Design 3 theme |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **UI Primitives** | Radix UI, Lucide Icons |
| **Auth** | Laravel Fortify + Laravel Socialite (Google OAuth) |
| **Database** | MySQL (primary) / SQLite (fallback) |
| **News API** | Hacker News Firebase API |
| **Build Tool** | Vite 8 |
| **Linting** | ESLint + Prettier |

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (SPA)                        │
│  React + Inertia.js → Pages, Components, Layouts            │
└────────────────────────────┬────────────────────────────────┘
                             │ Inertia Protocol (XHR)
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                     Laravel Backend                         │
│  Routes → Controllers → Services → Eloquent Models          │
│  Middleware: auth, admin, guest                              │
└────────────────────────────┬────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
         ┌─────────┐  ┌──────────┐  ┌─────────────────┐
         │  MySQL   │  │  Google  │  │  Hacker News    │
         │ Database │  │  OAuth   │  │  Firebase API   │
         └─────────┘  └──────────┘  └─────────────────┘
```

---

## 📁 Folder Structure

```
StartUpTracker/
│
├── app/                                # Laravel Application Logic
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   │   └── GoogleController.php       # Google OAuth redirect & callback
│   │   │   ├── AdminController.php            # Admin CRUD for startups
│   │   │   ├── AdminUserController.php        # Admin user management
│   │   │   ├── BookmarkController.php         # Toggle bookmarks
│   │   │   ├── NewsController.php             # News feed display + auto-sync
│   │   │   ├── NotificationController.php     # In-app notifications API
│   │   │   ├── StartupController.php          # Main startup CRUD + filters
│   │   │   ├── SupportController.php          # Support form handling
│   │   │   └── UpvoteController.php           # Toggle upvotes
│   │   └── Requests/
│   │       └── StoreStartupRequest.php        # Form validation rules
│   │
│   ├── Models/
│   │   ├── Bookmark.php                       # User ↔ Startup bookmark pivot
│   │   ├── FundingRound.php                   # Startup funding history
│   │   ├── NewsArticle.php                    # HN news articles
│   │   ├── Sector.php                         # Industry sector data
│   │   ├── Startup.php                        # Core startup model
│   │   ├── SupportMessage.php                 # Support form submissions
│   │   ├── TeamMember.php                     # Startup team members
│   │   └── User.php                           # User with OAuth fields
│   │
│   ├── Notifications/
│   │   ├── NewStartupAdded.php                # Alert all users of new startup
│   │   ├── NewUserSignedUp.php                # Admin alert on new user
│   │   ├── StartupSubmitted.php               # Confirm submission to creator
│   │   ├── StartupUpvoted.php                 # Notify on upvote received
│   │   ├── UserAccountDeleted.php             # Confirm account deletion
│   │   └── UserDeletedAdminAlert.php          # Admin alert on user deletion
│   │
│   ├── Policies/
│   │   └── StartupPolicy.php                  # Authorization (edit/delete own)
│   │
│   └── Services/
│       └── NewsService.php                    # Hacker News API integration
│
├── config/
│   ├── fortify.php                            # Two-factor auth config
│   ├── services.php                           # Google OAuth credentials
│   └── ...                                    # Standard Laravel configs
│
├── database/
│   ├── migrations/                            # 21 migration files
│   │   ├── create_users_table.php
│   │   ├── create_startups_table.php
│   │   ├── create_funding_rounds_table.php
│   │   ├── create_team_members_table.php
│   │   ├── create_news_articles_table.php
│   │   ├── create_sectors_table.php
│   │   ├── create_bookmarks_table.php
│   │   ├── create_upvotes_table.php
│   │   ├── add_score_to_news_articles_table.php
│   │   └── ...
│   └── seeders/
│       ├── DatabaseSeeder.php                 # Main seeder entry point
│       └── StartupTrackerSeeder.php           # Seeds startups, news, sectors
│
├── resources/
│   ├── css/
│   │   └── app.css                            # Material Design 3 theme variables
│   │
│   └── js/
│       ├── app.tsx                            # Inertia app bootstrap
│       │
│       ├── components/
│       │   ├── tracker/                       # Core tracker UI components
│       │   │   ├── command-palette.tsx         #   Cmd+K search overlay
│       │   │   ├── featured-news-card.tsx      #   Purple "Top Story" hero card
│       │   │   ├── funding-trend-card.tsx      #   Recharts funding graph
│       │   │   ├── news-card.tsx               #   Standard news article card
│       │   │   ├── sector-list.tsx             #   Sector bar visualization
│       │   │   ├── sidebar.tsx                 #   Navigation sidebar
│       │   │   ├── startup-card.tsx            #   Startup list item card
│       │   │   ├── startup-detail-modal.tsx    #   Full startup detail overlay
│       │   │   ├── top-bar.tsx                 #   Search + sector filter bar
│       │   │   └── week-selector.tsx           #   Timeline week tabs
│       │   ├── ui/                            # Radix-based UI primitives
│       │   └── ...                            # Shared app components
│       │
│       ├── layouts/
│       │   ├── tracker-layout.tsx             # Main layout (sidebar + topbar)
│       │   ├── app-layout.tsx                 # Settings layout
│       │   └── auth-layout.tsx                # Auth pages layout
│       │
│       ├── pages/
│       │   ├── startups/
│       │   │   ├── index.tsx                  # Explore Startups (home page)
│       │   │   ├── create.tsx                 # Submit new startup form
│       │   │   └── show.tsx                   # Startup detail (Inertia route)
│       │   ├── news/
│       │   │   └── index.tsx                  # News feed page
│       │   ├── admin/
│       │   │   ├── dashboard.tsx              # Admin dashboard
│       │   │   ├── startups/                  # Admin startup management
│       │   │   └── users/                     # Admin user management
│       │   ├── auth/
│       │   │   ├── login.tsx                  # Login (with Google OAuth button)
│       │   │   ├── register.tsx               # Registration
│       │   │   ├── forgot-password.tsx        # Password reset request
│       │   │   ├── reset-password.tsx         # Password reset form
│       │   │   ├── two-factor-challenge.tsx   # 2FA verification
│       │   │   └── verify-email.tsx           # Email verification
│       │   ├── settings/                      # User profile & security settings
│       │   ├── support.tsx                    # Support/contact page
│       │   └── welcome.tsx                    # Landing page
│       │
│       └── types/                             # TypeScript type definitions
│
├── routes/
│   ├── web.php                                # All HTTP routes
│   ├── settings.php                           # User settings routes
│   └── console.php                            # Artisan console routes
│
├── .env.example                               # Environment template
├── composer.json                              # PHP dependencies
├── package.json                               # Node.js dependencies
├── vite.config.ts                             # Vite build configuration
└── tsconfig.json                              # TypeScript configuration
```

---

## 🔧 Prerequisites

Ensure the following are installed on your system:

| Requirement | Version |
|-------------|---------|
| PHP | ≥ 8.3 |
| Composer | Latest |
| Node.js | ≥ 18.x |
| npm | ≥ 9.x |
| MySQL | 8.x (or SQLite for quick setup) |

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd StartUpTracker
```

### 2. Install Dependencies

```bash
# PHP dependencies
composer install

# Node.js dependencies
npm install
```

### 3. Environment Configuration

```bash
cp .env.example .env
php artisan key:generate
```

Open `.env` and configure the following:

```env
# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=startuptracker
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Google OAuth (required for social login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI="${APP_URL}/auth/google/callback"
```

> **Note:** To obtain Google OAuth credentials, create a project in the [Google Cloud Console](https://console.cloud.google.com/), enable the Google+ API, and create OAuth 2.0 credentials with `http://localhost:8000/auth/google/callback` as an authorized redirect URI.

### 4. Database Setup

```bash
# Run all migrations
php artisan migrate

# Seed with sample data (optional but recommended)
php artisan db:seed --class=StartupTrackerSeeder
```

---

## 🏃‍♂️ Running the Application

Start both the Laravel backend and Vite frontend dev servers:

```bash
# Option 1: Run everything concurrently
npm run dev

# Option 2: Run in separate terminals
# Terminal 1 — Laravel server
php artisan serve

# Terminal 2 — Vite dev server
npx vite
```

Visit **http://localhost:8000** in your browser.

---

## 🌱 Database Seeding

The `StartupTrackerSeeder` populates the database with realistic sample data:

```bash
php artisan db:seed --class=StartupTrackerSeeder
```

This creates:
- **20+ startups** across sectors like FinTech, HealthTech, AI/ML, EdTech, etc.
- **Funding rounds** and **team members** for each startup
- **Sector distribution** data for analytics
- **News articles** (auto-synced from Hacker News on first visit)

The seeder is **idempotent** — it truncates existing data before re-seeding, so it's safe to run multiple times.

---

## 📖 Feature Details

### 1. Google OAuth Authentication

**How it works:**

```
User clicks "Continue with Google"
  → GET /auth/google/redirect
  → Socialite redirects to Google consent screen
  → User grants permission
  → Google redirects to GET /auth/google/callback
  → Socialite exchanges code for user profile
  → App finds or creates user in DB
  → Auth::login() → redirect to /
```

**Key behaviors:**
- **Account linking**: If a user with the same email already exists (e.g., registered manually), the Google ID is linked to that account instead of creating a duplicate.
- **Avatar sync**: Google profile picture is updated on every login.
- **Stateless mode**: Uses `->stateless()` since Inertia handles session state.

**Files:**
| File | Path |
|------|------|
| OAuth Controller | `app/Http/Controllers/Auth/GoogleController.php` |
| Routes | `routes/web.php` (lines 27–31) |
| Config | `config/services.php` → `google` |
| Migration | `database/migrations/..._add_google_id_and_avatar_to_users_table.php` |

---

### 2. Startup Explorer & Filtering

The home page supports **three simultaneous filter dimensions**, all URL-driven for shareability and browser history support.

**Filter dimensions:**

| Filter | URL Param | How it Works |
|--------|-----------|-------------|
| **Week** | `?week=3` or `?week=all` | Filters by `week_number` column. "ALL" shows everything. |
| **Sector** | `?sector=FinTech` | Exact match on `sector` column |
| **Search** | `?search=analytics` | `LIKE` search across `name`, `sector`, `description`, and related `team_members.name` |

**Backend logic** (Eloquent's conditional `->when()` pattern):
```php
$startups = Startup::query()
    ->when(!$isAllWeeks && !$searchFilter, fn($q) => $q->where('week_number', $weekNumber))
    ->when($sectorFilter, fn($q, $sector) => $q->where('sector', $sector))
    ->when($searchFilter, fn($q, $search) => $q->where(function($q) use ($search) {
        $q->where('name', 'like', "%{$search}%")
          ->orWhere('sector', 'like', "%{$search}%")
          ->orWhereHas('teamMembers', fn($sq) => $sq->where('name', 'like', "%{$search}%"));
    }))
    ->get();
```

**Frontend navigation** (Inertia `router.get()` with URL state):
```tsx
// WeekSelector updates URL params and Inertia handles the rest
router.get(`/?week=${week}`, {}, { preserveState: true, preserveScroll: true });
```

> **Design choice**: When search is active, the week filter is automatically bypassed so results span all weeks.

**Files:**
| File | Path |
|------|------|
| Controller | `app/Http/Controllers/StartupController.php` |
| Week Selector | `resources/js/components/tracker/week-selector.tsx` |
| Top Bar | `resources/js/components/tracker/top-bar.tsx` |
| Startups Page | `resources/js/pages/startups/index.tsx` |

---

### 3. YCombinator (Hacker News) Feed

The news section fetches **real-time stories from the Hacker News Firebase API** and displays them sorted by community upvotes.

**Data flow:**

```
1. User visits /news
2. NewsController checks article count
3. If < 10 articles → triggers NewsService::syncNews()
4. syncNews() calls GET /v0/topstories.json → gets top 500 story IDs
5. Iterates through top 30 IDs
6. For each: GET /v0/item/{id}.json → fetches story details
7. Maps HN fields to NewsArticle model and saves to DB
8. Controller queries DB ordered by score DESC
9. First article (highest score) becomes the "Top Story" hero card
```

**HN API → Database mapping:**

| HN API Field | DB Column | Transformation |
|-------------|-----------|----------------|
| `title` | `title` | Direct |
| `url` | `url` | Falls back to `news.ycombinator.com/item?id=X` for text posts |
| `score` | `score` | Direct (used for sorting — highest = Top Story) |
| `time` | `source_time` | Unix timestamp → `Carbon::diffForHumans()` |
| URL host | `source` | Parsed domain name (e.g., `techcrunch.com`) |
| `text` | `excerpt` | HTML stripped via `strip_tags()` |

**No API key required.** The Hacker News API is public and has no rate limit.

**Files:**
| File | Path |
|------|------|
| Service | `app/Services/NewsService.php` |
| Controller | `app/Http/Controllers/NewsController.php` |
| Model | `app/Models/NewsArticle.php` |
| Page | `resources/js/pages/news/index.tsx` |
| Featured Card | `resources/js/components/tracker/featured-news-card.tsx` |
| News Card | `resources/js/components/tracker/news-card.tsx` |

---

### 4. Bookmarking & Upvoting

- **Bookmark**: Toggle a startup in your personal watchlist. Accessible from the Watchlist tab.
- **Upvote**: Community voting system. Top upvoted startups appear in the sidebar.
- Both features require authentication and use toggle endpoints (POST adds, POST again removes).

**Files:**
| File | Path |
|------|------|
| Bookmark Controller | `app/Http/Controllers/BookmarkController.php` |
| Upvote Controller | `app/Http/Controllers/UpvoteController.php` |
| Bookmark Model | `app/Models/Bookmark.php` |

---

### 5. Admin Dashboard

Accessible only to users with `is_admin = true`. Provides:

- **Startup management**: Create, edit, delete, and toggle "featured" status
- **User management**: View all users, manage roles, delete accounts
- **Analytics overview**: Startup counts, funding totals, sector breakdown

**Routes:** All under `/admin/*` with `auth` + `admin` middleware.

**Files:**
| File | Path |
|------|------|
| Admin Controller | `app/Http/Controllers/AdminController.php` |
| User Controller | `app/Http/Controllers/AdminUserController.php` |
| Dashboard Page | `resources/js/pages/admin/dashboard.tsx` |
| Startup Policy | `app/Policies/StartupPolicy.php` |

---

### 6. Notifications

In-app notification bell with real-time alerts for:
- New startup added to the platform
- Your startup received an upvote
- Startup submission confirmed
- Account events (deletion, admin alerts)

**Files:**
| File | Path |
|------|------|
| Controller | `app/Http/Controllers/NotificationController.php` |
| Bell Component | `resources/js/components/NotificationBell.tsx` |
| Notification Classes | `app/Notifications/*.php` (6 notification types) |

---

### 7. Support Page

A public contact form that stores messages in the database.

**Files:**
| File | Path |
|------|------|
| Controller | `app/Http/Controllers/SupportController.php` |
| Model | `app/Models/SupportMessage.php` |
| Page | `resources/js/pages/support.tsx` |

---

## 🔌 API Endpoints

### Public Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/` | Home — Startup explorer |
| `GET` | `/news` | News feed |
| `GET` | `/support` | Support form |
| `GET` | `/startups/{slug}` | Startup detail |
| `GET` | `/api/search?q=term` | Search startups (JSON) |
| `GET` | `/welcome` | Landing page |

### Auth Routes (Guest Only)

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/auth/google/redirect` | Initiate Google OAuth |
| `GET` | `/auth/google/callback` | Google OAuth callback |

### Authenticated Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/startups/create` | New startup form |
| `POST` | `/startups` | Submit startup |
| `PUT` | `/startups/{id}` | Update startup |
| `DELETE` | `/startups/{id}` | Delete startup |
| `POST` | `/startups/{id}/bookmark` | Toggle bookmark |
| `POST` | `/startups/{id}/upvote` | Toggle upvote |
| `GET` | `/api/notifications` | Fetch notifications |
| `POST` | `/api/notifications/mark-all-read` | Mark all as read |

### Admin Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/admin/dashboard` | Admin dashboard |
| `GET/POST` | `/admin/startups/*` | Startup CRUD |
| `POST` | `/admin/startups/{id}/toggle-featured` | Toggle featured status |
| `GET/POST/PUT/DELETE` | `/admin/users/*` | User management |

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `APP_URL` | Yes | Application URL (default: `http://localhost:8000`) |
| `DB_CONNECTION` | Yes | Database driver (`mysql` or `sqlite`) |
| `DB_HOST` | Yes | Database host |
| `DB_PORT` | Yes | Database port |
| `DB_DATABASE` | Yes | Database name |
| `DB_USERNAME` | Yes | Database username |
| `DB_PASSWORD` | Yes | Database password |
| `GOOGLE_CLIENT_ID` | For OAuth | Google Cloud OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | For OAuth | Google Cloud OAuth client secret |
| `GOOGLE_REDIRECT_URI` | For OAuth | OAuth callback URL |

---

## 👥 Authors

- **Tushar**
- **Alok**
- **Sourav**