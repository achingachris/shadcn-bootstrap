import { Component } from "@angular/core";

@Component({ selector: "sb-card", host: { class: "card", "data-slot": "card" }, template: "<ng-content />" })
export class SbCard {}

@Component({ selector: "sb-card-header", host: { class: "card-header", "data-slot": "card-header" }, template: "<ng-content />" })
export class SbCardHeader {}

@Component({ selector: "sb-card-title", host: { class: "card-title", "data-slot": "card-title" }, template: "<ng-content />" })
export class SbCardTitle {}

@Component({ selector: "sb-card-description", host: { class: "card-description", "data-slot": "card-description" }, template: "<ng-content />" })
export class SbCardDescription {}

@Component({ selector: "sb-card-action", host: { class: "card-action", "data-slot": "card-action" }, template: "<ng-content />" })
export class SbCardAction {}

@Component({ selector: "sb-card-content", host: { class: "card-body", "data-slot": "card-content" }, template: "<ng-content />" })
export class SbCardContent {}

@Component({ selector: "sb-card-footer", host: { class: "card-footer", "data-slot": "card-footer" }, template: "<ng-content />" })
export class SbCardFooter {}

export const SbCardImports = [SbCard, SbCardHeader, SbCardTitle, SbCardDescription, SbCardAction, SbCardContent, SbCardFooter] as const;
