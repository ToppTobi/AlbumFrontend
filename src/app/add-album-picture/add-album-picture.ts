import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-album-picture',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-album-picture.html',
  styleUrl: './add-album-picture.css'
})
export class AddAlbumPicture {
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
