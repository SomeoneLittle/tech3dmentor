// Оформление всех <select> под дизайн сайта: родной список браузера заменяется своим выпадающим меню.
// Сам <select> остаётся в разметке (скрыт), поэтому формы, .value и событие change работают как раньше.
const CHEVRON = '<span class="material-symbols-outlined text-[18px] text-outline shrink-0 t3d-select-chevron" aria-hidden="true">expand_more</span>';
const CHECK = '<span class="material-symbols-outlined text-[16px] text-primary shrink-0" aria-hidden="true">check</span>';

let openInstance: { close: () => void } | null = null;

function enhance(select: HTMLSelectElement) {
  if (select.dataset.enhanced || select.multiple) return;
  select.dataset.enhanced = '1';

  const hasOwnIcon = !!select.parentElement?.querySelector(':scope > .material-symbols-outlined.pointer-events-none');
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = `${select.className.replace(/\bappearance-none\b/, '')} t3d-select-trigger inline-flex items-center justify-between gap-2 text-left`;
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  const fieldLabel = select.getAttribute('aria-label') ?? (select.id ? document.querySelector(`label[for="${select.id}"]`)?.textContent?.trim() : '');
  if (fieldLabel) trigger.setAttribute('aria-label', fieldLabel);

  const label = document.createElement('span');
  label.className = 'truncate min-w-0 flex-1';
  trigger.append(label);
  if (!hasOwnIcon) trigger.insertAdjacentHTML('beforeend', CHEVRON);

  // Исходный select прячем так, чтобы он оставался в форме и мог показать подсказку валидации
  select.classList.add('sr-only');
  select.tabIndex = -1;
  select.setAttribute('aria-hidden', 'true');
  select.after(trigger);

  const panel = document.createElement('div');
  panel.className = 't3d-select-panel';
  panel.setAttribute('role', 'listbox');
  let active = -1;

  const options = () => Array.from(select.options).filter((o) => !(o.disabled && o.value === ''));

  function sync() {
    const current = select.selectedOptions[0];
    const placeholder = !current || (current.disabled && current.value === '');
    label.textContent = (current ?? select.options[0])?.textContent ?? '';
    label.classList.toggle('text-outline', placeholder);
  }

  function render() {
    panel.innerHTML = '';
    options().forEach((opt, i) => {
      const item = document.createElement('div');
      item.setAttribute('role', 'option');
      item.dataset.index = String(i);
      item.className = 't3d-select-option';
      item.setAttribute('aria-selected', String(opt.selected));
      if (opt.disabled) item.setAttribute('aria-disabled', 'true');
      item.innerHTML = `<span class="truncate min-w-0 flex-1"></span>${opt.selected ? CHECK : ''}`;
      item.firstElementChild!.textContent = opt.textContent;
      item.addEventListener('mouseenter', () => highlight(i));
      item.addEventListener('mousedown', (e) => e.preventDefault()); // фокус остаётся на кнопке
      item.addEventListener('click', () => !opt.disabled && choose(opt));
      panel.append(item);
    });
  }

  function highlight(i: number) {
    const items = Array.from(panel.children) as HTMLElement[];
    if (!items.length) return;
    active = (i + items.length) % items.length;
    items.forEach((el, n) => el.toggleAttribute('data-active', n === active));
    items[active].scrollIntoView({ block: 'nearest' });
  }

  function position() {
    const r = trigger.getBoundingClientRect();
    const gap = 6;
    panel.style.minWidth = `${Math.max(r.width, 180)}px`;
    panel.style.maxWidth = `${window.innerWidth - 16}px`;
    const pw = panel.offsetWidth;
    const left = Math.min(Math.max(8, r.left), window.innerWidth - pw - 8);
    const spaceBelow = window.innerHeight - r.bottom - gap - 8;
    const spaceAbove = r.top - gap - 8;
    const up = spaceBelow < 180 && spaceAbove > spaceBelow;
    const room = Math.max(120, up ? spaceAbove : spaceBelow);
    panel.style.maxHeight = `${Math.min(288, room)}px`;
    panel.style.left = `${left}px`;
    panel.style.top = up ? `${r.top - gap - panel.offsetHeight}px` : `${r.bottom + gap}px`;
    panel.dataset.side = up ? 'up' : 'down';
  }

  const onOutside = (e: Event) => {
    const target = e.target as Node;
    if (!panel.contains(target) && !trigger.contains(target)) close();
  };
  const onScroll = (e: Event) => !panel.contains(e.target as Node) && close();

  function openPanel() {
    if (panel.dataset.open) return;
    openInstance?.close();
    render();
    document.body.append(panel);
    position();
    panel.dataset.open = '1';
    trigger.setAttribute('aria-expanded', 'true');
    const idx = options().findIndex((o) => o.selected);
    highlight(idx >= 0 ? idx : 0);
    openInstance = { close };
    document.addEventListener('mousedown', onOutside, true);
    document.addEventListener('touchstart', onOutside, true);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', close);
  }

  function close() {
    if (!panel.dataset.open) return;
    delete panel.dataset.open;
    trigger.setAttribute('aria-expanded', 'false');
    document.removeEventListener('mousedown', onOutside, true);
    document.removeEventListener('touchstart', onOutside, true);
    window.removeEventListener('scroll', onScroll, true);
    window.removeEventListener('resize', close);
    if (openInstance?.close === close) openInstance = null;
    setTimeout(() => !panel.dataset.open && panel.remove(), 160);
  }

  function choose(opt: HTMLOptionElement) {
    select.value = opt.value;
    sync();
    close();
    trigger.focus();
    select.dispatchEvent(new Event('input', { bubbles: true }));
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  trigger.addEventListener('click', () => (panel.dataset.open ? close() : openPanel()));
  trigger.addEventListener('keydown', (e) => {
    const isOpen = !!panel.dataset.open;
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      e.stopPropagation();
      close();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) openPanel();
      else highlight(active + (e.key === 'ArrowDown' ? 1 : -1));
    } else if (e.key === 'Home' || e.key === 'End') {
      if (isOpen) {
        e.preventDefault();
        highlight(e.key === 'Home' ? 0 : panel.children.length - 1);
      }
    } else if ((e.key === 'Enter' || e.key === ' ') && isOpen) {
      e.preventDefault();
      const opt = options()[active];
      if (opt && !opt.disabled) choose(opt);
    } else if (e.key === 'Tab') {
      close();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && e.key !== ' ') {
      const i = options().findIndex((o) => o.textContent!.trim().toLowerCase().startsWith(e.key.toLowerCase()));
      if (i >= 0) {
        if (!isOpen) openPanel();
        highlight(i);
      }
    }
  });
  // Escape на панели не должен закрывать окно с формой, пока список открыт
  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape' && panel.dataset.open) {
        e.stopImmediatePropagation();
        close();
        trigger.focus();
      }
    },
    true
  );

  select.addEventListener('change', sync);
  select.addEventListener('select:sync', sync);
  select.addEventListener('focus', () => trigger.focus());
  select.form?.addEventListener('reset', () => setTimeout(sync));
  sync();
}

export function enhanceSelects(root: ParentNode = document) {
  root.querySelectorAll<HTMLSelectElement>('select').forEach(enhance);
}

enhanceSelects();
