// Validates registry manifests + catalog, compiles each component's CSS on its own,
// and writes dist/registry/ (index, manifests, CSS, examples, sha256 per file).
import { readFile, readdir, rm, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import { root, scssDir, dist, compileScss, write, banner, pkg } from "./lib.mjs";

const registryDir = join(root, "registry");
const out = join(dist, "registry");
const readJson = async (f) => JSON.parse(await readFile(f, "utf8"));
const sha256 = (s) => createHash("sha256").update(s).digest("hex");
const exists = (f) => access(f).then(() => true, () => false);

const schema = await readJson(join(registryDir, "schema.json"));
const ajv = new Ajv2020({ allErrors: true, strict: false });
ajv.addSchema(schema, "schema");
const validateManifest = ajv.getSchema("schema#/$defs/manifest");
const validateCatalog = ajv.getSchema("schema#/$defs/catalog");

const errors = [];
const fail = (msg) => errors.push(msg);

const catalog = await readJson(join(registryDir, "catalog.json"));
if (!validateCatalog(catalog)) fail(`catalog.json: ${ajv.errorsText(validateCatalog.errors)}`);
const catalogByName = new Map(catalog.components.map((c) => [c.name, c]));

// Folders starting with "_" hold shared files (e.g. _lib/utils.ts), not components.
const dirs = (await readdir(registryDir, { withFileTypes: true }))
  .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
  .map((d) => d.name)
  .sort();
const manifests = [];
for (const name of dirs) {
  const file = join(registryDir, name, `${name}.json`);
  if (!(await exists(file))) { fail(`${name}/: missing ${name}.json`); continue; }
  const m = await readJson(file);
  if (!validateManifest(m)) { fail(`${name}/${name}.json: ${ajv.errorsText(validateManifest.errors)}`); continue; }
  if (m.name !== name) fail(`${name}/${name}.json: name "${m.name}" doesn't match its folder`);
  const entry = catalogByName.get(name);
  if (!entry) fail(`${name}: not in catalog.json`);
  else if (entry.status !== "built") fail(`${name}: has a manifest but catalog.json status is "${entry.status}"`);
  for (const f of m.files) {
    const src = f.type === "css" ? join(scssDir, "components", `_${name}.scss`) : join(registryDir, name, f.path);
    if (!(await exists(src))) fail(`${name}: file "${f.path}" has no source (${src.replace(root + "/", "")})`);
  }
  manifests.push(m);
}
for (const m of manifests) {
  for (const dep of m.registryDependencies) if (!dirs.includes(dep)) fail(`${m.name}: unknown registryDependency "${dep}"`);
}
for (const c of catalog.components) {
  if (c.status === "built" && !dirs.includes(c.name)) fail(`catalog.json: "${c.name}" is marked built but has no registry folder`);
}

if (errors.length) {
  console.error(`✗ Registry validation failed:\n  - ${errors.join("\n  - ")}`);
  process.exit(1);
}

await rm(out, { recursive: true, force: true });
const index = [];
for (const m of manifests) {
  const files = [];
  for (const f of m.files) {
    let contents;
    if (f.type === "css") {
      contents = banner + compileScss(`@use "layers";\n@use "components/${m.name}";`).css + "\n";
    } else {
      contents = await readFile(join(registryDir, m.name, f.path), "utf8");
    }
    await write(join(out, m.name, f.path), contents);
    files.push({ ...f, sha256: sha256(contents) });
  }
  const manifest = { ...m, files };
  delete manifest.$schema;
  await write(join(out, m.name, `${m.name}.json`), JSON.stringify(manifest, null, 2) + "\n");
  index.push({
    name: m.name,
    title: m.title,
    description: m.description,
    tier: m.tier,
    frameworks: [...new Set(m.files.map((f) => f.type).filter((t) => ["react", "vue", "angular"].includes(t)))],
    registryDependencies: m.registryDependencies,
  });
}

// Shared helpers the React and Vue components import from "@/lib/utils".
const libSource = await readFile(join(registryDir, "_lib/utils.ts"), "utf8");
await write(join(out, "lib/utils.ts"), libSource);

await write(
  join(out, "registry.json"),
  JSON.stringify(
    {
      name: "shadcn-bootstrap",
      version: pkg.version,
      bootstrap: pkg.peerDependencies.bootstrap,
      lib: [{ path: "lib/utils.ts", sha256: sha256(libSource), frameworks: ["react", "vue"] }],
      components: index,
    },
    null,
    2,
  ) + "\n",
);
await write(join(out, "catalog.json"), JSON.stringify(catalog, null, 2) + "\n");
await write(join(out, "schema.json"), JSON.stringify(schema, null, 2) + "\n");
console.log(`✓ dist/registry: ${index.length} components (catalog: ${catalog.components.length})`);
