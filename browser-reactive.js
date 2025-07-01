import { html } from 'uhtml/reactive';

export const document = globalThis.document;

export const raw = str => html([str]);

export * from 'uhtml/reactive';
