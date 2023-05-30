import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VocabRequest, PracticeRequest } from './requests/library.requests';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  // constructor() { }
  url = "http://127.0.0.1:8000";

  getVocab(request: VocabRequest){
    console.log(this.url);
  }
}
