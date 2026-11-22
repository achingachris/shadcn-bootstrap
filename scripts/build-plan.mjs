// Regenerates agents/IMPLEMENTATION_PLAN.md's component tables from registry/catalog.json,
// so the plan, the docs and the registry never disagree about status.
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { root } from "./lib.mjs";

const catalog = JSON.parse(await readFile(join(root, "registry/catalog.json"), "utf8"));
const template = await readFile(join(root, "agents/IMPLEMENTATION_PLAN.template.md"), "utf8");
const icon = (s) => (s === "built" ? "✅" : s === "in-progress" ? "🟡" : "⬜");

const tables = Object.entries(catalog.tiers).map(([tier, label]) => {
  const rows = catalog.components.filter((c) => String(c.tier) === tier);
  const built = rows.filter((c) => c.status === "built").length;
  const head = `### Tier ${tier}: ${label} (${rows.length}, ${built} built)\n\n| | Batch | Component | Bootstrap 6 base | Approach | Release |\n| --- | --- | --- | --- | --- | --- |`;
  const body = rows.map((c) => `| ${icon(c.status)} | ${c.batch ?? "–"} | ${c.title} | ${c.bootstrap} | ${c.approach} | ${c.release} |`);
  return [head, ...body].join("\n");
});

await writeFile(join(root, "agents/IMPLEMENTATION_PLAN.md"), template.replace("%%COMPONENT_TABLES%%", tables.join("\n\n")));
console.log("✓ agents/IMPLEMENTATION_PLAN.md");
