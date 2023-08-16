import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { StageState } from './stage.state';
import { StageService } from './stage.service';
import { ChildService } from '@word-wizard/app/child/data-access';
@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([StageState]),
    HttpClientModule,
  ],
  providers: [StageService, ChildService],
})
export class StageModule {}
