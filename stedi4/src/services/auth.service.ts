import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
// import { GooglePlus } from '@ionic-native/google-plus'; 
//import { Storage } from '@ionic/storage';
// import { Platform } from 'ionic-angular';
//import { Firebase } from '@ionic-native/firebase'
import { Observable } from 'rxjs';



 

interface ProfileImage {
    uid: string;
    url: string;
}
interface User {
    uid: string;
    email: string;
    fname:string;
    lname:string;
    phone:string;
    state:string;
    schoolDistrict:string;
}
interface Roll{
    uid: string;
    parent: boolean;
    subteacher: boolean;
    teacher: boolean;
}

interface Child {
    name: string;
}
interface ChildTracking{
    topics : any; 
}

interface TeacherTracking{
  topics: any;
}
interface TeacherTrackingHistory {
    topics: any;
}
 


@Injectable()
export class AuthService {
    public user: firebase.User = null;
    public uid : string;
    public rolls: AngularFirestoreDocument<Roll>;
    public userprofile: AngularFirestoreDocument<User>;
    public userprofileimage : AngularFirestoreDocument<ProfileImage>;
    public childs : AngularFirestoreCollection<Child>;
    public childtracking: AngularFirestoreDocument<ChildTracking>;
    public subteachertracking: AngularFirestoreDocument<TeacherTracking>;
    public teachertracking: AngularFirestoreDocument<TeacherTracking>;
    
    public teachertrackinghistory: AngularFirestoreDocument<TeacherTrackingHistory>;

    public todaydate = "";
    constructor(
        public afAuth: AngularFireAuth,
        public afs: AngularFirestore,
       // public storage: Storage,
        // private platform : Platform,
       // private firebaseNative : Firebase,
        // public gplus: GooglePlus,
        ) {

      const date = new Date();
        this.todaydate = date.getDate() + "-" + (date.getMonth() + 1) + '-' + date.getFullYear();

        afAuth.authState.subscribe(user => {
            if(user){
                this.user = user;
                this.uid = user.uid;
            }
        });

    }
    getToken(){
      //let token;

      // if(this.platform.is('androide')){
      //   token = this.firebaseNative.getToken();
      // }

      // if(this.platform.is('ios')){
      //   token = this.firebaseNative.getToken();
      //   this.firebaseNative.grantPermission();
      // }

      // if(!this.platform.is('cordova')){
      //   //console.log('web platform');
      //   //token = this.firebaseNative.getToken();
      //   //this.firebaseNative.grantPermission();
      // }

      // //token = "abc";
      // //console.log();

      // this.saveTokenToFirestore(token);

    }

  saveTokenToFirestore(token){
    if(!token) return;
    const deviceRef = this.afs.doc(`devices/${this.uid}`);
    const docData = {
      token: token,
      user_id:this.uid,

    }
    deviceRef.set(docData);

  }

    setUid(uid){
        //this.storage.set('uid',uid);
        this.uid = uid;
    }
    getUid(){
        if (this.authenticated == true) {
            return this.afAuth.auth.currentUser.uid;
        } else {
            // return this.storage.get('uid').then((uid) => {
            //     return uid;
            // });
        }
    }
    get authenticated(): boolean {
        return this.user !== null;
    }
    getEmail() {
        return this.user && this.user.email;
    }
    getsubteachertracking(){
      //let uid = this.getUid();
        this.subteachertracking = this.afs.doc(`tracking_subteacher/${this.uid}/dates/${this.todaydate}`);
    }
    getteachertracking(){
      //let uid = this.getUid();
        this.teachertracking = this.afs.doc(`tracking_teacher/${this.uid}/dates/${this.todaydate}`);
    }
     
    updatesubteachertracking(topics){
        console.log(`tracking_subteacher/${this.uid}/dates/${this.todaydate}`);
        const rollRef: AngularFirestoreDocument<TeacherTracking> = this.afs.doc(`tracking_subteacher/${this.uid}/dates/${this.todaydate}`);
        const data1 = {
            topics,
        }
      console.log(data1);
      return rollRef.set(data1)
    }
    updateteachertracking(topics) {
        const rollRef: AngularFirestoreDocument<TeacherTracking> = this.afs.doc(`tracking_teacher/${this.uid}/dates/${this.todaydate}`);
       const data1 = {
         topics ,
       }
        return rollRef.set(data1)
    }
    getchildtracking(id) {
      //let uid = this.getUid();
        this.childtracking = this.afs.doc(`tracking_parent/${this.uid}/child/${id}/dates/${this.todaydate}`);
      //console.log(this.childtracking);
    }
    updatechildtracking(topics,child){
        const rollRef: AngularFirestoreDocument<ChildTracking> = this.afs.doc(`tracking_parent/${this.uid}/child/${child.id}/dates/${this.todaydate}`);
        const data1 = {
            topics 
        }
        return rollRef.set(data1)
    }
    deletechilds(id) {
        console.log("child delete");
        console.log(id);
        let ref = this.afs.doc(`childs/${this.uid}`).collection('names').doc(id);
        console.log(ref);
        return ref.delete();
    }
    updatechilds(id, data) {
        const rollRef: AngularFirestoreDocument<Child> = this.afs.doc(`childs/${this.uid}/names/${id}`);
        const data1: Child = {
            name: data.name
        }
        return rollRef.set(data1)
    }
    addchilds(data) {

        const childRef: AngularFirestoreDocument<Child> = this.afs.doc(`childs/${this.uid}`).collection('names').doc(this.afs.createId());

        const data1: Child = {
            name : data.name
        }
        return childRef.set(data1)
    }
    haschilds() {
        //let uid = this.getUid();
        this.childs = this.afs.doc(`childs/${this.uid}/`).collection('names');
        return this.childs.snapshotChanges();
    }

    getchilds() {
        //let uid = this.getUid();
        this.childs = this.afs.doc(`childs/${this.uid}/`).collection('names');
        console.log(this.childs);
    }
    setUserRoll(user){
        const rollRef: AngularFirestoreDocument<Roll> = this.afs.doc(`rolls/${user.uid}`);
        const data1: Roll = {
            uid: user.uid,
            parent: true,
            teacher: true,
            subteacher: true
        }
        return rollRef.set(data1)
    }
    updaterolls(data){
        const rollRef: AngularFirestoreDocument<Roll> = this.afs.doc(`rolls/${this.uid}`);
        const data1: Roll = {
            uid: this.uid,
            parent : data.parent,
            teacher : data.teacher,
            subteacher : data.subteacher
        }
        return rollRef.set(data1)
    }
    hasrolls(){
        //let uid = this.getUid();
        this.rolls = this.afs.doc(`rolls/${this.uid}`);
        return this.rolls.valueChanges();
    }

    getrolls(){
        //let uid = this.getUid();
        this.rolls = this.afs.doc(`rolls/${this.uid}`);
    }


    hasprofileImage() {
        //let user = this.afAuth.auth.currentUser;
        this.userprofileimage = this.afs.doc(`profileimage/${this.uid}`);
        return this.userprofileimage.valueChanges();
    }
    getprofileImage() {
        //let user = this.afAuth.auth.currentUser;
        //console.log(user.uid);
        this.userprofileimage = this.afs.doc(`profileimage/${this.uid}`);
    }
    updateprofileurl(url) {
        let user = this.afAuth.auth.currentUser;
        const userRef: AngularFirestoreDocument<ProfileImage> = this.afs.doc(`profileimage/${this.uid}`);
        const data = {
            uid: user.uid,
            url: url || null
        }
        //console.log(data);
        return userRef.set(data)
    }

    hasprofile() {
        //let user = this.afAuth.auth.currentUser;
        this.userprofile = this.afs.doc(`users/${this.uid}`);
        return this.userprofile.valueChanges();
    }

    getprofile() {
       // let user = this.afAuth.auth.currentUser;
        this.userprofile = this.afs.doc(`users/${this.uid}`);
    }

    setblankuserprofile(){
        let user = this.afAuth.auth.currentUser;
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email || null,
            fname:  null,
            lname:  null,
            phone:  null,
            state:  null,
            schoolDistrict:  null,
        }
        //console.log(data);
        return userRef.set(data)
    }
    setUserDoc(user,credentials){
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email || null,
            fname: credentials.fname || null,
            lname: credentials.lname || null,
            phone: credentials.phone || null,
            state: credentials.state || null,
            schoolDistrict: credentials.schoolDistrict || null,
        }
        //console.log(data);
        return userRef.set(data)
    }
    signInWithEmail(credentials) {
        //console.log('Sign in with email');
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,credentials.password)
            .then(user=>{
                //console.log(user);
                this.storeUserLogin(user);

                //this.afAuth.auth.signInWithCustomToken(user.refreshToken);

            });
    }
    signUp(credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((newUser : any) => {
            newUser.sendEmailVerification();
            let profile = {
                displayName: credentials.fname + ' ' + credentials.lname,
                photoURL: newUser.photoURL
            }
            newUser.updateProfile(profile);
            this.setUserRoll(newUser);
            return this.setUserDoc(newUser, credentials);
        });
    }
    signOut(): Promise<void> {
        //console.log("logout1");
        return this.afAuth.auth.signOut().then(result=>{
            // console.log("logout2");
            // this.removeUserLogin();
            // console.log("logout3");
        });
    }
    // signInWithGoogle():Promise<void>{

    //     return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());

    //     // return this.oauthSignIn(new firebase.auth.GoogleAuthProvider()).then((result:any) =>{

    //     //     this.setUserRoll(result.user);
    //     //      //this.storeUserLogin(result.user);
    //     // });

    // }
    signInWithFacebook() {
        //console.log('Sign in with facebook');
        // return this.oauthSignIn(new firebase.auth.FacebookAuthProvider()).then((result:any) => {
        //     //this.storeUserLogin(result.user);
        //     this.setUserRoll(result.user);
        // });
    }
    setUserFromSession(){
        // this.storage.get('token').then((token) => {
        //     //console.log(token);
        //     if(token){
        //        //this.afAuth.auth.signInAndRetrieveDataWithCustomToken(token);
        //     }
        // });
    }
    // private removeUserLogin(){
    //     this.storage.set('token', '');
    //     this.storage.set('user', '');
    //     this.storage.set('uid', '');
    // }
    private storeUserLogin(user){
        //console.log(user);
        //let token = result.credential.token;
        //let displayName =
       // let user = result.user;
        //let uid = user.uid;
        //console.log(result);
        //this.storage.set('token', token);
        // this.storage.set('uid', user.uid);
        //this.storage.set('user', user);
        this.uid = user.uid;
        this.setUid(user.uid);
        this.getrolls();
        this.getprofile();
    }
    private oauthSignIn(provider: AuthProvider) {
        // console.log(this.platform.is('ios'));
        // console.log(this.platform.is('android'));
        // if (this.platform.is('ios')) {
        //     console.log("signInWithPopup");
        //     return this.afAuth.auth.signInWithPopup(provider);
        // }else if(this.platform.is('android')){
        //     console.log("signInWithPopup");
        //     return this.afAuth.auth.signInWithPopup(provider);
        // }else{ 
        //     return this.afAuth.auth.signInWithPopup(provider);
        //     // console.log("signInWithRedirect");
        //     // return this.afAuth.auth.signInWithRedirect(provider)
        //     // .then(() => {
        //     //   console.log("1");
        //     //   return this.afAuth.auth.getRedirectResult().then(result => {
        //     //     console.log("2");
        //     //     //console.log(result);
        //     //     //this.storeUserLogin(result.user);
        //     //   });
        //     // });
        // }
        

        
        
        if (!(<any>window).cordova) { 
            console.log("0");
            return this.afAuth.auth.signInWithPopup(provider);
        } else {
             
          return this.afAuth.auth.signInWithRedirect(provider)
            .then(() => {
              console.log("1");
              return this.afAuth.auth.getRedirectResult().then(result => {
                console.log("2");
                //console.log(result);
                //this.storeUserLogin(result.user);
              });
            });
        }
    }
}
