// Mobile menu toggle
(function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = !nav.hidden;
    nav.hidden = open;
    nav.style.display = open ? 'none' : 'flex';
    toggle.setAttribute('aria-expanded', String(!open));
  });

  // Close mobile nav after clicking a link
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.hidden = true;
      nav.style.display = 'none';
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
