const form = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const formStatus = document.querySelector("#form-status");
const submitButton = form.querySelector("button[type='submit']");

function setStatus(message, type = "") {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`.trim();
}

function validateForm() {
  let valid = true;
  emailError.textContent = "";
  passwordError.textContent = "";

  if (!emailInput.validity.valid) {
    emailError.textContent = "Digite um e-mail válido.";
    valid = false;
  }

  if (passwordInput.value.length < 6) {
    passwordError.textContent = "A senha deve ter pelo menos 6 caracteres.";
    valid = false;
  }

  return valid;
}

async function signInWithSupabase(email, password) {
  const { supabaseUrl, supabaseAnonKey } = window.APP_CONFIG;

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      demo: true,
      message: "A tela está pronta. Configure o Supabase em config.js para ativar o acesso.",
    };
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || data.msg || "Não foi possível entrar.");
  }

  sessionStorage.setItem("agravo.access_token", data.access_token);
  if (document.querySelector("#remember").checked && data.refresh_token) {
    localStorage.setItem("agravo.refresh_token", data.refresh_token);
  }

  return data;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("");

  if (!validateForm()) {
    return;
  }

  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "Entrando...";

  try {
    const result = await signInWithSupabase(emailInput.value.trim(), passwordInput.value);
    setStatus(result.demo ? result.message : "Login realizado com sucesso.");
    window.setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 700);
  } catch (error) {
    setStatus(error.message, "error");
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "Entrar";
  }
});

document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(`#${button.dataset.target}`);
    const showing = target.type === "text";
    target.type = showing ? "password" : "text";
    button.setAttribute("aria-pressed", String(!showing));
    button.setAttribute("aria-label", showing ? "Mostrar senha" : "Ocultar senha");
  });
});

document.querySelector("#forgot-password").addEventListener("click", (event) => {
  event.preventDefault();
  setStatus("O fluxo de recuperação será habilitado junto com o Supabase.");
});

document.querySelector("#signup-link").addEventListener("click", (event) => {
  event.preventDefault();
  setStatus("O cadastro será habilitado junto com o Supabase.");
});
