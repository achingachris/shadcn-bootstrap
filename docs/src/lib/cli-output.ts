// Designed output of the planned CLI (phase 5), shown in <Terminal planned>.
import { getManifest } from "./catalog";

export type CliFramework = "react" | "vue" | "angular" | "html";

const COMPONENT_DIR: Record<CliFramework, string> = {
  react: "components/ui",
  vue: "components/ui",
  angular: "src/app/ui",
  html: "",
};
const CSS_DIR: Record<CliFramework, string> = {
  react: "styles/components",
  vue: "src/styles/components",
  angular: "src/styles/components",
  html: "css/components",
};

function resolve(names: string[]): string[] {
  const resolved: string[] = [];
  const visit = (n: string) => {
    if (resolved.includes(n)) return;
    getManifest(n)?.registryDependencies.forEach(visit);
    resolved.push(n);
  };
  names.forEach(visit);
  return resolved;
}

/** Files `add` writes for one component in a given framework. */
export function addedFiles(name: string, framework: CliFramework): string[] {
  const files = getManifest(name)?.files ?? [];
  const sources = files
    .filter((f) => f.type === framework)
    .map((f) => {
      const file = f.path.split("/").at(-1)!;
      return framework === "vue" ? `${COMPONENT_DIR.vue}/${name}/${file}` : `${COMPONENT_DIR[framework]}/${file}`;
    });
  return [...sources, `${CSS_DIR[framework]}/${name}.css`];
}

export function addOutput(names: string[], framework: CliFramework = "react"): string {
  const resolved = resolve(names);
  const extra = resolved.filter((n) => !names.includes(n));
  const lines = [`✔ Resolved ${names.join(", ")}${extra.length ? ` (+ ${extra.join(", ")})` : ""}`];
  for (const n of resolved) for (const f of addedFiles(n, framework)) lines.push(`✔ Created ${f}`);
  lines.push("");
  if (framework === "html") {
    lines.push(`Link ${resolved.length === 1 ? "it" : "them"} after tokens.css and bridge.css:`);
    for (const n of resolved) lines.push(`  <link rel="stylesheet" href="css/components/${n}.css">`);
  } else {
    lines.push(`CSS is imported from ${CSS_DIR[framework]}/index.css, which init added to your entry file.`);
  }
  return lines.join("\n");
}
