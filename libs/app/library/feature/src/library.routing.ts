import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryPage } from './library.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LibraryPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRouting {}
