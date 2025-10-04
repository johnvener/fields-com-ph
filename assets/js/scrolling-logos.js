/**
 * File: js/scrolling-logos.js
 *
 * Description: Adds a scrolling logos carousel component using Swiper.js
 *
 * Version: 1.0.1
 * Last Modified: 2025-10-04
 *
 * Notes: 
 * - Uses Swiper.js for the carousel functionality.
 * - Ensures compatibility by waiting for the DOM to fully load before executing.
 */

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("swiper-wrapper");
  if (
    !wrapper ||
    typeof Swiper === "undefined" ||
    typeof scrollingLogosData === "undefined"
  ) {
    console.warn("Swiper or wrapper not available.");
    return;
  }

  /**
   * Logos Array
   * Copy your logo images names here 
   */
  const logos = [
    "3sat copy.png",
    "ARD copy.png",
    "bild.png",
    "derHund.png",
    "express.png",
    "Faz.png",
    "herzfurtiere.png",
    "hr copy.png",
    "ihk.png",
    "mdr copy.png",
    "ndr copy.png",
    "rbb copy.png",
    "rehadat.png",
    "rtl copy.png",
    "swr copy.png",
    "taz copy.png",
    "tonline.png",
    "waz.png",
    "wdr copy.png",
    "zdf.png",
  ];

  const maxSlides = 100; /* Maximum slides to be added on the DOM */
  const initialSets = 3; /* Starting Count of sets to appear */
  /*
   * When half of the slides are on the view, 
   * start adding the next set of logos 
   * This ensures infinite appearing logos 
   */
  const slideThreshold = 200;
  /* 
   * Determine the slide count to pause the animation 
   * Any further animation requires user trigger ( click or swipe )
   */
  const pauseThreshold = 500; 
  let swiper; /* Initialize Swiper */

  /*
   * Create logo function,
   * responsible for adding logo sets on DOM
   */
  function createLogoSlides() {
    const fragment = document.createDocumentFragment();
    logos.forEach((logo) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `<img src="${scrollingLogosData.imgBaseUrl}${logo}" alt="${logo}" loading="lazy" />`;
      fragment.appendChild(slide);
    });
    wrapper.appendChild(fragment);
  }

  for (let i = 0; i < initialSets; i++) {
    createLogoSlides();
  }

  /* Responsiveness */
  function getResponsiveSpacing() {
    const w = window.innerWidth;
    if (w >= 1024) return 60;
    if (w >= 768) return 40;
    return 24;
  }

  /* Swiper Configurations */
  swiper = new Swiper(".logo-swiper", {
    slidesPerView: "auto",
    spaceBetween: getResponsiveSpacing(),
    loop: false,
    freeMode: false,
    speed: 2000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    allowTouchMove: true,
    grabCursor: true,
  });

  let appending = false;

  /** 
   * Adding new slides on demand 
   * when the user reaches the end of the carousel
   */
  swiper.on("slideChange", () => {
    const activeIndex = swiper.activeIndex;
    const totalSlides = swiper.slides.length;

    if (activeIndex > totalSlides - slideThreshold && !appending) {
      appending = true;
      requestIdleCallback(() => {
        createLogoSlides();
        swiper.update();

      /** Pausing animation in case of too many slides */
      if (swiper.slides.length >= pauseThreshold) {
        swiper.autoplay.stop(); 
      }

      appending = false;
      });
    }
  });

  /** 
   * Pausing animation on user interaction 
   * and resuming on user stop
   */
  swiper.on("sliderFirstMove", () => swiper.autoplay.stop());
  swiper.on("touchEnd", () => swiper.autoplay.start());

  /** Resizing the space between slides on window resize */
  window.addEventListener("resize", () => {
    swiper.params.spaceBetween = getResponsiveSpacing();
    swiper.update();
  });
});