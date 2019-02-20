import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
// import { TrackparentchildPage } from '../trackparentchild/trackparentchild';
import { App } from 'ionic-angular';



/**
 * Generated class for the TrackparentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trackparent',
  templateUrl: 'trackparent.html',
})
export class TrackparentPage {

  childs;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth : AuthService,
    public  app : App
  ) {

  }

  ionViewDidLoad() {
    this.auth.getchilds();
    console.log('ionViewDidLoad TrackparentPage');
    this.childs = this.auth.childs.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Child;
        const id = a.payload.doc.id;
        return { id: id, name: data.name };
      });
    });
  }
  parentchildpage(child){
    //console.log(child);
    this.navCtrl.push('TrackparentchildPage', { child: child });
  }

}
interface Child {
  name: string;
}
