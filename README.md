# 🎟️ Kanvas Events — Every Event Has a Story

[![React](https://img.shields.io/badge/React-19.3.1-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3.5-646cff?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-purple)](#)
[![GitHub](https://img.shields.io/badge/GitHub-mohit--kmr--singh%2FKanvas--Events-181717?logo=github)](https://github.com/mohit-kmr-singh/Kanvas-Events)

**Kanvas Events** is a modern, responsive, frontend-only event discovery and registration web application designed to help users explore upcoming events, discover experiences across technology, music, cultural celebrations, sports, workshops, and seminars, access detailed run-of-show schedules, and register for digital passes with instant QR code generation.

The platform operates entirely in the browser using React component-based architecture and browser Local Storage—requiring zero external databases or backend servers.

---

## 🌟 Key Highlights & Design Philosophy

- **Cinematic Dark & Light Modes**: Styled with Slate & Gold palette—Deep Navy/Slate (`#121B28`, `#2C3C55`), Warm Gold/Amber (`#D79005`, `#F2B006`, `#F8D237`), and Clean Off-White (`#FDFBF7`) with persistent theme toggle and zero-flash initialization.
- **Zero-Friction Client-Side Storage**: Event registrations, saved wishlist items, theme settings, and user sessions persist seamlessly across browser refreshes via the Local Storage API.
- **Dynamic QR Code Ticket Generation**: Instant verifiable admission passes rendered in-browser using `qrcode`, with formatted print styles (`@media print`) and PDF save capabilities.
- **Interactive Multi-Filter & Search**: Full-text keyword search across titles, keynotes, venues, cities, and tags with category pills, campus location dropdowns, Indian Rupee (`₹`) price filter, and multi-mode sorting.
- **Micro-Interactions & Animation**: Real-time event countdown timers, celebration confetti blasts (`canvas-confetti`), toast notifications, and responsive view toggles (Grid vs. List).

---

## 🚀 Complete Website Features (By Module)

### 📌 Module 1 – Homepage
- **Sticky Navigation Bar**: Official Kanvas Events 3D logo branding, links (*Home, Events, Calendar, Contact, My Registrations*), active indicator, wishlist counter badge, and theme toggle.
- **Side-by-Side Hero & Flagship Countdown**:
  - **Left Column**: Introductory branding with badge pill, headline *"Every Event Has a Story."*, platform description, primary *Explore Events* and *Event Calendar* CTAs, plus popular search tag pills.
  - **Right Column**: Adjacent **Next Flagship Gathering** preview card featuring high-resolution banner, campus location, event time, live ticking days/hours/minutes/seconds `CountdownTimer`, and direct pass reservation actions.
- **Platform Statistics**: Animated metric cards displaying upcoming events, 25,000+ community attendees, 6+ categories, and 25+ campus venues.
- **Explore by Category**: Interactive category cards with curated icons, event counts, and direct deep-linking for *Technology, Music, Cultural, Sports, Workshops,* and *Seminars*.
- **Featured Events Section**: Highlighted 4-card grid with image hover zoom, category badges, price tags in Rupee (`₹`), attendance capacity, and wishlist quick-action.
- **The Kanvas Advantage**: Value proposition breakdown (*Seamless Digital Booking, Dynamic QR-Code Passes, Curated High-Value Gatherings, Personalized Discovery*).
- **Upcoming Experiences Preview**: Additional curated event cards.
- **Promotional CTA Banner**: High-impact gradient card for attendees and event hosts.
- **Footer**: Brand logo and tagline, platform navigation, direct support channels, and encrypted local storage status.

### 📌 Module 2 – Explore Events (`/events`)
- **Full Directory Display**: Access all curated events in one responsive interface.
- **Live Search**: Instant keyword filtering across event titles, short descriptions, venue names, campuses, and tags with a one-click clear button.
- **Multi-Filter System**:
  - Filter by Category (*All, Technology, Music, Cultural, Sports, Workshops, Seminars*).
  - Filter by Campus Location (*All KIIT Campuses from Campus 1 to Campus 25, Bhubaneswar, Odisha*).
  - Filter by Price with Indian Rupee icon (`₹` / `IndianRupee`): (*All Pricing, Free Events Only, Paid Events*).
  - Filter by Featured status (*Featured Only* toggle).
- **Multi-Option Sorting**:
  - Date: Soonest First / Latest First
  - Alphabetical: A → Z / Z → A
- **View Switcher**: Toggle between **Grid View** and **List View** with persistent responsive layouts.
- **Load More Pagination**: Incremental event loading with remaining count indicators.
- **Empty State Handling**: Custom illustrated empty state with a "Reset All Filters" button.
- **URL Parameter Synchronization**: Reads and writes URL query parameters (e.g. `?category=technology&featured=true`) allowing shareable filtered links.

### 📌 Module 3 – Event Details (`/events/:id`)
- **Hero Banner Header**: Cinematic backdrop image, breadcrumbs navigation, category and price badges, title, full date, time, and venue.
- **Comprehensive Event Overview**: Detailed multi-paragraph description and searchable hashtag badges.
- **Highlights & Takeaways**: Checkmark grid detailing keynote points and unique attendee perks.
- **Run of Show Schedule / Agenda**: Timeline breakdown with hour-by-hour milestones and designated speakers.
- **Organizer Information**: Profile card featuring organizer avatar, name, role, email, and biography.
- **Interactive Sticky Booking Sidebar**:
  - Live seat capacity meter and percentage fill bar.
  - Dedicated event countdown timer.
  - "Register for Event" CTA or "Sold Out" state.
  - "Add to Wishlist" toggle button.
  - "Share Event" button using Web Share API with automatic clipboard fallback and toast feedback.
  - Venue and interactive map location preview card.
- **Related & Recommended Events**: Curated event suggestions from the same category.

### 📌 Module 4 – Event Registration (`/events/:id/register`)
- **Streamlined Attendee Form**:
  - Full Name (`placeholder="e.g. Mohit Kumar"`, required, validation for min 3 characters).
  - Email Address (`placeholder="e.g. mohit@example.com"`, required, RFC email regex validation).
  - Phone Number (`placeholder="e.g. 1234567890"`, required, minimum 10 digits validation).
- **Duplicate Registration Prevention**: Automatically verifies Local Storage records for matching `eventId` and `email` combinations; alerts user with an existing registration notice and direct link to their confirmed pass.
- **Live Error Feedback**: Contextual inline error messages beneath form fields and global toast alert dispatch.
- **Selected Event Summary Card**: Visual summary of the event being registered for with venue and schedule breakdown.

### 📌 Module 5 – Registration Management
- **Registration Success Page (`/registration-success`)**:
  - Dual-burst colorful confetti celebration animation powered by `canvas-confetti`.
  - Automatically generated unique Registration ID (e.g. `KNV-2026-XXXX`).
  - Admission pass summary with all attendee and venue metadata.
  - Real-time high-resolution QR code generated on the fly via `qrcode` for venue check-in verification.
  - Direct print action invoking browser print dialog with print-optimized CSS (`@media print`).
- **My Registrations Dashboard (`/my-registrations`)**:
  - Live list of all confirmed admissions stored in `localStorage`.
  - Search/filter across registered tickets by title, city, or ID.
  - "View QR Pass" modal with full printable digital boarding pass.
  - "Cancel Registration" functionality with safety confirmation modal.
  - Empty state with direct "Discover Events" action button.

### 📌 Module 6 – Contact & Support
- **Contact Page (`/contact`)**:
  - Direct inquiry channels:
    - **Email Support**: `mohitkumar784870@gmail.com`
    - **Phone Enquiries**: `+91 7903176833`
  - Client-side support notice and direct access to event registration management.

### 📌 Module 7 & 8 – Bonus Features & UI/UX Polish
- **Event Wishlist (`/wishlist`)**: Save favorite events with instant heart toggle, header count badge, and dedicated wishlist gallery.
- **Interactive Event Calendar (`/calendar`)**: Full calendar view with month switching, date dots indicating event days, and interactive single-day or monthly event feeds.
- **Demo User Authentication (`/login` & `/signup`)**: Pre-loaded demo credentials (`attendee@kanvasevents.com`), avatar generation, session persistence, and instant registration prefill.
- **Custom 404 Not Found Page**: Illustrated error page with direct navigation back home or to explore.
- **Scroll-To-Top Button**: Smooth floating button appearing on scroll, plus automatic scroll restoration on route changes.
- **Custom Toast Notification System**: Animated alert toasts for copying links, saving wishlist items, and confirming registrations.

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
|---|---|---|
| **Core Framework** | React 19.3 | Modern component-based UI development |
| **Build Tool** | Vite 8.3 | High-speed bundling, HMR, and production optimization |
| **Styling** | Tailwind CSS v4 | Utility-first styling, glassmorphism, responsive layouts |
| **Routing** | React Router DOM v7 | Dynamic client-side routing & route state management |
| **Icons** | Lucide React | High-resolution SVG interface icons |
| **QR Code Engine** | qrcode | Client-side QR generation for verifiable event admission |
| **Animations** | canvas-confetti | Celebration effects upon successful registration |
| **Data Persistence** | Local Storage API | Browser storage for registrations, wishlist, and theme |

---

## 📁 Project Directory Structure

```text
Kanvas-Events/
├── public/
│   ├── favicon.svg              # Custom Kanvas Events SVG favicon
│   └── ...
├── src/
│   ├── components/
│   │   ├── CountdownTimer.jsx   # Live days/hours/mins/secs countdown component
│   │   ├── EventCard.jsx        # Reusable card with zoom, tags, price, wishlist
│   │   ├── Footer.jsx           # Global footer with newsletter & social links
│   │   ├── Navbar.jsx           # Sticky glassmorphic navbar with mobile drawer
│   │   ├── ScrollToTop.jsx      # Scroll restoration & floating back-to-top button
│   │   ├── SearchBar.jsx        # Search input with clear button
│   │   ├── ThemeToggle.jsx      # Light / Dark mode toggle switch
│   │   └── TicketPass.jsx       # Boarding-pass style ticket with QR code & print CSS
│   ├── context/
│   │   ├── AuthContext.jsx      # Demo authentication provider
│   │   ├── ThemeContext.jsx     # Dark/Light theme provider with localStorage sync
│   │   ├── ToastContext.jsx     # Global alert toast provider
│   │   └── WishlistContext.jsx  # Event wishlist provider with toast alerts
│   ├── data/
│   │   ├── categories.js        # Categories definition with color gradients & counts
│   │   └── events.js            # Curated event dataset with schedules, coordinates, tags
│   ├── hooks/
│   │   └── useLocalStorage.js   # Custom hook for safe localStorage binding
│   ├── pages/
│   │   ├── About.jsx            # About page: mission, vision, values, team
│   │   ├── CalendarView.jsx     # Interactive monthly event calendar
│   │   ├── Contact.jsx          # Contact page: form validation, hours, FAQ accordion
│   │   ├── EventDetails.jsx     # Full event detail page: agenda, countdown, share, map
│   │   ├── ExploreEvents.jsx    # Search, multi-filters, grid/list view, pagination
│   │   ├── Home.jsx             # Flagship homepage with hero, countdown, stats, categories
│   │   ├── Login.jsx            # Demo login page with pre-filled test credentials
│   │   ├── MyRegistrations.jsx  # Attendee dashboard: ticket list, QR modal, cancel pass
│   │   ├── NotFound.jsx         # Custom 404 error page
│   │   ├── Registration.jsx     # Registration form with validation & duplicate check
│   │   ├── RegistrationSuccess.jsx # Success screen with confetti & ticket pass
│   │   ├── Signup.jsx           # Demo account creation page
│   │   └── Wishlist.jsx         # Saved events gallery page
│   ├── utils/
│   │   ├── registrationUtils.js # IDs, localStorage persistence, duplicate check
│   │   └── validation.js        # Email, phone, name validation helpers
│   ├── App.css
│   ├── App.jsx                  # Main application router and providers
│   ├── index.css                # Tailwind base styles, scrollbars, print styles
│   └── main.jsx                 # Vite application entry point
├── index.html                   # HTML entry point with Google Fonts & meta tags
├── package.json                 # Dependencies and build scripts
├── vite.config.js               # Vite configuration with Tailwind CSS plugin
└── README.md                    # Comprehensive project documentation
```

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/mohit-kmr-singh/Kanvas-Events.git
cd Kanvas-Events
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to view the application.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 5. Preview Production Build Locally
```bash
npm run preview
```

### 6. Lint Code Quality
```bash
npm run lint
```

---

## 🚢 Deployment Guide

This application is ready for one-click deployment on **Vercel** or **Netlify**:

### Deploying on Vercel
1. Push your repository to GitHub.
2. Visit [Vercel](https://vercel.com) and import the `Kanvas-Events` repository.
3. Configure settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. For client-side routing on Vercel, ensure rewrite rule is active (or add a simple `vercel.json` with rewrite to `/index.html`).
5. Click **Deploy**.

### Deploying on Netlify
1. Log in to [Netlify](https://www.netlify.com).
2. Create a new site from your GitHub repository.
3. Set build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Add a `public/_redirects` file containing `/* /index.html 200` for client-side routing.
5. Click **Deploy Site**.

---

## 📌 Latest Commit Summary

- **Commit**: `7fc15f5`
- **Commit Message**: `placed countdown dide by side with introductory page`
- **Key Updates**:
  - **Hero & Flagship Event Side-by-Side (`src/pages/Home.jsx`)**: Refactored the homepage hero section from a centered single column into a 2-column layout (`grid grid-cols-1 lg:grid-cols-12`). The left column (7 cols) displays the introductory headline, description, CTAs, and popular search tags, while the right column (5 cols) embeds the live **Next Flagship Gathering** countdown banner card with real-time countdown, date/venue info, and booking buttons side by side.
  - **Rupee Pricing Filter (`src/pages/ExploreEvents.jsx`)**: Updated the event directory filter dropdown, replacing the dollar icon with the Lucide `<IndianRupee>` icon (`₹`) aligned with the dropdown chevron and themed with the amber/gold palette.

---

## 📄 License & Attribution

Designed and developed for the **Kanvas Events** platform.  
Images curated from [Unsplash](https://unsplash.com) with event photography licenses.  
Icons provided by [Lucide Icons](https://lucide.dev).
