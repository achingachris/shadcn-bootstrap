import { Component, input } from "@angular/core";

/** <sb-alert variant="destructive"> */
@Component({
  selector: "sb-alert",
  host: { class: "alert", role: "alert", "data-slot": "alert", "[class.theme-danger]": "variant() === 'destructive'" },
  template: "<ng-content />",
})
export class SbAlert {
  readonly variant = input<"default" | "destructive">("default");
}

@Component({ selector: "sb-alert-title", host: { class: "alert-title", "data-slot": "alert-title" }, template: "<ng-content />" })
export class SbAlertTitle {}

@Component({ selector: "sb-alert-description", host: { class: "alert-description", "data-slot": "alert-description" }, template: "<ng-content />" })
export class SbAlertDescription {}

export const SbAlertImports = [SbAlert, SbAlertTitle, SbAlertDescription] as const;
