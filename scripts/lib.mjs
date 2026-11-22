// Shared helpers for the build scripts.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const scssDir = join(root, "packages/css/scss");
export const dist = join(root, "dist");
export const pkg = JSON.parse(await (await import("node:fs/promises")).readFile(join(root, "package.json"), "utf8"));

export const banner = `/*! shadcn-bootstrap v${pkg.version} | MIT | Unofficial community port of shadcn/ui for Bootstrap 6. Not affiliated with shadcn. */\n`;

/** Compile a Sass string with packages/css/scss on the load path. */
export function compileScss(source, { sourceMap = false } = {}) {
  return sass.compileString(source, {
    loadPaths: [scssDir],
    url: new URL(`file://${scssDir}/`),
    style: "expanded",
    sourceMap,
  });
}

/** Write file, creating folders. */
export async function write(file, contents) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, contents);
}

/** Autoprefix + write `name.css` (+ .map), then minify to `name.min.css` (+ .map). */
export async function emitCss(file, css) {
  const prefixed = await postcss([autoprefixer]).process(css, { from: undefined, to: file, map: { inline: false, annotation: true } });
  await write(file, prefixed.css);
  await write(`${file}.map`, prefixed.map.toString());
  const minFile = file.replace(/\.css$/, ".min.css");
  const min = await postcss([cssnano({ preset: "default" })]).process(prefixed.css, {
    from: file,
    to: minFile,
    map: { inline: false, annotation: true, prev: prefixed.map.toString() },
  });
  await write(minFile, min.css);
  await write(`${minFile}.map`, min.map.toString());
  return prefixed.css;
}
