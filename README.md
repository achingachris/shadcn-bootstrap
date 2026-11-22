# shadcn-bootstrap

The [shadcn/ui](https://ui.shadcn.com) look and "own your code" workflow for **Bootstrap 6**, in **React, Next.js, Angular and Vue**.

> **Unofficial community port.** Not affiliated with or endorsed by shadcn. shadcn/ui is MIT licensed and its notice is kept in [LICENSE](LICENSE).

Like shadcn/ui, you get components with the same structure and props, copied into your project:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one click.</CardDescription>
  </CardHeader>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
```

React and Next.js get `.tsx` components, Vue gets single-file components, Angular gets standalone components and directives (`<button sbButton variant="outline">`). They render Bootstrap 6 classes, Bootstrap's JavaScript supplies behaviour through `data-bs-*` attributes, and shadcn-bootstrap's CSS supplies the look. Plain HTML projects skip the components and write the Bootstrap markup directly.

The CSS comes in three layers on top of stock Bootstrap:

1. **Tokens**: shadcn's variables (`--background`, `--primary`, `--ring`, `--radius`…) with light and dark values via `light-dark()`.
2. **Bridge**: maps those tokens onto Bootstrap 6's `--bs-*` variables, so plain Bootstrap markup already looks like shadcn.
3. **Components**: per-component CSS you copy into your project and edit.

Tokens and components sit in Bootstrap 6's `custom` cascade layer, so Bootstrap utilities still win. The bridge's `:root` block is unlayered, because Bootstrap 6 alpha.1 emits its own `:root` tokens unlayered; load shadcn-bootstrap after Bootstrap. The same CSS also works in plain HTML and server templates.

**Status:** pre-release. Tokens, bridge and 8 components (Button, Badge, Card, Alert, Input, Label, Checkbox, Switch) are built, each as CSS plus React, Vue and Angular components. The rest of shadcn's 66 components are planned; the docs' Components page shows the status of each.

## Use it in your framework

Not on npm yet. Once `0.1.0` is published:

```bash
npm install bootstrap@6.0.0-alpha.1 shadcn-bootstrap
```

Import Bootstrap's CSS first, then shadcn-bootstrap, once at the app root. Bootstrap 6's JavaScript is ESM and reads `document`, so load it on the client:

| Framework | CSS | Bootstrap JavaScript |
| --- | --- | --- |
| Next.js (App Router) | `app/layout.tsx`: `import "bootstrap/dist/css/bootstrap.min.css"; import "shadcn-bootstrap";` | Client component: `useEffect(() => { import("bootstrap"); }, [])` |
| React (Vite) | `src/main.tsx`: same two imports | `import "bootstrap";` in `src/main.tsx` |
| Vue (Vite) | `src/main.ts`: same two imports | `import "bootstrap";` in `src/main.ts` |
| Nuxt | `nuxt.config.ts`: `css: ["bootstrap/dist/css/bootstrap.min.css", "shadcn-bootstrap"]` | `plugins/bootstrap.client.ts`: `await import("bootstrap")` |
| Angular | `angular.json` `styles`: Bootstrap's CSS, then `node_modules/shadcn-bootstrap/dist/css/shadcn-bootstrap.min.css` | `afterNextRender(() => import("bootstrap"))` in the root component |

Then add components with the CLI (`npx shadcn-bootstrap add button card`) and use them like shadcn/ui. The docs have a full guide per framework, and every example has React, Vue, Angular and HTML tabs.

## Install from the CDN (no build step)

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
| `npm run build` | Builds `dist/css` and validates and builds `dist/registry` |
| `npm run lint` | Stylelint over the Sass sources |
| `npm run docs:dev` | Docs site at http://localhost:4321 |
| `npm run docs:build` | Static docs build in `docs/dist` |

## License

MIT. Includes shadcn/ui's MIT notice; see [LICENSE](LICENSE).
