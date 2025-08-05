# isum

isomorphic [µhtml][1]

Tiny wrapper that imports `uhtml` in the browser and `uhtml/ssr` in Node.js/Bun
for quick & easy client and server-side rendering (SSR/SSG). With a few extra
niceties.

All credits to [Andrea Giammarchi][2] for creating this mighty lib.

Example project using isum: [ANSI.tools][3]

## The Main Idea™

- Plain and web standards-based JS library, i.e. not a (meta) framework
- Use `render` and `html` to render template literals
- Optional: use fine-grained reactivity with `isum/preactive`

Use the provided `document` of `isum` and Vite (or something else that
builds/bundles) and get SSG for free.

Import the same from `isum/preactive` for fine-grained reactivity:

```ts
import { document, render, signal } from 'isum/preactive';

const count = signal(0);

function App {
  return () => html`<button onclick=${() => count.value++}>Clicks: ${count.value}</button>`;
}

function renderApp() {
  render(document.getElementById("app"), App());
}
```

This runs in both browsers and runtimes like Node.js.

Please refer to [the µhtml docs][4] for details.

## Setup

Bootstrap in `index.js`:

```ts
import { renderApp } from './app.js';

renderApp();
```

Initial template/container `index.html`:

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <main id="app"></main>
    <script type="module" src="index.js"></script>
  </body>
</html>
```

## SSG

Read template, render application, write result:

```ts
import { readFileSync, writeFileSync } from 'node:fs';
import initSSR from 'isum'; // must import same as in rest of app (e.g. 'isum/preactive')
import { renderApp } from './app.js';

const pages = {
  'index.html': () => renderApp()
};

for (const [filePath, render] of Object.entries(pages)) {
  const template = readFileSync(filePath, 'utf-8');
  const { document } = initSSR(template);
  render();
  writeFileSync(filePath, document.toString());
}
```

This renders the `<button>` inside `<main>` into `index.html`.

## Look ma, no bundler!

Run the app in the browser without a build step:

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="styles.css" />
    <script type="importmap">
      {
        "imports": {
          "isum": "https://unpkg.com/isum@1.1.0",
          "uhtml": "https://unpkg.com/uhtml@4.7.1/keyed.js"
        }
      }
    </script>
  </head>
  <body>
    <main id="app"></main>
    <script type="module" src="index.js"></script>
  </body>
</html>
```

## CSS imports?

Ignore CSS imports in JS modules during SSG:

```sh
node --import isum/no-css build.js
```

Useful when using e.g. Vite. isum pairs great with Vite.

## Examples

- Bare: [./examples/bare/][5] → [CodeSandbox][6]
- SSG: [./examples/ssg/][7] → [CodeSandbox][8]
- Vite: [./examples/vite/][9] → [CodeSandbox][10]

[1]: https://github.com/WebReflection/uhtml
[2]: https://github.com/WebReflection
[3]: https://github.com/webpro/ANSI.tools
[4]: https://webreflection.github.io/uhtml/
[5]: ./examples/bare
[6]: https://codesandbox.io/p/sandbox/github/webpro/isum/tree/main/examples/bare
[7]: ./examples/ssg
[8]: https://codesandbox.io/p/sandbox/github/webpro/isum/tree/main/examples/ssg
[9]: ./examples/vite
[10]:
  https://codesandbox.io/p/sandbox/github/webpro/isum/tree/main/examples/vite
