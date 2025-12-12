document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.glassy-nav');
    
    if (!nav) return;

    // Scroll Detection
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
            nav.classList.remove('expanded'); // Auto-close when returning to top
        }
    });

    // Click to Expand (Logic for "Clicky" requirement)
    nav.addEventListener('click', (e) => {
        // Only toggle expansion if we are in scrolled mode
        if (nav.classList.contains('scrolled')) {
            // Prevent toggling if clicking a link inside the expanded menu
            if (e.target.closest('a')) return;
            
            nav.classList.toggle('expanded');
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('scrolled') && 
            nav.classList.contains('expanded') && 
            !nav.contains(e.target)) {
            nav.classList.remove('expanded');
        }
    });
});
