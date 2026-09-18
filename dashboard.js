const sidebar = document.querySelector("#sidebar");
const sidebarToggle = document.querySelector("#sidebar-toggle");
const search = document.querySelector("#process-search");
const filter = document.querySelector("#process-filter");
const rows = [...document.querySelectorAll("#process-list tr")];
const emptyState = document.querySelector("#empty-state");
const sidebarStateKey = "agravo.sidebar.collapsed";
const themeStateKey = "agravo.theme";
const themeToggle = document.querySelector("#theme-toggle");
const profileTrigger = document.querySelector("#profile-trigger");
const profileDropdown = document.querySelector("#profile-dropdown");

function syncTheme(isDark) {
  document.body.classList.toggle("dark-theme", isDark);
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
}

syncTheme(window.localStorage.getItem(themeStateKey) === "dark");
themeToggle?.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-theme");
  syncTheme(isDark);
  window.localStorage.setItem(themeStateKey, isDark ? "dark" : "light");
});

profileTrigger?.addEventListener("click", () => {
  const isOpen = profileDropdown?.hasAttribute("hidden") === false;
  if (!profileDropdown) return;
  profileDropdown.toggleAttribute("hidden", isOpen);
  profileTrigger.setAttribute("aria-expanded", String(!isOpen));
});

document.querySelector("#settings")?.addEventListener("click", () => {
  profileDropdown?.setAttribute("hidden", "");
  profileTrigger?.setAttribute("aria-expanded", "false");
});

function syncSidebarToggle() {
  if (!sidebar || !sidebarToggle) return;
  const collapsed = sidebar.classList.contains("collapsed");
  sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
  sidebarToggle.setAttribute("aria-label", collapsed ? "Abrir barra lateral" : "Fechar barra lateral");
}

if (sidebar && window.localStorage.getItem(sidebarStateKey) === "true") {
  sidebar.classList.add("collapsed");
}
syncSidebarToggle();

sidebarToggle?.addEventListener("click", () => {
  const collapsed = sidebar.classList.toggle("collapsed");
  window.localStorage.setItem(sidebarStateKey, String(collapsed));
  syncSidebarToggle();
});

rows.forEach((row) => {
  row.addEventListener("click", () => {
    const destination = row.dataset.processUrl;
    const name = row.querySelector("strong")?.textContent.trim();
    const identification = row.querySelector("td:nth-child(2)")?.textContent.trim();
    if (destination && name && identification) {
      const params = new URLSearchParams({ name, identification });
      window.location.href = `${destination}?${params.toString()}`;
    }
  });
});

function filterRows() {
  const term = search.value.trim().toLowerCase();
  const selected = filter.value;
  let visible = 0;

  rows.forEach((row) => {
    const matchesText = row.textContent.toLowerCase().includes(term);
    const matchesStatus = selected === "all" || row.dataset.status === selected;
    const show = matchesText && matchesStatus;
    row.hidden = !show;
    if (show) visible += 1;
  });

  emptyState.hidden = visible !== 0;
}

search?.addEventListener("input", filterRows);
filter?.addEventListener("change", filterRows);

document.querySelector("#logout")?.addEventListener("click", () => {
  sessionStorage.removeItem("agravo.access_token");
  window.location.href = "index.html";
});

document.querySelector("#new-process")?.addEventListener("click", () => {
  window.location.href = "processes.html";
});
