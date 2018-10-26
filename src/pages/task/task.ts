import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  task: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.task = navParams.get('chval');
    let modifiedDate = new Date(this.task.createdAt);
    this.task.createdAt = modifiedDate.getDate()+'/'+modifiedDate.getMonth()+'/'+modifiedDate.getFullYear();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

}

