import appHtml from './app.html?raw';

const app = document.querySelector('#app');

if (!app) {
  throw new Error('App root not found');
}

app.innerHTML = appHtml;

const appLink = document.querySelector('[data-app-link]');

if (appLink) {
  appLink.setAttribute('href', import.meta.env.VITE_APP_URL || '#');
}

await import('./carousel.js');
