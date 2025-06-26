import module from 'node:module';

module.register('./no-css.js', { parentURL: import.meta.url });

export async function load(url, context, next) {
  if (url.endsWith('.css'))
    return { shortCircuit: true, format: 'module', source: '' };
  return next(url, context);
}
