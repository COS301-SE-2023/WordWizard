import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Login } from './login.page';



@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [ Login ],
  exports: [ Login ]
})
export class LoginModule {

  

}
