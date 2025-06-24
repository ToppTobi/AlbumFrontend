import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloakInstance = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'fotoalbum',
    clientId: 'album-client'
  });

  init(): Promise<boolean> {
    return this.keycloakInstance.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256'
    });
  }

  login() {
    return this.keycloakInstance.login();
  }

  logout() {
    this.keycloakInstance.logout({ redirectUri: window.location.origin });
  }

  isLoggedIn(): boolean {
    return !!this.keycloakInstance.token;
  }

  getUsername(): string {
    return this.keycloakInstance.tokenParsed?.['preferred_username'] || '';
  }

  getUserId(): string {
    return this.keycloakInstance.tokenParsed?.sub || '';
  }

  getKeycloak() {
    return this.keycloakInstance;
  }
}
