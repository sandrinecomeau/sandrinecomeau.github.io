const SVG_NS = 'http://www.w3.org/2000/svg';

// 0 Polaris, 1 Yildun, 2 Epsilon, 3 Zeta, 4 Eta, 5 Pherkad, 6 Kochab
const URSA = {
    stars: [
        { x: 120, y: 120, r: 7 },
        { x: 230, y: 200, r: 4 },
        { x: 345, y: 240, r: 4 },
        { x: 460, y: 210, r: 4.5 },
        { x: 560, y: 120, r: 4 },
        { x: 625, y: 175, r: 5 },
        { x: 510, y: 265, r: 6 },
    ],
    // le manche, puis le "chaudron" qui se referme sur Zeta
    links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
};

const STAR_DELAY = 0.6;
const LINK_DELAY = 0.7;

function createBackgroundStars(n = 90) {
    const g = document.getElementById('bg-stars');
    for (let i = 0; i < n; i++) {
        const c = document.createElementNS(SVG_NS, 'circle');
        c.setAttribute('cx', Math.random() * 1000);
        c.setAttribute('cy', Math.random() * 600);
        c.setAttribute('r', 0.5 + Math.random() * 1.5);
        c.setAttribute('class', 'bg-star');
        c.style.animationDelay = `${Math.random() * 3}s`;
        g.append(c);
    }
}

function createStars(i) {
    const s = URSA.stars[i];
    const delay = `${i * STAR_DELAY}s`;

    const c = document.createElementNS(SVG_NS, 'circle');
    c.setAttribute('cx', s.x);
    c.setAttribute('cy', s.y);
    c.setAttribute('r', s.r);
    c.setAttribute('class', 'star');
    c.style.animationDelay = delay;

    if (i !== 0) return c;

    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class', 'polaris');

    const halo = document.createElementNS(SVG_NS, 'circle');
    halo.setAttribute('cx', s.x);
    halo.setAttribute('cy', s.y);
    halo.setAttribute('r', 45);
    halo.setAttribute('fill', 'url(#glow)');
    halo.setAttribute('class', 'halo');
    halo.style.animationDelay = delay;

    const label = document.createElementNS(SVG_NS, 'text');
    label.setAttribute('x', s.x + 18);
    label.setAttribute('y', s.y - 18);
    label.setAttribute('class', 'star-label');
    label.textContent = 'Étoile Polaire';
    label.style.animationDelay = delay;

    g.append(halo, c, label);
    return g;
}

function createLink([a, b], j) {
    const A = URSA.stars[a], B = URSA.stars[b];
    const p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', `M${A.x} ${A.y} L${B.x} ${B.y}`);
    p.setAttribute('pathLength', 1);
    p.setAttribute('class', 'link');
    const debut = URSA.stars.length * STAR_DELAY + 0.5; // après les étoiles
    p.style.animationDelay = `${debut + j * LINK_DELAY}s`;
    return p;
}

function animateStars() {
    const stars = document.getElementById('ursa-stars');
    const lines = document.getElementById('ursa-lines');

    stars.replaceChildren(...URSA.stars.map((_, i) => createStars(i)));
    lines.replaceChildren(...URSA.links.map(createLink));
}

createBackgroundStars();