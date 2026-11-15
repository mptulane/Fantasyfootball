# Fantasyfootball

Personal Webpage

A simple static fantasy football injury tracker and dashboard.

Open `index.html` in a browser to view it.
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Fantasy Football Injury Tracker</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #101713;
      --panel: #19221c;
      --panel-light: #202c24;
      --text: #f1f5f2;
      --muted: #a7b5aa;
      --green: #67df91;
      --yellow: #ffd166;
      --red: #ff7777;
      --border: #34443a;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font: 16px/1.5 system-ui, sans-serif;
    }

    header {
      padding: 2rem max(1rem, calc((100% - 1100px) / 2));
      background: linear-gradient(120deg, #193824, #101713);
      border-bottom: 1px solid var(--border);
    }

    header h1 { margin: 0 0 .4rem; }
    header p { margin: 0; color: var(--muted); }

    main {
      width: min(1100px, calc(100% - 2rem));
      margin: 2rem auto;
    }

    .layout {
      display: grid;
      grid-template-columns: minmax(0, 1.6fr) minmax(280px, 1fr);
      gap: 1rem;
      align-items: start;
    }

    .panel {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    h2 { margin: 0 0 1rem; font-size: 1.2rem; }
    .toolbar { display: flex; gap: .6rem; margin-bottom: 1rem; }

    input, select, button {
      font: inherit;
      border-radius: 8px;
      border: 1px solid var(--border);
      padding: .65rem .75rem;
    }

    input, select {
      width: 100%;
      background: #111914;
      color: var(--text);
    }

    button {
      background: var(--green);
      color: #102015;
      border: 0;
      font-weight: 700;
      cursor: pointer;
    }

    button:hover { filter: brightness(1.08); }
    .toolbar input { flex: 1; }

    .player-list { display: grid; gap: .7rem; }

    .player {
      background: var(--panel-light);
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: 10px;
    }

    .player-top {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: start;
    }

    .player h3 { margin: 0; }
    .muted, .details { color: var(--muted); }
    .details { margin: .55rem 0 0; font-size: .92rem; }
    .badge {
      display: inline-block;
      padding: .2rem .55rem;
      border-radius: 999px;
      background: #334138;
      font-size: .82rem;
      white-space: nowrap;
    }

    .risk-low { color: var(--green); }
    .risk-medium { color: var(--yellow); }
    .risk-high { color: var(--red); }
    .empty { color: var(--muted); text-align: center; padding: 1rem; }

    form { display: grid; gap: .75rem; }
    label { display: grid; gap: .3rem; color: var(--muted); font-size: .9rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: .7rem; }

    .announcement {
      border-left: 3px solid var(--yellow);
      padding: .65rem .8rem;
      background: var(--panel-light);
      border-radius: 0 8px 8px 0;
      margin-bottom: .65rem;
    }

    .announcement time {
      display: block;
      color: var(--muted);
      font-size: .8rem;
      margin-top: .25rem;
    }

    .note { color: var(--muted); font-size: .85rem; }
    footer { color: var(--muted); font-size: .85rem; margin-top: 1rem; }

    @media (max-width: 760px) {
      .layout { grid-template-columns: 1fr; }
      .player-top { flex-direction: column; }
    }
  </style>
</head>
<body>
  <header>
    <h1>🏈 Fantasy Football Injury Tracker</h1>
    <p>Track player updates, estimated return timelines, and injury-risk trends.</p>
  </header>

  <main>
    <div class="layout">
      <section>
        <div class="panel">
          <h2>Player injuries</h2>
          <div class="toolbar">
            <input id="search" type="search" placeholder="Search player, team, or injury">
            <select id="statusFilter" aria-label="Filter by status">
              <option value="all">All statuses</option>
              <option>Out</option>
              <option>Questionable</option>
              <option>Doubtful</option>
              <option>Day-to-day</option>
              <option>Available</option>
            </select>
          </div>
          <div id="playerList" class="player-list"></div>
        </div>

        <div class="panel">
          <h2>Report an injury</h2>
          <form id="injuryForm">
            <div class="form-row">
              <label>
                Player
                <input name="player" required placeholder="e.g. Alex Example">
              </label>
              <label>
                Team
                <input name="team" required placeholder="e.g. KC">
              </label>
            </div>

            <div class="form-row">
              <label>
                Position
                <input name="position" placeholder="e.g. RB">
              </label>
              <label>
                Injury
                <input name="injury" required placeholder="e.g. Ankle">
              </label>
            </div>

            <div class="form-row">
              <label>
                Status
                <select name="status">
                  <option>Questionable</option>
                  <option>Out</option>
                  <option>Doubtful</option>
                  <option>Day-to-day</option>
                  <option>Available</option>
                </select>
              </label>
              <label>
                Severity
                <select name="severity">
                  <option value="1">Minor</option>
                  <option value="2" selected>Moderate</option>
                  <option value="3">Major</option>
                </select>
              </label>
            </div>

            <div class="form-row">
              <label>
                Estimated days until return
                <input name="days" type="number" min="0" max="365" value="7" required>
              </label>
              <label>
                Previous injury reports
                <input name="history" type="number" min="0" max="20" value="0" required>
              </label>
            </div>

            <button type="submit">Add injury report</button>
            <p class="note">Risk score is a simple tracker based on report severity and prior reports; it is not a medical assessment.</p>
          </form>
        </div>
      </section>

      <aside>
        <div class="panel">
          <h2>Latest announcements</h2>
          <div id="announcements"></div>
        </div>
        <div class="panel">
          <h2>How risk is calculated</h2>
          <p class="note">
            This demo combines the current report’s severity and the number of previous reports
            into a 0–100 trend score. Use verified news and professional guidance for actual
            lineup decisions.
          </p>
        </div>
      </aside>
    </div>

    <footer>Demo data is stored only in this browser. Refreshing the page keeps your reports on this device.</footer>
  </main>

  <script>
    const STORAGE_KEY = "fantasy-football-injuries-v1";

    const starterPlayers = [
      {
        id: crypto.randomUUID(),
        player: "Jordan Example",
        team: "BUF",
        position: "RB",
        injury: "Hamstring",
        status: "Questionable",
        severity: 2,
        days: 10,
        history: 2,
        reportedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        player: "Taylor Sample",
        team: "SF",
        position: "WR",
        injury: "Ankle",
        status: "Day-to-day",
        severity: 1,
        days: 3,
        history: 0,
        reportedAt: new Date().toISOString()
      }
    ];

    function loadData() {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved && Array.isArray(saved.players) && Array.isArray(saved.announcements)) {
          return saved;
        }
      } catch (error) {
        console.warn("Could not load saved tracker data.", error);
      }
      return { players: starterPlayers, announcements: [] };
    }

    let data = loadData();

    function saveData() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function riskScore(player) {
      // A simple demo trend score, not a medical prediction.
      return Math.min(100, Math.round(
        Number(player.severity) * 18 + Number(player.history) * 12
      ));
    }

    function riskLabel(score) {
      if (score >= 60) return ["High trend", "risk-high"];
      if (score >= 30) return ["Moderate trend", "risk-medium"];
      return ["Lower trend", "risk-low"];
    }

    function returnDate(days) {
      const date = new Date();
      date.setDate(date.getDate() + Number(days));
      return date.toLocaleDateString(undefined, {
        year: "numeric", month: "short", day: "numeric"
      });
    }

    function escapeHTML(value) {
      return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;",
        '"': "&quot;", "'": "&#039;"
      })[char]);
    }

    function renderPlayers() {
      const query = document.getElementById("search").value.trim().toLowerCase();
      const status = document.getElementById("statusFilter").value;

      const filtered = data.players.filter(player => {
        const matchesQuery = [player.player, player.team, player.injury, player.position]
          .join(" ").toLowerCase().includes(query);
        return matchesQuery && (status === "all" || player.status === status);
      });

      const list = document.getElementById("playerList");
      if (!filtered.length) {
        list.innerHTML = '<p class="empty">No injury reports match your search.</p>';
        return;
      }

      list.innerHTML = filtered.map(player => {
        const score = riskScore(player);
        const [label, className] = riskLabel(score);
        return `
          <article class="player">
            <div class="player-top">
              <div>
                <h3>${escapeHTML(player.player)}
                  <span class="muted">· ${escapeHTML(player.team)} ${escapeHTML(player.position || "")}</span>
                </h3>
                <p class="details">
                  ${escapeHTML(player.injury)} · ${escapeHTML(player.status)}
                  · Estimated return: ${returnDate(player.days)}
                </p>
              </div>
              <span class="badge ${className}">${label}: ${score}/100</span>
            </div>
            <p class="details">
              ${Number(player.history)} previous report(s) ·
              ${escapeHTML(player.days)} estimated day(s) to return
            </p>
          </article>
        `;
      }).join("");
    }

    function renderAnnouncements() {
      const container = document.getElementById("announcements");
      if (!data.announcements.length) {
        container.innerHTML = '<p class="empty">New injury reports will appear here.</p>';
        return;
      }

      container.innerHTML = data.announcements.slice(0, 10).map(item => `
        <div class="announcement">
          <strong>${escapeHTML(item.text)}</strong>
          <time>${new Date(item.createdAt).toLocaleString()}</time>
        </div>
      `).join("");
    }

    document.getElementById("search").addEventListener("input", renderPlayers);
    document.getElementById("statusFilter").addEventListener("change", renderPlayers);

    document.getElementById("injuryForm").addEventListener("submit", event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);

      const player = {
        id: crypto.randomUUID(),
        player: form.get("player").trim(),
        team: form.get("team").trim().toUpperCase(),
        position: form.get("position").trim().toUpperCase(),
        injury: form.get("injury").trim(),
        status: form.get("status"),
        severity: Number(form.get("severity")),
        days: Number(form.get("days")),
        history: Number(form.get("history")),
        reportedAt: new Date().toISOString()
      };

      data.players.unshift(player);
      data.announcements.unshift({
        text: `New injury report: ${player.player} (${player.team}) — ${player.injury}, listed ${player.status}.`,
        createdAt: new Date().toISOString()
      });

      saveData();
      renderPlayers();
      renderAnnouncements();
      event.currentTarget.reset();
      event.currentTarget.elements.days.value = 7;
      event.currentTarget.elements.history.value = 0;
    });

    renderPlayers();
    renderAnnouncements();
  </script>
</body>
</html>
