/* eslint-disable @angular-eslint/no-output-native */
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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
export class ModalComponent implements OnInit {

  @Input() badge? : Badge;
  @Input() child? : Child;
  @Input() picture? : Picture;
  @Input() stats? : Stats;
  @Input() isModalOpen = false;

  title = "";

  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(private modalController: ModalController) {
  }
  
  ngOnInit() {
    if (this.badge)
    {
      this.title = "Achievement";
    }
    
    if (this.child)
    {
      // this.title = this.child.username;
      this.title = "Manage Child";
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
