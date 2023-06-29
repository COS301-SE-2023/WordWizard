import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreRouting } from './core.routing';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CoreShell } from './core.shell';
import { RouteReuseStrategy } from '@angular/router';
// import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SharedAuthModule } from '@word-wizard/app/auth/feature';
import { SocialLoginModule,
  SocialAuthServiceConfig,
  SocialAuthService, 
 } from '@abacritt/angularx-social-login';
 import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
 import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [CoreShell],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    CoreRouting,
    // SharedUiModule,
    NoopAnimationsModule,
    NgxsModule.forRoot([

    ]),
    // SharedAuthModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
          autoLogin: false,
          providers: [
              {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                      '1087444262358-q2vf35q1tko61lrba0vfcpgfvghfjnql.apps.googleusercontent.com'
                  ),
              },
          ],
          onError: (err) => {
              console.error(err);
          },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [CoreShell],
})
export class CoreModule { }
