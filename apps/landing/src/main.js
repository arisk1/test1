import appHtml from './app.html?raw';

const app = document.querySelector('#app');

if (!app) {
  throw new Error('App root not found');
}

app.innerHTML = appHtml;

await import('./carousel.js');
