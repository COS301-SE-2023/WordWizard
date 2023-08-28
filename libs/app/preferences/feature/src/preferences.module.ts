import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesRouting } from './preferences.routing';
import { PreferencesPage } from './preferences.page';
import { HeaderModule, ButtonModule } from '@word-wizard/app/shared-ui';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, PreferencesRouting, HeaderModule, ButtonModule, IonicModule, FormsModule],
  declarations: [PreferencesPage],
})
export class PreferencesModule {}
