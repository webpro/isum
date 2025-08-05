# isum example: SSG

[CodeSandbox](https://codesandbox.io/p/sandbox/github/webpro/isum/tree/main/examples/ssg)

Full-circle example including signals (`@preact/signals-core`) and SSG.

## dev

```sh
npm install
```

For development, serve `index.html` statically.

## build

```sh
node build.js
```

This updates `index.html` directly. In practice, you might want to build/copy
into some `dist` folder first, and apply SSG there.

See the [Vite example](../vite) for an example.
