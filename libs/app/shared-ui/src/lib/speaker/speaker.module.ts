import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SpeakerComponent } from './speaker.component';
import { SpeakerService } from './speaker.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [SpeakerComponent],
  exports: [SpeakerComponent],
  providers: [SpeakerService],
})
export class SpeakerModule {}
