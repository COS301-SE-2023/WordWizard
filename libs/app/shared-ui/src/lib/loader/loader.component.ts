import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ww-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent  {

  @Input() visible = false;
  @Input() message = "Loading...";

  constructor() { }

}
