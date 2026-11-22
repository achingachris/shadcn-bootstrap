import { Directive, computed, input } from "@angular/core";

const variants = {
  default: "",
  secondary: "theme-secondary",
  destructive: "theme-danger",
  outline: "badge-outline",
} as const;

export type BadgeVariant = keyof typeof variants;

/** <span sbBadge variant="secondary"> or <a sbBadge href="…"> */
@Directive({
  selector: "span[sbBadge], a[sbBadge]",
  host: { "data-slot": "badge", "[class]": "classes()" },
})
export class SbBadge {
  readonly variant = input<BadgeVariant>("default");
  protected readonly classes = computed(() => ["badge", variants[this.variant()]].filter(Boolean).join(" "));
}
