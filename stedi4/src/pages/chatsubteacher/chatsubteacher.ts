import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
//import * as firebase from 'firebase/app';
//import FirebaseDatabase from '@firebase/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../services/auth.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { Keyboard } from '@ionic-native/keyboard';
import linkifyStr from 'linkifyjs/string';

/**
 * Generated class for the ChatsubteacherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatsubteacher',
  templateUrl: 'chatsubteacher.html',
})
export class ChatsubteacherPage {
  @ViewChild(Content) content: Content;

  data = { type: '', nickname: '', message: '', ImageUrl: '', uid: '' };
  chats = [];
  roomkey: string;
  nickname: string;
  offStatus: boolean = false;
  userProfile: any;
  ImageUrl: string = "";
  uid = "";
  footerclass = "bottomdown";
  keyboardopen = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afd: AngularFireDatabase,
    public auth: AuthService,
    public iab: InAppBrowser,
  //  public keyboard: Keyboard,

  ) {



    this.auth.getUid();
    this.roomkey = "subteacher";
    this.nickname = "Stedi User";
    this.data.type = 'message';
    this.data.nickname = this.nickname;


    this.auth.getprofile();
    this.auth.getprofileImage();
    this.auth.userprofile.valueChanges().subscribe(data => {
      if (data) {
        this.userProfile = data;
        this.data.nickname = data.fname + " " + data.lname;
        this.data.uid = this.auth.uid;
        this.uid = this.auth.uid;
        console.log(data);
      }
    });

    this.getProfileImageStyle();

    //let joinData = afd.database.ref('chatrooms/' + this.roomkey + '/chats').push();
    // joinData.set({
    //   type: 'join',
    //   user: this.nickname,
    //   message: this.nickname + ' has joined this room.',
    //   sendDate: Date()
    // });
    this.data.message = '';

    afd.database.ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });

  }

  ionViewDidLoad() {

    // console.log('ionViewDidLoad ChatparentPage');
    // this.keyboard.onKeyboardShow().subscribe(() => {
    //   this.footerclass = "bottomup";
    //   this.keyboardopen = true;
    //   console.log("chatparentpage");
    //   console.log(this.footerclass);
    // });

    // this.keyboard.onKeyboardHide().subscribe(() => {
    //   this.footerclass = "bottomdown";
    //   console.log("chatparentpage");
    //   console.log(this.footerclass);
    //   this.keyboardopen = false;
    // });

    // this.keyboard.hideKeyboardAccessoryBar(true);

  }


  getProfileImageStyle() {
    this.auth.getprofileImage();
    this.auth.userprofileimage.valueChanges().subscribe(data => {
      if (data) {
        this.ImageUrl = data.url;
        this.data.ImageUrl = data.url;
      }
    });
  }

  sendMessage() {
    let newData = this.afd.database.ref('chatrooms/' + this.roomkey + '/chats').push();
    console.log(this.textToHtml(this.data.message));
    newData.set({
      type: this.data.type,
      user: this.data.nickname,
      message: this.textToHtml(this.data.message),
      ImageUrl: this.data.ImageUrl,
      uid: this.data.uid,
      sendDate: Date()
    });
    console.log(this.data);
    this.data.message = '';
  }

  textToHtml(str: string) {



    return str ? linkifyStr(str, { target: '_system' }) : str;


    //return text.replace(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi, `<a href="$&">$&</a>`);

  }

  handleClick(event) {
    //console.log(event.target);
    if (event.target.tagName == "A") {
      // open link using inappbrowser
      this.iab.create(event.target.href, "_system");
      return false;
    }
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
