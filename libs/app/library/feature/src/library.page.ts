import { Component } from '@angular/core';

@Component({
  selector: 'library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss']
})
export class LibraryPage {

  hasVocab: boolean = true;
  hasPractice: boolean = true;

  onClick() {
    console.log('click');
    localStorage.setItem('test', 'test');
  }

}
