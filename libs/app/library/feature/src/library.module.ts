import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LibraryPage } from './library.page';
import { LibraryRouting } from './library.routing';
import { LibraryModule as LibraryUiModule }  from '@word-wizard/app/library/ui';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryRouting,
    RouterModule,
    LibraryUiModule
  ],
  declarations: [LibraryPage],
})
export class LibraryModule { }
