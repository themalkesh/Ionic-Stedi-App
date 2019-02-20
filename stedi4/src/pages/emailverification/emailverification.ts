import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { TabsPage } from './../tabs/tabs';

/**
 * Generated class for the EmailverificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emailverification',
  templateUrl: 'emailverification.html',
})
export class EmailverificationPage {

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public auth : AuthService,
      public toastController:ToastController
    ) {
 
    setInterval(()=>{
      if (this.auth.afAuth.auth.currentUser){
        this.auth.afAuth.auth.currentUser.reload();
        if (this.auth.afAuth.auth.currentUser.emailVerified) {
          this.navCtrl.setRoot(TabsPage);
        } 
      }
    },5000);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailverificationPage');
  }

  resendauthemail(){

    let user = this.auth.afAuth.auth.currentUser;
    user.sendEmailVerification().then(
      (sucssess)=>{
        console.log(sucssess);
        let tost = this.toastController.create({
          message: "Varification email sent successfully. Please check your mail.",
          duration: 5000,
          position: 'top',
        })
        tost.present();
      },
      (error) =>{
        console.log(error);
        let tost = this.toastController.create({
          message: error.message,
          duration: 5000,
          position: 'top',
        })
        tost.present();
      }
    );

    // bellow code is use for reset password
    // let email = this.auth.afAuth.auth.currentUser.email;
    // this.auth.afAuth.auth.sendPasswordResetEmail(email).then( 
    //   (success) =>{
    //     console.log(success);
    //   } ,
    //    (error)=>{
    //      console.log(error)
    //    }
    // ); 
  }

  loginagain(){
    this.auth.signOut();
  }

}
