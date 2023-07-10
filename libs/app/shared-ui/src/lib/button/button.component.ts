import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ww-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() color!: string;
  @Input() activate!: string;
  @Input() disabled!: boolean;
  @Input() submit!: boolean;
  @Input() border!: string;
  @Output() event = new EventEmitter<void>();

  click() {
    this.event.emit();
  }
}
