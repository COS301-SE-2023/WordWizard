import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@word-wizard/app/dashboard/feature').then((m) => m.DashboardModule),
  },
  {
    path:'',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'reading',
    loadChildren: () =>
      import('@word-wizard/app/reading/feature').then((m) => m.ReadingModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'library',
    loadChildren: () =>
      import('@word-wizard/app/library/feature').then((m) => m.LibraryModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'stage',
    loadChildren: () =>
      import('@word-wizard/app/stage/feature').then((m) => m.StageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'add-child',
    loadChildren: () =>
      import('@word-wizard/app/add-child/feature').then((m) => m.AddChildModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'manage-children',
    loadChildren: () =>
      import('@word-wizard/app/manage-children/feature').then((m) => m.ManageChildrenModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('@word-wizard/app/welcome/feature').then((m) => m.WelcomeModule),
  },
  {
    path: 'achievements',
    loadChildren: () =>
      import('@word-wizard/app/achievements/feature').then((m) => m.AchievementModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('@word-wizard/app/child-settings/feature').then((m) => m.ChildSettingsModule),
  },
  {
    path: 'child-statistics',
    loadChildren: () =>
      import('@word-wizard/app/child-statistics/feature').then((m) => m.ChildStatisticsModule)
    // canActivate: [AuthGuard],
  },
  {
    path: 'view-child',
    loadChildren: () =>
      import('@word-wizard/app/view-child/feature').then((m) => m.ViewChildModule),
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class CoreRouting {}
