(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const toggleText = document.querySelector(".theme-toggle-text");
  const year = document.getElementById("current-year");
  const storageKey = "morgan-palumbo-theme";
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function getInitialTheme() {
    try {
      const savedTheme = window.localStorage.getItem(storageKey);
      if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    } catch (error) {
      // Storage may be unavailable in private browsing; use the system preference.
    }
    return systemPrefersDark.matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
    toggleText.textContent = isDark ? "Light mode" : "Dark mode";
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", isDark ? "#111915" : "#f6f7f5");
  }

  applyTheme(getInitialTheme());

  toggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch (error) {
      // The selected theme remains active for this page view even if it cannot be saved.
    }
  });

  systemPrefersDark.addEventListener?.("change", event => {
    let hasSavedPreference = false;
    try {
      hasSavedPreference = window.localStorage.getItem(storageKey) !== null;
    } catch (error) {
      // If storage is unavailable, follow system changes.
    }
    if (!hasSavedPreference) applyTheme(event.matches ? "dark" : "light");
  });

  if (year) year.textContent = String(new Date().getFullYear());
})();
