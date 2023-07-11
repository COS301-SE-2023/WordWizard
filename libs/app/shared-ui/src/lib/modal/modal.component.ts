import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ww-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {

  @Input() modalType: string = '';
  @Input() title: string = '';
  @Input() items: string[] = [];
  @Input() isModalOpen: boolean = false;

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    
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
