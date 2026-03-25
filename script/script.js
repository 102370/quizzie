window.addEventListener('DOMContentLoaded', () => {
  const leftPanel = document.querySelector('.left-panel');
  const rightPanel = document.querySelector('.right-panel');
  const title = document.querySelector('.hero-title');
  const hero = document.querySelector('.hero');

  if (!leftPanel || !rightPanel || !title || !hero) return;

  hero.style.height = '400vh';

  let ticking = false;

function updateScroll(progress, heroProgress) {
  progress = Math.min(Math.max(progress, 0), 1);
  heroProgress = Math.min(Math.max(heroProgress, 0), 1);

  leftPanel.style.transform = `translateX(${-70 * progress}vw) translateY(${-40 * progress}vh) scale(${1 + 0.6 * progress}) translateZ(0)`;
  rightPanel.style.transform = `translateX(${70 * progress}vw) translateY(${-40 * progress}vh) scale(${1 + 0.6 * progress}) translateZ(0)`;

  title.style.opacity = progress;
  title.style.transform = `scale(${0.2 + 0.8 * progress}) translateZ(0)`;
  title.style.filter = `drop-shadow(0 0 ${10 + 30 * progress}px rgba(255,255,255,${progress}))`;

  title.classList.toggle('title-unfixed', heroProgress >= 0.95);
}

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        let progress = docHeight > 0 ? scrollY / docHeight : 0;

        const heroHeight = hero.offsetHeight;
        const heroProgress = heroHeight > 0 ? scrollY / heroHeight : 0;

        progress *= 1.8;

        updateScroll(progress, heroProgress);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
  requestTick();
});
