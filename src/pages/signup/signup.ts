import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private firebaseService: FirebaseServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    if(this.signupData.password !== this.signupData.confirmPassword) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'Your password and your re-entered password does not match each other.',
	buttons: ['OK']
      });
      alert.present();
      return;
    }
    
    const result = this.firebaseService.signupUser(this.signupData);
    this.resetFields();
    console.log(result);
    if (result) {
      let toast = this.toastCtrl.create({
        message: 'User has been signed up successfully',
        duration: 3000
      });
      toast.present();
    }
    else {
      let toast = this.toastCtrl.create({
        message: 'Unable to sign up',
        duration: 3000
      });
      toast.present();
    }
    // .then( res => {
    //   console.log(res);
    //   let toast = this.toastCtrl.create({
    //     message: 'User was created successfully',
    //     duration: 3000
    //   });
    //   toast.present();
    //   // this.resetFields();
    // }, err => {
    //   console.log(err)
    // })
  }

  resetFields() {
    this.signupData.email = '';
    this.signupData.username = '';
    this.signupData.password = '';
    this.signupData.confirmPassword = '';
  }

}
