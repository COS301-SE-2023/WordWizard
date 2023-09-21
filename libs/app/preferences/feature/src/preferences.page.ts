import { Component } from '@angular/core';
import {
  PreferencesService,
  GetPreferencesReq,
  PreferenceResponse,
  UpdatePreferencesReq,
  GetPreferencesResponse,
  Topics,
  preferences
} from '@word-wizard/app/preferences/data-access';
import { Select } from '@ngxs/store';
import { ChildState, Child } from '@word-wizard/app/child/data-access';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

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

  helpText: string[] = ['Here you can choose the topics you want to learn about.', 'You can create custom topics by typing in the box and pressing the add button.'];
  audioSources: string[] = [];
  constructor(private readonly preferencesService: PreferencesService, private toastController: ToastController) {

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
    this.preferencesService.getTopics().subscribe(async (data) => {
      try {
        data.topics.forEach((element:string) => {
          this.options.push({
            value:element,
            color:this.colors[Math.floor(Math.random() * this.colors.length)]
          })
        })
      } catch (err) {
        console.log(err);
      }
    });
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
    const preferences_rqst:string[] = [];
    this.chosenOption.forEach((element:preferences) => {
      preferences_rqst.push(element.value);
    });

    this.currentChild$.subscribe(async (data) => {
      const rqst: UpdatePreferencesReq = {
        child_id: data._id,
        preferences: preferences_rqst
      } as UpdatePreferencesReq;
      const defaultVal: GetPreferencesResponse = {
        status: "error"
      };
      const preferences: GetPreferencesResponse = (await this.preferencesService.updatePreferences(rqst).toPromise()) ?? defaultVal;
      if(preferences.status == "error")
        this.presentToast("error try again", "danger");
      else
        this.presentToast("Preferences saved!", "primary");
    }).unsubscribe();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }
}
