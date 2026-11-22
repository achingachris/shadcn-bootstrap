import { Component, booleanAttribute, input, model } from "@angular/core";

/** <sb-switch inputId="airplane" [(checked)]="airplane" /> */
@Component({
  selector: "sb-switch",
  host: {
    class: "switch",
    "data-slot": "switch",
    "[class.switch-sm]": "size() === 'sm'",
    "[class.switch-lg]": "size() === 'lg'",
  },
  template: `<input
    type="checkbox"
    role="switch"
    [attr.id]="inputId()"
    [attr.name]="name()"
    [attr.aria-label]="ariaLabel()"
    [checked]="checked()"
    [disabled]="disabled()"
    (change)="checked.set($any($event.target).checked)"
  />`,
})
export class SbSwitch {
  readonly checked = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly size = input<"sm" | "default" | "lg">("default");
  /** id for the inner <input>, so <label for> can point at it. */
  readonly inputId = input<string>();
  readonly name = input<string>();
  readonly ariaLabel = input<string>();
}
