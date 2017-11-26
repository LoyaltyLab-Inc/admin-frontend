import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system.component';
import { StatisticPageComponent } from './statistic-page/statistic-page.component';

const routes: Routes = [
  {path: 'system', component: SystemComponent, children: [
    { path: 'statistic', component: StatisticPageComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule { }
