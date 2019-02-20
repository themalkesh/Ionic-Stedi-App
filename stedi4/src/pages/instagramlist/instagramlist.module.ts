import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstagramlistPage } from './instagramlist';

@NgModule({
  declarations: [
    InstagramlistPage,
  ],
  imports: [
    IonicPageModule.forChild(InstagramlistPage),
  ],
})
export class InstagramlistPageModule {}
