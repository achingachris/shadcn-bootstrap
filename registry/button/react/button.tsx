import * as React from "react";
import { cn } from "@/lib/utils";

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
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn("btn", variants[variant], sizes[size], className);
}

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render the single child element (e.g. an <a>) with the button's classes instead of a <button>. */
  asChild?: boolean;
};

function Button({ className, variant, size, asChild = false, children, ...props }: ButtonProps) {
  const classes = buttonVariants({ variant, size, className });
  if (asChild && React.isValidElement<{ className?: string }>(children)) {
    return React.cloneElement(children, {
      ...(props as Record<string, unknown>),
      "data-slot": "button",
      className: cn(classes, children.props.className),
    } as React.Attributes & { className: string });
  }
  return (
    <button data-slot="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export { Button };
