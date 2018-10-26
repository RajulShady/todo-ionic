import { Component } from '@angular/core';

import { CompletedTaskPage } from '../completed-task/completed-task';
import { FailedTaskPage } from '../failed-task/failed-task';
import { OngoingTaskPage } from '../ongoing-task/ongoing-task';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = OngoingTaskPage;
  tab2Root = CompletedTaskPage;
  tab3Root = FailedTaskPage;

  constructor() {

  }
}
