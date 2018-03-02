import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system.component';
import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { ShopsPageComponent } from './shops-page/shops-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PersonalDataComponent } from './hr/personalData/personalData.component';
import { EducationComponent } from './hr/education/education.component';
import { LastWorkComponent } from './hr/lastWork/lastWork.component';
import { DreamWorkComponent } from './hr/dreamWork/dreamWork.component';
import { ResultComponent } from './hr/result/result.component';

const routes: Routes = [
  {path: '', component: SystemComponent, children: [
    { path: 'personalData', component: PersonalDataComponent },
    { path: 'education', component: EducationComponent },
    { path: 'lastWork', component: LastWorkComponent },
    { path: 'dreamWork', component: DreamWorkComponent },
    { path: 'result', component: ResultComponent },
    {path: '**', redirectTo: 'personalData', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule { }
