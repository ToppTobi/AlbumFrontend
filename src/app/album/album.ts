import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor, NgStyle } from '@angular/common';
import { AddAlbumPicture } from '../add-album-picture/add-album-picture';
import keycloak from '../keycloak';
import {routes} from '../app.routes';

@Component({
  selector: 'app-album',
  templateUrl: './album.html',
  styleUrls: ['./album.css'],
  standalone: true,
  imports: [NgIf, NgFor, AddAlbumPicture, NgStyle]
})
export class Album implements OnInit {
  bilder: { id: number; url: string }[] = [];
  popupVisible = false;
  confirmDeleteVisible = false;
  albumId: number = 0;

  isLoggedIn = false;
  username = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = keycloak.authenticated || false;


    if (this.isLoggedIn) {
      this.username = keycloak.tokenParsed?.['preferred_username'] || 'Unbekannt';
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.albumId = +id;
      this.http.get<any[]>(`http://localhost:7070/api/photos/album/${id}`).subscribe(data => {
        this.bilder = data.map(p => ({
          id: p.id,
          url: p.url.startsWith('http') ? p.url : `http://localhost:7070/${p.url}`
        }));
      });
    }
  }

  login() {
    keycloak.login();
  }

  logout() {
    keycloak.logout({ redirectUri: window.location.origin });
  }

  addPicture(picture: any) {
    this.bilder.push({
      id: picture.id,
      url: picture.url.startsWith('http') ? picture.url : `http://localhost:7070/${picture.url}`
    });
    this.popupVisible = false;
  }

  deletePicture(photoId: number, index: number) {
    this.http.delete(`http://localhost:7070/api/photos/${photoId}`).subscribe({
      next: () => {
        this.bilder.splice(index, 1);
      },
      error: err => {
        console.error('Löschen fehlgeschlagen:', err);
      }
    });
  }

  deleteAlbum() {
    this.http.delete(`http://localhost:7070/api/albums/${this.albumId}`).subscribe({
      next: () => {
        this.confirmDeleteVisible = false;
        window.location.href = '/';
      },
      error: err => {
        console.error('Album löschen fehlgeschlagen:', err);
      }
    });
  }


    back() {
      this.router.navigate(['/album-overview']);

  }
}
