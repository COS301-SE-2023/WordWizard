import { Component } from '@angular/core';

@Component({
  selector: 'ww-core',
  templateUrl: './core.shell.html',
  styleUrls: ['./core.shell.scss']
})
export class CoreShell {
  onClick() {
    console.log('click');
    localStorage.setItem('test', 'test');
  }
}
