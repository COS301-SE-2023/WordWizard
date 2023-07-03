import { Component } from '@angular/core';
// import { SocialLoginModule,
//    SocialAuthServiceConfig,
//    SocialAuthService, 
//   } from '@abacritt/angularx-social-login';
// import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
// import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';


@Component({
  selector: 'ww-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     .then((user: SocialUser) => {
  //       // Handle the signed-in user
  //     })
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  //     .catch((error: any) => {
  //       // Handle error
  //     });
  // }

  // constructor(private socialAuthService: SocialAuthService) {}

	ngOnInit() {

    console.log("signup page%$$$$$$$$$$$$$$$$");

		// this.socialAuthService.authState
		// .subscribe((socialUser) => {
		// 		console.log(socialUser);
		// 		// const kawaUser: KawaUser = {
		// 		// 	//id will be assigned by loginClient , it will match our user id in User database
		// 		// 	_id: "",
		// 		// 	firstName: socialUser.firstName,
		// 		// 	lastName: socialUser.lastName,
		// 		// 	token: socialUser.idToken,
		// 		// 	username: socialUser.email,
		// 		// 	googleSub: socialUser.id,
		// 		// 	profileImage: socialUser.photoUrl,
		// 		// }
		// 	})
	}
  

}
