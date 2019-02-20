import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    NgxErrorsModule
    
  ],
}) 
export class HomePageModule {}
