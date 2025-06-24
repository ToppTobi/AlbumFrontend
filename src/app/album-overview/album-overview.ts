import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CreateAlbumPopupComponent } from '../create-album-popup/create-album-popup';
import keycloak from '../keycloak';

@Component({
  selector: 'app-album-overview',
  templateUrl: './album-overview.html',
  styleUrls: ['./album-overview.css'],
  standalone: true,
  imports: [NgIf, NgForOf, CreateAlbumPopupComponent]
})
export class AlbumOverview {
  alben: any[] = [];
  popupVisible = false;
  isLoggedIn = false;
  username = '';
  userId: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  async ngOnInit() {
    this.isLoggedIn = keycloak.authenticated || false;

    if (this.isLoggedIn) {
      const tokenParsed = keycloak.tokenParsed;

      this.username = tokenParsed?.['preferred_username'] || 'Unbekannt';
      this.userId = tokenParsed?.['sub'] || null;

      if (this.userId) {
        this.http
          .get<any[]>('http://localhost:7070/api/albums/user')
          .subscribe(albums => this.alben = albums);
      }
    }
  }


  loadUserAlbums() {
    this.http
      .get<any[]>('http://localhost:7070/api/albums/user')
      .subscribe(albums => this.alben = albums);
  }

  login() {
    keycloak.login();
  }

  logout() {
    keycloak.logout({ redirectUri: window.location.origin });
  }

  albumErstellen(album: any) {
    this.alben.push(album);
    this.popupVisible = false;
  }

  gotoAlbum(albumId: number) {
    this.router.navigate(['/album', albumId]);
  }
}
