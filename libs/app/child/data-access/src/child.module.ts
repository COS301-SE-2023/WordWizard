import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ChildState } from './child.state';
import { ChildService } from './child.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ChildState]), HttpClientModule], 


  providers: [ChildService],
})
export class ChildModule {}
