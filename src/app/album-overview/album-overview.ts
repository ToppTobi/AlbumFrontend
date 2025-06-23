import { Component } from '@angular/core';
import {CreateAlbumPopupComponent} from '../create-album-popup/create-album-popup';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-album-overview',
  templateUrl: './album-overview.html',
  imports: [
    CreateAlbumPopupComponent,
    NgIf
  ],
  styleUrls: ['./album-overview.css']
})
export class AlbumOverview {
  bilder = ['assets/pictures/tokyo.png', 'assets/pictures/tokyo.png', 'assets/pictures/tokyo.png', 'assets/pictures/tokyo.png'];


  popupVisible = false;

  albumErstellen(album: any) {
    console.log('Neues Album:', album);
    this.popupVisible = false;
  }

}
