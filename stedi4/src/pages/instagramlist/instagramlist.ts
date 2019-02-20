import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the InstagramlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-instagramlist',
  templateUrl: 'instagramlist.html',
})
export class InstagramlistPage {

  items = [
    { image: 'https://instagram.fbom1-2.fna.fbcdn.net/vp/dd6721e8e27f2241f4f829b42ff5eb8a/5BBE4886/t51.2885-19/11850001_543821785771124_299789537_a.jpg', title: 'Stedi.org', url: 'https://www.instagram.com/stedisub/' },
    { image: 'https://instagram.fbom1-2.fna.fbcdn.net/vp/8513b436788e9c5bf5d91b93063e2507/5BBC82F7/t51.2885-19/s150x150/31222796_178062233018890_5348337531769323520_n.jpg', title: 'Parenting Magic', url: 'https://www.instagram.com/parenting.magic/' },
    // { image: 'imageurl', title: 'Page Title', url: 'PageUrl' }
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
    console.log('ionViewDidLoad InstagramlistPage');
  }

}
