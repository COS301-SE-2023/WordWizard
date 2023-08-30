import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MicrophoneModule } from './microphone/microphone.module';
import { SpeakerModule } from './speaker/speaker.module';
import { InfoModule } from './info';
import { HeaderModule } from './header/header.module';
import { ButtonModule } from './button';
import { ModalModule } from './modal';
import { LoaderModule } from './loader';
import { HelpButtonModule } from './help-button';
import { BurgerMenuComponent } from './burger-menu.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MicrophoneModule,
    SpeakerModule,
    HeaderModule,
    InfoModule,
    ButtonModule,
    LoaderModule,
    HelpButtonModule,
  ],
  exports: [
    MicrophoneModule,
    SpeakerModule,
    InfoModule,
    HeaderModule,
    ButtonModule,
    ModalModule,
    LoaderModule,
    HelpButtonModule,
    BurgerMenuComponent,
  ],
  declarations: [BurgerMenuComponent],
})
export class SharedUiModule {}
