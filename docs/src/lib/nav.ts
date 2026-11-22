import { components } from "./catalog";

export interface NavItem {
  title: string;
  href: string;
  status?: string;
}

export const gettingStarted: NavItem[] = [
  { title: "Introduction", href: "/docs/" },
  { title: "Installation", href: "/docs/installation/" },
  { title: "Theming", href: "/docs/theming/" },
  { title: "Dark mode", href: "/docs/dark-mode/" },
  { title: "CLI", href: "/docs/cli/" },
  { title: "Theme generator", href: "/themes/" },
];

export const frameworkNav: NavItem[] = [
  { title: "Next.js", href: "/docs/frameworks/next/" },
  { title: "React", href: "/docs/frameworks/react/" },
  { title: "Vue", href: "/docs/frameworks/vue/" },
  { title: "Angular", href: "/docs/frameworks/angular/" },
];

export const componentNav: NavItem[] = [
  { title: "Overview", href: "/docs/components/" },
  ...components.map((c) => ({ title: c.title, href: `/docs/components/${c.name}/`, status: c.status })),
];

export const allPages: NavItem[] = [...gettingStarted, ...frameworkNav, ...componentNav];
