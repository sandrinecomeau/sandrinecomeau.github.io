const animations = {
    'draw-ursa-minor': (el) => {
        el.classList.add('visible')
        animateStars();
    },
    'fade-up': (el) => el.classList.add('visible'),
    'resize-img-title': (el) => el.classList.add('visible'),
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
    document.body.prepend(bg);
    slide._bg = bg;
});

document.querySelectorAll('.slide').forEach(s => observer.observe(s));

function createStars(i) {
}

function animateStars() {
}