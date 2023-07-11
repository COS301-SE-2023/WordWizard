/* eslint-disable @angular-eslint/no-output-native */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'ww-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {

  @Input() modalType = '';
  @Input() title = '';
  @Input() isModalOpen = false;
  @Input() awardIMG! : string;

  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(private modalController: ModalController) {}

  closeModal(){
    this.close.emit(false);
  }

  ngOnInit(): void {
    console.log('modalType', this.modalType);
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
