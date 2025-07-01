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

## App

This runs in both browsers and runtimes like Node.js:

```ts
import { document, html, render } from 'isum';

export class App {
  constructor() {
    this.render();
  }

  handleClick(event) {
    console.log(event);
  }

  render() {
    const view = html`<button @click=${this.handleClick}>Hello!</button>`;

    render(document.getElementById('app'), view);
  }
}
```

Please refer to [the µhtml docs][4] for details.

## Reactivity with Signals

_Introduced in v1.1.0_

Import the same from `isum/preactive` and get fine-grained reactivity for free:

```ts
import { document, render } from 'isum/preactive';

const count = signal(0);

export function renderApp() {
  render(
    document.body,
    // second argument must be a function
    () =>
      html`<button onclick=${() => count.value++}>
        Clicks: ${count.value}
      </button>`
  );
}
```

This will render the initial values during SSG.

Please refer to the [the µhtml docs][5] for details.

## Client-side

Bootstrap in `index.js`:

```ts
import { App } from './app.ts';

new App();
```

## Browser

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
  const { document } = init(template);
  render();
  writeFileSync(filePath, document.toString());
}
```

This renders the `<button>` inside `<main>`.

This should scale well due to ESM live bindings.

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
          "isum": "https://unpkg.com/isum@1.0.0/browser.js",
          "udomdiff": "https://unpkg.com/udomdiff@1.1.2/min.js",
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

Ignore any CSS imports in JS modules:

```sh
node --import isum/no-css build.js
```

Useful when using e.g. Vite. isum pairs great with Vite.

[1]: https://github.com/WebReflection/uhtml
[2]: https://github.com/WebReflection
[3]: https://github.com/webpro/ANSI.tools
[4]: https://webreflection.github.io/uhtml/
[5]: https://webreflection.github.io/uhtml/#reactivity
