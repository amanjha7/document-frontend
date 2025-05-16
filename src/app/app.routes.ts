import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'transform',
    loadChildren: () =>
      import('./features/transform/transform.module').then(m => m.TransformModule)
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./features/create/create.module').then(m => m.CreateModule)
  },
  {
    path: 'image-doctor',
    loadChildren: () =>
      import('./features/image-doctor/image-doctor.module').then(m => m.ImageDoctorModule)
  },
  {
    path: '',
    redirectTo: 'transform',
    pathMatch: 'full'
  }
];
