import { Component, Input } from '@angular/core';
import { HelpService } from '@word-wizard/app/help/data-access';

@Component({
  selector: 'ww-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss'],
})
export class HelpButtonComponent {

  constructor(private helpService: HelpService) {}

  @Input() helpText!: string[];
  @Input() audioSources!: string[];
  show = false;

  help(){
    this.show = true;
    this.helpService.show(this.helpText, this.audioSources);
  }

  close(){
    this.show = false;
  }

}
