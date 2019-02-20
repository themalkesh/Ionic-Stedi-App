import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { RollPage } from '../roll/roll';

import { AuthService } from '../../services/auth.service';
//import { HomePage } from '../home/home';
import { ChatparentPage } from '../chatparent/chatparent';
import { ChatsubteacherPage } from '../chatsubteacher/chatsubteacher';
import { ChatteacherPage } from '../chatteacher/chatteacher';
// import { Keyboard } from '@ionic-native/keyboard';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  roll: any;
  rolls: [any];
  rollTabs:string="parent"; 
  chattab1Root = 'ChatparentPage';
  chattab2Root = 'ChatsubteacherPage';
  chattab3Root = 'ChatteacherPage';

  footerclass = "bottomdown";
  keyboardopen = false;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public popoverCtrl: PopoverController,
      private auth: AuthService,
      // public keyboard: Keyboard
    ) {
    this.auth.getrolls();
    this.auth.rolls.valueChanges().subscribe(data => {
      this.roll = data;
      console.log(this.roll);
      if (this.roll){
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

  ionViewDidLoad() {
    // this.keyboard.hideKeyboardAccessoryBar(true);
    console.log("Chat Page Loaded");
  }

  presentRollPopover(myEvent) {
    let popover = this.popoverCtrl.create(RollPage);
    popover.present({
      ev: myEvent
    });
  }

}
