import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Tab, Tabs  } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { TabsPage } from '../tabs/tabs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  loginData = {
    username: '',
    password: ''
  }

  constructor(public navCtrl: NavController, 
    private db: AngularFireDatabase,
    public navParams: NavParams,
    private firebaseService: FirebaseServiceProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
  //   const result = this.firebaseService.loginUser(this.loginData);
  //   console.log('hey', result);
  //   // if (result) {
  //   //   this.navCtrl.setRoot(TabsPage);
  //   // }
    this.db.list('/users/',
      ref => ref.orderByChild('username').equalTo(this.loginData.username)).valueChanges().subscribe(data =>{
        console.log(data);
        if(data[0] && data[0]['password'] === this.loginData.password) {
          let toast = this.toastCtrl.create({
            message: 'User has been logged in successfully',
            duration: 3000
          });
          toast.present();
          window.localStorage.setItem('username', this.loginData.username);
          window.localStorage.setItem('password', this.loginData.password);
          this.navCtrl.setRoot(TabsPage);
        }
        else{
          let toast = this.toastCtrl.create({
            message: 'Unable to login',
            duration: 3000
          });
          toast.present();
        } 
      });
  }
 
  signup() {
    this.navCtrl.push(SignupPage);
  }

  resetFields() {
    this.loginData.username = '';
    this.loginData.password = '';
  }

}
