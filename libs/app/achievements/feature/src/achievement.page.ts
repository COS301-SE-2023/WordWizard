import { Component, OnInit } from '@angular/core';
import { Award, AwardSection } from './achievement.model';
import { AchievementService } from './achievement.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { AuthService } from '@auth0/auth0-angular';
import { 
  SetChild,
  ChildState,
  Child
} from '@word-wizard/app/child/data-access';

@Component({
  selector: 'ww-achievement',
  templateUrl: './achievement.page.html',
  styleUrls: ['./achievement.page.scss'],
})
export class AchievementPage implements OnInit {

  @Select(ChildState.Children) Children$!: Observable<Child[]>; 

  childProfilePictureSrc = 'https://ww-img-bucket.s3.amazonaws.com/Dragon4-testProfile.png';
  
  awards: AwardSection[] = [];

  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;


  constructor(private achievementService: AchievementService, private store: Store) {
    this.currentChild$.subscribe((child) => {
      if (child) {
        console.log('child', child);
      }
    });
  }

  ngOnInit() {
    this.loadAwards();
  }

  loadAwards() {
    // this.achievementService.getAwards().subscribe(
    //   (awards: AwardSection[]) => {
    //     this.awards = awards;
    //   },
    //   (error) => {
    //     console.error('Error loading awards:', error);
    //   }
    // );
  }
}
