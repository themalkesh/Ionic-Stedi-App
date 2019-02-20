import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
/**
 * Generated class for the TrackingteacherhistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// interface TeacherTrackingHistory {
//   id: string;
//   data: any;
// }

@IonicPage()
@Component({
  selector: 'page-trackingteacherhistory',
  templateUrl: 'trackingteacherhistory.html',
})
export class TrackingteacherhistoryPage {
  
  historydates: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {
  
    
  }

  trackingparentdata(){
    
    
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tracking Teacher History Page');
    let count = 0;
    let key = this.auth.uid;
     this.auth.afs.collection(`tracking_teacher/${key}/dates`).snapshotChanges().map((changes) => {
      if ( count < 30 ){
        
        return changes.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      }
      count++;

    }).subscribe((data: any) => {

      this.historydates = data;
      console.log(this.historydates)

    });
  }

}
