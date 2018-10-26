import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { TaskPage } from '../task/task';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-ongoing-task',
  templateUrl: 'ongoing-task.html',
})
export class OngoingTaskPage {
  tasks: any;
  temptask: any;
  date: Date;

  newTask = {
    name: '',
    description: '',
    createdAt: Date.now(),
    deadline: this.date,
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public firebaseService: FirebaseServiceProvider,
    private modalCtrl: ModalController,
    private app: App) {
  }

  ionViewDidLoad() {
    let failedTask;
    let firebaseServ = this.firebaseService;
    let fdb = this.db.database.ref();
    let query = this.db.database.ref("tasks").orderByKey();
    let user = window.localStorage.getItem('username');
    // List Tasks
    this.db.list("/tasks/", ref => ref.orderByChild('userId').equalTo(user)).valueChanges().subscribe(data => {
      this.tasks = data;

      for (const key in this.tasks) {
        if (this.tasks.hasOwnProperty(key)) {
          let element = this.tasks[key];
          let modifiedDate = new Date(element.createdAt);
          element.createdAt = modifiedDate.getFullYear()+'-'+modifiedDate.getMonth()+'-'+modifiedDate.getDate();
          let date1 = new Date();
          let date2 = new Date(element.deadline);
          date2.setHours(23);
          date2.setMinutes(59);
          date2.setSeconds(59);
          // check if deadline has passed
          // if passed remove the task and insert into failed Task list
          if(date1 > date2) {
              query.once("value")
                .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                  let pkey = childSnapshot.key; 
                  let chval = childSnapshot.val();
                  failedTask = chval;
                  //check if remove this child
                  if(chval.name == element.name && chval.description == element.description){
                    firebaseServ.failedTaskUpdate(failedTask);
                    fdb.child("tasks/"+pkey).remove();
                    return true;
                  }         
                });
              });
          }
        
        }
      }
    });
  }

  addTask(newTask) {
    console.log(newTask);
    newTask.userId = window.localStorage.getItem('username');
    this.db.list("/tasks").push(newTask);
    this.resetFields();
  }

  updateTask(taskname, taskDescription) {
    let completedTask;
    let firebaseServ = this.firebaseService;
    let fdb = this.db.database.ref();
    let query = this.db.database.ref("tasks").orderByKey();
    query.once("value")
      .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let pkey = childSnapshot.key; 
        let chval = childSnapshot.val();
        completedTask = chval;
        //check if remove this child
        if(chval.name == taskname && chval.description == taskDescription){
          firebaseServ.completedTaskUpdate(completedTask);
          fdb.child("tasks/"+pkey).remove();
          return true;
        }

      });
    });
  }

  openTask(taskname, taskDescription){
    let navctr = this.navCtrl;
    let fdb = this.db.database.ref();
    let query = this.db.database.ref("tasks").orderByKey();
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

  resetFields(){
    this.newTask.name = '';
    this.newTask.description = '';
  }

  logout(){
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password');
    this.app.getRootNav().setRoot(LoginPage);
  }
}