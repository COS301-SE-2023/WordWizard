import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildSettingsRouting } from './child-settings.routing';
import { ChildSettingsPage } from './child-settings.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiModule } from '@word-wizard/app/shared-ui';

@NgModule({
  imports: [
    CommonModule, 
    ChildSettingsRouting, 
    IonicModule, 
    ReactiveFormsModule, 
    SharedUiModule
  ],
  declarations: [ChildSettingsPage],
  exports: [ChildSettingsPage],
})
export class ChildSettingsModule {}
