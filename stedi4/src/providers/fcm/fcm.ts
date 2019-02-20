import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
// import { AuthService } from '../../services/auth.service';


@Injectable()
export class FcmProvider {
  public userid:any;
  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform,
    // private auth: AuthService,
  ) { }

  // Get permission from the user
  async getToken(userid) {
    this.userid = userid;
    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }
    console.log(token);
    return this.saveTokenToFirestore(token)
  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if (!token) return;
    if (!this.userid) return;

    const devicesRef = this.afs.collection('devices')

    const docData = {
      token
    }

    return devicesRef.doc(this.userid).set(docData)
  }

  // Listen to incoming FCM messages
  onNotificationOpen() {
    return this.firebaseNative.onNotificationOpen();
  }

}
