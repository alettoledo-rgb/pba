const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.hidden = true;
  if (burger) burger.setAttribute("aria-expanded", "false");
}

function toggleMobileMenu() {
  if (!mobileMenu || !burger) return;
  const isHidden = mobileMenu.hidden;
  mobileMenu.hidden = !isHidden;
  burger.setAttribute("aria-expanded", String(isHidden));
}

if (burger && mobileMenu) {
  burger.addEventListener("click", toggleMobileMenu);

  mobileMenu.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.classList && t.classList.contains("mobile__link")) closeMobileMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });
}

const planButtons = document.querySelectorAll("[data-plan]");
const planSelect = document.getElementById("planSelect");

planButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const plan = btn.getAttribute("data-plan");
    if (planSelect && plan) planSelect.value = plan;
  });
});

const leadForm = document.getElementById("leadForm");
const formStatus = document.getElementById("formStatus");

function sanitize(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

if (leadForm) {
  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(leadForm);
    const nome = sanitize(fd.get("nome"));
    const email = sanitize(fd.get("email"));
    const whatsapp = sanitize(fd.get("whatsapp"));
    const empresa = sanitize(fd.get("empresa"));
    const plano = sanitize(fd.get("plano"));
    const mensagem = sanitize(fd.get("mensagem"));

    if (!nome || !email || !whatsapp) {
      if (formStatus) formStatus.textContent = "Preencha nome, email e WhatsApp.";
      return;
    }

    const subject = encodeURIComponent("Prime Board Advisory, contato pelo site");
    const body = encodeURIComponent(
      `Novo contato\n\n` +
      `Nome: ${nome}\n` +
      `Email: ${email}\n` +
      `WhatsApp: ${whatsapp}\n` +
      `Empresa: ${empresa}\n` +
      `Plano: ${plano}\n\n` +
      `Mensagem:\n${mensagem}\n`
    );

    const toEmail = "contato@primeboard.com.br";
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;

    if (formStatus) formStatus.textContent = "Abrindo seu email para envio...";
  });
}
(function () {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav--open");
      burger.classList.toggle("burger--open");
    });
  }

  const form = document.getElementById("applyForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const role = (data.get("role") || "").toString().trim();
    const stage = (data.get("stage") || "").toString().trim();
    const msg = (data.get("msg") || "").toString().trim();

    const subject = encodeURIComponent("Aplicação PBA");
    const bodyLines = [
      "Olá, quero avaliar se a Prime Board Advisory faz sentido para minha empresa.",
      "",
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Papel: ${role}`,
      `Momento: ${stage}`,
      "",
      "Contexto breve:",
      msg || "Sem mensagem adicional.",
      "",
      "Obrigado."
    ];

    const body = encodeURIComponent(bodyLines.join("\n"));
    const mailto = `mailto:contato@primeboard.com.br?subject=${subject}&body=${body}`;

    window.location.href = mailto;
  });
})();
