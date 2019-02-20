import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    NgxErrorsModule
  ],
})
export class ProfilePageModule {}
