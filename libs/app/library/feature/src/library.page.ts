import { Component } from '@angular/core';

@Component({
  selector: 'library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss']
})
export class LibraryPage {
  hasVocab = true;
  hasPractice = true;
}
