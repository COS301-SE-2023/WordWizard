import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ReadingState } from './reading.state';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ReadingState]), HttpClientModule],
})
export class ReadingModule { }
