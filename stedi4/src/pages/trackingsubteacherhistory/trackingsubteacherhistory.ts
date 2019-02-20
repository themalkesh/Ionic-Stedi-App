import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
/**
 * Generated class for the TrackingsubteacherhistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trackingsubteacherhistory',
  templateUrl: 'trackingsubteacherhistory.html',
})
export class TrackingsubteacherhistoryPage {
  historydates: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tracking Subteac Herhistory Page');
    let count = 0;
    let key = this.auth.uid;
    this.auth.afs.collection(`tracking_subteacher/${key}/dates`).snapshotChanges().map((changes) => {
      if ( count < 30) {
        
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