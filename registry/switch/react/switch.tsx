import * as React from "react";
import { cn } from "@/lib/utils";

const sizes = { sm: "switch-sm", default: "", lg: "switch-lg" } as const;

type SwitchProps = Omit<React.ComponentProps<"input">, "type" | "size"> & {
  size?: keyof typeof sizes;
  /** Called with the new checked state, like shadcn's Switch. */
  onCheckedChange?: (checked: boolean) => void;
};

function Switch({ className, size = "default", onCheckedChange, onChange, ...props }: SwitchProps) {
  return (
    <div data-slot="switch" className={cn("switch", sizes[size], className)}>
      <input
        type="checkbox"
        role="switch"
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.target.checked);
        }}
        {...props}
      />
    </div>
  );
}

export { Switch };
