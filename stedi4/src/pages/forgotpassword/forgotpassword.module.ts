import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotpasswordPage } from './forgotpassword';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
@NgModule({
  declarations: [
   ForgotpasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgotpasswordPage),
    NgxErrorsModule
    
  ],
})
export class ForgotpasswordPageModule {}
