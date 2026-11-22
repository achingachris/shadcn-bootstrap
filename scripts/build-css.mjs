// Builds dist/css: the full bundle, tokens.css, bridge.css and one file per theme.
import { join } from "node:path";
import { rm } from "node:fs/promises";
import { compileScss, emitCss, dist, banner } from "./lib.mjs";
import { renderTheme, baseColors, DEFAULT_THEME } from "../packages/css/themes/themes.mjs";

const out = join(dist, "css");
await rm(out, { recursive: true, force: true });

const tokens = renderTheme(DEFAULT_THEME);
const bridge = compileScss('@use "entries/bridge";').css;
const bundle = compileScss('@use "entries/shadcn-bootstrap";').css;

await emitCss(join(out, "tokens.css"), banner + tokens);
await emitCss(join(out, "bridge.css"), banner + bridge);
await emitCss(join(out, "shadcn-bootstrap.css"), `${banner}${tokens}\n${bundle}\n`);

// Theme files: token values only. Load one after the bundle to switch base color.
for (const base of Object.keys(baseColors)) {
  await emitCss(join(out, "themes", `${base}.css`), banner + renderTheme({ ...DEFAULT_THEME, base }));
}

console.log(`✓ dist/css: bundle, tokens, bridge, ${Object.keys(baseColors).length} themes`);
