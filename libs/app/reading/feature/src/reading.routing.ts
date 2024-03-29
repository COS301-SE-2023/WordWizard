import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadingPage } from './reading.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ReadingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingRouting {}
