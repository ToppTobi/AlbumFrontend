import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080/',
  realm: 'fotoalbum',
  clientId: 'album-client',
});

export function initializeKeycloak(): Promise<Keycloak> {
  return new Promise((resolve, reject) => {
    keycloak
      .init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        console.log('[Keycloak]', authenticated ? 'authenticated' : 'not authenticated');
        resolve(keycloak);
      })
      .catch((error) => {
        console.error('Keycloak init failed', error);
        reject(error);
      });
  });
}

export { keycloak };
