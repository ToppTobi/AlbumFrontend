import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlbumPicture } from './add-album-picture';

describe('AddAlbumPicture', () => {
  let component: AddAlbumPicture;
  let fixture: ComponentFixture<AddAlbumPicture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAlbumPicture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAlbumPicture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
