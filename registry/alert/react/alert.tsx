import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "",
  destructive: "theme-danger",
} as const;

export type AlertVariant = keyof typeof variants;

function Alert({ className, variant = "default", ...props }: React.ComponentProps<"div"> & { variant?: AlertVariant }) {
  return <div data-slot="alert" role="alert" className={cn("alert", variants[variant], className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("alert-title", className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn("alert-description", className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription };
