import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildSettingsRouting } from './child-settings.routing';
import { ChildSettingsPage } from './child-settings.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { ChildState, ChildService } from '@word-wizard/app/child/data-access';
import { ChildSettingsService } from '@word-wizard/app/child-settings/data-access';
import { AddChildService } from '@word-wizard/app/add-child/data-access';
import { LoadingModule } from '@word-wizard/app/loading/feature';

@NgModule({
  imports: [
    CommonModule,
    ChildSettingsRouting,
    IonicModule,
    ReactiveFormsModule,
    SharedUiModule,
    NgxsModule.forFeature([ChildState]),
    HttpClientModule,
    LoadingModule,
  ],
  declarations: [ChildSettingsPage],
  providers: [ChildService, AddChildService, ChildSettingsService],
})
export class ChildSettingsModule {}
