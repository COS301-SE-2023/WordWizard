import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChildGuard } from './child.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@word-wizard/app/dashboard/feature').then(
        (m) => m.DashboardModule,
      ),
    canActivate: [AuthGuard, ChildGuard],
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'reading',
    loadChildren: () =>
      import('@word-wizard/app/reading/feature').then((m) => m.ReadingModule),
    canActivate: [AuthGuard, ChildGuard],
  },
  {
    path: 'library',
    loadChildren: () =>
      import('@word-wizard/app/library/feature').then((m) => m.LibraryModule),
    canActivate: [AuthGuard, ChildGuard],
  },
  {
    path: 'stage',
    loadChildren: () =>
      import('@word-wizard/app/stage/feature').then((m) => m.StageModule),
    canActivate: [AuthGuard, ChildGuard],
  },
  {
    path: 'add-child',
    loadChildren: () =>
      import('@word-wizard/app/add-child/feature').then(
        (m) => m.AddChildModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'manage-children',
    loadChildren: () =>
      import('@word-wizard/app/manage-children/feature').then(
        (m) => m.ManageChildrenModule,
      ),
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
      import('@word-wizard/app/achievements/feature').then(
        (m) => m.AchievementModule,
      ),
    canActivate: [AuthGuard, ChildGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('@word-wizard/app/child-settings/feature').then(
        (m) => m.ChildSettingsModule,
      ),
    canActivate: [AuthGuard, ChildGuard],
  },
  {
    path: 'loading',
    loadChildren: () =>
      import('@word-wizard/app/loading/feature').then((m) => m.LoadingModule),
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('@word-wizard/app/splash/feature').then((m) => m.SplashModule),
  },
  {
    path: 'child-statistics',
    loadChildren: () =>
      import('@word-wizard/app/child-statistics/feature').then(
        (m) => m.ChildStatisticsModule,
      ),
    canActivate: [AuthGuard, ChildGuard],
  },
  {
    path: 'view-child',
    loadChildren: () =>
      import('@word-wizard/app/view-child/feature').then(
        (m) => m.ViewChildModule,
      ),
    canActivate: [AuthGuard, ChildGuard],
  },
  {
    path: 'preferences',
    loadChildren: () =>
      import('@word-wizard/app/preferences/feature').then(
        (m) => m.PreferencesModule,
      ),
    canActivate: [AuthGuard, ChildGuard],
  },
  {
    path: 'user-agreement',
    loadChildren: () =>
      import('@word-wizard/app/user-agreement/feature').then(
        (m) => m.UserAgreementModule,
      ),
  },
  {
    path: 'password',
    loadChildren: () =>
      import('@word-wizard/app/password/feature').then((m) => m.PasswordModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('@word-wizard/app/sign-up/feature').then((m) => m.SignUpModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@word-wizard/app/login/feature').then((m) => m.LoginModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('@word-wizard/app/forgot-password/feature').then(
        (m) => m.ForgotPasswordModule,
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class CoreRouting {
  // constructor(private auth: AuthService, private router: Router) {
  //   this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
  //     if (isAuthenticated) this.router.navigate(['/manage-children']);
  //     else this.router.navigate(['/welcome']);
  //   });
  // }
}
