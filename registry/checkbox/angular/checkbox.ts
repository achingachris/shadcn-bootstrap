import { Directive } from "@angular/core";

/** <input type="checkbox" sbCheckbox>. Works with ngModel and reactive forms like any native checkbox. */
@Directive({ selector: "input[type=checkbox][sbCheckbox]", host: { class: "check", "data-slot": "checkbox" } })
export class SbCheckbox {}
