document.addEventListener('DOMContentLoaded', () => {
    const birthDate = new Date('2006-03-16'); // Assumed 2006 based on current age 19 in 2025
    const today = new Date();
    const ageDisplay = document.getElementById('age-display');

    // Calculate Age
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Update Text
    if (ageDisplay) {
        ageDisplay.textContent = age;
        
        // Check for Birthday (March 16)
        if (today.getMonth() === 2 && today.getDate() === 16) { // Month is 0-indexed (2 is March)
            triggerConfetti();
            addBirthdayDecorations();
        }
    }
});

function triggerConfetti() {
    // Simple confetti implementation or load external light lib
    // Using a simple canvas based approach to avoid external dependencies if possible, 
    // but for "wow" effect, let's inject cdn for canvas-confetti just for this day or use a simple custom one.
    // To keep it clean and self-contained without big external deps causing CORS, 
    // I will write a small custom confetti emitter.
    
    // Inject Canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#f472b6', '#22d3ee', '#c084fc', '#50fa7b', '#ffff00'];

    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 5 + 5,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);

            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
    
    // Stop after 30 seconds
    setTimeout(() => {
        canvas.remove();
    }, 30000);
}

function addBirthdayDecorations() {
    const bioText = document.querySelector('.bio-text');
    if (bioText) {
        bioText.innerHTML += " 🎂 <span style='color: var(--accent-pink); font-weight:bold;'>Happy Birthday to Me!</span> 🥳";
    }
}
