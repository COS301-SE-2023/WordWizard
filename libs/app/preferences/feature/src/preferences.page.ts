import { Component } from '@angular/core';

@Component({
  selector: 'word-wizard-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage {

  options:any[] = [];
  chosenOption:any[] = [];
  colors = ["#FFBF00", "#FFD700", "#FF6347", "#FF4500", "#FF8C00", "#FF7F50", "#FF69B4", "#FF1493", "#FF00FF", "#FF00FF"]

  input = "";
  constructor() {
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
    this.chosenOption =[
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
    ]
  }

  addOption(option:any) {
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

  removeOption(option:any) {
    this.chosenOption.splice(this.chosenOption.indexOf(option), 1);
  }

  save() {
    console.log(this.chosenOption);
  }
}
