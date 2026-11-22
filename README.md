# shadcn-bootstrap

The [shadcn/ui](https://ui.shadcn.com) look and "own your code" workflow for **Bootstrap 6**.

> **Unofficial community port.** Not affiliated with or endorsed by shadcn. shadcn/ui is MIT licensed and its notice is kept in [LICENSE](LICENSE).

Stock Bootstrap loads from its CDN. shadcn-bootstrap adds three layers of CSS on top:

1. **Tokens**: shadcn's variables (`--background`, `--primary`, `--ring`, `--radius`…) with light and dark values via `light-dark()`.
2. **Bridge**: maps those tokens onto Bootstrap 6's `--bs-*` variables, so plain Bootstrap markup already looks like shadcn.
3. **Components**: per-component CSS you copy into your project and edit.

Tokens and components sit in Bootstrap 6's `custom` cascade layer, so Bootstrap utilities still win. The bridge's `:root` block is unlayered, because Bootstrap 6 alpha.1 emits its own `:root` tokens unlayered; load shadcn-bootstrap after Bootstrap. It's styling only and works with any HTML: a static site, a backend framework or a JS framework.

**Status:** pre-release. Tokens, bridge and 8 components (Button, Badge, Card, Alert, Input, Label, Checkbox, Switch) are built. See [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) for all 66 components and the roadmap.

## Install from the CDN

Not on npm yet. Once `0.1.0` is published:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@6.0.0-alpha.1/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/shadcn-bootstrap@0.1.0/dist/css/shadcn-bootstrap.min.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/bootstrap@6.0.0-alpha.1/dist/js/bootstrap.bundle.min.js"></script>
```

Load Bootstrap first, then shadcn-bootstrap. Bootstrap 6's JS is ESM-only, so its script needs `type="module"`.

## Install with the CLI (planned for 0.1.0)

```bash
npx shadcn-bootstrap init
```

```bash
npx shadcn-bootstrap add button card input
```

`init` copies `tokens.css` and `bridge.css` into your project; `add` copies each component's CSS. The files are yours to edit.

## Theming

Switch base color by loading a theme file after the bundle, or paste a block from the docs theme generator:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/shadcn-bootstrap@0.1.0/dist/css/themes/slate.css">
```

Dark mode follows the OS by default. Force it with Bootstrap's attribute on any element: `<html data-bs-theme="dark">`.

Browser support matches Bootstrap 6: Chrome/Edge 130+, Firefox 132+, Safari 18+.

## Develop

Requires Node 18+.

```bash
npm install
```

```bash
npm run build
```

```bash
npm run docs:dev
```

| Script | What it does |
| --- | --- |
| `npm run build` | Builds `dist/css`, validates and builds `dist/registry`, regenerates the component tables in `IMPLEMENTATION_PLAN.md` |
| `npm run lint` | Stylelint over the Sass sources |
| `npm run docs:dev` | Docs site at http://localhost:4321 |
| `npm run docs:build` | Static docs build in `docs/dist` |

Adding a component: see Phase 3 in [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md).

## License

MIT. Includes shadcn/ui's MIT notice; see [LICENSE](LICENSE).
