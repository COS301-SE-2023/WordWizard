import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ReadingState } from './reading.state';
import { HttpClientModule } from '@angular/common/http';
import { ReadingService } from './reading.service';
import { ChildState, ChildService } from '@word-wizard/app/child/data-access';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ReadingState, ChildState]), HttpClientModule],
  providers: [ReadingService, ChildService]
})
export class ReadingModule { }
