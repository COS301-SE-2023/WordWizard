/* eslint-disable @angular-eslint/no-output-native */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

import {
  Badge,
  Child,
  Picture,
  Stats
}from './modal.interface'

@Component({
  selector: 'ww-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

  @Input() badge? : Badge;
  @Input() child? : Child;
  @Input() picture? : Picture;
  @Input() stats? : Stats;
  @Input() isModalOpen : boolean = false;

  title : string = "";

  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(private modalController: ModalController) {
    if (this.badge)
    {
      this.title = "Achievement";
    }
    
    if (this.child)
    {
      this.title = this.child.name;
    }

    if (this.picture)
    {
      this.title = "Choose a picture";
    }

    if (this.stats)
    {
      this.title = "Results";
    }
  }

  closeModal(){
    this.close.emit(false);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async openModal(modalType: string) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        modalType,
        title: 'Custom Modal',
        items: ['Item 1', 'Item 2', 'Item 3'],
      },
    });
  
    await modal.present();
  }

}
