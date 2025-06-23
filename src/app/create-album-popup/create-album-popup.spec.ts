import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlbumPopupComponent } from './create-album-popup';


describe('CreateAlbumPopup', () => {
  let component: CreateAlbumPopupComponent;
  let fixture: ComponentFixture<CreateAlbumPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAlbumPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAlbumPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
