import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '',
    redirectTo: 'album-overview',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('./album-overview/album-overview').then(m => m.AlbumOverview),
  },
  {
    path: 'album',
    loadComponent: () => import('./album/album').then(m => m.Album),
  },
];

