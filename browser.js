import { html } from 'uhtml';

export const document = globalThis.document;

export const raw = str => html([str]);

export * from 'uhtml';
