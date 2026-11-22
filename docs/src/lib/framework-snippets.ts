// Code for the framework guides. Kept in TypeScript rather than inline in MDX, because
// MDX strips leading spaces from multi-line strings inside indented JSX attributes.
// Each guide renders the HTML these produce, so every snippet shows its output.
import { bootstrap } from "./build-info";
import { addOutput } from "./cli-output";
import { toFrameworks } from "./frameworks";

const indent = (s: string, n: number) => s.split("\n").map((l) => (l.trim() ? " ".repeat(n) + l : l)).join("\n");

export const installCommand = `npm install bootstrap@${bootstrap.version} shadcn-bootstrap`;
export const installOutput = "added 6 packages, and audited 7 packages in 2s\n\n2 packages are looking for funding\n  run `npm fund` for details\n\nfound 0 vulnerabilities";
export const addCommand = "npx shadcn-bootstrap add button card input label";

/** What the guides' example page renders (plain HTML, also the HTML-project version). */
export const demoHtml = `<div class="card" style="width: 22rem">
  <div class="card-header">
    <h3 class="card-title">Create project</h3>
    <p class="card-description">Deploy your new project in one click.</p>
  </div>
  <div class="card-body">
    <label class="form-label" for="name">Name</label>
    <input class="form-control" id="name" placeholder="Name of your project">
  </div>
  <div class="card-footer justify-content-between">
    <button type="button" class="btn btn-outline">Cancel</button>
    <button type="button" class="btn btn-solid theme-primary">Deploy</button>
  </div>
</div>`;

const demo = toFrameworks(demoHtml).parts;

/** Uses Bootstrap's data API, so it only works once Bootstrap's JavaScript is loaded. */
export const jsDemoHtml = `<div style="width: 20rem">
  <button type="button" class="btn btn-outline" data-bs-toggle="collapse" data-bs-target="#details" aria-expanded="false" aria-controls="details">
    Show details
  </button>
  <div class="collapse" id="details">
    <div class="alert mt-3" role="status">
      <div class="alert-title">Bootstrap's JavaScript is running</div>
      <div class="alert-description">This panel opened through data-bs-toggle="collapse".</div>
    </div>
  </div>
</div>`;

/** Plain-JS equivalent of each guide's mode toggle, run inside the preview frame. */
export const modeToggleHtml = `<button type="button" class="btn btn-outline" id="mode-toggle">Toggle dark mode</button>
<script>
  document.getElementById("mode-toggle").addEventListener("click", () => {
    const root = document.documentElement;
    const current = root.getAttribute("data-bs-theme") ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    root.setAttribute("data-bs-theme", current === "dark" ? "light" : "dark");
  });
</script>`;

const toggleBody = (n: number) =>
  indent(
    `const root = document.documentElement;
const current = root.getAttribute("data-bs-theme") ??
  (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
const next = current === "dark" ? "light" : "dark";
root.setAttribute("data-bs-theme", next);
localStorage.setItem("color-mode", next);`,
    n,
  );

/** Inline <head> script that applies the saved mode before first paint. */
export const noFlashScript = `try{const m=localStorage.getItem("color-mode");if(m)document.documentElement.setAttribute("data-bs-theme",m)}catch(e){}`;

const initOutput = (framework: string, styles: string, entry: string, imports: string[]) => `✔ Detected ${framework}
✔ Wrote components.json
✔ Created lib/utils.ts
✔ Created ${styles}/tokens.css
✔ Created ${styles}/bridge.css
✔ Created ${styles}/components/index.css

Add to ${entry}, after Bootstrap's CSS:
${imports.map((i) => `  ${i}`).join("\n")}`;

// --- Next.js ----------------------------------------------------------------

export const next = {
  init: initOutput("Next.js (App Router)", "styles", "app/layout.tsx", [
    `import "bootstrap/dist/css/bootstrap.min.css";`,
    `import "@/styles/tokens.css";`,
    `import "@/styles/bridge.css";`,
    `import "@/styles/components/index.css";`,
  ]),
  add: addOutput(["button", "card", "input", "label"], "react"),
  layout: `import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/tokens.css";
import "@/styles/bridge.css";
import "@/styles/components/index.css";
import { BootstrapClient } from "./bootstrap-client";

export const metadata: Metadata = { title: "My app" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: \`${noFlashScript}\` }} />
      </head>
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}`,
  bootstrapClient: `"use client";

import { useEffect } from "react";

export function BootstrapClient() {
  useEffect(() => {
    import("bootstrap");
  }, []);
  return null;
}`,
  page: `${demo.reactImports.join("\n")}

export default function Page() {
  return (
${indent(demo.reactMarkup, 4)}
  );
}`,
  modeToggle: `"use client";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  function toggle() {
${toggleBody(4)}
  }

  return (
    <Button variant="outline" onClick={toggle}>
      Toggle dark mode
    </Button>
  );
}`,
};

// --- React (Vite) -----------------------------------------------------------

export const react = {
  init: initOutput("React (Vite)", "src/styles", "src/main.tsx", [
    `import "bootstrap/dist/css/bootstrap.min.css";`,
    `import "./styles/tokens.css";`,
    `import "./styles/bridge.css";`,
    `import "./styles/components/index.css";`,
  ]).replace("lib/utils.ts", "src/lib/utils.ts"),
  add: addOutput(["button", "card", "input", "label"], "react").replace(/✔ Created components\//g, "✔ Created src/components/").replace(/✔ Created styles\//g, "✔ Created src/styles/"),
  main: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/tokens.css";
import "./styles/bridge.css";
import "./styles/components/index.css";
import "bootstrap";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);`,
  app: `${demo.reactImports.join("\n")}

export default function App() {
  return (
${indent(demo.reactMarkup, 4)}
  );
}`,
  modeToggle: `import { Button } from "@/components/ui/button";

export function ModeToggle() {
  function toggle() {
${toggleBody(4)}
  }

  return (
    <Button variant="outline" onClick={toggle}>
      Toggle dark mode
    </Button>
  );
}`,
};

// --- Vue --------------------------------------------------------------------

export const vue = {
  init: initOutput("Vue (Vite)", "src/styles", "src/main.ts", [
    `import "bootstrap/dist/css/bootstrap.min.css";`,
    `import "./styles/tokens.css";`,
    `import "./styles/bridge.css";`,
    `import "./styles/components/index.css";`,
  ]).replace("lib/utils.ts", "src/lib/utils.ts"),
  add: addOutput(["button", "card", "input", "label"], "vue").replace(/✔ Created components\//g, "✔ Created src/components/"),
  main: `import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/tokens.css";
import "./styles/bridge.css";
import "./styles/components/index.css";
import "bootstrap";
import App from "./App.vue";

createApp(App).mount("#app");`,
  app: `<script setup lang="ts">
import { ref } from "vue";
${demo.vueImports.join("\n")}

const name = ref("");
</script>

<template>
${indent(demo.vueMarkup.replace('placeholder="Name of your project" />', 'placeholder="Name of your project" v-model="name" />'), 2)}
</template>`,
  modeToggle: `<script setup lang="ts">
import { Button } from "@/components/ui/button";

function toggle() {
${toggleBody(2)}
}
</script>

<template>
  <Button variant="outline" @click="toggle">Toggle dark mode</Button>
</template>`,
  nuxtConfig: `export default defineNuxtConfig({
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "~/assets/css/tokens.css",
    "~/assets/css/bridge.css",
    "~/assets/css/components/index.css",
  ],
});`,
  nuxtPlugin: `export default defineNuxtPlugin(async () => {
  await import("bootstrap");
});`,
};

// --- Angular ----------------------------------------------------------------

export const angular = {
  init: initOutput("Angular (application builder)", "src/styles", 'the "styles" array in angular.json', [
    `"node_modules/bootstrap/dist/css/bootstrap.min.css",`,
    `"src/styles/tokens.css",`,
    `"src/styles/bridge.css",`,
    `"src/styles/components/index.css",`,
    `"src/styles.css"`,
  ]).replace("✔ Created lib/utils.ts\n", ""),
  add: addOutput(["button", "card", "input", "label"], "angular"),
  styles: `"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles/tokens.css",
  "src/styles/bridge.css",
  "src/styles/components/index.css",
  "src/styles.css"
]`,
  app: `import { Component, afterNextRender } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  template: \`<router-outlet />\`,
})
export class App {
  constructor() {
    afterNextRender(() => import("bootstrap"));
  }
}`,
  createProject: `import { Component } from "@angular/core";
${demo.angularImports.join("\n")}

@Component({
  selector: "app-create-project",
  imports: [${demo.angularNames.join(", ")}],
  template: \`
${indent(demo.angularMarkup, 4)}
  \`,
})
export class CreateProject {}`,
  modeToggle: `import { Component } from "@angular/core";
import { SbButton } from "./ui/button";

@Component({
  selector: "app-mode-toggle",
  imports: [SbButton],
  template: \`<button sbButton variant="outline" (click)="toggle()">Toggle dark mode</button>\`,
})
export class ModeToggle {
  toggle() {
${toggleBody(4)}
  }
}`,
};
