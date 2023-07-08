import { Component, OnInit } from '@angular/core';
import { Award, AwardSection } from './achievement.model';
import { AchievementService } from './achievement.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'ww-achievement',
  templateUrl: './achievement.page.html',
  styleUrls: ['./achievement.page.scss'],
})
export class AchievementPage implements OnInit {
  childProfilePictureSrc = 'https://ww-img-bucket.s3.amazonaws.com/Dragon4-testProfile.png';
  
  awards: AwardSection[] = [];

  constructor(private achievementService: AchievementService) {}

  ngOnInit() {
    this.loadAwards();
  }

  loadAwards() {
    this.achievementService.getAwards().subscribe(
      (awards: AwardSection[]) => {
        this.awards = awards;
      },
      (error) => {
        console.error('Error loading awards:', error);
      }
    );
  }
}
