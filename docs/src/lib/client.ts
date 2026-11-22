// Docs page behaviour: color mode, copy buttons, per-example color mode,
// iframe auto-height, quick page jump, mobile sidebar.

const root = document.documentElement;
const MODE_KEY = "sb-color-mode";

function setMode(mode: string) {
  if (mode === "light" || mode === "dark") root.setAttribute("data-bs-theme", mode);
  else root.removeAttribute("data-bs-theme");
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {}
  syncModeButtons();
}

function syncModeButtons() {
  let saved = "system";
  try {
    saved = localStorage.getItem(MODE_KEY) ?? "system";
  } catch {}
  document.querySelectorAll<HTMLButtonElement>("[data-theme-set]").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.themeSet === saved));
  });
}
syncModeButtons();

// Per-example mode: none pressed = follow the page.
function setExampleMode(figure: HTMLElement, mode: string | null) {
  const target = figure.querySelector<HTMLElement>(".docs-example-preview");
  const frame = figure.querySelector<HTMLIFrameElement>("iframe");
  const apply = (el: HTMLElement | null | undefined) => {
    if (!el) return;
    if (mode) el.setAttribute("data-bs-theme", mode);
    else el.removeAttribute("data-bs-theme");
  };
  apply(target);
  apply(frame?.contentDocument?.documentElement);
  if (frame && !mode) {
    // Frames follow the page mode when not overridden.
    const page = root.getAttribute("data-bs-theme");
    if (page) frame.contentDocument?.documentElement.setAttribute("data-bs-theme", page);
  }
  figure.querySelectorAll<HTMLButtonElement>("[data-example-mode]").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.exampleMode === mode));
  });
  figure.dataset.mode = mode ?? "";
}

function syncFrames() {
  const page = root.getAttribute("data-bs-theme");
  document.querySelectorAll<HTMLIFrameElement>(".docs-example-frame").forEach((frame) => {
    const figure = frame.closest<HTMLElement>("[data-example]");
    if (figure?.dataset.mode) return;
    const html = frame.contentDocument?.documentElement;
    if (!html) return;
    if (page) html.setAttribute("data-bs-theme", page);
    else html.removeAttribute("data-bs-theme");
  });
}

document.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;

  const themeBtn = target.closest<HTMLButtonElement>("[data-theme-set]");
  if (themeBtn) {
    setMode(themeBtn.dataset.themeSet!);
    syncFrames();
    return;
  }

  const modeBtn = target.closest<HTMLButtonElement>("[data-example-mode]");
  if (modeBtn) {
    const figure = modeBtn.closest<HTMLElement>("[data-example]")!;
    const mode = modeBtn.dataset.exampleMode!;
    setExampleMode(figure, figure.dataset.mode === mode ? null : mode);
    return;
  }

  const copyBtn = target.closest<HTMLButtonElement>("[data-copy]");
  if (copyBtn) {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.copy ?? "");
      copyBtn.classList.add("is-copied");
      setTimeout(() => copyBtn.classList.remove("is-copied"), 1500);
    } catch {}
    return;
  }

  const sidebarToggle = target.closest<HTMLButtonElement>("[data-sidebar-toggle]");
  if (sidebarToggle) {
    const open = document.body.classList.toggle("sidebar-open");
    sidebarToggle.setAttribute("aria-expanded", String(open));
  }
});

// Iframe previews report their height.
window.addEventListener("message", (event) => {
  if (!event.data?.sbFrame) return;
  document.querySelectorAll<HTMLIFrameElement>(".docs-example-frame, [data-sb-frame]").forEach((frame) => {
    if (frame.contentWindow === event.source) frame.style.height = `${Math.ceil(event.data.height)}px`;
  });
});

document.querySelectorAll<HTMLIFrameElement>(".docs-example-frame").forEach((frame) => {
  frame.addEventListener("load", syncFrames);
});
syncFrames();
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", syncFrames);

// Quick jump: pick a page title from the datalist to navigate.
document.querySelectorAll<HTMLFormElement>("[data-jump]").forEach((form) => {
  const input = form.querySelector("input")!;
  const options = [...form.querySelectorAll<HTMLOptionElement>("option")];
  const go = () => {
    const match = options.find((o) => o.value.toLowerCase() === input.value.trim().toLowerCase());
    if (match?.dataset.href) location.href = match.dataset.href;
  };
  input.addEventListener("change", go);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    go();
  });
});

export {};
