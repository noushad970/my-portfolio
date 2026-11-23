// Full 3D portfolio world: scrolling flies the camera through six stations.
// Three.js and GLTFLoader resolve through the import map in index.html.
// The .glb props in models/ are built by blender/build_models.py.

/* ------------------------------------------------------------------ data */
const SKILLS = [
    { name: 'C++', logo: 'c++.gif', gif: 'coding.gif' },
    { name: 'C#', logo: 'csLogo.gif', gif: 'API.gif' },
    { name: 'JavaScript', logo: 'jslogo.webp', gif: 'Fullstack.gif' },
    { name: 'Node JS', logo: 'nodejs.png', gif: 'nodejs anim.gif' },
    { name: 'Unity', logo: 'unity.gif', gif: 'Game.gif' },
    { name: 'Java', logo: 'java-logo.gif', gif: 'Java-animation.gif' },
];

const SERVICES = [
    { emoji: '🎮', title: 'Unity Game Development', colors: ['#e67e22', '#f1c40f'],
      intro: 'Complete Unity game development, including:',
      items: ['Front-end design', 'Back-end game mechanics', 'Ads integration', 'Cloud save', 'Authentication', 'In-app purchases (IAP)', 'Multiplayer mode'] },
    { emoji: '📱', title: 'Flutter App Development', colors: ['#3498db', '#6dd5fa'],
      intro: 'Complete Flutter app development, including:',
      items: ['Front-end design', 'Back-end: Firebase, MongoDB', 'Ads integration', 'Cloud save', 'Authentication', 'In-app purchases (IAP)', 'API, JSON, Dart, Python'] },
    { emoji: '🤖', title: 'ML/DL Model Development', colors: ['#9b59b6', '#e056fd'],
      intro: 'AI, ML and deep learning solutions, including:',
      items: ['In-app integration', 'AI app development', 'Agent development', 'Python, Jupyter Notebooks'] },
    { emoji: '💻', title: 'Full Stack Web Development', colors: ['#11998e', '#38ef7d'],
      intro: 'Full-stack web development, including:',
      items: ['CSS, HTML and JavaScript', 'Database connection', 'Node.js', 'Front-end and back-end integration'] },
];

const YT = id => `https://www.youtube.com/embed/${id}?rel=0`;
const PROJECTS = [
    { emoji: '🚗', kind: 'game', title: 'GTA 5 Clone by Unity', role: 'Frontend & Backend Developer', colors: ['#ffafbd', '#ffc3a0'], video: YT('3WB913qvCvE'),
      short: 'Gameplay mechanics, ads integration and cloud save in a Unity open-world clone.',
      desc: ['This is a Unity game where I developed the gameplay mechanics, added ads integration, and implemented cloud save functionality.'], links: [] },
    { emoji: '🎯', kind: 'game', title: 'Zone IO by Unity', role: 'Full Stack Developer', colors: ['#c9ffbf', '#ffafbd'], video: YT('1Yl0Kg2U8dw'),
      short: 'Android game: eliminate AI players and grow your territory. Shop, mystery boxes, IAP.',
      desc: ['Zone IO is an Android game where you eliminate AI players and increase player territory. Features complex menu UI, character buying, item unlocking, mystery boxes, coin/gem purchases, and IAP integration.'],
      links: [['📱 View app on Playstore', 'https://play.google.com/store/apps/details?id=com.nsdtechnologies.AreaClash']] },
    { emoji: '🏊', kind: 'game', title: 'Spring of the Nile by Unity', role: 'Full Stack Game Developer', colors: ['#a1c4fd', '#c2e9fb'], video: YT('2STopauylVM'),
      short: 'Endless swimming game: collect items, drive boats, fish and fight enemies.',
      desc: ['An endless swimming game where players swim in a river, collect items, drive boats, fish, fight enemies, and collect resources for shopping. Features obstacles to navigate and power-ups to discover.'],
      links: [['📱 View app on Playstore', 'https://play.google.com/store/apps/details?id=com.DefaultCompany.SpringNofTheNile']] },
    { emoji: '🏃', kind: 'game', title: 'Endless Runner by Unity', role: 'Game Developer', colors: ['#d4fc79', '#96e6a1'], video: YT('vUstjQfyr68'),
      short: 'Subway-Surfer-style runner with characters, maps, magnets, 2x scores and upgrades.',
      desc: ['An Endless Runner game like Subway Surfer with multiple characters, maps, coin collection, magnet power-ups, 2x score multipliers, and an upgrade system.'],
      links: [['📱 View app on Playstore', 'https://play.google.com/store/apps/details?id=com.NsdTechnologies.DashForCoins']] },
    { emoji: '🌾', kind: 'game', title: 'Villagers Day Farming Game', role: 'Game Developer', colors: ['#ffa751', '#ffe259'], video: YT('T_CMgslo7O4'),
      short: 'Farming sim: grow crops, raise animals, build farms, quests and seasonal events.',
      desc: ['A farming simulation game where players can grow crops, raise animals, build farms, interact with NPCs, complete quests, and participate in seasonal events.'],
      links: [['🎮 Play on WebGL mode', 'https://noushad970.itch.io/villagers-day']] },
    { emoji: '🧟', kind: 'game', title: 'Zombie Zone: 2D Zombie Game', role: 'Game Developer', colors: ['#ff6b9d', '#c06c84'], video: YT('PiItKySEFdc'),
      short: '2D zombie survival with special powers, multiple maps, bosses and unlockable characters.',
      desc: ['A 2D zombie survival game featuring multiple zombies, special powers, multiple maps, and characters with unique abilities. Battle through levels, defeat bosses, unlock characters with coins, and use earned rewards strategically.'],
      links: [['📱 View app on Playstore', 'https://play.google.com/store/apps/details?id=com.nsdtech.zombiezone']] },
    { emoji: '🧟‍♂️', kind: 'game', title: 'Fight For Survive by Unity', role: 'Game Developer', colors: ['#11998e', '#38ef7d'], video: YT('khuKnH0-XU0'),
      short: 'Multiplayer zombie survival (Photon PUN 2 + PlayFab): team up, beat the boss, compete.',
      desc: ['Developed a multiplayer zombie survival web game using Unity, Photon PUN 2, and PlayFab. Players can team up in real-time, survive zombie waves, defeat a powerful boss, earn rewards, and compete on individual kill counts. The project features synchronized multiplayer gameplay, weapon switching, AI enemies, player progression, and persistent cloud data.'],
      links: [['🎮 Play on itch.io', 'https://noushad970.itch.io/fight-for-survive'], ['💻 View Source on GitHub', 'https://lnkd.in/gs3H-zh9']],
      note: 'Note: 2D/3D models not included in the repository due to their large size.' },
    { emoji: '🏙️', kind: 'game', title: 'Capital Kingdom by Unity', role: 'Game Developer', colors: ['#f7971e', '#ffd200'], video: YT('KpFO7Jq0ptg'),
      short: 'Global Game Jam city tycoon simulator: run a capital city district by district, day and night.',
      desc: ['A top-down city tycoon simulator built in Unity for the Global Game Jam under the Zoud GameLab team. Players run a capital city one district at a time, balancing the city budget and their own health while a day/night clock advances and city occurrences break out across the map.', 'The districts are filled with working locations - a municipal park, industrial manufacturing plants, oil and petroleum stations, a stadium and a school depot - each tied into the city economy, and the whole interface can be switched between English and Arabic.'],
      links: [['🎮 Play on itch.io', 'https://noushad970.itch.io/capital-kingdom'], ['💻 View Source on GitHub', 'https://github.com/noushad970/-Zoud-GameLab-Global-Game-Jam-Capital-Kingdom']] },
    { emoji: '👥', kind: 'app', title: 'Employee Management System', role: 'Desktop App Developer', colors: ['#667eea', '#764ba2'], video: YT('-KwJYUODTMo'),
      short: '.NET desktop app with SQL Server: attendance, schedules, departments and leave requests.',
      desc: ['A comprehensive .NET desktop application with SQL Server integration featuring: Admin/Employee login, multi-company support, user profiles, scheduling, attendance tracking, notice systems, department management, and leave request handling.'], links: [] },
    { emoji: '📍', kind: 'app', title: 'Smart Attendance System', role: 'Android App Developer', colors: ['#f6d365', '#fda085'], video: YT('WOHOzqiQNRE'),
      short: 'Flutter attendance app with live location checks, device auth and fraud detection.',
      desc: ['A Flutter-based university attendance management system with real-time location verification, device authentication, fraud detection, and comprehensive analytics for Admins, Class Representatives, and Students.'],
      links: [['📱 View app on Playstore', 'https://play.google.com/store/apps/details?id=com.nsdtechnologies.attendancetoday']] },
    { emoji: '🚁', kind: 'app', title: 'Drone Simulation by Flutter', role: 'Flutter App Developer', colors: ['#2193b0', '#6dd5ed'], video: YT('qphcCw2_zfc'),
      short: 'Offline drone-delivery simulation: animated flights, battery, cost and stats dashboard.',
      desc: ['A fully offline simulation of a modern drone logistics system, demonstrating how commercial drone deliveries could work through an interactive and animated user experience.'],
      features: ['🎨 Modern dashboard UI with dark theme and smooth animations', '🗺️ Custom city map with interactive delivery locations', '🚁 Animated drone simulation (takeoff, flight, delivery, return)', '📦 Package selection (Food, Medicine, Parcel, Documents)', '🔋 Battery monitoring and delivery progress tracking', '💰 Delivery cost and time calculation', '📊 Statistics dashboard with charts', '💾 Fully offline using local storage (SharedPreferences)', '🧩 Built with clean architecture and Riverpod'],
      stack: 'Flutter • Dart • Riverpod • SharedPreferences • fl_chart',
      links: [['💻 View Source on GitHub', 'https://lnkd.in/gZ9Rm_ed']] },
    { emoji: '🌾', kind: 'app', title: 'Smart Agri BD', role: 'Android App Developer', colors: ['#56ab2f', '#a8e063'], video: YT('JoBkNyLLcwo'),
      short: 'Farming assistant for Bangladesh: crops, livestock, fish ponds, weather and an AI chat.',
      desc: ['A farming management app for farmers in Bangladesh, published on Google Play under NSD Technology. It brings crop, livestock and fish farming together in one place, with district-level weather and practical advice alongside each.'],
      features: ['🌱 Daily AI crop advice, growth-stage tracking and pest detection', '🐄 Livestock feeding and yield logs with vaccination schedules', '🐟 Pond monitoring, feeding reminders and water quality management', '🌦️ District-level weather forecasts with farming tips', '💬 24/7 AI farming assistant answering in Bangla or English', '📴 Works offline, storing data locally and syncing automatically'],
      links: [['📱 View app on Playstore', 'https://play.google.com/store/apps/details?id=com.nsdtechnology.smartagribd']] },
];

const EDUCATION = [
    { emoji: '🏫', name: 'Chaitanya M.L. High School', line1: 'Result in SSC: GPA 5 out of 5', line2: 'Graduated in 2019',
      img: 'images/highschool.jpg', url: 'https://chaitanyamlhighschool.edu.bd/' },
    { emoji: '🎓', name: 'Dr. Mahbubur Rahman Mollah College', line1: 'Result in HSC: GPA 5 out of 5', line2: 'Graduated in 2021',
      img: 'images/college.jpeg', url: 'https://mail.dmrc.edu.bd' },
    { emoji: '🎒', name: 'Patuakhali Science and Technology University', line1: 'Current CGPA: 3.20 out of 4', line2: 'Enrolled in 2023, yet to complete',
      img: 'images/university.jpg', url: 'https://www.pstu.ac.bd/' },
];

const N = 6; // stations: 0 home, 1 skills, 2 services, 3 projects, 4 education, 5 contact
const GAP = 38;
const ANCHOR_X = [0, 6, -6, 0, 6, -4];
const ANCHOR_Y = [0, -1, 1, 0, -1, 0];
const BASE_DIST = [10, 11.5, 13, 17.5, 12, 10.5];

/* ------------------------------------------------------------------ boot */
const $ = s => document.querySelector(s);
const panels = [...document.querySelectorAll('.panel')];
const navBtns = [...document.querySelectorAll('#nav button')];
const dotsEl = $('#dots');
for (let i = 0; i < N; i++) dotsEl.appendChild(document.createElement('i'));
const dots = [...dotsEl.children];

function fail(reason, err) {
    console.warn('3D world disabled:', reason, err || '');
    document.body.classList.add('no-3d');
}

(async function main() {
    // Three.js is required; GLTFLoader is not. If the import map or the addon
    // fails, the world still runs with its built-in wireframe shapes.
    let THREE, GLTFLoader = null;
    try {
        THREE = await import('three');
    } catch (e) {
        try { THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js'); }
        catch (e2) { return fail('Three.js failed to load', e2); }
    }
    try {
        ({ GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js'));
    } catch (e) {
        console.warn('GLTFLoader unavailable - showing wireframe shapes instead of the Blender models.', e);
    }

    const canvas = $('#world');
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    } catch (e) { return fail('WebGL unavailable', e); }

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hoverCapable = matchMedia('(hover: hover)').matches;
    const lowPower = innerWidth < 768;
    renderer.setPixelRatio(Math.min(devicePixelRatio, lowPower ? 1.5 : 2));
    renderer.setSize(innerWidth, innerHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x070726, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070726, 0.012);
    const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 400);

    // Lights are for the Blender models only; everything else is MeshBasicMaterial.
    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const keyLight = new THREE.DirectionalLight(0xfff1d0, 2.4); keyLight.position.set(5, 7, 9);
    const fillLight = new THREE.DirectionalLight(0x74b4ff, 1.3); fillLight.position.set(-7, -3, 5);
    const rimLight = new THREE.DirectionalLight(0xf1c40f, 1.1); rimLight.position.set(0, 5, -9);
    scene.add(keyLight, fillLight, rimLight);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const manager = new THREE.LoadingManager();
    const texLoader = new THREE.TextureLoader(manager);
    const loaderEl = $('#loader');
    let loaderHidden = false;
    const hideLoader = () => { if (!loaderHidden) { loaderHidden = true; loaderEl.classList.add('done'); } };
    manager.onLoad = hideLoader;
    setTimeout(hideLoader, 4500);

    try { await Promise.race([document.fonts.load('700 40px Poppins'), new Promise(r => setTimeout(r, 1500))]); } catch (_) { /* fall back to system font */ }

    /* ---------- helpers ---------- */
    const palette = [0xe67e22, 0xf1c40f, 0x3498db, 0x9b59b6].map(c => new THREE.Color(c));
    const anchor = i => new THREE.Vector3(ANCHOR_X[i], ANCHOR_Y[i], -i * GAP);
    const interactives = [];

    // crop a texture to "cover" a target aspect ratio instead of stretching it
    function cover(tex, targetAspect) {
        const img = tex.image;
        if (!img || !img.width) return;
        const k = (img.width / img.height) / targetAspect;
        if (k > 1) { tex.repeat.set(1 / k, 1); tex.offset.set((1 - 1 / k) / 2, 0); }
        else { tex.repeat.set(1, k); tex.offset.set(0, (1 - k) / 2); }
        tex.needsUpdate = true;
    }
    function loadTex(url, aspect) {
        const t = texLoader.load(encodeURI(url), tex => { if (aspect) cover(tex, aspect); });
        t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso;
        return t;
    }
    function canvasTex(w, h, draw) {
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        draw(c.getContext('2d'), w, h);
        const t = new THREE.CanvasTexture(c);
        t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso;
        return t;
    }
    function rr(ctx, x, y, w, h, r) {
        ctx.beginPath(); ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }
    function wrap(ctx, text, x, y, maxW, lh, maxLines = 99) {
        let line = '', lines = [];
        for (const w of text.split(' ')) {
            const test = line ? line + ' ' + w : w;
            if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; } else line = test;
        }
        if (line) lines.push(line);
        if (lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…'; }
        lines.forEach((l, i) => ctx.fillText(l, x, y + i * lh));
        return y + lines.length * lh;
    }
    const F = (w, s) => `${w} ${s}px Poppins, "Segoe UI", system-ui, sans-serif`;
    function cardBase(ctx, w, h, colors) {
        const bg = ctx.createLinearGradient(0, 0, w, h);
        bg.addColorStop(0, '#13133a'); bg.addColorStop(1, '#0a0a26');
        rr(ctx, 0, 0, w, h, 44); ctx.fillStyle = bg; ctx.fill();
        const g = ctx.createLinearGradient(0, 0, w, 0);
        g.addColorStop(0, colors[0]); g.addColorStop(1, colors[1]);
        ctx.lineWidth = 8; ctx.strokeStyle = g; rr(ctx, 4, 4, w - 8, h - 8, 42); ctx.stroke();
        ctx.fillStyle = g; ctx.globalAlpha = 0.16; rr(ctx, 4, 4, w - 8, 190, 42); ctx.fill(); ctx.globalAlpha = 1;
        return g;
    }

    /* ---------- background: stars + floating wireframes ---------- */
    const farZ = -(N - 1) * GAP - 40;
    const starCount = lowPower ? 1400 : 3600;
    const starPos = new Float32Array(starCount * 3), starCol = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        starPos[i * 3] = (Math.random() - .5) * 140;
        starPos[i * 3 + 1] = (Math.random() - .5) * 90;
        starPos[i * 3 + 2] = 30 + Math.random() * (farZ - 30);
        const c = palette[(Math.random() * 4) | 0];
        starCol[i * 3] = c.r; starCol[i * 3 + 1] = c.g; starCol[i * 3 + 2] = c.b;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
        size: 0.14, vertexColors: true, transparent: true, opacity: .9, depthWrite: false })));

    const floatGeos = [new THREE.OctahedronGeometry(.6), new THREE.TetrahedronGeometry(.7), new THREE.BoxGeometry(.9, .9, .9), new THREE.IcosahedronGeometry(.55, 0), new THREE.TorusGeometry(.5, .16, 8, 20)];
    const floaters = [];
    const floaterCount = lowPower ? 22 : 46;
    for (let i = 0; i < floaterCount; i++) {
        const m = new THREE.Mesh(floatGeos[i % floatGeos.length],
            new THREE.MeshBasicMaterial({ color: palette[i % 4], wireframe: true, transparent: true, opacity: .55 }));
        const side = Math.random() < .5 ? -1 : 1;
        m.position.set(side * (9 + Math.random() * 18), (Math.random() - .5) * 22, 10 - Math.random() * (N * GAP + 20));
        m.userData = { s: new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(.6), y0: m.position.y, ph: Math.random() * 6.28 };
        floaters.push(m); scene.add(m);
    }

    /* ---------- station 0: hero ---------- */
    const hero = new THREE.Group(); scene.add(hero);
    const heroPhoto = new THREE.Group(); hero.add(heroPhoto);
    heroPhoto.add(new THREE.Mesh(new THREE.CircleGeometry(2.3, 72), new THREE.MeshBasicMaterial({ map: loadTex('images/my-photo.jpg', 1) })));
    heroPhoto.add(new THREE.Mesh(new THREE.TorusGeometry(2.38, .09, 16, 100), new THREE.MeshBasicMaterial({ color: 0xf1c40f })));
    const orbitA = new THREE.Mesh(new THREE.TorusGeometry(3.2, .03, 8, 120), new THREE.MeshBasicMaterial({ color: 0x3498db }));
    const orbitB = new THREE.Mesh(new THREE.TorusGeometry(3.7, .03, 8, 120), new THREE.MeshBasicMaterial({ color: 0x9b59b6 }));
    heroPhoto.add(orbitA, orbitB);
    const sculpt = new THREE.Group(); hero.add(sculpt);
    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(3.2, 1), new THREE.MeshBasicMaterial({ color: 0xe67e22, wireframe: true, transparent: true, opacity: .4 }));
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.3, .38, 150, 18), new THREE.MeshBasicMaterial({ color: 0xf1c40f, wireframe: true, transparent: true, opacity: .55 }));
    sculpt.add(ico, knot);

    /* ---------- station 1: skills ---------- */
    const skillsG = new THREE.Group(); scene.add(skillsG);
    const orbit = new THREE.Group(); orbit.rotation.x = .38; skillsG.add(orbit);
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, 1), new THREE.MeshBasicMaterial({ color: 0xf1c40f, wireframe: true }));
    const coreIn = new THREE.Mesh(new THREE.IcosahedronGeometry(.8, 0), new THREE.MeshBasicMaterial({ color: 0xe67e22, transparent: true, opacity: .55 }));
    skillsG.add(core, coreIn);
    const ringGuide = new THREE.Mesh(new THREE.TorusGeometry(4.3, .02, 8, 160), new THREE.MeshBasicMaterial({ color: 0x3498db, transparent: true, opacity: .5 }));
    ringGuide.rotation.x = Math.PI / 2; orbit.add(ringGuide);
    const badges = SKILLS.map((s, i) => {
        const g = new THREE.Group();
        const disc = new THREE.Mesh(new THREE.CircleGeometry(.95, 48), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        const logo = new THREE.Mesh(new THREE.CircleGeometry(.85, 48), new THREE.MeshBasicMaterial({ map: loadTex('images/' + s.logo, 1), transparent: true }));
        logo.position.z = .01;
        const rim = new THREE.Mesh(new THREE.TorusGeometry(1, .07, 12, 48), new THREE.MeshBasicMaterial({ color: palette[i % 4] }));
        const label = new THREE.Mesh(new THREE.PlaneGeometry(2.4, .6), new THREE.MeshBasicMaterial({
            transparent: true, map: canvasTex(512, 128, (ctx, w, h) => {
                ctx.fillStyle = '#fff'; ctx.font = F('700', 64); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.shadowColor = '#000'; ctx.shadowBlur = 12; ctx.fillText(s.name, w / 2, h / 2);
            }) }));
        label.position.y = -1.5;
        g.add(disc, logo, rim, label);
        disc.userData = { kind: 'skill', skill: s, station: 1, root: g };
        interactives.push(disc);
        g.userData.angle = (i / SKILLS.length) * Math.PI * 2;
        orbit.add(g);
        return g;
    });

    /* ---------- station 2: services ---------- */
    const servicesG = new THREE.Group(); scene.add(servicesG);
    const serviceCards = SERVICES.map((s, i) => {
        const tex = canvasTex(640, 800, (ctx, w, h) => {
            const g = cardBase(ctx, w, h, s.colors);
            ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
            ctx.font = F('400', 76); ctx.fillStyle = '#fff'; ctx.fillText(s.emoji, 44, 126);
            ctx.font = F('700', 42); ctx.fillStyle = g;
            let y = wrap(ctx, s.title, 44, 206, w - 88, 48, 2);
            ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.font = F('400', 24);
            y = wrap(ctx, s.intro, 44, y + 12, w - 88, 30, 2) + 6;
            ctx.font = F('600', 25);
            s.items.forEach(it => {
                ctx.fillStyle = s.colors[0]; ctx.fillText('▸', 44, y + 32);
                ctx.fillStyle = '#fff'; y = wrap(ctx, it, 80, y + 32, w - 124, 28, 2) + 2;
            });
        });
        const m = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 4.5), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
        m.userData = { kind: 'service', station: 2, root: m, i };
        interactives.push(m); servicesG.add(m);
        return m;
    });

    /* ---------- station 3: projects – two rings (games | apps) ---------- */
    const projectsG = new THREE.Group(); scene.add(projectsG);
    const GAMES = PROJECTS.map((p, i) => ({ p, i })).filter(x => x.p.kind === 'game');
    const APPS  = PROJECTS.map((p, i) => ({ p, i })).filter(x => x.p.kind === 'app');

    function buildRing(list, xOff, ringColor) {
        const rg = new THREE.Group(); rg.position.x = xOff; projectsG.add(rg);
        const ring = new THREE.Group(); rg.add(ring);
        const R = 4.0, STEP = (Math.PI * 2) / list.length;
        const cards = list.map(({ p, i }, k) => {
            const tex = canvasTex(560, 720, (ctx, w, h) => {
                const g = cardBase(ctx, w, h, p.colors);
                ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
                ctx.font = F('400', 80); ctx.fillStyle = '#fff'; ctx.fillText(p.emoji, 36, 130);
                ctx.font = F('600', 22); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.textAlign = 'right';
                ctx.fillText(`${String(k + 1).padStart(2, '0')} / ${list.length}`, w - 36, 60); ctx.textAlign = 'left';
                ctx.font = F('700', 40); ctx.fillStyle = g;
                let y = wrap(ctx, p.title, 36, 220, w - 72, 48, 3);
                ctx.font = F('600', 24); ctx.fillStyle = p.colors[0]; y = wrap(ctx, p.role, 36, y + 8, w - 72, 30, 1);
                ctx.font = F('400', 25); ctx.fillStyle = 'rgba(255,255,255,.8)';
                wrap(ctx, p.short, 36, y + 24, w - 72, 33, 5);
                ctx.font = F('700', 23); ctx.fillStyle = '#f1c40f'; ctx.fillText('▶  Click to open', 36, h - 36);
            });
            const m = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 3.5), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
            const a = k * STEP;
            m.position.set(Math.sin(a) * R, 0, Math.cos(a) * R);
            m.rotation.y = a;
            m.userData = { kind: 'project', station: 3, root: m, i, k, ring: null };
            interactives.push(m); ring.add(m);
            return m;
        });
        const flr = new THREE.Mesh(
            new THREE.TorusGeometry(R + .25, .04, 8, 120),
            new THREE.MeshBasicMaterial({ color: ringColor, transparent: true, opacity: .6 }));
        flr.rotation.x = Math.PI / 2; flr.position.y = -2.2; rg.add(flr);
        const lTex = canvasTex(320, 80, (ctx, w, h) => {
            ctx.font = F('700', 50); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(list[0].p.kind === 'game' ? '🎮 Games' : '📱 Apps', w / 2, h / 2);
        });
        const lMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(3.2, .8),
            new THREE.MeshBasicMaterial({ map: lTex, transparent: true, depthWrite: false }));
        lMesh.position.set(0, R + .7, 0); rg.add(lMesh);
        const state = { rg, ring, cards, list, step: STEP, R, flr, rot: 0, target: 0, vel: 0, index: 0 };
        cards.forEach(m => { m.userData.ring = state; });
        return state;
    }

    const ringGame = buildRing(GAMES, -5.5, 0xf1c40f);
    const ringApp  = buildRing(APPS,   5.5, 0x3498db);
    const centerGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.9), new THREE.MeshBasicMaterial({ color: 0xe67e22, wireframe: true }));
    projectsG.add(centerGem);

    /* ---------- station 4: education ---------- */
    const eduG = new THREE.Group(); scene.add(eduG);
    const eduColors = [0xe67e22, 0x3498db, 0x9b59b6];
    const eduFrames = EDUCATION.map((e, i) => {
        const g = new THREE.Group();
        const border = new THREE.Mesh(new THREE.BoxGeometry(3.7, 2.6, .14), new THREE.MeshBasicMaterial({ color: eduColors[i] }));
        const photo = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.3), new THREE.MeshBasicMaterial({ map: loadTex(e.img, 3.4 / 2.3) }));
        photo.position.z = .08;
        const label = new THREE.Mesh(new THREE.PlaneGeometry(3.9, 1.9), new THREE.MeshBasicMaterial({
            transparent: true, map: canvasTex(780, 380, (ctx, w, h) => {
                rr(ctx, 4, 4, w - 8, h - 8, 28); ctx.fillStyle = 'rgba(10,10,38,.92)'; ctx.fill();
                ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(241,196,15,.55)'; ctx.stroke();
                ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
                ctx.font = F('700', 34); ctx.fillStyle = '#f1c40f';
                const y = wrap(ctx, `${e.emoji} ${e.name}`, 30, 62, w - 60, 42, 2);
                ctx.font = F('400', 28); ctx.fillStyle = '#fff';
                ctx.fillText('📊 ' + e.line1, 30, y + 22);
                ctx.fillText('📅 ' + e.line2, 30, y + 64);
                ctx.font = F('600', 24); ctx.fillStyle = '#e67e22'; ctx.fillText('↗ Click to visit', 30, h - 28);
            }) }));
        label.position.set(0, -2.45, .05);
        g.add(border, photo, label);
        const ud = { kind: 'edu', station: 4, root: g, url: e.url };
        border.userData = photo.userData = label.userData = ud;
        interactives.push(border, photo, label);
        eduG.add(g);
        return g;
    });

    /* ---------- station 5: contact ---------- */
    const contactG = new THREE.Group(); scene.add(contactG);
    const cube = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 2.6), new THREE.MeshBasicMaterial({ color: 0x3498db, wireframe: true }));
    const cubeIn = new THREE.Mesh(new THREE.OctahedronGeometry(1.2), new THREE.MeshBasicMaterial({ color: 0xf1c40f, transparent: true, opacity: .55 }));
    const satellites = [0, 1, 2].map(i => {
        const s = new THREE.Mesh(new THREE.SphereGeometry(.22, 16, 16), new THREE.MeshBasicMaterial({ color: palette[i + 1] }));
        contactG.add(s); return s;
    });
    const mailRing = new THREE.Mesh(new THREE.TorusGeometry(3.3, .035, 8, 120), new THREE.MeshBasicMaterial({ color: 0x9b59b6 }));
    contactG.add(cube, cubeIn, mailRing);

    /* ---------- Blender models (models/*.glb) ---------- */
    const props = [];        // every imported prop, animated each frame
    const heroOrbiters = []; // props that circle the hero photo
    const eduProps = {};

    function addProp(src, parent, opts) {
        if (!src) return null;
        const obj = src.clone(true);
        if (opts.rot) obj.rotation.set(opts.rot[0], opts.rot[1], opts.rot[2]);
        const g = new THREE.Group();
        g.add(obj);
        g.scale.setScalar(opts.scale === undefined ? 1 : opts.scale);
        if (opts.pos) g.position.set(opts.pos[0], opts.pos[1], opts.pos[2]);
        parent.add(g);
        const p = {
            g, obj, rot0: obj.rotation.clone(),
            spin: opts.spin === undefined ? 0.25 : opts.spin,
            bob: opts.bob === undefined ? 0.18 : opts.bob,
            bobSpeed: opts.bobSpeed || 0.9,
            sway: opts.sway || 0,
            orbit: !!opts.orbit,
            fullSpin: !!opts.fullSpin,
            phase: Math.random() * 6.283,
            y0: opts.pos ? opts.pos[1] : 0,
        };
        props.push(p);
        return p;
    }

    async function loadModels() {
        if (!GLTFLoader) return;
        const gl = new GLTFLoader();
        const get = name => new Promise(res => gl.load(
            'models/' + name + '.glb',
            g => res(g.scene),
            undefined,
            err => { console.warn('3D model not loaded:', name, err); res(null); }));
        const names = ['controller', 'laptop', 'phone', 'chip', 'crystal',
                       'rocket', 'gradcap', 'books', 'envelope'];
        const parts = await Promise.all(names.map(get));
        const M = {};
        names.forEach((n, i) => { M[n] = parts[i]; });
        if (!parts.some(Boolean)) { console.warn('No .glb models found - keeping wireframe shapes.'); return; }

        // 0 home: controller + laptop circle the photo
        const c = addProp(M.controller, hero, { scale: .9, spin: .35, sway: .35, orbit: true });
        if (c) { c.R = 5.4; c.a0 = 0.5; heroOrbiters.push(c); }
        const l = addProp(M.laptop, hero, { scale: .78, spin: -.22, sway: .25, orbit: true, rot: [0, .4, 0] });
        if (l) { l.R = 5.4; l.a0 = 0.5 + Math.PI; heroOrbiters.push(l); }

        // 1 skills: the crystal becomes the core
        if (M.crystal) { coreIn.visible = false; core.scale.setScalar(1.65); }
        addProp(M.crystal, skillsG, { pos: [0, 0, 0], scale: 1.0, spin: .5, bob: .14, bobSpeed: 1.1, fullSpin: true });

        // 2 services: one prop floating over each card
        const svc = [M.controller, M.phone, M.chip, M.laptop];
        const svcScale = [.55, 1.05, 1.0, .7];
        serviceCards.forEach((card, i) => {
            const pr = addProp(svc[i], servicesG, { scale: svcScale[i], spin: .4, bob: .16, bobSpeed: .8 + i * .12 });
            if (pr) card.userData.prop = pr;
        });

        // 3 projects: rocket at the centre of the ring
        if (M.rocket) centerGem.visible = false;
        addProp(M.rocket, projectsG, { pos: [0, 2.6, 0], scale: 1.0, spin: .45, bob: .22, bobSpeed: .7, fullSpin: true });

        // 4 education: cap above the middle frame, books off to the side
        eduProps.cap = addProp(M.gradcap, eduG, { scale: .72, spin: .3, bob: .2, sway: .2 });
        eduProps.books = addProp(M.books, eduG, { scale: 1.1, spin: -.25, bob: .18, bobSpeed: 1.05 });

        // 5 contact: envelope floating inside the wireframe cube
        if (M.envelope) cubeIn.visible = false;
        addProp(M.envelope, contactG, { pos: [0, 0, 0], scale: 1.4, spin: .35, bob: .22, sway: .3 });

        layout();
    }

    /* ---------- layout (depends on aspect ratio) ---------- */
    let aspect = innerWidth / innerHeight, fit = 1, portrait = false;
    function layout() {
        aspect = innerWidth / innerHeight;
        portrait = aspect < 0.9;
        fit = aspect >= 1.3 ? 1 : 1 + (1.3 - aspect) * 1.25; // pull the camera back on narrow screens
        hero.position.copy(anchor(0));
        heroPhoto.position.x = portrait ? 0 : -4.4 * Math.min(1, aspect / 1.6 + .25);
        heroPhoto.scale.setScalar(portrait ? .72 : 1);
        sculpt.position.set(portrait ? 0 : 5, portrait ? -2 : .5, -8);
        skillsG.position.copy(anchor(1));
        servicesG.position.copy(anchor(2));
        serviceCards.forEach((m, i) => {
            const k = i - 1.5;
            m.userData.home = new THREE.Vector3(k * 4.1, 0, -Math.abs(k) * .5);
            m.userData.rotY = -k * .2;
            const pr = m.userData.prop;
            if (pr) { pr.y0 = 2.95; pr.g.position.set(k * 4.1, 2.95, -Math.abs(k) * .5 + .7); }
        });
        projectsG.position.copy(anchor(3));
        eduG.position.copy(anchor(4));
        eduFrames.forEach((g, i) => {
            const k = i - 1;
            g.userData.home = new THREE.Vector3(k * 4.6, .6, -Math.abs(k) * .6);
            g.userData.rotY = -k * .22;
        });
        contactG.position.copy(anchor(5)).add(new THREE.Vector3(portrait ? 0 : -4.6, portrait ? 3.4 : 0, 0));
        contactG.scale.setScalar(portrait ? .6 : 1);
        heroOrbiters.forEach((pr, i) => {
            // Elliptical orbit, biased left so the props never sit under the text panel.
            // Centre shifted right of the photo: the near half of the orbit sits in the
            // clear gap, the far half passes behind the portrait.
            pr.cx = heroPhoto.position.x + (portrait ? 0 : 1.6);
            pr.Rx = portrait ? 1.9 : Math.min(2.6, .9 + aspect * .8);
            pr.Ry = portrait ? 2.3 : 3.1;
            pr.Rz = portrait ? 1.6 : 2.0;
            pr.g.scale.setScalar((i === 0 ? .85 : .75) * (portrait ? .62 : 1));
        });
        if (eduProps.cap) {
            eduProps.cap.y0 = portrait ? 4.6 : 3.0;
            eduProps.cap.g.position.set(portrait ? 0 : 3.6, eduProps.cap.y0, 1.3);
        }
        if (eduProps.books) {
            eduProps.books.y0 = portrait ? -4.8 : 3.0;
            eduProps.books.g.position.set(portrait ? 0 : -3.6, eduProps.books.y0, 1.0);
        }
    }
    layout();

    // camera path + look-at path, one control point per station
    const camCurve = () => new THREE.CatmullRomCurve3(
        Array.from({ length: N }, (_, i) => anchor(i).add(new THREE.Vector3(0, .6, BASE_DIST[i] * fit))), false, 'centripetal');
    const lookCurve = () => new THREE.CatmullRomCurve3(Array.from({ length: N }, (_, i) => anchor(i)), false, 'centripetal');
    let camPath = camCurve(), lookPath = lookCurve();

    /* ---------- interaction state ---------- */
    const pointer = { nx: 0, ny: 0, mx: 0, my: 0, down: false, dragging: false, startX: 0, lastX: 0 };
    const raycaster = new THREE.Raycaster();
    let hovered = null, active = 0;
    let activeRing = null, dragRing = null; // set after rings built

    function setRingTitle(state) {
        const isGame = state.list[0].p.kind === 'game';
        const { p } = state.list[state.index];
        $(isGame ? '#gameTitle' : '#appTitle').textContent = `${p.emoji} ${p.title}`;
        $(isGame ? '#gameCount' : '#appCount').textContent = `${state.index + 1} / ${state.list.length}`;
    }
    function goRing(state, d) { state.target = Math.round(state.target / state.step) * state.step - d * state.step; }
    activeRing = ringGame;
    setRingTitle(ringGame); setRingTitle(ringApp);
    $('#prevGame').addEventListener('click', () => { activeRing = ringGame; goRing(ringGame, -1); });
    $('#nextGame').addEventListener('click', () => { activeRing = ringGame; goRing(ringGame,  1); });
    $('#prevApp').addEventListener('click',  () => { activeRing = ringApp;  goRing(ringApp,  -1); });
    $('#nextApp').addEventListener('click',  () => { activeRing = ringApp;  goRing(ringApp,   1); });

    // skill popup
    const popup = $('#skillPopup'), popImg = popup.querySelector('img'), popLabel = popup.querySelector('span');
    let popFor = null;
    function showSkill(s) {
        if (popFor === s) return;
        popFor = s;
        if (!s) { popup.classList.remove('show'); return; }
        popImg.src = encodeURI('images/' + s.gif); popImg.alt = s.name + ' animation'; popLabel.textContent = s.name;
        popup.classList.add('show');
    }

    // project modal
    const modal = $('#projectModal'), vid = $('#modalVideo');
    function openModal(i) {
        const p = PROJECTS[i];
        $('#modalTitle').textContent = `${p.emoji} ${p.title}`;
        $('#modalRole').textContent = 'Role: ' + p.role;
        const d = $('#modalDesc'); d.textContent = '';
        const para = (txt, cls) => { const el = document.createElement('p'); el.textContent = txt; if (cls) el.className = cls; d.appendChild(el); return el; };
        p.desc.forEach(t => para(t));
        if (p.features) {
            para('✨ Key Features:').style.fontWeight = '700';
            const ul = document.createElement('ul');
            p.features.forEach(f => { const li = document.createElement('li'); li.textContent = f; ul.appendChild(li); });
            d.appendChild(ul);
        }
        if (p.stack) para('Tech Stack: ' + p.stack);
        if (p.note) para('⚠️ ' + p.note, 'note');
        const L = $('#modalLinks'); L.textContent = '';
        p.links.forEach(([label, url]) => {
            const a = document.createElement('a'); a.className = 'btn small'; a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = label; L.appendChild(a);
        });
        vid.src = p.video;
        modal.hidden = false; $('#modalClose').focus();
    }
    function closeModal() { modal.hidden = true; vid.src = ''; }
    $('#modalClose').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    addEventListener('keydown', e => {
        if (!modal.hidden) { if (e.key === 'Escape') closeModal(); return; }
        if (active === 3 && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
            if (e.key === 'ArrowRight') goRing(activeRing, 1);
            if (e.key === 'ArrowLeft')  goRing(activeRing, -1);
        }
    });

    /* ---------- pointer handling ---------- */
    function updateNdc(e) {
        pointer.nx = (e.clientX / innerWidth) * 2 - 1;
        pointer.ny = -(e.clientY / innerHeight) * 2 + 1;
    }
    function pick() {
        raycaster.setFromCamera({ x: pointer.nx, y: pointer.ny }, camera);
        const list = interactives.filter(o => o.userData.station === active);
        const hit = raycaster.intersectObjects(list, false)[0];
        return hit ? hit.object : null;
    }
    addEventListener('pointermove', e => {
        updateNdc(e);
        if (pointer.down && active === 3) {
            const dx = e.clientX - pointer.lastX; pointer.lastX = e.clientX;
            if (Math.abs(e.clientX - pointer.startX) > 6) pointer.dragging = true;
            if (pointer.dragging) {
                if (!dragRing) { dragRing = hovered?.userData?.ring || (pointer.nx < 0 ? ringGame : ringApp); activeRing = dragRing; }
                dragRing.rot += dx * .007; dragRing.target = dragRing.rot; dragRing.vel = dx * .007;
            }
        }
    });
    canvas.addEventListener('pointerdown', e => {
        updateNdc(e);
        pointer.down = true; pointer.dragging = false; dragRing = null; pointer.startX = pointer.lastX = e.clientX;
        hovered = pick();
    });
    addEventListener('pointerup', e => {
        if (!pointer.down) return;
        pointer.down = false;
        if (pointer.dragging) {
            pointer.dragging = false;
            activeRing.target = Math.round((activeRing.rot + activeRing.vel * 10) / activeRing.step) * activeRing.step;
            return;
        }
        updateNdc(e);
        const o = pick();
        if (!hoverCapable) hovered = null;
        if (!o) return;
        const d = o.userData;
        if (d.kind === 'project') openModal(d.i);
        else if (d.kind === 'edu') window.open(d.url, '_blank', 'noopener');
        else if (d.kind === 'skill') showSkill(popFor === d.skill && !hoverCapable ? null : d.skill);
    });
    addEventListener('pointercancel', () => { pointer.down = false; pointer.dragging = false; });

    /* ---------- navigation ---------- */
    const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const goTo = i => scrollTo({ top: (i / (N - 1)) * maxScroll(), behavior: reduceMotion ? 'auto' : 'smooth' });
    document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => goTo(+b.dataset.go)));
    function setActive(i) {
        active = i;
        panels.forEach((el, k) => el.classList.toggle('active', k === i));
        navBtns.forEach((b, k) => b.setAttribute('aria-current', k === i ? 'true' : 'false'));
        dots.forEach((d, k) => d.classList.toggle('on', k === i));
        if (i !== 1) showSkill(null);
        hovered = null;
    }
    setActive(0);

    addEventListener('resize', () => {
        camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight, false);
        layout(); camPath = camCurve(); lookPath = lookCurve();
    });

    /* ---------- render loop ---------- */
    const clock = new THREE.Clock();
    let running = true;
    document.addEventListener('visibilitychange', () => {
        running = !document.hidden;
        if (running) { clock.getDelta(); frame(); }
    });

    const ease = x => x * x * (3 - 2 * x);
    const camPos = new THREE.Vector3(), lookAtPos = new THREE.Vector3(), tmp = new THREE.Vector3(), off = new THREE.Vector3();
    let p = 0;

    function frame() {
        if (!running) return;
        requestAnimationFrame(frame);
        const dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime;
        const sp = reduceMotion ? .15 : 1;

        // scroll → camera along the path, with a dwell at every station
        const target = scrollY / maxScroll();
        p += (target - p) * Math.min(1, dt * (reduceMotion ? 20 : 3.2));
        const pc = Math.min(Math.max(p, 0), 1);
        const u = pc * (N - 1), i0 = Math.min(N - 2, Math.floor(u)), f = u - i0;
        const tt = (i0 + ease(ease(f))) / (N - 1);
        camPath.getPoint(tt, camPos); lookPath.getPoint(tt, lookAtPos);
        pointer.mx += (pointer.nx - pointer.mx) * .06;
        pointer.my += (pointer.ny - pointer.my) * .06;
        camera.position.set(camPos.x + pointer.mx * 1.1, camPos.y + pointer.my * .7, camPos.z);
        camera.lookAt(lookAtPos);
        const idx = Math.round(pc * (N - 1));
        if (idx !== active) setActive(idx);

        // hover picking
        if (!pointer.dragging && (hoverCapable || !pointer.down)) { if (hoverCapable) hovered = pick(); }
        canvas.style.cursor = hovered ? 'pointer' : (active === 3 ? (pointer.dragging ? 'grabbing' : 'grab') : 'default');

        // hero
        heroPhoto.rotation.y = pointer.mx * .45 + Math.sin(t * .6 * sp) * .1;
        heroPhoto.rotation.x = -pointer.my * .3;
        const photoY = (portrait ? 3.2 : .2) + Math.sin(t * 1.2 * sp) * .15;
        heroPhoto.position.y += (photoY - heroPhoto.position.y) * .1;
        orbitA.rotation.set(Math.PI / 2.3, 0, t * .7 * sp); orbitB.rotation.set(0, Math.PI / 2.6, -t * .5 * sp);
        sculpt.rotation.y = t * .22 * sp; sculpt.rotation.x = Math.sin(t * .3 * sp) * .3;
        knot.rotation.x = t * .5 * sp; knot.rotation.y = t * .35 * sp;

        // skills
        core.rotation.y = t * .5 * sp; core.rotation.x = t * .3 * sp; coreIn.rotation.y = -t * .8 * sp;
        coreIn.scale.setScalar(1 + Math.sin(t * 2 * sp) * .08);
        const R = portrait ? 3.0 : 4.3;
        ringGuide.scale.setScalar(R / 4.3);
        orbit.updateMatrixWorld();
        badges.forEach(g => {
            const a = g.userData.angle + t * .28 * sp;
            g.position.set(Math.cos(a) * R, 0, Math.sin(a) * R);
            g.quaternion.copy(orbit.quaternion).invert().multiply(camera.quaternion); // billboard toward camera
            const h = hovered && hovered.userData.root === g;
            g.scale.setScalar(g.scale.x + ((h ? 1.3 : 1) - g.scale.x) * .15);
        });
        if (active === 1 && hoverCapable) showSkill(hovered && hovered.userData.kind === 'skill' ? hovered.userData.skill : null);

        // services
        serviceCards.forEach(m => {
            const h = hovered === m;
            off.set(0, h ? .25 : Math.sin(t * 1.1 * sp + m.userData.i) * .1, h ? 1 : 0);
            m.position.lerp(tmp.copy(m.userData.home).add(off), .12);
            m.rotation.y += (m.userData.rotY + (h ? pointer.mx * .3 : 0) - m.rotation.y) * .1;
            m.rotation.x += ((h ? -pointer.my * .2 : 0) - m.rotation.x) * .1;
            m.scale.setScalar(m.scale.x + ((h ? 1.07 : 1) - m.scale.x) * .15);
        });

        // projects rings (game + app)
        [ringGame, ringApp].forEach(state => {
            state.vel *= .9;
            if (!pointer.dragging || activeRing !== state) state.rot += (state.target - state.rot) * .09;
            state.ring.rotation.y = state.rot;
            const near = ((Math.round(-state.rot / state.step) % state.list.length) + state.list.length) % state.list.length;
            if (near !== state.index) { state.index = near; setRingTitle(state); }
            state.cards.forEach(m => {
                const sc = hovered === m ? 1.08 : (m.userData.k === near ? 1.03 : 1);
                m.scale.setScalar(m.scale.x + (sc - m.scale.x) * .15);
            });
            state.flr.rotation.z += (state === ringGame ? 1 : -1) * .003 * sp;
        });
        centerGem.rotation.y = t * .6 * sp; centerGem.rotation.x = t * .35 * sp;

        // education
        eduFrames.forEach((g, i) => {
            const h = hovered && hovered.userData.root === g;
            off.set(0, h ? .2 : Math.sin(t * sp + i * 2) * .12, h ? 1.2 : 0);
            g.position.lerp(tmp.copy(g.userData.home).add(off), .12);
            g.rotation.y += (g.userData.rotY + (h ? pointer.mx * .25 : 0) - g.rotation.y) * .1;
            g.scale.setScalar(g.scale.x + ((h ? 1.08 : 1) - g.scale.x) * .15);
        });

        // contact
        cube.rotation.x = t * .4 * sp; cube.rotation.y = t * .55 * sp;
        cubeIn.rotation.y = -t * .9 * sp; cubeIn.rotation.z = t * .5 * sp;
        mailRing.rotation.set(Math.PI / 2.4, t * .3 * sp, 0);
        satellites.forEach((s, i) => {
            const a = t * (.8 + i * .25) * sp + i * 2.1;
            s.position.set(Math.cos(a) * 3.3, Math.sin(a * 1.3) * 1.2, Math.sin(a) * 3.3);
        });

        // Blender props
        props.forEach(pr => {
            // Only radially symmetric props turn all the way round; the rest sway
            // so their recognisable face always points at the viewer.
            pr.obj.rotation.y = pr.fullSpin
                ? pr.rot0.y + t * pr.spin * sp
                : pr.rot0.y + Math.sin(t * Math.abs(pr.spin) * .8 * sp + pr.phase) * .75;
            if (pr.sway) {
                pr.obj.rotation.x = pr.rot0.x + Math.sin(t * .7 * sp + pr.phase) * pr.sway * .5 + pointer.my * .12;
                pr.obj.rotation.z = pr.rot0.z + Math.sin(t * .5 * sp + pr.phase) * pr.sway * .3;
            }
            if (!pr.orbit) pr.g.position.y = pr.y0 + Math.sin(t * pr.bobSpeed * sp + pr.phase) * pr.bob;
        });
        heroOrbiters.forEach(pr => {
            const a = t * .22 * sp + pr.a0;
            pr.g.position.set(
                pr.cx + Math.cos(a) * pr.Rx,
                heroPhoto.position.y + Math.sin(a) * pr.Ry,
                Math.cos(a) * pr.Rz);
        });

        // floaters
        floaters.forEach(m => {
            m.rotation.x += m.userData.s.x * dt * sp; m.rotation.y += m.userData.s.y * dt * sp;
            m.position.y = m.userData.y0 + Math.sin(t * .6 * sp + m.userData.ph) * .8;
        });

        renderer.render(scene, camera);
    }
    camera.position.copy(camPath.getPoint(0));
    frame();
    loadModels();
})();
