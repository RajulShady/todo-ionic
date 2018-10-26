import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { TaskPage } from '../task/task';

@IonicPage()
@Component({
  selector: 'page-failed-task',
  templateUrl: 'failed-task.html',
})
export class FailedTaskPage {
  public failedTasks: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FailedTaskPage');
    let user = window.localStorage.getItem('username');
    this.db.list("/failedtasks/",
    ref => ref.orderByChild('userId').equalTo(user)).valueChanges().subscribe(data => {
      this.failedTasks = data;
      for (const key in this.failedTasks) {
        if (this.failedTasks.hasOwnProperty(key)) {
          let element = this.failedTasks[key];
          let modifiedDate = new Date(element.createdAt);
          element.createdAt = modifiedDate.getFullYear()+'-'+modifiedDate.getMonth()+'-'+modifiedDate.getDate();
        }
      }
    });
  }

  openTask(taskname, taskDescription){
    let navctr = this.navCtrl;
    let fdb = this.db.database.ref();
    let query = this.db.database.ref("failedtasks").orderByKey();
    query.once("value")
      .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let pkey = childSnapshot.key; 
        let chval = childSnapshot.val();
        //check if remove this child
        if(chval.name == taskname && chval.description == taskDescription){
          navctr.push(TaskPage, {
            chval
          });
        }
  
      });
    });
  }

}
