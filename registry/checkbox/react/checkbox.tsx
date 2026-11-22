import * as React from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = Omit<React.ComponentProps<"input">, "type"> & {
  /** Called with the new checked state, like shadcn's Checkbox. */
  onCheckedChange?: (checked: boolean) => void;
  /** Shows the "mixed" state. */
  indeterminate?: boolean;
};

function Checkbox({ className, onCheckedChange, onChange, indeterminate = false, ref, ...props }: CheckboxProps) {
  const inner = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => inner.current as HTMLInputElement);
  React.useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={inner}
      type="checkbox"
      data-slot="checkbox"
      className={cn("check", className)}
      onChange={(event) => {
        onChange?.(event);
        onCheckedChange?.(event.target.checked);
      }}
      {...props}
    />
  );
}

export { Checkbox };
