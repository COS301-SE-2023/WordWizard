import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { LibraryState } from './library.state';
import { LibraryService } from './library.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([LibraryState]),
    HttpClientModule,
  ],
  providers: [LibraryService],
})
export class ReadingModule {}
