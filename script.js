// Active link tracking
document.querySelectorAll('.nav-links a').forEach(button => {
    button.addEventListener('click', (event) => {
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');

        // Close mobile nav after clicking a link
        const nav = document.getElementById('mainNav');
        const hamburger = document.getElementById('hamburgerBtn');
        if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
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

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburgerBtn');
    const nav = document.getElementById('mainNav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            hamburger.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('open')) {
                nav.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });
    }
});
// Background is now a 3D Three.js scene: see scripts/three-scene.js
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
