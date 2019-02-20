import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the TracksubteacherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tracksubteacher',
  templateUrl: 'tracksubteacher.html',
})
export class TracksubteacherPage {
  topics = [
    {
      "name": "Get and Keep Students On Task",
      "topics": [
        {
          "id": 1,
          "name": "I greeted students at the door",
          "tracked": false
        },
        {
          "id": 2,
          "name": "I directed students to a starter activity",
          "tracked": false
        },
        {
          "id": 3,
          "name": "I continually walked around the classroom while students were working",
          "tracked": false
        },
        {
          "id": 4,
          "name": "I got students who are off task back on task",
          "tracked": false
        },
        {
          "id": 5,
          "name": "I got the class on task quickly and effectively",
          "tracked": false
        },
        {
          "id": 6,
          "name": "I stayed on task myself",
          "tracked": false
        }
      ]
    },
    {
      "name": "Teach Expectations",
      "topics": [
        {
          "id": 7,
          "name": "I told students WHAT they are supposed to do during an activity",
          "tracked": false
        },
        {
          "id": 8,
          "name": "I told students HOW the are to complete an activity",
          "tracked": false
        },
        {
          "id": 9,
          "name": "I gave students the necessary TOOLS to accomplish tasks",
          "tracked": false
        },
        {
          "id": 10,
          "name": "I told students how much TIME they have to complete the task",
          "tracked": false
        }
      ]
    },
    {
      "name": "Increase Positive Interactions",
      "topics": [
        {
          "id": 11,
          "name": "I maintained the ratio of eight positive interactions to every one negative/corrective interaction with each student",
          "tracked": false
        },
        {
          "id": 12,
          "name": "If a student became challenging, I intentionally increased the number of positive interactions",
          "tracked": false
        },
        {
          "id": 13,
          "name": "If students started forming a wolf pack, I was proactive in increasing the positive interactions I had with those students",
          "tracked": false
        }

      ]
    },
    {
      "name": "Respond Non-Coercively to Consequential Behavior",
      "topics": [
        {
          "id": 15,
          "name": "I differentiated between consequential and inconsequential behavior",
          "tracked": false
        },
        {
          "id": 16,
          "name": "I ignored inconsequential behavior 90% of the time",
          "tracked": false
        },
        {
          "id": 17,
          "name": "I responded non-coercively to consequential behavior",
          "tracked": false
        },
        {
          "id": 18,
          "name": "When I had to talk to a student one on one, I began and finished the conversation with positive statements",
          "tracked": false
        }
      ]
    },
    {
      "name": "Avoid Traps",
      "topics": [
        {
          "id": 19,
          "name": "I avoided the Criticism Trap",
          "tracked": false
        },
        {
          "id": 20,
          "name": "I ignored I avoided the Common Sense Trap",
          "tracked": false
        },
        {
          "id": 21,
          "name": "I avoided the Questioning Trap",
          "tracked": false
        },
        {
          "id": 22,
          "name": "I avoided the Sarcasm Trap",
          "tracked": false
        },
        {
          "id": 23,
          "name": "I avoided the Despair and Pleading Trap",
          "tracked": false
        },
        {
          "id": 24,
          "name": "I avoided the Threat Trap",
          "tracked": false
        },
        {
          "id": 25,
          "name": "I avoided the Physical and Verbal Force Trap",
          "tracked": false
        }
      ]
    }
  ]
    ;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
    public auth: AuthService,
    public toastCtrl: ToastController
    ) {


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TracksubteacherPage');
    this.auth.getsubteachertracking();
    this.auth.subteachertracking.valueChanges().subscribe((subteachertracking)=>{

      if (subteachertracking){
        this.topics = subteachertracking.topics;
        //console.log(this.topics);
      }
    });
  }
  updatetopic() {
    this.auth.updatesubteachertracking(this.topics).then((sucssess) => {
      let toast = this.toastCtrl.create({
        message: "Activitiy Tracked Successfully",
        duration: 2000,
      })
      toast.present();
    });
  }
}
