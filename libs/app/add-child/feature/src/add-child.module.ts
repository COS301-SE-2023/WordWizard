import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddChildRouting } from './add-child.routing';
import { AddChildPage } from './add-child.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AddChildRouting,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [AddChildPage],
})
export class AddChildModule {}
