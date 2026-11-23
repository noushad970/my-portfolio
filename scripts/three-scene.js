// 3D background scene (Three.js). Replaces the old 2D canvas particles.
const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

(async function () {
    const canvas = document.getElementById('backgroundCanvas');
    if (!canvas) return;

    let THREE;
    try {
        THREE = await import(THREE_URL);
    } catch (e) {
        console.warn('Three.js failed to load; 3D background disabled.', e);
        return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true });
    } catch (e) {
        console.warn('WebGL unavailable; 3D background disabled.', e);
        return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070726, 0.035);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 12);

    const palette = [0xe67e22, 0xf1c40f, 0x3498db, 0x9b59b6].map(c => new THREE.Color(c));

    // ---- Starfield ----
    const starCount = isMobile ? 900 : 2200;
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        starPos[i * 3] = (Math.random() - 0.5) * 80;
        starPos[i * 3 + 1] = (Math.random() - 0.5) * 120;
        starPos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 5;
        const c = palette[Math.floor(Math.random() * palette.length)];
        starCol[i * 3] = c.r; starCol[i * 3 + 1] = c.g; starCol[i * 3 + 2] = c.b;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
        size: 0.09, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true, depthWrite: false
    }));
    scene.add(stars);

    // ---- Centerpiece: layered wireframe sculpture ----
    const hero = new THREE.Group();
    const ico = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.6, 1),
        new THREE.MeshBasicMaterial({ color: 0xe67e22, wireframe: true, transparent: true, opacity: 0.55 })
    );
    const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.1, 0.32, 140, 16),
        new THREE.MeshBasicMaterial({ color: 0xf1c40f, wireframe: true, transparent: true, opacity: 0.7 })
    );
    const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(3.8, 0.03, 8, 100),
        new THREE.MeshBasicMaterial({ color: 0x3498db })
    );
    const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(4.5, 0.03, 8, 100),
        new THREE.MeshBasicMaterial({ color: 0x9b59b6 })
    );
    ring1.rotation.x = Math.PI / 2.4;
    ring2.rotation.y = Math.PI / 2.8;
    hero.add(ico, knot, ring1, ring2);
    hero.position.set(isMobile ? 0 : 6.5, 0, -4);
    scene.add(hero);

    // ---- Floating shapes ----
    const geos = [
        new THREE.OctahedronGeometry(0.5),
        new THREE.TetrahedronGeometry(0.55),
        new THREE.BoxGeometry(0.7, 0.7, 0.7),
        new THREE.IcosahedronGeometry(0.45, 0),
    ];
    const floaters = [];
    const floaterCount = isMobile ? 10 : 22;
    for (let i = 0; i < floaterCount; i++) {
        const mesh = new THREE.Mesh(
            geos[i % geos.length],
            new THREE.MeshBasicMaterial({
                color: palette[i % palette.length], wireframe: true, transparent: true, opacity: 0.6
            })
        );
        mesh.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 50 - 8, (Math.random() - 0.5) * 14 - 2);
        mesh.userData = {
            spin: new THREE.Vector3(Math.random() * 0.01, Math.random() * 0.01, Math.random() * 0.01),
            baseY: mesh.position.y,
            phase: Math.random() * Math.PI * 2,
        };
        floaters.push(mesh);
        scene.add(mesh);
    }

    // ---- Interaction ----
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener('mousemove', e => {
        mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    let scrollProgress = 0;
    const updateScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        updateScroll();
    });

    let running = true;
    document.addEventListener('visibilitychange', () => {
        running = !document.hidden;
        if (running) animate();
    });

    // ---- Loop ----
    const clock = new THREE.Clock();
    function animate() {
        if (!running) return;
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        const speed = reduceMotion ? 0.1 : 1;

        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;

        // Camera drifts down the scene as the page scrolls, with mouse parallax
        camera.position.x = mouse.x * 1.2;
        camera.position.y = -scrollProgress * 22 - mouse.y * 0.8;
        camera.lookAt(mouse.x * 0.4, camera.position.y, 0);

        // Hero follows the camera vertically and spins faster as you scroll
        hero.position.y = camera.position.y * 0.85;
        hero.rotation.y = t * 0.25 * speed + scrollProgress * 6;
        hero.rotation.x = Math.sin(t * 0.3 * speed) * 0.3 + mouse.y * 0.3;
        knot.rotation.x = t * 0.5 * speed;
        knot.rotation.y = t * 0.35 * speed;
        ico.rotation.z = -t * 0.15 * speed;
        ring1.rotation.z = t * 0.4 * speed;
        ring2.rotation.x = t * 0.3 * speed;

        floaters.forEach(m => {
            m.rotation.x += m.userData.spin.x * speed;
            m.rotation.y += m.userData.spin.y * speed;
            m.rotation.z += m.userData.spin.z * speed;
            m.position.y = m.userData.baseY + Math.sin(t * 0.6 * speed + m.userData.phase) * 0.6;
        });

        stars.rotation.y = t * 0.01 * speed;
        renderer.render(scene, camera);
    }
    animate();
})();
