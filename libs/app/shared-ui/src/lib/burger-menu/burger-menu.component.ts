import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CoreService } from '@word-wizard/app/core/data-access';

@Component({
  selector: 'ww-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss'],
})
export class BurgerMenuComponent {
  @Input() volumeChanger = true;
  @Input() fontChanger = false;
  @Input() help = true;

  @Input() helpText!: string[];
  @Input() audioSources!: string[];

  @Output() settingsClick = new EventEmitter();

  open = false;
  audioLevel: number;

  constructor(private coreService: CoreService) {
    this.audioLevel = coreService.getVolume();
  }

  toggleMenu() {
    if (this.open) {
      this.open = false;
    } else {
      this.open = true;
    }
  }

  toggleBackgroundMusic() {
    if (this.audioLevel === 6) this.audioLevel = 3;
    else if (this.audioLevel === 3) this.audioLevel = 0;
    else if (this.audioLevel === 0) this.audioLevel = 6;
    localStorage.setItem('volume', `0.0${this.audioLevel.toString()}`);
    this.coreService.volumeChange(this.audioLevel / 100);
  }

  fontChange() {
    this.settingsClick.emit();
  }
}
