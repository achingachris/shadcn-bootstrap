// Component data for the docs: the 66-entry catalog plus manifests/examples for built ones.
import catalogJson from "../../../registry/catalog.json";

export interface CatalogEntry {
  name: string;
  title: string;
  tier: 1 | 2 | 3 | 4;
  batch: number | null;
  status: "built" | "in-progress" | "planned";
  release: string;
  bootstrap: string;
  approach: string;
}

export interface Manifest {
  name: string;
  title: string;
  description: string;
  tier: number;
  bootstrap: { classes: string[]; js?: boolean };
  files: { path: string; type: "css" | "example" }[];
  registryDependencies: string[];
  cssVars: string[];
  variants?: { name: string; classes: string }[];
}

export interface ExampleSection {
  title: string;
  slug: string;
  code: string;
}

export const catalog = catalogJson as unknown as { tiers: Record<string, string>; source: string; components: CatalogEntry[] };

const manifestModules = import.meta.glob<Manifest>("../../../registry/*/*.json", { eager: true, import: "default" });
const exampleModules = import.meta.glob<string>("../../../registry/*/*.example.html", { eager: true, query: "?raw", import: "default" });

const byFolder = <T,>(mods: Record<string, T>) =>
  new Map(Object.entries(mods).map(([path, mod]) => [path.split("/").at(-2)!, mod]));

const manifests = byFolder(manifestModules);
const examples = byFolder(exampleModules);

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function getManifest(name: string): Manifest | undefined {
  return manifests.get(name);
}

/** Splits an example.html file on `<!-- example: Title -->` markers. */
export function getExamples(name: string): ExampleSection[] {
  const raw = examples.get(name);
  if (!raw) return [];
  const parts = raw.split(/<!--\s*example:\s*(.+?)\s*-->/);
  const sections: ExampleSection[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    sections.push({ title: parts[i], slug: slugify(parts[i]), code: parts[i + 1].trim() });
  }
  return sections;
}

export const components = [...catalog.components].sort((a, b) => a.title.localeCompare(b.title));
export const builtComponents = components.filter((c) => c.status === "built");
export const tierLabel = (tier: number) => `Tier ${tier}: ${catalog.tiers[String(tier)]}`;
