import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { StageState } from './stage.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([StageState]), HttpClientModule],
  providers: []
})
export class StageModule { }
