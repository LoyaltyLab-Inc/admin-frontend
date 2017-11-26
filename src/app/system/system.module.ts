import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StatisticPageComponent } from './statistic-page/statistic-page.component';

@NgModule({
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule
  ],
  declarations: [SystemComponent, StatisticPageComponent]
})
export class SystemModule { }
