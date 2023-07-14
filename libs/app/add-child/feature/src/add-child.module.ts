import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddChildRouting } from './add-child.routing';
import { AddChildPage } from './add-child.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AddChildService } from '@word-wizard/app/add-child/data-access';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AddChildRouting,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [AddChildPage],
  providers: [AddChildService]
})
export class AddChildModule {}
