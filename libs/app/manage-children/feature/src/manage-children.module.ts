import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ManageChildrenRouting } from './manage-children.routing';
import { ManageChildrenPage } from './manage-children.page';
import { SharedUiModule } from '@word-wizard/app/shared-ui';

@NgModule({
  imports: [CommonModule, IonicModule,ManageChildrenRouting, SharedUiModule],
  declarations: [ManageChildrenPage],
})
export class ManageChildrenModule {

}
