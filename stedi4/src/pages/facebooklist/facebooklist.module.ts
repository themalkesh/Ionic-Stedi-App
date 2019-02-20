import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacebooklistPage } from './facebooklist';

@NgModule({
  declarations: [
    FacebooklistPage,
  ],
  imports: [
    IonicPageModule.forChild(FacebooklistPage),
  ],
})
export class FacebooklistPageModule {}
