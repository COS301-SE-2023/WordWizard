import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesService } from './preferences.service';
import { NgxsModule } from '@ngxs/store';
import { ChildState } from '@word-wizard/app/child/data-access';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ChildState])],
  providers: [PreferencesService],
})
export class AppPreferencesDataAccessModule {}
