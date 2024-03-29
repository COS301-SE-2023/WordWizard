import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReadingPage } from './reading.page';
import { ReadingRouting } from './reading.routing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import {
  ReadingState,
  ReadingService,
} from '@word-wizard/app/reading/data-access';
import { ReadingSharedUiModule } from '@word-wizard/app/reading/shared-ui';
import { LoadingModule } from '@word-wizard/app/loading/feature';
import { SharedUiModule } from '@word-wizard/app/shared-ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadingRouting,
    RouterModule,
    NgxsModule.forFeature([ReadingState]),
    HttpClientModule,
    ReadingSharedUiModule,
    LoadingModule,
    SharedUiModule,
  ],
  declarations: [ReadingPage],
  providers: [ReadingService],
})
export class ReadingModule {}
