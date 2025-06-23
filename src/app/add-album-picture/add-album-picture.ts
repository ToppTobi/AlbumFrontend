import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-album-picture',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-album-picture.html',
  styleUrl: './add-album-picture.css',
  standalone: true
})
export class AddAlbumPicture {
  @Input() albumId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  closePopup() {
    this.close.emit();
  }

  submitAlbum() {
    if (!this.selectedFile) {
      console.error('Kein Bild ausgewählt.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('albumId', this.albumId.toString());
    formData.append('userId', '1');
    this.http.post<any>('http://localhost:7070/api/photos/upload', formData).subscribe({
      next: (res) => {
        this.create.emit(res);
        this.closePopup();
      },
      error: (err) => {
        console.error('Fehler beim Hochladen:', err);
      }
    });
  }

}
