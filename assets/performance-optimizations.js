// Performance Optimizations Script
(function() {
  'use strict';

  // Lazy Loading Implementation
  class LazyLoader {
    constructor() {
      this.imageObserver = null;
      this.videoObserver = null;
      this.init();
    }

    init() {
      if ('IntersectionObserver' in window) {
        this.setupImageObserver();
        this.setupVideoObserver();
        this.observeElements();
      } else {
        // Fallback for browsers without IntersectionObserver
        this.loadAllImages();
      }
    }

    setupImageObserver() {
      const options = {
        root: null,
        rootMargin: '50px 0px',
        threshold: 0.1
      };

      this.imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.imageObserver.unobserve(entry.target);
          }
        });
      }, options);
    }

    setupVideoObserver() {
      const options = {
        root: null,
        rootMargin: '100px 0px',
        threshold: 0.1
      };

      this.videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadVideo(entry.target);
            this.videoObserver.unobserve(entry.target);
          }
        });
      }, options);
    }

    loadImage(img) {
      const src = img.dataset.src;
      const srcset = img.dataset.srcset;
      const sizes = img.dataset.sizes;

      if (src) {
        img.src = src;
      }
      if (srcset) {
        img.srcset = srcset;
      }
      if (sizes) {
        img.sizes = sizes;
      }

      img.classList.add('loading');
      
      img.onload = () => {
        img.classList.remove('loading', 'lazy');
        img.classList.add('loaded');
      };

      img.onerror = () => {
        img.classList.remove('loading');
        img.classList.add('error');
      };
    }

    loadVideo(video) {
      const src = video.dataset.src;
      if (src) {
        video.src = src;
        video.load();
      }
    }

    observeElements() {
      // Observe lazy images
      document.querySelectorAll('img[data-src]').forEach(img => {
        this.imageObserver.observe(img);
      });

      // Observe lazy videos
      document.querySelectorAll('video[data-src]').forEach(video => {
        this.videoObserver.observe(video);
      });
    }

    loadAllImages() {
      // Fallback for browsers without IntersectionObserver
      document.querySelectorAll('img[data-src]').forEach(img => {
        this.loadImage(img);
      });
    }
  }

  // Critical Resource Preloader
  class ResourcePreloader {
    constructor() {
      this.preloadedResources = new Set();
    }

    preloadCriticalImages() {
      const criticalImages = [
        'logo.png',
        'hero-background.jpg',
        'above-fold-product.jpg'
      ];

      criticalImages.forEach(imageName => {
        this.preloadImage(imageName);
      });
    }

    preloadImage(src) {
      if (this.preloadedResources.has(src)) return;
      
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      
      this.preloadedResources.add(src);
    }

    preloadFont(fontUrl) {
      if (this.preloadedResources.has(fontUrl)) return;
      
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = fontUrl;
      document.head.appendChild(link);
      
      this.preloadedResources.add(fontUrl);
    }
  }

  // Performance Monitor
  class PerformanceMonitor {
    constructor() {
      this.metrics = {};
      this.init();
    }

    init() {
      if ('PerformanceObserver' in window) {
        this.observePerformance();
      }
      this.measureCriticalMetrics();
    }

    observePerformance() {
      // Observe Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Observe First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const firstInput = list.getEntries()[0];
        if (firstInput) {
          this.metrics.fid = firstInput.processingStart - firstInput.startTime;
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      // Observe Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.metrics.cls = clsValue;
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    }

    measureCriticalMetrics() {
      window.addEventListener('load', () => {
        // Time to Interactive approximation
        setTimeout(() => {
          this.metrics.tti = performance.now();
        }, 0);

        // First Contentful Paint
        if ('getEntriesByType' in performance) {
          const paintEntries = performance.getEntriesByType('paint');
          const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            this.metrics.fcp = fcpEntry.startTime;
          }
        }
      });
    }

    getMetrics() {
      return this.metrics;
    }
  }

  // Image Format Detection and Optimization
  class ImageOptimizer {
    constructor() {
      this.supportsWebP = null;
      this.supportsAVIF = null;
      this.detectFormats();
    }

    detectFormats() {
      // Detect WebP support
      const webpCanvas = document.createElement('canvas');
      webpCanvas.width = 1;
      webpCanvas.height = 1;
      this.supportsWebP = webpCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

      // Detect AVIF support
      const avifImage = new Image();
      avifImage.onload = () => {
        this.supportsAVIF = true;
      };
      avifImage.onerror = () => {
        this.supportsAVIF = false;
      };
      avifImage.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    }

    getBestFormat() {
      if (this.supportsAVIF) return 'avif';
      if (this.supportsWebP) return 'webp';
      return 'jpg';
    }
  }

  // Initialize all optimizations
  function initializeOptimizations() {
    // Initialize lazy loading
    new LazyLoader();

    // Initialize resource preloader
    const preloader = new ResourcePreloader();
    preloader.preloadCriticalImages();

    // Initialize performance monitoring
    const monitor = new PerformanceMonitor();

    // Initialize image optimizer
    const imageOptimizer = new ImageOptimizer();

    // Add body class for supported formats
    document.addEventListener('DOMContentLoaded', () => {
      const body = document.body;
      if (imageOptimizer.supportsWebP) {
        body.classList.add('webp-support');
      }
      if (imageOptimizer.supportsAVIF) {
        body.classList.add('avif-support');
      }
    });

    // Expose performance metrics globally for debugging
    window.performanceMetrics = () => monitor.getMetrics();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeOptimizations);
  } else {
    initializeOptimizations();
  }

  // Service Worker Registration (if available)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }

})();