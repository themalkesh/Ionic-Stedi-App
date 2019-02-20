import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { ProfilePage } from '../profile/profile';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { FacebooklistPage } from '../facebooklist/facebooklist';
// import { InstagramlistPage } from '../instagramlist/instagramlist';
// import { OtherappsPage } from '../otherapps/otherapps';
// import { TrackinghistoryPage } from '../trackinghistory/trackinghistory';

 

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  userProfile: any; 
  ImageUrl:string="";
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private auth: AuthService,
      private iab: InAppBrowser
    ) {
    
    this.getProfileImage();  
    this.getuserprofile();

  }
 
  getuserprofile(){
    this.auth.getprofile();
    this.auth.userprofile.valueChanges().subscribe(data => {
      if (data) {
        this.userProfile = data;
      }else {
        this.auth.setblankuserprofile();
      }
      console.log(this.userProfile);
    });
  }

  getProfileImage() {
    this.auth.getprofileImage();
    this.auth.userprofileimage.valueChanges().subscribe(data => {
      if (data) {
        this.ImageUrl = data.url;
        console.log(this.ImageUrl);
      }
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  logout(){
    this.auth.signOut();
  }

  editprofile(){
    this.navCtrl.push('ProfilePage'); 
  }

  likefb(){
    this.navCtrl.push('FacebooklistPage'); 
  }
  likeig() {
    this.navCtrl.push('InstagramlistPage');
  }
  otherapps() {
    this.navCtrl.push('OtherappsPage'); 
  }

  trackinhistrory(){
    this.navCtrl.push('TrackinghistoryPage');  
  }

  openlink(url){
    const browser = this.iab.create(url);

    //browser.executeScript(...);

    //browser.insertCSS(...);
    //browser.on('loadstop').subscribe(event => {
      //browser.insertCSS({ code: "body{color: red;" });
    //});

    browser.close();

    
  }
}
