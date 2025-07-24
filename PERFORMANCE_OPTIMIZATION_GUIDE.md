# Performance Optimization Guide

This document outlines the comprehensive performance optimizations implemented for the Dear Me Shopify theme to improve load times, reduce bundle size, and enhance user experience.

## 🚀 Performance Improvements Summary

### Bundle Size Reduction
- **Before**: 106MB total assets
- **Target**: <50MB after optimization
- **Key Improvements**:
  - Lazy loading for large media files
  - Modern image formats (WebP/AVIF)
  - Optimized font loading strategy
  - Deferred non-critical JavaScript

### Load Time Optimizations

#### 1. Font Loading Strategy
- **Added `font-display: swap`** to all custom fonts
- **Preconnect to Google Fonts** for faster DNS resolution
- **Deferred non-critical fonts** using preload with fallback
- **Reduced Google Fonts** from 5 to 2 critical fonts loaded immediately

#### 2. Critical Resource Loading
- **DNS prefetch** for external CDNs
- **Preload critical assets** (CSS, JS, fonts)
- **Critical CSS** loaded with preload attribute
- **Above-the-fold optimization** for hero section

#### 3. Image Optimization
- **Responsive images** with srcset and sizes
- **Modern format support** (WebP/AVIF) with fallbacks
- **Lazy loading** with Intersection Observer
- **Optimized image quality** (85% default)
- **Placeholder images** to prevent layout shift

#### 4. JavaScript Optimization
- **Deferred script loading** on user interaction
- **Optimized Lenis initialization** with error handling
- **Reduced DOM queries** and improved event handling
- **Performance monitoring** with Core Web Vitals tracking

### 📊 Core Web Vitals Improvements

#### Largest Contentful Paint (LCP)
- **Hero video optimization** with poster images
- **Critical resource preloading**
- **Optimized image loading** for above-the-fold content

#### First Input Delay (FID)
- **Deferred JavaScript loading** until user interaction
- **Optimized event listeners** with passive flags
- **Reduced main thread blocking**

#### Cumulative Layout Shift (CLS)
- **Proper image dimensions** specified
- **Placeholder elements** for lazy-loaded content
- **CSS containment** for performance

## 🛠 Technical Implementation

### 1. Enhanced Theme Layout (`layout/theme.liquid`)
```liquid
<!-- DNS prefetch for external resources -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//cdnjs.cloudflare.com">

<!-- Preload critical resources -->
<link rel="preload" href="{{ 'critical.css' | asset_url }}" as="style">
<link rel="preload" href="{{ 'performance-optimizations.js' | asset_url }}" as="script">

<!-- Optimized font loading -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### 2. Performance Optimization Script (`assets/performance-optimizations.js`)
- **Lazy Loading Class**: Intersection Observer-based image/video loading
- **Resource Preloader**: Critical resource preloading
- **Performance Monitor**: Core Web Vitals tracking
- **Image Optimizer**: Modern format detection

### 3. Optimized Image Snippet (`snippets/image.liquid`)
- **Responsive srcset generation**
- **Modern format support** (WebP/AVIF)
- **Lazy loading implementation**
- **Fallback handling**

### 4. Service Worker (`sw.js`)
- **Static asset caching**
- **Dynamic content strategies**
- **Offline functionality**
- **Background sync**

### 5. Enhanced Critical CSS (`assets/critical.css`)
- **Font-display: swap** for all fonts
- **Performance optimizations**
- **Reduced motion support**
- **CSS containment**

## 📈 Expected Performance Gains

### Load Time Improvements
- **First Contentful Paint**: 40-60% improvement
- **Largest Contentful Paint**: 50-70% improvement
- **Time to Interactive**: 30-50% improvement

### Bundle Size Reduction
- **JavaScript**: ~60% reduction through deferred loading
- **CSS**: ~20% optimization through critical path
- **Images**: ~70% reduction through modern formats and lazy loading
- **Fonts**: ~40% reduction through optimized loading

### User Experience
- **Perceived performance**: Significantly improved through progressive loading
- **Interaction responsiveness**: Better through deferred JS
- **Visual stability**: Improved through proper sizing and placeholders

## 🔧 Implementation Checklist

### Immediate Optimizations ✅
- [x] Font loading optimization
- [x] Critical CSS enhancement
- [x] JavaScript deferring
- [x] Image lazy loading
- [x] Service worker implementation
- [x] Performance monitoring

### Recommended Next Steps
- [ ] **Image Compression**: Use tools like TinyPNG or ImageOptim for existing assets
- [ ] **Video Optimization**: Convert large videos to more efficient formats (H.264/H.265)
- [ ] **CDN Implementation**: Use Shopify CDN or external CDN for static assets
- [ ] **Database Optimization**: Optimize Liquid loops and reduce API calls
- [ ] **Third-party Script Audit**: Review and optimize external scripts

## 🧪 Testing & Monitoring

### Performance Testing Tools
1. **Google PageSpeed Insights**: Test Core Web Vitals
2. **GTmetrix**: Detailed waterfall analysis
3. **WebPageTest**: Advanced performance metrics
4. **Chrome DevTools**: Local performance profiling

### Monitoring Setup
```javascript
// Access performance metrics in browser console
window.performanceMetrics();

// Monitor Core Web Vitals
console.log('LCP:', metrics.lcp);
console.log('FID:', metrics.fid);
console.log('CLS:', metrics.cls);
```

### A/B Testing Recommendations
- Test lazy loading vs eager loading for above-fold images
- Compare font loading strategies
- Measure impact of service worker on repeat visits

## 🚨 Important Notes

### Browser Compatibility
- **Intersection Observer**: Fallback provided for older browsers
- **Service Worker**: Progressive enhancement, won't break on unsupported browsers
- **Modern image formats**: Fallbacks to JPEG/PNG provided

### Shopify-Specific Considerations
- **Liquid rendering**: Optimizations work within Shopify's rendering constraints
- **Theme updates**: Changes are modular and won't conflict with core theme updates
- **App compatibility**: Optimizations designed to work with common Shopify apps

### Maintenance
- **Regular audits**: Monitor performance monthly
- **Asset optimization**: Compress new images/videos before upload
- **Script updates**: Keep external libraries updated for security and performance

## 📋 Performance Budget

### Target Metrics
- **Total page size**: <2MB
- **JavaScript bundle**: <500KB
- **CSS bundle**: <100KB
- **Image payload**: <1MB
- **Font payload**: <200KB

### Core Web Vitals Targets
- **LCP**: <2.5 seconds
- **FID**: <100ms
- **CLS**: <0.1

This optimization guide provides a comprehensive foundation for maintaining and improving the theme's performance over time.