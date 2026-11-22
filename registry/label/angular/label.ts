import { Directive } from "@angular/core";

/** <label sbLabel for="email"> */
@Directive({ selector: "label[sbLabel]", host: { class: "form-label", "data-slot": "label" } })
export class SbLabel {}
