const overviewParams = new URLSearchParams(window.location.search);
const overviewName = overviewParams.get("name") || "Titular do processo";
const overviewIdentification = overviewParams.get("identification") || "CPF/CNPJ não informado";
const overviewNumber = overviewParams.get("process") || "0007285-83.2024.8.16.0098";

document.querySelector("#overview-name").textContent = overviewName.toUpperCase();
document.querySelector("#overview-identification").textContent = overviewIdentification;
document.querySelector("#overview-field-name").textContent = overviewName.toUpperCase();
document.querySelector("#overview-field-identification").textContent = overviewIdentification;
document.querySelector("#overview-number").textContent = overviewNumber;

const tabContent = document.querySelector("#process-tab-content");
const overviewMarkup = tabContent.innerHTML;

const tabPanels = {
  costs: `
    <section class="overview-card process-tab-panel">
      <div class="overview-card-heading"><p class="kicker">Custas pagas</p><button type="button" class="outline-button">＋ &nbsp;Lançar pagamento</button></div>
      <div class="tab-summary-grid"><div><span>Total pago</span><strong>R$ 0,00</strong></div><div><span>Quantidade de lançamentos</span><strong>0</strong></div><div><span>Última atualização</span><strong>Sem lançamentos</strong></div></div>
      <div class="empty-tab"><span>R$</span><strong>Nenhuma custa paga cadastrada</strong><small>Os pagamentos relacionados a este processo aparecerão aqui.</small></div>
    </section>`,
  agreement: `
    <section class="overview-card process-tab-panel">
      <div class="overview-card-heading"><p class="kicker">Acordo</p><button type="button" class="outline-button">＋ &nbsp;Cadastrar acordo</button></div>
      <div class="tab-summary-grid"><div><span>Status</span><strong>Sem acordo</strong></div><div><span>Valor negociado</span><strong>R$ 0,00</strong></div><div><span>Parcelas</span><strong>0</strong></div></div>
      <div class="empty-tab"><span>≡</span><strong>Nenhum acordo cadastrado</strong><small>Cadastre um acordo para acompanhar pagamentos e parcelas.</small></div>
    </section>`,
  release: `
    <section class="overview-card process-tab-panel">
      <div class="overview-card-heading"><p class="kicker">Alvará</p><button type="button" class="outline-button">＋ &nbsp;Adicionar alvará</button></div>
      <div class="empty-tab"><span>▣</span><strong>Nenhum alvará cadastrado</strong><small>Os alvarás vinculados ao processo aparecerão nesta aba.</small></div>
    </section>`,
  seizure: `
    <section class="overview-card process-tab-panel">
      <div class="overview-card-heading"><p class="kicker">Penhora</p><button type="button" class="outline-button">＋ &nbsp;Adicionar penhora</button></div>
      <div class="empty-tab"><span>◇</span><strong>Nenhuma penhora cadastrada</strong><small>Registre aqui bens, valores ou direitos vinculados ao processo.</small></div>
    </section>`,
  protocol: `
    <section class="overview-card process-tab-panel">
      <div class="overview-card-heading"><p class="kicker">Protocolo</p><button type="button" class="outline-button">＋ &nbsp;Novo protocolo</button></div>
      <div class="overview-table"><div><span>Tipo</span><strong>Petição Inicial - Execução</strong></div><div><span>Data</span><strong>18/11/2024</strong></div><div><span>Status</span><strong class="table-status">Protocolado</strong></div></div>
    </section>`,
  history: `
    <section class="overview-card process-tab-panel">
      <div class="overview-card-heading"><p class="kicker">Histórico</p></div>
      <div class="timeline"><div><i></i><strong>Processo protocolado</strong><span>18/11/2024 · Petição Inicial - Execução</span></div><div><i></i><strong>Processo cadastrado no sistema</strong><span>18/11/2024</span></div></div>
    </section>`,
};

function populateOverview() {
  document.querySelector("#overview-field-name").textContent = overviewName.toUpperCase();
  document.querySelector("#overview-field-identification").textContent = overviewIdentification;
  document.querySelector("#overview-number").textContent = overviewNumber;
}

document.querySelectorAll(".process-tabs a").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".process-tabs a").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    const tabName = tab.getAttribute("href").slice(1);
    tabContent.innerHTML = tabName === "overview" ? overviewMarkup : tabPanels[tabName];
    if (tabName === "overview") populateOverview();
  });
});
