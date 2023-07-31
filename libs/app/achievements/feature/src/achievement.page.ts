import { Component } from '@angular/core';
import {
  AwardSection,
  AchievementService,
} from '@word-wizard/app/achievements/data-access';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import {
  SetChild,
  ChildState,
  Child,
} from '@word-wizard/app/child/data-access';
import { Badge } from '@word-wizard/app/shared-ui';

export interface achievement {
  levelName: string;
}

@Component({
  selector: 'ww-achievement',
  templateUrl: './achievement.page.html',
  styleUrls: ['./achievement.page.scss'],
})
export class AchievementPage {
  open = false;

  childProfilePictureSrc =
    'https://ww-img-bckt.s3.amazonaws.com/Dragon4-testProfile.png';

  awards: AwardSection[] = [];
  parentActive!: boolean;
  selectedAward: any;
  badges: Badge[] = [];

  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;
  @Select(ChildState.parentActive) parentActive$!: Observable<boolean>;
  openModal(award: any, category: any) {
    this.selectedAward = award;
    if (this.selectedAward.completed == false) {
      this.selectedAward.img =
        'https://ww-img-bckt.s3.amazonaws.com/ww-awards/Blankbadge.png';
      this.selectedAward.name = 'Locked';
    } else {
      this.selectedAward.name = 'You completed a ' + category + ' award!';
    }
    this.open = true;
  }

  constructor(
    private achievementService: AchievementService,
    private store: Store,
  ) {
    this.currentChild$.subscribe((child) => {
      if (child && child._id !== '') {
        this.loadAwards(child._id);

        if (child.profile_photo != '') {
          this.childProfilePictureSrc = child.profile_photo;
        }
        // this.loadAwards('64aea0695102acb3adb889ad');
      }
    });

    this.parentActive$.subscribe((data) => {
      if (data === true) this.parentActive = true;
      else this.parentActive = data;
    });
  }

  // getBadge(categoryName: string, award: any): Badge {
  //   return {
  //     img: award.completed ? award.img : 'https://ww-img-bucket.s3.amazonaws.com/ww-awards/Blankbadge.png',
  //     name: categoryName,
  //     description: award.description,
  //   };
  // }

  loadAwards(id: string) {
    this.achievementService.getAwards(id).subscribe(
      (data: AwardSection[]) => {
        this.awards = data;

        data.forEach((category) => {
          category.awards.forEach((award) => {
            const badge: Badge = {
              img: award.completed
                ? award.img
                : 'https://ww-img-bucket.s3.amazonaws.com/ww-awards/Blankbadge.png',
              name: category.name,
              description: award.description,
            };
            this.badges.push(badge);
          });
        });
      },
      (error) => {
        console.error(error);
      },
    );
  }
}
