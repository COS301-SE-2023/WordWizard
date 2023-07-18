import { Component } from '@angular/core';
// import { Award, AwardSection } from './achievement.model';
// import { AchievementService } from './achievement.service';
import { Award, AwardSection, AchievementService } from '@word-wizard/app/achievements/data-access';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
// import { AuthService } from '@auth0/auth0-angular';
import { 
  SetChild,
  ChildState,
  Child
} from '@word-wizard/app/child/data-access';

export interface achievement {
  levelName:string;

}

@Component({
  selector: 'ww-achievement',
  templateUrl: './achievement.page.html',
  styleUrls: ['./achievement.page.scss'],
})
export class AchievementPage {
  @Select(ChildState.Children) Children$!: Observable<Child[]>; 

  open = false;

  childProfilePictureSrc = 'https://ww-img-bucket.s3.amazonaws.com/Dragon4-testProfile.png';
  
  awards: AwardSection[] = [];

  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;




  constructor(private achievementService: AchievementService, private store: Store) {
    this.currentChild$.subscribe((child) => {
      if (child) {
        // this.loadAwards(child._id);
        // this.childProfilePictureSrc = child.profile_photo;
        this.loadAwards('64aea0695102acb3adb889ad');
      }
    });
  }

  loadAwards(id:string) {
    this.achievementService.getAwards(id).subscribe(
      (data: AwardSection[]) => {
        this.awards = data;
        console.log('Awards loaded:', this.awards);
      },
      (error) => {
        console.error('Error loading awards:', error);
      }
    );
  }
}
