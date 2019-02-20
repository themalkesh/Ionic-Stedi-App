import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular'; 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


 
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import { RollPage } from '../pages/roll/roll';
import { EmailverificationPage } from '../pages/emailverification/emailverification';
// import { HttpClient } from '@angular/common/http';

// import { HomePage } from '../pages/home/home';
export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = 'LoginPage';
  @ViewChild(Nav) nav: Nav;
  redirectedToHomepage = false;
  pages: PageInterface[] = [
    { title: 'Tracking', pageName: 'HomePage', tabComponent: 'TrackparentPage', index: 0, icon: 'home' },
    { title: 'Chat', pageName: 'ChatPage', tabComponent: 'ChatparentPage', index: 1, icon: 'contacts' },
    { title: 'More', pageName: 'MorePage', icon: 'shuffle' },
  ];
  constructor(
      platform: Platform, 
      statusBar: StatusBar, 
      splashScreen: SplashScreen,
      private auth: AuthService,
      // public http: HttpClient,
       
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.auth.afAuth.authState.subscribe(user=>{
          if(user){
            if(user.emailVerified == false){
              this.rootPage = EmailverificationPage;
            }else{
              this.auth.getrolls();
              this.auth.getprofile();
              if (this.auth.rolls) {
                if (!this.redirectedToHomepage) {
                  // this.rootPage = 'MenuPage';
                  this.nav.setRoot('HomePage');
                  this.redirectedToHomepage = true;
                }
                //
              } else {
                // this.rootPage = 'RollPage';
                this.nav.setRoot('RollPage');
              }
            }
          }else{
            this.nav.setRoot('LoginPage');
            // this.rootPage = 'LoginPage';
          }
      },
    (error)=>{
      this.nav.setRoot('LoginPage');
      // this.rootPage = 'LoginPage';
    });

    });
  }

  menuclick(Page){ 
    console.log('Clicked Menu Page : ' + Page);
    this.nav.setRoot(Page);
  }
  openPage(page: PageInterface) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    } 
    
    console.log() 

    this.nav.setRoot(page.pageName, params);
    
    // // The active child nav is our Tabs Navigation
    // if (this.nav.getActiveChildNav() && page.index != undefined) {
    //   this.nav.getActiveChildNav().select(page.index);
    // } else {
    //   // Tabs are not active, so reset the root page 
    //   // In this case: moving to or from SpecialPage
    //   this.nav.setRoot(page.pageName, params);
    // }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

}

