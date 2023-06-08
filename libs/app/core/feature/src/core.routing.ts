import { NgModule } from '@angular/core';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@word-wizard/app/dashboard/feature').then((m) => m.DashboardModule),
  },
  {
    path: 'reading',
    loadChildren: () =>
      import('@word-wizard/app/reading/feature').then((m) => m.ReadingModule),
  },
  {
    path: 'library',
    loadChildren: () =>
      import('@word-wizard/app/library/feature').then((m) => m.LibraryModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('@word-wizard/app/auth/feature').then((m) => m.SignupModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class CoreRouting {}
