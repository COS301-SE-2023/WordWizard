import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LibraryPage } from './library.page';
import { LibraryRouting } from './library.routing';
import { HttpClientModule } from '@angular/common/http';
import { LibraryModule as LibraryUiModule } from '@word-wizard/app/library/ui';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import {
  LibraryState,
  LibraryService,
} from '@word-wizard/app/library/data-access';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { ChildState } from '@word-wizard/app/child/data-access';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryRouting,
    RouterModule,
    LibraryUiModule,
    NgxsModule.forFeature([LibraryState, ChildState]),
    HttpClientModule,
    SharedUiModule,
  ],
  declarations: [LibraryPage],
  providers: [LibraryService],
})
export class LibraryModule {}
