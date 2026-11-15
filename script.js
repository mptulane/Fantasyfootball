(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const label = document.querySelector('.theme-label');
  const storageKey = 'personal-football-site-theme';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

  function savedTheme() {
    try {
      const preference = localStorage.getItem(storageKey);
      return preference === 'dark' || preference === 'light' ? preference : null;
    } catch (error) {
      return null;
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('aria-pressed', String(dark));
    label.textContent = dark ? 'Light mode' : 'Dark mode';
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = dark ? '#111a16' : '#f6f7f2';
  }

  applyTheme(savedTheme() || (systemTheme.matches ? 'dark' : 'light'));

  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch (error) {
      // Theme still works for this visit when browser storage is unavailable.
    }
  });

  // Follow system changes until the visitor has explicitly chosen a theme.
  systemTheme.addEventListener('change', event => {
    if (!savedTheme()) applyTheme(event.matches ? 'dark' : 'light');
  });

  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
})();
