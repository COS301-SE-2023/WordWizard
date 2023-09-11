import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreRouting } from './core.routing';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CoreShell } from './core.shell';
import { RouteReuseStrategy } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AuthModule, AuthConfig } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingService } from '@word-wizard/app/loading/data-access';
import { LoadingInterceptorService } from '@word-wizard/app/loading/data-access';
import { domain, clientId, callbackUri } from './auth.config';

const config: AuthConfig = {
  domain,
  clientId,
  authorizationParams: {
    redirect_uri: callbackUri,
  },
  useRefreshTokens: true,
  useRefreshTokensFallback: false,
};

@NgModule({
  declarations: [CoreShell],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    CoreRouting,
    NoopAnimationsModule,
    NgxsModule.forRoot([]),
    AuthModule.forRoot(config),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true,}, LoadingService],
  bootstrap: [CoreShell],
})
export class CoreModule {}
