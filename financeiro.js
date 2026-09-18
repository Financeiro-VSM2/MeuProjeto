const financeTabs = [...document.querySelectorAll(".finance-tab")];
const financePanels = [...document.querySelectorAll(".finance-panel")];
financeTabs.forEach((tab) => tab.addEventListener("click", () => {
  financeTabs.forEach((item) => { item.classList.toggle("active", item === tab); item.setAttribute("aria-selected", String(item === tab)); });
  financePanels.forEach((panel) => { panel.hidden = panel.id !== tab.dataset.panel; });
}));

const entriesList = document.querySelector("#entries-list");
const entrySearch = document.querySelector("#entry-search");
const entryType = document.querySelector("#entry-type");
function filterEntries() {
  const term = entrySearch.value.trim().toLowerCase();
  entriesList.querySelectorAll("tr").forEach((row) => {
    row.hidden = !row.textContent.toLowerCase().includes(term) || (entryType.value !== "all" && row.dataset.type !== entryType.value);
  });
}
entrySearch?.addEventListener("input", filterEntries);
entryType?.addEventListener("change", filterEntries);

const entryForm = document.querySelector("#entry-form");
document.querySelector("#new-entry")?.addEventListener("click", () => {
  entryForm.hidden = !entryForm.hidden;
  if (!entryForm.hidden) entryForm.querySelector("input")?.focus();
});
entryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(entryForm);
  const row = document.createElement("tr");
  row.dataset.type = data.get("type");
  const typeLabel = data.get("type") === "entrada" ? "Entrada" : "Saída";
  const valueClass = data.get("type") === "entrada" ? "finance-positive" : "finance-negative";
  const addCell = (text, className) => {
    const cell = document.createElement("td");
    if (className) cell.className = className;
    cell.textContent = text;
    row.append(cell);
    return cell;
  };
  addCell(new Intl.DateTimeFormat("pt-BR").format(new Date(`${data.get("date")}T00:00:00`)));
  const descriptionCell = addCell("");
  const description = document.createElement("strong");
  description.textContent = data.get("description");
  const source = document.createElement("small");
  source.textContent = "Lançamento manual";
  descriptionCell.append(description, source);
  addCell(data.get("account"));
  const typeCell = addCell("");
  const typeBadge = document.createElement("span");
  typeBadge.className = `finance-badge ${data.get("type")}`;
  typeBadge.textContent = typeLabel;
  typeCell.append(typeBadge);
  addCell(`R$ ${data.get("amount")}`, valueClass);
  const statusCell = addCell("");
  const status = document.createElement("span");
  status.className = "finance-status paid";
  status.textContent = "Confirmado";
  statusCell.append(status);
  entriesList.prepend(row);
  entryForm.reset();
  entryForm.hidden = true;
});
