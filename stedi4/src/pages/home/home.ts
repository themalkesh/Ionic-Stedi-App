import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { RollPage } from '../roll/roll';

import { AuthService } from '../../services/auth.service';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { TrackparentPage } from '../trackparent/trackparent';
// import { TracksubteacherPage } from '../tracksubteacher/tracksubteacher';
// import { TrackteacherPage } from '../trackteacher/trackteacher';
//import { Keyboard } from '@ionic-native/keyboard'; 

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  roll: any = false;
  rolls:[any];
  rollTabs: string = "parent";
  TrackparentPage = 'TrackparentPage';
  TracksubteacherPage = 'TracksubteacherPage';
  TrackteacherPage = 'TrackteacherPage'; 

  footerclass = "bottomdown";
  keyboardopen = false;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    private auth: AuthService,
//    private fb: FormBuilder,
//    public keyboard: Keyboard
  ) {
 
    console.log("Home page loaded");

    this.auth.getrolls();
    this.auth.rolls.valueChanges().subscribe(data => {
      this.roll = data;
      if (this.roll) {
        if (this.roll.parent == true) {
          this.rollTabs = "parent";
        } else if (this.roll.subteacher == true) {
          this.rollTabs = "subteacher";
        } else if (this.roll.teacher == true) {
          this.rollTabs = "teacher";
        }
      }
    });

  }
  initializeApp() {
    console.log("Home page");
  }
  ionViewDidLoad() {
    //this.keyboard.hideKeyboardAccessoryBar(true);
  }
  presentRollPopover(myEvent){
    let popover = this.popoverCtrl.create('RollPage');
    popover.present({
      ev: myEvent
    });
  }

}
