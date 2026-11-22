import { cn } from "@/lib/utils";

export { default as Button } from "./Button.vue";

const variants = {
  default: "btn-solid theme-primary",
  secondary: "btn-solid theme-secondary",
  destructive: "btn-solid theme-danger",
  outline: "btn-outline",
  ghost: "btn-text",
  link: "btn-link",
} as const;

const sizes = {
  default: "",
  sm: "btn-sm",
  lg: "btn-lg",
  icon: "btn-icon",
  "icon-sm": "btn-icon btn-sm",
  "icon-lg": "btn-icon btn-lg",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonVariants({
  variant = "default",
  size = "default",
  class: className,
}: { variant?: ButtonVariant; size?: ButtonSize; class?: string } = {}) {
  return cn("btn", variants[variant], sizes[size], className);
}
