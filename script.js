const ACCESS_CODE = "JZ2026";

const copy = {
  en: {
    role: "Interaction & Experience Design Expert", city: "Beijing", years: "16 years in design",
    idea: "Ideas worth sharing.", motto: "Stay simple. Stay useful.",
    stages: ["Designing products.", "Building systems.", "Shaping organizations."], enter: "Enter portfolio",
    nav: ["Philosophy", "Expertise", "Journey", "Portfolio", "Contact"],
    philosophyTitle: "A quiet force for clarity.",
    philosophy: "Good design does not make complexity disappear. It gives complexity a form people can understand, trust, and use.",
    philosophyMore: "I work where systems are large, decisions are consequential, and clarity matters—from enterprise transformation to global cloud infrastructure.",
    expertise: [
      ["Interaction Experience", "Turning dense workflows and technical concepts into experiences that feel structured, predictable, and human."],
      ["Cloud Product Experience", "Designing infrastructure products where scale, consistency, efficiency, and expert workflows must coexist."],
      ["Design Systems", "Building shared languages, components, specifications, and platforms that help teams work as one."]
    ],
    journeyTitle: "Sixteen years, one continuous question:", journeyQuestion: "How can complex technology feel clear?",
    jobs: [["2010—2011", "Nokia", "Systems thinking begins"], ["2011—2017", "SAP", "Designing enterprise change"], ["2017—Now", "Alibaba Cloud", "Designing at scale"]],
    privateTitle: "The work is private. The ideas are public.",
    privateBody: "Detailed experience and case studies are shared with the right context. Enter the access code to explore the full portfolio.",
    contactTitle: "Ideas become more useful when shared.", codeLabel: "Access code", unlock: "Unlock portfolio",
    error: "That code does not look right. Please try again.", unlocked: "Portfolio unlocked",
    unlockedBody: "The complete project archive will appear here as case-study material is added.", close: "Close", view: "View"
  },
  zh: {
    role: "交互体验设计专家", city: "北京", years: "16 年设计经验", idea: "值得分享的想法。", motto: "保持简单，保持有用。",
    stages: ["设计产品。", "构建系统。", "影响组织。"], enter: "进入作品集",
    nav: ["设计理念", "专业能力", "职业经历", "作品集", "联系"],
    philosophyTitle: "一种让复杂变清晰的力量。",
    philosophy: "好的设计并不会让复杂性消失，而是为复杂性建立一种人们可以理解、信任并使用的形式。",
    philosophyMore: "我持续工作在系统庞大、决策复杂且高度需要清晰性的领域——从企业数字化转型，到全球云基础设施。",
    expertise: [
      ["交互体验设计", "将密集的工作流与技术概念，转化为结构清晰、行为可预期且更有人性的体验。"],
      ["云产品体验设计", "为基础设施产品建立兼顾规模、一致性、效率与专家工作流的体验体系。"],
      ["设计系统构建", "构建共享语言、组件、规范与平台，让设计和研发团队以一致的方式协作。"]
    ],
    journeyTitle: "十六年，持续回答同一个问题：", journeyQuestion: "如何让复杂技术变得清晰？",
    jobs: [["2010—2011", "Nokia", "系统思维开始的地方"], ["2011—2017", "SAP", "在企业内部设计改变"], ["2017—至今", "阿里云", "在更大尺度上设计"]],
    privateTitle: "作品非公开，想法可以分享。", privateBody: "完整经历与项目案例会在合适的语境中分享。请输入邀请码，查看完整作品集。",
    contactTitle: "想法在分享之后，才会变得更有用。", codeLabel: "邀请码", unlock: "解锁作品集",
    error: "邀请码似乎不正确，请重试。", unlocked: "作品集已解锁", unlockedBody: "这里将随着案例资料补充，呈现完整的项目档案。", close: "关闭", view: "查看"
  }
};

let language = "en";
const modal = document.querySelector("#modal");
const menu = document.querySelector(".desktop-nav");
const progressBar = document.querySelector("#scrollProgress");
const floatingIndex = document.querySelector("#floatingIndex");
const cursorOrb = document.querySelector("#cursorOrb");
const sections = [...document.querySelectorAll(".hero, .content-section")];
const sectionNames = ["Top", "Philosophy", "Expertise", "Journey", "Portfolio", "Contact"];

function renderCollections(t) {
  document.querySelector("#expertiseList").innerHTML = t.expertise.map(([title, description], index) => `
    <article class="expertise-row"><span class="large-number">0${index + 1}</span><h3>${title}</h3><p>${description}</p><span class="row-link" aria-hidden="true">${t.view}</span></article>`).join("");
  document.querySelector("#timeline").innerHTML = t.jobs.map(([dates, company, summary]) => `
    <article><span>${dates}</span><h3>${company}</h3><p>${summary}</p></article>`).join("");
}

function applyLanguage() {
  const t = copy[language];
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-copy]").forEach((node) => { node.textContent = t[node.dataset.copy]; });
  document.querySelectorAll("[data-stage]").forEach((node) => { node.textContent = t.stages[Number(node.dataset.stage)]; });
  document.querySelectorAll("[data-nav]").forEach((node) => { node.textContent = t.nav[Number(node.dataset.nav)]; });
  document.querySelectorAll("[data-nav-label]").forEach((node) => { node.textContent = t.nav[Number(node.dataset.navLabel)]; });
  document.querySelector("#languageButton").textContent = language === "en" ? "中文" : "EN";
  document.querySelector("#languageButton").setAttribute("aria-label", language === "en" ? "切换至中文" : "Switch to English");
  document.querySelector("#closeModal").textContent = t.close;
  renderCollections(t);
  refreshRevealTargets();
}

function refreshRevealTargets() {
  document.querySelectorAll(".content-section, .expertise-row, .timeline article, .private-preview article").forEach((node) => {
    node.classList.add("reveal");
    revealObserver?.observe(node);
  });
}

function openModal() {
  modal.hidden = false;
  document.body.classList.add("modal-open");
  document.querySelector("#gateFormView").hidden = false;
  document.querySelector("#successView").hidden = true;
  document.querySelector("#formError").hidden = true;
  document.querySelector("#accessCode").value = "";
  requestAnimationFrame(() => document.querySelector("#accessCode").focus());
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

document.querySelector("#languageButton").addEventListener("click", () => { language = language === "en" ? "zh" : "en"; applyLanguage(); });
document.querySelector("#themeButton").addEventListener("click", (event) => {
  const signal = document.documentElement.dataset.theme !== "signal";
  document.documentElement.dataset.theme = signal ? "signal" : "light";
  event.currentTarget.textContent = signal ? "Index" : "Signal";
});
document.querySelector("#menuButton").addEventListener("click", (event) => {
  menu.classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", String(menu.classList.contains("is-open")));
  event.currentTarget.textContent = menu.classList.contains("is-open") ? "Close" : "Menu";
});
menu.addEventListener("click", () => { menu.classList.remove("is-open"); document.querySelector("#menuButton").textContent = "Menu"; });
document.querySelectorAll(".open-gate").forEach((button) => button.addEventListener("click", openModal));
document.querySelector("#closeModal").addEventListener("click", closeModal);
document.querySelector("#successClose").addEventListener("click", closeModal);
modal.addEventListener("mousedown", (event) => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeModal(); menu.classList.remove("is-open"); } });
document.querySelector(".private-preview").addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openModal();
  }
});
document.querySelector("#gateForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const valid = document.querySelector("#accessCode").value.trim().toUpperCase() === ACCESS_CODE;
  document.querySelector("#formError").hidden = valid;
  if (valid) { document.querySelector("#gateFormView").hidden = true; document.querySelector("#successView").hidden = false; }
});

const revealObserver = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }) : null;

const indexObserver = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  const index = sections.indexOf(visible.target);
  if (index >= 0) floatingIndex.textContent = `${String(index + 1).padStart(2, "0")} / ${sectionNames[index]}`;
}, { threshold: [0.28, 0.45, 0.62] }) : null;

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
  progressBar.style.height = `${progress * 100}%`;
}

let cursorX = -200;
let cursorY = -200;
let orbX = -200;
let orbY = -200;
function animateCursor() {
  orbX += (cursorX - orbX) * 0.12;
  orbY += (cursorY - orbY) * 0.12;
  cursorOrb.style.transform = `translate3d(${orbX}px, ${orbY}px, 0)`;
  requestAnimationFrame(animateCursor);
}

document.addEventListener("pointermove", (event) => {
  cursorX = event.clientX;
  cursorY = event.clientY;
});
document.addEventListener("pointerleave", () => {
  cursorX = -200;
  cursorY = -200;
});
window.addEventListener("scroll", updateProgress, { passive: true });
sections.forEach((section) => indexObserver?.observe(section));

applyLanguage();
updateProgress();
if (!window.matchMedia("(pointer: coarse)").matches) animateCursor();
