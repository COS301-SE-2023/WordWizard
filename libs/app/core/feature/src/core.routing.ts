import { NgModule } from '@angular/core';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
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
    path: 'stage',
    loadChildren: () =>
      import('@word-wizard/app/stage/feature').then((m) => m.StageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('@word-wizard/app/welcome/feature').then((m) => m.WelcomeModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class CoreRouting {}
