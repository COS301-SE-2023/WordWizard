import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesRouting } from './preferences.routing';
import { PreferencesPage } from './preferences.page';

@NgModule({
  imports: [CommonModule, PreferencesRouting],
  declarations: [PreferencesPage],
})
export class PreferencesModule {}
