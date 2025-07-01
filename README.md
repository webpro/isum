# isum

isomorphic [µhtml](https://github.com/WebReflection/uhtml)

Tiny wrapper that imports `uhtml` in the browser and `uhtml/ssr` in Node.js/Bun
for quick & easy client and server-side rendering (SSR/SSG). With a few extra
niceties.

All credits to [Andrea Giammarchi](https://github.com/WebReflection) for
creating this mighty lib.

Example project using isum: [ANSI.tools](https://github.com/webpro/ANSI.tools)

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

Please refer to [the µhtml docs](https://webreflection.github.io/uhtml/) for
details.

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
import initSSR from 'isum';
import { App } from './app.js';

const template = readFileSync('index.html', 'utf-8');

const { document } = initSSR(template);

new App();

writeFileSync('index.html', document.toString());
```

This renders the `<button>` inside `<main>`.

This should scale well due to ESM live bindings. Here's an example
[build script](https://github.com/webpro/ANSI.tools/blob/main/scripts/build.ts).

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
