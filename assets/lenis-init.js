// Lenis Smooth Scrolling Initialization
// Initialize Lenis when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Register GSAP ScrollTrigger plugin if available
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Initialize Lenis
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 0.8,
    smoothTouch: true,
    touchMultiplier: 1.5,
    infinite: false,
    autoRaf: true,
  });

  // Listen for the scroll event and log the event data (optional for debugging)
  lenis.on("scroll", (e) => {
    // You can add custom scroll event handling here
    // console.log(e);
  });

  // GSAP ScrollTrigger integration (if GSAP ScrollTrigger is loaded)
  if (typeof ScrollTrigger !== "undefined") {
    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
  }

  // Handle anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    });
  });

  // Expose lenis globally for potential use in other scripts
  window.lenis = lenis;
});
