import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the TrackingparentchildhistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-trackingparentchildhistory',
  templateUrl: 'trackingparentchildhistory.html',
})
export class TrackingparentchildhistoryPage {
  historydates: any;
  child = { id: "", name: "" };
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {
    this.child = this.navParams.get('child');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tracking Parent Child History Page');
    let count = 0;
    let key = this.auth.uid;
    console.log(`tracking_parent/${key}/child/${this.child.id}/dates`);
    this.auth.afs.collection(`tracking_parent/${key}/child/${this.child.id}/dates`).snapshotChanges().map((changes) => {
      if (  count < 30) {
        
        return changes.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      }
      count++;
    }).subscribe((data: any) => {
      this.historydates = data;
      console.log(this.historydates)
    });
  }

}
