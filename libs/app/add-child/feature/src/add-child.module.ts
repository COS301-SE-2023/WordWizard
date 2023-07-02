import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddChildRouting } from './add-child.routing';
import { AddChildPage } from './add-child.page';

@NgModule({
  imports: [
    CommonModule,
    AddChildRouting
  ],
  declarations: [AddChildPage],
})
export class AddChildModule {}
