import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';


import { enableProdMode } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { Camera } from '@ionic-native/camera';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { Keyboard } from '@ionic-native/keyboard';
// import { Firebase } from '@ionic-native/firebase';
// import { FcmProvider } from '../providers/fcm/fcm';
// import { Api } from '../providers/api/api';
// import { LoginPageModule } from '../pages/login/login.module';
import { TabsPage } from '../pages/tabs/tabs';
// import { ChatPage } from '../pages/chat/chat';
import { MorePage } from '../pages/more/more';
import { ChatparentPage } from '../pages/chatparent/chatparent';
import { ChatsubteacherPage } from '../pages/chatsubteacher/chatsubteacher';
import { ChatteacherPage } from '../pages/chatteacher/chatteacher';
import { TrackinghistoryPage } from '../pages/trackinghistory/trackinghistory';
 
enableProdMode();

export const firebaseConfig = {
  apiKey: 'AIzaSyBVz9S8GdApI5H8vmK5ugXA02_ddozD_LY',
  authDomain: 'steditracker.firebaseapp.com',
  databaseURL: 'https://steditracker.firebaseio.com',
  projectId: 'steditracker',
  storageBucket: 'steditracker.appspot.com',
  messagingSenderId: '143448264132'
};
@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // TabsPage,
    // ChatPage,
    // MorePage,
    // ChatparentPage,
    // ChatsubteacherPage,
    // ChatteacherPage,
    // TrackinghistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    // LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage,
    // TabsPage,
    // ChatPage,
    // MorePage,
    // ChatparentPage,
    // ChatsubteacherPage,
    // ChatteacherPage,
    // TrackinghistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthService,
    AngularFireDatabase,
    Camera,
    InAppBrowser,
     
    // Keyboard,
    // Firebase,
    // FcmProvider,
    // Api,
  ]
})
export class AppModule {}
