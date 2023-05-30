import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Signup } from './signup.page';
import { AuthRouting } from '../Auth.routing';


@NgModule({
  imports: [ AuthRouting, CommonModule, FormsModule, IonicModule,],
  declarations: [Signup ],
  exports: [Signup ],
  
})
export class SignupModule {}
