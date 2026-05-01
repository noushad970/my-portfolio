// Active link tracking
document.querySelectorAll('.nav-links a').forEach(button => {
    button.addEventListener('click', (event) => {
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
    });
});

// Set active link based on current page
window.addEventListener('load', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 120;
const mouse = { x: 0, y: 0 };
const connectionDistance = 150;

// Create particle objects
class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = Math.random() * 2 - 1;
        this.velocityY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color.replace('0.8', this.opacity);
        ctx.fill();
        
        // Add glow effect
        ctx.strokeStyle = this.color.replace('0.8', this.opacity * 0.5);
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    update() {
        // Move particles
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Bounce particles off edges
        if (this.x < 0 || this.x > canvas.width) this.velocityX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velocityY *= -1;
     
        // Move slightly towards the mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        this.x += dx * 0.0008;
        this.y += dy * 0.0008;

        // Opacity animation
        this.opacity += (Math.random() - 0.5) * 0.05;
        this.opacity = Math.max(0.1, Math.min(0.8, this.opacity));

        this.draw();
    }

    drawConnectionLine(otherParticle) {
        const dx = this.x - otherParticle.x;
        const dy = this.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
            ctx.strokeStyle = `rgba(230, 126, 34, ${(1 - distance / connectionDistance) * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
        }
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 4 + 1;
        const colors = [
            'rgba(230, 126, 34, 0.8)',
            'rgba(241, 196, 15, 0.8)',
            'rgba(52, 152, 219, 0.8)',
            'rgba(155, 89, 182, 0.8)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, radius, color));
    }
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
        particle.update();
        
        // Draw connection lines
        for (let i = index + 1; i < particles.length; i++) {
            particle.drawConnectionLine(particles[i]);
        }
    });
    requestAnimationFrame(animateParticles);
}

// Track mouse movement
window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Adjust canvas size on resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Initialize and animate
initParticles();
animateParticles();
// Skill items and popup animation
const skillItems = document.querySelectorAll('.skills-list li');
const popupContainer = document.getElementById('popupContainer');
const popupImage = document.getElementById('popupImage');

// Create close button
if (popupContainer && !popupContainer.querySelector('.popup-close')) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'popup-close';
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', () => {
        popupContainer.classList.remove('active');
        popupImage.src = '';
    });
    popupContainer.appendChild(closeBtn);
}

// Add mouseover and mouseout event listeners
skillItems.forEach(skill => {
    skill.addEventListener('mouseover', () => {
        const gifSrc = skill.getAttribute('data-gif');
        if (gifSrc) {
            popupImage.src = gifSrc;
            popupContainer.classList.add('active');
        }
    });

    skill.addEventListener('mouseout', () => {
        setTimeout(() => {
            if (!popupContainer.querySelector('.popup-close:hover')) {
                popupContainer.classList.remove('active');
                popupImage.src = '';
            }
        }, 100);
    });
});

// Keep popup open on hover
popupContainer.addEventListener('mouseover', () => {
    popupContainer.classList.add('active');
});

popupContainer.addEventListener('mouseout', () => {
    popupContainer.classList.remove('active');
    popupImage.src = '';
});
// Video play animation
function playVideo(container) {
    const iframe = container.querySelector('iframe');
    const videoUrl = container.getAttribute('data-video');

    if (!container.classList.contains('playing')) {
        iframe.src = `${videoUrl}?autoplay=1&rel=0`;
        container.classList.add('playing');
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-section, .education-section, .service-section').forEach(el => {
        observer.observe(el);
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
