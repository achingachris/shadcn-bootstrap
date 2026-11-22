import { cn } from "@/lib/utils";

export { default as Badge } from "./Badge.vue";

const variants = {
  default: "",
  secondary: "theme-secondary",
  destructive: "theme-danger",
  outline: "badge-outline",
} as const;

export type BadgeVariant = keyof typeof variants;

export function badgeVariants({ variant = "default", class: className }: { variant?: BadgeVariant; class?: string } = {}) {
  return cn("badge", variants[variant], className);
}
