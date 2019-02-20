import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { MorePage } from '../more/more';
import { ChatPage } from '../chat/chat';
// import { Keyboard } from '@ionic-native/keyboard';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ChatPage;
  tab3Root = 'MorePage';
  keyboardopen = false;
  constructor(
    // public keyboard:Keyboard
  ) {



  }

  ionViewDidLoad() {
    // this.keyboard.onKeyboardShow().subscribe(() => {
    //   this.keyboardopen = true;
    //   console.log("tabspage");
    //   console.log(this.keyboardopen);
    // });
    // this.keyboard.onKeyboardHide().subscribe(() => {
    //   this.keyboardopen = false;
    //   console.log("tabspage");
    //   console.log(this.keyboardopen);
    // });
    // this.keyboard.hideKeyboardAccessoryBar(true);
  }
}
