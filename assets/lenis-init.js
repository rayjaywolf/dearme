// Optimized Lenis Smooth Scrolling Initialization
(function() {
  'use strict';
  
  // Check if Lenis is already loaded or if smooth scrolling is disabled
  if (window.lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let lenis;
  let isInitialized = false;

  function initializeLenis() {
    if (isInitialized || typeof Lenis === 'undefined') return;
    
    // Initialize Lenis with optimized settings
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 0.8,
      smoothTouch: false, // Disabled for better mobile performance
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: true,
    });

    // GSAP ScrollTrigger integration (if available)
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
      lenis.on("scroll", ScrollTrigger.update);

      // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      // Disable lag smoothing in GSAP to prevent any delay in scroll animations
      gsap.ticker.lagSmoothing(0);
    }

    // Optimized anchor link handling with event delegation
    document.addEventListener("click", function(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      
      e.preventDefault();
      const targetId = anchor.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }, { passive: false });

    // Expose lenis globally for potential use in other scripts
    window.lenis = lenis;
    isInitialized = true;
  }

  // Initialize when DOM is ready and Lenis is available
  function checkAndInit() {
    if (typeof Lenis !== 'undefined') {
      initializeLenis();
    } else {
      // Wait for Lenis to load
      const checkLenis = setInterval(() => {
        if (typeof Lenis !== 'undefined') {
          clearInterval(checkLenis);
          initializeLenis();
        }
      }, 100);
      
      // Timeout after 5 seconds
      setTimeout(() => clearInterval(checkLenis), 5000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndInit);
  } else {
    checkAndInit();
  }
})();
