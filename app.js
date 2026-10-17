/* ------------------------------------------------------------------ */
/*  CodeVerse — Cyber-IDE Educativo · UMNG Ingeniería en Multimedia     */
/*  Versión JavaScript vanilla (sin frameworks).                        */
/*  Los estilos usan las mismas clases utilitarias del original.        */
/* ------------------------------------------------------------------ */

const CORRECT_ANSWER = "int";
const FOCUS = "focus:outline-none focus:ring-2 focus:ring-cyan-400";

const AVATAR_SKINS = [
  { id: "rookie", label: "Cyber-Rookie", emoji: "🤖" },
  { id: "coder", label: "Cyborg Coder", emoji: "👾" },
  { id: "ninja", label: "Neon Ninja", emoji: "🥷" },
  { id: "wizard", label: "Data Wizard", emoji: "🧙" },
];

const ACCESSORIES = [
  { id: "helmet", label: "Casco Holográfico", emoji: "⛑️" },
  { id: "aura", label: "Aura Neón", emoji: "✨" },
  { id: "pet", label: "Cyber-Pet", emoji: "🐱‍🏍" },
];

const NAV_TABS = [
  { id: "path", label: "Mapa", icon: "map" },
  { id: "mission", label: "Misión Activa", icon: "cpu" },
  { id: "glossary", label: "Glosario", icon: "book-open" },
  { id: "profile", label: "Perfil", icon: "award" },
  { id: "supervisor", label: "Supervisor", icon: "users" },
];

const OPTIONS = ["int", "string", "float", "void"];

const DIAGNOSTIC_QUESTIONS = [
  {
    prompt: "¿Cuál es la salida de este pseudocódigo?",
    code: "x = 4\ny = 2\nmostrar x * y",
    options: ["6", "8", "42"],
    correct: "8",
  },
  {
    prompt: "¿Cuál de estas opciones representa una secuencia lógica correcta?",
    code: null,
    options: [
      "Repetir → Comparar → Iniciar",
      "Iniciar → Comparar → Repetir",
      "Comparar → Iniciar → Terminar",
    ],
    correct: "Iniciar → Comparar → Repetir",
  },
  {
    prompt: "Si una condición es falsa, ¿qué bloque se ejecuta?",
    code: "si (condicion) { A } sino { B }",
    options: ["A", "B", "Ambos"],
    correct: "B",
  },
];

const GLOSSARY_TAGS = ["Todas", "Variables", "Operadores", "Condicionales", "Ciclos"];

const GLOSSARY_TERMS = [
  { term: "int", tag: "Variables", explanation: "Guarda números enteros, sin decimales.", code: "int vidas = 3;" },
  { term: "float", tag: "Variables", explanation: "Guarda números con decimales, útil para medidas exactas.", code: "float escala = 1.5;" },
  { term: "std::string", tag: "Variables", explanation: "Guarda texto: nombres, títulos, rutas de archivo.", code: 'string nivel = "Boss final";' },
  { term: "std::cout", tag: "Operadores", explanation: "Imprime texto o valores en la consola.", code: 'cout << "Cargando...";' },
  { term: "std::cin", tag: "Operadores", explanation: "Lee lo que el usuario escribe y lo guarda en una variable.", code: "int puntos;\ncin >> puntos;" },
  {
    term: "if / else",
    tag: "Condicionales",
    explanation: "Ejecuta un bloque si se cumple una condición, y otro si no.",
    code: "if (xp > 100) {\n  subirNivel();\n} else {\n  seguirJugando();\n}",
  },
  { term: "for", tag: "Ciclos", explanation: "Repite un bloque un número determinado de veces.", code: "for (int i = 0; i < 5; i++) {\n  cout << i;\n}" },
  { term: "while", tag: "Ciclos", explanation: "Repite un bloque mientras una condición sea verdadera.", code: "while (vidas > 0) {\n  vidas--;\n}" },
];

const BADGES = [
  { label: "Lógico Principiante", earned: true },
  { label: "Maestro de Sintaxis", earned: true },
  { label: "Cazador de Bugs", earned: false, progress: 40 },
  { label: "Racha de 7 días", earned: false, progress: 60 },
];

const STUDENTS = [
  { name: "Mariana Ríos", unit: "Sector 2 · Matriz de Datos", status: "green", note: "Avanza sin dificultades, 3 misiones esta semana." },
  { name: "Julián Castro", unit: "Sector 1 · Sistemas Primarios", status: "yellow", note: "Repitió el mismo ejercicio 3 veces. Requiere refuerzo." },
  { name: "Valentina Gómez", unit: "Sector 2 · Matriz de Datos", status: "red", note: "Sin actividad hace 6 días. Posible frustración detectada." },
  { name: "Andrés Pardo", unit: "Sector 3 · Guardián Condicional", status: "green", note: "Racha activa de 9 días, buen ritmo de avance." },
];

const STATUS_META = {
  green: { label: "Avanzando", dot: "bg-emerald-400", ring: "border-emerald-700", text: "text-emerald-300", icon: "check" },
  yellow: { label: "Requiere refuerzo", dot: "bg-amber-400", ring: "border-amber-700", text: "text-amber-300", icon: "alert-triangle" },
  red: { label: "Dificultades recurrentes", dot: "bg-rose-400", ring: "border-rose-700", text: "text-rose-300", icon: "x" },
};

/* ------------------------------- Estado -------------------------------- */

let tab = "path";
let diagnosticOpen = false;

// Misión activa
let missionSelected = null;
let missionResult = null; // null | "success" | "error"
let coreStability = 65;
let briefTab = "holovid";
let showTranscript = false;
let hintLevel = 0;

// Diagnóstico
let diagStep = 0;
let diagSelected = null;
let diagFinished = false;

// Glosario
let glossaryQuery = "";
let glossaryTag = "Todas";

// Perfil
let selectedSkin = "rookie";
let selectedAccessories = ["pet"];

function resetMission() {
  missionSelected = null;
  missionResult = null;
  coreStability = 65;
  briefTab = "holovid";
  showTranscript = false;
  hintLevel = 0;
}
function resetDiagnostic() {
  diagStep = 0;
  diagSelected = null;
  diagFinished = false;
}
function resetGlossary() {
  glossaryQuery = "";
  glossaryTag = "Todas";
}
function resetProfile() {
  selectedSkin = "rookie";
  selectedAccessories = ["pet"];
}

function setTab(id) {
  if (id !== tab) {
    if (tab === "mission") resetMission();
    if (tab === "glossary") resetGlossary();
    if (tab === "profile") resetProfile();
    tab = id;
  }
  render();
}

/* ------------------------------ Utilidades ------------------------------ */

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function icon(name, cls, attrs) {
  return '<i data-lucide="' + name + '" class="' + cls + '"' + (attrs || "") + "></i>";
}

/* ----------------------------- Componentes ------------------------------ */

function NpcBubble(text, tone) {
  const ring = (tone || "cyan") === "cyan" ? "border-cyan-500 shadow-cyan-950" : "border-amber-400 shadow-amber-950";
  return `
<div class="flex items-start gap-3">
  <div class="h-11 w-11 rounded-full bg-slate-900 border-2 ${ring} shadow-lg flex items-center justify-center shrink-0">
    <span class="text-xl" aria-hidden="true">🤖</span>
  </div>
  <div class="relative bg-slate-800 border-2 ${ring} shadow-lg rounded-2xl px-4 py-3">
    <span class="absolute -left-1.5 top-4 h-3 w-3 bg-slate-800 border-l-2 border-b-2 border-inherit rotate-45"></span>
    <p class="text-sm font-bold text-cyan-300 mb-0.5">Cyber-Bot Byte</p>
    <p class="text-base text-slate-200">${esc(text)}</p>
  </div>
</div>`;
}

function GlobalHeader() {
  return `
<header data-view="header" class="bg-slate-800 border-b-2 border-cyan-500">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
    <div class="flex items-center gap-3 min-w-0">
      <div class="h-11 w-11 rounded-xl bg-slate-900 border-2 border-cyan-400 shadow-lg shadow-cyan-500 flex items-center justify-center shrink-0">
        ${icon("terminal", "h-5 w-5 text-cyan-300")}
      </div>
      <div class="min-w-0">
        <span class="hidden sm:inline-block text-sm font-bold text-purple-300 bg-purple-950 border border-purple-700 rounded-full px-2 py-0.5 mt-1">Ing. Multimedia · UMNG</span>
      </div>
    </div>

    <div class="flex items-center gap-3 sm:gap-5 shrink-0">
      <div class="flex items-center gap-1.5 text-orange-400 font-extrabold text-sm" title="Racha de días seguidos">
        ${icon("flame", "h-5 w-5 fill-orange-400")}
        <span>12</span>
      </div>
      <div class="flex items-center gap-1.5 text-cyan-300 font-extrabold text-sm" title="Nivel y XP">
        ${icon("zap", "h-5 w-5 fill-cyan-300")}
        <span class="hidden xs:inline">Nv.2 · </span>860XP</div>
      <div class="flex items-center gap-1.5 text-purple-300 font-extrabold text-sm" title="Gemas">
        ${icon("gem", "h-5 w-5 fill-purple-400")}
        <span>320</span>
      </div>
      <button class="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 bg-slate-900 border-2 border-emerald-400 shadow-lg shadow-emerald-500 ${FOCUS}" aria-label="Ver perfil — Avatar: Cyber-Rookie"><span class="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-lg" aria-hidden="true">🤖</span><span class="hidden md:inline text-sm font-bold text-emerald-300">Cyber-Rookie</span></button>
    </div>
  </div>
</header>`;
}

function BottomNav() {
  const buttons = NAV_TABS.map(({ id, label, icon: ic }) => {
    const active = tab === id;
    return `<button data-action="set-tab" data-value="${id}" ${active ? 'aria-current="page"' : ""} class="flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-2xl min-w-[44px] min-h-[44px] justify-center transition-colors ${FOCUS} ${
      active ? "bg-cyan-950 text-cyan-300" : "text-slate-400 hover:text-slate-200"
    }">${icon(ic, "h-5 w-5")}<span class="text-[11px] font-bold leading-none">${label}</span></button>`;
  }).join("");
  return `
<nav data-view="nav" class="fixed bottom-3 inset-x-3 sm:inset-x-0 sm:mx-auto sm:max-w-lg z-40">
  <div class="bg-slate-800 border-2 border-slate-700 rounded-3xl shadow-lg shadow-cyan-950 flex items-center justify-around px-1 py-2">
    ${buttons}
  </div>
</nav>`;
}

/* -------------------------- Vista: Mapa de Misiones -------------------------- */

function DiagnosticBanner() {
  return `
<div class="w-full max-w-xl bg-gradient-to-r from-purple-950 to-slate-900 border-2 border-purple-500 rounded-2xl p-5 flex flex-col gap-4 shadow-lg shadow-purple-950">
  ${NpcBubble("¡Hola, Recluta! Haz tu escaneo inicial para personalizar tu ruta.")}
  <div class="flex items-center justify-between gap-4 flex-wrap">
    <div class="flex items-center gap-2">
      <span class="text-sm font-bold text-cyan-300 bg-cyan-950 border border-cyan-700 rounded-full px-2.5 py-0.5">+100 XP</span>
      <span class="text-sm font-bold text-amber-300 bg-amber-950 border border-amber-700 rounded-full px-2.5 py-0.5">🎁 Cofre Raro</span>
    </div>
    <button data-action="open-diagnostic" class="shrink-0 bg-purple-500 hover:bg-purple-400 text-white font-extrabold text-sm uppercase tracking-wide rounded-xl px-5 py-3 shadow-lg shadow-purple-950 min-h-[44px] ${FOCUS}">Realizar diagnóstico</button>
  </div>
</div>`;
}

function MissionNode({ kind, label, sector, offset }) {
  const style = `transform: translateX(${offset}px)`;

  if (kind === "chest") {
    return `
<div class="relative flex flex-col items-center" style="${style}">
  <div class="h-12 w-12 rounded-2xl bg-slate-800 border-2 border-purple-500 shadow-lg shadow-purple-950 flex items-center justify-center">
    ${icon("gift", "h-6 w-6 text-purple-300")}
  </div>
  <p class="mt-1 text-sm font-bold text-purple-300 text-center w-28">Cofre de Gemas</p>
</div>`;
  }

  if (kind === "complete") {
    const stars = [0, 1, 2].map(() => icon("star", "h-3.5 w-3.5 text-amber-400 fill-amber-400")).join("");
    return `
<div class="relative flex flex-col items-center" style="${style}">
  <div class="h-16 w-16 rounded-full bg-emerald-500 border-4 border-emerald-300 shadow-lg shadow-emerald-500 flex items-center justify-center">
    ${icon("check", "h-7 w-7 text-white", ' stroke-width="3"')}
  </div>
  <div class="flex items-center gap-0.5 mt-1.5">${stars}</div>
  <p class="mt-1 text-sm font-bold text-slate-500">${sector}</p>
  <p class="text-sm font-bold text-emerald-300 text-center w-32">✔️ ${label}</p>
  <span class="text-sm text-slate-500">Completado</span>
</div>`;
  }

  if (kind === "active") {
    return `
<div class="relative flex flex-col items-center" style="${style}">
  <div class="absolute -top-32 w-56 bg-slate-800 border-2 border-cyan-500 rounded-2xl px-3 py-2 shadow-lg shadow-cyan-950 text-center">
    <p class="text-sm font-extrabold text-cyan-300">Misión activa</p>
    <p class="text-sm text-slate-400 mt-0.5">Declara variables <span class="font-mono text-cyan-300">int</span> y <span class="font-mono text-cyan-300">string</span></p>
    <p class="text-sm font-bold text-cyan-200 mt-1">3/5 submisiones</p>
    <div class="absolute left-1/2 -bottom-1.5 -translate-x-1/2 h-3 w-3 bg-slate-800 border-b-2 border-r-2 border-cyan-500 rotate-45"></div>
  </div>
  <div class="absolute -top-9 flex flex-col items-center">
    <span class="text-2xl leading-none" aria-hidden="true">🤖</span>
    <span class="text-[11px] font-bold text-cyan-200 bg-slate-900 border border-cyan-700 rounded-full px-2 py-0.5 mt-0.5">Tú estás aquí</span>
  </div>
  <button data-action="open-mission" class="h-20 w-20 rounded-full bg-cyan-500 border-4 border-cyan-300 shadow-lg shadow-cyan-500 flex items-center justify-center animate-pulse hover:animate-none ${FOCUS}" aria-label="Continuar misión: Variables y Tipos de Datos">
    ${icon("cpu", "h-8 w-8 text-slate-900")}
  </button>
  <p class="mt-2 text-sm font-bold text-slate-500">${sector}</p>
  <p class="text-sm font-extrabold text-cyan-300 text-center w-36">${label}</p>
  <span class="mt-1 text-sm font-bold text-slate-900 bg-cyan-400 rounded-full px-3 py-1 uppercase tracking-wide flex items-center gap-1">🚀 Continuar misión</span>
</div>`;
  }

  if (kind === "review") {
    return `
<div class="relative flex flex-col items-center" style="${style}">
  <div class="h-12 w-12 rounded-2xl bg-slate-800 border-2 border-amber-500 shadow-lg shadow-amber-950 flex items-center justify-center">
    ${icon("trophy", "h-5 w-5 text-amber-300")}
  </div>
  <p class="mt-1 text-sm font-bold text-slate-400 text-center w-24">${label}</p>
</div>`;
  }

  if (kind === "boss") {
    return `
<div class="relative flex flex-col items-center" style="${style}">
  <div class="h-16 w-16 rounded-full bg-slate-800 border-4 border-rose-700 flex items-center justify-center">
    <span class="text-2xl" aria-hidden="true">👾</span>
  </div>
  <p class="mt-2 text-sm font-bold text-slate-500">${sector}</p>
  <p class="text-sm font-bold text-rose-400 text-center w-36">🔒 ${label}</p>
  <div class="w-32 mt-1">
    <div class="flex items-center justify-between text-[11px] font-bold text-rose-400 mb-0.5">
      <span class="flex items-center gap-1">${icon("swords", "h-3 w-3")} Jefe de sector</span>
      <span>0/100 HP</span>
    </div>
    <div class="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-rose-900">
      <div class="h-full bg-rose-600 rounded-full" style="width: 0%"></div>
    </div>
  </div>
  <span class="text-sm text-slate-600 mt-1">Requiere Nivel 3</span>
</div>`;
  }

  // locked
  return `
<div class="relative flex flex-col items-center" style="${style}">
  <div class="h-16 w-16 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center">
    ${icon("lock", "h-6 w-6 text-slate-500")}
  </div>
  <p class="mt-2 text-sm font-bold text-slate-500">${sector}</p>
  <p class="text-sm font-bold text-slate-500 text-center w-28">🔒 ${label}</p>
  <span class="text-sm text-slate-600">Bloqueado</span>
</div>`;
}

function MissionMap() {
  const nodes = [
    { kind: "complete", sector: "Sector 1 · Sistemas Primarios", label: "Fundamentos &amp; Lógica", offset: 0 },
    { kind: "chest", offset: 55 },
    { kind: "active", sector: "Sector 2 · Matriz de Datos", label: "Variables y Tipos de Datos", offset: 0 },
    { kind: "review", label: "Repaso rápido", offset: -55 },
    { kind: "boss", sector: "Sector 3 · Boss Level", label: "El Guardián Condicional", offset: 0 },
    { kind: "locked", sector: "Sector 4", label: "Bucle Infinito", offset: 40 },
  ];
  return `
<div class="flex flex-col items-center gap-12 py-10">
  ${nodes.map((n) => MissionNode(n)).join("")}
</div>`;
}

function StreakMultiplierWidget() {
  return `
<section class="rounded-2xl bg-gradient-to-br from-orange-950 to-slate-800 border-2 border-orange-600 p-4 shadow-lg shadow-orange-950">
  <p class="text-base font-extrabold text-orange-200 mb-2 flex items-center gap-2">${icon("trending-up", "h-4 w-4 text-orange-300")} Multiplicador de racha</p>
  <div class="flex items-center gap-2">
    ${icon("flame", "h-8 w-8 text-orange-400 fill-orange-400")}
    <div>
      <p class="text-lg font-extrabold text-orange-200">x1.5 XP</p>
      <p class="text-sm text-orange-300">Bonus activo · 4 días seguidos</p>
    </div>
  </div>
</section>`;
}

function DailyMissionWidget() {
  return `
<section class="rounded-2xl bg-slate-800 border-2 border-slate-700 p-4">
  <p class="text-base font-extrabold text-slate-50 mb-2 flex items-center gap-2">${icon("sparkles", "h-4 w-4 text-amber-400")} Misión diaria express</p>
  <p class="text-sm text-slate-400 mb-3">Corrige un punto y coma <span class="font-mono text-cyan-300">;</span> acumulado.</p>
  <div class="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden">
    <div class="h-full bg-amber-400 rounded-full" style="width: 60%"></div>
  </div>
  <p class="text-sm text-slate-500 mt-1">3 de 5 correcciones</p>
</section>`;
}

function CyberPetWidget() {
  return `
<section class="rounded-2xl bg-slate-800 border-2 border-slate-700 p-4">
  <p class="text-base font-extrabold text-slate-50 mb-2 flex items-center gap-2">${icon("cat", "h-4 w-4 text-cyan-300")} Mascotas &amp; compañeros</p>
  <div class="flex items-center gap-3">
    <span class="text-3xl" aria-hidden="true">🐱‍🏍</span>
    <div>
      <p class="text-sm font-bold text-slate-200">Cyber-Pet activo</p>
      <p class="text-sm text-cyan-300 font-bold">+5% XP mientras te acompañe</p>
    </div>
  </div>
</section>`;
}

function LeaderboardWidget() {
  const podium = [
    { name: "Camila V.", xp: 1420, place: 1, emoji: "👾", height: "h-24" },
    { name: "Tú", xp: 860, place: 2, emoji: "🤖", height: "h-16", me: true },
    { name: "Andrés P.", xp: 790, place: 3, emoji: "🥷", height: "h-12" },
  ];
  const order = [podium[1], podium[0], podium[2]];
  const medal = { 1: "text-amber-400", 2: "text-slate-400", 3: "text-orange-400" };

  const cols = order
    .map(
      (r) => `
<div class="flex flex-col items-center gap-1 w-20">
  <span class="text-2xl" aria-hidden="true">${r.emoji}</span>
  <p class="text-sm font-bold ${r.me ? "text-cyan-300" : "text-slate-300"}">${r.name}</p>
  <p class="text-sm text-slate-500">${r.xp} XP</p>
  <div class="w-full ${r.height} rounded-t-lg border-2 border-b-0 flex items-start justify-center pt-1 ${
    r.me ? "bg-cyan-950 border-cyan-700" : "bg-slate-900 border-slate-700"
  }">
    <span class="text-sm font-extrabold ${medal[r.place]}">#${r.place}</span>
  </div>
</div>`
    )
    .join("");

  return `
<section class="rounded-2xl bg-slate-800 border-2 border-slate-700 p-4">
  <p class="text-base font-extrabold text-slate-50 mb-3 flex items-center gap-2">${icon("trophy", "h-4 w-4 text-purple-400")} Liga UMNG</p>
  <div class="flex items-end justify-center gap-3">${cols}</div>
</section>`;
}

function PathView() {
  return `
<div data-view="path" class="bg-slate-900 min-h-screen pb-24">
  <main class="max-w-6xl mx-auto px-4 py-6">
    <div class="mb-2">
      <h1 class="text-xl font-extrabold text-slate-50 flex items-center gap-2">${icon("map", "h-5 w-5 text-cyan-300")} Sector de Navegación de CodeVerse</h1>
      <p class="text-sm text-slate-400">Explora los sectores, derrota jefes y desbloquea recompensas.</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div class="lg:col-span-7 flex flex-col items-center gap-6">
        ${DiagnosticBanner()}
        ${MissionMap()}
      </div>
      <div class="lg:col-span-3 flex flex-col gap-4 pt-2">
        ${CyberPetWidget()}
        ${StreakMultiplierWidget()}
        ${DailyMissionWidget()}
        ${LeaderboardWidget()}
      </div>
    </div>
  </main>
</div>`;
}

/* ---------------------- Vista: Misión Activa (Cyber-IDE) --------------------- */

function CoreStabilityMeter(value) {
  const color = value >= 90 ? "bg-emerald-500" : value >= 50 ? "bg-cyan-500" : "bg-amber-500";
  return `
<div class="flex items-center gap-3">
  ${icon("activity", "h-5 w-5 text-cyan-300 shrink-0")}
  <div>
    <p class="text-sm font-bold text-slate-300">Estabilidad del núcleo: ${value}%</p>
    <div class="h-2.5 w-40 sm:w-56 bg-slate-800 rounded-full overflow-hidden mt-1">
      <div class="h-full rounded-full transition-all duration-500 ${color}" style="width: ${value}%"></div>
    </div>
  </div>
</div>`;
}

function BriefingTabs() {
  const tabs = [
    { id: "holovid", label: "Holovid", icon: "video" },
    { id: "hints", label: "Pistas", icon: "lightbulb" },
    { id: "glossary", label: "Glosario Express", icon: "book-open" },
  ];

  const tabButtons = tabs
    .map(
      ({ id, label, icon: ic }) =>
        `<button data-action="briefing-tab" data-value="${id}" class="flex-1 flex items-center justify-center gap-1.5 px-2 py-3 text-sm font-bold min-h-[44px] ${FOCUS} ${
          briefTab === id ? "text-cyan-300 bg-slate-900" : "text-slate-500 hover:text-slate-300"
        }">${icon(ic, "h-4 w-4")} ${label}</button>`
    )
    .join("");

  let content = "";

  if (briefTab === "holovid") {
    content = `
<div class="rounded-xl bg-slate-950 border border-slate-700 aspect-video flex flex-col items-center justify-center gap-2">
  <div class="h-12 w-12 rounded-full bg-cyan-500 flex items-center justify-center ${FOCUS}">
    ${icon("video", "h-6 w-6 text-slate-900")}
  </div>
  <p class="text-sm text-slate-400">Holovid: "Variables explicadas con analogías visuales" (1 min)</p>
</div>
<button data-action="toggle-transcript" class="flex items-center gap-2 text-sm font-bold text-cyan-300 self-start rounded-lg px-3 py-2 min-h-[44px] ${FOCUS}">${icon("captions", "h-4 w-4")} ${
      showTranscript ? "Ocultar transcripción" : "Mostrar transcripción"
    }</button>
${
  showTranscript
    ? '<p class="text-sm text-slate-400 bg-slate-900 border border-slate-700 rounded-xl p-3">Transcripción: "Una variable es como una caja con etiqueta. En C++ declaramos su tipo antes del nombre, por ejemplo: int edad, seguido del valor que va a guardar."</p>'
    : ""
}`;
  }

  if (briefTab === "hints") {
    const hintBox = "text-sm text-slate-300 bg-slate-900 border border-slate-700 rounded-xl p-3";
    content = `
<div class="flex flex-col gap-3">
  <p class="text-sm text-slate-400">Sistema de pistas progresivas: revela solo lo que necesites.</p>
  ${
    hintLevel >= 1
      ? `<p class="${hintBox}"><span class="font-bold text-cyan-300">Nivel 1 — Recordatorio general:</span> piensa en un tipo de dato que no tenga decimales.</p>`
      : ""
  }
  ${
    hintLevel >= 2
      ? `<p class="${hintBox}"><span class="font-bold text-cyan-300">Nivel 2 — Estructura:</span> la variable "edad" representa una cantidad de años, un número entero.</p>`
      : ""
  }
  ${
    hintLevel >= 3
      ? `<p class="${hintBox}"><span class="font-bold text-cyan-300">Nivel 3 — Sintaxis:</span> la respuesta correcta es <span class="font-mono text-emerald-300">int</span>.</p>`
      : ""
  }
  ${
    hintLevel < 3
      ? `<button data-action="next-hint" class="self-start flex items-center gap-2 text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl px-4 py-3 min-h-[44px] ${FOCUS}">${icon(
          "lightbulb",
          "h-4 w-4"
        )} Ver pista ${hintLevel + 1} de 3</button>`
      : ""
  }
</div>`;
  }

  if (briefTab === "glossary") {
    const cards = [
      { term: "int", def: "Tipo de dato para números enteros." },
      { term: "std::cout", def: "Imprime texto o valores en la consola." },
      { term: ";", def: "Cierra cada instrucción en C++." },
    ]
      .map(
        (g) => `
<div class="rounded-xl bg-slate-900 border border-slate-700 p-3">
  <p class="font-mono text-sm font-extrabold text-cyan-300">${esc(g.term)}</p>
  <p class="text-sm text-slate-400">${esc(g.def)}</p>
</div>`
      )
      .join("");
    content = `<div class="flex flex-col gap-2">${cards}</div>`;
  }

  return `
<div class="rounded-2xl bg-slate-800 border-2 border-slate-700 flex flex-col overflow-hidden">
  <div class="flex border-b-2 border-slate-700">${tabButtons}</div>
  <div class="p-4 flex flex-col gap-3">${content}</div>
</div>`;
}

function VersusRow(stability) {
  const inDanger = stability < 100;
  return `
<div class="rounded-2xl bg-slate-800 border-2 border-slate-700 p-4 flex items-center justify-center gap-6">
  <div class="flex flex-col items-center gap-1">
    <span class="text-3xl" aria-hidden="true">🤖</span>
    <p class="text-sm font-bold text-cyan-300">Tú</p>
    <p class="text-sm text-slate-500">Cyber-Rookie</p>
  </div>
  ${icon("swords", "h-6 w-6 text-slate-500 shrink-0")}
  <div class="flex flex-col items-center gap-1">
    <span class="text-3xl" aria-hidden="true">${inDanger ? "🖥️" : "✅"}</span>
    <p class="text-sm font-bold ${inDanger ? "text-amber-300" : "text-emerald-300"}">${inDanger ? "Sistema inestable" : "Sistema estabilizado"}</p>
    <p class="text-sm text-slate-500">Núcleo de CodeVerse</p>
  </div>
</div>`;
}

function CodeEditorZone(selected) {
  const codeLines = [
    { n: 1, content: '<span class="text-slate-500">#include &lt;iostream&gt;</span>' },
    {
      n: 2,
      content: '<span class="text-purple-400">using</span> <span class="text-slate-200">namespace std;</span>',
    },
    { n: 3, content: "" },
    {
      n: 4,
      content: '<span class="text-purple-400">int</span> <span class="text-slate-200">main() {</span>',
    },
  ]
    .map(
      (line) =>
        `<div class="flex px-3 py-1"><span class="w-6 text-right pr-3 text-slate-600 select-none">${line.n}</span><span class="text-slate-200">${line.content}</span></div>`
    )
    .join("");

  const optionButtons = OPTIONS.map((opt) => {
    const isSelected = selected === opt;
    return `<button data-action="select-option" data-value="${opt}" class="cursor-grab rounded-2xl border-2 px-3 py-4 font-mono font-bold text-center transition-colors min-h-[44px] ${FOCUS} ${
      isSelected
        ? "border-cyan-400 bg-cyan-950 text-cyan-300"
        : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600"
    }">${opt}</button>`;
  }).join("");

  return `
<div class="rounded-2xl bg-slate-800 border-2 border-slate-700 flex flex-col">
  <div class="px-4 py-3 border-b-2 border-slate-700 flex items-center gap-2">
    ${icon("terminal", "h-4 w-4 text-cyan-400")}
    <p class="text-sm font-bold text-slate-200">terminal · reactor_core.cpp</p>
  </div>

  <div class="p-4 flex flex-col gap-4">
    ${NpcBubble("¡Atención! Necesitamos inyectar la variable entera correcta para estabilizar el reactor.")}

    <div class="rounded-xl bg-slate-950 border border-slate-700 font-mono text-sm overflow-x-auto">
      ${codeLines}
      <div class="flex px-3 py-1 bg-slate-900"><span class="w-6 text-right pr-3 text-slate-600 select-none">5</span><span class="text-slate-200">&nbsp;&nbsp;<span class="inline-block min-w-[70px] border-b-2 border-dashed text-center font-bold ${
        selected ? "border-cyan-400 text-cyan-300" : "border-slate-600 text-slate-500"
      }">${selected !== null ? selected : "____"}</span> edad = 20;</span></div>
      <div class="flex px-3 py-1"><span class="w-6 text-right pr-3 text-slate-600 select-none">6</span><span class="text-slate-200">&nbsp;&nbsp;<span class="text-slate-200">cout &lt;&lt; edad;</span></span></div>
      <div class="flex px-3 py-1"><span class="w-6 text-right pr-3 text-slate-600 select-none">7</span><span class="text-slate-200">}</span></div>
    </div>

    <div>
      <p class="text-sm font-bold text-slate-400 mb-2 flex items-center gap-1.5">${icon("grip-vertical", "h-4 w-4")} Arrastra o selecciona el bloque correcto</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">${optionButtons}</div>
    </div>
  </div>
</div>`;
}

function FeedbackZone(result) {
  if (!result) {
    return `
<div class="rounded-2xl bg-slate-800 border-2 border-dashed border-slate-700 p-5 text-center">
  <p class="text-sm text-slate-500">La terminal de diagnóstico mostrará aquí el resultado después de comprobar tu código.</p>
</div>`;
  }

  if (result === "success") {
    return `
<div class="rounded-2xl bg-emerald-950 border-2 border-emerald-500 shadow-lg shadow-emerald-950 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  <div class="flex items-center gap-3">
    <div class="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 text-2xl">
      <span aria-hidden="true">🤖✨</span>
    </div>
    <div>
      <p class="text-base font-extrabold text-emerald-300">✔️ Núcleo estabilizado — ¡tu avatar celebra!</p>
      <p class="text-sm text-emerald-400">+15 XP · +5 gemas · Estabilidad del núcleo al 100%</p>
    </div>
  </div>
  <button data-action="exit-mission" class="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-extrabold uppercase text-sm rounded-2xl px-5 py-3 min-h-[44px] ${FOCUS}">Siguiente módulo / Continuar misión</button>
</div>`;
  }

  return `
<div class="rounded-2xl bg-slate-800 border-4 border-amber-400 shadow-lg shadow-amber-950 p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
  <div class="flex items-start gap-3">
    <div class="h-12 w-12 rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center shrink-0 text-xl">
      <span aria-hidden="true">🤖</span>
    </div>
    <div>
      <p class="text-base font-extrabold text-amber-300 flex items-center gap-1.5">${icon("alert-triangle", "h-4 w-4")} Error de sintaxis</p>
      <p class="text-sm text-slate-300 mt-1"><span class="font-bold text-cyan-300">Cyber-Bot Byte:</span> ¡Casi lo tienes! Para almacenar enteros sin decimales en C++ usamos <span class="font-mono text-cyan-300">int</span>.</p>
    </div>
  </div>
  <button data-action="retry" class="shrink-0 flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold uppercase text-sm rounded-2xl px-5 py-3 min-h-[44px] ${FOCUS}">${icon(
    "wrench",
    "h-4 w-4"
  )} Reintentar sin perder puntos</button>
</div>`;
}

function MissionView() {
  const checkDisabled = !missionSelected || missionResult === "success";
  const checkActive = missionSelected && missionResult !== "success";
  return `
<div data-view="mission" class="bg-slate-900 min-h-screen pb-24">
  <header class="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
    <button data-action="exit-mission" class="flex items-center gap-1.5 text-sm font-bold text-slate-300 hover:text-cyan-300 rounded-lg px-2 py-2 min-h-[44px] ${FOCUS}">${icon(
      "arrow-left",
      "h-4 w-4"
    )} Abortar / Volver a la ruta</button>
    ${CoreStabilityMeter(coreStability)}
    <span class="text-sm font-bold text-slate-400">Paso 2 de 5</span>
  </header>

  <main class="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col gap-6">
    ${VersusRow(coreStability)}

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      ${BriefingTabs()}
      ${CodeEditorZone(missionSelected)}
    </div>

    <div class="flex flex-col gap-4">
      <button data-action="check" ${checkDisabled ? "disabled" : ""} class="w-full flex items-center justify-center gap-2 text-center font-extrabold uppercase tracking-wide text-base rounded-2xl py-4 min-h-[44px] transition-colors ${FOCUS} ${
        checkActive
          ? "bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-950 hover:bg-cyan-400"
          : "bg-slate-800 text-slate-500"
      }">${icon("rocket", "h-5 w-5")} Comprobar código</button>

      ${FeedbackZone(missionResult)}
    </div>
  </main>
</div>`;
}

/* --------------------------- Vista: Diagnóstico --------------------------- */

function DiagnosticView() {
  const total = DIAGNOSTIC_QUESTIONS.length;
  const question = DIAGNOSTIC_QUESTIONS[diagStep];

  if (diagFinished) {
    return `
<div data-view="diagnostic" class="bg-slate-900 min-h-screen flex flex-col">
  <header class="max-w-xl mx-auto w-full px-6 pt-6">
    <button data-action="close-diagnostic" class="text-slate-400 hover:text-cyan-300 rounded-lg p-2 ${FOCUS}" aria-label="Cerrar diagnóstico">
      ${icon("x", "h-6 w-6")}
    </button>
  </header>
  <div class="flex-1 flex items-center justify-center px-6">
    <div class="max-w-md w-full bg-slate-800 border-2 border-cyan-500 rounded-3xl p-8 text-center shadow-lg shadow-cyan-950">
      <div class="h-16 w-16 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-4 text-3xl">
        <span aria-hidden="true">🤖</span>
      </div>
      <p class="text-sm font-bold text-cyan-400 uppercase tracking-wide mb-1">¡Escaneo completado!</p>
      <h2 class="text-xl font-extrabold text-slate-50 mb-2">Tu nivel es: Aprendiz Principiante</h2>
      <p class="text-base text-slate-400 mb-6">Cyber-Bot Byte: "Tu Avatar ha sido asignado al Sector 2 — Matriz de Datos."</p>
      <button data-action="close-diagnostic" class="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-extrabold uppercase text-sm rounded-2xl py-3.5 min-h-[44px] shadow-lg shadow-cyan-950 ${FOCUS}">Ir a mi ruta</button>
    </div>
  </div>
</div>`;
  }

  const options = question.options
    .map((opt) => {
      const isSelected = diagSelected === opt;
      return `<button data-action="diag-select" data-value="${esc(opt)}" class="text-left rounded-2xl border-2 px-4 py-4 font-medium text-base min-h-[44px] transition-colors ${FOCUS} ${
        isSelected
          ? "border-purple-400 bg-purple-950 text-purple-200"
          : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600"
      }">${esc(opt)}</button>`;
    })
    .join("");

  return `
<div data-view="diagnostic" class="bg-slate-900 min-h-screen flex flex-col">
  <header class="max-w-xl mx-auto w-full px-6 pt-6 flex items-center gap-4">
    <button data-action="close-diagnostic" class="text-slate-400 hover:text-cyan-300 shrink-0 rounded-lg p-2 ${FOCUS}" aria-label="Cerrar diagnóstico">
      ${icon("x", "h-6 w-6")}
    </button>
    <div class="flex-1">
      <p class="text-sm font-bold text-slate-400 mb-2">Pregunta ${diagStep + 1} de ${total}</p>
      <div class="h-3 bg-slate-800 rounded-full overflow-hidden">
        <div class="h-full bg-purple-500 rounded-full transition-all duration-300" style="width: ${((diagStep + 1) / total) * 100}%"></div>
      </div>
    </div>
  </header>

  <main class="flex-1 max-w-xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
    ${NpcBubble(question.prompt)}

    ${
      question.code
        ? `<pre class="rounded-2xl bg-slate-950 border border-slate-700 p-4 text-sm font-mono text-cyan-300 whitespace-pre-wrap">${esc(question.code)}</pre>`
        : ""
    }

    <div class="flex flex-col gap-3">${options}</div>
  </main>

  <footer class="max-w-xl mx-auto w-full px-6 pb-8">
    <button data-action="diag-next" ${!diagSelected ? "disabled" : ""} class="w-full text-center font-extrabold uppercase tracking-wide text-sm rounded-2xl py-4 min-h-[44px] transition-colors ${FOCUS} ${
      diagSelected
        ? "bg-purple-500 text-white shadow-lg shadow-purple-950 hover:bg-purple-400"
        : "bg-slate-800 text-slate-600"
    }">${diagStep + 1 >= total ? "Ver resultado" : "Siguiente pregunta"}</button>
  </footer>
</div>`;
}

/* ---------------------------- Vista: Glosario ----------------------------- */

function GlossaryCard(entry) {
  return `
<div class="rounded-2xl bg-slate-800 border-2 border-slate-700 p-4 flex flex-col gap-3 hover:border-cyan-600 transition-colors">
  <div class="flex items-center justify-between gap-2">
    <p class="font-mono text-base font-extrabold text-cyan-300">${esc(entry.term)}</p>
    <span class="text-sm font-bold text-purple-300 bg-purple-950 border border-purple-700 rounded-full px-2.5 py-0.5">${esc(entry.tag)}</span>
  </div>
  <p class="text-base text-slate-300">${esc(entry.explanation)}</p>
  <pre class="rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 text-sm font-mono p-3 whitespace-pre-wrap leading-relaxed">${esc(entry.code)}</pre>
</div>`;
}

function glossaryFiltered() {
  return GLOSSARY_TERMS.filter((t) => {
    const matchesQuery = t.term.toLowerCase().includes(glossaryQuery.trim().toLowerCase());
    const matchesTag = glossaryTag === "Todas" || t.tag === glossaryTag;
    return matchesQuery && matchesTag;
  });
}

function GlossaryView() {
  const filtered = glossaryFiltered();
  const tagButtons = GLOSSARY_TAGS.map(
    (t) =>
      `<button data-action="glossary-tag" data-value="${t}" class="text-sm font-bold rounded-full px-4 py-2.5 border-2 min-h-[44px] ${FOCUS} ${
        glossaryTag === t
          ? "bg-cyan-500 border-cyan-400 text-slate-900"
          : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
      }">${t}</button>`
  ).join("");

  return `
<div data-view="glossary" class="bg-slate-900 min-h-screen pb-24">
  <main class="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">
    <div>
      <h1 class="text-xl font-extrabold text-slate-50">Glosario &amp; Sintaxis C++</h1>
      <p class="text-base text-slate-400">Biblioteca de apoyo para tus misiones</p>
    </div>

    <div class="relative">
      ${icon("search", "h-4 w-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2")}
      <input data-input="glossary-query" value="${esc(glossaryQuery)}" placeholder="Busca un término: int, cout, if, cin..." aria-label="Buscar término en el glosario" class="w-full rounded-2xl border-2 border-slate-700 bg-slate-800 pl-11 pr-4 py-3 text-base text-slate-100 placeholder:text-slate-500 min-h-[44px] ${FOCUS}" />
    </div>

    <div class="flex items-center gap-2 flex-wrap">${tagButtons}</div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${filtered.map((e) => GlossaryCard(e)).join("")}</div>
    ${
      filtered.length === 0
        ? `<p class="text-base text-slate-500 text-center py-10">No encontramos términos que coincidan con "${esc(glossaryQuery)}".</p>`
        : ""
    }
  </main>
</div>`;
}

/* ------------------------------ Vista: Perfil ------------------------------ */

function ProfileView() {
  const currentSkin = AVATAR_SKINS.find((s) => s.id === selectedSkin);

  const stats = [
    { icon: "clock", label: "Horas de estudio", value: "18h", color: "text-sky-300" },
    { icon: "flame", label: "Racha actual", value: "12 días", color: "text-orange-400" },
    { icon: "zap", label: "XP total", value: "860", color: "text-cyan-300" },
    { icon: "gem", label: "Gemas", value: "320", color: "text-purple-300" },
  ]
    .map(
      (s) => `
<div class="rounded-2xl bg-slate-800 border-2 border-slate-700 p-4 text-center">
  ${icon(s.icon, "h-6 w-6 mx-auto mb-2 " + s.color)}
  <p class="text-lg font-extrabold text-slate-50">${s.value}</p>
  <p class="text-sm text-slate-400">${s.label}</p>
</div>`
    )
    .join("");

  const skins = AVATAR_SKINS.map((skin) => {
    const equipped = skin.id === selectedSkin;
    return `<button data-action="skin" data-value="${skin.id}" class="rounded-2xl border-2 p-4 flex flex-col items-center gap-2 text-center min-h-[44px] transition-colors ${FOCUS} ${
      equipped
        ? "bg-cyan-950 border-cyan-500 shadow-lg shadow-cyan-950"
        : "bg-slate-800 border-slate-700 hover:border-slate-600"
    }"><span class="text-3xl" aria-hidden="true">${skin.emoji}</span><p class="text-sm font-bold text-slate-200">${skin.label}</p><span class="text-sm font-bold rounded-full px-2.5 py-0.5 ${
      equipped ? "bg-cyan-500 text-slate-900" : "bg-slate-700 text-slate-400"
    }">${equipped ? "✔️ Equipado" : "Equipar"}</span></button>`;
  }).join("");

  const accessories = ACCESSORIES.map((acc) => {
    const active = selectedAccessories.includes(acc.id);
    return `<button data-action="accessory" data-value="${acc.id}" class="flex items-center gap-2 text-sm font-bold rounded-full px-4 py-2.5 border-2 min-h-[44px] ${FOCUS} ${
      active
        ? "bg-purple-950 border-purple-500 text-purple-200"
        : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
    }"><span aria-hidden="true">${acc.emoji}</span> ${acc.label} ${active ? "✔️" : ""}</button>`;
  }).join("");

  const badges = BADGES.map(
    (b) => `
<div class="rounded-2xl border-2 p-4 flex flex-col items-center text-center gap-2 ${
      b.earned ? "bg-amber-950 border-amber-600 shadow-lg shadow-amber-950" : "bg-slate-800 border-slate-700"
    }">
  <div class="h-12 w-12 rounded-full flex items-center justify-center ${b.earned ? "bg-amber-400" : "bg-slate-700"}">
    ${icon("medal", "h-5 w-5 " + (b.earned ? "text-slate-900" : "text-slate-500"))}
  </div>
  <p class="text-sm font-bold text-slate-300">${b.earned ? "✔️" : "🔒"} ${b.label}</p>
  ${
    !b.earned
      ? `<div class="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden"><div class="h-full bg-slate-500 rounded-full" style="width: ${b.progress}%"></div></div>`
      : ""
  }
</div>`
  ).join("");

  return `
<div data-view="profile" class="bg-slate-900 min-h-screen pb-24">
  <div class="bg-slate-800 border-b-2 border-slate-700">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex items-center gap-5">
      <div class="h-20 w-20 rounded-full bg-slate-900 border-4 border-emerald-400 shadow-lg shadow-emerald-950 flex items-center justify-center shrink-0 text-3xl">
        <span aria-hidden="true">${currentSkin.emoji}</span>
      </div>
      <div>
        <h1 class="text-xl font-extrabold text-slate-50">Mariana Ríos</h1>
        <p class="text-sm font-bold text-emerald-300">${currentSkin.label}</p>
        <p class="text-base text-slate-400 flex items-center gap-1.5 mt-1">${icon("graduation-cap", "h-4 w-4 text-slate-500")} Ingeniería en Multimedia</p>
        <p class="text-base text-slate-400 flex items-center gap-1.5">${icon("building-2", "h-4 w-4 text-slate-500")} Universidad Militar Nueva Granada</p>
      </div>
    </div>
  </div>

  <main class="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">${stats}</div>

    <section>
      <p class="text-base font-extrabold text-slate-50 mb-3 flex items-center gap-1.5"><span aria-hidden="true">👾</span> Armario de avatares</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">${skins}</div>

      <p class="text-sm font-bold text-slate-400 mb-2">Accesorios cyberpunk</p>
      <div class="flex items-center gap-2 flex-wrap">${accessories}</div>
    </section>

    <section>
      <p class="text-base font-extrabold text-slate-50 mb-3 flex items-center gap-1.5">${icon("award", "h-4 w-4 text-amber-400")} Vitrina de insignias</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">${badges}</div>
    </section>
  </main>
</div>`;
}

/* ------------------------- Vista: Panel Supervisor / COASE ------------------------- */

function StudentRow(student) {
  const meta = STATUS_META[student.status];
  return `
<div class="rounded-2xl bg-slate-800 border-2 ${meta.ring} p-4 flex flex-col gap-3">
  <div class="flex items-start justify-between gap-3">
    <div class="flex items-center gap-3">
      <div class="h-10 w-10 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shrink-0">
        ${icon("bot", "h-4 w-4 text-slate-400")}
      </div>
      <div>
        <p class="text-base font-bold text-slate-50">${student.name}</p>
        <p class="text-sm text-slate-400">${student.unit}</p>
      </div>
    </div>
    <span class="flex items-center gap-1.5 text-sm font-bold ${meta.text}">${icon(meta.icon, "h-4 w-4")} ${meta.label}</span>
  </div>
  <p class="text-sm text-slate-400">${student.note}</p>
  <div class="flex items-center gap-2 flex-wrap">
    <button class="flex items-center gap-1.5 text-sm font-bold bg-cyan-950 border border-cyan-700 text-cyan-300 rounded-xl px-4 py-2.5 min-h-[44px] hover:bg-cyan-900 ${FOCUS}">${icon(
      "book-open-check",
      "h-4 w-4"
    )} Recomendar recurso</button>
    <button class="flex items-center gap-1.5 text-sm font-bold bg-purple-950 border border-purple-700 text-purple-300 rounded-xl px-4 py-2.5 min-h-[44px] hover:bg-purple-900 ${FOCUS}">${icon(
      "message-square",
      "h-4 w-4"
    )} Agendar acompañamiento COASE</button>
  </div>
</div>`;
}

function SupervisorView() {
  const counts = STUDENTS.reduce((acc, s) => ({ ...acc, [s.status]: (acc[s.status] || 0) + 1 }), {});

  const summary = Object.entries(STATUS_META)
    .map(
      ([key, meta]) => `
<div class="rounded-2xl bg-slate-800 border-2 border-slate-700 p-4 text-center">
  <div class="h-8 w-8 rounded-full ${meta.dot} mx-auto mb-2 flex items-center justify-center">
    ${icon(meta.icon, "h-4 w-4 text-slate-900")}
  </div>
  <p class="text-lg font-extrabold text-slate-50">${counts[key] || 0}</p>
  <p class="text-sm text-slate-400">${meta.label}</p>
</div>`
    )
    .join("");

  return `
<div data-view="supervisor" class="bg-slate-900 min-h-screen pb-24">
  <div class="bg-slate-800 border-b-2 border-slate-700">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center gap-3">
      <div class="h-12 w-12 rounded-2xl bg-slate-900 border-2 border-cyan-500 flex items-center justify-center shrink-0">
        ${icon("shield-alert", "h-6 w-6 text-cyan-300")}
      </div>
      <div>
        <h1 class="text-xl font-extrabold text-slate-50">Panel Supervisor / COASE</h1>
        <p class="text-base text-slate-400">Seguimiento de estudiantes de Ingeniería en Multimedia</p>
      </div>
    </div>
  </div>

  <main class="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
    <div class="grid grid-cols-3 gap-4">${summary}</div>
    <div class="flex flex-col gap-4">${STUDENTS.map((s) => StudentRow(s)).join("")}</div>
  </main>
</div>`;
}

/* ---------------------------------- App ------------------------------------ */

function buildApp() {
  if (diagnosticOpen) {
    return `<div class="font-sans">${DiagnosticView()}</div>`;
  }

  let view = "";
  if (tab === "path") view = PathView();
  if (tab === "mission") view = MissionView();
  if (tab === "glossary") view = GlossaryView();
  if (tab === "profile") view = ProfileView();
  if (tab === "supervisor") view = SupervisorView();

  return `<div class="font-sans">${GlobalHeader()}${view}${BottomNav()}</div>`;
}

/* --------------------- Actualización incremental del DOM --------------------- */
/* Reutiliza los nodos existentes (foco, transiciones y animaciones se conservan) */

function syncAttrs(real, virtual) {
  Array.from(virtual.attributes).forEach((attr) => {
    if (real.getAttribute(attr.name) !== attr.value) real.setAttribute(attr.name, attr.value);
  });
  Array.from(real.attributes).forEach((attr) => {
    if (!virtual.hasAttribute(attr.name)) real.removeAttribute(attr.name);
  });
  if (real.tagName === "INPUT" && real.value !== virtual.getAttribute("value")) {
    real.value = virtual.getAttribute("value") || "";
  }
}

function patch(real, virtual, parent) {
  if (real.nodeType !== virtual.nodeType) {
    parent.replaceChild(virtual.cloneNode(true), real);
    return;
  }
  if (real.nodeType === 3) {
    if (real.nodeValue !== virtual.nodeValue) real.nodeValue = virtual.nodeValue;
    return;
  }
  if (real.nodeType !== 1) return;

  const vIcon = virtual.getAttribute("data-lucide");
  const rIcon = real.getAttribute("data-lucide");
  if (vIcon || rIcon) {
    if (vIcon && vIcon === rIcon) {
      const expected = "lucide lucide-" + vIcon + " " + (virtual.getAttribute("class") || "");
      if (real.getAttribute("class") !== expected) real.setAttribute("class", expected);
      return;
    }
    parent.replaceChild(virtual.cloneNode(true), real);
    return;
  }

  if (
    real.tagName !== virtual.tagName ||
    real.getAttribute("data-view") !== virtual.getAttribute("data-view")
  ) {
    parent.replaceChild(virtual.cloneNode(true), real);
    return;
  }

  syncAttrs(real, virtual);
  morph(real, virtual);
}

function morph(realParent, virtualParent) {
  const realNodes = Array.from(realParent.childNodes);
  const virtualNodes = Array.from(virtualParent.childNodes);
  const max = Math.max(realNodes.length, virtualNodes.length);
  for (let i = 0; i < max; i++) {
    const r = realNodes[i];
    const v = virtualNodes[i];
    if (!v) {
      realParent.removeChild(r);
    } else if (!r) {
      realParent.appendChild(v.cloneNode(true));
    } else {
      patch(r, v, realParent);
    }
  }
}

const appRoot = document.getElementById("app");

function render() {
  const html = buildApp().replace(/>\s*\n\s*</g, "><").trim();
  const template = document.createElement("template");
  template.innerHTML = html;
  morph(appRoot, template.content);
  lucide.createIcons();
}

/* -------------------------------- Eventos --------------------------------- */

appRoot.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el || el.disabled) return;
  const action = el.getAttribute("data-action");
  const value = el.getAttribute("data-value");

  switch (action) {
    case "set-tab":
      setTab(value);
      break;
    case "open-mission":
      setTab("mission");
      break;
    case "exit-mission":
      setTab("path");
      break;
    case "open-diagnostic":
      resetDiagnostic();
      diagnosticOpen = true;
      render();
      break;
    case "close-diagnostic":
      diagnosticOpen = false;
      render();
      break;

    // Misión activa
    case "select-option":
      missionSelected = value;
      render();
      break;
    case "check":
      if (!missionSelected) return;
      if (missionSelected === CORRECT_ANSWER) {
        missionResult = "success";
        coreStability = 100;
      } else {
        missionResult = "error";
      }
      render();
      break;
    case "retry":
      // el código y la selección anterior se conservan a propósito: no se penaliza el avance
      missionResult = null;
      render();
      break;
    case "briefing-tab":
      briefTab = value;
      render();
      break;
    case "toggle-transcript":
      showTranscript = !showTranscript;
      render();
      break;
    case "next-hint":
      hintLevel = hintLevel + 1;
      render();
      break;

    // Diagnóstico
    case "diag-select":
      diagSelected = value;
      render();
      break;
    case "diag-next":
      if (!diagSelected) return;
      if (diagStep + 1 >= DIAGNOSTIC_QUESTIONS.length) {
        diagFinished = true;
      } else {
        diagStep = diagStep + 1;
        diagSelected = null;
      }
      render();
      break;

    // Glosario
    case "glossary-tag":
      glossaryTag = value;
      render();
      break;

    // Perfil
    case "skin":
      selectedSkin = value;
      render();
      break;
    case "accessory":
      selectedAccessories = selectedAccessories.includes(value)
        ? selectedAccessories.filter((a) => a !== value)
        : selectedAccessories.concat(value);
      render();
      break;
  }
});

appRoot.addEventListener("input", (e) => {
  if (e.target.matches('[data-input="glossary-query"]')) {
    glossaryQuery = e.target.value;
    render();
  }
});

render();
