import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CreateAlbumPopupComponent } from '../create-album-popup/create-album-popup';

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
  albumErstellen(album: any) {
    this.alben.push(album);
    this.popupVisible = false;
  }

  gotoAlbum(albumId: number) {
    this.router.navigate(['/album', albumId]);
  }
}
