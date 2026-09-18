const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "Titular do processo";
const identification = params.get("identification") || "CPF/CNPJ não informado";

const detailName = document.querySelector("#detail-name");
const detailIdentification = document.querySelector("#detail-identification");
const linkedList = document.querySelector("#linked-list");
const linkedCount = document.querySelector("#linked-count");

detailName.textContent = name;
detailIdentification.textContent = identification;

const processNumbers = [
  "4002324-59.2026.8.26.0073",
  "1008741-22.2025.8.26.0100",
  "1029384-15.2024.8.26.0050",
];

linkedCount.textContent = `${processNumbers.length} processos`;
processNumbers.forEach((number, index) => {
  const item = document.createElement("article");
  item.className = "linked-process";
  const info = document.createElement("div");
  info.className = "linked-process-info";
  info.innerHTML = `
    <span class="linked-process-mark" aria-hidden="true">✣</span>
    <div>
      <strong>${number}</strong>
      <span>${index === 0 ? "Petição Inicial · Ação Monitória" : "Acompanhamento processual"}</span>
    </div>
  `;

  const actions = document.createElement("div");
  actions.className = "linked-process-actions";
  actions.innerHTML = `
    <button type="button" class="linked-process-delete" aria-label="Excluir processo ${number}" title="Excluir processo">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" />
      </svg>
    </button>
    <button type="button" class="linked-process-toggle" aria-label="Recolher processo">−</button>
  `;

  item.append(info, actions);

  item.querySelector(".linked-process-toggle").addEventListener("click", (event) => {
    event.stopPropagation();
    item.classList.toggle("is-collapsed");
    event.currentTarget.textContent = item.classList.contains("is-collapsed") ? "+" : "−";
  });

  item.querySelector(".linked-process-delete").addEventListener("click", (event) => {
    event.stopPropagation();
    if (!window.confirm(`Excluir o processo ${number}?`)) return;

    item.remove();
    const remaining = linkedList.querySelectorAll(".linked-process").length;
    linkedCount.textContent = `${remaining} processo${remaining === 1 ? "" : "s"}`;
  });

  item.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    const params = new URLSearchParams({
      name,
      identification,
      process: number,
    });
    window.location.href = `process-overview.html?${params.toString()}`;
  });

  linkedList.append(item);
});
