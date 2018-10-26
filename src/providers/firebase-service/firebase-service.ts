import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { AlertController, ToastController, NavController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';



@Injectable()
export class FirebaseServiceProvider {

  loginFlag: Boolean;

  constructor(private db: AngularFireDatabase,
    private toastCtrl: ToastController,
    private AlertCtrl: AlertController,
    ) {
    console.log('Hello FirebaseServiceProvider Provider');
  }

  signupUser(user){
    const newUser = {
      username: user.username,
      email: user.email,
      password: user.password,
    }
    const result = this.db.list("/users/").push(newUser);    
    return result;
  }

  completedTaskUpdate(completedTask){
    console.log(completedTask);
    this.db.list("/completedtasks/").push(completedTask);
  }

  failedTaskUpdate(failedTask){
    this.db.list("/failedtasks/").push(failedTask);
  };
}