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
import { AddChildService } from '@word-wizard/app/add-child/data-access';


@NgModule({
  imports: [
    CommonModule, 
    ChildSettingsRouting, 
    IonicModule, 
    ReactiveFormsModule, 
    SharedUiModule,
    NgxsModule.forFeature([ChildState]),
    HttpClientModule,
  ],
  declarations: [ChildSettingsPage],
  providers: [ChildService, AddChildService],
})
export class ChildSettingsModule {}
