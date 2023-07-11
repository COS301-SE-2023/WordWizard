import { Component } from '@angular/core';

@Component({
  selector: 'ww-achievement',
  templateUrl: './achievement.page.html',
  styleUrls: ['./achievement.page.scss'],
})
export class AchievementPage {
  childProfilePictureSrc = 'https://ww-img-bucket.s3.amazonaws.com/Dragon4-testProfile.png';
  
  awards = {
    'Level Master': {
      'Level 1 Conqueror': {
        goal: 1,
        progress: 3,
        description: 'Complete level 1',
        completed: true
      },
      'Level 5 Prodigy': {
        goal: 5,
        progress: 3,
        description: 'Complete level 5',
        completed: false
      },
      'Level 10 Guru': {
        goal: 10,
        progress: 3,
        description: 'Complete level 10',
        completed: false
      },
      'WordWizard Legend': {
        goal: 20,
        progress: 3,
        description: 'Complete level 20',
        completed: false
      }
    },
    'Word Learner': {
      'Word Novice': {
        goal: 10,
        progress: 6,
        description: 'Learn 10 new words',
        completed: false
      },
      'Word Apprentice': {
        goal: 14,
        progress: 6,
        description: 'Learn 14 new words',
        completed: false
      },
      'Word Connoisseur': {
        goal: 18,
        progress: 6,
        description: 'Learn 18 new words',
        completed: false
      },
      'Word Wizard': {
        goal: 22,
        progress: 6,
        description: 'Learn 22 new words',
        completed: false
      }
    },
    'Practice Enthusiast': {
      'Practice Starter': {
        goal: 5,
        progress: 5,
        description: 'Have 5 words in your practice list',
        completed: true
      },
      'Practice Explorer': {
        goal: 10,
        progress: 5,
        description: 'Have 10 words in your practice list',
        completed: false
      },
      'Practice Devotee': {
        goal: 15,
        progress: 5,
        description: 'Have 15 words in your practice list',
        completed: false
      },
      'Practice Champion': {
        goal: 20,
        progress: 5,
        description: 'Have 20 words in your practice list',
        completed: false
      }
    },
    'Vocabulary Builder': {
      'Vocabulary Starter': {
        goal: 5,
        progress: 5,
        description: 'Build a vocabulary of 5 words',
        completed: true
      },
      'Vocabulary Explorer': {
        goal: 10,
        progress: 5,
        description: 'Build a vocabulary of 10 words',
        completed: false
      },
      'Vocabulary Devotee': {
        goal: 15,
        progress: 5,
        description: 'Build a vocabulary of 15 words',
        completed: false
      },
      'Vocabulary Champion': {
        goal: 20,
        progress: 5,
        description: 'Build a vocabulary of 20 words',
        completed: false
      }
    }
  };
}
