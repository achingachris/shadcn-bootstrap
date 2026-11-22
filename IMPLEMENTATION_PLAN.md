# shadcn-bootstrap: Implementation Plan

Last updated 22 Nov 2026 · owner: Chris Achinga

This is the working plan for building shadcn-bootstrap. It turns the Build & Release Plan into tasks with file paths and acceptance criteria, records the decisions made since, and tracks every component. Check items off as they land.

> **Unofficial community port.** shadcn-bootstrap is not affiliated with or endorsed by shadcn. shadcn/ui is MIT licensed; its copyright notice is kept in [LICENSE](LICENSE).

## Goal

Give Bootstrap 6 projects the shadcn/ui look and the shadcn "own your code" workflow. Stock Bootstrap loads from its CDN; shadcn-bootstrap adds design tokens, a bridge onto Bootstrap's `--bs-*` variables, and per-component CSS that a CLI copies into your project. Styling only: works with any HTML.

**v1.0 ships** tokens + bridge, Tiers 1 and 2 (53 of shadcn's 66 components), the registry on npm/jsDelivr, the `init` / `add` / `diff` / `list` CLI, a precompiled bundle, and this docs site with a theme generator.

**Out of scope for v1:** a React/Vue component library, forking or recompiling Bootstrap, Bootstrap 5 and earlier, charts, framework templates.

## Decisions and corrections

Checked against `bootstrap@6.0.0-alpha.1` (npm `next` tag) on 22 Nov 2026.

| Topic | Decision |
| --- | --- |
| Cascade layer | Bootstrap 6 declares `@layer colors, config, root, reboot, layout, content, forms, components, custom, helpers, utilities;`. The `custom` layer is empty and meant for user CSS. **All shadcn-bootstrap rules go in `@layer custom`** (the release plan said `components`): they beat Bootstrap's components and forms regardless of specificity and still lose to helpers/utilities. Every output file starts with the full layer-order statement so load order can't reorder layers. |
| Bridge is unlayered | `bootstrap@6.0.0-alpha.1` declares a `root` layer but emits its `:root` tokens **outside any layer**, and unlayered CSS beats every layer. The bridge's `:root` block is therefore unlayered and must load after Bootstrap. Everything else stays in `@layer custom`. Re-check on each alpha; if Bootstrap moves its tokens into `@layer root`, move the bridge into `custom`. |
| Color modes | Tokens use `light-dark()`. Bootstrap 6 sets `color-scheme: light dark` on `:root` and switches with `[data-bs-theme="light"/"dark"]`, so tokens follow the OS by default and any subtree can be forced. |
| Token source | Tokens live in `packages/css/themes/themes.mjs` (data + `renderTheme()`), not SCSS. The build and the docs theme generator import the same module, so the generator outputs exactly what ships. |
| Package | One npm package at the repo root (`package.json`), building into root `dist/`. The release plan's `packages/css/package.json` and `packages/css/registry/` paths are dropped. |
| Component CSS | Single source: `packages/css/scss/components/_<name>.scss`. `registry/<name>/` holds only the manifest and example HTML; the registry build compiles `dist/registry/<name>/<name>.css`. |
| v1 bar | The release plan says 53 components in scope but "12 components" in the launch checklist. **53 (Tiers 1 + 2) is the v1.0 bar.** |
| Bootstrap 6 renames | `.form-check` → `.check` / `.radio`; `.form-switch` → `.switch`; `.form-select` → `select.form-control`; `.modal` → `.dialog`; `.offcanvas` → `.drawer`; `.dropdown` → `.menu`; `.ratio` → `.ratio-16x9` etc. New: `.chip`, `.stepper`, `.otp`, `.prose`, `.avatar`, `.combobox`; a `_datepicker.scss` exists (evaluate for Calendar). |
| Variants | shadcn variants map to Bootstrap 6 classes, not new class names: default = `.btn-solid.theme-primary`, destructive = `.theme-danger`, outline = `.btn-outline`, ghost = `.btn-text`. Un-themed `.btn-outline` / `.btn-text` are restyled to shadcn's neutral outline/ghost. |
| Docs stack | Astro (decided). MDX prose; every HTML/CSS snippet renders its output; commands show their output. |
| Tests | Vitest + msw for the CLI, one end-to-end `init` + `add` test. Written when the CLI phase starts. |

## Repo layout

```
package.json                      published "shadcn-bootstrap" (npm workspaces: docs)
packages/css/themes/themes.mjs    tokens: base colors, accents, radius, renderTheme()
packages/css/scss/
  _layers.scss _bridge.scss _mixins.scss
  components/_<name>.scss         one partial per component
  entries/shadcn-bootstrap.scss   bridge + all components (build prepends tokens)
  entries/bridge.scss
registry/catalog.json             all 66 components: tier, batch, status, v6 base, approach
registry/schema.json              JSON Schema for manifests + catalog
registry/<name>/<name>.json       manifest (built components only)
registry/<name>/<name>.example.html  reference markup, split by <!-- example: Title -->
scripts/build-css.mjs             dist/css: bundle, tokens, bridge, themes (+ .min, maps)
scripts/build-registry.mjs        validates registry, writes dist/registry (+ sha256 per file)
docs/                             Astro docs site
packages/cli/                     (phase 5) zero-dep CLI
```

## Phases

### Phase 1: Setup
- [x] npm name `shadcn-bootstrap` confirmed free (22 Nov 2026)
- [ ] **You:** publish placeholder `0.0.1` to reserve the name; claim the GitHub org/repo. Fallback name: `@achinga/shadcn-bootstrap`
- [x] Root package, npm workspaces (`docs`), `.editorconfig`, `.gitignore`, Stylelint config, browserslist = Bootstrap 6 floor
- [x] Dev tooling: Dart Sass, PostCSS (autoprefixer, cssnano), Stylelint, Ajv
- [x] `bootstrap@6.0.0-alpha.1` pinned as devDependency; `peerDependencies: ^6.0.0-alpha.1` (optional)
- [ ] CI workflow (`.github/workflows/ci.yml`): `npm ci` → `npm run build` → `npm run lint` → docs build
- [ ] ESLint for `scripts/` and `packages/cli/`

**Done when:** `npm run build` and `npm run lint` pass in CI on a clean clone.

### Phase 2: Tokens + bridge
- [x] `themes.mjs`: shadcn tokens (`--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--radius`, `--chart-1…5`, `--sidebar-*`) as `light-dark()` pairs
- [x] Base colors zinc (default), slate, stone, neutral, gray; accents blue, green, orange, red, rose, violet, yellow; radius presets
- [x] `_bridge.scss`: maps tokens onto `--bs-bg-*`, `--bs-fg-*`, `--bs-border-*`, `--bs-radius-1…9`, `--bs-focus-ring-*`, `--bs-link-*`, `--bs-btn-input-*`, `--bs-control-*`, `--bs-{primary,secondary,danger}-*`
- [ ] Re-check every bridged name on each new Bootstrap alpha (script: diff `--bs-*` names in `bootstrap.css` against the bridge)
- [ ] Side-by-side page vs ui.shadcn.com for typography, surfaces and focus rings

**Done when:** plain Bootstrap markup with the bundle looks like shadcn in light and dark.

### Phase 3: Components
Build in batches (table below). For each component:
1. Read the v6 source (`node_modules/bootstrap/scss/**/_<component>.scss`) and its token map.
2. Write `packages/css/scss/components/_<name>.scss` in `@layer custom`, overriding `--bs-<component>-*` tokens first and properties second.
3. Add `registry/<name>/<name>.json` + `<name>.example.html`; set `status: "built"` in `catalog.json`.
4. Check light, dark, `dir="rtl"`, keyboard focus, disabled and invalid states on the docs page.

**Done when:** every Tier 1 and 2 component is built and passes visual + accessibility checks.

### Phase 4: Registry
- [x] `catalog.json` (all 66) and per-component manifests (files, `registryDependencies`, `cssVars`, variants)
- [x] `build-registry.mjs` validates against `schema.json`, checks file sources, dependency names and catalog status; fails the build on any error
- [x] Output `dist/registry/` with `registry.json` index and sha256 per file (for CLI edit detection)

### Phase 5: CLI (`packages/cli`, zero runtime deps, Node 18+)
- [ ] `init`: write `components.json`, copy `tokens.css` + `bridge.css`, print Bootstrap CDN `<link>`/`<script type="module">` with SRI
- [ ] `add <names…>`: resolve `registryDependencies`, copy CSS, store sha256 in `components.json`, refuse to overwrite edited files without `--overwrite`
- [ ] `diff <name>`: unified diff of upstream vs local
- [ ] `list`: available vs installed
- [ ] Fetch from jsDelivr at the pinned version; cache in `~/.cache/shadcn-bootstrap/<version>/`; custom registry URL
- [ ] Vitest + msw tests; e2e `init` + `add button` in an empty folder and a Vite project
- [ ] Add `"bin": { "shadcn-bootstrap": "dist/bin/cli.js" }` to `package.json`

### Phase 6: Publish
- [ ] `.github/workflows/release.yml` on tag `v*`: build, registry validate, visual tests, `npm publish --provenance --access public`, smoke-test `npx shadcn-bootstrap@<v> list`, SRI hashes into release notes
- [ ] Purge jsDelivr `@latest` after release
- [ ] v0.1.0: batch 0 + CLI

### Phase 7: Docs + launch
- [x] Astro site: landing, introduction, installation, theming, dark mode, CLI, components index (all 66), component pages, theme generator, roadmap
- [x] Snippets always show output (`<Example>`, `<Terminal>`; build fails on bare HTML/CSS fences)
- [ ] Deploy (static host), search, SRI hashes in install docs once published
- [ ] v1.0.0 + launch post (dev.to, Bootstrap and frontend communities, Python Kenya)

## Components

Status: ✅ built · ⬜ planned. Batch 0 is the starter set; batches 1–5 complete v1.0; Tiers 3–4 ship in minor releases.

### Tier 1: CSS on existing Bootstrap parts (33, 8 built)

| | Batch | Component | Bootstrap 6 base | Approach | Release |
| --- | --- | --- | --- | --- | --- |
| ✅ | 0 | Button | `.btn` | `--bs-btn-*` overrides; variants default/secondary/destructive/outline/ghost/link; sizes sm/lg/icon | 0.1.0 |
| ✅ | 0 | Badge | `.badge` | default/secondary/destructive/outline variants | 0.1.0 |
| ✅ | 0 | Card | `.card` | header/title/description/content/footer spacing, card tokens | 0.1.0 |
| ✅ | 0 | Alert | `.alert` | default + destructive, icon slot via grid | 0.1.0 |
| ✅ | 0 | Input | `.form-control` | height, input border, ring on focus, file input | 0.1.0 |
| ✅ | 0 | Label | `.form-label` | weight/size, disabled peer state | 0.1.0 |
| ✅ | 0 | Checkbox | `.check` | `--bs-check-*` overrides, indeterminate | 0.1.0 |
| ✅ | 0 | Switch | `.switch` | track/thumb sizes, sm/lg | 0.1.0 |
| ⬜ | 1 | Textarea | `.form-control` | `field-sizing: content` auto-grow | 1.0.0 |
| ⬜ | 1 | Native Select | `select.form-control` | caret, height parity with Input | 1.0.0 |
| ⬜ | 1 | Radio Group | `.radio` | stacked group layout | 1.0.0 |
| ⬜ | 1 | Slider | `.form-range` | track/thumb on shadcn tokens | 1.0.0 |
| ⬜ | 1 | Field | `.form-field`, `.form-label`, validation | field/label/description/error layout, horizontal variant | 1.0.0 |
| ⬜ | 1 | Input Group | `.input-group` | addons, buttons, icons inside | 1.0.0 |
| ⬜ | 1 | Toggle | `.btn-check` + `.btn` | pressed state, outline variant | 1.0.0 |
| ⬜ | 1 | Toggle Group | `.btn-group` + `.btn-check` | single/multiple, joined borders | 1.0.0 |
| ⬜ | 1 | Button Group | `.btn-group` | joined radii, separator, vertical | 1.0.0 |
| ⬜ | 2 | Avatar | `.avatar`, `.avatar-stack` | round, fallback initials, group | 1.0.0 |
| ⬜ | 2 | Aspect Ratio | `.ratio-*` | docs + `aspect-ratio` helper | 1.0.0 |
| ⬜ | 2 | Breadcrumb | `.breadcrumb` | separators, ellipsis, muted links | 1.0.0 |
| ⬜ | 2 | Pagination | `.pagination` | ghost/outline buttons, active state | 1.0.0 |
| ⬜ | 2 | Progress | `.progress` | thin track, primary bar | 1.0.0 |
| ⬜ | 2 | Skeleton | `.placeholder` | muted pulse | 1.0.0 |
| ⬜ | 2 | Spinner | `.spinner-border` / `.spinner-rotate` | sizes, muted color | 1.0.0 |
| ⬜ | 2 | Separator | `hr`, `.vr` | horizontal/vertical, border token | 1.0.0 |
| ⬜ | 2 | Kbd | `kbd` element (custom) | key cap style, group | 1.0.0 |
| ⬜ | 2 | Table | `.table` | header/row/hover/caption/footer | 1.0.0 |
| ⬜ | 2 | Item | `.list-group` | media/content/actions layout, variants | 1.0.0 |
| ⬜ | 2 | Empty | custom `.empty` | icon/title/description/actions | 1.0.0 |
| ⬜ | 2 | Scroll Area | custom `.scroll-area` | `scrollbar-width` / `scrollbar-color` | 1.0.0 |
| ⬜ | 2 | Code Block | `pre` / `code` (custom) | muted bg, line numbers, copy-button slot | 1.0.0 |
| ⬜ | 2 | Typography | `.prose` + type utilities | h1–h4, lead, muted, blockquote, lists, inline code | 1.0.0 |
| ⬜ | 2 | Direction | `dir="rtl"` | logical properties everywhere; RTL pass over all built components | 1.0.0 |

### Tier 2: Restyle Bootstrap 6 JS components (20, 0 built)

| | Batch | Component | Bootstrap 6 base | Approach | Release |
| --- | --- | --- | --- | --- | --- |
| ⬜ | 3 | Dialog | `.dialog` | overlay, centered content, header/footer, close | 1.0.0 |
| ⬜ | 3 | Alert Dialog | `.dialog` (static) | no dismiss on backdrop, action/cancel footer | 1.0.0 |
| ⬜ | 3 | Drawer | `.drawer-bottom` | handle bar, rounded top | 1.0.0 |
| ⬜ | 3 | Sheet | `.drawer-start/end/top/bottom` | side sheets, widths | 1.0.0 |
| ⬜ | 3 | Popover | `.popover` | popover tokens, shadow, arrow off | 1.0.0 |
| ⬜ | 3 | Hover Card | `.popover` + hover trigger | delay settings documented | 1.0.0 |
| ⬜ | 3 | Tooltip | `.tooltip` | primary bg, small text | 1.0.0 |
| ⬜ | 3 | Toast | `.toast` | Sonner-like stack, variants (JS queue is an open decision) | 1.0.0 |
| ⬜ | 4 | Dropdown Menu | `.menu` | items, shortcuts, checks, sub-menus, separators | 1.0.0 |
| ⬜ | 4 | Context Menu | `.menu` on `contextmenu` | trigger docs + tiny helper snippet | 1.0.0 |
| ⬜ | 4 | Menubar | `.navbar` + `.menu` | bar with triggers | 1.0.0 |
| ⬜ | 4 | Navigation Menu | `.nav` + `.menu` | mega-menu panels | 1.0.0 |
| ⬜ | 4 | Select | `.menu` / `.combobox` | trigger styled like Input | 1.0.0 |
| ⬜ | 4 | Combobox | `.combobox` | search input, empty state | 1.0.0 |
| ⬜ | 4 | Tabs | `.nav-tabs` + `.tab-content` | muted pill list (shadcn style) | 1.0.0 |
| ⬜ | 4 | Sidebar | `.drawer` + `.nav` | collapsible, mobile drawer, sidebar tokens | 1.0.0 |
| ⬜ | 5 | Accordion | `.accordion`, `details`/`summary` | borderless items, chevron | 1.0.0 |
| ⬜ | 5 | Collapsible | `.collapse` | trigger + content | 1.0.0 |
| ⬜ | 5 | Carousel | `.carousel` | outline prev/next buttons | 1.0.0 |
| ⬜ | 5 | Input OTP | `.otp`, `.otp-slot` | joined slots, separator | 1.0.0 |

### Tier 3: Needs JS that Bootstrap doesn't ship (6, 0 built)

| | Batch | Component | Bootstrap 6 base | Approach | Release |
| --- | --- | --- | --- | --- | --- |
| ⬜ | – | Calendar | none (Bootstrap 6 ships `_datepicker.scss`; evaluate first) | CSS + markup first; recommend a behaviour library | 1.1.0 |
| ⬜ | – | Chart | theme tokens for a chart library | `--chart-1…5` tokens mapped onto a chart library's theme | 1.1.0 |
| ⬜ | – | Command | custom | CSS + markup first; small ESM helper later | 1.1.0 |
| ⬜ | – | Data Table | `.table` + sorting/filtering JS | CSS on Table; recommend a table behaviour library | 1.1.0 |
| ⬜ | – | Date Picker | Calendar + Popover | depends on Calendar and Popover | 1.1.0 |
| ⬜ | – | Resizable | custom | CSS + markup first; small ESM helper later | 1.1.0 |

### Tier 4: Newest shadcn additions (7, 0 built)

| | Batch | Component | Bootstrap 6 base | Approach | Release |
| --- | --- | --- | --- | --- | --- |
| ⬜ | – | Attachment | to be decided | Read its purpose in the shadcn source first | 1.x |
| ⬜ | – | Bubble | to be decided | Read its purpose in the shadcn source first | 1.x |
| ⬜ | – | Marker | to be decided | Read its purpose in the shadcn source first | 1.x |
| ⬜ | – | Message | to be decided | Read its purpose in the shadcn source first | 1.x |
| ⬜ | – | Message Scroller | to be decided | Read its purpose in the shadcn source first | 1.x |
| ⬜ | – | Questionnaire | to be decided | Read its purpose in the shadcn source first | 1.x |
| ⬜ | – | Trace | to be decided | Read its purpose in the shadcn source first | 1.x |

## Open decisions
- [ ] Package name: keep `shadcn-bootstrap` or rebrand
- [ ] Packaging: one npm package (current) or styles + CLI split
- [ ] Ship small JS extras (toast queue, combobox helpers) in v1 or v1.1
- [x] Docs site stack: **Astro**
- [x] License: **MIT** (with shadcn's notice)

## Risks
| Risk | Mitigation |
| --- | --- |
| Bootstrap 6 is alpha; tokens, classes and layering can change (alpha.1 already emits `:root` tokens outside its declared `root` layer) | Exact pin, CI on each prerelease, all mappings in `_bridge.scss`, a name-diff script |
| Browser floor Chrome/Edge 130+, Firefox 132+, Safari 18+ | Same floor, stated in docs; no fallbacks needed for `oklch()`, `color-mix()`, `light-dark()` |
| Tier 3 needs JS Bootstrap doesn't ship | CSS + markup first, recommend a behaviour library, small ESM helpers later |
| Using the "shadcn" name | "Unofficial community port" everywhere, no logo, credit in LICENSE/README, rename if asked |
| Overlap with Shadstrap / Bootwind | Lead with Bootstrap 6 support and the registry + CLI ownership model |

## v1 launch checklist
- [ ] Name reserved (npm placeholder, GitHub org/repo)
- [x] README, npm description and docs say "unofficial community port"
- [x] LICENSE includes shadcn's MIT notice
- [ ] 53 components render correctly in light and dark mode
- [ ] Keyboard navigation and visible focus on every interactive component
- [ ] WCAG AA contrast for every theme
- [ ] `npx shadcn-bootstrap init && add button` in an empty folder and a Vite project
- [ ] npm package live, jsDelivr URLs resolving
- [ ] CLI on Node 18+ (macOS, Linux, Windows)
- [ ] SRI hashes in docs and release notes
- [ ] README: CDN install, CLI install, theming
- [ ] Docs deployed with theme generator
- [ ] CHANGELOG and CONTRIBUTING (adding a component to the registry)
- [ ] Launch post and community shares
