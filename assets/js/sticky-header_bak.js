/**
 * Header Scroll Effects for WordPress
 * Handles transparent-to-fixed header transition and hide-on-scroll behavior
 */

(function() {
    'use strict';
    
    let isScrolled = false;
    let isHidden = false;
    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
        const header = document.querySelector(".site-header");
        if (!header) return;

        const scrollY = window.scrollY || window.pageYOffset;
        const shouldBeScrolled = scrollY > 50;
        const scrollingDown = scrollY > lastScrollY && scrollY > lastScrollY + 5; // Small threshold to avoid tiny movements
        const scrollingUp = scrollY < lastScrollY;
        
        // Hide instantly when scrolling down past header height
        const shouldBeHidden = shouldBeScrolled && scrollingDown && scrollY > 100;
        const shouldBeVisible = scrollingUp || scrollY <= 100;

        // Update scrolled state (transparent to fixed)
        if (shouldBeScrolled !== isScrolled) {
            isScrolled = shouldBeScrolled;
            
            if (isScrolled) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        // Handle hiding (instant) vs showing (delayed)
        if (shouldBeHidden && !isHidden) {
            // Hide instantly - no transition
            isHidden = true;
            header.style.transition = 'none'; // Remove transition for instant hide
            header.classList.add("hidden");
            
            // Restore transition after a brief moment for future show animations
            setTimeout(() => {
                header.style.transition = '';
            }, 10);
            
        } else if (shouldBeVisible && isHidden) {
            // Show with smooth transition
            isHidden = false;
            header.style.transition = ''; // Ensure transition is enabled
            header.classList.remove("hidden");
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    // Initialize the header behavior
    function init() {
        const header = document.querySelector(".site-header");
        if (!header) {
            console.warn('Header scroll script: .site-header element not found');
            return;
        }

        lastScrollY = window.scrollY || window.pageYOffset;
        updateHeader(); // Set initial state
        
        // Add scroll listener with passive flag for better performance
        window.addEventListener('scroll', onScroll, { passive: true });
        
        console.log('Header scroll effects initialized');
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM is already ready
        init();
    }

})();