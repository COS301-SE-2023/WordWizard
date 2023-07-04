import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildSettingsRouting } from './child-settings.routing';
import { ChildSettingsPage } from './child-settings.page';

@NgModule({
  imports: [CommonModule, ChildSettingsRouting],
  declarations: [ChildSettingsPage],
  exports: [ChildSettingsPage],
})
export class ChildSettingsModule {}
