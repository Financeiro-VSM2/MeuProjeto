const reportTypes = { financeiro: ["Relatório financeiro", "Entradas e saídas", "3 lançamentos"], acordos: ["Relatório de acordos", "Acordos e parcelas", "12 acordos"], sucumbencias: ["Relatório de sucumbências", "Honorários e rateios", "8 registros"], alvaras: ["Relatório de alvarás", "Solicitações e liberações", "5 solicitações"], protocolos: ["Relatório de protocolos", "Protocolos e movimentações", "18 protocolos"] };
const categories = [...document.querySelectorAll(".report-category")];
const form = document.querySelector("#hub-filters");
function syncReport(type) {
  const [kicker, title, count] = reportTypes[type];
  document.querySelector("#report-kicker").textContent = kicker;
  document.querySelector("#report-title").textContent = title;
  document.querySelector("#hub-count").textContent = `${count} disponíveis`;
}
categories.forEach((button) => button.addEventListener("click", () => {
  categories.forEach((item) => item.classList.toggle("active", item === button));
  syncReport(button.dataset.report);
}));
form?.addEventListener("input", () => { document.querySelector("#hub-count").textContent = "Filtros aplicados — confira a seleção e baixe o relatório"; });
form?.addEventListener("reset", () => window.setTimeout(() => syncReport(document.querySelector(".report-category.active").dataset.report)));
document.querySelector("#download-all")?.addEventListener("click", () => {
  const type = document.querySelector(".report-category.active").dataset.report;
  const filters = Object.fromEntries(new FormData(form));
  const csv = `\uFEFFRelatório;${reportTypes[type][0]}\r\nTipo;${reportTypes[type][1]}\r\nBusca;${filters.search || "Todas"}\r\nPeríodo;${filters.from || "Início"} até ${filters.to || "Fim"}\r\nStatus;${filters.status}`;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = `relatorio-${type}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
});
