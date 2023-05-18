import { Component } from '@angular/core';

@Component({
  selector: 'library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss']
})
export class LibraryPage {
  onClick() {
    console.log('click');
    localStorage.setItem('test', 'test');
  }
}
