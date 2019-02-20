import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';


/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  forgotForm: FormGroup;
  forgotError: string;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
    private auth: AuthService,
    public fb: FormBuilder,
    public toastController : ToastController , 
  ) {

      this.forgotForm = fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  forgotpassword(){
    let data = this.forgotForm.value;
    if (!data.email) {
      return;
    }
    this.auth.afAuth.auth.sendPasswordResetEmail(data.email).then(
      (sucsess)=>{
        console.log(sucsess);
        let tost = this.toastController.create({
          message: "Reset Password Email Sent Successfully.",
          duration: 5000,
          position: 'top',
        })
        tost.present();
      },
      (error)=>{
        console.log(error);
        let tost = this.toastController.create({
          message: error.message,
          duration: 5000,
          position: 'top',
        })
        tost.present();
      })
  }
  login(){
    this.navCtrl.setRoot('LoginPage');
  }
  signup(){
    this.navCtrl.push('SignupPage');
  }

}
