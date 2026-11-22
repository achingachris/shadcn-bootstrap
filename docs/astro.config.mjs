// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

// Docs rule: every snippet shows its output. HTML/CSS snippets go through <Example>
// (rendered output above the code) and shell commands through <Terminal> (output below).
// A bare fenced block for any of those languages in an .mdx page fails the build.
const BANNED_FENCE = /^\s*(`{3,}|~{3,})\s*(html|css|scss|sass|bash|sh|shell|zsh|console)\b/im;

/** @returns {import("vite").Plugin} */
function snippetsNeedOutput() {
  return {
    name: "shadcn-bootstrap:snippets-need-output",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".mdx")) return;
      const match = code.match(BANNED_FENCE);
      if (match) {
        const line = code.slice(0, match.index).split("\n").length;
        this.error(
          `${id}:${line}: bare \`\`\`${match[2]} fence. Snippets must show their output: use <Example> for HTML/CSS or <Terminal> for commands.`,
        );
      }
    },
  };
}

export default defineConfig({
  site: "https://shadcn-bootstrap.dev",
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-default" },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [snippetsNeedOutput()],
    server: { fs: { allow: [repoRoot] } },
    css: { preprocessorOptions: { scss: { api: "modern-compiler" } } },
  },
});
