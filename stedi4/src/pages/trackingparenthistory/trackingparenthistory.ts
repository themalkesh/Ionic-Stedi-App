import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { TrackingparentchildhistoryPage } from '../trackingparentchildhistory/trackingparentchildhistory';
import { App } from 'ionic-angular';

 
/**
 * Generated class for the TrackingparenthistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-trackingparenthistory',
  templateUrl: 'trackingparenthistory.html',
})
export class TrackingparenthistoryPage {
  //historydates: any;
  childs;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, public app: App) {
  }

  ionViewDidLoad() { 
    this.auth.getchilds();
    this.childs = this.auth.childs.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Child;
        const id = a.payload.doc.id;
        return { id: id, name: data.name };
      });
    });

    // console.log('ionViewDidLoad Tracking Parent History Page');
    // let count = 0;
    // let key = this.auth.uid;
    // console.log(`tracking_parent/${key}/dates`);
    // let tracking_teachers = this.auth.afs.collection(`tracking_parent/${key}/dates`).snapshotChanges().map((changes) => {
    //   //if (count != 0 && count < 30) {
    //     //count++;
    //     console.log(changes);
    //     return changes.map(a => {
    //       const data = a.payload.doc.data();
    //       console.log(a);
    //       const id = a.payload.doc.id;
    //       return { id, data };
    //     });
    //   //}
    // }).subscribe((data: any) => {
    //   this.historydates = data;
    //   //console.log(this.historydates)
    // });
  }
  parentchildpage(child) {
    //console.log(child);
    this.navCtrl.push(TrackingparentchildhistoryPage, { child: child });
  }

}
interface Child {
  name: string;
}
