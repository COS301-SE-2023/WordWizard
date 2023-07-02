import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { AddChildState } from './add-child.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([AddChildState])],
})
export class AddChildModule {}
