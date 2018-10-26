import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompletedTaskPage } from './completed-task';

@NgModule({
  declarations: [
    CompletedTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(CompletedTaskPage),
  ],
})
export class CompletedTaskPageModule {}
