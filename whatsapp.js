const conversations = [
  { name: "Angélia Aparecida", initials: "AA", date: "17/09", preview: "Você: Olá, Angélia Aparecida!..." },
  { name: "Kellen Blenda", initials: "KB", date: "16/09", preview: "Você: Olá, Kellen Blenda! 👋 Id..." },
  { name: "Valter Peters", initials: "VP", date: "10/09", preview: "Você: *Cássio Ribeiro:* Boa tar..." },
  { name: "Fabiano dos Santos", initials: "FD", date: "10/09", preview: "Você: Olá, Fabiano dos Santos!..." },
  { name: "Alessandro dos Santos Silva", initials: "AD", date: "04/09", preview: "Você: *Cássio Ribeiro:* Olá bo..." },
  { name: "Dr. Felipe Albano", initials: "FA", date: "01/09", preview: "Você: Olá, Dr. Felipe Albano! Ex..." },
  { name: "Rcm Financeiro", initials: "RF", date: "24/08", preview: "Você: Olá, Rcm Financeiro! A p..." },
  { name: "Dr. Ademar Robles", initials: "DA", date: "24/08", preview: "Você: Olá, Dr. Ademar Robles!..." },
  { name: "Gustavo Henrique Colhado", initials: "GH", date: "24/08", preview: "Você: Olá, Gustavo H. Colhado!..." },
];

const messages = [
  { type: "sent", text: "*Cássio Ribeiro:*\nBoa tarde, Valter! Tudo bem?\n\nDesculpe pelo incômodo. A advogada responsável saiu do escritório e algumas informações acabaram ficando pendentes. Com o comprovante que você enviou, consegui localizar o erro e já conferi tudo.\n\nEstá tudo certo com seu acordo. Desculpe pelo transtorno e obrigado pela compreensão!", time: "13:50 ✓✓" },
  { type: "sent", text: "*Cássio Ribeiro:*\nTenha uma ótima semana!", time: "13:51 ✓✓" },
  { type: "sent", text: "Olá, Valter Peters! 😊\n\nA parcela *03/17* do seu acordo de sucumbência, da *Cooperativa SICOOB*, no valor de *R$ 150,00*, vence hoje, *10/09/2026*.\n\nEntre em contato conosco para regularizar.\n\n*Atenção:* o pagamento da sucumbência deve ser realizado por meio do PIX do escritório.", time: "09:00 ✓✓" },
  { type: "received", text: "bom dia, até o final do dia eu faço o pagamento ok", time: "09:03" },
  { type: "sent", text: "*Cássio Ribeiro:*\nBoa tarde, Valter! Tudo bem? Tranquilo, ficamos no aguardo", time: "14:25 ✓✓" },
];

const items = document.querySelector("#conversation-items");
const area = document.querySelector("#message-area");

function renderConversations(filter = "") {
  items.innerHTML = "";
  conversations
    .filter((conversation) => conversation.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((conversation, index) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = `conversation-item${index === 2 ? " active" : ""}`;
      item.innerHTML = `<span class="conversation-avatar">${conversation.initials}</span><span class="conversation-copy"><strong>${conversation.name}</strong><span>✓ ${conversation.preview}</span></span><time class="conversation-date">${conversation.date}</time>`;
      item.addEventListener("click", () => {
        document.querySelectorAll(".conversation-item").forEach((current) => current.classList.remove("active"));
        item.classList.add("active");
        document.querySelector("#chat-name").textContent = conversation.name;
        document.querySelector("#chat-avatar").textContent = conversation.initials;
      });
      items.append(item);
    });
}

function renderMessages() {
  area.innerHTML = "";
  messages.forEach((message) => {
    const bubble = document.createElement("div");
    bubble.className = `message ${message.type}`;
    bubble.innerHTML = `${message.text}<time>${message.time}</time>`;
    area.append(bubble);
  });
  area.scrollTop = area.scrollHeight;
}

document.querySelector("#conversation-search").addEventListener("input", (event) => renderConversations(event.target.value));
document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#message-input");
  const text = input.value.trim();
  if (!text) return;
  messages.push({ type: "sent", text, time: "agora ✓" });
  input.value = "";
  renderMessages();
});

renderConversations();
renderMessages();
