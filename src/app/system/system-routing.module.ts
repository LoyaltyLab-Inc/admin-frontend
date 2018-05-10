import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system.component';
import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { ShopsPageComponent } from './shops-page/shops-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  {path: '', component: SystemComponent, children: [
    { path: 'statistic/:type', component: StatisticPageComponent },
    { path: 'shops', component: ShopsPageComponent },
    { path: 'products', component: ProductsPageComponent },
    { path: 'management', component: ManagementPageComponent },
    { path: 'feedback', component: FeedbackPageComponent },
    { path: 'profile', component: ProfilePageComponent },
    { path: '**', redirectTo: 'statistic/all'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule { }
