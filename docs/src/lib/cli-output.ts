// Designed output of the planned CLI (phase 5), shown in <Terminal planned>.
import { getManifest } from "./catalog";

export function addOutput(names: string[]): string {
  const resolved: string[] = [];
  const visit = (n: string) => {
    if (resolved.includes(n)) return;
    getManifest(n)?.registryDependencies.forEach(visit);
    resolved.push(n);
  };
  names.forEach(visit);
  const extra = resolved.filter((n) => !names.includes(n));
  return [
    `✔ Resolved ${names.join(", ")}${extra.length ? ` (+ ${extra.join(", ")})` : ""}`,
    ...resolved.map((n) => `✔ Created css/components/${n}.css`),
    "",
    `Added ${resolved.length} component${resolved.length === 1 ? "" : "s"}. Link ${resolved.length === 1 ? "it" : "them"} after tokens.css and bridge.css:`,
    ...resolved.map((n) => `  <link rel="stylesheet" href="css/components/${n}.css">`),
  ].join("\n");
}
