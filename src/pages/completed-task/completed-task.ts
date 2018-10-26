import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { TaskPage } from '../task/task';

@IonicPage()
@Component({
  selector: 'page-completed-task',
  templateUrl: 'completed-task.html',
})
export class CompletedTaskPage {
  public completedTasks: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    let user = window.localStorage.getItem('username');
    this.db.list("/completedtasks/",
    ref => ref.orderByChild('userId').equalTo(user)).valueChanges().subscribe(data => {
      this.completedTasks = data;
      for (const key in this.completedTasks) {
        if (this.completedTasks.hasOwnProperty(key)) {
          let element = this.completedTasks[key];
          let modifiedDate = new Date(element.createdAt);
          element.createdAt = modifiedDate.getFullYear()+'-'+modifiedDate.getMonth()+'-'+modifiedDate.getDate();
        }
      }
    });
  }

  openTask(taskname, taskDescription){
    let navctr = this.navCtrl;
    let fdb = this.db.database.ref();
    let query = this.db.database.ref("completedtasks").orderByKey();
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
