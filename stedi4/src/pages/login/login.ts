import { Component  } from '@angular/core';
import { IonicPage , NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
//import { HomePage } from './../home/home';
import { AuthService } from '../../services/auth.service';
import { SignupPage } from '../signup/signup';
import { TabsPage } from './../tabs/tabs';
import * as firebase from 'firebase/app';
//import { RollPage } from './../roll/roll';
// import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
// import { GooglePlus } from '@ionic-native/google-plus'; 
import { AngularFireAuth } from 'angularfire2/auth'; 




/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private auth: AuthService,
      public fb: FormBuilder,
      public toastController: ToastController,
      public afAuth: AngularFireAuth,
      // public gplus: GooglePlus,
    ) {

    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };

    this.auth.signInWithEmail(credentials).then((result)=>{
      console.log('loggedin successfull')
      this.navCtrl.setRoot('MenuPage');
      // this.auth.getrolls();
      // this.auth.rolls.valueChanges().subscribe((roll) => {
      //   console.log(roll);
      //   if (roll) {
      //     this.navCtrl.setRoot(TabsPage);
      //   } else {
      //     this.navCtrl.setRoot(RollPage);
      //     this.navCtrl.setRoot(RollPage, {
      //       setRootPage: true
      //     })
      //   }
      // })

    },
  (error)=>{
    let tost = this.toastController.create({
      message: error.message,
      duration: 5000,
      position: 'top',
    })
    tost.present();
  }
  );

      // .then(
      // () => this.navCtrl.setRoot(TabsPage),
      //   error => this.loginError = error.message
      // );
  }
  signup() {
    this.navCtrl.push('SignupPage');
    return false;
  }
  forgotpassword(){
    this.navCtrl.push('ForgotpasswordPage')
    return false;
  }
  glogin() {
    // this.gplus.login({})
    //   .then(res => {
    //     console.log(res);
    //     alert("success " + JSON.stringify(res));
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     alert("error " + JSON.stringify(err));
    //   });
  }
  loginWithGoogle() {

    // this.gplus.login({
    //   'scopes': 'profile',
    //   'webClientId': '143448264132-mkefhc411ktsn5bacfbmc3tg812qangk.apps.googleusercontent.com',
    //   'offline': true,
    // })
    //   .then(res => {
    //     console.log(res);
    //     alert("success " + JSON.stringify(res));
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     alert("error " + JSON.stringify(err));
    //   });

    // console.log("login clicked");
    // this.gplus.login().then((result)=>{
    //   console.log(result);
    //   console.log("login clicked int");
    // });
    // console.log("login clicked out");

    let provider = new firebase.auth.GoogleAuthProvider();
    if (!(<any>window).cordova) {
      console.log("0");
      return this.afAuth.auth.signInWithPopup(provider);
    } else {

      return this.afAuth.auth.signInWithRedirect(provider)
        .then(() => {
          console.log("1");
          return this.afAuth.auth.getRedirectResult().then(result => {
            console.log("2");
            //console.log(result);
            //this.storeUserLogin(result.user);
          });
        });
    }

    // this.auth.signInWithGoogle()
    //   .then( 
    //   (result:any) => {
    //     console.log(result);
    //     //this.navCtrl.setRoot(TabsPage)
    //   },
    //     error => {
    //       console.log(error);
    //       let tost = this.toastController.create({
    //         message: error.message,
    //         duration: 5000,
    //         position: 'top',
    //       })
    //       tost.present();
    //     }
    //   );
  }
  loginWithFacebook(){


    let provider = new firebase.auth.FacebookAuthProvider();
    if (!(<any>window).cordova) {
      console.log("0");
      return this.afAuth.auth.signInWithPopup(provider);
    } else {

      return this.afAuth.auth.signInWithRedirect(provider)
        .then(() => {
          console.log("1");
          return this.afAuth.auth.getRedirectResult().then(result => {
            console.log("2");
            //console.log(result);
            //this.storeUserLogin(result.user);
          });
        });
    }

    // this.auth.signInWithFacebook()
    //   .then(
    //     () => {
    //       //this.navCtrl.setRoot(TabsPage)
    //     },
    //     error => {
    //       let tost = this.toastController.create({
    //         message : error.message,
    //         duration : 5000,
    //         position: 'top',
    //       })
    //       tost.present();
    //     }
    //   );
  }

}
