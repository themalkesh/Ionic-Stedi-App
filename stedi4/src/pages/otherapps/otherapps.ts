import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the OtherappsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otherapps',
  templateUrl: 'otherapps.html',
})
export class OtherappsPage {
  items = [
      { image: 'imageurl', title: 'Page Title', url: 'PageUrl', details: 'details', ios: 'ios', android: 'android' }, 
      { image: 'imageurl', title: 'Page Title', url: 'PageUrl', details: 'details', ios: 'ios', android: 'android' }, 
      { image: 'imageurl', title: 'Page Title', url: 'PageUrl', details: 'details', ios: 'ios', android: 'android' }, 
      { image: 'imageurl', title: 'Page Title', url: 'PageUrl', details: 'details', ios: 'ios', android: 'android' } 
  ];
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public iab : InAppBrowser,
      
  ) {
  }

  launch(url){
    this.iab.create(url, "_system");
      return false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherappsPage');
  }

}
