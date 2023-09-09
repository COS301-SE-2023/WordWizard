import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreRouting } from './core.routing';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CoreShell } from './core.shell';
import { RouteReuseStrategy } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingService } from '@word-wizard/app/loading/data-access';
import { LoadingInterceptorService } from '@word-wizard/app/loading/data-access';
import { isPlatform } from '@ionic/angular';

const redirect_uri = isPlatform('android')
  ? `com.umleiten.wordWizard://${process.env['WW_AUTH0_DOMAIN']}/capacitor/com.umleiten.wordWizard/callback`
  : `${window.location.origin}`;

@NgModule({
  declarations: [CoreShell],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    CoreRouting,
    NoopAnimationsModule,
    NgxsModule.forRoot([]),
    AuthModule.forRoot({
      domain: `${process.env['WW_AUTH0_DOMAIN']}`,
      clientId: `${process.env['WW_AUTH0_CLIENT_ID']}`,
      useRefreshTokens: true,
      useRefreshTokensFallback: false,
      authorizationParams: {
        redirect_uri,
      },
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true,}, LoadingService],
  bootstrap: [CoreShell],
})
export class CoreModule {}
