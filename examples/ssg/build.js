import { readFileSync, writeFileSync } from 'node:fs';
import initSSR from 'isum/preactive';
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
