// Build-time helpers (run in Node while Astro renders pages).
import * as sass from "sass";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { renderTheme, DEFAULT_THEME } from "../../../packages/css/themes/themes.mjs";

function findRoot(): string {
  let dir = process.cwd();
  while (!existsSync(join(dir, "packages/css/scss"))) {
    const parent = dirname(dir);
    if (parent === dir) throw new Error("Could not find the shadcn-bootstrap repo root");
    dir = parent;
  }
  return dir;
}

export const ROOT = findRoot();
const scssDir = join(ROOT, "packages/css/scss");
const bootstrapDir = join(ROOT, "node_modules/bootstrap");

const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const bootstrapPkg = JSON.parse(readFileSync(join(bootstrapDir, "package.json"), "utf8"));

/** First version the CLI and CDN URLs will exist at. */
export const RELEASE_VERSION = "0.1.0";
export const PACKAGE_VERSION: string = pkg.version;

function sri(file: string) {
  return `sha384-${createHash("sha384").update(readFileSync(file)).digest("base64")}`;
}

const cdn = (path: string) => `https://cdn.jsdelivr.net/npm/bootstrap@${bootstrapPkg.version}/${path}`;

// jsDelivr serves npm files byte-for-byte, so hashing the installed copy gives the CDN's SRI.
export const bootstrap = {
  version: bootstrapPkg.version as string,
  css: { href: cdn("dist/css/bootstrap.min.css"), integrity: sri(join(bootstrapDir, "dist/css/bootstrap.min.css")) },
  js: { src: cdn("dist/js/bootstrap.bundle.min.js"), integrity: sri(join(bootstrapDir, "dist/js/bootstrap.bundle.min.js")) },
};

export const shadcnBootstrapCdn = (file = "dist/css/shadcn-bootstrap.min.css") =>
  `https://cdn.jsdelivr.net/npm/shadcn-bootstrap@${RELEASE_VERSION}/${file}`;

const cache = new Map<string, string>();
function compile(source: string): string {
  if (!import.meta.env.DEV && cache.has(source)) return cache.get(source)!;
  const css = sass.compileString(source, { loadPaths: [scssDir], url: new URL(`file://${scssDir}/`) }).css;
  cache.set(source, css);
  return css;
}

export const tokensCss = () => renderTheme(DEFAULT_THEME, { header: false });
export const bridgeCss = () => compile('@use "entries/bridge";');
/** tokens + bridge + every component: what dist/css/shadcn-bootstrap.css contains. */
export const bundleCss = () => `${tokensCss()}\n${compile('@use "entries/shadcn-bootstrap";')}`;
/** One component's CSS exactly as the registry ships it (minus the banner). */
export const componentCss = (name: string) => compile(`@use "layers";\n@use "components/${name}";`).trim();
export const componentScssExists = (name: string) => existsSync(join(scssDir, "components", `_${name}.scss`));

const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400..700&family=Geist+Mono:wght@400..600&display=swap">';

export interface FrameOptions {
  /** Markup for <body>, or a full HTML document when `document` is true. */
  html: string;
  /** Extra CSS applied after everything else (the snippet being demonstrated). */
  css?: string;
  /** Which shadcn-bootstrap CSS the frame loads before `css`. */
  base?: "bundle" | "bridge" | "none";
  /** `html` is a full document; its shadcn-bootstrap CDN <link> is swapped for the local build. */
  document?: boolean;
  theme?: "light" | "dark";
  /** Load Bootstrap 6's JavaScript (ESM) in the frame. */
  js?: boolean;
}

/** Builds an iframe srcdoc: Bootstrap 6 from the CDN + local shadcn-bootstrap CSS + the snippet. */
export function frameDoc({ html, css = "", base = "bundle", document = false, theme, js = false }: FrameOptions): string {
  const bsJs = js ? `<script type="module" src="${bootstrap.js.src}" integrity="${bootstrap.js.integrity}" crossorigin="anonymous"></script>` : "";
  const local = base === "bundle" ? bundleCss() : base === "bridge" ? `${tokensCss()}\n${bridgeCss()}` : "";
  const frameCss = `<style>html,body{background:transparent}body{margin:0;padding:2.5rem 1.5rem;display:flex;align-items:center;justify-content:center;min-height:100vh;box-sizing:border-box}body>*{max-width:100%}</style>`;
  // Follow the docs page's color mode (frames are same-origin srcdoc documents).
  const mode = `<script>try{const m=parent.document.documentElement.getAttribute("data-bs-theme");if(m)document.documentElement.setAttribute("data-bs-theme",m)}catch(e){}</script>`;
  const resize = `<script>new ResizeObserver(()=>parent.postMessage({sbFrame:true,height:document.documentElement.scrollHeight},"*")).observe(document.documentElement)</script>`;
  if (document) {
    const swapped = html.replace(
      /<link[^>]+shadcn-bootstrap[^>]*>/,
      `<style>/* local build of shadcn-bootstrap (not on the CDN until ${RELEASE_VERSION}) */\n${bundleCss()}</style>`,
    );
    return swapped.replace("</head>", `${mode}${FONTS}${frameCss}${css ? `<style>${css}</style>` : ""}</head>`).replace("</body>", `${resize}</body>`);
  }
  return `<!doctype html><html lang="en"${theme ? ` data-bs-theme="${theme}"` : ""}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${mode}${FONTS}<link rel="stylesheet" href="${bootstrap.css.href}" integrity="${bootstrap.css.integrity}" crossorigin="anonymous">${local ? `<style>${local}</style>` : ""}${css ? `<style>${css}</style>` : ""}${frameCss}</head><body>${html}${bsJs}${resize}</body></html>`;
}
