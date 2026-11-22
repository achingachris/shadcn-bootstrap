import { Directive } from "@angular/core";

/** <input sbInput>. Works with ngModel and reactive forms like any native input. */
@Directive({ selector: "input[sbInput]", host: { class: "form-control", "data-slot": "input" } })
export class SbInput {}
