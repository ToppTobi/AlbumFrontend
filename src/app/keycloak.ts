import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'fotoalbum',
  clientId: 'album-client',
});

export default keycloak;
