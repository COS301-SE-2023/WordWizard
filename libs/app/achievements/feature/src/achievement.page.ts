/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef } from '@angular/core';
import {
  AwardSection,
  AchievementService,
} from '@word-wizard/app/achievements/data-access';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ChildState, Child } from '@word-wizard/app/child/data-access';
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

  childProfilePictureSrc = 'assets/img/Awards/Blankbadge.png';

  awards: AwardSection[] = [];
  parentActive!: boolean;
  selectedAward: any;
  badges: Badge[] = [];

  helpText: string[] = [
    'Click on each badge to see more details.',
    'You collect badges by completing more levels.',
  ];
  audioSources: string[] = [
    'assets/mp3/achievements1.mp3',
    'assets/mp3/achievements2.mp3',
  ];

  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;
  @Select(ChildState.parentActive) parentActive$!: Observable<boolean>;
  openModal(award: any, category: any) {
    this.selectedAward = award;
    if (this.selectedAward.completed == false) {
      this.selectedAward.img = 'assets/img/Awards/Blankbadge.png';
      this.selectedAward.name = 'Locked';
    } else {
      this.selectedAward.name = 'You completed a ' + category + ' award!';
    }
    this.open = true;
  }

  constructor(
    private achievementService: AchievementService,
    private elRef: ElementRef,
  ) {
    this.currentChild$.subscribe((child) => {
      if (child && child._id !== '') {
        this.loadAwards(child._id);

        if (child.profile_photo != '') {
          this.childProfilePictureSrc = child.profile_photo;
        }
      }
    });

    this.parentActive$.subscribe((data) => {
      if (data === true) this.parentActive = true;
      else this.parentActive = data;
    });
  }

  loadAwards(id: string) {
    this.achievementService.getAwards(id).subscribe(
      (data: AwardSection[]) => {
        this.awards = data;

        data.forEach((category) => {
          category.awards.forEach((award) => {
            const badge: Badge = {
              img: award.completed
                ? award.img
                : 'assets/img/Awards/Blankbadge.png',
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
