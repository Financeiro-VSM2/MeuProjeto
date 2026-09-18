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
  const item = document.createElement("tr");
  item.className = "linked-process";
  const processCell = document.createElement("td");
  processCell.className = "linked-process-number";
  const numberLabel = document.createElement("strong");
  numberLabel.textContent = number;
  processCell.append(numberLabel);
  const typeCell = document.createElement("td");
  typeCell.textContent = index === 0 ? "Petição Inicial · Ação Monitória" : "Acompanhamento processual";
  const statusCell = document.createElement("td");
  const status = document.createElement("span");
  status.className = "linked-status";
  status.textContent = "Ativo";
  statusCell.append(status);
  const actions = document.createElement("td");
  actions.className = "linked-process-actions";
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "linked-process-delete";
  deleteButton.setAttribute("aria-label", `Excluir processo ${number}`);
  deleteButton.title = "Excluir processo";
  deleteButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" /></svg>';
  actions.append(deleteButton);
  item.append(processCell, typeCell, statusCell, actions);

  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!window.confirm(`Excluir o processo ${number}?`)) return;

    item.remove();
    const remaining = linkedList.querySelectorAll("tr.linked-process").length;
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
