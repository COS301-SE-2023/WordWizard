import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreRouting } from './core.routing';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CoreShell } from './core.shell';
import { RouteReuseStrategy } from '@angular/router';
import { SharedUiModule } from '@word-wizard/app/shared-ui';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [CoreShell],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    CoreRouting,
    SharedUiModule,
    NoopAnimationsModule,
    NgxsModule.forRoot([

    ]),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [CoreShell],
})
export class CoreModule {}
