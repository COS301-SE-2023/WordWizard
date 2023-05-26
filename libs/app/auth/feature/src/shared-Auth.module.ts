import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialLoginModule,
    SocialAuthServiceConfig,
    SocialAuthService, 
   } from '@abacritt/angularx-social-login';
 import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
 import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, SocialLoginModule, GoogleSigninButtonModule ],
  declarations: [],
  exports: [],
  providers: [
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
})
export class SharedAuthModule {

    constructor() {
        console.log("SharedAuthModule constructor");
    }

}
