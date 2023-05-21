import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ReadingState } from './reading.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ReadingState])],
  providers: [],
})
export class ReadingModule { }
