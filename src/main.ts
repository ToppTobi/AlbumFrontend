import { App } from './app/app';
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080/',
  realm: 'fotoalbum',
  clientId: 'album-client'
});

keycloak.init({
  onLoad: 'check-sso',
  pkceMethod: 'S256',
  checkLoginIframe: false,
  silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
}).then(() => {
  import('@angular/platform-browser').then(({ bootstrapApplication }) => {
    bootstrapApplication(App).catch(err => console.error(err));
  });
});
