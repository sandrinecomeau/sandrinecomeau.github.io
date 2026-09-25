const animations = {
    'appears': (el) => el.classList.add('visible'),
    'draw-ursa-minor': (el) => {
        el.classList.add('visible')
        animateStars();
    },
    'fade-up': (el) => el.classList.add('visible'),
    'letter-dance': (el) => el.classList.add('visible'),
    'resize-img-title': (el) => el.classList.add('visible'),
    'spin': (el) => el.classList.add('visible'),
    'ticker': (el) => el.classList.add('visible'),
    'title-reveal': (el) => {
        const animated = el.querySelectorAll('.title-block, h1, .subtitle p');
        animated.forEach(node => {
            node.style.animation = 'none';
            node.offsetHeight;
            node.style.animation = '';
        });
        el.classList.add('visible');
    },
    'triangle-morph': (el) => el.classList.add('visible'),
    'typing': (el) => el.classList.add('visible'),
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
}, { threshold: 0.5 });

document.querySelectorAll('.slide[data-background]').forEach(slide => {
    const bg = document.createElement('div');
    bg.className = 'bg';
    bg.style.backgroundImage = `url(${slide.dataset.background})`;
    if (slide.dataset.backgroundRepeat) {
        bg.className = 'bg repeat';
    }
    document.body.prepend(bg);
    slide._bg = bg;
});

document.querySelectorAll('.slide').forEach(s => observer.observe(s));
