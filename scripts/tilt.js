// 3D tilt on cards. Uses the individual CSS `rotate` property (axis + angle)
// so it never conflicts with existing transform-based animations/hover effects.
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const MAX = 9; // degrees
    const selector = '.left-side, .service-section, .project-section, .education-section, .profile-section, .profile-section1, .contact-container';

    function attach(el) {
        el.classList.add('tilt-3d');
        el.addEventListener('mousemove', e => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            const rx = -py * MAX * 2; // about X axis
            const ry = px * MAX * 2;  // about Y axis
            const angle = Math.hypot(rx, ry);
            if (angle < 0.01) return;
            el.style.rotate = `${rx / angle} ${ry / angle} 0 ${angle}deg`;
        });
        el.addEventListener('mouseleave', () => { el.style.rotate = ''; });
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll(selector).forEach(attach);
    });
})();
