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
    <section class="agreement-layout process-tab-panel">
      <section class="agreement-card collection-data">
        <div class="agreement-card-heading"><p class="kicker">Dados da cobrança</p><button type="button" class="outline-button">＋ &nbsp;Editar cobrança</button></div>
        <div class="collection-fields">
          <div><span>WhatsApp</span><strong>—</strong></div>
          <div><span>Nome do contato</span><strong>—</strong></div>
          <div><span>Tipo de vínculo</span><strong>—</strong></div>
          <div><span>Autoriza cobrança</span><strong>Não</strong></div>
        </div>
      </section>
      <section class="agreement-card installments-card">
        <div class="installments-heading">
          <div class="installments-summary">
            <p class="kicker">Parcelas <strong>(49)</strong></p>
            <span>Total <b>R$ 27.038,38</b></span>
            <span>Pago <b>R$ 9.575,93</b></span>
            <span>Em aberto <b>R$ 17.055,36</b></span>
            <span>Honorários <b>R$ 957,63</b></span>
          </div>
          <button type="button" class="primary-button agreement-download" aria-label="Baixar parcelas">⌄ &nbsp;Baixar</button>
        </div>
        <div class="installments-table-wrap">
          <table class="installments-table">
            <thead><tr><th scope="col">Parcela</th><th scope="col">Vencimento</th><th scope="col">Pagamento</th><th scope="col">Valor</th><th scope="col">Valor pago</th><th scope="col">% Hon.</th><th scope="col">Honorários</th><th scope="col">Status</th><th scope="col">Ações</th></tr></thead>
            <tbody>
              <tr><td>E</td><td>01/04/2025</td><td>01/08/2025</td><td>R$ 4.297,90</td><td>R$ 4.297,90</td><td>10%</td><td>R$ 429,79</td><td><span class="installment-status settled">Liquidado</span></td><td class="installment-actions"><button type="button" class="installment-undo">Desfazer baixa</button></td></tr>
              <tr><td>01/48</td><td>15/08/2025</td><td>01/08/2025</td><td>R$ 473,76</td><td>R$ 473,76</td><td>10%</td><td>R$ 47,38</td><td><span class="installment-status settled">Liquidado</span></td><td class="installment-actions"><button type="button" class="installment-undo">Desfazer baixa</button></td></tr>
              <tr><td>02/48</td><td>15/09/2025</td><td>—</td><td>R$ 473,76</td><td>R$ 0,00</td><td>10%</td><td>R$ 47,38</td><td><span class="installment-status open">Em aberto</span></td><td class="installment-actions"><span class="installment-action-hint">Use “Baixar”</span></td></tr>
            </tbody>
          </table>
        </div>
      </section>
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
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelectorAll(".process-tabs a").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    const tabName = tab.getAttribute("href").slice(1);
    window.history.replaceState(null, "", `#${tabName}`);
    tabContent.innerHTML = tabName === "overview" ? overviewMarkup : tabPanels[tabName];
    if (tabName === "overview") populateOverview();
    if (tabName === "agreement") bindInstallmentActions();
  });
});

function bindInstallmentActions() {
  const table = document.querySelector(".installments-table");
  if (!table) return;

  document.querySelector(".agreement-download").addEventListener("click", () => {
    table.querySelectorAll("tbody tr").forEach((row) => {
      if (row.querySelector(".installment-status.open")) toggleInstallmentEdit(row);
    });
  });

  table.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const row = button.closest("tr");
    if (!row) return;

    if (button.classList.contains("installment-undo")) {
      row.cells[2].textContent = "—";
      row.cells[4].textContent = "R$ 0,00";
      row.cells[7].innerHTML = '<span class="installment-status open">Em aberto</span>';
      row.cells[8].innerHTML = '<span class="installment-action-hint">Use “Baixar”</span>';
    }
  });
}

function toggleInstallmentEdit(row) {
  if (row.classList.contains("is-editing") || row.querySelector(".installment-status.settled")) return;

  row.classList.add("is-editing");
  const originalValues = Array.from(row.cells).slice(1, 7).map((cell) => cell.textContent.trim());
  originalValues.forEach((value, index) => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = value === "—" ? "" : value;
    input.className = "installment-input";
    row.cells[index + 1].replaceChildren(input);
  });

  const actions = row.querySelector(".installment-actions");
  actions.innerHTML = '<button type="button" class="installment-save">Salvar baixa</button><button type="button" class="installment-cancel">Cancelar</button>';
  actions.querySelector(".installment-save").addEventListener("click", () => {
    const inputs = Array.from(row.querySelectorAll(".installment-input"));
    if (!inputs[1].value.trim() || !inputs[3].value.trim()) {
      window.alert("Informe a data de pagamento e o valor pago para dar baixa.");
      return;
    }
    inputs.forEach((input, index) => {
      row.cells[index + 1].textContent = input.value.trim() || "—";
    });
    row.cells[7].innerHTML = '<span class="installment-status settled">Liquidado</span>';
    actions.innerHTML = '<button type="button" class="installment-undo">Desfazer baixa</button>';
    row.classList.remove("is-editing");
  });
  actions.querySelector(".installment-cancel").addEventListener("click", () => {
    originalValues.forEach((value, index) => {
      row.cells[index + 1].textContent = value || "—";
    });
    actions.innerHTML = '<span class="installment-action-hint">Use “Baixar”</span>';
    row.classList.remove("is-editing");
  });
}
