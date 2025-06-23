import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'album-overview',
    pathMatch: 'full',
  },
  {
    path: 'album-overview',
    loadComponent: () =>
      import('./album-overview/album-overview').then(m => m.AlbumOverview),
  },
  {
    path: 'album/:id',
    loadComponent: () =>
      import('./album/album').then(m => m.Album),
  },
];
