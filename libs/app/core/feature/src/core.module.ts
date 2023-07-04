import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreRouting } from './core.routing';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CoreShell } from './core.shell';
import { RouteReuseStrategy } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AuthModule } from '@auth0/auth0-angular';
const redirect_uri = `${window.location.origin}`;

@NgModule({
  declarations: [CoreShell],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    CoreRouting,
    NoopAnimationsModule,
    NgxsModule.forRoot([

    ]),
    AuthModule.forRoot({
      domain: `${process.env['WW_AUTH0_DOMAIN']}`,
      clientId: `${process.env['WW_AUTH0_CLIENT_ID']}`,
      useRefreshTokens: true,
      useRefreshTokensFallback: false,
      authorizationParams: {
        redirect_uri
      }
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [CoreShell],
})
export class CoreModule { }
