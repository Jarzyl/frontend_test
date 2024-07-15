import { Route } from '@angular/router';

// export const routes: Routes = [];

export const routes: Route[] = [
    {path: '', loadComponent: () => import('./components/content/content.component').then(mod => mod.ContentComponent)},
    // ...
  ];
