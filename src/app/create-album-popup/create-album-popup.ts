import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-album-popup',
  templateUrl: './create-album-popup.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./create-album-popup.css']
})
export class CreateAlbumPopupComponent {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  album = {
    bild: '',
    titel: '',
    jahr: new Date().getFullYear(),
    beschreibung: ''
  };

  closePopup() {
    this.close.emit();
  }

  submitAlbum() {
    this.create.emit(this.album);
    this.closePopup();
  }
}
