import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule as ProfileDataAccessModule, ProfileState, ProfilesApi } from '@mp/app/profile/data-access';
// import { ProfileModule as ProfileUiModule } from '@mp/app/profile/ui';
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { NgxsModule } from '@ngxs/store';
import { LibraryPage } from './library.page';
import { LibraryRouting } from './library.routing';
// import { OtherUserUIModule } from '@mp/app/other-user/ui';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryRouting,
    // ProfileUiModule,
    // ProfileDataAccessModule,
    // NgxSkeletonLoaderModule,
    // NgxsModule.forFeature([ProfileState]),
    // OtherUserUIModule,
    RouterModule,
  ],
  declarations: [LibraryPage],
  // providers: [LibrarysApi],
})
export class LibraryModule { }
