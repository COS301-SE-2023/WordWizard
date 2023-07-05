import { Component, } from '@angular/core';

@Component({
  selector: 'ww-achievement',
  templateUrl: './achievement.page.html',
  styleUrls: ['./achievement.page.scss'],
})
export class AchievementPage  {

  childProfilePictureSrc = 'https://ww-img-bucket.s3.amazonaws.com/Dragon4-testProfile.png';
  awardImageSrc = 'https://ww-img-bucket.s3.amazonaws.com/Dragon4-testProfile.png';
  
  
  constructor() {
    console.log('Achievement Page');
   }

  ngOnInit() {
    console.log('Achievement Page');
  }

}
