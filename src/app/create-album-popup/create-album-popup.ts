import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-album-popup',
  templateUrl: './create-album-popup.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./create-album-popup.css']
})
export class CreateAlbumPopupComponent {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  album = {
    titel: '',
    jahr: new Date().getFullYear(),
    beschreibung: ''
  };

  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  closePopup() {
    this.close.emit();
  }

  submitAlbum() {
    const formData = new FormData();
    formData.append('file', this.selectedFile!);
    formData.append('titel', this.album.titel);
    formData.append('jahr', this.album.jahr.toString());
    formData.append('beschreibung', this.album.beschreibung);
    formData.append('userId', '1'); // später dynamisch

    this.http.post('http://localhost:7070/api/albums/upload', formData)
      .subscribe(response => {
        this.create.emit(response);
        this.closePopup();
      });
  }
}
