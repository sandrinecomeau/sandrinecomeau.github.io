const animations = {
    'fade-up': (el) => el.classList.add('visible'),

    'compteur': (el) => {
        const cible = Number(el.dataset.cible);
        const duree = 1500;
        const debut = performance.now();
        const tick = (now) => {
            const p = Math.min((now - debut) / duree, 1);
            el.textContent = Math.round(p * cible);
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    },

    'dessiner-ligne': (el) => el.classList.add('dessine'),
};


const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('invisible');
            el.classList.remove('visible');
        }
        else {
            const el = entry.target;
            el.classList.remove('invisible');
            animations[el.dataset.anim]?.(el);
        }
    });
}, { threshold: 0 });

document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));