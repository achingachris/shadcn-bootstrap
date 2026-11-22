// Turns the registry's HTML examples into component usage for each framework:
//   React / Next.js  <Button variant="outline" size="sm">   (components/ui/*.tsx)
//   Vue              <Button variant="outline" size="sm">   (components/ui/*/*.vue)
//   Angular          <button sbButton variant="outline">    (ui/*.ts)
// Plain HTML projects keep the HTML as written. One HTML source per example means the
// four versions can't drift apart.

export type Framework = "react" | "vue" | "angular";

type Attr = [name: string, value: string | null];
type Node =
  | { type: "text"; value: string }
  | { type: "comment"; value: string }
  | { type: "el"; tag: string; attrs: Attr[]; children: Node[] };

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

// ---------------------------------------------------------------------------
// Parser (for the docs' own, well-formed example markup)
// ---------------------------------------------------------------------------

const TOKEN = /<!--([\s\S]*?)-->|<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)((?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'))?)*)\s*(\/?)>|([^<]+)/g;
const ATTR = /([^\s=>/]+)(?:\s*=\s*("[^"]*"|'[^']*'))?/g;

function parse(html: string): Node[] {
  const root: Node[] = [];
  const stack: { tag: string; children: Node[] }[] = [{ tag: "#root", children: root }];
  const top = () => stack[stack.length - 1].children;
  for (const m of html.matchAll(TOKEN)) {
    const [, comment, closeTag, openTag, rawAttrs, selfClose, text] = m;
    if (comment !== undefined) top().push({ type: "comment", value: comment });
    else if (text !== undefined) top().push({ type: "text", value: text });
    else if (closeTag) {
      while (stack.length > 1 && stack[stack.length - 1].tag !== closeTag) stack.pop();
      if (stack.length > 1) stack.pop();
    } else if (openTag) {
      const attrs: Attr[] = [...(rawAttrs ?? "").matchAll(ATTR)].map((a) => [a[1], a[2] === undefined ? null : a[2].slice(1, -1)]);
      const el: Node = { type: "el", tag: openTag, attrs, children: [] };
      top().push(el);
      if (!VOID.has(openTag.toLowerCase()) && !selfClose) stack.push({ tag: openTag, children: el.children });
    }
  }
  return root;
}

// ---------------------------------------------------------------------------
// Mapping: Bootstrap 6 markup -> shadcn-style component
// ---------------------------------------------------------------------------

interface ComponentInfo {
  module: string;
  /** Angular: attribute directive on the native element, or a custom element. */
  angular: { directive: string } | { element: string };
  angularImport: string;
}

const COMPONENTS: Record<string, ComponentInfo> = {
  Button: { module: "button", angular: { directive: "sbButton" }, angularImport: "SbButton" },
  Badge: { module: "badge", angular: { directive: "sbBadge" }, angularImport: "SbBadge" },
  Card: { module: "card", angular: { element: "sb-card" }, angularImport: "SbCard" },
  CardHeader: { module: "card", angular: { element: "sb-card-header" }, angularImport: "SbCardHeader" },
  CardTitle: { module: "card", angular: { element: "sb-card-title" }, angularImport: "SbCardTitle" },
  CardDescription: { module: "card", angular: { element: "sb-card-description" }, angularImport: "SbCardDescription" },
  CardAction: { module: "card", angular: { element: "sb-card-action" }, angularImport: "SbCardAction" },
  CardContent: { module: "card", angular: { element: "sb-card-content" }, angularImport: "SbCardContent" },
  CardFooter: { module: "card", angular: { element: "sb-card-footer" }, angularImport: "SbCardFooter" },
  Alert: { module: "alert", angular: { element: "sb-alert" }, angularImport: "SbAlert" },
  AlertTitle: { module: "alert", angular: { element: "sb-alert-title" }, angularImport: "SbAlertTitle" },
  AlertDescription: { module: "alert", angular: { element: "sb-alert-description" }, angularImport: "SbAlertDescription" },
  Input: { module: "input", angular: { directive: "sbInput" }, angularImport: "SbInput" },
  Label: { module: "label", angular: { directive: "sbLabel" }, angularImport: "SbLabel" },
  Checkbox: { module: "checkbox", angular: { directive: "sbCheckbox" }, angularImport: "SbCheckbox" },
  Switch: { module: "switch", angular: { element: "sb-switch" }, angularImport: "SbSwitch" },
};

interface Mapped {
  comp: string;
  /** Native element the component renders (used for Angular directives and asChild links). */
  tag: string;
  props: [string, string][];
  attrs: Attr[];
  classes: string[];
  children: Node[];
  asChild: boolean;
  /** Boolean "checked" state passed as a prop (Checkbox, Switch). */
  checked: boolean;
}

const classesOf = (el: Extract<Node, { type: "el" }>) => (el.attrs.find(([n]) => n === "class")?.[1] ?? "").split(/\s+/).filter(Boolean);
const without = (attrs: Attr[], ...names: string[]) => attrs.filter(([n]) => n !== "class" && !names.includes(n));

function map(el: Extract<Node, { type: "el" }>): Mapped | null {
  const cls = classesOf(el);
  const has = (c: string) => cls.includes(c);
  const rest = (consumed: string[]) => cls.filter((c) => !consumed.includes(c));
  const base = (comp: string, consumed: string[], extra: Partial<Mapped> = {}): Mapped => ({
    comp,
    tag: el.tag,
    props: [],
    attrs: without(el.attrs),
    classes: rest(consumed),
    children: el.children,
    asChild: false,
    checked: false,
    ...extra,
  });

  if ((el.tag === "button" || el.tag === "a") && has("btn")) {
    const variant = has("btn-outline") ? "outline" : has("btn-text") ? "ghost" : has("btn-link") ? "link"
      : has("theme-secondary") ? "secondary" : has("theme-danger") ? "destructive" : "default";
    const size = has("btn-icon") ? (has("btn-sm") ? "icon-sm" : has("btn-lg") ? "icon-lg" : "icon")
      : has("btn-sm") ? "sm" : has("btn-lg") ? "lg" : "default";
    const props: [string, string][] = [];
    if (variant !== "default") props.push(["variant", variant]);
    if (size !== "default") props.push(["size", size]);
    return base("Button", ["btn", "btn-solid", "btn-outline", "btn-text", "btn-link", "btn-icon", "btn-sm", "btn-lg", "theme-primary", "theme-secondary", "theme-danger"], {
      props,
      asChild: el.tag === "a",
    });
  }
  if ((el.tag === "span" || el.tag === "a") && has("badge")) {
    const variant = has("badge-outline") ? "outline" : has("theme-secondary") ? "secondary" : has("theme-danger") ? "destructive" : "default";
    return base("Badge", ["badge", "badge-outline", "theme-primary", "theme-secondary", "theme-danger"], {
      props: variant === "default" ? [] : [["variant", variant]],
      asChild: el.tag === "a",
    });
  }
  const simple: [string, string][] = [
    ["card", "Card"], ["card-header", "CardHeader"], ["card-title", "CardTitle"], ["card-description", "CardDescription"],
    ["card-action", "CardAction"], ["card-body", "CardContent"], ["card-footer", "CardFooter"],
    ["alert-title", "AlertTitle"], ["alert-heading", "AlertTitle"], ["alert-description", "AlertDescription"],
  ];
  for (const [c, comp] of simple) if (has(c)) return base(comp, [c]);
  if (has("alert")) {
    const m = base("Alert", ["alert", "theme-danger"], { props: has("theme-danger") ? [["variant", "destructive"]] : [] });
    m.attrs = m.attrs.filter(([n, v]) => !(n === "role" && v === "alert"));
    return m;
  }
  if (el.tag === "input" && has("form-control")) return base("Input", ["form-control"]);
  if (el.tag === "label" && (has("form-label") || cls.length === 0)) return base("Label", ["form-label"]);
  if (el.tag === "input" && has("check")) {
    const checked = el.attrs.some(([n]) => n === "checked");
    return base("Checkbox", ["check"], { attrs: without(el.attrs, "type", "checked"), checked });
  }
  if (has("switch")) {
    const input = el.children.find((c): c is Extract<Node, { type: "el" }> => c.type === "el" && c.tag === "input");
    if (input) {
      const size = has("switch-sm") ? "sm" : has("switch-lg") ? "lg" : null;
      return base("Switch", ["switch", "switch-sm", "switch-lg"], {
        props: size ? [["size", size]] : [],
        attrs: without(input.attrs, "type", "role", "checked"),
        checked: input.attrs.some(([n]) => n === "checked"),
        children: [],
      });
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Serializers
// ---------------------------------------------------------------------------

const JSX_ATTRS: Record<string, string> = {
  class: "className", for: "htmlFor", tabindex: "tabIndex", readonly: "readOnly", autocomplete: "autoComplete",
  autofocus: "autoFocus", maxlength: "maxLength", minlength: "minLength", crossorigin: "crossOrigin",
  colspan: "colSpan", rowspan: "rowSpan", inputmode: "inputMode", spellcheck: "spellCheck",
  "stroke-width": "strokeWidth", "stroke-linecap": "strokeLinecap", "stroke-linejoin": "strokeLinejoin",
  "fill-rule": "fillRule", "clip-rule": "clipRule",
};

function styleObject(css: string): string {
  const entries = css.split(";").map((d) => d.trim()).filter(Boolean).map((d) => {
    const i = d.indexOf(":");
    return `${d.slice(0, i).trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())}: ${JSON.stringify(d.slice(i + 1).trim())}`;
  });
  return `{{ ${entries.join(", ")} }}`;
}

function attrString(attrs: Attr[], fw: Framework | "html", formField = false): string {
  return attrs
    .map(([name, value]) => {
      if (fw !== "react") return value === null ? ` ${name}` : ` ${name}="${value}"`;
      if (name === "style" && value !== null) return ` style=${styleObject(value)}`;
      let n = JSX_ATTRS[name] ?? name;
      if (formField && name === "value") n = "defaultValue";
      if (formField && name === "checked") n = "defaultChecked";
      return value === null ? ` ${n}` : ` ${n}="${value}"`;
    })
    .join("");
}

const classAttr = (classes: string[]): Attr[] => (classes.length ? [["class", classes.join(" ")]] : []);

function serialize(nodes: Node[], fw: Framework, used: Set<string>): string {
  return nodes
    .map((node) => {
      if (node.type === "text") return node.value;
      if (node.type === "comment") return fw === "react" ? `{/*${node.value}*/}` : `<!--${node.value}-->`;
      const m = map(node);
      if (!m) {
        const formField = ["input", "select", "textarea"].includes(node.tag);
        const attrs = attrString(node.attrs, fw, formField);
        const isVoid = VOID.has(node.tag.toLowerCase());
        if (isVoid) return fw === "react" ? `<${node.tag}${attrs} />` : `<${node.tag}${attrs}>`;
        return `<${node.tag}${attrs}>${serialize(node.children, fw, used)}</${node.tag}>`;
      }
      used.add(m.comp);
      return fw === "angular" ? angularElement(m, used) : componentElement(m, fw, used);
    })
    .join("");
}

function componentElement(m: Mapped, fw: "react" | "vue", used: Set<string>): string {
  const props = m.props.map(([k, v]) => ` ${k}="${v}"`).join("");
  const checked = m.checked ? (fw === "react" ? " defaultChecked" : " default-checked") : "";
  const children = serialize(m.children, fw, used);
  if (m.asChild && fw === "react") {
    // <Button asChild><a href="…">…</a></Button>
    const inner = `<${m.tag}${attrString([...classAttr(m.classes), ...m.attrs], fw)}>${children}</${m.tag}>`;
    return `<${m.comp}${props} asChild>${inner}</${m.comp}>`;
  }
  const as = m.asChild ? ` as="${m.tag}"` : "";
  const attrs = attrString([...classAttr(m.classes), ...m.attrs], fw, m.comp === "Input");
  const open = `<${m.comp}${props}${as}${attrs}${checked}`;
  return m.children.length || children.trim() ? `${open}>${children}</${m.comp}>` : `${open} />`;
}

function angularElement(m: Mapped, used: Set<string>): string {
  const info = COMPONENTS[m.comp];
  const props = m.props.map(([k, v]) => ` ${k}="${v}"`).join("");
  const children = serialize(m.children, "angular", used);
  if ("directive" in info.angular) {
    const typeAttr: Attr[] = m.comp === "Checkbox" ? [["type", "checkbox"]] : [];
    const attrs = attrString([...typeAttr, ...classAttr(m.classes), ...m.attrs], "angular");
    const checked = m.checked ? " checked" : "";
    const open = `<${m.tag} ${info.angular.directive}${props}${attrs}${checked}>`;
    return VOID.has(m.tag) ? open : `${open}${children}</${m.tag}>`;
  }
  const tag = info.angular.element;
  if (m.comp === "Switch") {
    // Inner-input attributes become sb-switch inputs.
    const renamed: Attr[] = m.attrs.map(([n, v]) => [n === "id" ? "inputId" : n === "aria-label" ? "ariaLabel" : n, v]);
    const checked = m.checked ? ` [checked]="true"` : "";
    return `<${tag}${props}${attrString([...classAttr(m.classes), ...renamed], "angular")}${checked} />`;
  }
  return `<${tag}${props}${attrString([...classAttr(m.classes), ...m.attrs], "angular")}>${children}</${tag}>`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface FrameworkSnippets {
  react: string;
  vue: string;
  angular: string;
  /** Component names used, e.g. ["Button", "Card", …]. */
  components: string[];
  /** The pieces, for embedding in a larger file. */
  parts: {
    reactImports: string[];
    reactMarkup: string;
    vueImports: string[];
    vueMarkup: string;
    angularImports: string[];
    angularNames: string[];
    angularMarkup: string;
  };
}

function importLines(used: Set<string>, fw: Framework): string[] {
  const byModule = new Map<string, string[]>();
  for (const comp of Object.keys(COMPONENTS)) {
    if (!used.has(comp)) continue;
    const info = COMPONENTS[comp];
    const names = byModule.get(info.module) ?? [];
    names.push(fw === "angular" ? info.angularImport : comp);
    byModule.set(info.module, names);
  }
  return [...byModule].map(([mod, names]) =>
    fw === "angular"
      ? `import { ${names.join(", ")} } from "./ui/${mod}";`
      : `import { ${names.join(", ")} } from "@/components/ui/${mod}";`,
  );
}

const indent = (s: string, n: number) => s.split("\n").map((l) => (l.trim() ? " ".repeat(n) + l : l)).join("\n");

/** Component usage for each framework, with imports. */
export function toFrameworks(html: string): FrameworkSnippets {
  const tree = parse(html.trim());
  const reactUsed = new Set<string>();
  const react = serialize(tree, "react", reactUsed);
  const vueUsed = new Set<string>();
  const vue = serialize(tree, "vue", vueUsed);
  const ngUsed = new Set<string>();
  const angular = serialize(tree, "angular", ngUsed);

  const reactImports = importLines(reactUsed, "react");
  const vueImports = importLines(vueUsed, "vue");
  const ngImports = importLines(ngUsed, "angular");
  const ngNames = Object.keys(COMPONENTS).filter((c) => ngUsed.has(c)).map((c) => COMPONENTS[c].angularImport);

  return {
    react: reactImports.length ? `${reactImports.join("\n")}\n\n${react}` : react,
    vue: vueImports.length
      ? `<script setup lang="ts">\n${vueImports.join("\n")}\n</script>\n\n<template>\n${indent(vue, 2)}\n</template>`
      : `<template>\n${indent(vue, 2)}\n</template>`,
    angular: ngImports.length
      ? `<!-- In the component's .ts file:\n${ngImports.map((l) => `     ${l}`).join("\n")}\n     @Component({ imports: [${ngNames.join(", ")}], … }) -->\n${angular}`
      : angular,
    components: Object.keys(COMPONENTS).filter((c) => reactUsed.has(c)),
    parts: {
      reactImports,
      reactMarkup: react,
      vueImports,
      vueMarkup: vue,
      angularImports: ngImports,
      angularNames: ngNames,
      angularMarkup: angular,
    },
  };
}

/** Just the markup, no imports (for short inline usage like tables). */
export function usageOnly(html: string, fw: Framework): string {
  return serialize(parse(html.trim()), fw, new Set());
}

/** Plain JSX (no component mapping), for snippets that aren't component examples. */
export function htmlToJsx(html: string): string {
  const plain = (nodes: Node[]): string =>
    nodes
      .map((n) => {
        if (n.type === "text") return n.value;
        if (n.type === "comment") return `{/*${n.value}*/}`;
        const attrs = attrString(n.attrs, "react", ["input", "select", "textarea"].includes(n.tag));
        return VOID.has(n.tag.toLowerCase()) ? `<${n.tag}${attrs} />` : `<${n.tag}${attrs}>${plain(n.children)}</${n.tag}>`;
      })
      .join("");
  return plain(parse(html.trim()));
}
