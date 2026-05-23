function showLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) overlay.classList.add('show');
}

function toggleMobileNav() {
  const panel = document.getElementById('mobileNavPanel');
  const button = document.getElementById('mobileNavToggle');
  if (!panel || !button) return;
  const isOpen = panel.classList.toggle('hidden');
  button.setAttribute('aria-expanded', String(!panel.classList.contains('hidden')));
  panel.setAttribute('aria-hidden', String(panel.classList.contains('hidden')));
}

function closeMobileNav() {
  const panel = document.getElementById('mobileNavPanel');
  const button = document.getElementById('mobileNavToggle');
  if (!panel || !button) return;
  panel.classList.add('hidden');
  button.setAttribute('aria-expanded', 'false');
  panel.setAttribute('aria-hidden', 'true');
}

window.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('darkToggle');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const panel = document.getElementById('mobileNavPanel');
  const iconSun = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');
  const prefer = localStorage.getItem('ptnadp-dark');

  function setDark(dark) {
    document.documentElement.classList.toggle('dark', dark);
    if (iconSun && iconMoon) {
      iconSun.classList.toggle('hidden', !dark);
      iconMoon.classList.toggle('hidden', dark);
    }
  }

  setDark(prefer === '1');

  if (toggle) {
    toggle.addEventListener('click', function () {
      const isDark = !document.documentElement.classList.contains('dark');
      setDark(isDark);
      localStorage.setItem('ptnadp-dark', isDark ? '1' : '0');
    });
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileNav);
  }

  const mobileLinks = document.querySelectorAll('#mobileNavPanel a[href$=".html"]');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      showLoading();
      closeMobileNav();
    });
  });

  document.addEventListener('click', function (event) {
    if (!panel || panel.classList.contains('hidden')) return;
    const target = event.target;
    if (!panel.contains(target) && !target.closest('#mobileNavToggle')) {
      closeMobileNav();
    }
  });
});

window.addEventListener('pageshow', function () {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) overlay.classList.remove('show');
});
