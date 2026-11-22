# AGENTS.md

Guidance for coding agents working in this repository. Humans should start with [README.md](README.md).

## What this project is

shadcn-bootstrap is an **unofficial community port** of shadcn/ui for **Bootstrap 6** (`6.0.0-alpha.1`). It ships:

1. **CSS**: shadcn tokens, a bridge onto Bootstrap's `--bs-*` variables, and one CSS file per component.
2. **Components**: shadcn-style components (`<Button variant="outline">`, `<Card>`, `<CardHeader>`…) for React/Next.js, Vue and Angular. They render Bootstrap classes; the CSS does the styling and Bootstrap's own JavaScript (`data-bs-*`) does the behaviour.
3. **A registry** (on npm/jsDelivr) that a future CLI copies into users' projects, shadcn-style. Users own the copied files.

Plain HTML projects skip the components and write Bootstrap markup directly. The primary audience is React, Next.js, Angular and Vue.

The working plan (decisions, phases, status of all 66 components) is [agents/IMPLEMENTATION_PLAN.md](agents/IMPLEMENTATION_PLAN.md). Read it before larger changes.

## Setup and commands

Developing needs **Node 22.23+** (Astro 7). The published package itself has no runtime requirement beyond Node 18+ for the planned CLI.

```bash
npm install
```

| Command | What it does |
| --- | --- |
| `npm run build` | Builds `dist/css`, validates and builds `dist/registry`, regenerates `agents/IMPLEMENTATION_PLAN.md` |
| `npm run lint` | Stylelint over `packages/css/**/*.scss` |
| `npm run docs:dev` | Docs site at http://localhost:4321 (also `.claude/launch.json` → `docs`) |
| `npm run docs:build` | `npm run build`, then the static docs build into `docs/dist` |

CI (`.github/workflows/ci.yml`) runs `npm ci`, `npm run lint` and `npm run docs:build` on Node 24.

The docs site deploys on Vercel from `main` (previews for other branches). The Vercel project's Root Directory is `docs`, so its config is `docs/vercel.json`: install with `cd .. && npm ci` (run from `docs/`, `npm ci` would install only the docs workspace and skip the root devDependencies), build with `cd .. && npm run docs:build`, output `dist`. Commands there run inside `docs/`, where the root `docs:*` scripts don't exist.

## Repository map

```
packages/css/themes/themes.mjs     Tokens: base colors, accents, radius, renderTheme(). Single source of truth.
packages/css/scss/_bridge.scss     shadcn tokens -> Bootstrap --bs-* variables
packages/css/scss/_layers.scss     Bootstrap 6's cascade-layer order
packages/css/scss/components/      One partial per component (_button.scss …)
packages/css/scss/entries/         Bundle and bridge entry points
registry/catalog.json              All 66 shadcn components: tier, batch, status, approach
registry/schema.json               JSON Schema for manifests + catalog
registry/<name>/<name>.json        Manifest (built components only)
registry/<name>/<name>.example.html  Reference markup, sections split by <!-- example: Title -->
registry/<name>/{react,vue,angular}/ Component source per framework
registry/_lib/utils.ts             cn() helper used by React and Vue components
scripts/                           build-css, build-registry, build-plan (+ lib.mjs)
docs/                              Astro docs site (npm workspace)
agents/                            Internal plan for maintainers and agents
dist/                              Build output (gitignored, published to npm)
```

## Rules that aren't obvious from the code

### Bootstrap 6 is alpha; check names against the source

- Read `node_modules/bootstrap/scss/**` (or `dist/css/bootstrap.css`) before using a class or token name. Many Bootstrap 5 names are gone: `.form-check` → `.check`/`.radio`, `.form-switch` → `.switch`, `.form-select` → `select.form-control`, `.modal` → `.dialog`, `.offcanvas` → `.drawer`, `.dropdown` → `.menu`, `.text-body-secondary` → `.fg-3`.
- Variants are classes plus a theme: `.btn.btn-solid.theme-primary`, `.btn-outline`, `.btn-text` (ghost), `.badge.theme-danger`.
- Responsive utilities use a prefix: `md:d-flex`, `lg:d-none` (not `d-md-flex`).
- Its JavaScript is ESM-only and reads `document`; load it client-side only.

### Cascade layers

- All shadcn-bootstrap rules go in **`@layer custom`** (Bootstrap's empty slot above `components`/`forms`, below `helpers`/`utilities`).
- **Exception: the bridge's `:root` block is unlayered.** Bootstrap 6 alpha.1 emits its `:root` tokens outside any layer, and unlayered CSS beats every layer. Keep it unlayered and loaded after Bootstrap. If a later alpha moves those tokens into `@layer root`, move the bridge into `custom`.
- Every output file starts with the full layer-order statement (`@use "layers"`).

### Tokens

- Edit tokens only in `packages/css/themes/themes.mjs`. The build and the docs theme generator both import it.
- Colors are `light-dark(light, dark)`. `light-dark()` only accepts colors, so never wrap lengths or percentages in it.
- `[data-sb-theme]` re-applies the bridge inside a subtree, so scoped themes work. Keep that selector on the bridge.

### Components

- Keep them thin: map props to Bootstrap classes; no behaviour. Every framework must render the same classes so one CSS file serves all of them.
- APIs match shadcn: React has `variant`, `size`, `asChild`, `buttonVariants()`, `data-slot`, React 19 ref-as-prop (no `forwardRef`). Vue uses `<script setup>` SFCs, `as` instead of `asChild`, `v-model` and `default-checked` on form controls. Angular uses standalone, signal inputs, an `sb` prefix, directives on native elements (`<button sbButton>`, `<input sbInput>`) and elements for composites (`<sb-card>`, `<sb-switch>`).
- React and Vue import `cn` from `@/lib/utils`.

### Docs

- **Every snippet shows its output.** Use `<Example>` (rendered output above the code) for HTML/CSS/JSX/Vue and `<Terminal>` (output below) for commands. A bare ` ```html `, `css`, `scss`, `jsx`, `tsx`, `vue` or shell fence in an `.mdx` page fails the build (Vite plugin in `docs/astro.config.mjs`). `<CodeBlock>` on its own is only for config files that render nothing (`components.json`, `angular.json`).
- Component examples get React / Vue / Angular / HTML tabs from `<Example frameworks>`. Those versions are generated from the HTML by `docs/src/lib/frameworks.ts`; teach its `map()` any new markup instead of hand-writing framework code.
- **MDX strips leading spaces from multi-line strings inside indented JSX attributes.** Put multi-line snippets in an `export const` at column 0 or a TypeScript module (see `docs/src/lib/framework-snippets.ts`), never inline in an attribute.
- CLI output in the docs is the designed behaviour (the CLI isn't built yet); keep `planned` on those `<Terminal>`s.
- Don't mention or link `agents/` or the implementation plan from the README or the docs site.
- **Never hard-code the package version in the docs.** Use `VERSION` from `docs/src/lib/build-info.ts` (read from `package.json`, which release-please bumps) for npm and CDN URLs, and `CLI_VERSION` for anything about the planned CLI. The docs then follow each release with no edits.

### Generated files

- `agents/IMPLEMENTATION_PLAN.md` is generated. Edit `agents/IMPLEMENTATION_PLAN.template.md`; component tables come from `registry/catalog.json`.
- Never edit `dist/` or `docs/dist/`.

### Naming

Say "unofficial community port" wherever the project describes itself. Don't use the shadcn logo or imply endorsement. Keep shadcn's MIT notice in `LICENSE`.

## Adding a component

1. Read the Bootstrap 6 source for its base (`node_modules/bootstrap/scss/…`) and its `--bs-<component>-*` tokens.
2. Write `packages/css/scss/components/_<name>.scss` in `@layer custom`: override tokens first, properties second. Import it in `entries/shadcn-bootstrap.scss`.
3. Write `registry/<name>/react/<name>.tsx`, `vue/*.vue` + `vue/index.ts`, and `angular/<name>.ts`.
4. Add `registry/<name>/<name>.json` listing every file, and `<name>.example.html`. Set `status: "built"` in `registry/catalog.json`.
5. Extend `map()` in `docs/src/lib/frameworks.ts` for the new markup.
6. Run `npm run build`, `npm run lint` and `npm run docs:build`, then check the page in `npm run docs:dev`: light, dark, `dir="rtl"`, keyboard focus, disabled and invalid states.

## Verifying changes

- There's no test suite yet. Verification is: `npm run build` (the registry build fails on invalid manifests), `npm run lint`, `npm run docs:build`, and a look at affected pages in the browser.
- Component sources aren't type-checked in CI yet. Before changing them, type-check in a scratch folder against React 19 (`tsc`), Vue 3 (`vue-tsc`) and Angular 20, with `@/lib/*` mapped to `registry/_lib/*`.
- In docs previews, colors animate over 150ms; wait before judging a screenshot after toggling light/dark.

## Git and releases

**Branches:** feature branch → `dev` → `main`.

- `dev` is the default branch. Branch from a freshly pulled `dev` and open PRs **into `dev`**. PRs are squash-merged, so the **PR title** becomes the commit message on `dev` and must be a Conventional Commit (`feat(registry): …`, `fix(docs): …`). Release notes and version bumps come from these.
- Never open a PR into `main`; the maintainer rejects them. Only the maintainer merges `dev` → `main`, with a merge commit so each Conventional Commit reaches `main` intact. The `source-branch` check (`.github/workflows/pr-target.yml`) flags any PR into `main` that isn't from `dev` or release-please.
- A ruleset on `main` blocks direct pushes, force pushes and deletion for everyone: `main` only changes through merge-commit PRs. It deliberately requires no status checks, because release-please's PRs don't trigger CI.

**Releases are automated with release-please** (`.github/workflows/publish.yml`, `release-please-config.json`, `.release-please-manifest.json`):

1. Each push to `main` updates a release PR that bumps `package.json`, updates `.release-please-manifest.json` and writes `CHANGELOG.md`. Before 1.0, `feat:` and breaking changes bump the minor version and `fix:` bumps the patch; `docs:`, `chore:`, `ci:` and the like don't trigger a release.
2. When the maintainer merges the release PR, the same workflow tags the release, creates the GitHub release and runs `npm publish` through npm trusted publishing (OIDC, no token). npm's staged publishing may hold the version for the maintainer's approval.
3. Afterwards, `main` is merged back into `dev` so `dev` has the new version and changelog.

**Keeping docs in step with releases.** Version strings in `README.md` are bumped by release-please (`extra-files` in `release-please-config.json`): a line ending in `<!-- x-release-please-version -->`, or a block between `<!-- x-release-please-start-version -->` and `<!-- x-release-please-end -->`. Every semver in a marked line or block is replaced, so never mark a line that also holds another version (such as `bootstrap@6.0.0-alpha.1`). When you add a versioned URL to the README, mark it.

Release-please only bumps numbers. When a release changes what's true (the package or CLI is published, a component ships, a "planned" feature lands), update the prose too, in the same PR or straight after the merge-back into `dev`:

- `README.md`: the **Status** paragraph, install sections, "planned for" notes.
- Docs: the note at the top of `docs/src/pages/docs/installation.mdx`, `CLI_VERSION` and the `planned` flags on `<Terminal>`s once the CLI exists, and `release` in `registry/catalog.json` for components that shipped.
- Then check with `npm view shadcn-bootstrap versions` and a jsDelivr URL that the version you're describing is really published.

Never edit `version` in `package.json`, `.release-please-manifest.json` or `CHANGELOG.md` by hand, never run `npm version` or `npm publish` yourself, and keep the workflow file named `publish.yml` (npm's trusted publisher is registered for that name).
