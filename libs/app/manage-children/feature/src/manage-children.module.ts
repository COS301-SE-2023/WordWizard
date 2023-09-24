import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ManageChildrenRouting } from './manage-children.routing';
import { ManageChildrenPage } from './manage-children.page';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { ChildState, ChildService } from '@word-wizard/app/child/data-access';
import { LoadingModule } from '@word-wizard/app/loading/feature';
import { HelpModule } from '@word-wizard/app/help/feature';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ManageChildrenRouting,
    SharedUiModule,
    NgxsModule.forFeature([ChildState]),
    HttpClientModule,
    LoadingModule,
    HelpModule,
  ],
  declarations: [ManageChildrenPage],
  providers: [ChildService],
})
export class ManageChildrenModule {}
