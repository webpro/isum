import { document, html, render, signal } from 'isum/preactive';

const count = signal(0);

export function App() {
  function handleClick() {
    count.value++;
  }

  return () => html`<button @click=${handleClick}>Hello!</button> ${count.value}`;
}

export function renderApp() {
  render(document.getElementById("app"), App());
}
