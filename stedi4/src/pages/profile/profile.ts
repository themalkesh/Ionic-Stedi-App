import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ActionSheetController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MorePage } from '../more/more';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { File } from '@ionic-native/file';
//import { Transfer  } from '@ionic-native/transfer';
//import { FilePath } from '@ionic-native/file-path';
import * as firebase from 'firebase/app';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//declare var cordova: any;
declare var window: any;

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild('fileInput') fileInput;

  lastImage: string = null;
  signupError: string;
  form: FormGroup;
  userProfile: any;

  task: AngularFireUploadTask;
  progress: any;
  image: string;

  ImageUrl:string="";

  private galleryOptions: CameraOptions = {
    allowEdit: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 720,
    targetHeight: 720,
    correctOrientation: true
  }
  private takePictureOptions: CameraOptions = {
    allowEdit: false,
    saveToPhotoAlbum: true,
    targetWidth: 720,
    targetHeight: 720,
    cameraDirection: this.camera.Direction.BACK,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.FILE_URI,
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    private auth: AuthService,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    //private filePath: FilePath,
    //private file: File,
    //private transfer: Transfer,
    private afstorage: AngularFireStorage) {
    this.getuserprofile();
    //console.log(this.auth.uid);
    this.getProfileImageStyle();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }



  // async captureImage() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: this.camera.PictureSourceType.CAMERA
  //   }

  //   alert("camera on");

  //   return 'data:image/jpg;base64,' + await this.camera.getPicture(options);
  // }

  captureImage() {
    this.camera.getPicture(this.takePictureOptions).then((imagePath) => {
      alert('got image path ' + imagePath);
      return this.makeFileIntoBlob(imagePath);//convert picture to blob
    }).then((imageBlob) => {
      alert('got image blob ' + imageBlob);
      return this.createUploadTask(imageBlob);//upload the blob
    }).then((uploadSnapshot: any) => {
      //alert('file uploaded successfully  ' + uploadSnapshot.downloadURL);
      //return this.saveToDatabase(uploadSnapshot);//store reference to storage in database
    }).then((_uploadSnapshot: any) => {
      //alert('file saved to asset catalog successfully  ');
    }, (_error) => {
      alert('Error ' + (_error.message || _error));
    });
  }

  createUploadTask(file: any) {
    //alert("image upload stareted");
    const filePath = `images/profile_${new Date().getTime()}_${this.auth.uid}.jpg`;

    this.image =  file;

    return new Promise((resolve, reject) => {

      let metadata: firebase.storage.UploadMetadata = {
        contentType: 'image/jpeg',
      };

      this.task =  this.afstorage.ref(filePath).put(this.image, metadata);
       
      // this.task.downloadURL().subscribe((url)=>{
      //   //alert(url);
      //   let profile = {
      //     displayName: this.auth.afAuth.auth.currentUser.displayName,
      //     photoURL: url
      //   }
      //   this.auth.afAuth.auth.currentUser.updateProfile(profile);
      //   this.auth.updateprofileurl(url);
      //   this.auth.afAuth.auth.currentUser.reload();

      // })

      this.progress = this.task.percentageChanges();

    });



  }

  async uploadHandler() {
    const base64 = await this.captureImage();
    this.createUploadTask(base64);
  }



  uploadFromGallery() {
    this.camera.getPicture(this.galleryOptions).then((imagePath) => {
      //alert('got image path ' + imagePath);
      return this.makeFileIntoBlob(imagePath);//convert picture to blob
    }).then((imageBlob) => {
      //alert('got image blob ' + imageBlob);
      return this.createUploadTask(imageBlob);//upload the blob
    }).then((uploadSnapshot: any) => {
      //alert('file uploaded successfully  ' + uploadSnapshot.downloadURL);
      //return this.saveToDatabase(uploadSnapshot);//store reference to storage in database
    }).then((_uploadSnapshot: any) => {
      //alert('file saved to asset catalog successfully  ');
    }, (_error) => {
      alert('Error ' + (_error.message || _error));
    });
  }

  makeFileIntoBlob(_imagePath) {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

        fileEntry.file((resFile) => {

          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = 'sample.jpg';
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            //console.log('Failed file read: ' + e.toString());
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.uploadFromGallery();
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.uploadHandler();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  getProfileImageStyle() {
    this.auth.getprofileImage();
    this.auth.userprofileimage.valueChanges().subscribe(data => {
      if (data) {
        this.ImageUrl = data.url;
        console.log(this.ImageUrl);
      }
      //console.log(data);
    });

    return 'url(' + this.ImageUrl + ')' ;

  }
  getuserprofile() {
    this.auth.getprofile();
    this.auth.userprofile.valueChanges().subscribe(data => {
      if (data) {
        this.userProfile = data;
        this.setupform();
      }
      //console.log(this.userProfile);
    });
  }

  setupform(){
    //console.log("form created");
    this.form = this.fb.group({
      fname: [this.userProfile.fname || null , Validators.compose([Validators.required])],
      lname: [this.userProfile.lname || null, Validators.compose([Validators.required])],
      email: [this.userProfile.email || null, Validators.compose([Validators.required, Validators.email])],
      phone: [this.userProfile.phone || null, Validators.compose([Validators.required])],
      state: [this.userProfile.state || null, Validators.compose([Validators.required])],
      schoolDistrict: [this.userProfile.schoolDistrict || null, Validators.compose([])],
    });

  }

  signup() {
    let data = this.form.value;
    let credentials = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      phone: data.phone,
      state: data.state,
      schoolDistrict: data.schoolDistrict,
    };
    console.log(credentials);
    console.log(this.auth.afAuth.auth.currentUser);
    this.auth.setUserDoc(this.auth.afAuth.auth.currentUser,credentials).then(
      () => {
        let profile = {
          displayName: credentials.fname + ' ' + credentials.lname,
          photoURL: this.auth.afAuth.auth.currentUser.photoURL
        }
        this.auth.afAuth.auth.currentUser.updateProfile(profile).then((sucssess) => {
          let toast = this.toastCtrl.create({
            message: "Profile Updated Successfully",
            duration: 2000,
          })
          toast.present();
        });

        this.auth.afAuth.auth.currentUser.reload();
        this.navCtrl.setRoot(MorePage)
      } ,
      error => this.signupError = error.message
    );
  }

}
