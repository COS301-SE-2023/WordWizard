import { Component } from '@angular/core';
import { PreferencesService, GetPreferencesReq, PreferenceResponse } from '@word-wizard/app/preferences/data-access';
import { preferences } from './preferences.interface';
import { Select } from '@ngxs/store';
import { ChildState, Child } from '@word-wizard/app/child/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'word-wizard-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage {
  @Select(ChildState.currentChild) currentChild$!: Observable<Child>;
  options:preferences[] = [];
  chosenOption:preferences[] = [];
  colors = ["#FFBF00", "#FFD700", "#FF6347", "#FF4500", "#FF8C00", "#FF7F50", "#FF69B4", "#FF1493", "#FF00FF", "#FF00FF"]

  input = "";
  constructor(private readonly preferencesService: PreferencesService) {
    
    this.currentChild$.subscribe(async (data) => {
      const rqst: GetPreferencesReq = {
        child_id: data._id,
      } as GetPreferencesReq;
      const defaultVal: PreferenceResponse = {
        preferences: []
      };
      const preferences: PreferenceResponse = (await this.preferencesService.getPreferences(rqst).toPromise()) ?? defaultVal;
      try {
        preferences.preferences.forEach((element:string) => {
          this.chosenOption.push({
            value:element,
            color:this.colors[Math.floor(Math.random() * this.colors.length)]
          })
        })
      } catch (err) {
        console.log(err);
      }
    }).unsubscribe();
    this.options = [
      {
        value:"Christmas",
        color:"#EC7E19"
      },
      {
        value:"Animals",
        color:"#FC7777"
      },
      {
        value:"Friends",
        color:"#197AEC"
      },
      {
        value:"Family",
        color:"#36EC19"
      },
    ];
  }

  addOption(option:preferences) {
    if(this.chosenOption.length >= 4 || this.chosenOption.includes(option))
      return;
    this.chosenOption.push(option);
  }

  addCustom() {
    if(this.chosenOption.length >= 4 || this.input == "")
      return;
    this.addOption({
      value:this.input,
      color:this.colors[Math.floor(Math.random() * this.colors.length)]
    });
    this.input = "";
  }

  removeOption(option:preferences) {
    this.chosenOption.splice(this.chosenOption.indexOf(option), 1);
  }

  save() {
    console.log(this.chosenOption);
  }
}
