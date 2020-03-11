import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';
import { GlobalRoutes } from './global.routing';

import { SettingsComponent } from './settings/settings.component';
import { QueueUiComponent } from './queue-ui/queue-ui.component';

@NgModule({
  declarations: [SettingsComponent, QueueUiComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(GlobalRoutes)
  ]
})
export class GlobalModule { }
