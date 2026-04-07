# Landing Page Components Documentation

## Overview

This directory contains comprehensive documentation for all landing page components in the SpendFlow application.

## Component List

### 1. LandingHeader
**File:** `LandingHeader.md`  
**Purpose:** Main navigation header with logo, navigation links, and authentication buttons.

**Key Features:**
- Responsive navigation (desktop/mobile)
- Logo with home link
- Navigation links: Home, Features, Showcase
- CTA buttons: Sign In, Sign Up
- Mobile hamburger menu (non-functional)

---

### 2. LandingHero
**File:** `LandingHero.md`  
**Purpose:** Hero section showcasing value proposition with interactive dashboard preview.

**Key Features:**
- Value proposition headline
- Dashboard preview card with area chart
- Monthly spending statistics
- "Get Started" CTA button
- Recharts AreaChart with gradient fills

**Dependencies:** recharts

---

### 3. LandingFeatures
**File:** `LandingFeatures.md`  
**Purpose:** Feature showcase section with 6 key product capabilities.

**Key Features:**
- Section header with eyebrow text
- 6 feature cards in responsive grid (3 columns desktop, 2 tablet, 1 mobile)
- Each card: icon, title, description
- Features: Instant Logging, Custom Categories, Cloud Sync, Visual Reports, Savings Milestones, Secure & Private

---

### 4. LandingControl
**File:** `LandingControl.md`  
**Purpose:** Financial control section with visual content and CTA.

**Key Features:**
- Decorative background SVG
- Image/visual content area
- "Save More Time" eyebrow
- "Take Control of Your Finances" headline
- Email input placeholder + CTA button
- Recharts imported but unused

**Note:** Contains unused imports (recharts, chart data)

---

### 5. LandingProcess
**File:** `LandingProcess.md`  
**Purpose:** "How It Works" section showing 3-step process flow.

**Key Features:**
- Dark navy background (#050d35)
- Section header with "Behind the Scene" eyebrow
- 3 large SVG illustrations:
  1. Track Your Expenses
  2. Get Clear Insights
  3. Achieve Your Goals
- Decorative vector graphics
- Connecting lines between steps

**Dependencies:** Multiple SVG icon components

---

### 6. LandingIncome
**File:** `LandingIncome.md`  
**Purpose:** Income vs Expenses comparison section with bar chart.

**Key Features:**
- "Get Started For Free" eyebrow
- "Take Control of Your Money Today" headline
- Interactive bar chart showing 6 months of data
- Legend with color coding
- Custom tooltip styling
- "Get Started" CTA button

**Dependencies:** recharts (BarChart, Bar, XAxis, YAxis, etc.)

---

### 7. LandingWhyChooseUs
**File:** `LandingWhyChooseUs.md`  
**Purpose:** Value proposition section with 3 key reasons to choose the app.

**Key Features:**
- "Why Choose Us?" centered heading
- 3-card grid layout
- Color-coded icon backgrounds:
  - Coral (#fead86): Gain Clear Insights
  - Teal (#51a690): Build Better Habits
  - Gold (#ffcf00): Secure & Private
- Hover shadow effects
- Detailed descriptions for each value prop

**Dependencies:** 3 SVG icon components

---

### 8. LandingFooter
**File:** `LandingFooter.md`  
**Purpose:** Landing page footer with CTA card and navigation.

**Key Features:**
- CTA card with "Ready to get Started?" heading
- "Join Now" and "Sign Up" buttons
- Brand logo and name
- Footer navigation: Home, Features, Showcase, Login, Sign Up
- Dark theme (#1a1a1a background)

**Note:** Contains potential typo: `/regist` should be `/register`

---

### 9. LandingCTA
**File:** `LandingCTA.md`  
**Purpose:** Standalone call-to-action section.

**Key Features:**
- Dark rounded section (gray-900)
- "Ready to get Started?" heading
- Two buttons: "Join Now" (filled) and "Sign Up" (outlined)
- Centered layout with max-width constraint

**Note:** Buttons have no href or onClick handlers

---

## Component Architecture

### Layout Flow

```
LandingPage (page.tsx)
├── LandingHeader
├── LandingHero
├── LandingFeatures
├── LandingControl
├── LandingProcess
├── LandingIncome
├── LandingWhyChooseUs
├── LandingCTA (optional/standalone)
└── LandingFooter
```

### Common Patterns

1. **Responsive Design:** All components use Tailwind responsive prefixes
2. **Custom Fonts:** Consistent use of `font-gilroy`, `font-montserrat`, `font-poppins`
3. **Color Palette:** Primary blue (#1F7CFF, #017efa), dark text (#070F18, #1c1f37)
4. **Spacing:** Standard padding `px-16`, section padding `py-24`
5. **Shadows:** Custom shadow classes for cards

### Client Components

Components marked with `"use client"`:
- LandingHero (recharts)
- LandingControl (imports recharts)
- LandingProcess (SVG icons)
- LandingIncome (recharts)
- LandingWhyChooseUs (SVG icons)
- LandingFooter
- LandingCTA

### Dependencies Summary

| Package | Components | Purpose |
|---------|------------|---------|
| recharts | LandingHero, LandingControl, LandingIncome | Charts and graphs |
| next/link | LandingHeader | Client-side navigation |
| Custom SVGs | LandingProcess, LandingWhyChooseUs | Icons and illustrations |

## File Locations

**Source Files:**
- `spendflow/app/components/Landing*.tsx`

**Documentation Files:**
- `spendflow/.opencode/docs/components/landing/*.md`

## Total Statistics

- **Components Documented:** 9
- **Total Lines of Code:** 656
- **Documentation Files:** 10 (including this README)
