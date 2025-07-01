import { html } from 'uhtml/preactive';

export const document = globalThis.document;

export const raw = str => html([str]);

export * from 'uhtml/preactive';
