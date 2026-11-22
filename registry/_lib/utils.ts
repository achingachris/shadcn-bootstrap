// cn: joins class names, skipping falsy values. Shared by the React and Vue components.
// Install path: lib/utils.ts (written by `shadcn-bootstrap init`).
export type ClassValue = string | number | null | undefined | false | ClassValue[] | { [className: string]: unknown };

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const add = (value: ClassValue) => {
    if (!value) return;
    if (typeof value === "string" || typeof value === "number") out.push(String(value));
    else if (Array.isArray(value)) value.forEach(add);
    else for (const [name, on] of Object.entries(value)) if (on) out.push(name);
  };
  inputs.forEach(add);
  return out.join(" ");
}
