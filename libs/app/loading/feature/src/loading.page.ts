import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@word-wizard/app/loading/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'ww-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {
  loading$!: Observable<boolean>;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loading$ = this.loadingService.loading$;
  }
}
