// Плавное раскрытие и закрытие всех <details> на сайте: анимируется высота, содержимое не прыгает.
const DURATION = 300;
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function enhance(details: HTMLDetailsElement) {
  const summary = details.querySelector<HTMLElement>(':scope > summary');
  if (!summary || details.dataset.accordion) return;
  details.dataset.accordion = '1';
  let anim: Animation | null = null;

  function run(from: number, to: number, onDone: () => void) {
    anim?.cancel();
    details.style.overflow = 'hidden';
    anim = details.animate({ height: [`${from}px`, `${to}px`] }, { duration: DURATION, easing: EASING });
    anim.onfinish = () => {
      anim = null;
      details.style.overflow = '';
      onDone();
    };
    anim.oncancel = () => (details.style.overflow = '');
  }

  summary.addEventListener('click', (e) => {
    e.preventDefault();
    const closing = details.open && !details.hasAttribute('data-closing');
    if (reduceMotion.matches) {
      details.open = !details.open;
      return;
    }
    const from = details.offsetHeight;
    if (closing) {
      details.setAttribute('data-closing', '');
      run(from, summary.offsetHeight, () => {
        details.open = false;
        details.removeAttribute('data-closing');
      });
    } else {
      details.removeAttribute('data-closing');
      details.open = true;
      run(from, details.scrollHeight, () => {});
    }
  });
}

document.querySelectorAll<HTMLDetailsElement>('details').forEach(enhance);
