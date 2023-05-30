import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LibraryPage } from './library.page';
import { LibraryRouting } from './library.routing';
import { LibraryModule as LibraryUiModule }  from '@word-wizard/app/library/ui';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { LibraryState, LibraryService } from '@word-wizard/app/library/data-access';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryRouting,
    RouterModule,
    LibraryUiModule,
    NgxsModule.forFeature([LibraryState]),
  ],
  declarations: [LibraryPage],
  providers: [LibraryService]
})
export class LibraryModule { }