# Performance Optimization Guide

This document outlines all performance optimizations implemented for ifham.dev to improve PageSpeed Insights scores.

---

## Table of Contents

1. [Initial Performance Issues](#initial-performance-issues)
2. [Optimizations Implemented](#optimizations-implemented)
3. [Files Modified](#files-modified)
4. [Before vs After](#before-vs-after)
5. [Testing Performance](#testing-performance)
6. [Future Improvements](#future-improvements)

---

## Initial Performance Issues

### PageSpeed Insights Report (Before Optimization)

| Metric | Score | Issue |
|--------|-------|-------|
| **Performance** | 64 | Below optimal |
| **FCP** | 2.7s | First Contentful Paint too slow |
| **LCP** | 4.6s | Largest Contentful Paint too slow |
| **TBT** | 380ms | Total Blocking Time too high |
| **CLS** | 0 | Good - no layout shift |
| **Speed Index** | 7.0s | Very slow |

### Root Causes Identified

1. **Non-composited animations (30 elements)**
   - Using `filter: blur()` causes expensive repaints
   - Each animated element triggers layout recalculation

2. **Render-blocking CSS** (300ms delay)
   - 13.1 KiB CSS blocking initial render

3. **Legacy JavaScript polyfills** (13 KiB wasted)
   - Unnecessary polyfills for modern browsers
   - Array.prototype.at, Object.hasOwn, etc.

4. **Unused JavaScript** (42 KiB)
   - Large motion library bundle
   - Unused lucide-react icons

5. **Long main-thread tasks** (3 tasks over 50ms)
   - Animation setup blocking main thread
   - Forced reflows from geometric queries

6. **LCP Element Render Delay** (3,470ms)
   - Hero text waiting for animations to complete

---

## Optimizations Implemented

### 1. Animation Performance (`blur-fade.tsx`)

**Problem:** `filter: blur()` causes non-composited animations

**Solution:** Use only `transform` and `opacity` (GPU-composited properties)

```typescript
// Before (causes repaints)
hidden: { y: -yOffset, opacity: 0, filter: `blur(${blur})` },
visible: { y: 0, opacity: 1, filter: `blur(0px)` },

// After (GPU-accelerated)
hidden: { y: yOffset, opacity: 0 },
visible: { y: 0, opacity: 1 },
```

**Additional changes:**
- Reduced default duration from 0.4s to 0.3s
- Capped animation delays to max 0.2s
- Added `willChange: "transform, opacity"` for GPU hints

---

### 2. Text Animation Performance (`blur-fade-text.tsx`)

**Problem:** Same blur filter issue + uncapped delays

**Solution:**
- Removed `filter: blur(8px)` from variants
- Capped total animation delay to 0.3s
- Added `willChange` CSS property
- Removed unused imports

---

### 3. CSS Performance Optimizations (`globals.css`)

Added GPU acceleration utilities:

```css
/* GPU-accelerated animations */
.animate-gpu {
  transform: translateZ(0);
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Optimize font loading */
@font-face {
  font-display: swap;
}
```

---

### 4. Next.js Bundle Optimization (`next.config.mjs`)

```javascript
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    // Tree-shake these large libraries
    optimizePackageImports: ["motion/react", "lucide-react"],
  },
};
```

**Benefits:**
- Removes console.log in production
- Tree-shakes unused exports from motion and lucide-react
- Reduces JavaScript bundle size

---

### 5. Modern Browser Targeting (`package.json`)

```json
{
  "browserslist": [
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Safari versions",
    "last 2 Edge versions"
  ]
}
```

**Benefits:**
- Eliminates unnecessary polyfills (~13 KiB savings)
- Modern syntax without transpilation
- Smaller bundle size

---

### 6. Reduced Animation Delays (`page.tsx`)

**Problem:** Total animation time was ~640ms before content visible

**Solution:** Reduced delays significantly for faster LCP

```typescript
// Before
const BLUR_FADE_DELAY = 0.04;
// Hero elements: delay * 1 = 0.04s
// About section: delay * 4 = 0.16s
// Contact section: delay * 16 = 0.64s

// After
const BLUR_FADE_DELAY = 0.02;
// Hero elements: 0s (immediate)
// About section: delay * 2 = 0.04s
// Contact section: delay * 8 = 0.16s
```

**Key changes:**
- Hero text/avatar: **0ms delay** (was 40ms)
- All sections render faster
- Max total animation time: ~160ms (was 640ms)

---

## Files Modified

| File | Changes |
|------|---------|
| `src/components/magicui/blur-fade.tsx` | Removed blur filter, added willChange, capped delays |
| `src/components/magicui/blur-fade-text.tsx` | Removed blur filter, added willChange, capped delays |
| `src/app/globals.css` | Added GPU acceleration utilities, prefers-reduced-motion |
| `src/app/page.tsx` | Reduced animation delays, hero loads instantly |
| `next.config.mjs` | Added optimizePackageImports, removeConsole |
| `package.json` | Added browserslist for modern browsers |

---

## Before vs After

### Expected Improvements

| Metric | Before | Expected After | Improvement |
|--------|--------|----------------|-------------|
| **Performance** | 64 | 80-90+ | +16-26 points |
| **FCP** | 2.7s | 1.5-2.0s | -0.7-1.2s |
| **LCP** | 4.6s | 2.5-3.0s | -1.6-2.1s |
| **TBT** | 380ms | 150-250ms | -130-230ms |
| **Speed Index** | 7.0s | 4.0-5.0s | -2-3s |

### Why These Improvements

1. **No more forced reflows** from blur filter animations
2. **Faster LCP** because hero content renders immediately
3. **Smaller JS bundle** from tree-shaking and modern targets
4. **GPU-composited animations** don't block main thread

---

## Testing Performance

### Run PageSpeed Insights

1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter: `https://ifham.dev`
3. Click **Analyze**
4. Compare results with the "Before" metrics above

### Run Lighthouse Locally

```bash
# Using Chrome DevTools
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Performance" category
4. Click "Analyze page load"
```

### Check Animation Performance

```bash
# Using Chrome DevTools
1. Open Chrome DevTools (F12)
2. Go to "Performance" tab
3. Click record, reload page, stop recording
4. Check for "Non-composited animations" warnings
```

---

## Future Improvements

### Additional Optimizations to Consider

1. **Lazy load below-fold sections**
   ```typescript
   // Use dynamic imports for sections below fold
   const ProjectsSection = dynamic(() => import('@/components/section/projects-section'), {
     loading: () => <Skeleton />
   });
   ```

2. **Preload critical fonts**
   ```html
   <link rel="preload" href="/fonts/geist.woff2" as="font" type="font/woff2" crossorigin>
   ```

3. **Use next/image with priority**
   ```typescript
   <Image src={avatarUrl} priority alt="Profile" />
   ```

4. **Critical CSS inlining**
   - Extract above-fold CSS
   - Inline in `<head>`
   - Defer remaining CSS

5. **Service Worker caching**
   - Cache static assets
   - Offline support

### Bundle Analysis

To analyze bundle size:

```bash
# Install bundle analyzer
pnpm add -D @next/bundle-analyzer

# Add to next.config.mjs
import withBundleAnalyzer from '@next/bundle-analyzer';

const config = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);

# Run analysis
ANALYZE=true pnpm run build
```

---

## Summary of Changes

### Animation Changes
- ❌ Removed `filter: blur()` (non-composited)
- ✅ Using only `transform` + `opacity` (GPU-composited)
- ✅ Added `willChange` hints
- ✅ Reduced animation durations and delays

### Bundle Changes
- ✅ Tree-shaking motion/react and lucide-react
- ✅ Modern browser targets (no polyfills)
- ✅ Console logs removed in production

### CSS Changes
- ✅ GPU acceleration utilities
- ✅ Prefers-reduced-motion support
- ✅ Font display swap

---

*Document created: February 3, 2026*
*Performance optimization completed: February 3, 2026*
