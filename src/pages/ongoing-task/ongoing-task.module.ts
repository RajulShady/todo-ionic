import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OngoingTaskPage } from './ongoing-task';

@NgModule({
  declarations: [
    OngoingTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(OngoingTaskPage),
  ],
})
export class OngoingTaskPageModule {}
