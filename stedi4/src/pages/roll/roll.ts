import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder  } from '@angular/forms';
// import { TabsPage } from '../tabs/tabs';
// import { ChildPage } from '../child/child';


/**
 * Generated class for the RollPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roll',
  templateUrl: 'roll.html',
})
export class RollPage {
  rollForm: FormGroup;
  rollError: string;
  roll:any;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private auth: AuthService,
      private fb: FormBuilder,
    private toastCtrl : ToastController
    ) {

    this.rollForm = this.fb.group({
      parent: [null],
      subteacher: [null],
      teacher: [null]
    });
    this.auth.getrolls();
    this.auth.rolls.valueChanges().subscribe(data=>{
      this.roll = data;
      //console.log(this.roll);
      this.setRolls();
    });

  }
  setRolls(){
    this.rollForm = this.fb.group({
      parent: [this.roll ? this.roll.parent : null],
      subteacher: [this.roll ? this.roll.subteacher : null],
      teacher: [this.roll ? this.roll.teacher : null]
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RollPage');
  }

  updateroll(){
    let data = this.rollForm.value;
    this.auth.updaterolls(data).then((sucssess) => {
      let toast = this.toastCtrl.create({
        message: "Role(s) Updated Successfully",
        duration: 2000,
      })
      toast.present();
    });
 
    return false;
  }

  child(){
    this.navCtrl.push('ChildPage');
    return false;
  }

}
