import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthService } from './../../services/auth.service';

/**
 * Generated class for the TrackparentchildPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trackparentchild',
  templateUrl: 'trackparentchild.html',
})
export class TrackparentchildPage {

  child = {id:"",name:""};
  topics = [
    { id: 1, name: 'Positive Interactions', tracked : false },
    { id: 2, name: 'Individual Time', tracked: false },
    { id: 2, name: 'Family Activity', tracked: false },
    { id: 2, name: 'Parent Relationship Activity', tracked: false },
    { id: 2, name: 'Ignore Inconsequential Behavior', tracked: false },
    { id: 2, name: 'Redirect your attention', tracked: false },
    { id: 2, name: 'Teach or Review', tracked: false },
    { id: 2, name: 'Model Expectations', tracked: false }
  ];
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public auth : AuthService,
      public toastCtrl:ToastController
    ) {
    this.child = this.navParams.get('child');
    console.log(this.child);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackparentchildPage');

    //console.log(this.navParams.get('child_id'));

    this.auth.getchildtracking(this.child.id);
    this.auth.childtracking.valueChanges().subscribe((childtracking)=>{
      if (childtracking){
        this.topics = childtracking.topics;
      }
    });

  }

  updatetopicforchild(){
    this.auth.updatechildtracking(this.topics,this.child).then((sucssess)=>{
      let toast = this.toastCtrl.create({
        message:"Activitiy Tracked Successfully",
        duration:2000,
      })
      toast.present();
    });
  }

}
