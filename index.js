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


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target._bg?.classList.toggle('active', entry.isIntersecting);

        entry.target.querySelectorAll('[data-anim]').forEach(el => {
            if (entry.isIntersecting) {
                animations[el.dataset.anim]?.(el);
            } else {
                el.classList.remove('visible');
            }
        });
    });
}, { threshold: 0.7 });

document.querySelectorAll('.slide[data-background]').forEach(slide => {
    const bg = document.createElement('div');
    bg.className = 'bg';
    bg.style.backgroundImage = `url(${slide.dataset.background})`;
    document.body.prepend(bg);
    slide._bg = bg;
});

document.querySelectorAll('.slide').forEach(s => observer.observe(s));

