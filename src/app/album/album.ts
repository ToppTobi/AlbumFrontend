import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {AddAlbumPicture} from '../add-album-picture/add-album-picture';

@Component({
  selector: 'app-album',
  imports: [
    AddAlbumPicture,
    NgIf,
    AddAlbumPicture
  ],
  templateUrl: './album.html',
  styleUrl: './album.css'
})
export class Album {
  bilder = ['assets/pictures/tokyo.png', 'assets/pictures/tokyo.png', 'assets/pictures/tokyo.png', 'assets/pictures/tokyo.png'];


  popupVisible = false;

  addPicture(picture: any) {
    console.log('Neues Bild hinzufügen:', picture);
    this.popupVisible = false;
  }
}
