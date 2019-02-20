import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
 
import { AuthService } from '../../services/auth.service';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { TrackparentPage } from '../trackparent/trackparent';
// import { TracksubteacherPage } from '../tracksubteacher/tracksubteacher';
// import { TrackteacherPage } from '../trackteacher/trackteacher';
import { TrackingteacherhistoryPage } from '../trackingteacherhistory/trackingteacherhistory';
import { TrackingparenthistoryPage } from '../trackingparenthistory/trackingparenthistory';
import { TrackingsubteacherhistoryPage } from '../trackingsubteacherhistory/trackingsubteacherhistory';
//import { Keyboard } from '@ionic-native/keyboard';

 

/**
 * Generated class for the TrackinghistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-trackinghistory',
  templateUrl: 'trackinghistory.html',
})
export class TrackinghistoryPage {
  roll: any = false;
  rolls: [any];
  rollTabs: string = "parent";
  constructor(public navCtrl: NavController,
    private auth: AuthService,) {

    this.auth.getrolls();
    this.auth.rolls.valueChanges().subscribe(data => {
      this.roll = data;
      // if (this.roll) {
      //   if (this.roll.parent == true) {
      //     this.rollTabs = "parent";
      //   } else if (this.roll.subteacher == true) {
      //     this.rollTabs = "subteacher";
      //   } else if (this.roll.teacher == true) {
      //     this.rollTabs = "teacher";
      //   }
      // }
    });

  }
  trackingparenthistrory(){
    this.navCtrl.push('TrackingparenthistoryPage'); 
  }
  trackingteacherhistrory() {
    this.navCtrl.push('TrackingteacherhistoryPage'); 
  }
  trackingsubteacherhistrory() {
    this.navCtrl.push('TrackingsubteacherhistoryPage'); 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackinghistoryPage');
  }

}
