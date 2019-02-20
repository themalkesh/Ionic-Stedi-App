import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {  AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';


/**
 * Generated class for the ChildPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-child',
  templateUrl: 'child.html',
})
export class ChildPage {

  public childname:string;
  public childs;
  public childid: string;
  public editform=false;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public auth : AuthService,
      public toastController: ToastController
    ) {
      this.auth.getchilds();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildPage');
    this.childs = this.auth.childs.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Child;
        const id = a.payload.doc.id;
        return { id:id , name:data.name  };
      });
    });
  }
  editchild(child){
    this.editform = true;
    this.childname = child.name;
    this.childid = child.id;
  }
  updatechild(){
    let data = { name: this.childname }
    this.auth.updatechilds(this.childid,data).then((success) => {
      this.childname = "";
      this.editform = false;
      let toast = this.toastController.create({
        message: "Child Name Updated Successfully",
        duration: 5000,
        position: 'top'
      })
      toast.present();
    }, (error) => {
      console.log(error.message);
    });

  }
  addchild(){

    let data = { name : this.childname }
    this.auth.addchilds(data).then((success)=>{
      this.childname = "";
      let toast = this.toastController.create({
         message : "Child Name Added Successfully",
         duration : 5000,
        position: 'top'
      })
      toast.present();
    },(error)=>{
      console.log(error.message);
    });

  }
  deletechild(id){
    this.auth.deletechilds(id).then(
      (sucssess) => {
        let toast = this.toastController.create({
          message: "Child Name Removed Successfully",
          duration: 5000,
          position: 'top'
        })
        toast.present();
      },
      (error) => {
        console.log(error);
      });  ;
  }

}
interface Child {
  name: string;
}
