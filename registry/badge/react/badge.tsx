import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "",
  secondary: "theme-secondary",
  destructive: "theme-danger",
  outline: "badge-outline",
} as const;

export type BadgeVariant = keyof typeof variants;

export function badgeVariants({ variant = "default", className }: { variant?: BadgeVariant; className?: string } = {}) {
  return cn("badge", variants[variant], className);
}

type BadgeProps = React.ComponentProps<"span"> & {
  variant?: BadgeVariant;
  /** Render the single child element (e.g. an <a>) with the badge's classes. */
  asChild?: boolean;
};

function Badge({ className, variant, asChild = false, children, ...props }: BadgeProps) {
  const classes = badgeVariants({ variant, className });
  if (asChild && React.isValidElement<{ className?: string }>(children)) {
    return React.cloneElement(children, {
      ...(props as Record<string, unknown>),
      "data-slot": "badge",
      className: cn(classes, children.props.className),
    } as React.Attributes & { className: string });
  }
  return (
    <span data-slot="badge" className={classes} {...props}>
      {children}
    </span>
  );
}

export { Badge };
