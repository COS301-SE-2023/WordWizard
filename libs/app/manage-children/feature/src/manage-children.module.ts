import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ManageChildrenRouting } from './manage-children.routing';
import { ManageChildrenPage } from './manage-children.page';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { ChildState, ChildService } from '@word-wizard/app/child/data-access';

@NgModule({
  imports: [
    CommonModule, 
    IonicModule,
    ManageChildrenRouting, 
    SharedUiModule,
    NgxsModule.forFeature([ChildState]),
    HttpClientModule
  ],
  declarations: [ManageChildrenPage],
  providers: [ChildService]
})
export class ManageChildrenModule {

}
