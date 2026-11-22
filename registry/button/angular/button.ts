import { Directive, computed, input } from "@angular/core";

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

export function buttonVariants({ variant = "default", size = "default" }: { variant?: ButtonVariant; size?: ButtonSize } = {}) {
  return ["btn", variants[variant], sizes[size]].filter(Boolean).join(" ");
}

/** <button sbButton variant="outline" size="sm"> or <a sbButton href="…"> */
@Directive({
  selector: "button[sbButton], a[sbButton]",
  host: { "data-slot": "button", "[class]": "classes()" },
})
export class SbButton {
  readonly variant = input<ButtonVariant>("default");
  readonly size = input<ButtonSize>("default");
  protected readonly classes = computed(() => buttonVariants({ variant: this.variant(), size: this.size() }));
}
