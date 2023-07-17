import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from './child/child.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ChildComponent],
  exports: [ChildComponent],
})
export class ManageChildrenModule {}
