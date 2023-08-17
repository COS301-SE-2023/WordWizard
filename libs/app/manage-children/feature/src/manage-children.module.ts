import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ManageChildrenRouting } from './manage-children.routing';
import { ManageChildrenPage } from './manage-children.page';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { ChildState, ChildService } from '@word-wizard/app/child/data-access';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { LoadingModule } from '@word-wizard/app/loading/feature';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ManageChildrenRouting,
    SharedUiModule,
    NgxsModule.forFeature([ChildState]),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: [`${process.env['WW_AUTH0_DOMAIN']}`],
        disallowedRoutes: [`${process.env['WW_AUTH0_DOMAIN']}/api/v2/`],
      },
    }),
    LoadingModule,
  ],
  declarations: [ManageChildrenPage],
  providers: [ChildService, JwtHelperService],
})
export class ManageChildrenModule {}
