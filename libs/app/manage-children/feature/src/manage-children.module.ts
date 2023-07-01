import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ManageChildrenRouting } from './manage-children.routing';
import { ManageChildrenPage } from './manage-children.page';

@NgModule({
  imports: [CommonModule, IonicModule,ManageChildrenRouting],
  declarations: [ManageChildrenPage],
})
export class ManageChildrenModule {}
