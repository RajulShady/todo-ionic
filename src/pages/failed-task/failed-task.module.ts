import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FailedTaskPage } from './failed-task';

@NgModule({
  declarations: [
    FailedTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(FailedTaskPage),
  ],
})
export class FailedTaskPageModule {}
