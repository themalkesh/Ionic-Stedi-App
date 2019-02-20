import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the FacebooklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-facebooklist',
  templateUrl: 'facebooklist.html',
})
export class FacebooklistPage {

  items = [
          { image: 'https://scontent.fbom1-2.fna.fbcdn.net/v/t1.0-1/p200x200/375407_10150515672217180_238995277_n.jpg?_nc_cat=0&oh=2ecf6d30a4405d0052cb85f5022b94d6&oe=5BBA67C2', title: 'STEDI.org', url: 'https://www.facebook.com/stedi.org/' },
          { image: 'https://scontent.fbom1-2.fna.fbcdn.net/v/t1.0-1/p200x200/27752474_415022712284015_2412607125093609256_n.png?_nc_cat=0&oh=6b705188dcbf3f470465132514e12373&oe=5B79F768', title: 'STEDI Teachers', url: 'https://www.facebook.com/STEDITeachers/' },
          { image: 'https://scontent.fbom1-2.fna.fbcdn.net/v/t1.0-1/p200x200/18222091_409601439415012_4774479467713180150_n.jpg?_nc_cat=0&oh=80b563e5220e87011b6bd53f1dfbf636&oe=5BC10D6B', title: 'Parenting Magic', url: 'https://www.facebook.com/parentingmagic/' }
        ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public iab : InAppBrowser,
    
  ) {

  }

  openfbpage(url){
    this.iab.create(url, "_system");
      return false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacebooklistPage');
  }

}
